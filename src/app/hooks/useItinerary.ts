import { useState, useCallback, useMemo } from "react";
import { PlannerSpot, optimizeRoute, haversineDistance, estimateTravelMinutes } from "../data/philippineRegions";

export type TripDuration = "1day" | "2days" | "custom";

export interface ItineraryEvent {
  time: string;
  spot: PlannerSpot;
  travelFromPrev: number; // minutes
  distFromPrev: number; // km
}

export interface DayPlan {
  day: number;
  date: string;
  events: ItineraryEvent[];
  totalDistance: number;
  totalTravelTime: number;
  totalFees: number;
}

function formatTime(hour: number, minute: number): string {
  const h = hour % 12 || 12;
  const ampm = hour < 12 ? "AM" : "PM";
  return `${h}:${minute.toString().padStart(2, "0")} ${ampm}`;
}

import { useLocalStorage } from "./useLocalStorage";

export function useItinerary() {
  const [selectedRegions, setSelectedRegions] = useLocalStorage<string[]>("planner_regions", []);
  const [selectedSpots, setSelectedSpots] = useLocalStorage<PlannerSpot[]>("planner_spots", []);
  const defaultStart = (() => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; })();
  const defaultEnd = (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().split('T')[0]; })();
  const [startDate, setStartDate] = useLocalStorage<string>("planner_start_date", defaultStart);
  const [endDate, setEndDate] = useLocalStorage<string>("planner_end_date", defaultEnd);
  const [isOptimized, setIsOptimized] = useLocalStorage("planner_is_optimized", false);
  const [generatedPlan, setGeneratedPlan] = useLocalStorage<DayPlan[] | null>("planner_plan", null);

  const toggleSpot = useCallback((spot: PlannerSpot) => {
    setSelectedSpots((prev) => {
      const exists = prev.find((s) => s.id === spot.id);
      if (exists) return prev.filter((s) => s.id !== spot.id);
      return [...prev, spot];
    });
    setGeneratedPlan(null);
  }, []);

  const isSelected = useCallback(
    (spotId: string) => selectedSpots.some((s) => s.id === spotId),
    [selectedSpots]
  );

  const totalFees = useMemo(() => {
    return selectedSpots.reduce(
      (sum, s) => sum + s.tourismFee + s.environmentalFee + s.entryFee, 0
    );
  }, [selectedSpots]);

  const updateSpot = useCallback((spotId: string, updates: Partial<PlannerSpot & { startDate?: string; endDate?: string }>) => {
    setSelectedSpots(prev => prev.map(s => s.id === spotId ? { ...s, ...updates } : s));
    setGeneratedPlan(null);
  }, []);

  const removeSpot = useCallback((spotId: string) => {
    setSelectedSpots(prev => prev.filter(s => s.id !== spotId));
    setGeneratedPlan(null);
  }, []);

  // Helper: get the effective trip date range from all spot dates
  const tripDateRange = useMemo(() => {
    const parseDate = (d: string) => {
      const parsed = new Date(d);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    let earliest = parseDate(startDate) || new Date();
    let latest = parseDate(endDate) || new Date();

    // Scan all spots for their individual dates
    for (const spot of selectedSpots) {
      if (spot.startDate) {
        const s = parseDate(spot.startDate);
        if (s && s < earliest) earliest = s;
      }
      if (spot.endDate) {
        const e = parseDate(spot.endDate);
        if (e && e > latest) latest = e;
      }
    }

    if (latest < earliest) latest = earliest;

    return { earliest, latest };
  }, [startDate, endDate, selectedSpots]);

  const dayCount = useMemo(() => {
    const { earliest, latest } = tripDateRange;
    const diffTime = Math.abs(latest.getTime() - earliest.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(diffDays + 1, 1);
  }, [tripDateRange]);

  const optimizeSpots = useCallback(() => {
    setSelectedSpots((prev) => optimizeRoute(prev));
    setIsOptimized(true);
  }, []);

  const moveSpot = useCallback((fromIndex: number, toIndex: number) => {
    setSelectedSpots((prev) => {
      const updated = [...prev];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      return updated;
    });
    setIsOptimized(false);
    setGeneratedPlan(null);
  }, []);



  const generateItinerary = useCallback(() => {
    if (selectedSpots.length < 1) return;

    const days: DayPlan[] = [];
    const tripStart = tripDateRange.earliest;

    // Group spots by day
    const daySpotsMap: Record<number, PlannerSpot[]> = {};

    // 1. Place each spot on the day(s) matching its startDate
    const spotsWithDates = selectedSpots.filter(s => s.startDate);
    const spotsWithoutDates = selectedSpots.filter(s => !s.startDate);

    spotsWithDates.forEach(spot => {
      const spotStart = new Date(spot.startDate!);
      const spotEnd = spot.endDate ? new Date(spot.endDate!) : spotStart;

      // Calculate the day index for the start date
      const startDayIndex = Math.max(0, Math.min(
        Math.floor((spotStart.getTime() - tripStart.getTime()) / (1000 * 60 * 60 * 24)),
        dayCount - 1
      ));

      // Calculate the day index for the end date
      const endDayIndex = Math.max(0, Math.min(
        Math.floor((spotEnd.getTime() - tripStart.getTime()) / (1000 * 60 * 60 * 24)),
        dayCount - 1
      ));

      // Place the spot on its start day only (not spread across multiple days)
      if (!daySpotsMap[startDayIndex]) daySpotsMap[startDayIndex] = [];
      daySpotsMap[startDayIndex].push(spot);
    });

    // 2. Distribute spots without specific dates into days with fewer spots
    spotsWithoutDates.forEach(spot => {
      let bestDay = 0;
      let minSpots = Infinity;
      for (let i = 0; i < dayCount; i++) {
        const count = (daySpotsMap[i]?.length || 0);
        if (count < minSpots) {
          minSpots = count;
          bestDay = i;
        }
      }
      if (!daySpotsMap[bestDay]) daySpotsMap[bestDay] = [];
      daySpotsMap[bestDay].push(spot);
    });

    // 3. Generate the actual DayPlan objects
    for (let d = 0; d < dayCount; d++) {
      const daySpots = daySpotsMap[d] || [];

      let currentHour = 8;
      let currentMinute = 0;
      let totalDistance = 0;
      let totalTravelTime = 0;
      let totalDayFees = 0;
      const events: ItineraryEvent[] = [];

      daySpots.forEach((spot, i) => {
        let travelMin = 0;
        let dist = 0;
        if (i > 0) {
          dist = haversineDistance(daySpots[i - 1].gps, spot.gps);
          travelMin = estimateTravelMinutes(daySpots[i - 1].gps, spot.gps);
        }

        if (i > 0) {
          currentMinute += travelMin;
          currentHour += Math.floor(currentMinute / 60);
          currentMinute = currentMinute % 60;
        }

        events.push({
          time: formatTime(currentHour, currentMinute),
          spot,
          travelFromPrev: travelMin,
          distFromPrev: Math.round(dist * 10) / 10,
        });

        totalDistance += dist;
        totalTravelTime += travelMin;
        totalDayFees += spot.tourismFee + spot.environmentalFee + spot.entryFee;

        // Add spot duration
        currentMinute += spot.suggestedDuration;
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      });

      const dayDate = new Date(tripStart);
      dayDate.setDate(dayDate.getDate() + d);
      days.push({
        day: d + 1,
        date: dayDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        events,
        totalDistance: Math.round(totalDistance * 10) / 10,
        totalTravelTime,
        totalFees: totalDayFees,
      });
    }

    setGeneratedPlan(days);
  }, [selectedSpots, dayCount, tripDateRange]);

  const clearAll = useCallback(() => {
    setSelectedSpots([]);
    setGeneratedPlan(null);
    setIsOptimized(false);
  }, []);

  return {
    selectedRegions, setSelectedRegions,
    selectedSpots, setSelectedSpots,
    startDate, setStartDate,
    endDate, setEndDate,
    isOptimized,
    toggleSpot, isSelected, updateSpot,
    totalFees, dayCount,
    optimizeSpots, moveSpot, removeSpot,
    generateItinerary, generatedPlan,
    clearAll,
  };
}

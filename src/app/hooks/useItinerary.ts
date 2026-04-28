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

// Per-spot stay configuration
export interface SpotStayConfig {
  spotId: string;
  daysToStay: number;
  startTime: string; // e.g. "08:00"
  endTime: string; // e.g. "17:00"
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

  // Per-spot stay configurations
  const [spotStayConfigs, setSpotStayConfigs] = useLocalStorage<SpotStayConfig[]>("planner_spot_stay_configs", []);

  const getSpotStayConfig = useCallback((spotId: string): SpotStayConfig => {
    const found = spotStayConfigs.find(c => c.spotId === spotId);
    return found || { spotId, daysToStay: 1, startTime: "08:00", endTime: "17:00" };
  }, [spotStayConfigs]);

  const updateSpotStayConfig = useCallback((spotId: string, updates: Partial<SpotStayConfig>) => {
    setSpotStayConfigs(prev => {
      const exists = prev.find(c => c.spotId === spotId);
      if (exists) {
        return prev.map(c => c.spotId === spotId ? { ...c, ...updates } : c);
      }
      return [...prev, { spotId, daysToStay: 1, startTime: "08:00", endTime: "17:00", ...updates }];
    });
    setGeneratedPlan(null);
  }, []);

  // Total days calculated from all spot stay configs
  const totalTripDays = useMemo(() => {
    if (selectedSpots.length === 0) return 1;
    // Sum up all days, but spots on the same day share that day
    // Simple approach: total days = max of cumulative days
    let total = 0;
    selectedSpots.forEach(spot => {
      if (!spot || !spot.id) return;
      const config = getSpotStayConfig(spot.id);
      total += config.daysToStay;
    });
    return Math.max(total, 1);
  }, [selectedSpots, spotStayConfigs, getSpotStayConfig]);

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
    setSpotStayConfigs(prev => prev.filter(c => c.spotId !== spotId));
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
    return totalTripDays;
  }, [totalTripDays]);

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

    // Build day assignments based on spotStayConfigs
    // Each spot gets assigned to consecutive days based on its daysToStay
    let currentDayIndex = 0;
    const daySpotsMap: Record<number, PlannerSpot[]> = {};

    selectedSpots.forEach(spot => {
      const config = getSpotStayConfig(spot.id);
      const stayDays = config.daysToStay;

      for (let d = 0; d < stayDays; d++) {
        const dayIdx = currentDayIndex + d;
        if (!daySpotsMap[dayIdx]) daySpotsMap[dayIdx] = [];
        daySpotsMap[dayIdx].push(spot);
      }
      currentDayIndex += stayDays;
    });

    const totalDays = currentDayIndex || 1;

    for (let d = 0; d < totalDays; d++) {
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

        // Parse start time from config
        const config = getSpotStayConfig(spot.id);
        if (i === 0 && config.startTime) {
          const [h, m] = config.startTime.split(':').map(Number);
          if (!isNaN(h)) currentHour = h;
          if (!isNaN(m)) currentMinute = m;
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
  }, [selectedSpots, tripDateRange, getSpotStayConfig]);

  const clearAll = useCallback(() => {
    setSelectedSpots([]);
    setGeneratedPlan(null);
    setIsOptimized(false);
    setSpotStayConfigs([]);
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
    // New stay config methods
    spotStayConfigs, getSpotStayConfig, updateSpotStayConfig, totalTripDays,
    selectedRegion: selectedRegions?.join(', ') || "Multiple Regions",
  };
}

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
  return \`\${h}:\${minute.toString().padStart(2, "0")} \${ampm}\`;
}

export function useItinerary() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSpots, setSelectedSpots] = useState<PlannerSpot[]>([]);
  const [duration, setDuration] = useState<TripDuration>("1day");
  const [customDays, setCustomDays] = useState(3);
  const [isOptimized, setIsOptimized] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<DayPlan[] | null>(null);

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

  const dayCount = useMemo(() => {
    if (duration === "1day") return 1;
    if (duration === "2days") return 2;
    return customDays;
  }, [duration, customDays]);

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

  const removeSpot = useCallback((spotId: string) => {
    setSelectedSpots((prev) => prev.filter((s) => s.id !== spotId));
    setGeneratedPlan(null);
  }, []);

  const generateItinerary = useCallback(() => {
    if (selectedSpots.length < 3) return;

    const spotsPerDay = Math.ceil(selectedSpots.length / dayCount);
    const days: DayPlan[] = [];

    for (let d = 0; d < dayCount; d++) {
      const daySpots = selectedSpots.slice(d * spotsPerDay, (d + 1) * spotsPerDay);
      if (daySpots.length === 0) continue;

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

      const today = new Date();
      today.setDate(today.getDate() + 7 + d);
      days.push({
        day: d + 1,
        date: today.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
        events,
        totalDistance: Math.round(totalDistance * 10) / 10,
        totalTravelTime,
        totalFees: totalDayFees,
      });
    }

    setGeneratedPlan(days);
  }, [selectedSpots, dayCount]);

  const clearAll = useCallback(() => {
    setSelectedSpots([]);
    setGeneratedPlan(null);
    setIsOptimized(false);
  }, []);

  return {
    selectedRegion, setSelectedRegion,
    selectedSpots, setSelectedSpots,
    duration, setDuration,
    customDays, setCustomDays,
    isOptimized,
    toggleSpot, isSelected,
    totalFees, dayCount,
    optimizeSpots, moveSpot, removeSpot,
    generateItinerary, generatedPlan,
    clearAll,
  };
}

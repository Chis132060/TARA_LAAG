import { NavigateFunction } from "react-router";
import { philippineRegions, type PlannerSpot } from "../data/philippineRegions";

/**
 * Hard-coded map: destination id → { region, spotId }
 * Used as first-pass lookup before falling back to fuzzy name matching.
 */
const DESTINATION_TO_SPOT: Record<number, { region: string; spotId: string }> = {
  // Siargao
  1: { region: "Siargao", spotId: "si-1" },  // Siargao Cloud 9 → Cloud 9
  9: { region: "Siargao", spotId: "si-4" },  // Naked Island
  11: { region: "Siargao", spotId: "si-3" },  // Magpupungko Pools → Magpupungko Rock Pools

  // Surigao
  2: { region: "Surigao", spotId: "su-1" },  // Enchanted River
  4: { region: "Surigao", spotId: "su-2" },  // Tinuy-an Falls
  6: { region: "Surigao", spotId: "su-3" },  // Britania Islands

  // Boracay
  10: { region: "Boracay", spotId: "br-1" },  // Boracay White Beach → White Beach

  // Cebu
  17: { region: "Cebu", spotId: "ce-1" },  // Kawasan Falls

  // Palawan
  15: { region: "Palawan", spotId: "pa-1" },  // El Nido Big Lagoon
  16: { region: "Palawan", spotId: "pa-2" },  // Coron Kayangan Lake → Kayangan Lake

  // Baguio
  29: { region: "Baguio", spotId: "ba-1" },  // Burnham Park

  // Bohol
  20: { region: "Bohol", spotId: "bo-1" },  // Chocolate Hills

  // Batanes
  7: { region: "Batanes", spotId: "bt-1" },  // Batanes Basco → Basco Lighthouse
};

/**
 * Navigates to the ItineraryPlanner and instantly lands on the "select" step
 * with the matching region AND spot already pre-selected.
 *
 * Strategy:
 * 1. Try hard-coded mapping by destination id (most reliable)
 * 2. Fallback to fuzzy name matching
 * 3. If no match at all → open planner at search step
 */
export function addToTrip(
  destinationName: string,
  navigate: NavigateFunction,
  destinationId?: number
) {
  let matchedRegion = "";
  let matchedSpot: PlannerSpot | null = null;

  // --- Strategy 1: Hard-coded ID mapping ---
  if (destinationId !== undefined && DESTINATION_TO_SPOT[destinationId]) {
    const mapping = DESTINATION_TO_SPOT[destinationId];
    const region = philippineRegions[mapping.region];
    if (region) {
      const spot = region.spots.find(s => s.id === mapping.spotId);
      if (spot) {
        matchedRegion = mapping.region;
        matchedSpot = spot;
      }
    }
  }

  // --- Strategy 2: Fuzzy name matching (fallback) ---
  if (!matchedSpot) {
    const destLower = destinationName.toLowerCase().replace(/\s+/g, "");

    outer: for (const [regionName, region] of Object.entries(philippineRegions)) {
      for (const spot of region.spots) {
        const spotLower = spot.name.toLowerCase().replace(/\s+/g, "");
        if (
          destLower.includes(spotLower) ||
          spotLower.includes(destLower) ||
          destinationName.toLowerCase().includes(spot.name.toLowerCase()) ||
          spot.name.toLowerCase().includes(destinationName.toLowerCase())
        ) {
          matchedRegion = regionName;
          matchedSpot = spot;
          break outer;
        }
      }
    }
  }

  // --- Strategy: Always clear previous session data first ---
  const plannerKeys = [
    "planner_regions",
    "planner_spots",
    "planner_step",
    "planner_plan",
    "planner_active_day",
    "planner_spot_stay_configs"
  ];
  plannerKeys.forEach(key => localStorage.removeItem(key));

  if (matchedRegion && matchedSpot) {
    // 1. Pre-select the region
    const existingRegions: string[] = JSON.parse(
      localStorage.getItem("planner_regions") || "[]"
    );
    if (!existingRegions.includes(matchedRegion)) {
      localStorage.setItem(
        "planner_regions",
        JSON.stringify([...existingRegions, matchedRegion])
      );
    }

    // 2. Pre-select the spot
    const existingSpots: any[] = JSON.parse(
      localStorage.getItem("planner_spots") || "[]"
    );
    if (!existingSpots.some((s: any) => s.id === matchedSpot!.id)) {
      localStorage.setItem(
        "planner_spots",
        JSON.stringify([...existingSpots, matchedSpot])
      );
    }

    // 3. Jump straight to the "select" step
    localStorage.setItem("planner_step", JSON.stringify("select"));

    // 4. Clear stale plan
    localStorage.setItem("planner_plan", JSON.stringify(null));
  } else {
    // No match — open planner at search step
    localStorage.setItem("planner_step", JSON.stringify("search"));
  }

  navigate("/app/planner");
}

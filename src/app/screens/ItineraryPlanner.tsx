import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Clock, DollarSign, ChevronRight, Sparkles, Trash2, GripVertical, X, ChevronDown, Route, Calendar, ArrowRight, CheckCircle2, Circle, Navigation } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { philippineRegions, allRegionNames, haversineDistance, estimateTravelMinutes, formatFee, type PlannerSpot } from "../data/philippineRegions";
import { useItinerary, type TripDuration } from "../hooks/useItinerary";

const categoryColors: Record<string, string> = {
  Beach: "#006FB4", Adventure: "#FF7A00", Historical: "#9C27B0",
  Cultural: "#E91E63", Nature: "#00C851", Food: "#FF5722",
};

const categoryEmoji: Record<string, string> = {
  Beach: "🏖️", Adventure: "🧗", Historical: "🏛️",
  Cultural: "🎭", Nature: "🌿", Food: "🍜",
};

type Step = "search" | "select" | "duration" | "itinerary";

export function ItineraryPlanner() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState(0);
  const itinerary = useItinerary();

  // Search logic to match region name OR spot name
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) {
      return allRegionNames.map(r => ({ regionName: r, matchingSpots: [] }));
    }

    const query = searchQuery.toLowerCase();
    const results: { regionName: string, matchingSpots: PlannerSpot[] }[] = [];

    allRegionNames.forEach(regionName => {
      const region = philippineRegions[regionName];
      const matchesRegion = regionName.toLowerCase().includes(query);
      
      const matchingSpots = region.spots.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.category.toLowerCase().includes(query)
      );

      if (matchesRegion || matchingSpots.length > 0) {
        results.push({
          regionName,
          // If the region name matched exactly, maybe we don't need to show just a subset of spots, but let's show all matching spots if they searched a spot.
          matchingSpots: matchingSpots
        });
      }
    });

    return results;
  }, [searchQuery]);

  const currentRegion = itinerary.selectedRegion ? philippineRegions[itinerary.selectedRegion] : null;

  const filteredSpots = useMemo(() => {
    if (!currentRegion) return [];
    return currentRegion.spots.filter(s => !catFilter || s.category === catFilter);
  }, [currentRegion, catFilter]);

  const spotFee = (s: PlannerSpot) => s.tourismFee + s.environmentalFee + s.entryFee;

  // STEP: Search Region
  if (step === "search") {
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-24">
        <div className="bg-gradient-to-br from-[#006FB4] to-[#004d80] px-6 pt-8 pb-10 rounded-b-[36px] shadow-xl">
          <div className="flex items-center gap-2 mb-1">
            <Route className="w-5 h-5 text-[#FF7A00]" />
            <span className="text-white/70" style={{ fontSize: "13px", fontWeight: 600 }}>Smart Planner</span>
          </div>
          <h1 className="text-white mb-2" style={{ fontSize: "28px", fontWeight: 800 }}>Plan Your Trip ✈️</h1>
          <p className="text-white/60 mb-6" style={{ fontSize: "14px" }}>Choose a destination region or search a spot</p>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              placeholder="Search regions or spots (e.g. Boracay, Sugba Lagoon...)" 
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/15 backdrop-blur-md text-white placeholder-white/40 border border-white/20" 
              style={{ fontSize: "15px" }} 
            />
          </div>
        </div>
        <div className="px-6 pt-6">
          <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: "18px", fontWeight: 800 }}>
            {searchQuery ? "Search Results" : "🇵🇭 Philippine Regions"}
          </h3>
          <div className="space-y-4">
            {searchResults.length === 0 && (
               <div className="text-center py-10 text-gray-500">No destinations found.</div>
            )}
            {searchResults.map(({ regionName, matchingSpots }) => {
              const region = philippineRegions[regionName];
              const spotCount = region.spots.length;
              return (
                <div key={regionName} className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
                  <button 
                    onClick={() => { itinerary.setSelectedRegion(regionName); setStep("select"); }} 
                    className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                      <ImageWithFallback src={region.spots[0]?.image || ""} alt={regionName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-[#1A1A1A]" style={{ fontSize: "17px", fontWeight: 800 }}>{regionName}</h4>
                      <p className="text-[#6B7280]" style={{ fontSize: "13px", fontWeight: 600 }}>{spotCount} attractions</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#006FB4] group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* Show matching spots underneath if any */}
                  {matchingSpots.length > 0 && searchQuery && (
                    <div className="px-4 pb-4 pt-1">
                      <div className="text-xs font-bold text-gray-400 mb-2 uppercase">Matching Spots</div>
                      <div className="space-y-2">
                        {matchingSpots.map(spot => (
                          <div key={spot.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                            <img src={spot.image} alt={spot.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div className="flex-1 text-sm font-semibold text-gray-800">{spot.name}</div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{backgroundColor: categoryColors[spot.category]}}>{spot.category}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // STEP: Select Destinations
  if (step === "select" && currentRegion) {
    const cats = [...new Set(currentRegion.spots.map(s => s.category))];
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-40">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => { setStep("search"); itinerary.clearAll(); }} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#1A1A1A]" /></button>
            <div className="flex-1">
              <h2 className="text-[#1A1A1A]" style={{ fontSize: "20px", fontWeight: 800 }}>{currentRegion.name}</h2>
              <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>{itinerary.selectedSpots.length} selected • Min 3 required</p>
            </div>
            {itinerary.selectedSpots.length > 0 && (
              <button onClick={() => itinerary.clearAll()} className="text-red-400 px-3 py-1.5 bg-red-50 rounded-xl" style={{ fontSize: "12px", fontWeight: 700 }}>Clear</button>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button onClick={() => setCatFilter(null)} className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${!catFilter ? "bg-[#006FB4] text-white shadow-lg" : "bg-gray-100 text-gray-500"}`} style={{ fontSize: "13px", fontWeight: 700 }}>All</button>
            {cats.map(c => (
              <button key={c} onClick={() => setCatFilter(catFilter === c ? null : c)} className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${catFilter === c ? "text-white shadow-lg" : "bg-gray-100 text-gray-500"}`} style={{ fontSize: "13px", fontWeight: 700, backgroundColor: catFilter === c ? categoryColors[c] : undefined }}>
                <span>{categoryEmoji[c]}</span>{c}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 pt-4 space-y-3">
          {filteredSpots.map(spot => {
            const selected = itinerary.isSelected(spot.id);
            const fee = spotFee(spot);
            return (
              <button key={spot.id} onClick={() => itinerary.toggleSpot(spot)} className={`w-full rounded-[24px] p-3 flex items-start gap-3 transition-all border-2 ${selected ? "bg-[#006FB4]/5 border-[#006FB4] shadow-md" : "bg-white border-transparent shadow-sm hover:shadow-md"}`}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                  </div>
                  <div className={`absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center ${selected ? "bg-[#006FB4]" : "bg-gray-200"}`}>
                    {selected ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Circle className="w-4 h-4 text-gray-400" />}
                  </div>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h4 className="text-[#1A1A1A] mb-0.5" style={{ fontSize: "15px", fontWeight: 800 }}>{spot.name}</h4>
                  <p className="text-[#6B7280] line-clamp-2 mb-2" style={{ fontSize: "12px", lineHeight: "1.4" }}>{spot.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-white" style={{ fontSize: "10px", fontWeight: 800, backgroundColor: categoryColors[spot.category] }}>{spot.category}</span>
                    {fee > 0 && <span className="text-[#FF7A00] bg-[#FF7A00]/10 px-2 py-0.5 rounded-md" style={{ fontSize: "10px", fontWeight: 800 }}>{formatFee(fee)}</span>}
                    <span className="text-[#6B7280] flex items-center gap-1" style={{ fontSize: "10px", fontWeight: 600 }}><Clock className="w-3 h-3" />{spot.suggestedDuration}min</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Fixed Bottom Bar */}
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-6 pb-4 pt-3 bg-gradient-to-t from-[#F9F9FC] via-[#F9F9FC] to-transparent z-20">
          <div className="bg-white rounded-[24px] p-4 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[#1A1A1A]" style={{ fontSize: "14px", fontWeight: 800 }}>{itinerary.selectedSpots.length} spots</span>
                <span className="text-[#6B7280] ml-2" style={{ fontSize: "12px" }}>Total: {formatFee(itinerary.totalFees)}</span>
              </div>
              {itinerary.selectedSpots.length >= 2 && (
                <button onClick={itinerary.optimizeSpots} className="text-[#006FB4] px-3 py-1.5 bg-[#006FB4]/10 rounded-xl flex items-center gap-1" style={{ fontSize: "11px", fontWeight: 700 }}>
                  <Sparkles className="w-3 h-3" />Optimize
                </button>
              )}
            </div>
            <button onClick={() => { if (itinerary.selectedSpots.length >= 3) setStep("duration"); }} disabled={itinerary.selectedSpots.length < 3} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${itinerary.selectedSpots.length >= 3 ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25 active:scale-[0.98]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`} style={{ fontSize: "16px", fontWeight: 800 }}>
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STEP: Duration Selection
  if (step === "duration") {
    const durations: { key: TripDuration; label: string; desc: string; emoji: string }[] = [
      { key: "1day", label: "1 Day Trip", desc: "Quick adventure, 8AM–6PM", emoji: "☀️" },
      { key: "2days", label: "2 Day Trip", desc: "Weekend getaway", emoji: "🌅" },
      { key: "custom", label: "Custom", desc: \`\${itinerary.customDays} days\`, emoji: "📅" },
    ];
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-24">
        <div className="bg-white px-6 pt-6 pb-5 border-b border-gray-50 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setStep("select")} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#1A1A1A]" /></button>
            <h2 className="text-[#1A1A1A]" style={{ fontSize: "20px", fontWeight: 800 }}>How long is your stay?</h2>
          </div>
        </div>
        <div className="px-6 pt-8 space-y-4">
          {durations.map(d => (
            <button key={d.key} onClick={() => itinerary.setDuration(d.key)} className={`w-full rounded-[24px] p-5 flex items-center gap-4 border-2 transition-all ${itinerary.duration === d.key ? "bg-[#006FB4]/5 border-[#006FB4] shadow-lg" : "bg-white border-gray-100 shadow-sm"}`}>
              <span style={{ fontSize: "32px" }}>{d.emoji}</span>
              <div className="text-left flex-1">
                <h4 className="text-[#1A1A1A]" style={{ fontSize: "17px", fontWeight: 800 }}>{d.label}</h4>
                <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>{d.desc}</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${itinerary.duration === d.key ? "border-[#006FB4] bg-[#006FB4]" : "border-gray-300"}`}>
                {itinerary.duration === d.key && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
              </div>
            </button>
          ))}
          {itinerary.duration === "custom" && (
            <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm">
              <label className="text-[#6B7280] block mb-3" style={{ fontSize: "13px", fontWeight: 700 }}>Number of days</label>
              <input type="range" min={1} max={7} value={itinerary.customDays} onChange={e => itinerary.setCustomDays(Number(e.target.value))} className="w-full accent-[#006FB4]" />
              <div className="text-center mt-2 text-[#006FB4]" style={{ fontSize: "28px", fontWeight: 800 }}>{itinerary.customDays} {itinerary.customDays === 1 ? "Day" : "Days"}</div>
            </div>
          )}

          <div className="bg-white rounded-[24px] p-5 border border-gray-100 shadow-sm">
            <h4 className="text-[#1A1A1A] mb-3" style={{ fontSize: "15px", fontWeight: 800 }}>Trip Summary</h4>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#006FB4]/5 rounded-2xl p-3">
                <MapPin className="w-5 h-5 text-[#006FB4] mx-auto mb-1" />
                <span className="text-[#1A1A1A] block" style={{ fontSize: "18px", fontWeight: 800 }}>{itinerary.selectedSpots.length}</span>
                <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>Spots</span>
              </div>
              <div className="bg-[#FF7A00]/5 rounded-2xl p-3">
                <Calendar className="w-5 h-5 text-[#FF7A00] mx-auto mb-1" />
                <span className="text-[#1A1A1A] block" style={{ fontSize: "18px", fontWeight: 800 }}>{itinerary.dayCount}</span>
                <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>Days</span>
              </div>
              <div className="bg-[#00C851]/5 rounded-2xl p-3">
                <DollarSign className="w-5 h-5 text-[#00C851] mx-auto mb-1" />
                <span className="text-[#1A1A1A] block" style={{ fontSize: "18px", fontWeight: 800 }}>{formatFee(itinerary.totalFees)}</span>
                <span className="text-[#6B7280]" style={{ fontSize: "11px" }}>Fees</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 mt-8">
          <button onClick={() => { itinerary.generateItinerary(); setStep("itinerary"); }} className="w-full py-5 bg-[#FF7A00] text-white rounded-[20px] shadow-xl shadow-[#FF7A00]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3" style={{ fontSize: "17px", fontWeight: 800 }}>
            <Sparkles className="w-5 h-5" />Generate Itinerary
          </button>
        </div>
      </div>
    );
  }

  // STEP: Generated Itinerary
  if (step === "itinerary" && itinerary.generatedPlan) {
    const plan = itinerary.generatedPlan;
    const day = plan[activeDay] || plan[0];
    const grandTotal = plan.reduce((s, d) => s + d.totalFees, 0);
    const grandDist = plan.reduce((s, d) => s + d.totalDistance, 0);

    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-32">
        <div className="bg-gradient-to-br from-[#006FB4] to-[#004d80] px-6 pt-6 pb-8 rounded-b-[36px] shadow-xl">
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => setStep("duration")} className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center"><X className="w-5 h-5 text-white" /></button>
            <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 800 }}>Your Itinerary</h2>
            <button onClick={() => navigate("/app/itinerary-map", { state: { plan: itinerary.generatedPlan, region: itinerary.selectedRegion } })} className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center shadow-lg">
              <Navigation className="w-5 h-5 text-white" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <span className="text-white block" style={{ fontSize: "20px", fontWeight: 800 }}>{Math.round(grandDist)} km</span>
              <span className="text-white/60" style={{ fontSize: "11px" }}>Total Distance</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <span className="text-white block" style={{ fontSize: "20px", fontWeight: 800 }}>{formatFee(grandTotal)}</span>
              <span className="text-white/60" style={{ fontSize: "11px" }}>Total Fees</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
              <span className="text-white block" style={{ fontSize: "20px", fontWeight: 800 }}>{plan.length}</span>
              <span className="text-white/60" style={{ fontSize: "11px" }}>Days</span>
            </div>
          </div>
        </div>

        {/* Day Tabs */}
        <div className="px-6 pt-5">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {plan.map((d, i) => (
              <button key={i} onClick={() => setActiveDay(i)} className={`flex flex-col items-center px-5 py-3 rounded-2xl min-w-[80px] transition-all ${i === activeDay ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25" : "bg-white text-[#6B7280] border border-gray-100"}`}>
                <span style={{ fontSize: "14px", fontWeight: 800 }}>Day {d.day}</span>
                <span style={{ fontSize: "11px", fontWeight: 600, opacity: 0.8 }}>{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Day Summary Bar */}
        {day && (
          <div className="px-6 mt-4">
            <div className="flex gap-3 mb-5">
              <div className="flex-1 bg-[#006FB4]/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Route className="w-4 h-4 text-[#006FB4]" />
                <span className="text-[#1A1A1A]" style={{ fontSize: "13px", fontWeight: 700 }}>{day.totalDistance} km</span>
              </div>
              <div className="flex-1 bg-[#FF7A00]/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF7A00]" />
                <span className="text-[#1A1A1A]" style={{ fontSize: "13px", fontWeight: 700 }}>{day.totalTravelTime} min</span>
              </div>
              <div className="flex-1 bg-[#00C851]/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#00C851]" />
                <span className="text-[#1A1A1A]" style={{ fontSize: "13px", fontWeight: 700 }}>{formatFee(day.totalFees)}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-[19px] top-6 bottom-6 w-[3px] bg-gradient-to-b from-[#006FB4] via-[#FF7A00] to-[#00C851] rounded-full" />
              <div className="space-y-4">
                {day.events.map((ev, i) => (
                  <div key={i}>
                    {ev.travelFromPrev > 0 && (
                      <div className="ml-[42px] mb-2 flex items-center gap-2 text-[#9CA3AF]">
                        <Route className="w-3 h-3" />
                        <span style={{ fontSize: "11px", fontWeight: 600 }}>{ev.distFromPrev} km • ~{ev.travelFromPrev} min travel</span>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 flex flex-col items-center z-10">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${categoryColors[ev.spot.category]}15`, border: `3px solid ${categoryColors[ev.spot.category]}` }}>
                          <span style={{ fontSize: "16px" }}>{categoryEmoji[ev.spot.category]}</span>
                        </div>
                      </div>
                      <div className="flex-1 bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                            <ImageWithFallback src={ev.spot.image} alt={ev.spot.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[#006FB4]" style={{ fontSize: "12px", fontWeight: 800 }}>{ev.time}</span>
                              {spotFee(ev.spot) > 0 && <span className="text-[#FF7A00]" style={{ fontSize: "11px", fontWeight: 800 }}>{formatFee(spotFee(ev.spot))}</span>}
                            </div>
                            <h4 className="text-[#1A1A1A] mb-0.5" style={{ fontSize: "15px", fontWeight: 800 }}>{ev.spot.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[#6B7280] flex items-center gap-1" style={{ fontSize: "11px" }}><Clock className="w-3 h-3" />{ev.spot.suggestedDuration} min</span>
                              <span className="px-1.5 py-0.5 rounded text-white" style={{ fontSize: "9px", fontWeight: 800, backgroundColor: categoryColors[ev.spot.category] }}>{ev.spot.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Buttons */}
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-6 pb-4 pt-3 bg-gradient-to-t from-[#F9F9FC] to-transparent z-20">
          <button onClick={() => navigate("/app/itinerary-map", { state: { plan: itinerary.generatedPlan, region: itinerary.selectedRegion } })} className="w-full py-5 bg-[#006FB4] text-white rounded-[20px] shadow-xl shadow-[#006FB4]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3" style={{ fontSize: "17px", fontWeight: 800 }}>
            <Navigation className="w-5 h-5" />View on Map
          </button>
        </div>
      </div>
    );
  }

  return null;
}

import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Search, MapPin, Clock, DollarSign, ChevronRight, Sparkles, Trash2, GripVertical, X, ChevronDown, Route, Calendar, ArrowRight, CheckCircle2, Circle, Navigation, Minus, Plus, Sun, Sunset, ArrowLeft, Menu, Settings2, CalendarDays } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { philippineRegions, allRegionNames, haversineDistance, estimateTravelMinutes, formatFee, type PlannerSpot } from "../data/philippineRegions";
import { useItinerary, type TripDuration } from "../hooks/useItinerary";
import { useLocalStorage } from "../hooks/useLocalStorage";

const categoryColors: Record<string, string> = {
  Beach: "#006FB4", Adventure: "#FF7A00", Historical: "#9C27B0",
  Cultural: "#E91E63", Nature: "#00C851", Food: "#FF5722",
};

const categoryEmoji: Record<string, string> = {
  Beach: "🏖️", Adventure: "🧗", Historical: "🏛️",
  Cultural: "🎭", Nature: "🌿", Food: "🍜",
};

type Step = "search" | "select" | "duration" | "schedule" | "itinerary";

export function ItineraryPlanner() {
  const navigate = useNavigate();
  const [step, setStep] = useLocalStorage<Step>("planner_step", "search");
  const [searchQuery, setSearchQuery] = useState("");
  const [catFilter, setCatFilter] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useLocalStorage("planner_active_day", 0);
  const itinerary = useItinerary();
  const [globalDays, setGlobalDays] = useState(2);

  const handleGenerateItinerary = () => {
    // Generate
    itinerary.generateItinerary(globalDays);
    setStep("itinerary");
  };
  // Auto-regenerate plan if it becomes null while on itinerary step (e.g. after removing a spot)
  useEffect(() => {
    if (step === "itinerary" && !itinerary.generatedPlan && itinerary.selectedSpots.length > 0) {
      itinerary.generateItinerary(globalDays);
    }
  }, [step, itinerary.generatedPlan, itinerary.selectedSpots, itinerary.generateItinerary, globalDays]);


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
          matchingSpots: matchingSpots
        });
      }
    });

    return results;
  }, [searchQuery]);

  const filteredSpots = useMemo(() => {
    if (!itinerary.selectedRegions || itinerary.selectedRegions.length === 0) return [];
    const combinedSpots = itinerary.selectedRegions.flatMap(regionName => {
      const region = philippineRegions[regionName];
      return region ? region.spots : [];
    });
    return combinedSpots.filter(s => !catFilter || s.category === catFilter);
  }, [itinerary.selectedRegions, catFilter]);

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
            {searchQuery ? "Search Results" : "Philippine Regions"}
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
                    onClick={() => {
                      const regions = itinerary.selectedRegions || [];
                      if (regions.includes(regionName)) {
                        itinerary.setSelectedRegions(regions.filter(r => r !== regionName));
                      } else {
                        itinerary.setSelectedRegions([...regions, regionName]);
                      }
                    }}
                    className={`w-full p-4 flex items-center gap-4 transition-all group ${itinerary.selectedRegions?.includes(regionName) ? "bg-[#006FB4]/5 border-2 border-[#006FB4]" : "hover:bg-gray-50 border-2 border-transparent"}`}
                  >
                    <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner relative">
                      <ImageWithFallback src={region.spots[0]?.image || ""} alt={regionName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      {itinerary.selectedRegions?.includes(regionName) && (
                        <div className="absolute inset-0 bg-[#006FB4]/20 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="text-[#1A1A1A]" style={{ fontSize: "17px", fontWeight: 800 }}>{regionName}</h4>
                      <p className="text-[#6B7280]" style={{ fontSize: "13px", fontWeight: 600 }}>{spotCount} attractions</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${itinerary.selectedRegions?.includes(regionName) ? "border-[#006FB4] bg-[#006FB4]" : "border-gray-300"}`}>
                      {itinerary.selectedRegions?.includes(regionName) && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </div>
                  </button>

                  {matchingSpots.length > 0 && searchQuery && (
                    <div className="px-4 pb-4 pt-1">
                      <div className="text-xs font-bold text-gray-400 mb-2 uppercase">Matching Spots</div>
                      <div className="space-y-2">
                        {matchingSpots.map(spot => (
                          <div key={spot.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
                            <img src={spot.image} alt={spot.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div className="flex-1 text-sm font-semibold text-gray-800">{spot.name}</div>
                            <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: categoryColors[spot.category] }}>{spot.category}</span>
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

        {itinerary.selectedRegions && itinerary.selectedRegions.length > 0 && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-6 pb-4 pt-3 z-40">
            <button onClick={() => setStep("select")} className="w-full py-5 bg-[#FF7A00] text-white rounded-[20px] shadow-2xl shadow-[#FF7A00]/40 active:scale-[0.98] transition-transform flex items-center justify-center gap-3" style={{ fontSize: "17px", fontWeight: 800 }}>
              Continue ({itinerary.selectedRegions.length} region{itinerary.selectedRegions.length > 1 ? 's' : ''}) <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    );
  }

  // STEP: Select Destinations
  if (step === "select" && itinerary.selectedRegions && itinerary.selectedRegions.length > 0) {
    const cats = [...new Set(filteredSpots.map(s => s.category))];
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-40">
        <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-6 py-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => { setStep("search"); itinerary.clearAll(); }} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center"><X className="w-5 h-5 text-[#1A1A1A]" /></button>
            <div className="flex-1">
              <h2 className="text-[#1A1A1A]" style={{ fontSize: "20px", fontWeight: 800 }}>{itinerary.selectedRegions.length > 1 ? "Multiple Regions" : itinerary.selectedRegions[0]}</h2>
              <p className="text-[#6B7280]" style={{ fontSize: "13px" }}>{itinerary.selectedSpots.length} selected</p>
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

        <div className="px-6 flex items-center justify-between mt-4 mb-4">
          <span className="text-[#6B7280]" style={{ fontSize: "14px", fontWeight: 600 }}>
            {itinerary.selectedSpots.length} spots selected
          </span>
          <button
            onClick={() => {
              const unselectedInView = filteredSpots.filter(s => !itinerary.isSelected(s.id));
              if (unselectedInView.length > 0) {
                unselectedInView.forEach(s => itinerary.toggleSpot(s));
              } else {
                filteredSpots.forEach(s => itinerary.toggleSpot(s));
              }
            }}
            className="text-[#006FB4] hover:bg-[#006FB4]/5 px-3 py-1 rounded-lg transition-colors"
            style={{ fontSize: "13px", fontWeight: 700 }}
          >
            {filteredSpots.every(s => itinerary.isSelected(s.id)) ? "Deselect All" : "Select All"}
          </button>
        </div>

        <div className="px-6 pt-4 space-y-4 pb-32">
          {filteredSpots.map((spot) => {
            const fee = spotFee(spot);
            return (
              <div
                key={spot.id}
                onClick={() => itinerary.toggleSpot(spot)}
                className={`bg-white rounded-[24px] p-4 flex gap-4 border-2 transition-all active:scale-[0.98] cursor-pointer shadow-sm ${itinerary.isSelected(spot.id) ? "border-[#006FB4] bg-[#006FB4]/5" : "border-transparent hover:border-gray-200"}`}
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 relative">
                  <ImageWithFallback src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                  {itinerary.isSelected(spot.id) && (
                    <div className="absolute inset-0 bg-[#006FB4]/20 flex items-center justify-center">
                      <div className="bg-[#006FB4] rounded-full p-1 shadow-lg">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="text-[#1A1A1A] truncate pr-2" style={{ fontSize: "16px", fontWeight: 800 }}>{spot.name}</h3>
                    {!itinerary.isSelected(spot.id) && (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                  <p className="text-[#6B7280] line-clamp-2 mb-2" style={{ fontSize: "12px", lineHeight: "1.4" }}>{spot.description}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md text-white" style={{ fontSize: "10px", fontWeight: 800, backgroundColor: categoryColors[spot.category] }}>{spot.category}</span>
                    {fee > 0 && <span className="text-[#FF7A00] bg-[#FF7A00]/10 px-2 py-0.5 rounded-md" style={{ fontSize: "10px", fontWeight: 800 }}>{formatFee(fee)}</span>}
                    <span className="text-[#6B7280] flex items-center gap-1" style={{ fontSize: "10px", fontWeight: 600 }}><Clock className="w-3 h-3" />{spot.suggestedDuration}min</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
            <button onClick={() => { if (itinerary.selectedSpots.length >= 1) setStep("duration"); }} disabled={itinerary.selectedSpots.length < 1} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-2 transition-all ${itinerary.selectedSpots.length >= 1 ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25 active:scale-[0.98]" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`} style={{ fontSize: "16px", fontWeight: 800 }}>
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }
  // STEP: Duration Selection
  if (step === "duration") {
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-40">
        <div className="bg-[#ff7800] px-4 pt-6 pb-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <button onClick={() => setStep("select")} className="w-10 h-10 flex items-center justify-center active:scale-95 transition-transform">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-white" style={{ fontSize: "18px", fontWeight: 800 }}>Trip Duration</h1>
          <div className="w-10" />
        </div>

        <div className="px-6 py-12 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center mb-6">
            <Calendar className="w-10 h-10 text-[#ff7800]" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1A1A1A] mb-2">How long is your stay?</h2>
          <p className="text-[#6B7280] mb-10 max-w-[280px]">Select the number of days you want to explore these spots.</p>

          <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-gray-200/50 border border-gray-100 w-full max-w-sm relative">
            <div className="text-center text-[#6B7280] uppercase tracking-widest mb-6" style={{ fontSize: "11px", fontWeight: 800 }}>Days of Stay</div>
            <div className="flex items-center justify-center gap-8 mb-4">
              <button onClick={() => setGlobalDays(Math.max(1, globalDays - 1))} className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#ff7800] hover:bg-orange-50 active:scale-95 transition-all border border-gray-100">
                <Minus className="w-6 h-6" />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-[#1A1A1A]">{globalDays}</span>
                <span className="text-[#6B7280] font-bold" style={{ fontSize: "13px" }}>{globalDays === 1 ? 'Day' : 'Days'}</span>
              </div>
              <button onClick={() => setGlobalDays(globalDays + 1)} className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-[#ff7800] hover:bg-orange-50 active:scale-95 transition-all border border-gray-100">
                <Plus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-6 z-20">
          <button onClick={() => { itinerary.generateItinerary(globalDays); setStep("schedule"); }} className="w-full bg-[#ff7800] text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-[#ff7800]/30 active:scale-[0.98] transition-transform" style={{ fontSize: "17px", fontWeight: 800 }}>
            Continue to Budgeting <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // STEP: Budgeting / Schedule Allocation
  if (step === "schedule" && itinerary.generatedPlan) {
    const plan = itinerary.generatedPlan;
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-40">
        {/* Purple Header */}
        <div className="bg-gradient-to-br from-[#7B2CBF] to-[#5A189A] px-6 pt-8 pb-10 rounded-b-[40px] shadow-xl relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full" />
          <div className="absolute bottom-[-40px] left-[-20px] w-32 h-32 bg-white/5 rounded-full" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <button onClick={() => setStep("duration")} className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="flex flex-col items-center">
              <h1 className="text-white flex items-center gap-2" style={{ fontSize: "20px", fontWeight: 800 }}>
                Schedule Your Trip ⏰
              </h1>
              <p className="text-white/70" style={{ fontSize: "13px", fontWeight: 500 }}>Set time frames for each day</p>
            </div>
            <div className="w-10" />
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center">
              <span className="text-white text-2xl font-black">{globalDays}</span>
              <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider">Total Days</span>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex flex-col items-center">
              <span className="text-white text-2xl font-black">{itinerary.selectedSpots.length}</span>
              <span className="text-white/60 text-[11px] font-bold uppercase tracking-wider">Destinations</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-8 space-y-6">
          {itinerary.selectedSpots.map((spot, idx) => {
            const config = itinerary.getSpotStayConfig(spot.id);
            return (
              <div key={spot.id} className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-100 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 shadow-inner">
                    <ImageWithFallback src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[#1A1A1A] truncate" style={{ fontSize: "18px", fontWeight: 800 }}>{spot.name}</h3>
                      <div className={`px-2.5 py-1 rounded-full flex items-center gap-1.5`} style={{ backgroundColor: `${categoryColors[spot.category]}20` }}>
                        <span style={{ fontSize: "10px" }}>{categoryEmoji[spot.category]}</span>
                        <span className="font-extrabold uppercase" style={{ fontSize: "10px", color: categoryColors[spot.category] }}>{spot.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-[#6B7280] font-bold" style={{ fontSize: "13px" }}>{config.daysToStay} {config.daysToStay === 1 ? 'day' : 'days'} stay</p>
                      
                      {/* Stay Duration Controls */}
                      <div className="flex items-center gap-2 bg-[#F9F9FC] rounded-lg px-2 py-1 border border-gray-50">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const newDays = Math.max(1, config.daysToStay - 1);
                            itinerary.updateSpotStayConfig(spot.id, { daysToStay: newDays });
                            setTimeout(() => itinerary.generateItinerary(globalDays), 50);
                          }}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#ff7800] hover:bg-orange-50 active:scale-95 transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[#1A1A1A] font-extrabold" style={{ fontSize: "12px" }}>{config.daysToStay}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            const newDays = Math.min(globalDays, config.daysToStay + 1);
                            itinerary.updateSpotStayConfig(spot.id, { daysToStay: newDays });
                            setTimeout(() => itinerary.generateItinerary(globalDays), 50);
                          }}
                          className="w-6 h-6 rounded flex items-center justify-center text-[#ff7800] hover:bg-orange-50 active:scale-95 transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Start Time */}
                  <div className="bg-[#F9F9FC] rounded-[20px] p-4 border border-gray-100 flex flex-col gap-2 relative group">
                    <div className="flex items-center gap-2 text-[#FF7A00]">
                      <Sun className="w-3.5 h-3.5" />
                      <span className="font-bold" style={{ fontSize: "11px" }}>Start Time</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1A1A1A] font-extrabold" style={{ fontSize: "15px" }}>{config.startTime || "8:00 AM"}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <select 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      value={config.startTime}
                      onChange={(e) => itinerary.updateSpotStayConfig(spot.id, { startTime: e.target.value })}
                    >
                      {Array.from({ length: 13 }).map((_, i) => (
                        <option key={i} value={`${i + 6}:00`}>{i + 6 > 12 ? i - 6 : i + 6}:00 {i + 6 >= 12 ? 'PM' : 'AM'}</option>
                      ))}
                    </select>
                  </div>

                  {/* End Time */}
                  <div className="bg-[#F9F9FC] rounded-[20px] p-4 border border-gray-100 flex flex-col gap-2 relative group">
                    <div className="flex items-center gap-2 text-[#7B2CBF]">
                      <Sunset className="w-3.5 h-3.5" />
                      <span className="font-bold" style={{ fontSize: "11px" }}>End Time</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1A1A1A] font-extrabold" style={{ fontSize: "15px" }}>{config.endTime || "5:00 PM"}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                    <select 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      value={config.endTime}
                      onChange={(e) => itinerary.updateSpotStayConfig(spot.id, { endTime: e.target.value })}
                    >
                      {Array.from({ length: 13 }).map((_, i) => (
                        <option key={i} value={`${i + 10}:00`}>{i + 10 > 12 ? i - 2 : i + 10}:00 {i + 10 >= 12 ? 'PM' : 'AM'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Day Assignment Selection (Moved inside card for utility) */}
                <div className="bg-[#F9F9FC] rounded-2xl p-3 border border-gray-100 flex items-center justify-between">
                  <span className="text-[#6B7280] font-bold" style={{ fontSize: "12px" }}>Assigned Day</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#1A1A1A] font-extrabold" style={{ fontSize: "14px" }}>Day {config.dayIndex !== undefined ? config.dayIndex + 1 : idx + 1}</span>
                    <div className="relative">
                      <select 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        value={config.dayIndex ?? idx}
                        onChange={(e) => {
                          itinerary.updateSpotStayConfig(spot.id, { dayIndex: parseInt(e.target.value) });
                          setTimeout(() => itinerary.generateItinerary(globalDays), 50);
                        }}
                      >
                        {Array.from({ length: globalDays }).map((_, i) => (
                          <option key={i} value={i}>Day {i + 1}</option>
                        ))}
                      </select>
                      <Settings2 className="w-4 h-4 text-[#FF7A00]" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Day Overview Section */}
          <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <CalendarDays className="w-4 h-4 text-[#7B2CBF]" />
              </div>
              <h3 className="text-[#1A1A1A] font-extrabold" style={{ fontSize: "18px" }}>Day Overview</h3>
            </div>

            <div className="space-y-4">
              {plan.map((dayPlan, dIdx) => (
                <div key={dIdx} className="space-y-3">
                  {dayPlan.events.map((event, eIdx) => (
                    <div key={eIdx} className="flex items-center gap-4 bg-[#F9F9FC] p-3 rounded-2xl border border-gray-50">
                      <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold" style={{ borderColor: categoryColors[event.spot.category], color: categoryColors[event.spot.category] }}>
                        {eIdx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#1A1A1A] font-extrabold truncate" style={{ fontSize: "14px" }}>{event.spot.name}</h4>
                        <p className="text-[#6B7280] font-bold" style={{ fontSize: "11px" }}>Day {dayPlan.day} • {itinerary.getSpotStayConfig(event.spot.id).startTime || "08:00"} - {itinerary.getSpotStayConfig(event.spot.id).endTime || "17:00"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[448px] px-6 z-20">
          <button 
            onClick={() => {
              itinerary.generateItinerary(globalDays);
              setStep("itinerary");
            }} 
            className="w-full bg-gradient-to-r from-[#FF7A00] to-[#FF9500] text-white py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-200 active:scale-[0.98] transition-transform" 
            style={{ fontSize: "18px", fontWeight: 800 }}
          >
            <Sparkles className="w-5 h-5" />
            Generate Itinerary
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
            <button onClick={() => setStep("schedule")} className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center"><X className="w-5 h-5 text-white" /></button>
            <h2 className="text-white" style={{ fontSize: "18px", fontWeight: 800 }}>Your Itinerary</h2>
            <button onClick={() => navigate("/app/itinerary-map", { state: { plan: itinerary.generatedPlan, region: itinerary.selectedRegions?.join(', ') || "Multiple Regions", from: "/app/planner" } })} className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center shadow-lg">
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
                              <div className="flex items-center gap-1">
                                {((activeDay * Math.ceil(itinerary.selectedSpots.length / itinerary.dayCount)) + i) > 0 && (
                                  <button onClick={() => itinerary.moveSpot((activeDay * Math.ceil(itinerary.selectedSpots.length / itinerary.dayCount)) + i, (activeDay * Math.ceil(itinerary.selectedSpots.length / itinerary.dayCount)) + i - 1)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400"><ChevronDown className="w-4 h-4 rotate-180" /></button>
                                )}
                                {((activeDay * Math.ceil(itinerary.selectedSpots.length / itinerary.dayCount)) + i) < itinerary.selectedSpots.length - 1 && (
                                  <button onClick={() => itinerary.moveSpot((activeDay * Math.ceil(itinerary.selectedSpots.length / itinerary.dayCount)) + i, (activeDay * Math.ceil(itinerary.selectedSpots.length / itinerary.dayCount)) + i + 1)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400"><ChevronDown className="w-4 h-4" /></button>
                                )}
                                <button
                                  onClick={() => itinerary.removeSpot(ev.spot.id)}
                                  className="p-1 hover:bg-red-50 rounded-lg text-red-400 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <h4 className="text-[#1A1A1A] mb-0.5" style={{ fontSize: "15px", fontWeight: 800 }}>{ev.spot.name}</h4>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[#6B7280] flex items-center gap-1" style={{ fontSize: "11px" }}><Clock className="w-3 h-3" />{ev.spot.suggestedDuration} min</span>
                                <span className="px-1.5 py-0.5 rounded text-white" style={{ fontSize: "9px", fontWeight: 800, backgroundColor: categoryColors[ev.spot.category] }}>{ev.spot.category}</span>
                              </div>
                              {spotFee(ev.spot) > 0 && <span className="text-[#FF7A00]" style={{ fontSize: "11px", fontWeight: 800 }}>{formatFee(spotFee(ev.spot))}</span>}
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

        <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 w-full max-w-[448px] px-6 pb-6 pt-3 bg-gradient-to-t from-[#F9F9FC] via-[#F9F9FC]/90 to-transparent z-20 space-y-3">
          <button
            onClick={() => {
              const newTrip = {
                id: Date.now().toString(),
                destination: itinerary.selectedRegion,
                days: itinerary.dayCount,
                activities: itinerary.generatedPlan,
                startDate: itinerary.startDate,
                endDate: itinerary.endDate,
                totalFee: itinerary.totalFees
              };

              const storedTrips = JSON.parse(localStorage.getItem("itineraries") || "[]");
              storedTrips.push(newTrip);
              localStorage.setItem("itineraries", JSON.stringify(storedTrips));
              localStorage.setItem("activeTripId", newTrip.id);

              itinerary.clearAll();
              setStep("search");
              setActiveDay(0);

              navigate("/app/trips");
            }}
            className="w-full py-5 bg-[#FF7A00] text-white rounded-[20px] shadow-xl shadow-[#FF7A00]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3" style={{ fontSize: "17px", fontWeight: 800 }}>
            <Sparkles className="w-5 h-5" />Confirm Itinerary
          </button>

          <button onClick={() => navigate("/app/itinerary-map", { state: { plan: itinerary.generatedPlan, region: itinerary.selectedRegions?.join(', ') || "Multiple Regions", from: "/app/planner" } })} className="w-full py-4 bg-white border border-gray-200 text-[#006FB4] rounded-[20px] shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-3" style={{ fontSize: "16px", fontWeight: 700 }}>
            <Route className="w-5 h-5" />Explore Full Trip Route
          </button>
        </div>
      </div>
    );
  }

  return null;
}

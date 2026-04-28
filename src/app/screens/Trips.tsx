import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, MapPin, MoreHorizontal, Edit3, Sparkles, Route, Clock, DollarSign, X, Ticket, Navigation, Calendar } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapContainer, TileLayer, Marker, Polyline, useMap, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helper to keep map centered
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const categoryColors: Record<string, string> = {
  Beach: "#006FB4", Adventure: "#FF7A00", Historical: "#9C27B0",
  Cultural: "#E91E63", Nature: "#00C851", Food: "#FF5722",
};

const categoryEmoji: Record<string, string> = {
  Beach: "🏖️", Adventure: "🧗", Historical: "🏛️",
  Cultural: "🎭", Nature: "🌿", Food: "🍜",
};

export function Trips() {
  const navigate = useNavigate();
  // Read all saved trips
  const [allTrips, setAllTrips] = useLocalStorage<any[]>("itineraries", []);
  const [activeTripId, setActiveTripId] = useLocalStorage<string | null>("activeTripId", null);
  const [bookings, setBookings] = useLocalStorage<any[]>("bookings", []);

  // Backwards compatibility for single itinerary
  const [legacyTrip, setLegacyTrip] = useLocalStorage<any>("itinerary", null);
  if (legacyTrip && allTrips.length === 0) {
    const newId = Date.now().toString();
    const migratedTrip = { ...legacyTrip, id: newId };
    setAllTrips([migratedTrip]);
    setActiveTripId(newId);
    setLegacyTrip(null);
  }

  const activeTrip = useMemo(() => {
    return allTrips.find(t => t.id === activeTripId) || allTrips[0] || null;
  }, [allTrips, activeTripId]);

  const daysArray = activeTrip?.activities || [];

  const [activeDay, setActiveDay] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);

  const [editNameValue, setEditNameValue] = useState(activeTrip?.destination ? `${activeTrip.destination} Adventure` : "Plan Your Adventure");

  const clearAll = () => {
    if (window.confirm("Are you sure you want to remove all itineraries?")) {
      setAllTrips([]);
      setActiveTripId(null);
      setShowMenu(false);
    }
  };

  const removeCurrentTrip = () => {
    if (window.confirm("Remove this itinerary?")) {
      const remaining = allTrips.filter(t => t.id !== activeTrip?.id);
      setAllTrips(remaining);
      setActiveTripId(remaining.length > 0 ? remaining[0].id : null);
      setShowMenu(false);
    }
  };

  const tripStartDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d;
  }, []);

  const getDayDate = (dayIndex: number) => {
    const d = new Date(tripStartDate);
    d.setDate(d.getDate() + dayIndex);
    return d;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formatDateRange = () => {
    const start = tripStartDate;
    const end = new Date(tripStartDate);
    end.setDate(end.getDate() + Math.max(daysArray.length - 1, 0));
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  const currentDayPlan = daysArray[activeDay] || null;

  const displayTripName = activeTrip?.destination ? `${activeTrip.destination} Adventure` : "Adventure";

  const activities = useMemo(() => {
    if (!currentDayPlan) return [];
    return currentDayPlan.events.map((ev: any) => ({
      time: ev.time,
      title: ev.spot.name,
      subtitle: ev.spot.category,
      image: ev.spot.image,
      color: categoryColors[ev.spot.category] || "#006FB4",
      emoji: categoryEmoji[ev.spot.category] || "📍",
      spotId: ev.spot.id,
      duration: ev.spot.suggestedDuration,
      travelFromPrev: ev.travelFromPrev,
      distFromPrev: ev.distFromPrev,
      fee: ev.spot.tourismFee + ev.spot.environmentalFee + ev.spot.entryFee,
      gps: ev.spot.gps
    }));
  }, [currentDayPlan]);

  return (
    <div className="bg-[#F9F9FC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-5 flex items-center justify-between border-b border-gray-50 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>My Itineraries</h1>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 w-48 z-50">
              <button onClick={() => { navigate("/app/planner"); setShowMenu(false); }} className="w-full px-5 py-3 text-left hover:bg-gray-50 text-[#1A1A1A]" style={{ fontSize: '15px', fontWeight: 600 }}>
                Smart Planner
              </button>
              {allTrips.length > 0 && (
                <button onClick={removeCurrentTrip} className="w-full px-5 py-3 text-left hover:bg-red-50 text-red-500" style={{ fontSize: '15px', fontWeight: 600 }}>
                  Delete This Trip
                </button>
              )}
              <button onClick={clearAll} className="w-full px-5 py-3 text-left hover:bg-red-50 text-red-500" style={{ fontSize: '15px', fontWeight: 600 }}>
                Clear All Trips
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trip Selector Tabs */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex gap-3 overflow-x-auto no-scrollbar items-center">
          {allTrips.map((trip: any, index: number) => (
            <button
              key={trip.id}
              onClick={() => { setActiveTripId(trip.id); setActiveDay(0); }}
              className={`flex-shrink-0 w-12 h-12 rounded-full transition-all flex items-center justify-center ${activeTrip?.id === trip.id
                ? "bg-[#006FB4] text-white shadow-lg shadow-[#006FB4]/30 scale-105"
                : "bg-white border-2 border-gray-200 text-[#6B7280] shadow-sm"
                }`}
              style={{ fontSize: "16px", fontWeight: 800 }}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => navigate("/app/planner")}
            className="flex-shrink-0 w-12 h-12 bg-white border-2 border-dashed border-gray-300 rounded-full text-[#6B7280] flex items-center justify-center hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      {allTrips.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-10 py-20 text-center">
          <div className="w-24 h-24 bg-[#F3F4F6] rounded-full flex items-center justify-center mb-6">
            <Sparkles className="w-10 h-10 text-[#9CA3AF]" />
          </div>
          <h2 className="text-[#1A1A1A] mb-2" style={{ fontSize: '22px', fontWeight: 800 }}>No Trips Planned Yet</h2>
          <p className="text-[#6B7280] mb-8" style={{ fontSize: '15px', lineHeight: 1.5 }}>
            Ready for your next adventure? Use our Smart Planner to create a custom itinerary in seconds.
          </p>
          <button
            onClick={() => navigate("/app/planner")}
            className="px-8 py-4 bg-[#FF7A00] text-white rounded-[20px] shadow-xl shadow-[#FF7A00]/25 font-bold flex items-center gap-3 active:scale-95 transition-all"
          >
            <Sparkles className="w-5 h-5" /> Start Planning
          </button>
        </div>
      ) : (
        <>
          {/* Trip Info Card */}
          <div className="px-6 pt-4">
            <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 mb-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 mr-4">
                  {isEditingName ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editNameValue}
                        onChange={(e) => setEditNameValue(e.target.value)}
                        className="bg-gray-50 border border-[#FF7A00] rounded-xl px-4 py-2 w-full text-[#1A1A1A] focus:outline-none"
                        style={{ fontSize: '18px', fontWeight: 800 }}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-[#1A1A1A] flex items-center gap-2" style={{ fontSize: '22px', fontWeight: 800 }}>
                        {editNameValue} <span style={{ fontSize: '20px' }}>🌴</span>
                      </h2>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (isEditingName) {
                      // Save new name to the active trip
                      const updated = allTrips.map(t => t.id === activeTrip.id ? { ...t, destination: editNameValue.replace(" Adventure", "") } : t);
                      setAllTrips(updated);
                      setIsEditingName(false);
                    } else {
                      setEditNameValue(displayTripName);
                      setIsEditingName(true);
                    }
                  }}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isEditingName ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/30" : "bg-[#F3F4F6] text-[#6B7280]"}`}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Day Tabs */}
              {daysArray.length > 0 && (
                <div className="flex gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar">
                  {daysArray.map((dayPlan: any, index: number) => {
                    const dayDate = getDayDate(index);
                    const isActive = index === activeDay;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveDay(index)}
                        className={`flex flex-col items-center justify-center px-4 py-3 rounded-2xl min-w-[72px] transition-all ${isActive
                          ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25"
                          : "bg-[#F3F4F6] text-[#6B7280] hover:bg-gray-200"
                          }`}
                      >
                        <span style={{ fontSize: '14px', fontWeight: 800 }}>Day {dayPlan.day}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          {currentDayPlan && (
            <div className="px-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 bg-[#006FB4]/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Route className="w-4 h-4 text-[#006FB4]" />
                  <span className="text-[#1A1A1A]" style={{ fontSize: "13px", fontWeight: 700 }}>{currentDayPlan.totalDistance} km</span>
                </div>
                <div className="flex-1 bg-[#FF7A00]/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF7A00]" />
                  <span className="text-[#1A1A1A]" style={{ fontSize: "13px", fontWeight: 700 }}>{currentDayPlan.totalTravelTime} min</span>
                </div>
                <div className="flex-1 bg-[#00C851]/5 rounded-2xl px-4 py-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#00C851]" />
                  <span className="text-[#1A1A1A]" style={{ fontSize: "13px", fontWeight: 700 }}>₱{currentDayPlan.totalFees}</span>
                </div>
              </div>

              {/* Map Outline Preview */}
              <div className="mb-8">
                <div className="bg-white rounded-[28px] p-2 shadow-sm border border-gray-100 overflow-hidden relative" style={{ height: "200px" }}>
                  <MapContainer
                    center={activities[0]?.gps || [8.0, 125.5]}
                    zoom={10}
                    zoomControl={false}
                    className="w-full h-full rounded-[24px]"
                    dragging={true}
                    touchZoom={true}
                    scrollWheelZoom={true}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                    />
                    {activities.length > 0 && <ChangeView center={activities[0]?.gps} zoom={12} />}

                    <Polyline
                      positions={activities.filter((a: any) => a.gps).map((a: any) => a.gps)}
                      color="#006FB4"
                      weight={4}
                      opacity={0.6}
                      dashArray="8, 12"
                    />

                    {activities.filter((a: any) => a.gps).map((activity: any, i: number) => (
                      <Marker
                        key={i}
                        position={activity.gps}
                        icon={new L.DivIcon({
                          html: `<div style="background: white; border: 3px solid ${activity.color}; width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 900; color: ${activity.color}; box-shadow: 0 4px 12px rgba(0,0,0,0.15); transform: translateY(-50%);">${i + 1}</div>`,
                          className: "",
                          iconSize: [28, 28],
                          iconAnchor: [14, 14]
                        })}
                      >
                        <Popup>
                          <div className="p-1">
                            <p className="font-bold text-sm mb-1">{activity.title}</p>
                            <button
                              onClick={() => navigate(`/app/destination/${activity.spotId}`)}
                              className="text-[10px] text-[#006FB4] font-bold"
                            >
                              View Details
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                  <div className="absolute bottom-3 left-3 z-[1000] flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                    <Route className="w-3.5 h-3.5 text-[#006FB4]" />
                    <span style={{ fontSize: "11px", fontWeight: 800, color: "#1A1A1A" }}>Interactive Route</span>
                  </div>
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="relative">
                <div className="absolute left-[59px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FF7A00] via-[#006FB4] to-[#6B7280] rounded-full" />
                <div className="space-y-4">
                  {activities.map((activity: any, index: number) => (
                    <div key={index} className="relative">
                      {activity.travelFromPrev > 0 && (
                        <div className="ml-[42px] mb-2 flex items-center gap-2 text-[#9CA3AF]">
                          <Route className="w-3 h-3" />
                          <span style={{ fontSize: "11px", fontWeight: 600 }}>{activity.distFromPrev} km • ~{activity.travelFromPrev} min travel</span>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <div className="w-[46px] flex-shrink-0 text-right pt-2 text-[#1A1A1A]" style={{ fontSize: '12px', fontWeight: 800 }}>
                          {activity.time}
                        </div>
                        <div className="flex-shrink-0 w-10 flex flex-col items-center z-10">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: `${activity.color}15`, border: `3px solid ${activity.color}` }}>
                            <span style={{ fontSize: "16px" }}>{activity.emoji}</span>
                          </div>
                        </div>
                        <div className="flex-1 bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                              <ImageWithFallback src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[#1A1A1A] mb-0.5" style={{ fontSize: '15px', fontWeight: 800 }}>
                                {activity.title}
                              </h4>
                              <p className="text-[#6B7280] mb-2" style={{ fontSize: '12px', fontWeight: 600 }}>
                                {activity.subtitle}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className="text-[#6B7280] flex items-center gap-1" style={{ fontSize: "11px" }}><Clock className="w-3 h-3" />{activity.duration} min</span>
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

          {/* Book Now + View Map */}
          <div className="px-6 mt-6 space-y-3 pb-8">
            {activeTrip && (
              <>
                <button
                  onClick={() => {
                    if (!activeTrip) return;
                    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
                    const allSpots: any[] = (activeTrip.activities || []).flatMap((d: any) => (d.events || []).map((e: any) => e.spot));
                    // De-duplicate spots
                    const seen = new Set<string>();
                    const uniqueSpots = allSpots.filter((s: any) => { if (!s || seen.has(s.id)) return false; seen.add(s.id); return true; });
                    // Filter out already-booked spots
                    const newSpots = uniqueSpots.filter((spot: any) => !existingBookings.some((b: any) => b.id === spot.id));

                    if (newSpots.length > 0) {
                      const newBookings = newSpots.map((spot: any) => {
                        const fee = (spot.tourismFee || 0) + (spot.environmentalFee || 0) + (spot.entryFee || 0);
                        return {
                          id: spot.id,
                          destinationId: spot.id,
                          destinationName: spot.name,
                          image: spot.image,
                          date: spot.startDate || activeTrip.startDate || new Date().toISOString(),
                          guests: 1,
                          totalPrice: `₱${fee.toLocaleString()}`,
                          status: 'confirmed' as const,
                          bookingDate: new Date().toISOString(),
                        };
                      });
                      const updatedBookings = [...existingBookings, ...newBookings];
                      localStorage.setItem('bookings', JSON.stringify(updatedBookings));
                      window.dispatchEvent(new Event('local-storage-update'));
                      alert(`✅ Successfully booked ${newSpots.length} spot${newSpots.length > 1 ? 's' : ''}!`);
                    } else {
                      alert("All spots are already booked!");
                    }
                    navigate('/app/bookings');
                  }}
                  className="w-full py-5 bg-[#FF7A00] text-white rounded-[20px] shadow-xl shadow-[#FF7A00]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                  style={{ fontSize: '17px', fontWeight: 800 }}
                >
                  <Ticket className="w-5 h-5" />
                  Book This Destination
                </button>
                <button
                  onClick={() => setShowSchedule(true)}
                  className="w-full py-4 bg-[#006FB4] text-white rounded-[20px] shadow-lg shadow-[#006FB4]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  <Calendar className="w-5 h-5" />View Schedule
                </button>
                <button
                  onClick={() => navigate("/app/itinerary-map", { state: { plan: activeTrip?.activities, region: activeTrip?.destination, from: "/app/trips" } })}
                  className="w-full py-4 bg-white border border-gray-200 text-[#006FB4] rounded-[20px] shadow-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                  style={{ fontSize: "16px", fontWeight: 700 }}
                >
                  <Navigation className="w-5 h-5" />View on Map
                </button>
              </>
            )}
          </div>
        </>
      )}

      {/* View Schedule Modal — read-only, no map */}
      {showSchedule && activeTrip && (() => {
        const allSpots: any[] = (activeTrip.activities || []).flatMap((d: any) => (d.events || []).map((e: any) => e.spot));
        const seen = new Set<string>();
        const spots = allSpots.filter((s: any) => { if (!s || seen.has(s.id)) return false; seen.add(s.id); return true; });
        const totalFees = spots.reduce((sum: number, s: any) => sum + (s.tourismFee || 0) + (s.environmentalFee || 0) + (s.entryFee || 0), 0);
        const fmtDate = (d: string) => {
          if (!d) return "—";
          try { return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
          catch { return d; }
        };

        return (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center" onClick={() => setShowSchedule(false)}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div className="relative bg-[#F9F9FC] rounded-[28px] w-[92%] max-w-[420px] max-h-[82vh] overflow-hidden shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>

              {/* Blue Gradient Header */}
              <div className="bg-gradient-to-br from-[#006FB4] to-[#0091EA] px-6 pt-6 pb-5 text-white flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 style={{ fontSize: "22px", fontWeight: 800 }}>📋 Your Schedule</h3>
                  <button onClick={() => setShowSchedule(false)} className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
                <p className="text-white/80 mb-4" style={{ fontSize: "13px", fontWeight: 600 }}>{activeTrip.destination || "Adventure"}</p>
                <div className="flex gap-3">
                  <div className="flex-1 bg-white/15 rounded-xl py-2.5 text-center backdrop-blur-sm">
                    <span className="block text-white" style={{ fontSize: "18px", fontWeight: 800 }}>{spots.length}</span>
                    <span className="text-white/70" style={{ fontSize: "10px", fontWeight: 600 }}>Spots</span>
                  </div>
                  <div className="flex-1 bg-white/15 rounded-xl py-2.5 text-center backdrop-blur-sm">
                    <span className="block text-white" style={{ fontSize: "18px", fontWeight: 800 }}>{daysArray.length}</span>
                    <span className="text-white/70" style={{ fontSize: "10px", fontWeight: 600 }}>Days</span>
                  </div>
                  <div className="flex-1 bg-white/15 rounded-xl py-2.5 text-center backdrop-blur-sm">
                    <span className="block text-white" style={{ fontSize: "18px", fontWeight: 800 }}>₱{totalFees}</span>
                    <span className="text-white/70" style={{ fontSize: "10px", fontWeight: 600 }}>Total Fees</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Spots List */}
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <h4 className="text-[#6B7280] mb-4 flex items-center gap-2" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  <MapPin className="w-3.5 h-3.5" /> Planned Spots
                </h4>

                {spots.length === 0 ? (
                  <div className="text-center py-10">
                    <span style={{ fontSize: "36px" }}>📭</span>
                    <p className="text-[#6B7280] mt-3" style={{ fontSize: "14px", fontWeight: 600 }}>No spots scheduled yet.</p>
                  </div>
                ) : (
                  spots.map((spot: any, i: number) => {
                    const fee = (spot.tourismFee || 0) + (spot.environmentalFee || 0) + (spot.entryFee || 0);
                    const catColor = categoryColors[spot.category] || "#006FB4";
                    return (
                      <div key={spot.id + "-" + i} className="relative mb-4 last:mb-0">
                        {i < spots.length - 1 && (
                          <div className="absolute left-[19px] top-[48px] bottom-[-16px] w-[2px] bg-gradient-to-b from-[#006FB4]/30 to-transparent z-0" />
                        )}
                        <div className="relative z-10 bg-white rounded-[18px] p-4 border border-gray-100 shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${catColor}15`, border: `2.5px solid ${catColor}` }}>
                              <span style={{ fontSize: "14px", fontWeight: 900, color: catColor }}>{i + 1}</span>
                            </div>
                            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                              <ImageWithFallback src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[#1A1A1A] truncate" style={{ fontSize: "15px", fontWeight: 800 }}>{spot.name}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded-md text-white" style={{ fontSize: "9px", fontWeight: 800, backgroundColor: catColor }}>{spot.category}</span>
                                {fee > 0 && <span className="text-[#FF7A00]" style={{ fontSize: "11px", fontWeight: 700 }}>₱{fee}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 ml-[52px]">
                            <div className="flex-1 bg-[#F3F4F6] rounded-lg px-3 py-2">
                              <span className="text-[#9CA3AF] block" style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>From</span>
                              <span className="text-[#1A1A1A]" style={{ fontSize: "12px", fontWeight: 700 }}>{fmtDate(spot.startDate || activeTrip.startDate || "")}</span>
                            </div>
                            <div className="flex items-center text-[#9CA3AF]" style={{ fontSize: "12px" }}>→</div>
                            <div className="flex-1 bg-[#F3F4F6] rounded-lg px-3 py-2">
                              <span className="text-[#9CA3AF] block" style={{ fontSize: "9px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>To</span>
                              <span className="text-[#1A1A1A]" style={{ fontSize: "12px", fontWeight: 700 }}>{fmtDate(spot.endDate || activeTrip.endDate || "")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Close Footer */}
              <div className="px-5 pb-5 pt-2 flex-shrink-0">
                <button onClick={() => setShowSchedule(false)} className="w-full py-3.5 bg-[#F3F4F6] text-[#6B7280] rounded-2xl active:scale-[0.98] transition-transform" style={{ fontSize: "15px", fontWeight: 700 }}>Close</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}

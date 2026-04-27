import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, MapPin, MoreHorizontal, Edit3, Sparkles, Route, Clock, DollarSign, X, Ticket, Navigation } from "lucide-react";
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
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {allTrips.map((trip: any) => (
            <button
              key={trip.id}
              onClick={() => { setActiveTripId(trip.id); setActiveDay(0); }}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full transition-all border-2 ${activeTrip?.id === trip.id
                ? "bg-[#006FB4]/5 border-[#006FB4] text-[#006FB4]"
                : "bg-white border-transparent shadow-sm text-[#6B7280]"
                }`}
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              {trip.destination}
            </button>
          ))}
          <button
            onClick={() => navigate("/app/planner")}
            className="flex-shrink-0 px-5 py-2.5 bg-white border-2 border-dashed border-gray-300 rounded-full text-[#6B7280] flex items-center gap-2 hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all"
            style={{ fontSize: "14px", fontWeight: 700 }}
          >
            <Plus className="w-4 h-4" /> New Trip
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
                      <p className="text-[#6B7280] mt-1" style={{ fontSize: '14px', fontWeight: 600 }}>
                        {formatDateRange()}
                      </p>
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
                        className={`flex flex-col items-center px-4 py-3 rounded-2xl min-w-[72px] transition-all ${isActive
                          ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25"
                          : "bg-[#F3F4F6] text-[#6B7280] hover:bg-gray-200"
                          }`}
                      >
                        <span style={{ fontSize: '13px', fontWeight: 800 }}>Day {dayPlan.day}</span>
                        <span style={{ fontSize: '11px', fontWeight: 600, opacity: isActive ? 0.9 : 0.7 }}>
                          {formatDate(dayDate)}
                        </span>
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
                    const existingBookings = JSON.parse(localStorage.getItem('user_bookings') || '[]');
                    const allSpots = activeTrip?.activities.flatMap((d: any) => d.events.map((e: any) => e.spot)) || [];
                    const newBookings = allSpots.filter((spot: any) => !existingBookings.some((b: any) => b.id === spot.id));

                    if (newBookings.length > 0) {
                      const updatedBookings = [...existingBookings, ...newBookings];
                      localStorage.setItem('user_bookings', JSON.stringify(updatedBookings));
                      window.dispatchEvent(new Event('local-storage-update'));
                      alert(`Successfully added ${allSpots.length} new spots to your bookings!`);
                    } else {
                      alert("All spots are already in your bookings!");
                    }
                    navigate(`/app/bookings`);
                  }}
                  className="w-full py-5 bg-[#FF7A00] text-white rounded-[20px] shadow-xl shadow-[#FF7A00]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
                  style={{ fontSize: '17px', fontWeight: 800 }}
                >
                  <Ticket className="w-5 h-5" />
                  Book This Destination
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
    </div>
  );
}

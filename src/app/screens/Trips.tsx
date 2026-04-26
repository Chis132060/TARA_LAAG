import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, MapPin, Trash2, MoreHorizontal, Clock, Edit3, Sparkles, Coffee, UtensilsCrossed, Camera, Waves, Mountain, Hotel } from "lucide-react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Destination } from "../data/destinations";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Default activities that get auto-generated for each destination
const defaultActivities = [
  { time: "08:00 AM", title: "Breakfast", subtitle: "Local Cuisine", icon: Coffee, color: "#FF7A00" },
  { time: "10:00 AM", title: "", subtitle: "Swim & Explore", icon: Waves, color: "#006FB4" },
  { time: "01:00 PM", title: "Lunch", subtitle: "Local Cuisine", icon: UtensilsCrossed, color: "#00C851" },
  { time: "03:00 PM", title: "", subtitle: "Photography & Sightseeing", icon: Camera, color: "#9333EA" },
  { time: "06:00 PM", title: "Back to Hotel", subtitle: "Rest & Relax", icon: Hotel, color: "#6B7280" },
];

export function Trips() {
  const navigate = useNavigate();
  const [itinerary, setItinerary] = useLocalStorage<Destination[]>("itinerary", []);
  const [tripName, setTripName] = useLocalStorage<string>("tripName", "Mindanao Adventure");
  const [activeDay, setActiveDay] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(tripName);

  const removeItem = (id: number) => {
    setItinerary(itinerary.filter(item => item.id !== id));
  };

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear your entire itinerary?")) {
      setItinerary([]);
    }
  };

  // Generate trip dates starting from tomorrow
  const [storedStartDate, setStoredStartDate] = useLocalStorage<string>("tripStartDate", new Date(new Date().setDate(new Date().getDate() + 7)).toISOString());
  const tripStartDate = useMemo(() => new Date(storedStartDate), [storedStartDate]);

  const [isEditingDates, setIsEditingDates] = useState(false);
  const [editDateValue, setEditDateValue] = useState(storedStartDate.split('T')[0]);

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
    end.setDate(end.getDate() + Math.max(itinerary.length - 1, 0));
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  // Current day's destination
  const currentDest = itinerary[activeDay] || null;

  // Build activities for the current day
  const activities = useMemo(() => {
    if (!currentDest) return [];
    return defaultActivities.map((act) => ({
      ...act,
      title: act.title || currentDest.name,
      image: act.title === "" ? currentDest.image : undefined,
    }));
  }, [currentDest]);

  if (itinerary.length === 0) {
    return (
      <div className="bg-[#F9F9FC] min-h-screen pb-24">
        {/* Header */}
        <div className="bg-white px-6 pt-6 pb-5 flex items-center gap-4 border-b border-gray-50">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>My Itinerary</h1>
        </div>

        <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
          <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-sm mb-8 border border-gray-100">
            <span style={{ fontSize: '48px' }}>🗺️</span>
          </div>
          <h3 className="text-[#1A1A1A] mb-3" style={{ fontSize: '24px', fontWeight: 800 }}>Plan Your Adventure</h3>
          <p className="text-[#6B7280] mb-10 max-w-[260px]" style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Add destinations to start building your dream Philippine itinerary!
          </p>
          <button
            onClick={() => navigate("/app/search")}
            className="px-10 py-5 bg-[#FF7A00] text-white rounded-[24px] shadow-xl shadow-[#FF7A00]/25 active:scale-95 transition-transform"
            style={{ fontSize: '18px', fontWeight: 800 }}
          >
            Explore Destinations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F9FC] min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-5 flex items-center justify-between border-b border-gray-50 sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>My Itinerary</h1>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="w-10 h-10 bg-[#F3F4F6] rounded-full flex items-center justify-center">
            <MoreHorizontal className="w-5 h-5 text-[#1A1A1A]" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 w-48 z-50">
              <button onClick={() => { navigate("/app/search"); setShowMenu(false); }} className="w-full px-5 py-3 text-left hover:bg-gray-50 text-[#1A1A1A]" style={{ fontSize: '15px', fontWeight: 600 }}>
                Add Destination
              </button>
              <button onClick={() => { clearAll(); setShowMenu(false); }} className="w-full px-5 py-3 text-left hover:bg-red-50 text-red-500" style={{ fontSize: '15px', fontWeight: 600 }}>
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Trip Info Card */}
      <div className="px-6 pt-6">
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 mr-4">
              {isEditingName ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editNameValue}
                      onChange={(e) => setEditNameValue(e.target.value)}
                      className="bg-gray-50 border border-[#FF7A00] rounded-xl px-4 py-2 w-full text-[#1A1A1A] focus:outline-none"
                      style={{ fontSize: '18px', fontWeight: 800 }}
                      autoFocus
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={editDateValue}
                      onChange={(e) => setEditDateValue(e.target.value)}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-full text-[#6B7280] focus:outline-none"
                      style={{ fontSize: '14px', fontWeight: 600 }}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-[#1A1A1A] flex items-center gap-2" style={{ fontSize: '22px', fontWeight: 800 }}>
                    {tripName} <span style={{ fontSize: '20px' }}>🌴</span>
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
                  setTripName(editNameValue);
                  if (editDateValue) {
                    setStoredStartDate(new Date(editDateValue).toISOString());
                  }
                  setIsEditingName(false);
                } else {
                  setEditNameValue(tripName);
                  setEditDateValue(storedStartDate.split('T')[0]);
                  setIsEditingName(true);
                }
              }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isEditingName ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/30" : "bg-[#F3F4F6] text-[#6B7280]"}`}
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>

          {/* Day Tabs */}
          <div className="flex gap-2 mt-5 overflow-x-auto pb-1 no-scrollbar">
            {itinerary.map((_, index) => {
              const dayDate = getDayDate(index);
              const isActive = index === activeDay;
              return (
                <button
                  key={index}
                  onClick={() => setActiveDay(index)}
                  className={`flex flex-col items-center px-4 py-3 rounded-2xl min-w-[72px] transition-all ${
                    isActive
                      ? "bg-[#FF7A00] text-white shadow-lg shadow-[#FF7A00]/25"
                      : "bg-[#F3F4F6] text-[#6B7280] hover:bg-gray-200"
                  }`}
                >
                  <span style={{ fontSize: '13px', fontWeight: 800 }}>Day {index + 1}</span>
                  <span style={{ fontSize: '11px', fontWeight: 600, opacity: isActive ? 0.9 : 0.7 }}>
                    {formatDate(dayDate)}
                  </span>
                </button>
              );
            })}
            <button
              onClick={() => navigate("/app/search")}
              className="flex items-center justify-center px-4 py-3 rounded-2xl min-w-[52px] border-2 border-dashed border-gray-200 text-[#6B7280] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {currentDest && (
        <div className="px-6">
          {/* Day destination header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback src={currentDest.image} alt={currentDest.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#1A1A1A]" style={{ fontSize: '17px', fontWeight: 800 }}>{currentDest.name}</h3>
              <div className="flex items-center gap-1 text-[#6B7280]">
                <MapPin className="w-3 h-3" />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>{currentDest.location}</span>
              </div>
            </div>
            <button
              onClick={() => removeItem(currentDest.id)}
              className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 text-red-400" />
            </button>
          </div>

          {/* Activity Timeline */}
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[59px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FF7A00] via-[#006FB4] to-[#6B7280] rounded-full" />

            <div className="space-y-1">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-4 relative py-3">
                    {/* Time */}
                    <div className="w-[46px] flex-shrink-0 text-right pt-3">
                      <span className="text-[#1A1A1A]" style={{ fontSize: '12px', fontWeight: 800 }}>
                        {activity.time.split(" ")[0]}
                      </span>
                      <span className="text-[#9CA3AF] block" style={{ fontSize: '10px', fontWeight: 700 }}>
                        {activity.time.split(" ")[1]}
                      </span>
                    </div>

                    {/* Dot */}
                    <div className="flex-shrink-0 relative z-10 pt-3">
                      <div
                        className="w-[26px] h-[26px] rounded-full flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: `${activity.color}20`, border: `2.5px solid ${activity.color}` }}
                      >
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activity.color }} />
                      </div>
                    </div>

                    {/* Activity Card */}
                    <div className="flex-1 bg-white rounded-[20px] p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        {activity.image ? (
                          <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-inner">
                            <ImageWithFallback src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${activity.color}15` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: activity.color }} />
                          </div>
                        )}
                        <div className="flex-1">
                          <h4 className="text-[#1A1A1A]" style={{ fontSize: '15px', fontWeight: 800 }}>
                            {activity.title}
                          </h4>
                          <p className="text-[#6B7280]" style={{ fontSize: '13px', fontWeight: 600 }}>
                            {activity.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Book Now + Add Activity */}
          <div className="mt-6 space-y-3 pb-4">
            <button
              onClick={() => navigate(`/app/book/${currentDest.id}`)}
              className="w-full py-5 bg-[#FF7A00] text-white rounded-[20px] shadow-xl shadow-[#FF7A00]/25 active:scale-[0.98] transition-transform flex items-center justify-center gap-3"
              style={{ fontSize: '17px', fontWeight: 800 }}
            >
              <Sparkles className="w-5 h-5" />
              Book This Destination
            </button>

            <button
              onClick={() => navigate("/app/search")}
              className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[20px] flex items-center justify-center gap-2 text-[#6B7280] hover:border-[#FF7A00] hover:text-[#FF7A00] transition-all"
            >
              <Plus className="w-5 h-5" />
              <span style={{ fontSize: '15px', fontWeight: 700 }}>Add Activity</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

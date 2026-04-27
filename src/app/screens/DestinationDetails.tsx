import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Heart, Share2, Star, MapPin, Camera, Clock, Info, Sparkles, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { allDestinations, Destination } from "../data/destinations";
import { philippineRegions } from "../data/philippineRegions";

export function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [showToast, setShowToast] = useState(false);

  const destination = allDestinations.find(d => d.id.toString() === id) || allDestinations[0];
  const [itinerary, setItinerary] = useLocalStorage<Destination[]>("itinerary", []);

  const addToTrip = () => {
    // Find the matching planner spot by name (fuzzy match)
    let matchedRegion = "";
    let matchedSpotId = "";
    const destNameLower = destination.name.toLowerCase();

    for (const [regionName, region] of Object.entries(philippineRegions)) {
      for (const spot of region.spots) {
        const spotNameLower = spot.name.toLowerCase();
        // Check if destination name contains spot name or vice versa
        if (destNameLower.includes(spotNameLower) || spotNameLower.includes(destNameLower) ||
            destNameLower.replace(/\s+/g, '').includes(spotNameLower.replace(/\s+/g, '')) ||
            spotNameLower.replace(/\s+/g, '').includes(destNameLower.replace(/\s+/g, ''))) {
          matchedRegion = regionName;
          matchedSpotId = spot.id;
          break;
        }
      }
      if (matchedRegion) break;
    }

    if (matchedRegion && matchedSpotId) {
      // Pre-select the region and spot in the planner
      localStorage.setItem("planner_auto_region", JSON.stringify(matchedRegion));
      localStorage.setItem("planner_auto_spot", JSON.stringify(matchedSpotId));
      navigate("/app/planner");
    } else {
      // No match found — just go to planner
      navigate("/app/planner");
    }
  };

  const bookNow = () => {
    navigate(`/app/book/${destination.id}`);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* 1. FULL-SCREEN SCROLLABLE PAGE */}
      <div className="overflow-y-auto h-screen no-scrollbar">

        {/* 2. HERO IMAGE SECTION */}
        <div className="relative w-full h-[45vh]">
          <ImageWithFallback
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          {/* Top Overlay Buttons */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-3">
              <button className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bottom Overlay Text */}
          <div className="absolute bottom-12 left-8 z-20">
            <span className="inline-block px-3 py-1 bg-[#FF7A00] rounded-lg text-white mb-2" style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.05em' }}>
              {destination.category.toUpperCase()}
            </span>
            <h1 className="text-white mb-1" style={{ fontSize: '32px', fontWeight: 800, lineHeight: '1.1' }}>{destination.name}</h1>
            <div className="flex items-center gap-1.5 text-white/90">
              <MapPin className="w-4 h-4" />
              <span style={{ fontSize: '15px', fontWeight: 500 }}>{destination.location}</span>
            </div>
          </div>
        </div>

        {/* 3. DETAILS CONTAINER (SCROLLABLE CARD) */}
        <div className="bg-white rounded-t-[32px] -mt-8 relative z-10 p-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] min-h-[50vh]">

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 bg-[#FFF7F0] px-4 py-2 rounded-2xl">
              <Star className="w-5 h-5 fill-[#FF7A00] text-[#FF7A00]" />
              <div className="flex items-baseline gap-1">
                <span className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>{destination.rating}</span>
                <span className="text-[#6B7280]" style={{ fontSize: '14px', fontWeight: 500 }}>(2.4k reviews)</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#6B7280] mb-0.5" style={{ fontSize: '12px', fontWeight: 600 }}>Entrance Fee</p>
              <p className="text-[#00C851]" style={{ fontSize: '24px', fontWeight: 800 }}>{destination.entranceFee}</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Photo Gallery</h3>
              <button className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {destination.images?.map((img, index) => (
                <div key={index} className="flex-shrink-0 w-64 h-40">
                  <ImageWithFallback
                    src={img}
                    alt={`${destination.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover rounded-[24px]"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex gap-6 mb-5 border-b border-gray-100">
              {['about', 'highlights', 'tips'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 capitalize transition-all relative ${activeTab === tab ? 'text-[#FF7A00] font-bold' : 'text-[#6B7280]'}`}
                  style={{ fontSize: '16px' }}
                >
                  {tab === 'tips' ? 'Travel Tips' : tab}
                </button>
              ))}
            </div>

            <div className="min-h-[120px]">
              {activeTab === 'about' && (
                <p className="text-[#4B5563] leading-relaxed" style={{ fontSize: '16px' }}>{destination.description}</p>
              )}
              {activeTab === 'highlights' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#E7F3FF] rounded-full flex items-center justify-center text-[#006FB4]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[#4B5563]" style={{ fontSize: '15px' }}>Premium curated travel experiences.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#FFF7F0] rounded-full flex items-center justify-center text-[#FF7A00]">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-[#4B5563]" style={{ fontSize: '15px' }}>Expert local guides and tips.</p>
                  </div>
                </div>
              )}
              {activeTab === 'tips' && (
                <div className="bg-[#F9F9FC] p-5 rounded-2xl border border-gray-100">
                  <p className="text-[#4B5563]" style={{ fontSize: '14px' }}>• Best visited during the dry season.</p>
                  <p className="text-[#4B5563] mt-2" style={{ fontSize: '14px' }}>• Carry local currency for smaller shops.</p>
                </div>
              )}
            </div>
          </div>

          {/* 4. ACTION BUTTON SECTION (PILL SHAPE, INSIDE SCROLL) */}
          <div className="pt-4 space-y-4 mb-8">
            <button
              onClick={addToTrip}
              className="w-full py-4.5 rounded-full border-2 border-[#FF7A00] text-[#FF7A00] transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ fontSize: '17px', fontWeight: 700 }}
            >
              Add to Trip
            </button>
            <button
              onClick={bookNow}
              className="w-full py-4.5 rounded-full bg-[#FF7A00] text-white shadow-lg shadow-orange-500/30 transition-all active:scale-95 flex items-center justify-center gap-2"
              style={{ fontSize: '17px', fontWeight: 700 }}
            >
              Book Now
            </button>
          </div>

          <p className="text-center text-[#9CA3AF] pb-8" style={{ fontSize: '13px' }}>
            Prices may vary based on your selection
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-6 right-6 bg-[#1A1A1A] text-white p-4 rounded-2xl z-[3000] flex items-center justify-between shadow-2xl animate-in slide-in-from-bottom-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF7A00] rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white text-white" />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 600 }}>Added to itinerary!</span>
          </div>
          <button onClick={() => navigate("/app/trips")} className="text-[#FF7A00]" style={{ fontSize: '14px', fontWeight: 700 }}>VIEW</button>
        </div>
      )}
    </div>
  );
}

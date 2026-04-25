import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Heart, Share2, Star, MapPin, Camera, Clock, Info, Sparkles, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { allDestinations, Destination } from "../data/destinations";

export function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'highlights' | 'tips'>('about');
  
  const [itinerary, setItinerary] = useLocalStorage<Destination[]>("itinerary", []);
  const [showToast, setShowToast] = useState(false);

  const destination = useMemo(() => {
    return allDestinations.find(d => d.id.toString() === id) || allDestinations[0];
  }, [id]);

  const addToTrip = () => {
    if (itinerary.some(item => item.id === destination.id)) {
      alert("Already in your itinerary!");
      return;
    }
    setItinerary([...itinerary, destination]);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const bookNow = () => {
    navigate(`/app/book/${destination.id}`);
  };

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <div className="relative h-[60vh]">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        <div className="absolute top-0 left-0 right-0 px-5 py-5 flex justify-between items-center z-20">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : "text-[#1A1A1A]"}`} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-10 z-10">
          <div className="inline-block px-4 py-1.5 rounded-lg mb-3" style={{ backgroundColor: destination.color }}>
            <span className="text-white" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px' }}>
              {destination.category.toUpperCase()}
            </span>
          </div>
          <h1 className="text-white mb-2" style={{ fontSize: '36px', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            {destination.name}
          </h1>
          <div className="flex items-center gap-1.5 text-white">
            <MapPin className="w-5 h-5" strokeWidth={2.5} />
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{destination.location}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-[32px] -mt-6 relative z-10 min-h-[40vh] pb-32">
        <div className="px-6 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-[#1A1A1A]" style={{ fontSize: '22px', fontWeight: 800 }}>{destination.rating}</span>
              <span className="text-[#6B7280]" style={{ fontSize: '16px' }}>
                (2.4k reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[#6B7280]" style={{ fontSize: '12px', fontWeight: 500 }}>Entrance Fee</span>
                <span className="text-[#00C851]" style={{ fontSize: '20px', fontWeight: 800 }}>{destination.entranceFee}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Photo Gallery</h3>
              <button className="flex items-center gap-1 text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>
                <Camera className="w-4 h-4" />
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-4 border-b border-gray-200 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 px-4 whitespace-nowrap ${activeTab === 'about' ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]' : 'text-[#6B7280]'}`}
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                className={`pb-3 px-4 whitespace-nowrap ${activeTab === 'highlights' ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]' : 'text-[#6B7280]'}`}
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                Highlights
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`pb-3 px-4 whitespace-nowrap ${activeTab === 'tips' ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]' : 'text-[#6B7280]'}`}
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                Travel Tips
              </button>
            </div>

            {activeTab === 'about' && (
              <div>
                <p className="text-[#6B7280] mb-4" style={{ fontSize: '16px', lineHeight: '1.8', fontWeight: 400 }}>
                  {destination.description}
                </p>
              </div>
            )}

            {activeTab === 'highlights' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Stunning Natural Beauty</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Experience breathtaking views and pristine landscapes</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#006FB4] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Best Time to Visit</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Visit during dry season (November to May) for the best experience</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-100 p-5 max-w-[448px] mx-auto z-30">
          <div className="flex gap-4">
            <button 
              onClick={addToTrip}
              className="flex-1 bg-white border-2 border-[#FF7A00] text-[#FF7A00] py-4 rounded-2xl transition-all active:scale-95" 
              style={{ fontSize: '16px', fontWeight: 700 }}
            >
              Add to Trip
            </button>
            <button 
              onClick={bookNow}
              className="flex-1 bg-[#FF7A00] text-white py-4 rounded-2xl shadow-lg shadow-[#FF7A00]/30 transition-all active:scale-95" 
              style={{ fontSize: '16px', fontWeight: 700 }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full z-50 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF7A00]" />
            <span style={{ fontWeight: 600 }}>Added to your Itinerary!</span>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import { Search, Bell, Star, MapPin, TrendingUp, Mountain, UtensilsCrossed, Landmark, Sparkles, Navigation } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { allDestinations } from "../data/destinations";

const categories = [
  { name: "Beaches", icon: "🏖️", color: "#006FB4" },
  { name: "Mountains", icon: "⛰️", color: "#00C851" },
  { name: "Waterfalls", icon: "💧", color: "#006FB4" },
  { name: "Culture", icon: "🏛️", color: "#FF7A00" },
  { name: "Food", icon: "🍜", color: "#FF7A00" },
];

export function Home() {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const featuredDestinations = useMemo(() => allDestinations.filter(d => d.rating >= 4.9).slice(0, 3), []);
  const popularDestinations = useMemo(() => allDestinations.slice(3, 8), []);
  const hiddenGems = useMemo(() => allDestinations.slice(8, 12), []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentBanner(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <div className="bg-[#F9F9FC] min-h-screen pb-24">
      <div className="bg-white px-6 pt-6 pb-6 border-b border-gray-50 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="font-extrabold tracking-tight" style={{ fontSize: '28px' }}>
              <span className="text-[#006FB4]">GalaGuide</span> <span className="text-[#FF7A00]">PH</span>
            </h1>
            <p className="text-[#6B7280]" style={{ fontSize: '13px', fontWeight: 500 }}>Explore the Beauty of PH 🇵🇭</p>
          </div>
          <button className="relative w-12 h-12 bg-[#F9F9FC] rounded-2xl flex items-center justify-center border border-gray-100 shadow-sm transition-all active:scale-90">
            <Bell className="w-6 h-6 text-[#1A1A1A]" />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF7A00] rounded-full border-2 border-white" />
          </button>
        </div>

        <button
          onClick={() => navigate("/app/search")}
          className="w-full bg-[#F3F4F6] rounded-2xl px-5 py-4 flex items-center gap-3 border border-transparent focus:border-[#006FB4] transition-all"
        >
          <Search className="w-5 h-5 text-[#9CA3AF]" />
          <span className="text-[#9CA3AF]" style={{ fontSize: '16px', fontWeight: 500 }}>Where to go next?</span>
        </button>
      </div>

      <div className="px-6 pt-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-[#1A1A1A]" style={{ fontSize: '22px', fontWeight: 800 }}>Featured Escapes</h2>
            <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Handpicked top-rated spots</p>
          </div>
          <button onClick={() => navigate("/app/search")} className="text-[#006FB4] px-4 py-2 bg-[#006FB4]/10 rounded-xl" style={{ fontSize: '13px', fontWeight: 700 }}>See All</button>
        </div>

        <div className="overflow-hidden rounded-[32px] mb-8 shadow-xl shadow-[#006FB4]/10" ref={emblaRef}>
          <div className="flex">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="flex-[0_0_100%] min-w-0 relative cursor-pointer"
                onClick={() => navigate(`/app/destination/${dest.id}`)}
              >
                <div className="h-[300px] w-full">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 px-4 py-2 rounded-2xl">
                    <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white" style={{ fontSize: '13px', fontWeight: 700 }}>PREMIUM SPOT</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Navigation className="w-4 h-4 text-[#FF7A00] fill-[#FF7A00]" />
                    <span className="text-white/80" style={{ fontSize: '13px', fontWeight: 600 }}>{dest.location}</span>
                  </div>
                  <h3 className="text-white mb-4" style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>{dest.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-[#FF7A00] px-3 py-1.5 rounded-xl">
                      <Star className="w-4 h-4 text-white fill-white" />
                      <span className="text-white" style={{ fontSize: '14px', fontWeight: 800 }}>{dest.rating}</span>
                    </div>
                    <span className="text-white" style={{ fontSize: '14px', fontWeight: 600 }}>Explore Now →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2.5 z-10">
            {featuredDestinations.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(index);
                }}
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: index === currentBanner ? '24px' : '8px',
                  backgroundColor: index === currentBanner ? '#FF7A00' : 'rgba(255, 255, 255, 0.4)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="mb-10 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Categories</h3>
            <button onClick={() => navigate("/app/search")} className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 700 }}>View All</button>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => navigate(`/app/category/${category.name.toLowerCase()}`)}
                className="flex flex-col items-center gap-3 min-w-[72px] group"
              >
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200"
                  style={{ backgroundColor: `${category.color}15` }}
                >
                  <span style={{ fontSize: '32px' }}>{category.icon}</span>
                </div>
                <span className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 700 }}>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Popular Destinations</h3>
              <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Most visited this month</p>
            </div>
            <button onClick={() => navigate("/app/search")} className="text-[#006FB4] px-4 py-2 bg-[#006FB4]/10 rounded-xl" style={{ fontSize: '13px', fontWeight: 700 }}>See All</button>
          </div>
          <div className="space-y-4">
            {popularDestinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => navigate(`/app/destination/${dest.id}`)}
                className="w-full bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all flex border border-gray-50"
              >
                <div className="relative p-3">
                  <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-inner">
                    <ImageWithFallback
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 py-4 pr-6 pl-1 text-left flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h4 style={{ fontSize: '17px', fontWeight: 800 }} className="text-[#1A1A1A]">{dest.name}</h4>
                      <div className="flex items-center gap-1 text-[#FF7A00]">
                        <Star className="w-3.5 h-3.5 fill-[#FF7A00]" />
                        <span style={{ fontSize: '13px', fontWeight: 800 }}>{dest.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#6B7280] mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span style={{ fontSize: '13px', fontWeight: 600 }}>{dest.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#006FB4]" style={{ fontSize: '18px', fontWeight: 800 }}>{dest.price}<span className="text-[#9CA3AF]" style={{ fontSize: '12px', fontWeight: 500 }}>/pax</span></span>
                    <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100">
                      <ChevronRight className="w-5 h-5 text-[#006FB4]" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pb-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF7A00]/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
              </div>
              <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Hidden Gems</h3>
            </div>
            <button onClick={() => navigate("/app/search")} className="text-[#006FB4] px-4 py-2 bg-[#006FB4]/10 rounded-xl" style={{ fontSize: '13px', fontWeight: 700 }}>See All</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {hiddenGems.map((gem) => (
              <button
                key={gem.id}
                onClick={() => navigate(`/app/destination/${gem.id}`)}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-50 flex flex-col"
              >
                <div className="p-2">
                  <div className="relative rounded-2xl overflow-hidden h-40">
                    <ImageWithFallback
                      src={gem.image}
                      alt={gem.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/30 flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <span className="text-white" style={{ fontSize: '11px', fontWeight: 700 }}>{gem.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="px-4 pb-5 pt-1">
                  <h4 style={{ fontSize: '15px', fontWeight: 800 }} className="mb-1 line-clamp-1 text-[#1A1A1A]">{gem.name}</h4>
                  <div className="flex items-center gap-1 text-[#6B7280]">
                    <MapPin className="w-3 h-3" />
                    <span style={{ fontSize: '12px', fontWeight: 600 }} className="line-clamp-1">{gem.location}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const ChevronRight = ({ className, ...props }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    {...props}
  >
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

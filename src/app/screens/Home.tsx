import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import { Search, Bell, Star, MapPin, TrendingUp, Mountain, UtensilsCrossed, Landmark } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const featuredDestinations = [
  {
    id: 1,
    name: "Siargao Cloud 9",
    image: "https://images.unsplash.com/photo-1572316197910-a32d5e5e8f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Siargao, Surigao del Norte",
  },
  {
    id: 2,
    name: "Enchanted River",
    image: "https://images.unsplash.com/photo-1585795361718-2141ba44cbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Hinatuan, Surigao del Sur",
  },
  {
    id: 3,
    name: "Camiguin White Island",
    image: "https://images.unsplash.com/photo-1551521021-d929e606badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Camiguin",
  },
];

const popularDestinations = [
  {
    id: 4,
    name: "Tinuy-an Falls",
    image: "https://images.unsplash.com/photo-1609930420316-72622d2db23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Bislig, Surigao del Sur",
    price: "₱1,500",
    entranceFee: "₱50",
    description: "The Niagara Falls of the Philippines with stunning multi-tiered cascades"
  },
  {
    id: 5,
    name: "Dahican Beach",
    image: "https://images.unsplash.com/photo-1725357347380-a07aaaa8527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Mati, Davao Oriental",
    price: "₱2,200",
    entranceFee: "₱100",
    description: "7-kilometer pristine beach perfect for surfing and skimboarding"
  },
  {
    id: 6,
    name: "Britania Islands",
    image: "https://images.unsplash.com/photo-1760644328320-5e37dc6928d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "San Agustin, Surigao del Sur",
    price: "₱2,800",
    entranceFee: "₱150",
    description: "25 pristine islands with crystal-clear waters and white sand beaches"
  },
  {
    id: 7,
    name: "Sohoton Cove",
    image: "https://images.unsplash.com/photo-1736776256451-ac16ab400278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Bucas Grande, Surigao del Norte",
    price: "₱3,500",
    entranceFee: "₱200",
    description: "Enchanting lagoons, caves, and jellyfish sanctuary"
  },
  {
    id: 8,
    name: "Lake Sebu",
    image: "https://images.unsplash.com/photo-1767167649218-f8b03f66d28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.7,
    location: "South Cotabato",
    price: "₱2,000",
    entranceFee: "₱100",
    description: "Serene mountain lake with seven waterfalls and T'boli culture"
  },
];

const hiddenGems = [
  {
    id: 28,
    name: "Roxas Night Market",
    image: "https://images.unsplash.com/photo-1694134645469-5326b3a1f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Davao City",
  },
  {
    id: 23,
    name: "T'boli Living Museum",
    image: "https://images.unsplash.com/photo-1563280583-7c6d205d1188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Lake Sebu, South Cotabato",
  },
  {
    id: 31,
    name: "Tuna Cuisine",
    image: "https://images.unsplash.com/photo-1537495988501-f9cd94a78f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "General Santos City",
  },
  {
    id: 24,
    name: "Fort Pilar",
    image: "https://images.unsplash.com/photo-1563280607-41c1f2406e54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.7,
    location: "Zamboanga City",
  },
];

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
    <div className="bg-[#F9F9FC] min-h-screen pb-4">
      <div className="bg-white px-6 pt-6 pb-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-extrabold tracking-tight" style={{ fontSize: '28px' }}>
              <span className="text-[#006FB4]">GalaGuide</span> <span className="text-[#FF7A00]">PH</span>
            </h2>
          </div>
          <button className="relative w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-[#ff9940] rounded-full flex items-center justify-center shadow-md">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#FF7A00]" />
          </button>
        </div>

        <button
          onClick={() => navigate("/app/search")}
          className="w-full bg-[#F3F4F6] rounded-2xl px-4 py-3 flex items-center gap-3"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500" style={{ fontSize: '16px' }}>Search destinations...</span>
        </button>
      </div>

      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Featured Escapes</h3>
          <button onClick={() => navigate("/app/search")} className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>View All</button>
        </div>

        <div className="overflow-hidden rounded-3xl mb-6" ref={emblaRef}>
          <div className="flex">
            {featuredDestinations.map((dest) => (
              <div
                key={dest.id}
                className="flex-[0_0_100%] min-w-0 relative cursor-pointer"
                onClick={() => navigate(`/app/destination/${dest.id}`)}
              >
                <ImageWithFallback
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />

                <div className="absolute top-4 left-4">
                  <div className="inline-flex items-center gap-1 bg-[#FF7A00] px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-white fill-white" />
                    <span className="text-white" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.02em' }}>Top Rated</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white mb-2" style={{ fontSize: '22px', fontWeight: 800 }}>{dest.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 700 }}>{dest.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/90">
                      <MapPin className="w-4 h-4" />
                      <span style={{ fontSize: '14px', fontWeight: 500 }}>{dest.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {featuredDestinations.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  scrollTo(index);
                }}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: index === currentBanner ? '20px' : '6px',
                  backgroundColor: index === currentBanner ? '#FF7A00' : 'rgba(255, 255, 255, 0.5)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Categories</h3>
          <button onClick={() => navigate("/app/search")} className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>View all</button>
        </div>
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => navigate(`/app/category/${category.name.toLowerCase()}`)}
              className="flex flex-col items-center gap-2 min-w-[70px]"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <span style={{ fontSize: '28px' }}>{category.icon}</span>
              </div>
              <span className="text-[#1A1A1A]" style={{ fontSize: '13px', fontWeight: 600 }}>{category.name}</span>
            </button>
          ))}
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Popular Destinations</h3>
            <button onClick={() => navigate("/app/search")} className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>See All</button>
          </div>
          <div className="space-y-3">
            {popularDestinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => navigate(`/app/destination/${dest.id}`)}
                className="w-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="w-28 h-28 object-cover"
                  />
                </div>
                <div className="flex-1 p-4 text-left flex justify-between items-center">
                  <div className="flex-1">
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }} className="mb-1 text-[#1A1A1A]">{dest.name}</h4>
                    <p className="text-[#6B7280] mb-2 line-clamp-1" style={{ fontSize: '13px' }}>{dest.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-[#6B7280]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span style={{ fontSize: '12px' }}>{dest.location}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-[#00C851]" style={{ fontSize: '12px', fontWeight: 600 }}>{dest.entranceFee}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 600 }}>{dest.rating}</span>
                      </div>
                      <span className="text-[#006FB4]" style={{ fontSize: '18px', fontWeight: 700 }}>{dest.price}<span className="text-[#6B7280]" style={{ fontSize: '12px', fontWeight: 500 }}> / person</span></span>
                    </div>
                  </div>
                  <div className="w-10 h-10 bg-[#006FB4] rounded-full flex items-center justify-center ml-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF7A00]" />
              <h3 style={{ fontSize: '20px', fontWeight: 700 }}>Hidden Gems</h3>
            </div>
            <button onClick={() => navigate("/app/search")} className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>See All</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {hiddenGems.map((gem) => (
              <button
                key={gem.id}
                onClick={() => navigate(`/app/destination/${gem.id}`)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <ImageWithFallback
                    src={gem.image}
                    alt={gem.name}
                    className="w-full h-36 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                </div>
                <div className="p-3">
                  <h4 style={{ fontSize: '15px', fontWeight: 700 }} className="mb-1 line-clamp-1 text-[#1A1A1A]">{gem.name}</h4>
                  <div className="flex items-center gap-1 text-[#6B7280] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span style={{ fontSize: '12px' }} className="line-clamp-1">{gem.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 600 }}>{gem.rating}</span>
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

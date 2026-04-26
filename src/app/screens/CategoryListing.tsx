import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import { allDestinations } from "../data/destinations";

export function CategoryListing() {
  const { category } = useParams();
  const navigate = useNavigate();

  const filteredDestinations = category
    ? allDestinations.filter((dest) => dest.category.toLowerCase() === category.toLowerCase())
    : allDestinations;

  const categoryNames: Record<string, string> = {
    beaches: "Beaches",
    mountains: "Mountains",
    waterfalls: "Waterfalls",
    culture: "Culture",
    food: "Food",
  };

  return (
    <div className="bg-[#F9F9FC] min-h-screen">
      <div className="bg-white px-6 pt-6 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <h1 className="text-[#1A1A1A]" style={{ fontSize: '28px', fontWeight: 800 }}>
            {categoryNames[category?.toLowerCase() || ""] || "All Destinations"}
          </h1>
        </div>
        <p className="text-[#6B7280] ml-10" style={{ fontSize: '15px' }}>
          {filteredDestinations.length} destinations found
        </p>
      </div>

      <div className="p-6 grid grid-cols-2 gap-4">
        {filteredDestinations.map((dest) => (
          <button
            key={dest.id}
            onClick={() => navigate(`/app/destination/${dest.id}`)}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <ImageWithFallback
                src={dest.image}
                alt={dest.name}
                className="w-full h-44 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
            </div>
            <div className="p-3">
              <h3 style={{ fontSize: '15px', fontWeight: 700 }} className="mb-1 line-clamp-1 text-[#1A1A1A]">{dest.name}</h3>
              <div className="flex items-center gap-1 text-[#6B7280] mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span style={{ fontSize: '12px' }} className="line-clamp-1">{dest.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-[#1A1A1A]" style={{ fontSize: '14px', fontWeight: 600 }}>{dest.rating}</span>
                </div>
                <span className="text-[#00C851]" style={{ fontSize: '13px', fontWeight: 700 }}>{dest.entranceFee}<span style={{ fontSize: '10px', opacity: 0.8 }}>/entry</span></span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function CategoryListing() {
  const { category } = useParams();
  const navigate = useNavigate();

  const allDestinations = [
    { id: 1, name: "Siargao Cloud 9", image: "https://images.unsplash.com/photo-1572316197910-a32d5e5e8f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "Siargao, Surigao del Norte", price: "₱3,200", entranceFee: "₱150", category: "beaches" },
    { id: 3, name: "Camiguin White Island", image: "https://images.unsplash.com/photo-1551521021-d929e606badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.8, location: "Camiguin", price: "₱2,000", entranceFee: "₱50", category: "beaches" },
    { id: 5, name: "Dahican Beach", image: "https://images.unsplash.com/photo-1725357347380-a07aaaa8527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.8, location: "Mati, Davao Oriental", price: "₱2,200", entranceFee: "₱100", category: "beaches" },
    { id: 6, name: "Britania Islands", image: "https://images.unsplash.com/photo-1760644328320-5e37dc6928d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "San Agustin, Surigao del Sur", price: "₱2,800", entranceFee: "₱150", category: "beaches" },
    { id: 9, name: "Naked Island", image: "https://images.unsplash.com/photo-1736776256319-50153ce32dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.8, location: "Siargao", price: "₱1,500", entranceFee: "₱100", category: "beaches" },
    { id: 11, name: "Magpupungko Pools", image: "https://images.unsplash.com/photo-1622481227477-8db839366177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "Siargao", price: "₱1,000", entranceFee: "₱50", category: "beaches" },
    { id: 12, name: "Mantigue Island", image: "https://images.unsplash.com/photo-1768639400843-d604ccce9c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "Camiguin", price: "₱1,800", entranceFee: "₱80", category: "beaches" },
    { id: 14, name: "Samal Island", image: "https://images.unsplash.com/photo-1565565915331-293fd8113954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.8, location: "Davao del Norte", price: "₱2,500", entranceFee: "₱100", category: "beaches" },
    { id: 15, name: "Guyam Island", image: "https://images.unsplash.com/photo-1736776256236-b9bbaafa3992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "Siargao", price: "₱1,200", entranceFee: "₱80", category: "beaches" },
    { id: 16, name: "Daku Island", image: "https://images.unsplash.com/photo-1725357347354-12478ffe10ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.6, location: "Siargao", price: "₱1,300", entranceFee: "₱100", category: "beaches" },

    { id: 8, name: "Lake Sebu", image: "https://images.unsplash.com/photo-1767167649218-f8b03f66d28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "South Cotabato", price: "₱2,000", entranceFee: "₱100", category: "mountains" },
    { id: 13, name: "Mount Apo", image: "https://images.unsplash.com/photo-1767167648895-3e4a0ddf46ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "Davao City", price: "₱5,500", entranceFee: "₱300", category: "mountains" },

    { id: 2, name: "Enchanted River", image: "https://images.unsplash.com/photo-1585795361718-2141ba44cbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "Hinatuan, Surigao del Sur", price: "₱1,800", entranceFee: "₱100", category: "waterfalls" },
    { id: 4, name: "Tinuy-an Falls", image: "https://images.unsplash.com/photo-1609930420316-72622d2db23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "Bislig, Surigao del Sur", price: "₱1,500", entranceFee: "₱50", category: "waterfalls" },
    { id: 18, name: "Aliwagwag Falls", image: "https://images.unsplash.com/photo-1693571569894-e3a71ebc8535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "Cateel, Davao Oriental", price: "₱1,400", entranceFee: "₱80", category: "waterfalls" },
    { id: 19, name: "Maria Cristina Falls", image: "https://images.unsplash.com/photo-1767167649496-b0945c77ac2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.6, location: "Iligan City", price: "₱1,200", entranceFee: "₱50", category: "waterfalls" },
    { id: 22, name: "Katibawasan Falls", image: "https://images.unsplash.com/photo-1586263426392-3b3e0748f618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.6, location: "Camiguin", price: "₱900", entranceFee: "₱50", category: "waterfalls" },

    { id: 23, name: "T'boli Living Museum", image: "https://images.unsplash.com/photo-1563280583-7c6d205d1188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.8, location: "Lake Sebu, South Cotabato", price: "₱500", entranceFee: "₱100", category: "culture" },
    { id: 24, name: "Fort Pilar", image: "https://images.unsplash.com/photo-1563280607-41c1f2406e54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "Zamboanga City", price: "₱300", entranceFee: "₱50", category: "culture" },
    { id: 25, name: "Aga Khan Museum", image: "https://images.unsplash.com/photo-1661200797308-604df94ec881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.6, location: "Marawi City", price: "₱400", entranceFee: "₱80", category: "culture" },
    { id: 26, name: "Kadayawan Festival", image: "https://images.unsplash.com/photo-1661200797561-026c99863b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "Davao City", price: "Free", entranceFee: "Free", category: "culture" },

    { id: 27, name: "Magsaysay Fruit Market", image: "https://images.unsplash.com/photo-1774249447184-6000acf571cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "Davao City", price: "₱200", entranceFee: "Free", category: "food" },
    { id: 28, name: "Roxas Night Market", image: "https://images.unsplash.com/photo-1694134645469-5326b3a1f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.8, location: "Davao City", price: "₱300", entranceFee: "Free", category: "food" },
    { id: 29, name: "Chicken House Zamboanga", image: "https://images.unsplash.com/photo-1578366687181-5f90a617ca7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.6, location: "Zamboanga City", price: "₱350", entranceFee: "₱300", category: "food" },
    { id: 30, name: "Bankerohan Market", image: "https://images.unsplash.com/photo-1768199439172-08b8c55e683b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.5, location: "Davao City", price: "₱150", entranceFee: "Free", category: "food" },
    { id: 31, name: "Tuna Cuisine Experience", image: "https://images.unsplash.com/photo-1537495988501-f9cd94a78f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.9, location: "General Santos City", price: "₱400", entranceFee: "₱250", category: "food" },
    { id: 32, name: "CDO Food Trail", image: "https://images.unsplash.com/photo-1546186479-607640447f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080", rating: 4.7, location: "Cagayan de Oro", price: "₱350", entranceFee: "₱200", category: "food" },
  ];

  const filteredDestinations = category
    ? allDestinations.filter((dest) => dest.category === category.toLowerCase())
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
                <span className="text-[#00C851]" style={{ fontSize: '13px', fontWeight: 700 }}>{dest.entranceFee}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

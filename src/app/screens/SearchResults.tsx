import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, SlidersHorizontal, Star, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const results = [
  {
    id: 1,
    name: "Siargao Cloud 9",
    image: "https://images.unsplash.com/photo-1572316197910-a32d5e5e8f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Siargao, Surigao del Norte",
    price: "₱3,200",
    entranceFee: "₱150",
    description: "World-famous surf break and island paradise",
  },
  {
    id: 2,
    name: "Enchanted River",
    image: "https://images.unsplash.com/photo-1585795361718-2141ba44cbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Hinatuan, Surigao del Sur",
    price: "₱1,800",
    entranceFee: "₱100",
    description: "Mystical deep blue saltwater river",
  },
  {
    id: 3,
    name: "Camiguin White Island",
    image: "https://images.unsplash.com/photo-1551521021-d929e606badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Camiguin",
    price: "₱2,000",
    entranceFee: "₱50",
    description: "Pristine white sandbar with volcanic views",
  },
  {
    id: 4,
    name: "Tinuy-an Falls",
    image: "https://images.unsplash.com/photo-1609930420316-72622d2db23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Bislig, Surigao del Sur",
    price: "₱1,500",
    entranceFee: "₱50",
    description: "The Niagara Falls of the Philippines",
  },
  {
    id: 5,
    name: "Dahican Beach",
    image: "https://images.unsplash.com/photo-1725357347380-a07aaaa8527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Mati, Davao Oriental",
    price: "₱2,200",
    entranceFee: "₱100",
    description: "7km pristine beach for surfing",
  },
  {
    id: 6,
    name: "Britania Islands",
    image: "https://images.unsplash.com/photo-1760644328320-5e37dc6928d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "San Agustin, Surigao del Sur",
    price: "₱2,800",
    entranceFee: "₱150",
    description: "25 pristine islands with crystal waters",
  },
  {
    id: 7,
    name: "Sohoton Cove",
    image: "https://images.unsplash.com/photo-1736776256451-ac16ab400278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Bucas Grande, Surigao del Norte",
    price: "₱3,500",
    entranceFee: "₱200",
    description: "Enchanting lagoons and jellyfish sanctuary",
  },
  {
    id: 8,
    name: "Lake Sebu",
    image: "https://images.unsplash.com/photo-1767167649218-f8b03f66d28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.7,
    location: "South Cotabato",
    price: "₱2,000",
    entranceFee: "₱100",
    description: "Mountain lake with seven waterfalls",
  },
  {
    id: 9,
    name: "Naked Island",
    image: "https://images.unsplash.com/photo-1736776256319-50153ce32dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Siargao, Surigao del Norte",
    price: "₱1,500",
    entranceFee: "₱100",
    description: "Pure white sandbar paradise",
  },
  {
    id: 10,
    name: "Sunken Cemetery",
    image: "https://images.unsplash.com/photo-1610624878824-7840a911dde7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.6,
    location: "Camiguin",
    price: "₱1,200",
    entranceFee: "₱50",
    description: "Unique underwater dive site",
  },
  {
    id: 11,
    name: "Magpupungko Pools",
    image: "https://images.unsplash.com/photo-1622481227477-8db839366177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Siargao, Surigao del Norte",
    price: "₱1,000",
    entranceFee: "₱50",
    description: "Natural tidal rock pools",
  },
  {
    id: 12,
    name: "Mantigue Island",
    image: "https://images.unsplash.com/photo-1768639400843-d604ccce9c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.7,
    location: "Camiguin",
    price: "₱1,800",
    entranceFee: "₱80",
    description: "Protected marine sanctuary island",
  },
  {
    id: 13,
    name: "Mount Apo",
    image: "https://images.unsplash.com/photo-1767167648895-3e4a0ddf46ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "Davao City",
    price: "₱5,500",
    entranceFee: "₱300",
    description: "Highest peak in the Philippines",
  },
  {
    id: 14,
    name: "Samal Island",
    image: "https://images.unsplash.com/photo-1565565915331-293fd8113954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Davao del Norte",
    price: "₱2,500",
    entranceFee: "₱100",
    description: "Island paradise near Davao City",
  },
  {
    id: 28,
    name: "Roxas Night Market",
    image: "https://images.unsplash.com/photo-1694134645469-5326b3a1f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Davao City",
    price: "₱300",
    entranceFee: "Free",
    description: "Legendary street food haven",
  },
  {
    id: 23,
    name: "T'boli Living Museum",
    image: "https://images.unsplash.com/photo-1563280583-7c6d205d1188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    location: "Lake Sebu, South Cotabato",
    price: "₱500",
    entranceFee: "₱100",
    description: "Authentic T'boli culture experience",
  },
  {
    id: 31,
    name: "Tuna Cuisine Experience",
    image: "https://images.unsplash.com/photo-1537495988501-f9cd94a78f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
    location: "General Santos City",
    price: "₱400",
    entranceFee: "₱250",
    description: "Freshest sashimi-grade tuna",
  },
];

export function SearchResults() {
  const navigate = useNavigate();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-1 px-4 py-2 bg-gray-100 rounded-lg"
            autoFocus
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-gray-600" style={{ fontSize: '14px' }}>
            {results.length} destinations found
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span style={{ fontSize: '14px', fontWeight: 500 }}>Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border-b border-gray-200 p-4">
          <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Filter By</h3>
          <div className="flex gap-2 flex-wrap mb-4">
            {["All", "Beaches", "Mountains", "Islands", "Cities"].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg ${filter === "All" ? "bg-[#FF7A00] text-white" : "bg-gray-100 text-gray-700"}`}
                style={{ fontSize: '14px', fontWeight: 500 }}
              >
                {filter}
              </button>
            ))}
          </div>
          <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Sort By</h3>
          <div className="space-y-2">
            {["Popular", "Rating", "Price: Low to High", "Price: High to Low"].map((sort) => (
              <label key={sort} className="flex items-center gap-3">
                <input type="radio" name="sort" className="w-4 h-4" defaultChecked={sort === "Popular"} />
                <span style={{ fontSize: '15px' }}>{sort}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 space-y-3">
        {results.map((destination) => (
          <button
            key={destination.id}
            onClick={() => navigate(`/app/destination/${destination.id}`)}
            className="w-full bg-white rounded-xl overflow-hidden shadow-sm flex"
          >
            <ImageWithFallback
              src={destination.image}
              alt={destination.name}
              className="w-32 h-32 object-cover"
            />
            <div className="flex-1 p-4 text-left">
              <h3 style={{ fontSize: '16px', fontWeight: 600 }} className="mb-1">{destination.name}</h3>
              <p className="text-gray-600 mb-2 line-clamp-1" style={{ fontSize: '12px' }}>{destination.description}</p>
              <div className="flex items-center gap-1 text-gray-500 mb-2">
                <MapPin className="w-3 h-3" />
                <span style={{ fontSize: '12px' }}>{destination.location}</span>
                <span className="mx-1 text-gray-300">•</span>
                <span className="text-[#00C9A7]" style={{ fontSize: '12px', fontWeight: 600 }}>Entry: {destination.entranceFee}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{destination.rating}</span>
                </div>
                <span className="text-[#FF7A00]" style={{ fontSize: '18px', fontWeight: 600 }}>{destination.price}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

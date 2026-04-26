import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, SlidersHorizontal, Star, MapPin, Search, X, Sparkles } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { allDestinations } from "../data/destinations";

export function SearchResults() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredResults = useMemo(() => {
    return allDestinations.filter(dest => {
      const matchesQuery = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          dest.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || dest.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="bg-[#F9F9FC] min-h-screen pb-24">
      <div className="sticky top-0 bg-white border-b border-gray-50 px-6 py-6 z-30 shadow-sm">
        <div className="flex items-center gap-4 mb-5">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-[#F9F9FC] rounded-full flex items-center justify-center border border-gray-100">
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations..."
              className="w-full pl-11 pr-11 py-3.5 bg-[#F3F4F6] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#006FB4] transition-all"
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-[#9CA3AF]" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-[#6B7280]" style={{ fontSize: '14px', fontWeight: 600 }}>
            {filteredResults.length} destinations found
          </p>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${showFilters ? 'bg-[#006FB4] border-[#006FB4] text-white shadow-lg shadow-[#006FB4]/20' : 'bg-white border-gray-100 text-[#1A1A1A]'}`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span style={{ fontSize: '14px', fontWeight: 700 }}>Filters</span>
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="bg-white border-b border-gray-100 px-6 py-6 animate-in slide-in-from-top duration-300">
          <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '16px', fontWeight: 800 }}>Categories</h3>
          <div className="flex gap-2 flex-wrap mb-6">
            {["All", "Beach", "Mountain", "Waterfall", "Culture", "Island"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-xl transition-all ${activeCategory === category ? "bg-[#FF7A00] text-white shadow-lg shadow-orange-500/20" : "bg-[#F9F9FC] text-[#6B7280] border border-gray-100"}`}
                style={{ fontSize: '14px', fontWeight: 700 }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 space-y-5">
        {filteredResults.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>No results found</h3>
            <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Try searching for a different destination.</p>
          </div>
        ) : (
          filteredResults.map((dest) => (
            <button
              key={dest.id}
              onClick={() => navigate(`/app/destination/${dest.id}`)}
              className="w-full bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all flex border border-gray-50 group"
            >
              <div className="p-3">
                <div className="w-32 h-32 rounded-[24px] overflow-hidden shadow-inner">
                  <ImageWithFallback
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="flex-1 py-5 pr-6 pl-1 text-left flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 style={{ fontSize: '18px', fontWeight: 800 }} className="text-[#1A1A1A]">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-[#FF7A00]">
                      <Star className="w-3.5 h-3.5 fill-[#FF7A00]" />
                      <span style={{ fontSize: '13px', fontWeight: 800 }}>{dest.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#6B7280] mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{dest.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#00C851] bg-[#E7F9EE] px-2 py-0.5 rounded-md" style={{ fontSize: '11px', fontWeight: 800 }}>{dest.entranceFee} Entry</span>
                    <span className="text-[#006FB4] bg-[#E7F3FF] px-2 py-0.5 rounded-md" style={{ fontSize: '11px', fontWeight: 800 }}>{dest.category}</span>
                  </div>
                </div>
                
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-[#006FB4]" style={{ fontSize: '20px', fontWeight: 800 }}>{dest.entranceFee}<span className="text-[#9CA3AF]" style={{ fontSize: '12px', fontWeight: 500 }}>/entry</span></span>
                  <div className="w-9 h-9 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 group-hover:bg-[#006FB4] group-hover:border-[#006FB4] transition-all">
                    <ChevronRight className="w-5 h-5 text-[#006FB4] group-hover:text-white" />
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
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

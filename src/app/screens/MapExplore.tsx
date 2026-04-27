import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, Navigation, Star, MapPin as MapPinIcon, Filter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { allDestinations } from "../data/destinations";


function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function MapExplore() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState<[number, number]>([8.0, 125.5]); // Central Mindanao area
  const [mapZoom, setMapZoom] = useState(7);

  const filteredDestinations = useMemo(() => {
    return allDestinations.filter(dest => {
      const matchesCategory = !selectedCategory || dest.category === selectedCategory;
      const matchesSearch = !searchQuery || dest.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const nearbyPlaces = useMemo(() => filteredDestinations.slice(0, 10), [filteredDestinations]);

  const handleMarkerClick = (dest: any) => {
    setMapCenter([dest.lat, dest.lng]);
    setMapZoom(12);
  };

  const createCustomIcon = (color: string) => {
    return new L.DivIcon({
      html: `<div style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">
               <svg width="32" height="40" viewBox="0 0 32 40">
                 <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 14 24 16 24s16-13.5 16-24C32 7.163 24.837 0 16 0z" fill="${color}" />
                 <circle cx="16" cy="15" r="6" fill="white" opacity="0.9"/>
               </svg>
             </div>`,
      className: "",
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -40],
    });
  };

  return (
    <div className="bg-white h-screen flex flex-col max-w-[448px] mx-auto relative overflow-hidden">
      {/* Header / Search */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-white via-white/80 to-transparent pb-10">
        <div className="flex gap-3 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white shadow-xl border border-gray-100 backdrop-blur-sm"
              style={{ fontSize: '15px' }}
            />
          </div>
          <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100">
            <Filter className="w-5 h-5 text-[#1A1A1A]" />
          </button>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          zoomControl={false}
          className="w-full h-full"
          style={{ background: "#f8f9fa" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomright" />
          <ChangeView center={mapCenter} zoom={mapZoom} />

          {filteredDestinations.map((dest) => (
            <Marker
              key={dest.id}
              position={[dest.lat, dest.lng]}
              icon={createCustomIcon(dest.color)}
              eventHandlers={{
                click: () => handleMarkerClick(dest),
              }}
            >
              <Popup className="custom-popup">
                <div className="p-1 max-w-[150px]">
                  <img src={dest.image} alt={dest.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                  <h4 className="font-bold text-sm mb-0.5">{dest.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-semibold">{dest.rating}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/app/destination/${dest.id}`)}
                    className="w-full bg-[#006FB4] text-white text-[10px] py-1.5 rounded-md font-bold"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Current Location FAB */}
        <button
          onClick={() => {
            setMapCenter([8.0, 125.5]);
            setMapZoom(7);
          }}
          className="absolute right-4 top-24 z-[1000] w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <Navigation className="w-5 h-5 text-[#006FB4]" />
        </button>
      </div>

      {/* Bottom Sheet */}
      <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.08)] max-h-[45vh] overflow-hidden flex flex-col border-t border-gray-100">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-3" />

        <div className="px-6 pb-24 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Nearby Places</h3>
            <button
              onClick={() => navigate("/app/search")}
              className="text-[#006FB4]"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              View all
            </button>
          </div>

          <div className="flex gap-2 mb-5 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Beaches', 'Waterfalls', 'Mountains', 'Culture'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                className={`px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 ${(cat === 'All' && !selectedCategory) || selectedCategory === cat
                  ? 'bg-[#006FB4] text-white shadow-lg shadow-blue-200 ring-2 ring-blue-50'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                style={{ fontSize: '14px', fontWeight: 600 }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {nearbyPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => {
                  setMapCenter([place.lat, place.lng]);
                  setMapZoom(14);
                }}
                className="w-full bg-[#F9F9FC] rounded-3xl p-3 flex items-center gap-4 hover:bg-blue-50/50 transition-all border border-transparent hover:border-blue-100 group"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-16 h-16 object-cover flex-shrink-0 transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h4 className="text-[#1A1A1A] mb-1 truncate" style={{ fontSize: '16px', fontWeight: 700 }}>{place.name}</h4>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                      <span className="text-[#1A1A1A]" style={{ fontSize: '13px', fontWeight: 600 }}>{place.rating}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-[#6B7280] truncate font-medium" style={{ fontSize: '12px' }}>{place.category}</span>
                  </div>
                </div>
                <div
                  className="w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center transition-colors shadow-sm bg-white"
                  style={{ color: place.color }}
                >
                  <MapPinIcon className="w-5 h-5" />
                </div>
              </button>
            ))}

            {nearbyPlaces.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <MapPinIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No places found in this category</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .custom-popup .leaflet-popup-tip-container {
          display: none;
        }
      `}</style>
    </div>
  );
}

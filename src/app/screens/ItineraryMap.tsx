import { useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, MapPin as MapPinIcon, Navigation, Share2, Info } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function ItineraryMap() {
  const navigate = useNavigate();
  const location = useLocation();
  const { plan, region } = location.state || { plan: [], region: "Mindanao" };

  // Flatten plan to get all spots in sequence
  const allSpots = useMemo(() => {
    const spots: any[] = [];
    plan.forEach((day: any) => {
      day.events.forEach((event: any) => {
        spots.push({
          ...event.spot,
          day: day.day,
          time: event.time
        });
      });
    });
    return spots;
  }, [plan]);

  const polylinePoints = useMemo(() => {
    return allSpots.map(spot => spot.gps);
  }, [allSpots]);

  const mapCenter = useMemo(() => {
    if (allSpots.length > 0) return allSpots[0].gps;
    return [8.0, 125.5];
  }, [allSpots]);

  const createCustomIcon = (index: number, color: string) => {
    return new L.DivIcon({
      html: `<div style="filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1)); position: relative;">
               <svg width="40" height="48" viewBox="0 0 32 40">
                 <path d="M16 0C7.163 0 0 7.163 0 16c0 10.5 14 24 16 24s16-13.5 16-24C32 7.163 24.837 0 16 0z" fill="${color}" />
                 <circle cx="16" cy="15" r="9" fill="white" opacity="0.9"/>
                 <text x="16" y="19" text-anchor="middle" font-size="12" font-weight="900" fill="${color}">${index + 1}</text>
               </svg>
             </div>`,
      className: "",
      iconSize: [40, 48],
      iconAnchor: [20, 48],
      popupAnchor: [0, -48],
    });
  };

  return (
    <div className="bg-white h-screen flex flex-col max-w-[448px] mx-auto relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[1000] p-4 bg-gradient-to-b from-white via-white/80 to-transparent">
        <div className="flex items-center justify-between gap-3">
          <button 
            onClick={() => {
              if (location.state?.from) {
                navigate(location.state.from);
              } else {
                navigate(-1);
              }
            }} 
            className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 backdrop-blur-sm active:scale-95 transition-all"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 px-5 py-3 text-center">
            <h2 className="text-[#1A1A1A] truncate" style={{ fontSize: '16px', fontWeight: 800 }}>{region} Route</h2>
            <p className="text-[#6B7280]" style={{ fontSize: '11px', fontWeight: 600 }}>{allSpots.length} Destinations • {plan.length} Days</p>
          </div>
          <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-gray-100 backdrop-blur-sm">
            <Share2 className="w-5 h-5 text-[#006FB4]" />
          </button>
        </div>
      </div>

      {/* Map Content */}
      <div className="flex-1 relative">
        <MapContainer
          center={mapCenter}
          zoom={9}
          zoomControl={false}
          className="w-full h-full"
          style={{ background: "#f8f9fa" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomright" />
          <ChangeView center={mapCenter} zoom={9} />

          {/* Connection Lines */}
          <Polyline
            positions={polylinePoints}
            color="#FF7A00"
            weight={4}
            opacity={0.6}
            dashArray="10, 10"
          />

          {allSpots.map((spot, idx) => (
            <Marker
              key={`${spot.id}-${idx}`}
              position={spot.gps}
              icon={createCustomIcon(idx, idx === 0 ? "#006FB4" : "#FF7A00")}
            >
              <Popup className="custom-popup">
                <div className="p-3 w-48">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-[#FF7A00] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">Day {spot.day}</span>
                    <span className="text-[#006FB4] text-[10px] font-bold">{spot.time}</span>
                  </div>
                  <h4 className="font-bold text-sm text-[#1A1A1A] mb-1">{spot.name}</h4>
                  <p className="text-[11px] text-[#6B7280] mb-3">{spot.category}</p>
                  <button
                    onClick={() => navigate(`/app/destination/${spot.id}`)}
                    className="w-full bg-[#006FB4] text-white text-[11px] py-2 rounded-xl font-bold active:scale-95 transition-transform"
                  >
                    View Destination
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Floating Info Card */}
        <div className="absolute bottom-28 left-6 right-6 z-[1000] bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/50 p-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#FF7A00]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Navigation className="w-6 h-6 text-[#FF7A00]" />
            </div>
            <div className="flex-1">
              <h3 className="text-[#1A1A1A]" style={{ fontSize: "15px", fontWeight: 800 }}>Smart Route Connected</h3>
              <p className="text-[#6B7280]" style={{ fontSize: "12px", fontWeight: 600 }}>Optimal sequence generated for your trip.</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <Info className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 20px;
          padding: 0;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .custom-popup .leaflet-popup-tip {
          display: none;
        }
      `}</style>
    </div>
  );
}

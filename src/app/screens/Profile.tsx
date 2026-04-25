import { useNavigate } from "react-router";
import { User, Heart, MapPin, Calendar, CreditCard, Bell, Settings, HelpCircle, LogOut, ChevronRight, Star, Ticket } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Destination } from "../data/destinations";

export function Profile() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [itinerary] = useLocalStorage<Destination[]>("itinerary", []);
  const [bookings] = useLocalStorage<any[]>("bookings", []);

  const menuItems = [
    { icon: Calendar, label: "My Itinerary", path: "/app/trips", count: itinerary.length },
    { icon: Ticket, label: "My Bookings", path: "/app/bookings", count: bookings.length },
    { icon: Heart, label: "Saved Places", path: "/app/trips" },
    { icon: CreditCard, label: "Payment Methods" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="bg-[#F9F9FC] min-h-screen">
      <div className="bg-gradient-to-br from-[#006FB4] to-[#00C9A7] px-6 pt-12 pb-20 rounded-b-[48px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        
        <div className="flex items-center gap-5 mb-8 relative z-10">
          <div className="w-24 h-24 bg-white/20 backdrop-blur-xl border-4 border-white/30 rounded-full flex items-center justify-center text-white shadow-xl" style={{ fontSize: '32px', fontWeight: 800 }}>
            JD
          </div>
          <div>
            <h2 className="text-white mb-1" style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.02em' }}>Juan Dela Cruz</h2>
            <p className="text-white/70" style={{ fontSize: '15px', fontWeight: 500 }}>Travel Enthusiast • PH</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 relative z-10">
          <div className="bg-white/15 backdrop-blur-md rounded-[24px] p-4 text-center border border-white/20">
            <p className="text-white mb-0.5" style={{ fontSize: '24px', fontWeight: 800 }}>{itinerary.length}</p>
            <p className="text-white/70" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>PLANS</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-[24px] p-4 text-center border border-white/20">
            <p className="text-white mb-0.5" style={{ fontSize: '24px', fontWeight: 800 }}>{bookings.length}</p>
            <p className="text-white/70" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>TRIPS</p>
          </div>
          <div className="bg-white/15 backdrop-blur-md rounded-[24px] p-4 text-center border border-white/20">
            <p className="text-white mb-0.5" style={{ fontSize: '24px', fontWeight: 800 }}>12</p>
            <p className="text-white/70" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em' }}>REVIEWS</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-10 relative z-20">
        <div className="bg-white rounded-[32px] shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>Recent Itinerary</h3>
            <button onClick={() => navigate("/app/trips")} className="text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 700 }}>View All</button>
          </div>
          
          {itinerary.length === 0 ? (
            <p className="text-[#6B7280] text-center py-4" style={{ fontSize: '14px' }}>No places saved to your itinerary yet.</p>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {itinerary.slice(0, 3).map((place) => (
                <button
                  key={place.id}
                  onClick={() => navigate(`/app/destination/${place.id}`)}
                  className="relative rounded-2xl overflow-hidden aspect-square shadow-sm"
                >
                  <ImageWithFallback
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-left line-clamp-1" style={{ fontSize: '11px', fontWeight: 700 }}>
                      {place.name}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-[32px] shadow-sm mb-6 overflow-hidden border border-gray-100">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 border-b border-gray-50 last:border-0 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F9F9FC] flex items-center justify-center group-hover:bg-white transition-colors">
                    <Icon className="w-5 h-5 text-[#6B7280]" />
                  </div>
                  <span className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: 600 }}>{item.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  {item.count !== undefined && item.count > 0 && (
                    <span className="bg-[#FF7A00] text-white px-2.5 py-0.5 rounded-lg" style={{ fontSize: '12px', fontWeight: 800 }}>
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full bg-white rounded-[24px] shadow-sm px-6 py-5 flex items-center justify-center gap-3 text-red-500 mb-8 border border-gray-100 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span style={{ fontSize: '16px', fontWeight: 700 }}>Sign Out</span>
        </button>

        <div className="text-center pb-12">
          <p className="text-[#6B7280] mb-1" style={{ fontSize: '13px', fontWeight: 600 }}>GalaGuide PH v2.0.0</p>
          <p className="text-[#9CA3AF]" style={{ fontSize: '12px' }}>Created with ❤️ in the Philippines</p>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-[60]">
          <div className="bg-white rounded-[32px] max-w-sm w-full p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6 mx-auto">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-center text-[#1A1A1A] mb-2" style={{ fontSize: '22px', fontWeight: 800 }}>Sign Out</h3>
            <p className="text-center text-[#6B7280] mb-8" style={{ fontSize: '15px' }}>
              Are you sure you want to sign out from your travel account?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate("/")}
                className="w-full py-4 bg-red-500 text-white rounded-2xl shadow-lg shadow-red-500/20 font-bold"
              >
                Sign Out
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full py-4 bg-white border border-gray-200 text-[#6B7280] rounded-2xl font-bold"
              >
                Stay Logged In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

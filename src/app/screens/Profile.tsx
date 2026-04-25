import { useNavigate } from "react-router";
import { User, Heart, MapPin, Calendar, CreditCard, Bell, Settings, HelpCircle, LogOut, ChevronRight, Star } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

const savedPlaces = [
  {
    id: 1,
    name: "El Nido, Palawan",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Boracay Beach",
    image: "https://images.unsplash.com/photo-1553195027-5168a50283c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Chocolate Hills",
    image: "https://images.unsplash.com/photo-1551677821-36cb8571bdfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.7,
  },
];

export function Profile() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    { icon: Calendar, label: "My Trips", path: "/app/trips" },
    { icon: Heart, label: "Saved Places", count: savedPlaces.length },
    { icon: CreditCard, label: "Payment Methods" },
    { icon: Bell, label: "Notifications" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-br from-[#FF7A00] to-[#00C9A7] px-6 pt-6 pb-12 rounded-b-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#FF7A00]" style={{ fontSize: '28px', fontWeight: 700 }}>
            JD
          </div>
          <div>
            <h2 className="text-white mb-1" style={{ fontSize: '22px', fontWeight: 700 }}>Juan Dela Cruz</h2>
            <p className="text-white/80" style={{ fontSize: '14px' }}>juan.delacruz@email.com</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>12</p>
            <p className="text-white/80" style={{ fontSize: '12px' }}>Trips</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>8</p>
            <p className="text-white/80" style={{ fontSize: '12px' }}>Reviews</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-white" style={{ fontSize: '24px', fontWeight: 700 }}>{savedPlaces.length}</p>
            <p className="text-white/80" style={{ fontSize: '12px' }}>Saved</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Saved Places</h3>
          <div className="grid grid-cols-3 gap-2">
            {savedPlaces.map((place) => (
              <button
                key={place.id}
                onClick={() => navigate(`/app/destination/${place.id}`)}
                className="relative rounded-lg overflow-hidden"
              >
                <ImageWithFallback
                  src={place.image}
                  alt={place.name}
                  className="w-full h-20 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-1 left-1 right-1">
                  <p className="text-white text-left line-clamp-1" style={{ fontSize: '10px', fontWeight: 600 }}>
                    {place.name}
                  </p>
                  <div className="flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white" style={{ fontSize: '9px' }}>{place.rating}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <button className="w-full mt-3 py-2 text-[#FF7A00]" style={{ fontSize: '14px', fontWeight: 500 }}>
            View All Saved Places
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-600" />
                  <span style={{ fontSize: '15px', fontWeight: 500 }}>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.count !== undefined && (
                    <span className="bg-[#FF7A00] text-white w-6 h-6 rounded-full flex items-center justify-center" style={{ fontSize: '12px', fontWeight: 600 }}>
                      {item.count}
                    </span>
                  )}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full bg-white rounded-2xl shadow-md px-6 py-4 flex items-center justify-center gap-3 text-red-500 mb-6"
        >
          <LogOut className="w-5 h-5" />
          <span style={{ fontSize: '15px', fontWeight: 600 }}>Log Out</span>
        </button>

        <div className="text-center pb-6">
          <p className="text-gray-500 mb-1" style={{ fontSize: '12px' }}>GalaGuide PH v1.0.0</p>
          <p className="text-gray-400" style={{ fontSize: '11px' }}>Your Smart Travel Companion</p>
        </div>
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6">
            <h3 className="mb-2" style={{ fontSize: '20px', fontWeight: 600 }}>Log Out</h3>
            <p className="text-gray-600 mb-6" style={{ fontSize: '15px' }}>
              Are you sure you want to log out?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl"
                style={{ fontSize: '16px', fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={() => navigate("/")}
                className="flex-1 py-3 bg-red-500 text-white rounded-xl"
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

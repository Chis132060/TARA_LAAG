import { useState } from "react";
import { useNavigate } from "react-router";
import { Calendar, MapPin, ChevronRight, Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const upcomingBookings = [
  {
    id: 1,
    title: "El Nido Tour A",
    image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "May 20, 2026",
    time: "08:00 AM",
    location: "El Nido, Palawan",
    status: "Confirmed",
    bookingId: "GGP-2026-1-001",
  },
  {
    id: 2,
    title: "Chocolate Hills Tour",
    image: "https://images.unsplash.com/photo-1551677821-36cb8571bdfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "June 5, 2026",
    time: "09:00 AM",
    location: "Bohol",
    status: "Pending",
    bookingId: "GGP-2026-2-002",
  },
];

const pastBookings = [
  {
    id: 3,
    title: "Boracay Beach Resort",
    image: "https://images.unsplash.com/photo-1553195027-5168a50283c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    date: "April 10, 2026",
    location: "Boracay, Aklan",
    status: "Completed",
    bookingId: "GGP-2026-3-003",
  },
];

export function Bookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  const bookings = activeTab === "upcoming" ? upcomingBookings : pastBookings;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#FF7A00] px-6 pt-6 pb-8 rounded-b-3xl">
        <h1 className="text-white mb-2" style={{ fontSize: '24px', fontWeight: 700 }}>
          My Bookings
        </h1>
        <p className="text-white/80" style={{ fontSize: '14px' }}>Manage your travel bookings</p>
      </div>

      <div className="px-6 -mt-4">
        <div className="bg-white rounded-2xl shadow-md p-2 mb-6 flex">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-3 rounded-xl ${activeTab === "upcoming" ? "bg-[#FF7A00] text-white" : "text-gray-600"}`}
            style={{ fontSize: '15px', fontWeight: 600 }}
          >
            Upcoming ({upcomingBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-3 rounded-xl ${activeTab === "past" ? "bg-[#FF7A00] text-white" : "text-gray-600"}`}
            style={{ fontSize: '15px', fontWeight: 600 }}
          >
            Past ({pastBookings.length})
          </button>
        </div>

        <div className="space-y-4 pb-6">
          {bookings.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="mb-2" style={{ fontSize: '18px', fontWeight: 600 }}>No {activeTab} bookings</h3>
              <p className="text-gray-500 mb-6" style={{ fontSize: '14px' }}>
                {activeTab === "upcoming" ? "Start planning your next adventure!" : "Your completed bookings will appear here"}
              </p>
              {activeTab === "upcoming" && (
                <button
                  onClick={() => navigate("/app")}
                  className="px-6 py-3 bg-[#FF7A00] text-white rounded-xl"
                  style={{ fontSize: '15px', fontWeight: 600 }}
                >
                  Explore Destinations
                </button>
              )}
            </div>
          ) : (
            bookings.map((booking) => (
              <button
                key={booking.id}
                onClick={() => navigate(`/app/bookings/${booking.id}`)}
                className="w-full bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="flex">
                  <ImageWithFallback
                    src={booking.image}
                    alt={booking.title}
                    className="w-28 h-full object-cover"
                  />
                  <div className="flex-1 p-4 text-left">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 style={{ fontSize: '16px', fontWeight: 600 }} className="mb-1">{booking.title}</h3>
                        <div className="flex items-center gap-1 text-gray-500 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span style={{ fontSize: '13px' }}>{booking.location}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    <div className="flex items-center gap-4 mb-2">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span style={{ fontSize: '13px' }}>{booking.date}</span>
                      </div>
                      {booking.time && (
                        <div className="flex items-center gap-1 text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span style={{ fontSize: '13px' }}>{booking.time}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-500" style={{ fontSize: '12px' }}>{booking.bookingId}</span>
                      <span
                        className={`px-3 py-1 rounded-full ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                        style={{ fontSize: '12px', fontWeight: 600 }}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

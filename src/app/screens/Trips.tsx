import { useState } from "react";
import { Plus, Calendar, MapPin, Clock, Edit2, Trash2, ChevronRight } from "lucide-react";

export function Trips() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: "Palawan Adventure",
      startDate: "May 15, 2026",
      endDate: "May 20, 2026",
      days: [
        {
          day: 1,
          date: "May 15",
          activities: [
            { time: "09:00 AM", name: "Arrival at Puerto Princesa", location: "Airport", duration: "1 hr" },
            { time: "12:00 PM", name: "City Tour", location: "Puerto Princesa", duration: "3 hrs" },
            { time: "06:00 PM", name: "Dinner at Kalui Restaurant", location: "Puerto Princesa", duration: "2 hrs" },
          ],
        },
        {
          day: 2,
          date: "May 16",
          activities: [
            { time: "06:00 AM", name: "Underground River Tour", location: "Sabang", duration: "6 hrs" },
            { time: "02:00 PM", name: "Lunch Break", location: "Sabang", duration: "1 hr" },
          ],
        },
        {
          day: 3,
          date: "May 17",
          activities: [
            { time: "07:00 AM", name: "Travel to El Nido", location: "El Nido", duration: "5 hrs" },
            { time: "03:00 PM", name: "Beach Relaxation", location: "El Nido", duration: "3 hrs" },
          ],
        },
      ],
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="bg-[#F9F9FC] min-h-screen">
      <div className="bg-white px-6 pt-6 pb-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-[#1A1A1A]" style={{ fontSize: '28px', fontWeight: 800 }}>My Trips</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-[#ff9940] rounded-full flex items-center justify-center shadow-md"
          >
            <Plus className="w-6 h-6 text-white" strokeWidth={3} />
          </button>
        </div>
        <p className="font-script text-[#6B7280]" style={{ fontSize: '18px', fontWeight: 600 }}>Plan your perfect adventure</p>
      </div>

      <div className="px-6 pt-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
            <div className="bg-gradient-to-r from-[#006FB4] to-[#FF7A00] px-6 py-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-white" style={{ fontSize: '22px', fontWeight: 800 }}>{trip.name}</h2>
                <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <Edit2 className="w-4 h-4 text-white" />
                </button>
              </div>
              <div className="flex items-center gap-2 text-white/95">
                <Calendar className="w-4 h-4" />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{trip.startDate} - {trip.endDate}</span>
              </div>
            </div>

            <div className="p-6">
              {trip.days.map((day, dayIndex) => (
                <div key={dayIndex} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF7A00] to-[#ff9940] rounded-2xl flex items-center justify-center text-white shadow-md" style={{ fontSize: '16px', fontWeight: 800 }}>
                      {day.day}
                    </div>
                    <div>
                      <h3 className="text-[#1A1A1A]" style={{ fontSize: '16px', fontWeight: 700 }}>Day {day.day}</h3>
                      <p className="text-[#6B7280]" style={{ fontSize: '13px', fontWeight: 500 }}>{day.date}</p>
                    </div>
                  </div>

                  <div className="ml-6 border-l-2 border-gray-200 pl-6 space-y-4">
                    {day.activities.map((activity, actIndex) => (
                      <div key={actIndex} className="relative">
                        <div className="absolute -left-[27px] w-3 h-3 bg-[#006FB4] rounded-full border-2 border-white" />
                        <div className="bg-[#F9F9FC] rounded-2xl p-4 hover:shadow-sm transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4 text-[#FF7A00]" />
                                <span className="text-[#FF7A00]" style={{ fontSize: '13px', fontWeight: 700 }}>{activity.time}</span>
                              </div>
                              <h4 className="text-[#1A1A1A]" style={{ fontSize: '15px', fontWeight: 700 }}>{activity.name}</h4>
                            </div>
                            <div className="flex gap-1">
                              <button className="p-1.5 hover:bg-white rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4 text-[#6B7280]" />
                              </button>
                              <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4 text-red-500" />
                              </button>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-[#6B7280] mb-1">
                            <MapPin className="w-3.5 h-3.5" />
                            <span style={{ fontSize: '13px' }}>{activity.location}</span>
                          </div>
                          <span className="text-[#6B7280]" style={{ fontSize: '12px' }}>Duration: {activity.duration}</span>
                        </div>
                      </div>
                    ))}

                    <button className="flex items-center gap-2 text-[#006FB4] px-4 py-2 rounded-2xl hover:bg-blue-50 transition-colors">
                      <Plus className="w-4 h-4" />
                      <span style={{ fontSize: '14px', fontWeight: 700 }}>Add Activity</span>
                    </button>
                  </div>
                </div>
              ))}

              <button className="w-full mt-4 py-4 border-2 border-dashed border-gray-300 rounded-2xl flex items-center justify-center gap-2 text-[#6B7280] hover:border-[#006FB4] hover:text-[#006FB4] transition-colors">
                <Plus className="w-5 h-5" />
                <span style={{ fontSize: '15px', fontWeight: 700 }}>Add Day</span>
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAddModal(true)}
          className="w-full py-4 bg-white rounded-2xl shadow-sm flex items-center justify-center gap-3 text-[#006FB4] border-2 border-[#006FB4] hover:bg-blue-50 transition-colors mb-6"
        >
          <Plus className="w-6 h-6" />
          <span style={{ fontSize: '16px', fontWeight: 700 }}>Create New Trip</span>
        </button>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-[#1A1A1A] mb-6" style={{ fontSize: '24px', fontWeight: 800 }}>Create New Trip</h3>
            <div className="space-y-5">
              <div>
                <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: 700 }}>Trip Name</label>
                <input
                  type="text"
                  placeholder="e.g., Summer Getaway"
                  className="w-full px-4 py-3 bg-[#F9F9FC] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
                  style={{ fontSize: '15px' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: 700 }}>Start Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#F9F9FC] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
                    style={{ fontSize: '14px' }}
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A1A] mb-2" style={{ fontSize: '14px', fontWeight: 700 }}>End Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#F9F9FC] border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#FF7A00] focus:border-transparent"
                    style={{ fontSize: '14px' }}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 border-2 border-gray-200 rounded-full hover:bg-gray-50 transition-colors"
                  style={{ fontSize: '16px', fontWeight: 700 }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 bg-[#FF7A00] text-white rounded-full shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-shadow"
                  style={{ fontSize: '16px', fontWeight: 700 }}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

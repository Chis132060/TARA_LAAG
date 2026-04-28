import { useNavigate } from "react-router";
import { Calendar, ChevronRight, Clock, ShieldCheck, Ticket, Trash2, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Booking {
  id: string;
  destinationId: number;
  destinationName: string;
  image: string;
  date: string;
  guests: number;
  totalPrice: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: string;
}

export function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useLocalStorage<Booking[]>("bookings", []);

  const cancelBooking = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  return (
    <div className="bg-[#F9F9FC] min-h-screen pb-24">
      <div className="bg-[#006FB4] px-6 pt-12 pb-16 rounded-b-[48px] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-white mb-2" style={{ fontSize: '32px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            My Bookings
          </h1>
          <p className="text-white/80" style={{ fontSize: '15px', fontWeight: 500 }}>Manage your Philippine adventures</p>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-10">
        {bookings.length === 0 ? (
          <div className="bg-white rounded-[32px] p-12 text-center shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ticket className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-[#1A1A1A] mb-2" style={{ fontSize: '20px', fontWeight: 700 }}>No bookings yet</h3>
            <p className="text-[#6B7280] mb-8 max-w-[220px] mx-auto" style={{ fontSize: '15px' }}>
              Your future trips will appear here once you book them.
            </p>
            <button
              onClick={() => navigate("/app/search")}
              className="px-8 py-4 bg-[#FF7A00] text-white rounded-2xl shadow-lg shadow-[#FF7A00]/20 font-bold"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all"
              >
                <div className="p-4 flex gap-4">
                  <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={booking.image}
                      alt={booking.destinationName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>{booking.destinationName}</h3>
                        <span className="text-[#00C851] bg-[#E7F9EE] px-2.5 py-1 rounded-lg" style={{ fontSize: '11px', fontWeight: 800 }}>
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#6B7280] mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>Reservation: #{booking.id}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-3">
                      <div>
                        <span className="text-[#6B7280] block" style={{ fontSize: '10px', fontWeight: 700 }}>DATE</span>
                        <div className="flex items-center gap-1 text-[#1A1A1A]">
                          <Calendar className="w-3.5 h-3.5 text-[#006FB4]" />
                          <span style={{ fontSize: '13px', fontWeight: 700 }}>{new Date(booking.date || (booking as any).checkIn || new Date()).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-[#6B7280] block" style={{ fontSize: '10px', fontWeight: 700 }}>GUESTS</span>
                        <div className="flex items-center gap-1 text-[#1A1A1A]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#006FB4]" />
                          <span style={{ fontSize: '13px', fontWeight: 700 }}>{booking.guests} Adults</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F9F9FC] px-6 py-4 flex items-center justify-between border-t border-gray-50">
                  <div>
                    <span className="text-[#6B7280] block" style={{ fontSize: '11px', fontWeight: 600 }}>Total Paid</span>
                    <span className="text-[#006FB4]" style={{ fontSize: '18px', fontWeight: 800 }}>{booking.totalPrice}</span>
                  </div>
                  <button 
                    onClick={() => cancelBooking(booking.id)}
                    className="flex items-center gap-2 text-red-500 bg-white px-4 py-2.5 rounded-xl border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span style={{ fontSize: '14px', fontWeight: 700 }}>Cancel</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

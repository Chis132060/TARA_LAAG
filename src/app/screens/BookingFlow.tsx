import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Calendar, Users, Info, ShieldCheck, Sparkles } from "lucide-react";
import { allDestinations, Destination } from "../data/destinations";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

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

export function BookingFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookings, setBookings] = useLocalStorage<Booking[]>("bookings", []);

  const destination = useMemo(() => {
    return allDestinations.find(d => d.id.toString() === id) || allDestinations[0];
  }, [id]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    guests: 2,
    fullName: "",
    email: "",
    phone: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateTotal = () => {
    const basePrice = parseInt(destination.entranceFee.replace(/[^\d]/g, "")) || 500;
    return basePrice * formData.guests;
  };

  const handleBooking = () => {
    if (!formData.fullName || !formData.email) {
      alert("Please fill in your contact details.");
      return;
    }

    setIsSubmitting(true);
    
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      destinationId: destination.id,
      destinationName: destination.name,
      image: destination.image,
      date: formData.date,
      guests: formData.guests,
      totalPrice: `₱${calculateTotal().toLocaleString()}`,
      status: 'confirmed',
      bookingDate: new Date().toLocaleDateString()
    };

    setTimeout(() => {
      setBookings([newBooking, ...bookings]);
      setIsSubmitting(false);
      navigate("/app/bookings");
    }, 1500);
  };

  return (
    <div className="bg-[#F9F9FC] min-h-screen pb-10">
      <div className="bg-white p-5 sticky top-0 z-20 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 800 }}>Complete Booking</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-3xl p-4 shadow-sm flex gap-4 border border-gray-100">
          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
            <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[#6B7280]" style={{ fontSize: '12px', fontWeight: 600 }}>{destination.category}</span>
            <h2 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>{destination.name}</h2>
            <div className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: '13px' }}>
              <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
              <span>{destination.rating} Rating</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
          <h3 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>Stay Details</h3>
          
          <div className="space-y-2">
            <label className="text-[#6B7280] block" style={{ fontSize: '12px', fontWeight: 700 }}>DATE</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#006FB4]" />
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-[#F9F9FC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#006FB4]"
                style={{ fontSize: '14px' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#6B7280] block" style={{ fontSize: '12px', fontWeight: 700 }}>GUESTS</label>
            <div className="flex items-center justify-between bg-[#F9F9FC] p-2 rounded-2xl border border-gray-100">
              <button 
                onClick={() => setFormData({...formData, guests: Math.max(1, formData.guests - 1)})}
                className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"
              >
                <span style={{ fontSize: '24px' }}>-</span>
              </button>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#006FB4]" />
                <span style={{ fontSize: '18px', fontWeight: 700 }}>{formData.guests} Persons</span>
              </div>
              <button 
                onClick={() => setFormData({...formData, guests: formData.guests + 1})}
                className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm"
              >
                <span style={{ fontSize: '24px' }}>+</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h3 className="text-[#1A1A1A]" style={{ fontSize: '18px', fontWeight: 800 }}>Contact Information</h3>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Full Name" 
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              className="w-full px-5 py-4 bg-[#F9F9FC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#006FB4]"
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
              className="w-full px-5 py-4 bg-[#F9F9FC] border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#006FB4]"
            />
          </div>
        </div>

        <div className="bg-[#E7F3FF] p-4 rounded-2xl flex gap-3 items-start border border-[#B8D9FF]">
          <Info className="w-5 h-5 text-[#006FB4] flex-shrink-0 mt-0.5" />
          <p className="text-[#004A7A]" style={{ fontSize: '13px', lineHeight: '1.5' }}>
            Free cancellation until 48 hours before check-in. Instant confirmation.
          </p>
        </div>
        {/* Total Price and Confirm Booking Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center justify-between px-2">
            <div>
              <span className="text-[#6B7280] block" style={{ fontSize: '14px', fontWeight: 600 }}>Total Price</span>
              <span className="text-[#00C851]" style={{ fontSize: '24px', fontWeight: 800 }}>₱{calculateTotal().toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5 text-[#00C851]">
                <ShieldCheck className="w-4 h-4" />
                <span style={{ fontSize: '12px', fontWeight: 700 }}>BEST PRICE</span>
              </div>
              <span className="text-[#6B7280]" style={{ fontSize: '11px' }}>Tax & fees included</span>
            </div>
          </div>
          
          <button 
            onClick={handleBooking}
            disabled={isSubmitting}
            className={`w-full py-5 rounded-[24px] text-white shadow-xl flex items-center justify-center gap-3 transition-all active:scale-95 ${isSubmitting ? 'bg-gray-400' : 'bg-[#FF7A00] shadow-orange-500/30'}`}
            style={{ fontSize: '18px', fontWeight: 800 }}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

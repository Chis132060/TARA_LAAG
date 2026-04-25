import { useNavigate, useParams } from "react-router";
import { CheckCircle2, Download, Share2, Calendar, MapPin, Users, CreditCard } from "lucide-react";

export function BookingConfirmation() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="bg-gradient-to-br from-green-50 to-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-green-700 mb-2" style={{ fontSize: '28px', fontWeight: 700 }}>
            Booking Confirmed!
          </h1>
          <p className="text-gray-600" style={{ fontSize: '16px' }}>
            Your adventure awaits
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Booking ID</p>
                <p style={{ fontSize: '16px', fontWeight: 600 }}>GGP-2026-{id}-001</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Status</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full" style={{ fontSize: '13px', fontWeight: 600 }}>
                  Confirmed
                </span>
              </div>
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 600 }}>El Nido Tour A</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Date</p>
                <p style={{ fontSize: '15px', fontWeight: 500 }}>May 20, 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Meeting Point</p>
                <p style={{ fontSize: '15px', fontWeight: 500 }}>El Nido Tourism Office</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Guests</p>
                <p style={{ fontSize: '15px', fontWeight: 500 }}>2 Adults</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Total Paid</p>
                <p className="text-[#00C9A7]" style={{ fontSize: '18px', fontWeight: 700 }}>₱2,400</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Important Information</h3>
          <ul className="space-y-2 text-gray-700" style={{ fontSize: '14px' }}>
            <li className="flex items-start gap-2">
              <span className="text-[#FF7A00] mt-1">•</span>
              <span>Please arrive 15 minutes before departure time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF7A00] mt-1">•</span>
              <span>Bring valid ID, sunscreen, and swimwear</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF7A00] mt-1">•</span>
              <span>Lunch and snorkeling equipment included</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF7A00] mt-1">•</span>
              <span>Free cancellation up to 24 hours before</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-3 mb-6">
          <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            <span style={{ fontSize: '15px', fontWeight: 500 }}>Download</span>
          </button>
          <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            <span style={{ fontSize: '15px', fontWeight: 500 }}>Share</span>
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate("/app/bookings")}
            className="w-full py-4 rounded-xl bg-[#FF7A00] text-white"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/app")}
            className="w-full py-3 text-gray-600"
            style={{ fontSize: '15px', fontWeight: 500 }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

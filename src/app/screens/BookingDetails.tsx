import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Calendar, MapPin, Users, Phone, Mail, Download, Share2, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function BookingDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Booking Details</h1>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="El Nido"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600 }}>El Nido Tour A</h2>
                <p className="text-gray-500" style={{ fontSize: '14px' }}>Big & Small Lagoon</p>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full" style={{ fontSize: '13px', fontWeight: 600 }}>
                Confirmed
              </span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-500 mb-1" style={{ fontSize: '13px' }}>Booking ID</p>
              <p style={{ fontSize: '16px', fontWeight: 600 }}>GGP-2026-{id}-001</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>Date & Time</p>
                  <p style={{ fontSize: '15px', fontWeight: 500 }}>May 20, 2026 • 08:00 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>Meeting Point</p>
                  <p style={{ fontSize: '15px', fontWeight: 500 }}>El Nido Tourism Office, Palawan</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-gray-500" style={{ fontSize: '13px' }}>Guests</p>
                  <p style={{ fontSize: '15px', fontWeight: 500 }}>2 Adults</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>Guest Information</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white" style={{ fontSize: '14px', fontWeight: 600 }}>
                JD
              </div>
              <div>
                <p style={{ fontSize: '15px', fontWeight: 500 }}>Juan Dela Cruz</p>
                <p className="text-gray-500" style={{ fontSize: '13px' }}>Primary Guest</p>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-13">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>juan.delacruz@email.com</span>
            </div>
            <div className="flex items-center gap-3 ml-13">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700" style={{ fontSize: '14px' }}>+63 912 345 6789</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>QR Code Voucher</h3>
          <div className="bg-gray-50 rounded-xl p-8 flex flex-col items-center">
            <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                <rect x="0" y="0" width="200" height="200" fill="white"/>
                {[...Array(15)].map((_, i) =>
                  [...Array(15)].map((_, j) =>
                    Math.random() > 0.5 && (
                      <rect
                        key={`${i}-${j}`}
                        x={j * 13}
                        y={i * 13}
                        width="12"
                        height="12"
                        fill="black"
                      />
                    )
                  )
                )}
              </svg>
            </div>
            <p className="text-gray-600 text-center" style={{ fontSize: '14px' }}>
              Show this QR code to the tour guide
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>Payment Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-600" style={{ fontSize: '14px' }}>Tour Package (2 pax)</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>₱2,400</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600" style={{ fontSize: '14px' }}>Service Fee</span>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>₱0</span>
            </div>
            <div className="h-px bg-gray-200 my-3" />
            <div className="flex justify-between">
              <span style={{ fontSize: '16px', fontWeight: 600 }}>Total Paid</span>
              <span className="text-[#00C9A7]" style={{ fontSize: '18px', fontWeight: 700 }}>₱2,400</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-green-700" style={{ fontSize: '13px', fontWeight: 500 }}>Payment Completed</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            <span style={{ fontSize: '15px', fontWeight: 500 }}>Download</span>
          </button>
          <button className="flex-1 py-3 rounded-xl border-2 border-gray-200 flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            <span style={{ fontSize: '15px', fontWeight: 500 }}>Share</span>
          </button>
        </div>

        <button className="w-full py-4 rounded-xl bg-[#FF7A00] text-white flex items-center justify-center gap-2" style={{ fontSize: '16px', fontWeight: 600 }}>
          <MessageCircle className="w-5 h-5" />
          Contact Support
        </button>

        <button className="w-full py-3 text-red-500" style={{ fontSize: '15px', fontWeight: 500 }}>
          Cancel Booking
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Check, Calendar, Users, CreditCard, Lock } from "lucide-react";

export function BookingFlow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);

  const packages = [
    { id: 1, name: "Tour A: Big & Small Lagoon", price: 1200, includes: ["Big Lagoon", "Small Lagoon", "Secret Lagoon", "Lunch", "Equipment"] },
    { id: 2, name: "Tour B: Entalula & Snake Island", price: 1400, includes: ["Entalula Beach", "Snake Island", "Cudugnon Cave", "Lunch", "Equipment"] },
    { id: 3, name: "Tour C: Hidden Beach & Matinloc", price: 1500, includes: ["Hidden Beach", "Matinloc Shrine", "Helicopter Island", "Lunch", "Equipment"] },
  ];

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate(`/app/booking-confirmation/${id}`);
    }
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);
  const total = selectedPkg ? selectedPkg.price * guests : 0;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 -ml-2">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Book Tour</h1>
        </div>

        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s <= step ? "bg-[#FF7A00] text-white" : "bg-gray-200 text-gray-500"}`} style={{ fontSize: '14px', fontWeight: 600 }}>
                {s < step ? <Check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-[#FF7A00]" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span style={{ fontSize: '11px' }} className="text-gray-600">Package</span>
          <span style={{ fontSize: '11px' }} className="text-gray-600">Date</span>
          <span style={{ fontSize: '11px' }} className="text-gray-600">Details</span>
          <span style={{ fontSize: '11px' }} className="text-gray-600">Payment</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        {step === 1 && (
          <div>
            <h2 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>Select Package</h2>
            <div className="space-y-3">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 ${selectedPackage === pkg.id ? "border-[#FF7A00] bg-orange-50" : "border-gray-200"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{pkg.name}</h3>
                    <span className="text-[#FF7A00]" style={{ fontSize: '18px', fontWeight: 700 }}>₱{pkg.price}</span>
                  </div>
                  <p className="text-gray-600 mb-2" style={{ fontSize: '13px' }}>Includes:</p>
                  <ul className="space-y-1">
                    {pkg.includes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700" style={{ fontSize: '13px' }}>
                        <div className="w-1.5 h-1.5 bg-[#00C9A7] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>Select Date & Guests</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  <Calendar className="inline w-4 h-4 mr-2" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
                  <Users className="inline w-4 h-4 mr-2" />
                  Number of Guests
                </label>
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200"
                    style={{ fontSize: '20px' }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: '20px', fontWeight: 600 }}>{guests}</span>
                  <button
                    onClick={() => setGuests(guests + 1)}
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200"
                    style={{ fontSize: '20px' }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>Guest Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>Full Name</label>
                <input type="text" placeholder="Juan Dela Cruz" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>Email</label>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>Phone Number</label>
                <input type="tel" placeholder="+63 912 345 6789" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>Special Requests (Optional)</label>
                <textarea
                  placeholder="Any dietary restrictions or special requirements?"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg h-24 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>Payment</h2>
            <div className="bg-orange-50 rounded-xl p-4 mb-6">
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: 600 }}>Booking Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontSize: '14px' }}>{selectedPkg?.name}</span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>₱{selectedPkg?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600" style={{ fontSize: '14px' }}>Guests</span>
                  <span style={{ fontSize: '14px', fontWeight: 500 }}>{guests} × ₱{selectedPkg?.price}</span>
                </div>
                <div className="h-px bg-gray-300 my-2" />
                <div className="flex justify-between">
                  <span style={{ fontSize: '16px', fontWeight: 600 }}>Total</span>
                  <span className="text-[#FF7A00]" style={{ fontSize: '20px', fontWeight: 700 }}>₱{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>Expiry</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>CVV</label>
                  <input type="text" placeholder="123" className="w-full px-4 py-3 border border-gray-200 rounded-lg" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-3">
                <Lock className="w-4 h-4" />
                <span style={{ fontSize: '13px' }}>Your payment information is secure and encrypted</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-xl bg-[#FF7A00] text-white"
          style={{ fontSize: '16px', fontWeight: 600 }}
        >
          {step === 4 ? "Confirm & Pay" : "Continue"}
        </button>
      </div>
    </div>
  );
}

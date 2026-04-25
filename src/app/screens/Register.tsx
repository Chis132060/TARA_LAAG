import { useNavigate } from "react-router";
import { User, Mail, Lock, Phone, ChevronLeft } from "lucide-react";

export function Register() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="h-screen flex flex-col bg-white max-w-[390px] mx-auto overflow-auto">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate("/login")} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Create Account</h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <p className="text-gray-600 mb-8">Join us and start exploring the Philippines</p>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Juan Dela Cruz"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FF7A00]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FF7A00]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                placeholder="+63 912 345 6789"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FF7A00]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FF7A00]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" style={{ fontSize: '14px', fontWeight: 500 }}>
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#FF7A00]"
                style={{ fontSize: '16px' }}
              />
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="terms" className="text-gray-600" style={{ fontSize: '14px' }}>
              I agree to the{" "}
              <span className="text-[#FF7A00]">Terms of Service</span> and{" "}
              <span className="text-[#FF7A00]">Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white bg-[#FF7A00] hover:bg-[#e66d00] mt-6"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Create Account
          </button>
        </form>

        <div className="text-center mt-6">
          <span className="text-gray-600" style={{ fontSize: '14px' }}>Already have an account? </span>
          <button
            onClick={() => navigate("/login")}
            className="text-[#FF7A00]"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

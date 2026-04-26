import { useNavigate } from "react-router";
import { Mail, Lock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  const handleGuestLogin = () => {
    navigate("/app");
  };

  return (
    <div className="h-screen flex flex-col bg-white max-w-[390px] mx-auto overflow-auto">
      <div className="relative h-56 w-full bg-gradient-to-br from-[#FF7A00]/5 to-[#ff9940]/10 flex flex-col items-center justify-center border-b border-gray-100">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg p-3 mb-3">
          <ImageWithFallback
            src="/logo.png"
            alt="GalaGuide PH Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-[#FF7A00]" style={{ fontSize: '24px', fontWeight: 800 }}>
          GalaGuidePH
        </h1>
      </div>

      <div className="flex-1 px-6 py-8">
        <h2 className="mb-2" style={{ fontSize: '24px', fontWeight: 700 }}>
          Welcome Back
        </h2>
        <p className="text-gray-600 mb-8">Sign in to continue your journey</p>

        <form onSubmit={handleLogin} className="space-y-4 mb-6">
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

          <div className="text-right">
            <button type="button" className="text-[#FF7A00]" style={{ fontSize: '14px', fontWeight: 500 }}>
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white bg-[#FF7A00] hover:bg-[#e66d00]"
            style={{ fontSize: '16px', fontWeight: 600 }}
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-500" style={{ fontSize: '14px' }}>or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style={{ fontSize: '16px', fontWeight: 500 }}>Continue with Google</span>
          </button>

          <button className="w-full py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-3 hover:bg-gray-50">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span style={{ fontSize: '16px', fontWeight: 500 }}>Continue with Facebook</span>
          </button>
        </div>

        <button
          onClick={handleGuestLogin}
          className="w-full py-3 text-gray-600 hover:text-[#FF7A00]"
          style={{ fontSize: '16px', fontWeight: 500 }}
        >
          Continue as Guest
        </button>

        <div className="text-center mt-6">
          <span className="text-gray-600" style={{ fontSize: '14px' }}>Don't have an account? </span>
          <button
            onClick={() => navigate("/register")}
            className="text-[#FF7A00]"
            style={{ fontSize: '14px', fontWeight: 600 }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

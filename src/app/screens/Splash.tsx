import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col bg-white max-w-[448px] mx-auto relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
        style={{ aspectRatio: '3/4' }}
      >
        <ImageWithFallback
          src="/splashscreeen.png"
          alt="Philippines Beautiful Scenery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="flex-1 flex flex-col items-center px-8 -mt-60 relative z-10"
      >
        <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-2xl mb-4 p-4">
          <img
            src="/logo.png"
            alt="GalaGuide Logo"
            className="w-full h-full object-contain"
          />
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mb-4 font-extrabold tracking-tight"
          style={{ fontSize: '36px' }}
        >
          <span className="text-[#006FB4]">GalaGuide</span>
          <span className="text-[#FF7A00]">PH</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="font-script text-[#1A1A1A] text-center mb-6"
          style={{ fontSize: '28px', fontWeight: 600, lineHeight: '1.3' }}
        >
          Explore the Philippines<br />Smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex gap-2 mb-8"
        >
          <div className="w-2.5 h-2.5 bg-[#FF7A00] rounded-full" />
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/onboarding")}
          className="w-full max-w-xs bg-[#FF7A00] text-white rounded-full py-4 shadow-lg shadow-orange-500/20"
          style={{ fontSize: '18px', fontWeight: 700 }}
        >
          Get Started
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-[#6B7280] mt-4"
          style={{ fontSize: '14px' }}
        >
          Your adventure begins here!
        </motion.p>
      </motion.div>
    </div>
  );
}

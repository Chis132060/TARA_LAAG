import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: "/boracay/boracay1.jpg",
      badge: "Explore",
      title: "Paradise Awaits",
      subtitle: "Discover Hidden Gems",
      description: "From pristine beaches to lush mountains, explore 7,641 islands of pure adventure",
      scriptText: "Your journey starts here",
    },
    {
      image: "/callecrisologo/callecrisologo1.jpg",
      badge: "Itenary",
      title: "Smart Itineraries",
      subtitle: "Personalized For You",
      description: "Create day-by-day plans",
      scriptText: "Travel smarter, not harder",
    },
    {
      image: "/elnido/elnido1.JPG",
      badge: "Book",
      title: "Seamless Booking",
      subtitle: "All In One Place",
      description: "Reserve tours, activities, and stays with transparent pricing and instant confirmation",
      scriptText: "Adventure made easy",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/login");
    }
  };

  const handleSkip = () => {
    navigate("/login");
  };

  const slide = slides[currentSlide];

  return (
    <div className="h-screen flex flex-col bg-white max-w-[448px] mx-auto relative overflow-hidden">
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-[#1A1A1A]"
        style={{ fontSize: '14px', fontWeight: 600 }}
      >
        Skip
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80" />
          </div>

          <div className="absolute top-20 left-6 z-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block px-4 py-2 bg-[#FF7A00] rounded-full shadow-lg"
            >
              <span className="text-white" style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.05em' }}>
                {slide.badge.toUpperCase()}
              </span>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 px-8 pb-32 z-10">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-script text-white mb-3"
              style={{ fontSize: '24px', fontWeight: 600 }}
            >
              {slide.scriptText}
            </motion.p>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white mb-2"
              style={{ fontSize: '36px', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.02em' }}
            >
              {slide.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-[#00D1FF] mb-4 drop-shadow-xl"
              style={{ 
                fontSize: '24px', 
                fontWeight: 800, 
                textShadow: '0 2px 12px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.5)',
                letterSpacing: '0.01em'
              }}
            >
              {slide.subtitle}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-white/90 mb-6"
              style={{ fontSize: '16px', lineHeight: '1.5' }}
            >
              {slide.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex gap-2 mb-6"
            >
              {slides.map((_, index) => (
                <div
                  key={index}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: index === currentSlide ? '32px' : '8px',
                    backgroundColor: index === currentSlide ? '#FF7A00' : 'rgba(255, 255, 255, 0.4)',
                  }}
                />
              ))}
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="w-full bg-[#FF7A00] text-white rounded-full py-4 shadow-lg shadow-orange-500/30"
              style={{ fontSize: '18px', fontWeight: 700 }}
            >
              {currentSlide === slides.length - 1 ? "Get Started" : "Continue"}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

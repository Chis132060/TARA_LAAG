import React from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { philippineRegions } from "../data/philippineRegions";

export interface ItineraryCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  badgeLeft: { text: string; icon: string; color: string; bg?: string };
  badgeRight: { text: string; icon: string; bg: string };
  btnText: string;
  btnTheme: string;
  region: string;
  spotIds: string[];
}

const suggestedData: ItineraryCardProps[] = [
  {
    id: "1",
    title: "3 Days in Siargao",
    description: "Island hopping, surf lessons, and the famous Maasin River bent tree.",
    image: "/Siargao/Siargao1.jpg",
    badgeLeft: { text: "3 Days", icon: "✨", color: "text-[#006FB4]", bg: "bg-white" },
    badgeRight: { text: "4.8", icon: "⭐", bg: "bg-black/40 text-white backdrop-blur-md" },
    btnText: "View Plan",
    btnTheme: "bg-[#F0F7FF] text-[#006FB4]",
    region: "Siargao",
    spotIds: ["si-1", "si-2", "si-3"],
  },
  {
    id: "2",
    title: "The Best of Cebu",
    description: "Whale sharks, waterfalls, and canyoneering adventures.",
    image: "/kawasanfalls/kawasanfalls1.jpg",
    badgeLeft: { text: "Popular", icon: "🔥", color: "text-[#FF7A00]", bg: "bg-white" },
    badgeRight: { text: "4.9", icon: "⭐", bg: "bg-black/40 text-white backdrop-blur-md" },
    btnText: "View Plan",
    btnTheme: "bg-[#C46000] text-white", // Adjusted orange to match a darker button if needed, or stick to #FF7A00
    region: "Cebu",
    spotIds: ["ce-3", "ce-1", "ce-2"],
  },
  {
    id: "3",
    title: "Palawan Escapade",
    description: "Discover pristine beaches, hidden lagoons, and breathtaking limestone cliffs.",
    image: "/elnido/elnido1.JPG",
    badgeLeft: { text: "5 Days", icon: "✨", color: "text-[#006FB4]", bg: "bg-white" },
    badgeRight: { text: "4.9", icon: "⭐", bg: "bg-black/40 text-white backdrop-blur-md" },
    btnText: "View Plan",
    btnTheme: "bg-[#F0F7FF] text-[#006FB4]",
    region: "Palawan",
    spotIds: ["pa-1", "pa-2", "pa-3", "pa-4", "pa-5"],
  }
];

export const SuggestedItineraries: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-10">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-[#1A1A1A] font-extrabold text-[20px]">Suggested Itineraries</h3>
          <p className="text-[#6B7280] text-[13px] mt-0.5">Plan your trip in seconds</p>
        </div>
        <button
          onClick={() => navigate("/app/search")}
          className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-full text-[13px] font-bold active:scale-95 transition-transform"
        >
          See All
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar -mx-6 px-6">
        {suggestedData.map((item) => (
          <div
            key={item.id}
            className="snap-center flex-shrink-0 w-[260px] bg-white rounded-[28px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.04)] flex flex-col"
          >
            {/* Card Image and Badges */}
            <div className="relative h-[180px] w-full">
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Left Badge */}
              <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-xl shadow-sm flex items-center gap-1 ${item.badgeLeft.bg || "bg-white"}`}>
                <span className="text-[12px]">{item.badgeLeft.icon}</span>
                <span className={`text-[12px] font-bold ${item.badgeLeft.color}`}>{item.badgeLeft.text}</span>
              </div>
              {/* Right Badge */}
              <div className={`absolute top-3 right-3 px-2 py-1 rounded-xl flex items-center gap-1 ${item.badgeRight.bg}`}>
                <span className="text-[10px]">{item.badgeRight.icon}</span>
                <span className="text-[12px] font-bold">{item.badgeRight.text}</span>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col flex-grow">
              <h4 className="text-[#1A1A1A] text-[17px] font-extrabold mb-1.5 line-clamp-1">
                {item.title}
              </h4>
              <p className="text-[#6B7280] text-[13px] leading-[1.4] line-clamp-2 mb-4 flex-grow">
                {item.description}
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  const regionData = philippineRegions[item.region];
                  const selectedSpots = regionData ? regionData.spots.filter(s => item.spotIds.includes(s.id)) : [];
                  
                  // Pre-populate planner with this region and selected spots
                  localStorage.setItem("planner_regions", JSON.stringify([item.region]));
                  localStorage.setItem("planner_spots", JSON.stringify(selectedSpots));
                  
                  // Reset any previous generated plan
                  localStorage.removeItem("planner_plan");
                  localStorage.removeItem("planner_is_optimized");
                  
                  // Set default stay configs for each spot (1 day each to start)
                  const stayConfigs = selectedSpots.map(s => ({
                    spotId: s.id,
                    daysToStay: 1,
                    startTime: "08:00",
                    endTime: "17:00"
                  }));
                  localStorage.setItem("planner_spot_stay_configs", JSON.stringify(stayConfigs));
                  
                  // Jump straight to the "duration" step
                  localStorage.setItem("planner_step", JSON.stringify("duration"));
                  navigate("/app/planner");
                }}
                className={`w-full py-3.5 rounded-[16px] text-[14px] font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-transform ${item.btnTheme}`}
              >
                {item.btnText}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

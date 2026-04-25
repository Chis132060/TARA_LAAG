import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Heart, Share2, Star, MapPin, Camera, Clock, Info, Sparkles, Calendar } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<'about' | 'highlights' | 'tips'>('about');

  const destinations: Record<string, any> = {
    "1": {
      name: "Siargao Cloud 9",
      image: "https://images.unsplash.com/photo-1572316197910-a32d5e5e8f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 3847,
      location: "General Luna, Siargao, Surigao del Norte",
      description: "Cloud 9 is one of the world's best surf breaks, featuring a powerful reef break that attracts surfers from around the globe. The iconic wooden boardwalk extends over the reef, offering perfect views of surfers riding the legendary barrels. Beyond surfing, Siargao offers island hopping to pristine beaches, secret lagoons, and vibrant nightlife in General Luna.",
      entranceFee: "₱150",
      category: "Beaches",
    },
    "2": {
      name: "Enchanted River",
      image: "https://images.unsplash.com/photo-1585795361718-2141ba44cbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 2521,
      location: "Hinatuan, Surigao del Sur",
      description: "The Enchanted River is a mystical deep blue saltwater river that flows into the Philippine Sea. Its stunning blue color comes from the mineral-rich spring water flowing from an underground cave. Local legends speak of fairies protecting the river. Visitors can swim in the crystal-clear waters, cliff jump, and explore the surrounding mangrove forests.",
      entranceFee: "₱100",
      category: "Waterfalls",
    },
    "3": {
      name: "Camiguin White Island",
      image: "https://images.unsplash.com/photo-1551521021-d929e606badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 1923,
      location: "Mambajao, Camiguin",
      description: "A stunning uninhabited white sandbar in the middle of the sea with panoramic views of Mount Hibok-Hibok and Mount Vulcan. This crescent-shaped island appears and disappears with the tide, offering pristine white sand beaches and turquoise waters perfect for swimming and photography. Accessible by boat from Yumbing or Agoho.",
      entranceFee: "₱50",
      category: "Beaches",
    },
    "4": {
      name: "Tinuy-an Falls",
      image: "https://images.unsplash.com/photo-1609930420316-72622d2db23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 2156,
      location: "Bislig, Surigao del Sur",
      description: "Known as the 'Niagara Falls of the Philippines,' Tinuy-an is a majestic three-tiered waterfall spanning 95 meters wide and 55 meters high. The curtain-like cascades create a stunning natural spectacle, especially during sunrise when rainbows form in the mist. Visitors can swim in the cool pools, ride bamboo rafts to get close to the falls, and enjoy the lush surrounding rainforest.",
      entranceFee: "₱50",
      category: "Waterfalls",
    },
    "5": {
      name: "Dahican Beach",
      image: "https://images.unsplash.com/photo-1725357347380-a07aaaa8527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 1567,
      location: "Mati, Davao Oriental",
      description: "A pristine 7-kilometer stretch of powdery white sand beach facing the Pacific Ocean. Perfect for surfing, skimboarding, and beach activities. The waves here are ideal for beginners to intermediate surfers. The beach is fringed with coconut trees and offers stunning sunrise views over the ocean.",
      entranceFee: "₱100",
      category: "Beaches",
    },
    "6": {
      name: "Britania Islands",
      image: "https://images.unsplash.com/photo-1760644328320-5e37dc6928d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 1834,
      location: "San Agustin, Surigao del Sur",
      description: "A group of 25 pristine islands and islets with powdery white sand beaches and crystal-clear turquoise waters. Island hopping here reveals hidden lagoons, sandbar formations, and excellent snorkeling spots. The most popular islands include Hagonoy, Naked, and Boslon Islands, each offering unique landscapes and untouched natural beauty.",
      entranceFee: "₱150",
      category: "Beaches",
    },
    "7": {
      name: "Sohoton Cove",
      image: "https://images.unsplash.com/photo-1736776256451-ac16ab400278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 1432,
      location: "Bucas Grande Island, Surigao del Norte",
      description: "A protected marine sanctuary featuring stunning lagoons, limestone caves, and the famous Jellyfish Sanctuary where you can swim with stingless jellyfish. Explore hidden caves with natural rock formations, kayak through mangrove tunnels, and swim in the emerald waters of Sohoton Lagoon and Hagukan Cave.",
      entranceFee: "₱200",
      category: "Waterfalls",
    },
    "8": {
      name: "Lake Sebu",
      image: "https://images.unsplash.com/photo-1767167649218-f8b03f66d28c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviews: 1245,
      location: "Lake Sebu, South Cotabato",
      description: "A serene mountain lake surrounded by lush forests and home to the indigenous T'boli people. Experience the Seven Falls, a series of magnificent waterfalls connected by hiking trails and ziplines. The longest zipline in Asia spans 760 meters across the falls. Explore T'boli culture, traditional weaving, and enjoy fresh tilapia harvested from the lake.",
      entranceFee: "₱100",
      category: "Mountains",
    },
    "9": {
      name: "Naked Island",
      image: "https://images.unsplash.com/photo-1736776256319-50153ce32dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 1678,
      location: "Dapa, Siargao, Surigao del Norte",
      description: "A small uninhabited sandbar with no trees or structures, just pure white sand surrounded by crystal-clear turquoise waters. Part of the famous Siargao island hopping tour, this pristine sandbar offers 360-degree views of the ocean and nearby islands. Perfect for swimming, sunbathing, and photography.",
      entranceFee: "₱100",
      category: "Beaches",
    },
    "10": {
      name: "Sunken Cemetery",
      image: "https://images.unsplash.com/photo-1610624878824-7840a911dde7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviews: 987,
      location: "Catarman, Camiguin",
      description: "A unique dive site where an entire cemetery sank beneath the sea during a volcanic eruption in 1871. Marked by a large cross visible from the shore, the sunken cemetery is now a fascinating underwater attraction with coral-covered tombstones. Great for snorkeling and diving, with rich marine life and historical significance.",
      entranceFee: "₱50",
      category: "Waterfalls",
    },
    "11": {
      name: "Magpupungko Pools",
      image: "https://images.unsplash.com/photo-1622481227477-8db839366177?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 2134,
      location: "Pilar, Siargao, Surigao del Norte",
      description: "Natural infinity pools carved into rock formations by centuries of wave action. During low tide, these tidal pools reveal crystal-clear waters perfect for swimming with stunning views of the Pacific Ocean. The pools are surrounded by unique rock formations that create natural diving platforms. Best visited during low tide when the pools are calm and clear.",
      entranceFee: "₱50",
      category: "Waterfalls",
    },
    "12": {
      name: "Mantigue Island",
      image: "https://images.unsplash.com/photo-1768639400843-d604ccce9c3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviews: 1123,
      location: "Mahinog, Camiguin",
      description: "A small protected island sanctuary with pristine white sand beaches and excellent snorkeling spots. The island is surrounded by a marine sanctuary teeming with colorful fish and coral reefs. Walk around the entire island in 20 minutes, or relax under the shade of coconut trees. The underwater sanctuary features a sunken pavilion and diverse marine life.",
      entranceFee: "₱80",
      category: "Beaches",
    },
    "13": {
      name: "Mount Apo",
      image: "https://images.unsplash.com/photo-1767167648895-3e4a0ddf46ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 1876,
      location: "Davao City / North Cotabato",
      description: "The highest peak in the Philippines at 2,954 meters above sea level. A challenging multi-day trek through diverse ecosystems including mossy forests, volcanic terrain, and the summit crater. Home to the endangered Philippine Eagle and various endemic species. Climbers are rewarded with stunning sunrise views above the clouds and sulfur vents near the summit.",
      entranceFee: "₱300",
      category: "Mountains",
    },
    "14": {
      name: "Samal Island",
      image: "https://images.unsplash.com/photo-1565565915331-293fd8113954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 2345,
      location: "Island Garden City of Samal, Davao del Norte",
      description: "An island paradise just 10 minutes by boat from Davao City, featuring pristine beaches, crystal-clear waters, and lush tropical landscapes. Popular attractions include Pearl Farm Beach Resort, Hagimit Falls, Monfort Bat Cave (home to 1.8 million bats), and numerous beach resorts. Perfect for day trips or weekend getaways with excellent snorkeling and diving spots.",
      entranceFee: "₱100",
      category: "Beaches",
    },
    "15": {
      name: "Guyam Island",
      image: "https://images.unsplash.com/photo-1736776256236-b9bbaafa3992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviews: 1456,
      location: "General Luna, Siargao, Surigao del Norte",
      description: "A tiny circular island covered with coconut trees and surrounded by pristine white sand beaches. Part of the popular Siargao island hopping tour, Guyam is perfect for a quick swim, relaxation under palm trees, and enjoying fresh coconut drinks. The island can be walked around in just 5 minutes, offering an intimate tropical paradise experience.",
      entranceFee: "₱80",
      category: "Beaches",
    },
    "16": {
      name: "Daku Island",
      image: "https://images.unsplash.com/photo-1725357347354-12478ffe10ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviews: 1234,
      location: "General Luna, Siargao, Surigao del Norte",
      description: "The largest island in the Siargao island hopping tour, known for its long stretch of white sand beach and excellent seafood. 'Daku' means 'big' in the local dialect. The island has a small community and offers beachfront restaurants serving fresh grilled seafood and traditional Filipino dishes. Perfect for swimming, beach volleyball, and enjoying authentic island cuisine.",
      entranceFee: "₱100",
      category: "Beaches",
    },
    "17": {
      name: "Sugba Lagoon",
      image: "https://images.unsplash.com/photo-1771767643450-325c9a380cba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 1789,
      location: "Del Carmen, Siargao, Surigao del Norte",
      description: "A hidden lagoon surrounded by lush mangrove forests and limestone rock formations. This protected marine sanctuary features crystal-clear waters perfect for swimming, kayaking, and paddleboarding. Platforms and floating cottages dot the lagoon where you can dive, snorkel, or simply relax while enjoying fresh seafood. The calm emerald waters are teeming with fish and marine life.",
      entranceFee: "₱200",
      category: "Waterfalls",
    },
    "18": {
      name: "Aliwagwag Falls",
      image: "https://images.unsplash.com/photo-1693571569894-e3a71ebc8535?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviews: 1045,
      location: "Cateel, Davao Oriental",
      description: "A series of 84 cascading waterfalls spread over 1 kilometer, making it one of the highest waterfalls in the Philippines. The multi-tiered falls create natural swimming pools at different levels. A hanging bridge and hiking trails offer spectacular views of the cascades surrounded by lush rainforest. The area is also home to diverse wildlife and exotic plants.",
      entranceFee: "₱80",
      category: "Waterfalls",
    },
    "19": {
      name: "Maria Cristina Falls",
      image: "https://images.unsplash.com/photo-1767167649496-b0945c77ac2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviews: 1567,
      location: "Iligan City, Lanao del Norte",
      description: "The 'twin falls' of Iligan City, standing 98 meters high and one of the most powerful waterfalls in the Philippines. Known as the primary source of electric power for Mindanao, with hydroelectric plants harnessing its power. The viewing deck offers breathtaking views of the powerful cascades. The falls are most impressive during the rainy season when water volume is at its peak.",
      entranceFee: "₱50",
      category: "Waterfalls",
    },
    "20": {
      name: "Kalamansig White Sand Beach",
      image: "https://images.unsplash.com/photo-1462557804967-1b4876a07c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.5,
      reviews: 876,
      location: "Kalamansig, Sultan Kudarat",
      description: "A hidden gem featuring a long stretch of white sand beach along Moro Gulf. The calm waters are perfect for swimming and the beach remains relatively undiscovered by mass tourism. Enjoy fresh seafood from local vendors, stunning sunsets, and peaceful beach walks. The area is also a gateway to exploring the inland waterfalls and caves of Sultan Kudarat.",
      entranceFee: "₱50",
      category: "Beaches",
    },
    "21": {
      name: "Bislig Coastline",
      image: "https://images.unsplash.com/photo-1739045969692-f694965be10c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviews: 1123,
      location: "Bislig City, Surigao del Sur",
      description: "A stunning stretch of coastline featuring pristine beaches, surfing spots, and the famous Tinuy-an Falls nearby. The International Doll House and Paper Mill add unique attractions to the natural beauty. Ocean View Park offers panoramic views of the Pacific Ocean, while nearby beaches like Lawigan and Hagonoy provide excellent swimming and surfing opportunities.",
      entranceFee: "₱80",
      category: "Beaches",
    },
    "22": {
      name: "Katibawasan Falls",
      image: "https://images.unsplash.com/photo-1586263426392-3b3e0748f618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviews: 987,
      location: "Mambajao, Camiguin",
      description: "A 70-meter high waterfall cascading into a cool natural pool surrounded by lush tropical vegetation and wild orchids. The water falls from a cliff covered with ferns, orchids, and mosses, creating a refreshing mist. A developed park area features picnic grounds, swimming pools, and scenic viewpoints. The cold mountain water provides a refreshing escape from tropical heat.",
      entranceFee: "₱50",
      category: "Waterfalls",
    },
    "23": {
      name: "T'boli Living Museum",
      image: "https://images.unsplash.com/photo-1563280583-7c6d205d1188?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQaGlsaXBwaW5lcyUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZSUyMGluZGlnZW5vdXMlMjBtaW5kYW5hb3xlbnwxfHx8fDE3NzcxMDY0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 876,
      location: "Lake Sebu, South Cotabato",
      description: "Experience authentic T'boli culture at this living museum showcasing traditional weaving, music, and dance. Watch skilled artisans create the famous T'nalak cloth using natural dyes and ancient techniques. Learn about T'boli traditions, language, and way of life through interactive exhibits and cultural performances. The museum also features traditional houses, musical instruments like the hegelung, and authentic T'boli cuisine.",
      entranceFee: "₱100",
      category: "Culture",
    },
    "24": {
      name: "Zamboanga City Hall & Fort Pilar",
      image: "https://images.unsplash.com/photo-1563280607-41c1f2406e54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxQaGlsaXBwaW5lcyUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZSUyMGluZGlnZW5vdXMlMjBtaW5kYW5hb3xlbnwxfHx8fDE3NzcxMDY0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 1234,
      location: "Zamboanga City",
      description: "Explore the historic Fort Pilar, a 17th-century Spanish military defense fortress that now houses a museum and shrine. This stone fort showcases Zamboanga's rich multicultural heritage blending Spanish, Muslim, and indigenous influences. Visit the National Museum inside featuring archaeological finds, ethnographic displays, and historical artifacts. The surrounding area includes beautiful gardens and the iconic Zamboanga City Hall.",
      entranceFee: "₱50",
      category: "Culture",
    },
    "25": {
      name: "Aga Khan Museum Marawi",
      image: "https://images.unsplash.com/photo-1661200797308-604df94ec881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxQaGlsaXBwaW5lcyUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZSUyMGluZGlnZW5vdXMlMjBtaW5kYW5hb3xlbnwxfHx8fDE3NzcxMDY0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 678,
      location: "Marawi City, Lanao del Sur",
      description: "Discover the rich Islamic heritage of the Maranao people at this cultural museum. Explore traditional Maranao arts including the famous okir woodcarving, brass casting, and weaving. The museum showcases royal regalia, ancient manuscripts, traditional weapons, and musical instruments. Learn about Maranao architecture, their legendary epic Darangen, and Islamic traditions that shaped Mindanao's cultural landscape.",
      entranceFee: "₱80",
      category: "Culture",
    },
    "26": {
      name: "Kadayawan Festival",
      image: "https://images.unsplash.com/photo-1661200797561-026c99863b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxQaGlsaXBwaW5lcyUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZSUyMGluZGlnZW5vdXMlMjBtaW5kYW5hb3xlbnwxfHx8fDE3NzcxMDY0Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 2345,
      location: "Davao City",
      description: "Experience Davao's grandest cultural celebration, the Kadayawan Festival, held every August. This week-long festival showcases the rich cultural heritage of Davao's 11 indigenous tribes through vibrant street dancing, floral floats, and traditional rituals. Enjoy tribal music, indigenous games, fruit displays, and the famous Indak-Indak sa Kadalanan street parade. The festival celebrates thanksgiving for bountiful harvest and unity among diverse cultures.",
      entranceFee: "Free",
      category: "Culture",
    },
    "27": {
      name: "Magsaysay Fruit Market",
      image: "https://images.unsplash.com/photo-1774249447184-6000acf571cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGaWxpcGlubyUyMGZvb2QlMjB0cmFkaXRpb25hbCUyMGN1aXNpbmV8ZW58MXx8fHwxNzc3MTA2NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 1456,
      location: "Davao City",
      description: "Explore Davao's famous fruit capital at the bustling Magsaysay Market, open 24 hours. Sample exotic Mindanao fruits like durian (the king of fruits), mangosteen, rambutan, lanzones, and pomelo at incredibly fresh prices. The market offers authentic local delicacies, street food, and fresh produce. Experience the vibrant atmosphere of local vendors and discover unique tropical fruits you won't find anywhere else.",
      entranceFee: "Free",
      category: "Food",
    },
    "28": {
      name: "Roxas Night Market",
      image: "https://images.unsplash.com/photo-1694134645469-5326b3a1f865?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQaGlsaXBwaW5lcyUyMG1hcmtldCUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzc3MTA2NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 2134,
      location: "Davao City",
      description: "Davao's legendary street food haven comes alive every night on Roxas Avenue. Feast on endless grilled seafood, barbecue skewers, fresh fruit shakes, and local specialties like grilled tuna belly, kinilaw (ceviche), and balut. The night market stretches for blocks with hundreds of stalls offering affordable authentic Filipino street food. Don't miss the famous durian ice cream and halo-halo desserts.",
      entranceFee: "Free",
      category: "Food",
    },
    "29": {
      name: "Chicken House Zamboanga",
      image: "https://images.unsplash.com/photo-1578366687181-5f90a617ca7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxGaWxpcGlubyUyMGZvb2QlMjB0cmFkaXRpb25hbCUyMGN1aXNpbmV8ZW58MXx8fHwxNzc3MTA2NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 987,
      location: "Zamboanga City",
      description: "Savor authentic Zamboangueño cuisine at this iconic restaurant famous for its Chicken Satti - grilled chicken skewers in rich peanut sauce served with puso (hanging rice). Try traditional Muslim-influenced dishes like knickerbocker (tropical fruit salad), curacha (spanner crab in alavar sauce), and lokot-lokot (crispy fried pastry). The restaurant showcases the unique fusion of Malay, Spanish, and indigenous flavors that define Zamboanga's culinary identity.",
      entranceFee: "₱300",
      category: "Food",
    },
    "30": {
      name: "Bankerohan Public Market",
      image: "https://images.unsplash.com/photo-1768199439172-08b8c55e683b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxQaGlsaXBwaW5lcyUyMG1hcmtldCUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzc3MTA2NDkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      reviews: 1123,
      location: "Davao City",
      description: "Experience Davao's oldest and largest wet market, a treasure trove of fresh produce, seafood, meats, and local delicacies. Navigate through vibrant stalls selling exotic fruits, fresh fish caught daily, and Mindanao specialties. Sample local snacks like banana cue, turon, and freshly made bibingka. The market is the heart of Davao's food scene where locals shop for the freshest ingredients at the best prices.",
      entranceFee: "Free",
      category: "Food",
    },
    "31": {
      name: "Tuna Cuisine Experience",
      image: "https://images.unsplash.com/photo-1537495988501-f9cd94a78f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw4fHxGaWxpcGlubyUyMGZvb2QlMjB0cmFkaXRpb25hbCUyMGN1aXNpbmV8ZW58MXx8fHwxNzc3MTA2NDgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 1789,
      location: "General Santos City",
      description: "General Santos, the Tuna Capital of the Philippines, offers the freshest tuna dining experience. Visit local restaurants serving sashimi-grade tuna in various preparations: grilled tuna belly, kinilaw (ceviche), tuna sinigang (sour soup), and tuna panga (jaw). Tour the fish port early morning to witness the tuna auction and see massive yellowfin tunas being processed. The city's restaurants rival Japan's quality at fraction of the price.",
      entranceFee: "₱250",
      category: "Food",
    },
    "32": {
      name: "Cagayan de Oro Food Trail",
      image: "https://images.unsplash.com/photo-1546186479-607640447f9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8RmlsaXBpbm8lMjBmb29kJTIwdHJhZGl0aW9uYWwlMjBjdWlzaW5lfGVufDF8fHx8MTc3NzEwNjQ4MXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 1345,
      location: "Cagayan de Oro City, Misamis Oriental",
      description: "Embark on a culinary journey through CDO's famous food scene. Start with breakfast at the heritage District for sinuglaw (grilled pork and fish ceviche), try the legendary pastel (sweet filled bun) at Vjandep, sample authentic peanut kisses, and feast on grilled seafood at the Cogon Market. Don't miss binaki (sweet corn cakes), lechon, and the city's famous strawberry taho. The food trail showcases Northern Mindanao's rich culinary traditions.",
      entranceFee: "₱200",
      category: "Food",
    },
  };

  const destination = destinations[id || "1"] || destinations["1"];

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <div className="relative h-[60vh]">
        <ImageWithFallback
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

        <div className="absolute top-0 left-0 right-0 px-5 py-5 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6 text-[#1A1A1A]" />
          </button>
          <div className="flex gap-3">
            <button className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
              <Share2 className="w-5 h-5 text-[#1A1A1A]" />
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center"
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : "text-[#1A1A1A]"}`} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6">
          <div className="inline-block px-4 py-1.5 rounded-lg mb-3" style={{ backgroundColor: destination.category === 'Beaches' ? '#006FB4' : destination.category === 'Waterfalls' ? '#006FB4' : destination.category === 'Mountains' ? '#00C851' : '#FF7A00' }}>
            <span className="text-white" style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px' }}>
              {destination.category.toUpperCase()}
            </span>
          </div>
          <h1 className="text-white mb-2" style={{ fontSize: '36px', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            {destination.name}
          </h1>
          <div className="flex items-center gap-1.5 text-white">
            <MapPin className="w-5 h-5" strokeWidth={2.5} />
            <span style={{ fontSize: '16px', fontWeight: 500 }}>{destination.location}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-t-[32px] -mt-6 relative z-10 min-h-[40vh] pb-24">
        <div className="px-6 pt-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              <span className="text-[#1A1A1A]" style={{ fontSize: '22px', fontWeight: 800 }}>{destination.rating}</span>
              <span className="text-[#6B7280]" style={{ fontSize: '16px' }}>
                ({destination.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[#6B7280]" style={{ fontSize: '12px', fontWeight: 500 }}>Entrance Fee</span>
                <span className="text-[#00C851]" style={{ fontSize: '20px', fontWeight: 800 }}>{destination.entranceFee}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#1A1A1A]" style={{ fontSize: '20px', fontWeight: 800 }}>Photo Gallery</h3>
              <button className="flex items-center gap-1 text-[#006FB4]" style={{ fontSize: '14px', fontWeight: 600 }}>
                <Camera className="w-4 h-4" />
                View All
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
              <ImageWithFallback src={destination.image} alt={destination.name} className="w-full h-32 object-cover rounded-xl" />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex gap-2 mb-4 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('about')}
                className={`pb-3 px-4 ${activeTab === 'about' ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]' : 'text-[#6B7280]'}`}
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                className={`pb-3 px-4 ${activeTab === 'highlights' ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]' : 'text-[#6B7280]'}`}
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                Highlights
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`pb-3 px-4 ${activeTab === 'tips' ? 'border-b-2 border-[#FF7A00] text-[#FF7A00]' : 'text-[#6B7280]'}`}
                style={{ fontSize: '15px', fontWeight: 600 }}
              >
                Travel Tips
              </button>
            </div>

            {activeTab === 'about' && (
              <div>
                <p className="text-[#6B7280] mb-4" style={{ fontSize: '16px', lineHeight: '1.8', fontWeight: 400 }}>
                  {destination.description}
                </p>
              </div>
            )}

            {activeTab === 'highlights' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Stunning Natural Beauty</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Experience breathtaking views and pristine landscapes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Perfect for Photography</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Instagram-worthy spots at every corner</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#FF7A00] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Unique Local Experience</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Immerse yourself in authentic culture and traditions</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#006FB4] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Best Time to Visit</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Visit during dry season (November to May) for the best experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#006FB4] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>What to Bring</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Sunscreen, water bottle, camera, and comfortable footwear</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-[#006FB4] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-[#1A1A1A] mb-1" style={{ fontSize: '15px', fontWeight: 700 }}>Getting There</h4>
                    <p className="text-[#6B7280]" style={{ fontSize: '14px' }}>Accessible by private vehicle or public transportation from nearby towns</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-[#1A1A1A] mb-4" style={{ fontSize: '20px', fontWeight: 800 }}>Activities</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {destination.category === 'Beaches' && (
                <>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🏊 Swimming</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🤿 Snorkeling</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>📸 Photography</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🏄 Surfing</div>
                </>
              )}
              {destination.category === 'Waterfalls' && (
                <>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🏊 Swimming</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🥾 Hiking</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>📸 Photography</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🧘 Relaxation</div>
                </>
              )}
              {destination.category === 'Mountains' && (
                <>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🥾 Trekking</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>⛺ Camping</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>📸 Photography</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🌄 Sunrise Views</div>
                </>
              )}
              {destination.category === 'Culture' && (
                <>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🏛️ Museum Tour</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🎭 Cultural Show</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>📸 Photography</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🎨 Art & Crafts</div>
                </>
              )}
              {destination.category === 'Food' && (
                <>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🍴 Food Tasting</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🛒 Market Tour</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>📸 Photography</div>
                  <div className="flex-shrink-0 px-4 py-2 bg-[#F9F9FC] rounded-full" style={{ fontSize: '14px', fontWeight: 600 }}>🍹 Local Drinks</div>
                </>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-gradient-to-br from-[#FFF7F0] to-[#F9F9FC] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Calendar className="w-6 h-6 text-[#FF7A00]" />
                </div>
                <div>
                  <h4 className="text-[#1A1A1A] mb-2" style={{ fontSize: '16px', fontWeight: 700 }}>Best Time to Visit</h4>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: '14px' }}>November to May (Dry Season)</p>
                  <p className="text-[#6B7280]" style={{ fontSize: '13px' }}>Perfect weather with minimal rainfall and clear skies</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-[448px] mx-auto">
          <div className="flex gap-3">
            <button className="flex-1 bg-white border-2 border-[#FF7A00] text-[#FF7A00] py-3 rounded-2xl" style={{ fontSize: '16px', fontWeight: 700 }}>
              Add to Trip
            </button>
            <button className="flex-1 bg-[#FF7A00] text-white py-3 rounded-2xl" style={{ fontSize: '16px', fontWeight: 700 }}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

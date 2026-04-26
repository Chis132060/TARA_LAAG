export interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  images: string[];
  rating: number;
  price: string;
  entranceFee: string;
  description: string;
  category: string;
  color: string;
  lat: number;
  lng: number;
}

export const allDestinations: Destination[] = [
  {
    id: 1,
    name: "Siargao Cloud 9",
    location: "Siargao, Surigao del Norte",
    image: "/Siargao/Siargao1.jpg",
    images: [
      "/Siargao/Siargao1.jpg",
      "/Siargao/Siargao2.jpg",
      "/Siargao/Siargao3.jpg",
      "/Siargao/Siargao4.jpg",
      "/Siargao/Siargao5.jpg"
    ],
    rating: 4.9,
    price: "₱3,200",
    entranceFee: "₱150",
    description: "The surfing capital of the Philippines, famous for its thick, hollow tubes. Cloud 9 is the most iconic boardwalk and surf break in Siargao.",
    category: "Beaches",
    color: "#006FB4",
    lat: 9.8123,
    lng: 126.1633
  },
  {
    id: 2,
    name: "Enchanted River",
    location: "Hinatuan, Surigao del Sur",
    image: "/enchanted river/EnchantedRiver1.jpg",
    images: [
      "/enchanted river/EnchantedRiver1.jpg",
      "/enchanted river/EnchantedRiver2.webp",
      "/enchanted river/EnchantedRiver3.webp",
      "/enchanted river/EnchantedRiver4.webp",
      "/enchanted river/EnchantedRiver5.jpg"
    ],
    rating: 4.9,
    price: "₱1,800",
    entranceFee: "₱100",
    description: "A deep blue saltwater river that flows into the Philippine Sea. It is famous for its mystical crystal-clear waters and the daily feeding of the fish.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 8.3944,
    lng: 126.2917
  },
  {
    id: 3,
    name: "Camiguin White Island",
    location: "Mambajao, Camiguin",
    image: "/WhiteIslandCamiguin/White-Island-Camiguin-1.jpg",
    images: [
      "/WhiteIslandCamiguin/White-Island-Camiguin-1.jpg",
      "/WhiteIslandCamiguin/White-Island-Camiguin-2.jpg",
      "/WhiteIslandCamiguin/White-Island-Camiguin-3.jpg",
      "/WhiteIslandCamiguin/White-Island-Camiguin-4.jpg",
      "/WhiteIslandCamiguin/White-Island-Camiguin-5.jpg"
    ],
    rating: 4.8,
    price: "₱2,000",
    entranceFee: "₱50",
    description: "A horseshoe-shaped sandbar with a stunning view of Mt. Hibok-Hibok. Its powdery white sand and turquoise waters make it a must-visit in Camiguin.",
    category: "Beaches",
    color: "#006FB4",
    lat: 9.2558,
    lng: 124.6547
  },
  {
    id: 4,
    name: "Tinuy-an Falls",
    location: "Bislig, Surigao del Sur",
    image: "/Tinuyanfalls/tinuyanfalls1.jpg",
    images: [
      "/Tinuyanfalls/tinuyanfalls1.jpg",
      "/Tinuyanfalls/tinuyanfalls2.jpg",
      "/Tinuyanfalls/tinuyanfalls3.jpg",
      "/Tinuyanfalls/tinuyansfalls4.jpg",
      "/Tinuyanfalls/tinuyanfalls5.jpg"
    ],
    rating: 4.9,
    price: "₱1,500",
    entranceFee: "₱50",
    description: "Often called the 'Niagara Falls of the Philippines', this stunning multi-tiered waterfall is one of the widest in the country.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 8.1706,
    lng: 126.2269
  },
  {
    id: 5,
    name: "Dahican Beach",
    location: "Mati, Davao Oriental",
    image: "/dahicanbeach/dahicanbeach1.jpg",
    images: [
      "/dahicanbeach/dahicanbeach1.jpg",
      "/dahicanbeach/dahicanbeach2.jpg",
      "/dahicanbeach/dahicanbeach3.jpeg",
      "/dahicanbeach/dahicanbeach4.jpg",
      "/dahicanbeach/dahicanbeach5.jpg"
    ],
    rating: 4.8,
    price: "₱2,200",
    entranceFee: "₱100",
    description: "A 7-kilometer crescent of white sand facing the Pacific Ocean. It's a sanctuary for sea turtles and a favorite spot for skimboarding and surfing.",
    category: "Beaches",
    color: "#006FB4",
    lat: 6.9157,
    lng: 126.2572
  },
  {
    id: 6,
    name: "Britania Islands",
    location: "San Agustin, Surigao del Sur",
    image: "/britaniaisland/britaniaisland1.jpg",
    images: [
      "/britaniaisland/britaniaisland1.jpg",
      "/britaniaisland/britaniaisland2.jpg",
      "/britaniaisland/britaniaisland3.JPG",
      "/britaniaisland/britaniaisland4.JPG",
      "/britaniaisland/britaniaisland5.JPG"
    ],
    rating: 4.9,
    price: "₱2,500",
    entranceFee: "₱250",
    description: "A group of 24 serene islands and islets scattered across Lianga Bay. Perfect for island hopping and experiencing untouched tropical beauty.",
    category: "Beaches",
    color: "#006FB4",
    lat: 8.6508,
    lng: 126.2167
  },
  {
    id: 7,
    name: "Batanes Basco",
    location: "Basco, Batanes",
    image: "/batanesbasco/batanesbasco1.jpg",
    images: [
      "/batanesbasco/batanesbasco1.jpg",
      "/batanesbasco/batanesbasco2.jpg",
      "/batanesbasco/batanesbasco3.jpg",
      "/batanesbasco/batanesbasco4.jpg",
      "/batanesbasco/batanesbasco5.jpg"
    ],
    rating: 4.9,
    price: "₱8,500",
    entranceFee: "₱300",
    description: "Experience the breathtaking rolling hills and lighthouses of the northernmost province. Batanes offers a unique landscape and deep cultural heritage.",
    category: "Mountains",
    color: "#8B4513",
    lat: 20.4484,
    lng: 121.9708
  },
  {
    id: 8,
    name: "Lake Sebu",
    location: "South Cotabato",
    image: "/lakesebu/lakesebu1.jpg",
    images: [
      "/lakesebu/lakesebu1.jpg",
      "/lakesebu/lakesebu2.jpg",
      "/lakesebu/lakesebu3.jpg",
      "/lakesebu/lakesebu4.jpg",
      "/lakesebu/lakesebu5.jpg"
    ],
    rating: 4.7,
    price: "₱1,200",
    entranceFee: "₱50",
    description: "A natural lake located in the municipality of Lake Sebu, South Cotabato. It is famous for its 7 waterfalls and T'boli culture.",
    category: "Mountains",
    color: "#8B4513",
    lat: 6.2272,
    lng: 124.7100
  },
  {
    id: 9,
    name: "Naked Island",
    location: "Siargao, Surigao del Norte",
    image: "/nakedisland/nakedisland1.jpg",
    images: [
      "/nakedisland/nakedisland1.jpg",
      "/nakedisland/nakedisland2.jpg",
      "/nakedisland/nakedisland3.jpg",
      "/nakedisland/nakedisland4.jpg",
      "/nakedisland/nakedisland5.jpg"
    ],
    rating: 4.8,
    price: "₱1,500",
    entranceFee: "₱0",
    description: "A bare sandbar in the middle of the ocean. No trees, no buildings—just white sand and clear blue water.",
    category: "Beaches",
    color: "#006FB4",
    lat: 9.7717,
    lng: 126.1167
  },
  {
    id: 10,
    name: "Boracay White Beach",
    location: "Malay, Aklan",
    image: "/boracay/boracay1.jpg",
    images: [
      "/boracay/boracay1.jpg",
      "/boracay/boracay2.jpg",
      "/boracay/boracay3.jpg",
      "/boracay/boracay4.jpg",
      "/boracay/boracay5.jpg"
    ],
    rating: 4.9,
    price: "₱4,500",
    entranceFee: "₱75",
    description: "Consistently ranked among the best beaches in the world, Boracay's White Beach is famous for its powdery sand and vibrant sunset views.",
    category: "Beaches",
    color: "#006FB4",
    lat: 11.9674,
    lng: 121.9248
  },
  {
    id: 11,
    name: "Magpupungko Pools",
    location: "Pilar, Siargao",
    image: "/magpupungkopools/magpupungkopools1.jpg",
    images: [
      "/magpupungkopools/magpupungkopools1.jpg",
      "/magpupungkopools/magpupungkopools2.jpeg",
      "/magpupungkopools/magpupungkopools3.jpg",
      "/magpupungkopools/magpupungkopools4.webp",
      "/magpupungkopools/magpupungkopools5.jpeg"
    ],
    rating: 4.9,
    price: "₱1,200",
    entranceFee: "₱50",
    description: "Natural rock pools that appear during low tide. The clear blue water against the jagged rock formations creates a stunning natural spa.",
    category: "Beaches",
    color: "#006FB4",
    lat: 9.8789,
    lng: 126.1089
  },
  {
    id: 12,
    name: "Mantigue Island",
    location: "Camiguin",
    image: "/mantigueislands/mantigueisland1.jpg",
    images: [
      "/mantigueislands/mantigueisland1.jpg",
      "/mantigueislands/mantigueisland2.jpg",
      "/mantigueislands/mantigueisland3.jpg",
      "/mantigueislands/mantigueisland4.jpg",
      "/mantigueislands/mantigueisland5.jpg"
    ],
    rating: 4.7,
    price: "₱1,800",
    entranceFee: "₱100",
    description: "A small island off the coast of Camiguin, Mantigue is a paradise for snorkelers and divers with its diverse marine life.",
    category: "Beaches",
    color: "#006FB4",
    lat: 9.1700,
    lng: 124.8100
  },
  {
    id: 13,
    name: "Mount Apo",
    location: "Davao Region",
    image: "/mountapo/mountapo1.jpg",
    images: [
      "/mountapo/mountapo1.jpg",
      "/mountapo/mountapo2.jpg",
      "/mountapo/mountapo3.webp",
      "/mountapo/mountapo4.jpg",
      "/mountapo/mountapo5.jpg"
    ],
    rating: 4.9,
    price: "₱5,500",
    entranceFee: "₱500",
    description: "The highest mountain in the Philippines. A challenging climb that rewards adventurers with stunning vistas and diverse flora.",
    category: "Mountains",
    color: "#8B4513",
    lat: 6.9875,
    lng: 125.2708
  },
  {
    id: 14,
    name: "Samal Island",
    location: "Davao del Norte",
    image: "/samalisland/samal1.jpg",
    images: [
      "/samalisland/samal1.jpg",
      "/samalisland/samal2.jpg",
      "/samalisland/samal3.jpg",
      "/samalisland/samal4.jpg",
      "/samalisland/samal5.webp"
    ],
    rating: 4.8,
    price: "₱2,500",
    entranceFee: "₱150",
    description: "The Island Garden City of Samal is known for its beautiful resorts and the famous Monfort Bat Sanctuary.",
    category: "Beaches",
    color: "#006FB4",
    lat: 7.1000,
    lng: 125.7167
  },
  {
    id: 15,
    name: "El Nido Big Lagoon",
    location: "El Nido, Palawan",
    image: "/elnido/elnido1.JPG",
    images: [
      "/elnido/elnido1.JPG",
      "/elnido/elnido2.jpg",
      "/elnido/elnido3.jpg",
      "/elnido/elnido4.jpg",
      "/elnido/elnido5.webp"
    ],
    rating: 4.9,
    price: "₱4,800",
    entranceFee: "₱200",
    description: "Majestic limestone cliffs surrounding emerald green waters. A kayaking paradise in the heart of Palawan.",
    category: "Beaches",
    color: "#006FB4",
    lat: 11.1687,
    lng: 119.3900
  },
  {
    id: 16,
    name: "Coron Kayangan Lake",
    location: "Coron, Palawan",
    image: "/coronkayanganlake/coronkayanganlake1.jpg",
    images: [
      "/coronkayanganlake/coronkayanganlake1.jpg",
      "/coronkayanganlake/coronkayanganlake2.jpg",
      "/coronkayanganlake/coronkayanganlake3.webp",
      "/coronkayanganlake/coronkayanganlake4.webp",
      "/coronkayanganlake/coronkayanganlake5.jpg"
    ],
    rating: 4.9,
    price: "₱4,200",
    entranceFee: "₱300",
    description: "Regarded as the cleanest lake in the Philippines. Its crystal-clear brackish water and underwater rock formations are mesmerizing.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 11.9542,
    lng: 120.2197
  },
  {
    id: 17,
    name: "Kawasan Falls",
    location: "Badian, Cebu",
    image: "/kawasanfalls/kawasanfalls1.jpg",
    images: [
      "/kawasanfalls/kawasanfalls1.jpg",
      "/kawasanfalls/kawasanfalls2.jpg",
      "/kawasanfalls/kawasanfalls3.jpg",
      "/kawasanfalls/kawasaaanfalls4.jpg",
      "/kawasanfalls/kawasanfalls5.jpg"
    ],
    rating: 4.8,
    price: "₱2,800",
    entranceFee: "₱50",
    description: "Famous for its turquoise water and multi-tier cascades. The most popular spot for canyoneering adventures in Cebu.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 9.8039,
    lng: 123.3744
  },
  {
    id: 18,
    name: "Aliwagwag Falls",
    location: "Cateel, Davao Oriental",
    image: "/aliwagwagfalls/aliwagwagfalls1.jpg",
    images: [
      "/aliwagwagfalls/aliwagwagfalls1.jpg",
      "/aliwagwagfalls/aliwagwagfalls2.jpg",
      "/aliwagwagfalls/aliwagwagfalls3.jpg",
      "/aliwagwagfalls/aliwagwagfalls4.jpg",
      "/aliwagwagfalls/aliwagwagfalls5.jpg"
    ],
    rating: 4.7,
    price: "₱1,500",
    entranceFee: "₱50",
    description: "A multi-tiered waterfall often described as a 'stairway to heaven' with its more than 80 tiers of cascading waters.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 7.7231,
    lng: 126.2950
  },
  {
    id: 19,
    name: "Maria Cristina Falls",
    location: "Iligan City",
    image: "/mariacristinafalls/mariacristinafalls1.jpg",
    images: [
      "/mariacristinafalls/mariacristinafalls1.jpg",
      "/mariacristinafalls/mariacristinafalls2.jpg",
      "/mariacristinafalls/mariacristinafalls3.jpg",
      "/mariacristinafalls/mariacristinafalls4.JPG",
      "/mariacristinafalls/mariacristinafalls5.jpg"
    ],
    rating: 4.6,
    price: "₱1,200",
    entranceFee: "₱30",
    description: "The 'Twin Falls' of Iligan, which powers the hydroelectric plant of the region. A landmark of industrial and natural beauty.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 8.1833,
    lng: 124.1931
  },
  {
    id: 20,
    name: "Chocolate Hills",
    location: "Carmen, Bohol",
    image: "/chocolatehills/chocolatehills1.jpg",
    images: [
      "/chocolatehills/chocolatehills1.jpg",
      "/chocolatehills/chocolatehills2.jpg",
      "/chocolatehills/chocolatehills3.jpg",
      "/chocolatehills/chocolatehills4.jpg",
      "/chocolatehills/chocolatehills5.jpeg"
    ],
    rating: 4.9,
    price: "₱2,200",
    entranceFee: "₱100",
    description: "More than 1,200 symmetrical brown-toned hills that look like chocolate drops during the dry season. A geological wonder.",
    category: "Mountains",
    color: "#8B4513",
    lat: 9.8294,
    lng: 124.1625
  },
  {
    id: 21,
    name: "Calle Crisologo",
    location: "Vigan City",
    image: "/callecrisologo/callecrisologo1.jpg",
    images: [
      "/callecrisologo/callecrisologo1.jpg",
      "/callecrisologo/callecrisologo2.jpg",
      "/callecrisologo/callecrisologo3.jpg",
      "/callecrisologo/callecrisologo4.jpg",
      "/callecrisologo/callecrisologo5.jpg"
    ],
    rating: 4.9,
    price: "₱1,800",
    entranceFee: "₱0",
    description: "A UNESCO World Heritage site featuring Spanish colonial architecture and cobblestone streets. A trip back in time.",
    category: "Culture",
    color: "#9C27B0",
    lat: 17.5719,
    lng: 120.3888
  },
  {
    id: 22,
    name: "Katibawasan Falls",
    location: "Camiguin",
    image: "/katibawasanfalls/katibawasanfalls1.jpg",
    images: [
      "/katibawasanfalls/katibawasanfalls1.jpg",
      "/katibawasanfalls/katibawasanfalls2.jpg",
      "/katibawasanfalls/katibawasanfalls3.jpg",
      "/katibawasanfalls/katibawasanfalls4.jpg",
      "/katibawasanfalls/katibawasanfalls5.jpg"
    ],
    rating: 4.6,
    price: "₱1,000",
    entranceFee: "₱30",
    description: "A 250-foot waterfall plunging into a clear pool. It is surrounded by orchids, wild ferns, and tropical trees.",
    category: "Waterfalls",
    color: "#00C851",
    lat: 9.2150,
    lng: 124.7180
  },
  {
    id: 23,
    name: "T'boli Living Museum",
    location: "Lake Sebu, South Cotabato",
    image: "/tbolilivingmuseum/tbolilivingmuseum1.jpg",
    images: [
      "/tbolilivingmuseum/tbolilivingmuseum1.jpg",
      "/tbolilivingmuseum/tbolilivingmuseum2.jpg",
      "/tbolilivingmuseum/tbolilivingmuseum3.jpg",
      "/tbolilivingmuseum/tbolilivingmuseum4.jpg",
      "/tbolilivingmuseum/tbolilivingmuseum5.jpg"
    ],
    rating: 4.8,
    price: "₱800",
    entranceFee: "₱50",
    description: "An authentic T'boli house where visitors can learn about the tribe's weaving, music, and traditions.",
    category: "Culture",
    color: "#9C27B0",
    lat: 6.2300,
    lng: 124.7000
  },
  {
    id: 24,
    name: "Fort Pilar",
    location: "Zamboanga City",
    image: "/fortpillar/fortpillar1.jpg",
    images: [
      "/fortpillar/fortpillar1.jpg",
      "/fortpillar/fortpillar2.jpg",
      "/fortpillar/fortpillar3.jpg",
      "/fortpillar/fortpillar4.jpg",
      "/fortpillar/fortpillar5.jpg"
    ],
    rating: 4.7,
    price: "₱1,200",
    entranceFee: "₱20",
    description: "A 17th-century Spanish military defense fortress. It is a major landmark of the city and a symbol of its cultural heritage.",
    category: "Culture",
    color: "#9C27B0",
    lat: 6.9014,
    lng: 122.0811
  },
  {
    id: 25,
    name: "Sumaguing Cave",
    location: "Sagada",
    image: "/Sumanguingcave/Sumanguingcave1.jpg",
    images: [
      "/Sumanguingcave/Sumanguingcave1.jpg",
      "/Sumanguingcave/Sumanguingcave2.jpg",
      "/Sumanguingcave/Sumanguingcave3.jpg",
      "/Sumanguingcave/Sumanguingcave4.jpg",
      "/Sumanguingcave/Sumanguingcave5.jpg"
    ],
    rating: 4.8,
    price: "₱2,500",
    entranceFee: "₱500",
    description: "The 'Big Cave' of Sagada. Explore stunning stalactite and stalagmite formations in an adventurous spelunking tour.",
    category: "Mountains",
    color: "#8B4513",
    lat: 17.0833,
    lng: 120.9000
  },
  {
    id: 26,
    name: "Kadayawan Festival",
    location: "Davao City",
    image: "/kadayawan festival/kadayawan festival1.jpg",
    images: [
      "/kadayawan festival/kadayawan festival1.jpg",
      "/kadayawan festival/kadayawan festival2.JPG",
      "/kadayawan festival/kadayawan festival3.jpeg",
      "/kadayawan festival/kadayawan festival4.webp",
      "/kadayawan festival/kadayawan festival5.webp"
    ],
    rating: 4.9,
    price: "₱0",
    entranceFee: "₱0",
    description: "A week-long celebration of life and a thanksgiving for the gifts of nature. One of the most colorful festivals in the PH.",
    category: "Culture",
    color: "#9C27B0",
    lat: 7.0707,
    lng: 125.6092
  },
  {
    id: 27,
    name: "Magsaysay Market",
    location: "Davao City",
    image: "/magsaysaymarket/magsaysaymarket1.jpg",
    images: [
      "/magsaysaymarket/magsaysaymarket1.jpg",
      "/magsaysaymarket/magsaysaymarket2.JPG",
      "/magsaysaymarket/magsaysaymarket3.jpg",
      "/magsaysaymarket/magsaysaymarket4.jpg",
      "/magsaysaymarket/magsaysaymarket5.jpg"
    ],
    rating: 4.7,
    price: "₱500",
    entranceFee: "₱0",
    description: "The best place to buy fresh durian and other local fruits in Davao. A vibrant hub of local trade and food.",
    category: "Food",
    color: "#FF7A00",
    lat: 7.0736,
    lng: 125.6167
  },
  {
    id: 28,
    name: "Roxas Night Market",
    location: "Davao City",
    image: "/roxasnightmarket/roxasnightmarket1.jpg",
    images: [
      "/roxasnightmarket/roxasnightmarket1.jpg",
      "/roxasnightmarket/roxasnightmarket2.jpg",
      "/roxasnightmarket/roxasnightmarket3.jpg",
      "/roxasnightmarket/roxasnightmarket4.jpg",
      "/roxasnightmarket/roxasnightmarket5.jpg"
    ],
    rating: 4.8,
    price: "₱300",
    entranceFee: "₱0",
    description: "A popular night spot for street food, massage services, and thrift shopping. A must-experience for foodies.",
    category: "Food",
    color: "#FF7A00",
    lat: 7.0700,
    lng: 125.6100
  },
  {
    id: 29,
    name: "Burnham Park",
    location: "Baguio City",
    image: "/burnhampark/burnhampark1.jpg",
    images: [
      "/burnhampark/burnhampark1.jpg",
      "/burnhampark/burnhampark2.jpg",
      "/burnhampark/burnhampark3.webp",
      "/burnhampark/burnhampark4.jpg",
      "/burnhampark/burnhampark5.jpg"
    ],
    rating: 4.7,
    price: "₱1,000",
    entranceFee: "₱0",
    description: "The 'mother of all parks' in Baguio. Enjoy boat rides, biking, and a refreshing walk in the cool mountain air.",
    category: "Mountains",
    color: "#8B4513",
    lat: 16.4124,
    lng: 120.5935
  },
  {
    id: 30,
    name: "Taal Volcano",
    location: "Tagaytay",
    image: "/taalvolcano/taalvolcano1.jpg",
    images: [
      "/taalvolcano/taalvolcano1.jpg",
      "/taalvolcano/taalvolcano2.jpg",
      "/taalvolcano/taalvolcano3.jpg",
      "/taalvolcano/taalvolcano4.jpg",
      "/taalvolcano/taalvolcano5.jpg"
    ],
    rating: 4.8,
    price: "₱3,500",
    entranceFee: "₱100",
    description: "The world's smallest active volcano. A boat ride across the lake and a trek to the crater offer spectacular views.",
    category: "Mountains",
    color: "#8B4513",
    lat: 14.0113,
    lng: 120.9977
  },
  {
    id: 31,
    name: "Tuna Cuisine",
    location: "General Santos City",
    image: "/tunacuisine/tunacuisine1.jpg",
    images: [
      "/tunacuisine/tunacuisine1.jpg",
      "/tunacuisine/tunacuisine2.jpg",
      "/tunacuisine/tunacuisine3.jpg",
      "/tunacuisine/tunacuisine4.jpg",
      "/tunacuisine/tunacuisine5.jpg"
    ],
    rating: 4.9,
    price: "₱1,500",
    entranceFee: "₱0",
    description: "Experience the freshest tuna in the Tuna Capital of the Philippines. From sashimi to grilled panga.",
    category: "Food",
    color: "#FF7A00",
    lat: 6.1133,
    lng: 125.1719
  },
  {
    id: 32,
    name: "Hundred Islands",
    location: "Alaminos, Pangasinan",
    image: "/hundredislands/hundredislands1.jpg",
    images: [
      "/hundredislands/hundredislands1.jpg",
      "/hundredislands/hundredislands2.jpg",
      "/hundredislands/hundredislands3.jpg",
      "/hundredislands/hundredislands4.jpg",
      "/hundredislands/hundredislands5.jpg"
    ],
    rating: 4.8,
    price: "₱2,800",
    entranceFee: "₱150",
    description: "Over a hundred mushroom-shaped islands scattered in the Lingayen Gulf. A premier spot for island hopping and snorkeling.",
    category: "Beaches",
    color: "#006FB4",
    lat: 16.2025,
    lng: 119.9950
  }
];

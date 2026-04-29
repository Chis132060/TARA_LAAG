export interface PlannerSpot {
  id: string;
  name: string;
  region: string;
  description: string;
  category: "Beach" | "Adventure" | "Historical" | "Cultural" | "Nature" | "Food";
  gps: [number, number];
  tourismFee: number;
  environmentalFee: number;
  entryFee: number;
  image: string;
  rating: number;
  suggestedDuration: number; // minutes
  startDate?: string;
  endDate?: string;
}

export interface Region {
  name: string;
  center: [number, number];
  zoom: number;
  spots: PlannerSpot[];
}

export const philippineRegions: Record<string, Region> = {
  "Siargao": {
    name: "Siargao",
    center: [9.8482, 126.0458],
    zoom: 11,
    spots: [
      { id: "si-1", name: "Cloud 9", region: "Siargao", description: "Iconic surfing spot with a famous boardwalk and world-class waves.", category: "Beach", gps: [9.789, 126.162], tourismFee: 50, environmentalFee: 0, entryFee: 50, image: "/Siargao/Siargao1.jpg", rating: 4.9, suggestedDuration: 120 },
      { id: "si-2", name: "Sugba Lagoon", region: "Siargao", description: "Crystal-clear lagoon surrounded by limestone cliffs, perfect for kayaking.", category: "Nature", gps: [9.867, 125.967], tourismFee: 100, environmentalFee: 50, entryFee: 0, image: "/Siargao/Siargao2.jpg", rating: 4.9, suggestedDuration: 150 },
      { id: "si-3", name: "Magpupungko Rock Pools", region: "Siargao", description: "Natural tidal pools with crystal-clear water among stunning rock formations.", category: "Nature", gps: [9.878, 126.109], tourismFee: 50, environmentalFee: 0, entryFee: 50, image: "/magpupungkopools/magpupungkopools1.jpg", rating: 4.9, suggestedDuration: 120 },
      { id: "si-4", name: "Naked Island", region: "Siargao", description: "A bare white sandbar in the middle of the Pacific—nothing but sand and sea.", category: "Beach", gps: [9.771, 126.117], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/nakedisland/nakedisland1.jpg", rating: 4.8, suggestedDuration: 60 },
      { id: "si-5", name: "Daku Island", region: "Siargao", description: "Largest of the three islands, with coconut palms and local food stalls.", category: "Beach", gps: [9.795, 126.120], tourismFee: 50, environmentalFee: 0, entryFee: 0, image: "/Siargao/Siargao3.jpg", rating: 4.7, suggestedDuration: 90 },
      { id: "si-6", name: "Sohoton Cove", region: "Siargao", description: "A hidden lagoon with jellyfish sanctuary and dramatic cave formations.", category: "Adventure", gps: [9.870, 125.980], tourismFee: 100, environmentalFee: 100, EntranceFee: 0, image: "/Siargao/Siargao4.jpg", rating: 4.8, suggestedDuration: 180 },
    ]
  },
  "Surigao": {
    name: "Surigao",
    center: [8.5, 126.1],
    zoom: 9,
    spots: [
      { id: "su-1", name: "Enchanted River", region: "Surigao", description: "A deep blue saltwater river that flows into the Philippine Sea.", category: "Nature", gps: [8.3944, 126.2917], tourismFee: 0, environmentalFee: 50, entryFee: 50, image: "/enchanted river/EnchantedRiver1.jpg", rating: 4.9, suggestedDuration: 120 },
      { id: "su-2", name: "Tinuy-an Falls", region: "Surigao", description: "Often called the 'Niagara Falls of the Philippines'.", category: "Nature", gps: [8.1706, 126.2269], tourismFee: 50, environmentalFee: 0, entryFee: 50, image: "/Tinuyanfalls/tinuyanfalls1.jpg", rating: 4.9, suggestedDuration: 150 },
      { id: "su-3", name: "Britania Islands", region: "Surigao", description: "A group of 24 serene islands and islets scattered across Lianga Bay.", category: "Beach", gps: [8.6508, 126.2167], tourismFee: 100, environmentalFee: 50, entryFee: 100, image: "/britaniaisland/britaniaisland1.jpg", rating: 4.9, suggestedDuration: 240 },
    ]
  },
  "Boracay": {
    name: "Boracay",
    center: [11.9674, 121.9248],
    zoom: 13,
    spots: [
      { id: "br-1", name: "White Beach", region: "Boracay", description: "Famous for its powdery sand and vibrant sunset views.", category: "Beach", gps: [11.9674, 121.9248], tourismFee: 0, environmentalFee: 75, entryFee: 0, image: "/boracay/boracay1.jpg", rating: 4.9, suggestedDuration: 240 },
      { id: "br-2", name: "Puka Shell Beach", region: "Boracay", description: "A quieter beach known for puka shells mixed with the sand.", category: "Beach", gps: [11.989, 121.916], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/boracay/boracay2.jpg", rating: 4.7, suggestedDuration: 120 },
      { id: "br-3", name: "Ariel's Point", region: "Boracay", description: "Popular cliff-diving spot with boat trips.", category: "Adventure", gps: [11.896, 121.944], tourismFee: 0, environmentalFee: 0, entryFee: 2500, image: "/boracay/boracay3.jpg", rating: 4.8, suggestedDuration: 300 },
    ]
  },
  "Cebu": {
    name: "Cebu",
    center: [9.8500, 123.8907],
    zoom: 9,
    spots: [
      { id: "ce-1", name: "Kawasan Falls", region: "Cebu", description: "Multi-tiered waterfall famous for turquoise pools and canyoneering.", category: "Adventure", gps: [9.805, 123.351], tourismFee: 0, environmentalFee: 50, entryFee: 45, image: "/kawasanfalls/kawasanfalls1.jpg", rating: 4.8, suggestedDuration: 180 },
      { id: "ce-2", name: "Temple of Leah", region: "Cebu", description: "Roman-inspired temple offering panoramic views of the city.", category: "Historical", gps: [10.340, 123.885], tourismFee: 100, environmentalFee: 0, entryFee: 0, image: "/kawasanfalls/kawasanfalls2.jpg", rating: 4.6, suggestedDuration: 60 },
      { id: "ce-3", name: "Oslob Whale Sharks", region: "Cebu", description: "Swim alongside gentle whale sharks in a regulated encounter.", category: "Adventure", gps: [9.461, 123.380], tourismFee: 0, environmentalFee: 100, entryFee: 1000, image: "/kawasanfalls/kawasanfalls3.jpg", rating: 4.7, suggestedDuration: 120 },
      { id: "ce-4", name: "Magellan's Cross", region: "Cebu", description: "Historic wooden cross planted by Ferdinand Magellan in 1521.", category: "Historical", gps: [10.293, 123.902], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/kawasanfalls/kawasanfalls4.jpg", rating: 4.5, suggestedDuration: 30 },
      { id: "ce-5", name: "Tops Lookout", region: "Cebu", description: "Scenic viewpoint with 360-degree views of the city and sea.", category: "Nature", gps: [10.340, 123.870], tourismFee: 0, environmentalFee: 0, entryFee: 100, image: "/kawasanfalls/kawasanfalls5.jpg", rating: 4.6, suggestedDuration: 60 },
    ]
  },
  "Palawan": {
    name: "Palawan",
    center: [10.5, 119.5],
    zoom: 8,
    spots: [
      { id: "pa-1", name: "El Nido Big Lagoon", region: "Palawan", description: "Majestic limestone cliffs surrounding emerald green waters.", category: "Beach", gps: [11.169, 119.390], tourismFee: 200, environmentalFee: 200, entryFee: 0, image: "/elnido/elnido1.JPG", rating: 4.9, suggestedDuration: 150 },
      { id: "pa-2", name: "Kayangan Lake", region: "Palawan", description: "Cleanest lake in the Philippines with crystal-clear brackish water.", category: "Nature", gps: [11.954, 120.220], tourismFee: 300, environmentalFee: 0, entryFee: 0, image: "/coronkayanganlake/coronkayanganlake1.jpg", rating: 4.9, suggestedDuration: 120 },
      { id: "pa-3", name: "Puerto Princesa Underground River", region: "Palawan", description: "UNESCO World Heritage site featuring a navigable underground river.", category: "Adventure", gps: [10.195, 118.877], tourismFee: 150, environmentalFee: 0, entryFee: 250, image: "/elnido/elnido2.jpg", rating: 4.9, suggestedDuration: 180 },
      { id: "pa-4", name: "Twin Lagoon Coron", region: "Palawan", description: "Two connected lagoons separated by a limestone wall.", category: "Beach", gps: [11.985, 120.195], tourismFee: 200, environmentalFee: 0, entryFee: 0, image: "/elnido/elnido3.jpg", rating: 4.8, suggestedDuration: 90 },
      { id: "pa-5", name: "Nacpan Beach", region: "Palawan", description: "A pristine 4-km stretch of golden sand with stunning sunset views.", category: "Beach", gps: [11.268, 119.425], tourismFee: 0, environmentalFee: 0, entryFee: 50, image: "/elnido/elnido4.jpg", rating: 4.8, suggestedDuration: 120 },
    ]
  },
  "Baguio": {
    name: "Baguio",
    center: [16.4023, 120.5960],
    zoom: 13,
    spots: [
      { id: "ba-1", name: "Burnham Park", region: "Baguio", description: "The heart of Baguio with boat rides, biking, and cool mountain air.", category: "Nature", gps: [16.412, 120.594], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/burnhampark/burnhampark1.jpg", rating: 4.7, suggestedDuration: 90 },
      { id: "ba-2", name: "Mines View Park", region: "Baguio", description: "Panoramic overlook of the Benguet mining region and mountains.", category: "Nature", gps: [16.414, 120.616], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/burnhampark/burnhampark2.jpg", rating: 4.5, suggestedDuration: 45 },
      { id: "ba-3", name: "BenCab Museum", region: "Baguio", description: "Contemporary art museum showcasing works of National Artist BenCab.", category: "Cultural", gps: [16.439, 120.551], tourismFee: 0, environmentalFee: 0, entryFee: 150, image: "/burnhampark/burnhampark3.webp", rating: 4.8, suggestedDuration: 90 },
      { id: "ba-4", name: "Strawberry Farm La Trinidad", region: "Baguio", description: "Pick your own strawberries at the strawberry capital of the PH.", category: "Food", gps: [16.456, 120.587], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/burnhampark/burnhampark4.jpg", rating: 4.6, suggestedDuration: 60 },
      { id: "ba-5", name: "Camp John Hay", region: "Baguio", description: "Former American military base turned into a scenic park and resort.", category: "Historical", gps: [16.391, 120.601], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/burnhampark/burnhampark5.jpg", rating: 4.6, suggestedDuration: 90 },
    ]
  },
  "Bohol": {
    name: "Bohol",
    center: [9.8500, 124.0150],
    zoom: 10,
    spots: [
      { id: "bo-1", name: "Chocolate Hills", region: "Bohol", description: "Over 1,200 symmetrical hills that turn chocolate brown in dry season.", category: "Nature", gps: [9.829, 124.163], tourismFee: 0, environmentalFee: 0, entryFee: 50, image: "/chocolatehills/chocolatehills1.jpg", rating: 4.9, suggestedDuration: 90 },
      { id: "bo-2", name: "Tarsier Sanctuary", region: "Bohol", description: "See the world's smallest primate in its natural habitat.", category: "Nature", gps: [9.742, 124.030], tourismFee: 0, environmentalFee: 0, entryFee: 60, image: "/chocolatehills/chocolatehills2.jpg", rating: 4.8, suggestedDuration: 45 },
      { id: "bo-3", name: "Loboc River Cruise", region: "Bohol", description: "Scenic river cruise with buffet lunch and live cultural performances.", category: "Cultural", gps: [9.660, 124.022], tourismFee: 0, environmentalFee: 0, entryFee: 550, image: "/chocolatehills/chocolatehills3.jpg", rating: 4.7, suggestedDuration: 90 },
      { id: "bo-4", name: "Panglao Beach", region: "Bohol", description: "White sand beach with world-class diving and snorkeling spots.", category: "Beach", gps: [9.557, 123.786], tourismFee: 0, environmentalFee: 75, entryFee: 0, image: "/chocolatehills/chocolatehills4.jpg", rating: 4.8, suggestedDuration: 180 },
      { id: "bo-5", name: "Baclayon Church", region: "Bohol", description: "One of the oldest stone churches in the Philippines, built in 1595.", category: "Historical", gps: [9.623, 123.978], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/chocolatehills/chocolatehills5.jpeg", rating: 4.5, suggestedDuration: 30 },
    ]
  },
  "Batanes": {
    name: "Batanes",
    center: [20.4487, 121.9710],
    zoom: 11,
    spots: [
      { id: "bt-1", name: "Basco Lighthouse", region: "Batanes", description: "Iconic lighthouse perched on rolling green hills with ocean panoramas.", category: "Historical", gps: [20.448, 121.971], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/batanesbasco/batanesbasco1.jpg", rating: 4.9, suggestedDuration: 45 },
      { id: "bt-2", name: "Vayang Rolling Hills", region: "Batanes", description: "Dramatic coastal hills with breathtaking Pacific Ocean views.", category: "Nature", gps: [20.470, 121.950], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/batanesbasco/batanesbasco2.jpg", rating: 4.9, suggestedDuration: 60 },
      { id: "bt-3", name: "Marlboro Country", region: "Batanes", description: "Wide green pastures by the sea, resembling scenes from a movie.", category: "Nature", gps: [20.380, 121.920], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/batanesbasco/batanesbasco3.jpg", rating: 4.8, suggestedDuration: 60 },
      { id: "bt-4", name: "Sabtang Island", region: "Batanes", description: "Traditional Ivatan stone houses and unspoiled coastal landscapes.", category: "Cultural", gps: [20.330, 121.880], tourismFee: 0, environmentalFee: 0, entryFee: 200, image: "/batanesbasco/batanesbasco4.jpg", rating: 4.9, suggestedDuration: 240 },
    ]
  },
  "Camiguin": {
    name: "Camiguin",
    center: [9.1830, 124.7166],
    zoom: 11,
    spots: [
      { id: "cg-1", name: "White Island", region: "Camiguin", description: "A horseshoe-shaped sandbar with a stunning view of Mt. Hibok-Hibok.", category: "Beach", gps: [9.2558, 124.6547], tourismFee: 0, environmentalFee: 50, entryFee: 0, image: "/WhiteIslandCamiguin/White-Island-Camiguin-1.jpg", rating: 4.8, suggestedDuration: 120 },
      { id: "cg-2", name: "Mantigue Island", region: "Camiguin", description: "A paradise for snorkelers and divers with its diverse marine life.", category: "Beach", gps: [9.1700, 124.8100], tourismFee: 0, environmentalFee: 0, entryFee: 100, image: "/mantigueislands/mantigueisland1.jpg", rating: 4.7, suggestedDuration: 180 },
      { id: "cg-3", name: "Katibawasan Falls", region: "Camiguin", description: "A 250-foot waterfall plunging into a clear pool surrounded by orchids.", category: "Nature", gps: [9.2150, 124.7180], tourismFee: 0, environmentalFee: 0, entryFee: 30, image: "/katibawasanfalls/katibawasanfalls1.jpg", rating: 4.6, suggestedDuration: 90 },
    ]
  },
  "Davao Region": {
    name: "Davao Region",
    center: [7.1907, 125.4553],
    zoom: 8,
    spots: [
      { id: "dv-1", name: "Dahican Beach", region: "Davao Region", description: "A 7-kilometer crescent of white sand facing the Pacific Ocean.", category: "Beach", gps: [6.9157, 126.2572], tourismFee: 0, environmentalFee: 0, entryFee: 100, image: "/dahicanbeach/dahicanbeach1.jpg", rating: 4.8, suggestedDuration: 240 },
      { id: "dv-2", name: "Mount Apo", region: "Davao Region", description: "The highest mountain in the Philippines. A challenging climb with stunning vistas.", category: "Adventure", gps: [6.9875, 125.2708], tourismFee: 0, environmentalFee: 0, entryFee: 500, image: "/mountapo/mountapo1.jpg", rating: 4.9, suggestedDuration: 600 },
      { id: "dv-3", name: "Samal Island", region: "Davao Region", description: "Known for its beautiful resorts and the famous Monfort Bat Sanctuary.", category: "Beach", gps: [7.1000, 125.7167], tourismFee: 0, environmentalFee: 0, entryFee: 150, image: "/samalisland/samal1.jpg", rating: 4.8, suggestedDuration: 300 },
      { id: "dv-4", name: "Aliwagwag Falls", region: "Davao Region", description: "A multi-tiered waterfall often described as a 'stairway to heaven'.", category: "Nature", gps: [7.7231, 126.2950], tourismFee: 0, environmentalFee: 0, entryFee: 50, image: "/aliwagwagfalls/aliwagwagfalls1.jpg", rating: 4.7, suggestedDuration: 120 },
      { id: "dv-5", name: "Kadayawan Festival", region: "Davao Region", description: "A week-long celebration of life and thanksgiving for the gifts of nature.", category: "Cultural", gps: [7.0707, 125.6092], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/kadayawan festival/kadayawan festival1.jpg", rating: 4.9, suggestedDuration: 240 },
    ]
  },
  "South Cotabato": {
    name: "South Cotabato",
    center: [6.2272, 124.7100],
    zoom: 11,
    spots: [
      { id: "sc-1", name: "Lake Sebu", region: "South Cotabato", description: "A natural lake famous for its 7 waterfalls and T'boli culture.", category: "Nature", gps: [6.2272, 124.7100], tourismFee: 0, environmentalFee: 0, entryFee: 50, image: "/lakesebu/lakesebu1.jpg", rating: 4.7, suggestedDuration: 180 },
      { id: "sc-2", name: "T'boli Living Museum", region: "South Cotabato", description: "An authentic T'boli house where visitors can learn about the tribe's weaving and traditions.", category: "Cultural", gps: [6.2300, 124.7000], tourismFee: 0, environmentalFee: 0, entryFee: 50, image: "/tbolilivingmuseum/tbolilivingmuseum1.jpg", rating: 4.8, suggestedDuration: 90 },
    ]
  },
  "Lanao del Norte": {
    name: "Lanao del Norte",
    center: [8.1833, 124.1931],
    zoom: 11,
    spots: [
      { id: "ln-1", name: "Maria Cristina Falls", region: "Lanao del Norte", description: "The 'Twin Falls' of Iligan, which powers the hydroelectric plant of the region.", category: "Nature", gps: [8.1833, 124.1931], tourismFee: 0, environmentalFee: 0, entryFee: 30, image: "/mariacristinafalls/mariacristinafalls1.jpg", rating: 4.6, suggestedDuration: 90 },
    ]
  },
  "Ilocos Sur": {
    name: "Ilocos Sur",
    center: [17.5719, 120.3888],
    zoom: 13,
    spots: [
      { id: "is-1", name: "Calle Crisologo", region: "Ilocos Sur", description: "A UNESCO World Heritage site featuring Spanish colonial architecture and cobblestone streets.", category: "Historical", gps: [17.5719, 120.3888], tourismFee: 0, environmentalFee: 0, entryFee: 0, image: "/callecrisologo/callecrisologo1.jpg", rating: 4.9, suggestedDuration: 120 },
    ]
  },
  "Zamboanga": {
    name: "Zamboanga",
    center: [6.9014, 122.0811],
    zoom: 13,
    spots: [
      { id: "za-1", name: "Fort Pilar", region: "Zamboanga", description: "A 17th-century Spanish military defense fortress and a symbol of cultural heritage.", category: "Historical", gps: [6.9014, 122.0811], tourismFee: 0, environmentalFee: 0, entryFee: 20, image: "/fortpillar/fortpillar1.jpg", rating: 4.7, suggestedDuration: 90 },
    ]
  },
  "Mountain Province": {
    name: "Mountain Province",
    center: [17.0833, 120.9000],
    zoom: 11,
    spots: [
      { id: "mp-1", name: "Sumaguing Cave", region: "Mountain Province", description: "The 'Big Cave' of Sagada. Explore stunning stalactite and stalagmite formations.", category: "Adventure", gps: [17.0833, 120.9000], tourismFee: 0, environmentalFee: 0, entryFee: 500, image: "/Sumanguingcave/Sumanguingcave1.jpg", rating: 4.8, suggestedDuration: 180 },
    ]
  },
  "Tagaytay": {
    name: "Tagaytay",
    center: [14.0113, 120.9977],
    zoom: 11,
    spots: [
      { id: "tg-1", name: "Taal Volcano", region: "Tagaytay", description: "The world's smallest active volcano. A boat ride across the lake and a trek to the crater.", category: "Nature", gps: [14.0113, 120.9977], tourismFee: 0, environmentalFee: 0, entryFee: 100, image: "/taalvolcano/taalvolcano1.jpg", rating: 4.8, suggestedDuration: 240 },
    ]
  },
  "Pangasinan": {
    name: "Pangasinan",
    center: [16.2025, 119.9950],
    zoom: 11,
    spots: [
      { id: "pg-1", name: "Hundred Islands", region: "Pangasinan", description: "Over a hundred mushroom-shaped islands scattered in the Lingayen Gulf.", category: "Beach", gps: [16.2025, 119.9950], tourismFee: 0, environmentalFee: 0, entryFee: 150, image: "/hundredislands/hundredislands1.jpg", rating: 4.8, suggestedDuration: 300 },
    ]
  }
};

export const allRegionNames = Object.keys(philippineRegions);

// Haversine distance in km
export function haversineDistance(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const x = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}

// Nearest-neighbor TSP approximation
export function optimizeRoute(spots: PlannerSpot[]): PlannerSpot[] {
  if (spots.length <= 2) return [...spots];
  const remaining = [...spots];
  const route: PlannerSpot[] = [remaining.shift()!];
  while (remaining.length > 0) {
    const last = route[route.length - 1];
    let nearestIdx = 0;
    let nearestDist = Infinity;
    remaining.forEach((s, i) => {
      const d = haversineDistance(last.gps, s.gps);
      if (d < nearestDist) { nearestDist = d; nearestIdx = i; }
    });
    route.push(remaining.splice(nearestIdx, 1)[0]);
  }
  return route;
}

// Estimate travel time between two GPS points (rough road estimate)
export function estimateTravelMinutes(a: [number, number], b: [number, number]): number {
  const dist = haversineDistance(a, b);
  // Average 30 km/h for Philippine roads (includes winding/island roads)
  return Math.round((dist / 30) * 60);
}

export function formatFee(amount: number): string {
  return `₱${amount.toLocaleString()}`;
}

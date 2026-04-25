export interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
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
    image: "https://images.unsplash.com/photo-1572316197910-a32d5e5e8f75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1585795361718-2141ba44cbe0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1551521021-d929e606badc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1609930420316-72622d2db23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1725357347380-a07aaaa8527b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    rating: 4.8,
    price: "₱2,200",
    entranceFee: "₱100",
    description: "A 7-kilometer crescent of white sand facing the Pacific Ocean. It's a sanctuary for sea turtles and a favorite spot for skimboarding and surfing.",
    category: "Beaches",
    color: "#006FB4",
    lat: 6.9157,
    lng: 126.2572
  }
];

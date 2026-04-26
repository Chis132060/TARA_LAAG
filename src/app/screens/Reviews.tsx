import { useNavigate } from "react-router";
import { ChevronLeft, Star, ThumbsUp } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const reviews = [
  {
    id: 1,
    user: "Maria Santos",
    avatar: "MS",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely breathtaking! The lagoons are even more beautiful in person. Our guide was knowledgeable and friendly. Highly recommend the island hopping tour.",
    helpful: 24,
    images: ["/Siargao/Siargao1.jpg"],
  },
  {
    id: 2,
    user: "John Reyes",
    avatar: "JR",
    rating: 5,
    date: "1 week ago",
    comment: "Perfect destination for adventure seekers! The kayaking through the lagoons was an unforgettable experience. Water is crystal clear.",
    helpful: 18,
  },
  {
    id: 3,
    user: "Ana Cruz",
    avatar: "AC",
    rating: 4,
    date: "2 weeks ago",
    comment: "Beautiful place but can get crowded during peak season. Still worth visiting! Best time is early morning.",
    helpful: 12,
  },
  {
    id: 4,
    user: "Carlos Mendoza",
    avatar: "CM",
    rating: 5,
    date: "3 weeks ago",
    comment: "Paradise on earth! The limestone cliffs and turquoise waters create a magical scenery. Don't miss the Secret Lagoon!",
    helpful: 31,
  },
];

export function Reviews() {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Reviews</h1>
      </div>

      <div className="p-6 bg-gradient-to-br from-orange-50 to-white">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span style={{ fontSize: '48px', fontWeight: 700 }}>4.9</span>
            <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </div>
          <p className="text-gray-600" style={{ fontSize: '16px' }}>Based on 2,847 reviews</p>
        </div>

        <div className="space-y-2 mb-6">
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage = rating === 5 ? 85 : rating === 4 ? 12 : rating === 3 ? 2 : 1;
            return (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-gray-600 w-8" style={{ fontSize: '14px' }}>{rating}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-gray-500 w-12 text-right" style={{ fontSize: '14px' }}>{percentage}%</span>
              </div>
            );
          })}
        </div>

        <button className="w-full py-3 rounded-xl bg-[#FF7A00] text-white" style={{ fontSize: '16px', fontWeight: 600 }}>
          Write a Review
        </button>
      </div>

      <div className="px-6 py-4 space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 bg-[#FF7A00] rounded-full flex items-center justify-center text-white" style={{ fontSize: '14px', fontWeight: 600 }}>
                {review.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{review.user}</h4>
                  <span className="text-gray-500" style={{ fontSize: '13px' }}>{review.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-700 mb-3" style={{ fontSize: '15px', lineHeight: '22px' }}>
              {review.comment}
            </p>

            {review.images && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, i) => (
                  <ImageWithFallback key={i} src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                ))}
              </div>
            )}

            <button className="flex items-center gap-2 text-gray-600 hover:text-[#FF7A00]">
              <ThumbsUp className="w-4 h-4" />
              <span style={{ fontSize: '14px' }}>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

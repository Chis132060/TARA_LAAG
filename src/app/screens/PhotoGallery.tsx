import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const photos = [
  "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1553195027-5168a50283c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1605291210551-c670f48b274c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1760548759053-eae675d30efe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1521650559166-6b588715bc62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1759773533571-16c133e10ae8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1760548759043-44de2ad650c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  "https://images.unsplash.com/photo-1760815153677-d7984323db5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
];

export function PhotoGallery() {
  const navigate = useNavigate();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  return (
    <div className="bg-white min-h-screen">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-4 flex items-center gap-3 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 style={{ fontSize: '20px', fontWeight: 600 }}>Photo Gallery</h1>
      </div>

      <div className="grid grid-cols-2 gap-2 p-2">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedPhoto(photo)}
            className="aspect-square overflow-hidden rounded-lg"
          >
            <ImageWithFallback
              src={photo}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <ImageWithFallback
            src={selectedPhoto}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}

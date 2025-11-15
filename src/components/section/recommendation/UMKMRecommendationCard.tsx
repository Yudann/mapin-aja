// src\components\section\recommendation\UMKMRecommendationCard.tsx

import React from "react";
import { useRouter } from "next/navigation";
import { Star, MapPin, Timer, Heart } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UMKMRecommendationCardProps {
  umkm: UMKM;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function UMKMRecommendationCard({
  umkm,
  isFavorite,
  onToggleFavorite,
}: UMKMRecommendationCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/umkm/${umkm.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(umkm.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="shrink-0 w-64 sm:w-72 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-brown-accent/50 shadow-sm hover:shadow-xl transition-all duration-300 snap-start cursor-pointer group/card"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={umkm.image}
          alt={umkm.name}
          className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

        {umkm.discount && (
          <div className="absolute top-2 left-2 px-2.5 py-1 bg-red-500 text-white text-xs font-black rounded-lg shadow-lg">
            DISKON {umkm.discount}
          </div>
        )}

        <div className="absolute top-2 right-2 flex gap-1.5">
          {umkm.isVerified && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>

        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-3.5">
        <h4 className="font-bold text-brown-dark text-base mb-0.5 line-clamp-1 group-hover/card:text-brown-accent transition-colors">
          {umkm.name}
        </h4>

        <p className="text-xs text-brown-dark/60 mb-2.5">{umkm.category}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-brown-dark">
              {umkm.rating}
            </span>
            <span className="text-xs text-brown-dark/50">
              ({umkm.reviewCount}+)
            </span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brown-accent" />
            <span className="text-sm font-semibold text-brown-dark">
              {umkm.distance} km
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Timer className="w-3.5 h-3.5 text-brown-dark/60" />
            <span className="text-xs font-medium text-brown-dark/80">
              {umkm.deliveryTime}
            </span>
          </div>
          <span className="text-sm font-black text-brown-dark">
            {umkm.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}

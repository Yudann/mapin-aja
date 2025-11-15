// src\components\section\umkm\UMKMListCard.tsx

import React from "react";
import { Star, MapPin, Timer, Home, Heart, Sparkles } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UMKMListCardProps {
  umkm: UMKM;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: () => void;
}

export default function UMKMListCard({
  umkm,
  isFavorite,
  onToggleFavorite,
  onClick,
}: UMKMListCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(umkm.id);
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-brown-accent/50"
    >
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img
          src={umkm.image}
          alt={umkm.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {umkm.isVerified && (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-md shadow-lg">
              <Sparkles className="w-3 h-3" />
              Verified
            </span>
          )}
          {umkm.isOpen ? (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-md shadow-lg">
              Buka
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded-md shadow-lg">
              Tutup
            </span>
          )}
        </div>

        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-brown-dark/70"
            }`}
          />
        </button>

        {umkm.distance && umkm.distance < 1 && (
          <div className="absolute bottom-2 left-2 bg-brown-accent text-white px-2 py-1 rounded-md text-xs font-bold shadow-lg">
            💥 Diskon 15%
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-brown-dark text-base mb-1 line-clamp-1 group-hover:text-brown-accent transition-colors">
          {umkm.name}
        </h3>
        <p className="text-xs text-brown-accent font-semibold mb-3">
          {umkm.category}
        </p>

        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-brown-dark">
              {umkm.rating}
            </span>
          </div>
          <span className="text-xs text-brown-dark/60">
            ({umkm.reviewCount}+ ratings)
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-brown-dark/70 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span className="font-medium">{umkm.distance} km</span>
          </div>
          <div className="flex items-center gap-1">
            <Timer className="w-3 h-3" />
            <span className="font-medium">{umkm.deliveryTime}</span>
          </div>
          <div className="font-semibold text-brown-dark">{umkm.priceRange}</div>
        </div>

        <div className="flex items-start gap-1 mb-3">
          <Home className="w-3 h-3 text-brown-accent mt-0.5 shrink-0" />
          <p className="text-xs text-brown-dark/60 line-clamp-1">
            {umkm.address}
          </p>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="w-full py-2.5 bg-linear-to-r from-brown-accent to-brown-dark text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
        >
          <span>Lihat Detail</span>
        </button>
      </div>
    </div>
  );
}

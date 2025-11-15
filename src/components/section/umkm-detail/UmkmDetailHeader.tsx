// src\components\section\umkm-detail\UmkmDetailHeader.tsx

import React from "react";
import { ArrowLeft, Heart, Share2, CheckCircle } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UmkmDetailHeaderProps {
  umkm: UMKM;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function UmkmDetailHeader({
  umkm,
  isFavorite,
  onToggleFavorite,
}: UmkmDetailHeaderProps) {
  return (
    <div className="relative h-56 sm:h-64 md:h-80">
      <img
        src={umkm.bannerImage}
        alt={umkm.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10">
        <button
          onClick={() => window.history.back()}
          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-brown-dark" />
        </button>

        <div className="flex gap-2">
          <button
            onClick={onToggleFavorite}
            className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-brown-dark"
              }`}
            />
          </button>
          <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors">
            <Share2 className="w-5 h-5 text-brown-dark" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        {umkm.isOpen && (
          <span className="px-3 py-1.5 bg-green-500 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-1">
            <CheckCircle className="w-4 h-4" />
            Buka
          </span>
        )}
        {umkm.isVerified && (
          <span className="px-3 py-1.5 bg-blue-500 text-white text-sm font-bold rounded-full shadow-lg">
            ✓ Verified
          </span>
        )}
      </div>
    </div>
  );
}

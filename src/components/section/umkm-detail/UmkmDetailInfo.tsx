// src\components\section\umkm-detail\UmkmDetailInfo.tsx

import React from "react";
import { Star, MapPin, ThumbsUp, ShoppingBag, AlertCircle } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UmkmDetailInfoProps {
  umkm: UMKM;
}

export default function UmkmDetailInfo({ umkm }: UmkmDetailInfoProps) {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl font-black text-brown-dark mb-1">
          {umkm.name}
        </h1>
        <p className="text-sm text-brown-accent font-semibold">
          {umkm.category}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-base font-black text-brown-dark">
              {umkm.rating}
            </span>
          </div>
          <p className="text-xs text-brown-dark/60 font-medium">Cek ulasan</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <MapPin className="w-4 h-4 text-brown-accent" />
            <span className="text-base font-black text-brown-dark">
              {umkm.distance} km
            </span>
          </div>
          <p className="text-xs text-brown-dark/60 font-medium">Jarak</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="text-base font-black text-brown-dark">$$$</span>
          </div>
          <p className="text-xs text-brown-dark/60 font-medium">
            {umkm.priceRange}
          </p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="text-base font-black text-brown-dark">
              {umkm.reviewCount}+
            </span>
          </div>
          <p className="text-xs text-brown-dark/60 font-medium">rating</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-brown-light rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ThumbsUp className="w-4 h-4 text-brown-accent" />
          </div>
          <p className="text-xs font-semibold text-brown-dark mb-0.5">
            Rasa enak
          </p>
          <p className="text-xs text-brown-dark/60">{umkm.taste}</p>
        </div>
        <div className="bg-brown-light rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <ShoppingBag className="w-4 h-4 text-brown-accent" />
          </div>
          <p className="text-xs font-semibold text-brown-dark mb-0.5">
            Harga sesuai
          </p>
          <p className="text-xs text-brown-dark/60">{umkm.portion}</p>
        </div>
        <div className="bg-brown-light rounded-xl p-3 text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <AlertCircle className="w-4 h-4 text-brown-accent" />
          </div>
          <p className="text-xs font-semibold text-brown-dark mb-0.5">
            Kemasan baik
          </p>
          <p className="text-xs text-brown-dark/60">{umkm.packaging}</p>
        </div>
      </div>
    </>
  );
}

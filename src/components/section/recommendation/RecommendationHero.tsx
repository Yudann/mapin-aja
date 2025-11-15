// src\components\section\recommendation\RecommendationHero.tsx

import React from "react";
import { Sparkles, Star, Zap } from "lucide-react";
import { RECOMMENDATION_UMKMS } from "@/data/recommendation";

export default function RecommendationHero() {
  const userLocation = "Jakarta Selatan";
  const openUmkmsCount = RECOMMENDATION_UMKMS.filter((u) => u.isOpen).length;

  return (
    <section className="relative bg-linear-to-br from-brown-light via-white to-brown-light overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brown-accent/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brown-dark/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-brown-accent/20 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-brown-accent" />
            <span className="text-sm font-bold text-brown-dark">
              REKOMENDASI JAKARTA
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-brown-dark mb-4 leading-tight">
            Cek jangan sampai terlewat dari
            <br />
            <span className="bg-linear-to-r from-brown-accent via-brown-dark to-brown-accent bg-clip-text text-transparent">
              koleksi rekomendasi
            </span>{" "}
            kami
          </h2>

          <p className="text-base sm:text-lg text-brown-dark/70 max-w-2xl mx-auto leading-relaxed">
            Dipilih khusus untuk kamu yang berada di{" "}
            <span className="font-bold text-brown-accent">{userLocation}</span>,
            tinggal klik
            <br className="hidden sm:block" />
            langsung order!
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-brown-dark">
              {openUmkmsCount} UMKM Buka
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold text-brown-dark">
              Rating 4.5+
            </span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-gray-100 shadow-sm">
            <Zap className="w-4 h-4 text-brown-accent" />
            <span className="text-sm font-semibold text-brown-dark">
              Pengiriman Cepat
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 48"
          className="w-full h-6 sm:h-8"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,32L60,29.3C120,27,240,21,360,21.3C480,21,600,27,720,29.3C840,32,960,32,1080,29.3C1200,27,1320,21,1380,18.7L1440,16L1440,48L1380,48C1320,48,1200,48,1080,48C960,48,840,48,720,48C600,48,480,48,360,48C240,48,120,48,60,48L0,48Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

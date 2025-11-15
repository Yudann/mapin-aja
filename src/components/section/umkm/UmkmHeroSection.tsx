// src\components\section\umkm\UmkmHeroSection.tsx

import React from "react";
import { Search, MapPin, Heart, Store, ChevronRight } from "lucide-react";

interface UmkmHeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function UmkmHeroSection({
  searchQuery,
  setSearchQuery,
}: UmkmHeroSectionProps) {
  const userLocation = "District 8 - Jakarta Selatan";

  return (
    <section className="relative bg-linear-to-br from-brown-accent via-brown-dark to-brown-accent overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              {userLocation}
            </span>
            <ChevronRight className="w-4 h-4 text-white" />
          </div>
          <button className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
            <Heart className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
            <Store className="w-4 h-4 text-white" />
            <span className="text-sm font-bold text-white">DIREKTORI UMKM</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3">
            Cari UMKM? MapinAja!
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
            Temukan UMKM terdekat dengan tampilan modern dan pengalaman yang
            mudah digunakan.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-dark/60" />
            <input
              type="text"
              placeholder="Cari UMKM, kategori, atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-24 py-4 bg-white rounded-2xl text-brown-dark placeholder:text-brown-dark/40 text-base font-medium focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-brown-dark text-white rounded-xl font-bold text-sm hover:bg-brown-accent transition-colors">
              Cari
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 48"
          className="w-full h-8 sm:h-12"
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

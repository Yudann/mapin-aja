// src\components\section\recommendation\FilterSection.tsx

import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
} from "lucide-react";
import { RECOMMENDATION_UMKMS } from "@/data/recommendation";
import { QuickFilter } from "@/types/umkm";
import UMKMHorizontalList from "./UMKMHorizontalList";

interface FilterSectionProps {
  filter: QuickFilter;
  index: number;
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
  scrollLeft: (filterId: string) => void;
  scrollRight: (filterId: string) => void;
}

export default function FilterSection({
  filter,
  index,
  favorites,
  toggleFavorite,
  scrollRefs,
  scrollLeft,
  scrollRight,
}: FilterSectionProps) {
  const getFilteredUmkms = (filterId: string) => {
    const filtered = [...RECOMMENDATION_UMKMS];

    switch (filterId) {
      case "terdekat":
        return filtered.sort((a, b) => a.distance - b.distance).slice(0, 4);
      case "terlaris":
        return filtered
          .sort((a, b) => b.reviewCount - a.reviewCount)
          .slice(0, 4);
      case "hemat":
        return filtered
          .filter((u) => parseInt(u.priceRange.replace(/[^0-9]/g, "")) < 30000)
          .slice(0, 4);
      case "cepat":
        return filtered
          .filter((u) => parseInt(u.deliveryTime.split("-")[0]) < 20)
          .slice(0, 4);
      case "favorit":
        return filtered.sort((a, b) => b.rating - a.rating).slice(0, 4);
      case "buka":
        return filtered.filter((u) => u.isOpen).slice(0, 4);
      default:
        return filtered.slice(0, 4);
    }
  };

  const filteredUmkms = getFilteredUmkms(filter.id);

  return (
    <section key={filter.id} className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-2xl bg-linear-to-br ${filter.color} flex items-center justify-center shadow-lg transform rotate-3`}
            >
              <span className="text-2xl">{filter.emoji}</span>
            </div>
            {index === 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-pulse">
                !
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-black text-brown-dark">
              {filter.label}
            </h3>
            <p className="text-xs text-brown-dark/60">
              {filteredUmkms.length} pilihan tersedia
            </p>
          </div>
        </div>

        <button
          onClick={() => (window.location.href = `/umkm?filter=${filter.id}`)}
          className="flex items-center gap-1 px-4 py-2 bg-white hover:bg-brown-light border border-brown-accent/30 hover:border-brown-accent rounded-full text-sm font-bold text-brown-accent transition-all group"
        >
          <span>Tampilkan semua</span>
          <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      <div className="relative group">
        <button
          onClick={() => scrollLeft(filter.id)}
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border-2 border-brown-accent/20"
        >
          <ChevronLeft className="w-6 h-6 text-brown-dark" />
        </button>

        <button
          onClick={() => scrollRight(filter.id)}
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110 border-2 border-brown-accent/20"
        >
          <ChevronRight className="w-6 h-6 text-brown-dark" />
        </button>

        <UMKMHorizontalList
          filter={filter}
          umkms={filteredUmkms}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          scrollRefs={scrollRefs}
        />
      </div>
    </section>
  );
}

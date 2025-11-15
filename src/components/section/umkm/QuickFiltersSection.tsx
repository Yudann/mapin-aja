// src\components\section\umkm\QuickFiltersSection.tsx

import React from "react";
import { Navigation, TrendingUp, Heart, Tag, Zap, Clock } from "lucide-react";
import { QUICK_FILTERS } from "@/data/umkm";

interface QuickFiltersSectionProps {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}

const iconMap = {
  Navigation,
  TrendingUp,
  Heart,
  Tag,
  Zap,
  Clock,
};

export default function QuickFiltersSection({
  selectedFilter,
  setSelectedFilter,
}: QuickFiltersSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-8 relative z-10">
      <div className="bg-white rounded-2xl shadow-lg p-4">
        <h2 className="text-base font-bold text-brown-dark mb-3">
          Belum ada ide? Mulai dari sini aja dulu
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {QUICK_FILTERS.map((filter) => {
            const Icon = iconMap[filter.icon as keyof typeof iconMap];
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  selectedFilter === filter.id
                    ? "bg-brown-light border-2 border-brown-accent"
                    : "bg-white hover:bg-brown-light/50"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedFilter === filter.id
                      ? "bg-linear-to-br from-brown-accent to-brown-dark"
                      : "bg-brown-light"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      selectedFilter === filter.id
                        ? "text-white"
                        : "text-brown-accent"
                    }`}
                  />
                </div>
                <span className="text-xs font-semibold text-brown-dark text-center leading-tight">
                  {filter.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

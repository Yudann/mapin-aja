// src\app\(site)\umkm\recommendation\page.tsx

"use client";

import React, { useState, useRef } from "react";
import RecommendationHeader from "@/components/section/recommendation/RecommendationHeader";
import RecommendationHero from "@/components/section/recommendation/RecommendationHero";
import FilterSections from "@/components/section/recommendation/FilterSections";

export default function RecommendationPage() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const scrollRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const scrollLeft = (filterId: string) => {
    scrollRefs.current[filterId]?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (filterId: string) => {
    scrollRefs.current[filterId]?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <RecommendationHeader />

      <RecommendationHero />

      <FilterSections
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        scrollRefs={scrollRefs}
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
      />
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

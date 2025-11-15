// src\app\(site)\umkm\page.tsx

"use client";

import React, { useState } from "react";
import UmkmHeroSection from "@/components/section/umkm/UmkmHeroSection";
import QuickFiltersSection from "@/components/section/umkm/QuickFiltersSection";
import CategoriesSection from "@/components/section/umkm/CategoriesSection";
import MainUMKMList from "@/components/section/umkm/MainUMKMList";
import CitiesSection from "@/components/section/umkm/CitiesSection";
import WhyChooseSection from "@/components/section/umkm/WhyChooseSection";
import CTASection from "@/components/section/umkm/CTASection";
import { DUMMY_UMKMS } from "@/data/umkm";

export default function UmkmPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("terdekat");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

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

  const getFilteredUmkms = () => {
    const filtered = [...DUMMY_UMKMS];
    switch (selectedFilter) {
      case "terdekat":
        return filtered.sort((a, b) => (a.distance || 0) - (b.distance || 0));
      case "terlaris":
        return filtered.sort((a, b) => b.reviewCount - a.reviewCount);
      case "hemat":
        return filtered.filter(
          (u) => parseInt(u.priceRange?.replace(/[^0-9]/g, "") || "0") < 30000
        );
      case "cepat":
        return filtered.filter(
          (u) => parseInt(u.deliveryTime?.split("-")[0] || "0") < 20
        );
      case "favorit":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "buka":
        return filtered.filter((u) => u.isOpen);
      default:
        return filtered;
    }
  };

  const filteredUmkms = getFilteredUmkms();

  return (
    <div className="min-h-screen bg-white">
      <UmkmHeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <QuickFiltersSection
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />

      <CategoriesSection />

      <MainUMKMList
        selectedFilter={selectedFilter}
        filteredUmkms={filteredUmkms}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />

      <CitiesSection />

      <WhyChooseSection />

      <CTASection />
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
      `}</style>
    </div>
  );
}

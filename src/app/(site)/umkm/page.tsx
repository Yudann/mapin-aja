// src\app\(site)\umkm\page.tsx

"use client";

import React, { useState, useMemo } from "react";
import UmkmHeroSection from "@/components/section/umkm/UmkmHeroSection";
import QuickFiltersSection from "@/components/section/umkm/QuickFiltersSection";
import MainUMKMList from "@/components/section/umkm/MainUMKMList";
import CitiesSection from "@/components/section/umkm/CitiesSection";
import WhyChooseSection from "@/components/section/umkm/WhyChooseSection";
import CTASection from "@/components/section/umkm/CTASection";
import { DUMMY_UMKMS } from "@/data/umkm";
import CategoryFilter from "@/components/section/umkm/CategoriesSection";
import MapPreviewSection from "@/components/section/umkm/MapPreviewSection";

export default function UmkmPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("terdekat");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filter UMKM based on search, category, and selected filter
  const filteredUmkms = useMemo(() => {
    let filtered = [...DUMMY_UMKMS];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (umkm) =>
          umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          umkm.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          umkm.address.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((umkm) =>
        umkm.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Quick filters
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
  }, [searchQuery, selectedCategory, selectedFilter]);

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

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <MainUMKMList
        selectedFilter={selectedFilter}
        filteredUmkms={filteredUmkms}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />

      <CitiesSection />
      <MapPreviewSection />

      <CTASection />
    </div>
  );
}

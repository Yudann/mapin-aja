// src\components\section\umkm\CategoryFilter.tsx
"use client";

import React from "react";
import { CATEGORIES } from "@/data/umkm";
import {
  Utensils,
  Coffee,
  Shirt,
  Palette,
  Scissors,
  Wrench,
  Dumbbell,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const iconMap = {
  Utensils,
  Coffee,
  Shirt,
  Palette,
  Scissors,
  Wrench,
  Dumbbell,
  ShoppingBag,
};

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-brown-dark mb-2">
            Jelajahi Kategori UMKM
          </h2>
          <p className="text-gray-600 text-sm">
            Temukan berbagai produk lokal berkualitas
          </p>
        </div>
        <button className="hidden sm:flex items-center gap-2 text-brown-accent hover:text-brown-dark font-semibold transition-colors group">
          Lihat Semua
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {/* All Categories Button */}
        <button
          onClick={() => onCategoryChange("all")}
          className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 group ${
            selectedCategory === "all"
              ? "bg-brown-dark border-brown-dark text-white shadow-lg scale-105"
              : "bg-white border-gray-200 text-brown-dark hover:border-brown-accent hover:shadow-md"
          }`}
        >
          <div className="w-12 h-12 bg-linear-to-br from-brown-dark to-brown-accent rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs font-semibold text-center leading-tight">
            Semua Kategori
          </span>
        </button>

        {/* Category Buttons */}
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 group ${
                selectedCategory === category.id
                  ? "bg-brown-accent border-brown-accent text-white shadow-lg scale-105"
                  : "bg-white border-gray-200 text-brown-dark hover:border-brown-accent hover:shadow-md"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform ${category.color}`}
              >
                <Icon className="w-6 h-6 text-brown-dark" />
              </div>
              <span className="text-xs font-semibold text-center leading-tight">
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Show All Button */}
      <div className="flex sm:hidden justify-center mt-6">
        <button className="flex items-center gap-2 text-brown-accent hover:text-brown-dark font-semibold transition-colors group">
          Lihat Semua Kategori
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

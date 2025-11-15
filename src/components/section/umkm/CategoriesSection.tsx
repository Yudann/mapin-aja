// src\components\section\umkm\CategoriesSection.tsx

import React, { useRef } from "react";
import {
  ChevronRight,
  Utensils,
  Coffee,
  Shirt,
  Palette,
  Scissors,
  Wrench,
  Dumbbell,
  ShoppingBag,
} from "lucide-react";
import { CATEGORIES } from "@/data/umkm";

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

export default function CategoriesSection() {
  const categoriesRef = useRef<HTMLDivElement>(null);

  return (
    <section className="max-w-7xl mx-auto  py-8">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-xl font-bold text-brown-dark">
          Aneka kategori menarik
        </h2>
        <button className="text-sm font-semibold text-brown-accent hover:text-brown-dark flex items-center gap-1">
          Tampilkan semua
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={categoriesRef}
        className="flex gap-4 overflow-x-auto pb-4 px-4 scrollbar-hide snap-x snap-mandatory"
      >
        {CATEGORIES.map((category) => {
          const Icon = iconMap[category.icon as keyof typeof iconMap];
          return (
            <button
              key={category.id}
              className="shrink-0 w-32 snap-start group"
            >
              <div
                className={`w-32 h-32 rounded-2xl bg-linear-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-lg`}
              >
                <Icon className="w-16 h-16 text-white" />
              </div>
              <p className="text-sm font-semibold text-brown-dark text-center">
                {category.name}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
}

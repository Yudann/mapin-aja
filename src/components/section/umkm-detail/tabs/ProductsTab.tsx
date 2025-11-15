// src\components\section\umkm-detail\tabs\ProductsTab.tsx

import React from "react";
import { PRODUCTS } from "@/data/umkm-detail";

interface ProductsTabProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ["Semua", "Paket", "Ayam", "Snack", "Minuman"];

export default function ProductsTab({
  selectedCategory,
  onCategoryChange,
}: ProductsTabProps) {
  const filteredProducts =
    selectedCategory === "Semua"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-brown-dark text-white"
                : "bg-brown-light text-brown-dark hover:bg-brown-accent/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex gap-3 p-3 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="relative w-24 h-24 shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
              {!product.isAvailable && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xs font-bold">Habis</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-brown-dark text-sm mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-brown-dark/60 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-base font-black text-brown-dark">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="flex items-end">
              <button
                disabled={!product.isAvailable}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-colors ${
                  product.isAvailable
                    ? "bg-brown-accent text-white hover:bg-brown-dark"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

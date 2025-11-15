// src/app/(dashboard)/dashboard/customer/favorites/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Star,
  MapPin,
  Navigation,
  ChevronRight,
  Trash2,
  Filter,
  Grid3x3,
  List,
  Search,
} from "lucide-react";
import Link from "next/link";

// Dummy Data
const favoriteUMKM = [
  {
    id: "1",
    name: "Kedai Kopi Bahagia",
    category: "Minuman",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 127,
    isOpen: true,
    priceRange: "Rp 15.000 - Rp 45.000",
    address: "Jl. Sudirman No. 123",
    addedDate: "2 minggu lalu",
  },
  {
    id: "4",
    name: "Butik Sari Dewi",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    distance: "1.5 km",
    rating: 4.6,
    reviews: 54,
    isOpen: false,
    priceRange: "Rp 75.000 - Rp 500.000",
    address: "Jl. Kuningan No. 90",
    addedDate: "1 bulan lalu",
  },
  {
    id: "7",
    name: "Warung Soto Pak Karno",
    category: "Makanan",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    distance: "0.9 km",
    rating: 4.9,
    reviews: 234,
    isOpen: true,
    priceRange: "Rp 12.000 - Rp 30.000",
    address: "Jl. Gatot Subroto No. 45",
    addedDate: "3 hari lalu",
  },
  {
    id: "8",
    name: "Salon Cantik Jelita",
    category: "Jasa",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    distance: "2.3 km",
    rating: 4.7,
    reviews: 89,
    isOpen: true,
    priceRange: "Rp 50.000 - Rp 250.000",
    address: "Jl. Thamrin No. 67",
    addedDate: "1 minggu lalu",
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(favoriteUMKM);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("Semua");

  const categories = ["Semua", "Makanan", "Minuman", "Fashion", "Jasa"];

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  const filteredFavorites = favorites.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "Semua" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-red-500 via-pink-500 to-red-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Heart className="w-6 h-6 md:w-8 md:h-8 fill-white text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black">UMKM Favorit</h1>
              <p className="text-white/90 text-sm md:text-base">
                {favorites.length} UMKM yang kamu sukai
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Search & Filter Bar */}
      <div className="bg-base-light rounded-2xl p-4 border-2 border-brown-accent/20 shadow-lg space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari favorit..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none text-brown-dark placeholder-gray-500"
          />
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all border-2 text-sm ${
                  filterCategory === cat
                    ? "bg-brown-accent text-base-light border-brown-accent"
                    : "bg-brown-light/30 text-brown-dark border-brown-accent/20 hover:border-brown-accent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-brown-light/30 rounded-xl p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-brown-accent text-base-light"
                  : "text-brown-dark hover:bg-brown-light"
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-brown-accent text-base-light"
                  : "text-brown-dark hover:bg-brown-light"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filteredFavorites.length > 0 ? (
          viewMode === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            >
              {filteredFavorites.map((umkm, index) => (
                <motion.div
                  key={umkm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-base-light rounded-2xl border-2 border-brown-accent/20 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={umkm.image}
                      alt={umkm.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFavorite(umkm.id)}
                      className="absolute top-3 right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 hover:scale-110 transition-all shadow-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      {umkm.isOpen ? (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white rounded-full text-xs font-bold shadow-lg">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                          Buka
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-gray-500 text-white rounded-full text-xs font-bold shadow-lg">
                          Tutup
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="mb-3">
                      <h3 className="font-black text-lg text-brown-dark group-hover:text-brown-accent transition-colors line-clamp-1 mb-1">
                        {umkm.name}
                      </h3>
                      <p className="text-sm text-brown-dark/60 font-semibold">
                        {umkm.category}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold text-brown-dark">
                            {umkm.rating}
                          </span>
                          <span className="text-brown-dark/60">
                            ({umkm.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-brown-dark/60">
                          <MapPin className="w-4 h-4" />
                          <span className="font-semibold">{umkm.distance}</span>
                        </div>
                      </div>

                      <p className="text-xs text-brown-dark/50 font-semibold">
                        Ditambahkan {umkm.addedDate}
                      </p>
                    </div>

                    <Link
                      href={`/dashboard/customer/umkm/${umkm.id}`}
                      className="w-full py-2.5 bg-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                    >
                      Lihat Detail
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
              {filteredFavorites.map((umkm, index) => (
                <motion.div
                  key={umkm.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-base-light rounded-2xl border-2 border-brown-accent/20 p-4 hover:shadow-lg transition-all"
                >
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 rounded-xl overflow-hidden">
                      <img
                        src={umkm.image}
                        alt={umkm.name}
                        className="w-full h-full object-cover"
                      />
                      {umkm.isOpen ? (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                          Buka
                        </span>
                      ) : (
                        <span className="absolute top-2 left-2 px-2 py-1 bg-gray-500 text-white rounded-full text-xs font-bold">
                          Tutup
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-black text-brown-dark mb-1 line-clamp-1">
                            {umkm.name}
                          </h3>
                          <p className="text-sm text-brown-dark/60 font-semibold">
                            {umkm.category}
                          </p>
                        </div>
                        <button
                          onClick={() => removeFavorite(umkm.id)}
                          className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-brown-dark">
                              {umkm.rating}
                            </span>
                            <span className="text-brown-dark/60">
                              ({umkm.reviews})
                            </span>
                          </div>
                          <span className="text-brown-dark/40">•</span>
                          <div className="flex items-center gap-1 text-brown-dark/60">
                            <MapPin className="w-4 h-4" />
                            <span className="font-semibold">
                              {umkm.distance}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-brown-dark/50 font-semibold">
                          Ditambahkan {umkm.addedDate}
                        </p>
                      </div>

                      <Link
                        href={`/dashboard/customer/umkm/${umkm.id}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-brown-accent hover:text-brown-dark transition-colors"
                      >
                        Lihat Detail
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-base-light rounded-3xl border-2 border-brown-accent/20"
          >
            <div className="w-20 h-20 bg-brown-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-brown-accent" />
            </div>
            <h3 className="text-2xl font-black text-brown-dark mb-2">
              Belum Ada Favorit
            </h3>
            <p className="text-brown-dark/60 mb-6 px-4">
              {searchQuery || filterCategory !== "Semua"
                ? "Tidak ada hasil yang cocok dengan pencarian"
                : "Mulai tambahkan UMKM favorit kamu"}
            </p>
            {(searchQuery || filterCategory !== "Semua") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterCategory("Semua");
                }}
                className="px-6 py-3 bg-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Reset Pencarian
              </button>
            )}
            {!searchQuery && filterCategory === "Semua" && (
              <Link
                href="/dashboard/customer/explore"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Jelajahi UMKM
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

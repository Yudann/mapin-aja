// src/app/(dashboard)/dashboard/customer/explore/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Star,
  Heart,
  Grid3x3,
  Map,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Coffee,
  Utensils,
  Shirt,
  Wrench,
  Navigation,
} from "lucide-react";
import Link from "next/link";

// Dummy Data
const allUMKM = [
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
    isFavorite: true,
    priceRange: "Rp 15.000 - Rp 45.000",
    address: "Jl. Sudirman No. 123",
  },
  {
    id: "2",
    name: "Toko Kue Mama",
    category: "Makanan",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop",
    distance: "0.8 km",
    rating: 4.9,
    reviews: 89,
    isOpen: true,
    isFavorite: false,
    priceRange: "Rp 25.000 - Rp 150.000",
    address: "Jl. Thamrin No. 45",
  },
  {
    id: "3",
    name: "Warung Nasi Ibu Ida",
    category: "Makanan",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    distance: "1.2 km",
    rating: 4.7,
    reviews: 203,
    isOpen: true,
    isFavorite: false,
    priceRange: "Rp 10.000 - Rp 35.000",
    address: "Jl. Gatot Subroto No. 78",
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
    isFavorite: true,
    priceRange: "Rp 75.000 - Rp 500.000",
    address: "Jl. Kuningan No. 90",
  },
  {
    id: "5",
    name: "Bengkel Motor Jaya",
    category: "Jasa",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    distance: "2.1 km",
    rating: 4.5,
    reviews: 156,
    isOpen: true,
    isFavorite: false,
    priceRange: "Rp 50.000 - Rp 300.000",
    address: "Jl. Rasuna Said No. 12",
  },
  {
    id: "6",
    name: "Es Teh Manis Kangen",
    category: "Minuman",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
    distance: "2.5 km",
    rating: 4.3,
    reviews: 98,
    isOpen: true,
    isFavorite: false,
    priceRange: "Rp 5.000 - Rp 20.000",
    address: "Jl. Merdeka No. 56",
  },
];

const categories = [
  { name: "Semua", icon: Grid3x3, count: allUMKM.length },
  { name: "Makanan", icon: Utensils, count: 2 },
  { name: "Minuman", icon: Coffee, count: 2 },
  { name: "Fashion", icon: Shirt, count: 1 },
  { name: "Jasa", icon: Wrench, count: 1 },
];

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [favorites, setFavorites] = useState<string[]>(["1", "4"]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filteredUMKM = allUMKM
    .filter((umkm) => {
      const matchesCategory =
        selectedCategory === "Semua" || umkm.category === selectedCategory;
      const matchesSearch =
        umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        umkm.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "distance") {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-brown-dark via-brown-accent to-brown-dark rounded-3xl p-8 text-base-light relative overflow-hidden"
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
          <h1 className="text-3xl font-black mb-2">Jelajahi UMKM 🗺️</h1>
          <p className="text-base-light/90 text-lg mb-6">
            Temukan {allUMKM.length} UMKM terbaik di sekitar Anda
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-dark" />
            <input
              type="text"
              placeholder="Cari UMKM, produk, atau kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-base-light text-brown-dark rounded-2xl font-semibold placeholder-brown-dark/50 focus:ring-4 focus:ring-base-light/30 outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 bg-base-light rounded-2xl p-4 border-2 border-brown-accent/20 shadow-lg flex-wrap">
        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-brown-light/30 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              viewMode === "grid"
                ? "bg-brown-accent text-base-light shadow-md"
                : "text-brown-dark hover:bg-brown-light"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
            Grid
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
              viewMode === "map"
                ? "bg-brown-accent text-base-light shadow-md"
                : "text-brown-dark hover:bg-brown-light"
            }`}
          >
            <Map className="w-4 h-4" />
            Map
          </button>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl font-bold text-brown-dark outline-none cursor-pointer hover:border-brown-accent transition-colors"
          >
            <option value="distance">Terdekat</option>
            <option value="rating">Rating Tertinggi</option>
          </select>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold whitespace-nowrap transition-all border-2 ${
                selectedCategory === cat.name
                  ? "bg-brown-accent text-base-light border-brown-accent shadow-lg"
                  : "bg-base-light text-brown-dark border-brown-accent/20 hover:border-brown-accent"
              }`}
            >
              <Icon className="w-5 h-5" />
              {cat.name}
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedCategory === cat.name
                    ? "bg-base-light/20 text-base-light"
                    : "bg-brown-accent/10 text-brown-accent"
                }`}
              >
                {cat.count}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-brown-dark font-bold">
          Ditemukan {filteredUMKM.length} UMKM
        </p>
      </div>

      {/* UMKM Grid */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUMKM.map((umkm, index) => (
              <motion.div
                key={umkm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-base-light rounded-2xl border-2 border-brown-accent/20 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(umkm.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(umkm.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
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
                <div className="p-5">
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

                    <div className="flex items-center gap-1 text-sm text-brown-dark/60">
                      <Navigation className="w-4 h-4" />
                      <span className="font-semibold line-clamp-1">
                        {umkm.address}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-brown-accent">
                      {umkm.priceRange}
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
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg overflow-hidden"
            style={{ height: "600px" }}
          >
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-brown-light/30 to-brown-accent/10">
              <div className="text-center">
                <Map className="w-16 h-16 text-brown-accent mx-auto mb-4" />
                <h3 className="text-xl font-black text-brown-dark mb-2">
                  Map View
                </h3>
                <p className="text-brown-dark/60">
                  Fitur peta akan segera hadir
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredUMKM.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-base-light rounded-3xl border-2 border-brown-accent/20"
        >
          <div className="w-20 h-20 bg-brown-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-10 h-10 text-brown-accent" />
          </div>
          <h3 className="text-2xl font-black text-brown-dark mb-2">
            UMKM Tidak Ditemukan
          </h3>
          <p className="text-brown-dark/60 mb-6">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
          <button
            onClick={() => {
              setSelectedCategory("Semua");
              setSearchQuery("");
            }}
            className="px-6 py-3 bg-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg transition-all"
          >
            Reset Filter
          </button>
        </motion.div>
      )}
    </div>
  );
}

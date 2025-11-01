"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Star,
  Filter,
  X,
  Loader2,
  Phone,
  Store,
  Grid,
  Map as MapIcon,
  RefreshCw,
  Navigation,
  TrendingUp,
  ArrowRight,
  Heart,
} from "lucide-react";
import Link from "next/link";
import UmkmMap from "@/components/section/umkm/UmkmMap";

interface UMKM {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  rating?: number | null;
  email?: string | null;
}

const UmkmGridSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [umkms, setUmkms] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchUmkms();
  }, []);

  const fetchUmkms = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/umkm");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setUmkms(data);

        const uniqueCategories = Array.from(
          new Set(data.map((umkm: UMKM) => umkm.category).filter(Boolean))
        ) as string[];

        const uniqueLocations = Array.from(
          new Set(
            data
              .map((umkm: UMKM) => {
                if (!umkm.address) return null;
                const parts = umkm.address.split(",");
                return parts[parts.length - 1]?.trim() || umkm.address;
              })
              .filter(Boolean)
          )
        ) as string[];

        setCategories(uniqueCategories);
        setLocations(uniqueLocations);
      } else {
        setUmkms([]);
      }
    } catch (error) {
      console.error("Error fetching UMKM:", error);
      setUmkms([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUmkms = umkms.filter((umkm) => {
    const matchesSearch =
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (umkm.description?.toLowerCase().includes(searchQuery.toLowerCase()) ??
        false);

    const matchesCategory =
      categoryFilter === "all" || umkm.category === categoryFilter;

    const matchesLocation =
      locationFilter === "all" ||
      (umkm.address && umkm.address.includes(locationFilter));

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const sortedUmkms = [...filteredUmkms].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const resetFilters = () => {
    setCategoryFilter("all");
    setLocationFilter("all");
    setSearchQuery("");
    setSortBy("popular");
  };

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

  const handleMarkerClick = (umkm: UMKM) => {
    setSelectedUmkm(umkm);
  };

  return (
    <section className="py-16 sm:py-20 bg-linear-to-b from-base-light via-brown-light/20 to-base-light">
      <div className="container max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brown-accent/10 border-2 border-brown-accent/30 rounded-full mb-6">
            <Store className="w-4 h-4 text-brown-accent" />
            <span className="text-sm font-bold text-brown-accent tracking-wide">
              DIREKTORI LENGKAP
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-brown-dark mb-6 leading-tight">
            Eksplorasi UMKM
            <br />
            <span className="bg-linear-to-r from-brown-accent via-brown-dark to-brown-accent bg-clip-text text-transparent">
              Tanpa Batas
            </span>
          </h1>
          <p className="text-xl text-brown-dark/70 max-w-2xl mx-auto leading-relaxed">
            Temukan bisnis lokal terbaik di sekitar Anda dengan mudah
          </p>
        </div>

        {/* Stats Cards - More Compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-base-light/80 backdrop-blur border-2 border-brown-accent/20 rounded-2xl shadow-soft p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-linear-to-br from-brown-accent to-brown-dark rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <Store className="h-6 w-6 text-base-light" />
            </div>
            <div className="text-3xl font-black text-brown-dark mb-1">
              {umkms.length}
            </div>
            <p className="text-brown-dark/60 text-sm font-semibold">
              Total UMKM
            </p>
          </div>

          <div className="bg-base-light/80 backdrop-blur border-2 border-brown-accent/20 rounded-2xl shadow-soft p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <MapPin className="h-6 w-6 text-base-light" />
            </div>
            <div className="text-3xl font-black text-brown-dark mb-1">
              {locations.length}
            </div>
            <p className="text-brown-dark/60 text-sm font-semibold">Lokasi</p>
          </div>

          <div className="bg-base-light/80 backdrop-blur border-2 border-brown-accent/20 rounded-2xl shadow-soft p-5 text-center hover:shadow-lg hover:-translate-y-1 transition-all">
            <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-md">
              <TrendingUp className="h-6 w-6 text-base-light" />
            </div>
            <div className="text-3xl font-black text-brown-dark mb-1">
              {categories.length}
            </div>
            <p className="text-brown-dark/60 text-sm font-semibold">Kategori</p>
          </div>
        </div>

        {/* Sticky Filter Bar - More Compact */}
        <div className="sticky top-3 z-9999 mb-10">
          <div className="bg-base-light/80 backdrop-blur-sm border-b-2 border-brown-accent/20 rounded-2xl shadow-md p-4">
            {/* Mobile Filter Toggle */}
            <div className="flex items-center justify-between mb-3 md:hidden">
              <h2 className="text-base font-bold text-brown-dark">Filter</h2>
              <button
                onClick={() => setIsFilterVisible(!isFilterVisible)}
                className="p-2 bg-brown-accent/10 rounded-xl text-brown-accent hover:bg-brown-accent/20 transition-colors"
              >
                <Filter className="h-4 w-4" />
              </button>
            </div>

            {/* Filter Content */}
            <div className={`${isFilterVisible || "hidden md:block"}`}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                {/* Search Input - Compact */}
                <div className="md:col-span-5">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-accent/50 group-focus-within:text-brown-accent transition-colors" />
                    <input
                      placeholder="Cari UMKM..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 bg-brown-light/50 border border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-2 focus:ring-brown-accent/10 text-brown-dark transition-all text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Compact Selects */}
                <div className="md:col-span-3">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-brown-light/50 border border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none text-brown-dark cursor-pointer transition-all text-sm font-medium"
                  >
                    <option value="all">🏷️ Kategori</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <select
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="w-full px-3 py-2.5 bg-brown-light/50 border border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none text-brown-dark cursor-pointer transition-all text-sm font-medium"
                  >
                    <option value="all">📍 Lokasi</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2.5 bg-brown-light/50 border border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none text-brown-dark cursor-pointer transition-all text-sm font-medium"
                  >
                    <option value="popular">⭐ Populer</option>
                    <option value="newest">🆕 Terbaru</option>
                    <option value="name">🔤 A-Z</option>
                  </select>
                </div>
              </div>

              {/* Result Count + View Mode - Compact */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-brown-accent/10">
                <div className="text-xs text-brown-dark/70 font-semibold">
                  <span className="text-brown-accent font-black text-base">
                    {sortedUmkms.length}
                  </span>{" "}
                  hasil
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={resetFilters}
                    className="text-xs px-3 py-1.5 text-brown-dark/70 hover:text-brown-accent hover:bg-brown-accent/10 rounded-lg transition-all font-semibold flex items-center gap-1"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Reset
                  </button>

                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${
                        viewMode === "grid"
                          ? "bg-linear-to-r from-brown-dark to-brown-accent text-base-light"
                          : "bg-brown-light/50 text-brown-dark/80 hover:bg-brown-accent/10"
                      }`}
                    >
                      <Grid className="h-3 w-3" />
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode("map")}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all flex items-center gap-1 ${
                        viewMode === "map"
                          ? "bg-linear-to-r from-brown-dark to-brown-accent text-base-light"
                          : "bg-brown-light/50 text-brown-dark/80 hover:bg-brown-accent/10"
                      }`}
                    >
                      <MapIcon className="h-3 w-3" />
                      Peta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-brown-accent animate-spin mb-4" />
            <p className="text-brown-dark/70 font-semibold text-lg">
              Memuat data UMKM...
            </p>
          </div>
        )}

        {/* Premium Grid View */}
        {!loading && viewMode === "grid" && (
          <>
            {sortedUmkms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {sortedUmkms.map((umkm, index) => (
                  <div
                    key={umkm.id}
                    className="group relative bg-base-light rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                    style={{
                      animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`,
                    }}
                  >
                    {/* Image Section - 60% height with overlay */}
                    <div className="relative h-72 overflow-hidden">
                      {umkm.image_url ? (
                        <>
                          <img
                            src={umkm.image_url}
                            alt={umkm.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-linear-to-t from-brown-dark/90 via-brown-dark/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-brown-light to-brown-accent/10 flex items-center justify-center">
                          <Store className="h-20 w-20 text-brown-accent/30" />
                        </div>
                      )}

                      {/* Top Right Badge - Small & Transparent */}
                      <div className="absolute top-4 right-4 bg-base-light/80 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-black text-brown-dark">
                          {umkm.rating || "4.8"}
                        </span>
                      </div>

                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(umkm.id)}
                        className="absolute top-4 left-4 w-9 h-9 bg-base-light/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-base-light transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Heart
                          className={`h-4 w-4 transition-all ${
                            favorites.has(umkm.id)
                              ? "fill-red-500 text-red-500"
                              : "text-brown-dark/70"
                          }`}
                        />
                      </button>

                      {/* Category Badge - Bottom Left */}
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-base-light/90 backdrop-blur-sm text-brown-dark border border-brown-accent/20 shadow-md">
                          {umkm.category || "Kategori"}
                        </span>
                      </div>

                      {/* Floating CTA - Appears on Hover */}
                      <Link href={`/umkm/${umkm.id}`}>
                        <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                          <button className="w-full py-3 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2">
                            <span>Lihat Detail</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </Link>
                    </div>

                    {/* Content Section - 40% */}
                    <div className="p-5">
                      <h3 className="font-black text-xl mb-2 line-clamp-1 text-brown-dark group-hover:text-brown-accent transition-colors">
                        {umkm.name}
                      </h3>

                      <div className="flex items-start gap-2 text-sm text-brown-dark/70 mb-2">
                        <MapPin className="h-4 w-4 shrink-0 text-brown-accent mt-0.5" />
                        <span className="line-clamp-2 font-medium leading-snug">
                          {umkm.address || "Lokasi tidak tersedia"}
                        </span>
                      </div>

                      {umkm.phone && (
                        <div className="flex items-center gap-2 text-sm text-brown-dark/70 mb-3">
                          <Phone className="h-4 w-4 shrink-0 text-brown-accent" />
                          <span className="font-medium">{umkm.phone}</span>
                        </div>
                      )}

                      {umkm.description && (
                        <p className="text-sm text-brown-dark/60 line-clamp-2 leading-relaxed">
                          {umkm.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 bg-brown-light rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-brown-accent/50" />
                </div>
                <h3 className="text-2xl font-black text-brown-dark mb-3">
                  Tidak ada UMKM ditemukan
                </h3>
                <p className="text-brown-dark/70 mb-6 text-lg">
                  {umkms.length === 0
                    ? "Belum ada data UMKM yang tersedia."
                    : "Coba ubah filter pencarian Anda"}
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </>
        )}

        {/* Map View */}
        {!loading && viewMode === "map" && (
          <div className="bg-base-light/90 backdrop-blur border-2 border-brown-accent/30 rounded-3xl overflow-hidden shadow-lg">
            <div className="h-[600px]">
              <UmkmMap umkms={sortedUmkms} onMarkerClick={handleMarkerClick} />
            </div>

            <div className="p-6 bg-base-light/80 border-t-2 border-brown-accent/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-sm text-brown-dark/70 font-semibold">
                  <span className="font-black text-brown-accent text-lg">
                    {sortedUmkms.length}
                  </span>{" "}
                  UMKM di peta
                </div>
                <div className="flex items-center gap-4 text-sm text-brown-dark/70 font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-brown-accent rounded-sm"></div>
                    <span>UMKM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Lokasi Anda</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default UmkmGridSection;

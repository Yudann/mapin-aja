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
  Mail,
  Store,
  Grid,
  Map as MapIcon,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import UmkmMap from "@/components/section/umkm/UmkmMap";

// Sesuaikan interface dengan data dari API
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
  rating?: number | null; // Opsional karena tidak ada di data API
  email?: string | null; // Opsional karena tidak ada di data API
}

const UmkmGridSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [umkms, setUmkms] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);

  useEffect(() => {
    fetchUmkms();
  }, []);

  const fetchUmkms = async () => {
    try {
      setLoading(true);
      console.log("Fetching UMKM data...");

      const response = await fetch("/api/umkm");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);

      // Pastikan data adalah array
      if (Array.isArray(data)) {
        setUmkms(data);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map((umkm: UMKM) => umkm.category).filter(Boolean))
        ) as string[];

        // Extract unique locations (ambil bagian awal dari address untuk menyederhanakan)
        const uniqueLocations = Array.from(
          new Set(
            data
              .map((umkm: UMKM) => {
                if (!umkm.address) return null;
                // Ambil kota/kecamatan dari address (sederhana)
                const parts = umkm.address.split(",");
                return parts[parts.length - 1]?.trim() || umkm.address;
              })
              .filter(Boolean)
          )
        ) as string[];

        setCategories(uniqueCategories);
        setLocations(uniqueLocations);

        console.log("Categories:", uniqueCategories);
        console.log("Locations:", uniqueLocations);
      } else {
        console.error("Data is not an array:", data);
        setUmkms([]);
      }
    } catch (error) {
      console.error("Error fetching UMKM:", error);
      setUmkms([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter UMKM based on search and filters
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

  const resetFilters = () => {
    setCategoryFilter("all");
    setLocationFilter("all");
    setSearchQuery("");
  };

  const handleMarkerClick = (umkm: UMKM) => {
    setSelectedUmkm(umkm);
  };

  return (
    // Mengganti gray-50 dengan brown-light
    <section className="py-16 sm:py-24 bg-linear-to-b from-white to-brown-light/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          {/* Mengganti warna teks dengan brown-dark */}
          <h1 className="text-4xl md:text-5xl font-bold text-brown-dark mb-4">
            Jelajahi UMKM Lokal
          </h1>
          {/* Mengganti gray-600 dengan brown-dark/80 */}
          <p className="text-xl text-brown-dark/80 max-w-2xl mx-auto">
            Temukan bisnis lokal terbaik di sekitar Anda dan dukung perekonomian
            daerah
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Mengganti gray-200 dengan brown-accent/20 */}
          <div className="bg-white/80 backdrop-blur border-2 border-brown-accent/20 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            {/* Mengganti warna ikon dengan brown-accent */}
            <Store className="h-8 w-8 text-brown-accent mx-auto mb-2" />
            {/* Mengganti gray-900 dengan brown-dark */}
            <div className="text-3xl font-bold text-brown-dark">
              {umkms.length}
            </div>
            {/* Mengganti gray-600 dengan brown-dark/70 */}
            <p className="text-brown-dark/70 text-sm">Total UMKM</p>
          </div>
          {/* Stat 2: Lokasi (Dipertahankan warna Hijau untuk kontras) */}
          <div className="bg-white/80 backdrop-blur border-2 border-brown-accent/20 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <MapPin className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-brown-dark">
              {locations.length}
            </div>
            <p className="text-brown-dark/70 text-sm">Lokasi</p>
          </div>
          {/* Stat 3: Kategori (Dipertahankan warna Amber untuk kontras/ikonik) */}
          <div className="bg-white/80 backdrop-blur border-2 border-brown-accent/20 rounded-3xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
            <Star className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-brown-dark">
              {categories.length}
            </div>
            <p className="text-brown-dark/70 text-sm">Kategori</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur border-2 border-brown-accent/20 rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            {/* Mengganti gray-900 dengan brown-dark */}
            <h2 className="text-lg font-semibold text-brown-dark">
              Filter UMKM
            </h2>
            <button
              onClick={resetFilters}
              // Mengganti gray-600 dengan brown-dark/70, hover dengan brown-accent
              className="flex items-center gap-2 px-3 py-1 text-sm text-brown-dark/70 hover:text-brown-accent transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Filter
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brown-accent/50" />
                <input
                  placeholder="Cari nama UMKM atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // Mengganti gray-50, gray-200, gray-900 dengan brown-light, brown-accent/20, brown-dark
                  className="w-full pl-11 pr-4 py-3 bg-brown-light/50 border-2 border-brown-accent/20 rounded-2xl focus:border-brown-accent focus:outline-none text-brown-dark transition-colors"
                />
              </div>
            </div>

            {/* Category Select */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              // Mengganti gray-50, gray-200, gray-900 dengan brown-light, brown-accent/20, brown-dark
              className="px-4 py-3 bg-brown-light/50 border-2 border-brown-accent/20 rounded-2xl focus:border-brown-accent focus:outline-none text-brown-dark cursor-pointer transition-colors"
            >
              <option value="all">Semua Kategori</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Location Select */}
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              // Mengganti gray-50, gray-200, gray-900 dengan brown-light, brown-accent/20, brown-dark
              className="px-4 py-3 bg-brown-light/50 border-2 border-brown-accent/20 rounded-2xl focus:border-brown-accent focus:outline-none text-brown-dark cursor-pointer transition-colors"
            >
              <option value="all">Semua Lokasi</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-4">
            {/* Mengganti gray-600 dengan brown-dark/70, warna angka dengan brown-accent */}
            <div className="text-sm text-brown-dark/70">
              Menampilkan{" "}
              <span className="font-bold text-brown-accent">
                {filteredUmkms.length}
              </span>{" "}
              dari {umkms.length} UMKM
            </div>

            {/* View Mode Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center ${
                  viewMode === "grid"
                    ? "bg-linear-to-r from-brown-dark to-brown-accent text-white shadow-md"
                    : "bg-brown-light text-brown-dark/80 hover:bg-brown-accent/20"
                }`}
              >
                <Grid className="h-4 w-4 inline mr-2" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center ${
                  viewMode === "map"
                    ? "bg-linear-to-r from-brown-dark to-brown-accent text-white shadow-md"
                    : "bg-brown-light text-brown-dark/80 hover:bg-brown-accent/20"
                }`}
              >
                <MapIcon className="h-4 w-4 inline mr-2" />
                Peta
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            {/* Mengganti warna loader dengan brown-accent */}
            <Loader2 className="w-12 h-12 text-brown-accent animate-spin mb-4" />
            {/* Mengganti gray-600 dengan brown-dark/70 */}
            <p className="text-brown-dark/70 font-semibold">
              Memuat data UMKM...
            </p>
          </div>
        )}

        {/* Content - Grid View */}
        {!loading && viewMode === "grid" && (
          <>
            {filteredUmkms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUmkms.map((umkm, index) => (
                  <div
                    key={umkm.id}
                    // Mengganti gray-200 dengan brown-accent/20
                    className="group bg-white/80 backdrop-blur border-2 border-brown-accent/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    {/* Mengganti amber/orange dengan brown-light/brown-accent/10 */}
                    <div className="aspect-video overflow-hidden bg-linear-to-br from-brown-light to-brown-accent/10">
                      {umkm.image_url ? (
                        <img
                          src={umkm.image_url}
                          alt={umkm.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            // Fallback jika gambar error
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          {/* Mengganti warna fallback ikon dengan brown-accent/30 */}
                          <Store className="h-16 w-16 text-brown-accent/30" />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3
                        // Mengganti warna teks dengan brown-dark, hover dengan brown-accent
                        className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-brown-accent transition-colors text-brown-dark"
                      >
                        {umkm.name}
                      </h3>

                      {/* Mengganti gray-600 dengan brown-dark/70 */}
                      <div className="flex items-center gap-2 text-sm text-brown-dark/70 mb-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">
                          {umkm.address || "Lokasi tidak tersedia"}
                        </span>
                      </div>

                      {umkm.phone && (
                        // Mengganti gray-600 dengan brown-dark/70
                        <div className="flex items-center gap-2 text-sm text-brown-dark/70 mb-3">
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>{umkm.phone}</span>
                        </div>
                      )}

                      {umkm.description && (
                        // Mengganti gray-600 dengan brown-dark/70
                        <p className="text-sm text-brown-dark/70 mb-3 line-clamp-2">
                          {umkm.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between mb-4">
                        {/* Mengganti warna badge dengan brown-accent */}
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brown-accent/10 text-brown-accent border border-brown-accent/20">
                          {umkm.category || "Tidak ada kategori"}
                        </span>
                        <div className="flex items-center gap-1">
                          {/* Dipertahankan warna Kuning untuk rating */}
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-brown-dark">
                            {umkm.rating || "-"}
                          </span>
                        </div>
                      </div>

                      <Link href={`/umkm/${umkm.id}`}>
                        <button
                          // Mengganti warna tombol dengan gradient brown-dark ke brown-accent
                          className="w-full py-3 bg-linear-to-r from-brown-dark to-brown-accent text-white rounded-2xl font-semibbold opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:shadow-lg"
                        >
                          Lihat Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                {/* Mengganti gray-100 dengan brown-light, gray-400 dengan brown-accent/50 */}
                <div className="w-24 h-24 mx-auto mb-4 bg-brown-light rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-brown-accent/50" />
                </div>
                {/* Mengganti gray-900 dengan brown-dark */}
                <h3 className="text-xl font-bold text-brown-dark mb-2">
                  Tidak ada UMKM ditemukan
                </h3>
                {/* Mengganti gray-600 dengan brown-dark/70 */}
                <p className="text-brown-dark/70 mb-6">
                  {umkms.length === 0
                    ? "Belum ada data UMKM yang tersedia."
                    : "Coba ubah filter pencarian Anda atau reset filter untuk melihat semua UMKM"}
                </p>
                <button
                  onClick={resetFilters}
                  // Mengganti warna tombol dengan gradient brown-dark ke brown-accent
                  className="px-6 py-3 bg-linear-to-r from-brown-dark to-brown-accent text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                >
                  Reset Filter
                </button>
              </div>
            )}
          </>
        )}

        {/* Map View */}
        {!loading && viewMode === "map" && (
          // Mengganti gray-200 dengan brown-accent/20
          <div className="bg-white/80 backdrop-blur border-2 border-brown-accent/20 rounded-3xl overflow-hidden shadow-lg">
            <div className="h-[600px]">
              <UmkmMap
                umkms={filteredUmkms}
                onMarkerClick={handleMarkerClick}
              />
            </div>

            <div className="p-4 bg-white/80 border-t-2 border-brown-accent/20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Mengganti gray-600 dengan brown-dark/70, warna angka dengan brown-accent */}
                <div className="text-sm text-brown-dark/70">
                  <span className="font-bold text-brown-accent">
                    {filteredUmkms.length}
                  </span>{" "}
                  UMKM ditampilkan di peta
                </div>
                {/* Mengganti gray-500 dengan brown-dark/70 */}
                <div className="flex items-center gap-2 text-sm text-brown-dark/70">
                  <div className="flex items-center gap-1">
                    {/* Mengganti warna marker UMKM dengan brown-accent */}
                    <div className="w-3 h-3 bg-brown-accent rounded-sm"></div>
                    <span>UMKM</span>
                  </div>
                  {/* Dipertahankan warna Biru untuk Lokasi Anda */}
                  <div className="flex items-center gap-1">
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
            transform: translateY(20px);
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

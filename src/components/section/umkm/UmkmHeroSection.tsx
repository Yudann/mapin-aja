"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Store,
  Search,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  Building2,
} from "lucide-react";

const UmkmHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-brown-light overflow-hidden pt-20">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            // Mengganti warna grid pattern dengan brown-accent/30
            backgroundImage:
              "linear-gradient(rgba(185, 148, 112, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 148, 112, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Soft Gradient Orbs - Warm Natural Colors */}
      {/* Mengganti amber/orange dengan brown-accent dan brown-light */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-brown-accent/30 to-brown-light/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-brown-accent/30 to-brown-light/50 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-brown-light/70 to-brown-accent/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 bg-brown-accent/10 border border-brown-accent/30 rounded-full mb-6 transition-all duration-1000 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <Sparkles className="w-4 h-4 text-brown-accent" />
              <span className="text-sm font-semibold text-brown-accent">
                Discover Local Business
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6 transition-all duration-1000 delay-100 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Mengganti gray-900 dengan brown-dark */}
              <span className="text-brown-dark">Jelajahi</span>
              <br />
              {/* Mengganti gradient dengan brown-dark dan brown-accent */}
              <span className="bg-gradient-to-r from-brown-dark via-brown-accent to-brown-dark bg-clip-text text-transparent">
                UMKM Lokal
              </span>
              <br />
              <span className="text-brown-dark">Terpercaya</span>
            </h1>

            {/* Description */}
            <p
              className={`text-xl text-brown-dark/80 mb-8 leading-relaxed max-w-xl transition-all duration-1000 delay-200 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              Temukan ribuan UMKM pilihan yang siap melayani kebutuhan Anda.
              Dari kuliner hingga fashion, semua ada dalam satu platform.
            </p>

            {/* Stats Row */}
            <div
              className={`flex flex-wrap gap-6 mb-8 transition-all duration-1000 delay-300 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Stat 1: UMKM Aktif */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-brown-accent to-brown-dark rounded-xl flex items-center justify-center shadow-md">
                  <Store className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-brown-dark">
                    1000+
                  </div>
                  <div className="text-xs text-brown-dark/70">UMKM Aktif</div>
                </div>
              </div>

              {/* Stat 2: Pengguna (Dipertahankan warna Hijau untuk kontras positif) */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-brown-dark">10K+</div>
                  <div className="text-xs text-brown-dark/70">Pengguna</div>
                </div>
              </div>

              {/* Stat 3: Kategori (Dipertahankan warna Kuning/Orange untuk kontras/ikonik) */}
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-brown-dark">50+</div>
                  <div className="text-xs text-brown-dark/70">Kategori</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Primary CTA */}
              <button className="group px-8 py-4 bg-gradient-to-r from-brown-dark to-brown-accent text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-brown-accent/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                <Search className="w-5 h-5" />
                <span>Cari UMKM</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              {/* Secondary CTA */}
              <button className="px-8 py-4 bg-white text-brown-accent border-2 border-brown-accent/30 rounded-2xl font-semibold hover:bg-brown-light transition-all duration-300 flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Lihat Peta</span>
              </button>
            </div>
          </div>

          {/* Right Content - Interactive Cards */}
          <div
            className={`relative transition-all duration-1000 delay-500 transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            {/* Main Featured Card */}
            <div className="relative">
              {/* Mengganti gray-200 dengan brown-accent/20 */}
              <div className="bg-white/80 backdrop-blur-xl border-2 border-brown-accent/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                {/* Card Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      {/* Dipertahankan warna Hijau untuk status "Aktif" */}
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-semibold">
                        Featured UMKM
                      </span>
                    </div>
                    {/* Mengganti gray-900 dengan brown-dark */}
                    <h3 className="text-2xl font-bold text-brown-dark mb-1">
                      Warung Kopi Asik
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-brown-dark/70">
                      <MapPin className="w-4 h-4" />
                      <span>Tangerang Selatan</span>
                    </div>
                  </div>
                  {/* Dipertahankan warna Kuning untuk rating */}
                  <div className="flex items-center space-x-1 px-3 py-1 bg-yellow-100 rounded-full">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-brown-dark font-bold">4.9</span>
                  </div>
                </div>

                {/* Card Image */}
                {/* Mengganti gradient dengan brown-accent dan brown-dark/80 */}
                <div className="relative h-48 bg-gradient-to-br from-brown-accent to-brown-dark/80 rounded-2xl mb-6 overflow-hidden group">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">
                    ☕
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {/* Tag Kustom 1 */}
                  <span className="px-3 py-1 bg-brown-accent/10 text-brown-accent rounded-lg text-xs font-semibold border border-brown-accent/20">
                    Kuliner
                  </span>
                  {/* Tag Hijau */}
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold border border-green-200">
                    Kopi & Minuman
                  </span>
                  {/* Tag Amber */}
                  <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-semibold border border-amber-200">
                    Buka 24 Jam
                  </span>
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-gradient-to-r from-brown-dark to-brown-accent text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-brown-accent/50 transition-all duration-300 flex items-center justify-center space-x-2">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Floating Stats Cards */}
              {/* Dipertahankan warna Hijau dan Amber untuk kontras/data positif */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-4 shadow-xl border-2 border-white">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs text-green-100">Trending</div>
                    <div className="text-lg font-bold text-white">#1</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-4 shadow-xl border-2 border-white">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-white" />
                  <div>
                    <div className="text-xs text-amber-100">Pengunjung</div>
                    <div className="text-lg font-bold text-white">2.5K</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Category Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                {
                  name: "Kuliner",
                  icon: "🍜",
                  // Mengganti gradient dengan brown-accent
                  gradient: "from-brown-accent/80 to-brown-accent",
                },
                {
                  name: "Fashion",
                  icon: "👕",
                  // Mengganti gradient dengan warna kustom yang kontras (misal: tetap pink)
                  gradient: "from-pink-500 to-rose-500",
                },
                {
                  name: "Jasa",
                  icon: "🔧",
                  // Mengganti gradient dengan warna kustom yang kontras (misal: tetap biru)
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  name: "Kerajinan",
                  icon: "🎨",
                  // Mengganti gradient dengan warna kustom yang kontras (misal: tetap ungu)
                  gradient: "from-purple-500 to-violet-500",
                },
              ].map((cat, idx) => (
                <div
                  key={idx}
                  // Mengganti gray-200 dengan brown-accent/20
                  className="bg-white border-2 border-brown-accent/20 rounded-2xl p-4 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${cat.gradient} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                  </div>
                  {/* Mengganti gray-900 dengan brown-dark */}
                  <div className="text-sm font-semibold text-brown-dark">
                    {cat.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default UmkmHeroSection;

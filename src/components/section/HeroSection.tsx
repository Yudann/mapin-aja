"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Store,
  TrendingUp,
  MessageCircle,
  Users,
  Heart,
  Search,
  StoreIcon,
} from "lucide-react";
import Particles from "../layout/HeroBg";
import { Button } from "../ui/button";

// Gradient menggunakan variabel warna brown
const gradientPrimary =
  "linear-gradient(to bottom right, var(--color-brown-accent), var(--color-brown-dark))";
const gradientSecondary =
  "linear-gradient(to bottom right, var(--color-brown-accent), var(--color-brown-light))";
const gradientAccent =
  "linear-gradient(to bottom right, #A3B18A, var(--color-brown-accent))";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemTitle = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const itemContent = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-base-dark overflow-hidden pt-20">
      {/* Background Particles dengan warna earth tone */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={[
            "var(--color-brown-accent)",
            "#A3B18A",
            "var(--color-brown-dark)",
          ]}
          particleCount={150}
          particleSpread={8}
          speed={0.05}
          particleBaseSize={80}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      {/* Kontainer Utama Animasi */}
      <motion.div
        className="relative z-10 max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Main Hero Text */}
        <div className="mb-16 sm:mb-24">
          {/* Baris 1: Temukan Keunikan */}
          <motion.h1
            variants={itemTitle}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mb-4"
          >
            <span className="text-brown-light">Temukan</span>{" "}
            <span className="relative inline-block">
              <span className="text-brown-accent">UMKM</span>
              {/* Icon Heart - Diperbaiki positioning */}
              <div className="absolute top-4 sm:top-6 lg:top-10 xl:-top-12 -right-6 sm:-right-2 lg:-right-4 xl:-right-10 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden border-4 border-brown-light shadow-2xl transform rotate-12 z-20">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: gradientPrimary }}
                >
                  <StoreIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-white" />
                </div>
              </div>
            </span>
          </motion.h1>

          {/* Baris 2: Lokal di */}
          <motion.h1
            variants={itemTitle}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mb-4"
          >
            <span className="text-brown-accent">Lokal</span>{" "}
            <span className="relative inline-block">
              <span className="text-brown-light">di</span>
            </span>
          </motion.h1>

          {/* Baris 3: Sekitarmu. */}
          <motion.h1
            variants={itemTitle}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none"
          >
            <span className="text-brown-light">Sekitar</span>
            <span className="relative inline-block ml-4">
              <span className="text-brown-light">mu.</span>
              {/* Icon MapPin - Diperbaiki positioning */}
              <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full overflow-hidden border-4 border-brown-light shadow-2xl transform rotate-12 z-20">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: gradientAccent }}
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white" />
                </div>
              </div>
            </span>
          </motion.h1>
        </div>

        {/* Cards Section */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Left Card - UMKM Statistics */}
          <motion.div
            variants={itemContent}
            className="bg-base-light text-brown-dark  rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 border border-brown-light"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  <div
                    className="w-12 h-12 rounded-full border-4 border-base-light flex items-center justify-center text-base-light font-bold z-10 shadow-lg"
                    style={{ background: gradientPrimary }}
                  >
                    K
                  </div>
                  <div
                    className="w-12 h-12 rounded-full border-4 border-base-light flex items-center justify-center font-bold text-brown-dark z-20 shadow-lg"
                    style={{ background: gradientSecondary }}
                  >
                    T
                  </div>
                  <div
                    className="w-12 h-12 rounded-full border-4 border-base-light flex items-center justify-center text-base-light font-bold z-30 shadow-lg"
                    style={{ background: gradientAccent }}
                  >
                    R
                  </div>
                </div>
                <div className="text-2xl font-black text-brown-accent">
                  +500
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-brown-accent font-semibold mb-1">
                  UMKM Terdekat
                </div>
                <div className="flex items-center space-x-2 bg-brown-light px-3 py-2 rounded-xl border border-brown-light">
                  <div
                    className="w-6 h-6 rounded-lg"
                    style={{ background: gradientPrimary }}
                  ></div>
                  <span className="font-bold text-sm text-brown-dark">
                    kedai-kopi
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brown-light rounded-2xl p-4 border border-brown-light">
                <div className="text-xs text-brown-accent font-semibold mb-2">
                  UMKM Baru
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-3xl font-black text-brown-dark">+15</div>
                  <TrendingUp className="w-5 h-5 text-brown-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 bg-brown-light px-3 py-2 rounded-xl border border-brown-light">
                  <div className="w-6 h-6 bg-brown-accent rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-base-light" />
                  </div>
                  <span className="font-bold text-sm text-brown-dark">
                    chat-langsung
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-brown-light px-3 py-2 rounded-xl border border-brown-light">
                  <div className="w-6 h-6 bg-brown-accent rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-base-light" />
                  </div>
                  <span className="font-bold text-sm text-brown-dark">
                    komunitas
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-brown-light rounded-2xl p-4 border border-brown-light">
              <div className="text-xs text-brown-accent font-semibold mb-2">
                Rating Tertinggi
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-3xl font-black text-brown-dark">
                  ⭐ 4.9
                </div>
                <div className="text-sm text-brown-accent">(2.4K reviews)</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Text & Cards */}
          <div className="space-y-6">
            {/* Description Text & Button */}
            <motion.div variants={itemContent} className="relative z-10">
              <p className="text-xl sm:text-2xl lg:text-3xl text-brown-light leading-relaxed mb-8">
                Dari kedai kopi tersembunyi sampai produk handmade berkualitas —
                temukan cerita di balik setiap bisnis lokal di sekitarmu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="z-20 rounded-full text-base-light hover:scale-105 py-6 px-8 text-lg font-semibold transition-all duration-300 shadow-lg bg-brown-accent hover:bg-brown-dark">
                  <Search className="w-5 h-5 mr-2" />
                  <span>Jelajahi UMKM Sekitar</span>
                </Button>
                <Button
                  variant="outline"
                  className="z-20 rounded-full border-2 border-brown-light text-brown-light bg-transparent hover:bg-brown-accent hover:text-base-light py-6 px-8 text-lg font-semibold transition-all duration-300 shadow-lg"
                >
                  <Store className="w-5 h-5 mr-2" />
                  <span>Daftarkan Bisnismu</span>
                </Button>
              </div>
            </motion.div>

            {/* Bottom Cards Container */}
            <motion.div variants={container} className="space-y-4">
              {/* UMKM Highlight Card */}
              <motion.div
                variants={itemContent}
                className="bg-base-light text-brown-dark rounded-2xl p-6 shadow-xl relative z-10 border border-brown-light"
              >
                <div className="text-xs text-brown-accent font-semibold mb-3">
                  UMKM Terdekat • 150m
                </div>
                <div className="flex items-start space-x-3">
                  <div
                    className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center text-base-light font-bold shadow-lg"
                    style={{ background: gradientAccent }}
                  >
                    K
                  </div>
                  <div className="flex-1">
                    <div className="font-bold mb-1 text-lg">
                      Kedai Kopi Senja
                    </div>
                    <p className="text-sm text-brown-dark/80 mb-2">
                      Kopi lokal racikan spesial dengan suasana cozy
                    </p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-brown-accent rounded-full"></div>
                        <span>Buka • Tutup 22:00</span>
                      </span>
                      <span className="flex items-center space-x-1 text-brown-accent">
                        ⭐ 4.8 (124)
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Promo Card */}
              <motion.div
                variants={itemContent}
                className="bg-base-light text-brown-dark rounded-2xl p-6 shadow-xl relative z-10 border border-brown-light"
              >
                <div className="text-xs text-brown-accent font-semibold mb-3">
                  Promo Hari Ini
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-brown-light px-4 py-3 rounded-xl border border-brown-light">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brown-accent rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-base-light rounded-full"></div>
                      </div>
                      <span className="font-semibold">
                        Kopi Gratis Pembelian ke-5
                      </span>
                    </div>
                    <div className="w-6 h-6 bg-brown-accent rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-base-light rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between bg-brown-light px-4 py-3 rounded-xl border border-brown-light">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brown-accent rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-base-light rounded-full"></div>
                      </div>
                      <span className="font-semibold">
                        Diskon 20% Produk Handmade
                      </span>
                    </div>
                    <div className="w-6 h-6 bg-brown-accent rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-base-light rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-brown-dark/80 backdrop-blur-sm py-6 overflow-hidden z-10 ">
        <div className="flex space-x-12 animate-scroll whitespace-nowrap">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex space-x-12">
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                KEDAI KOPI LOKAL
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                PRODUK HANDMADE
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                KULINER TRADISIONAL
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                KERAJINAN TANGAN
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                UMKM KREATIF
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                BISNIS LOKAL
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                EKONOMI KREATIF
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                WIRAUSAHA
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                KOMUNITAS BISNIS
              </span>
              <span className="text-brown-light uppercase tracking-wider text-sm font-bold">
                PROMO TERDEKAT
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

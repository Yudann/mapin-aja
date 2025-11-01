"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  MessageCircle,
  BarChart3,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const SolutionSection = () => {
  const solutions = [
    {
      icon: MapPin,
      title: "Peta Interaktif UMKM",
      description:
        "Temukan ribuan bisnis lokal di sekitarmu dengan pencarian berbasis lokasi real-time",
      color: "from-[#8B5E3C] to-[#3E2C23]",
      stats: "15K+ UMKM",
      emoji: "🗺️",
    },
    {
      icon: MessageCircle,
      title: "Chat Langsung ke Penjual",
      description:
        "Tanya produk, nego harga, atau booking langsung tanpa ribet cari kontak",
      color: "from-[#3E2C23] to-[#8B5E3C]",
      stats: "24/7 Online",
      emoji: "💬",
    },
    {
      icon: BarChart3,
      title: "Dashboard Insight Bisnis",
      description:
        "Pantau performa toko, analisa pelanggan, dan tingkatkan penjualan dengan data real-time",
      color: "from-[#8B5E3C] to-[#A3B18A]",
      stats: "Live Analytics",
      emoji: "📊",
    },
    {
      icon: Zap,
      title: "Promosi Otomatis",
      description:
        "Jangkau pelanggan baru dengan sistem rekomendasi cerdas dan notifikasi otomatis",
      color: "from-[#A3B18A] to-[#8B5E3C]",
      stats: "Auto Promo",
      emoji: "⚡",
    },
  ];

  return (
    <motion.section
      className="relative py-24 sm:py-32 bg-linear-to-b from-white via-[#FAF3E0]/30 to-white overflow-hidden"
      variants={sectionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Decorative Circles */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-[600px] h-[600px] bg-[#DCC1A0]/10 rounded-full blur-3xl" />

        {/* Map Pin Pattern */}
        <div className="absolute top-40 right-20 opacity-5">
          <MapPin className="w-32 h-32 text-[#8B5E3C]" />
        </div>
        <div className="absolute bottom-40 left-20 opacity-5">
          <MessageCircle className="w-28 h-28 text-[#3E2C23]" />
        </div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={cardVariant} className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-linear-to-r from-[#8B5E3C]/10 to-[#3E2C23]/10 border border-[#8B5E3C]/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-sm font-bold text-[#3E2C23] uppercase tracking-wider">
              Solusi untuk Semua
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 leading-none mb-8">
            MapinAja Hadir
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] bg-clip-text text-transparent">
                Sebagai Solusi
              </span>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-4 bg-[#8B5E3C]/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Platform all-in-one yang menghubungkan pelanggan dan UMKM dengan
            teknologi yang mudah digunakan
          </p>
        </motion.div>

        {/* Solution Cards Grid - Asymmetric Layout */}
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`group relative rounded-3xl p-8 overflow-hidden shadow-xl border-2 border-gray-100 hover:border-[#8B5E3C]/30 transition-all duration-500 ${
                index === 0 || index === 3 ? "sm:translate-y-8" : ""
              }`}
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon & Emoji */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-linear-to-br ${solution.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <solution.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-5xl group-hover:scale-125 transition-transform duration-300">
                    {solution.emoji}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* Stats Badge */}
                <div className="inline-flex items-center space-x-2 bg-brown-light border border-[#DCC1A0] rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-[#8B5E3C] rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-[#3E2C23]">
                    {solution.stats}
                  </span>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-6 h-6 text-[#8B5E3C]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          variants={cardVariant}
          className="relative bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 text-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              Siap Membawa Bisnismu
              <br />
              ke Level Selanjutnya?
            </h3>
            <p className="text-lg sm:text-xl text-[#FAF3E0]/90 mb-8 max-w-2xl mx-auto">
              Gabung dengan 15,000+ UMKM yang sudah berkembang bersama MapinAja
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-white hover:bg-gray-100 text-[#3E2C23] font-bold text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Mulai Sekarang Gratis
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                Lihat Demo Platform
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="mt-8 flex items-center justify-center space-x-6 text-[#FAF3E0]/80 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Tanpa Biaya Bulanan</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Setup 5 Menit</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xs">✓</span>
                </div>
                <span>Support 24/7</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SolutionSection;

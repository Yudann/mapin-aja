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
import SectionWrapper, { SectionHeader } from "../layout/SectionWrapper";
import Link from "next/link";

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
      color: "from-brown-accent to-brown-dark",
      stats: "15K+ UMKM",
      emoji: "🗺️",
    },
    {
      icon: MessageCircle,
      title: "Chat Langsung ke Penjual",
      description:
        "Tanya produk, nego harga, atau booking langsung tanpa ribet cari kontak",
      color: "from-brown-dark to-brown-accent",
      stats: "24/7 Online",
      emoji: "💬",
    },
    {
      icon: BarChart3,
      title: "Dashboard Insight Bisnis",
      description:
        "Pantau performa toko, analisa pelanggan, dan tingkatkan penjualan dengan data real-time",
      color: "from-brown-accent to-brown-dark",
      stats: "Live Analytics",
      emoji: "📊",
    },
    {
      icon: Zap,
      title: "Promosi Otomatis",
      description:
        "Jangkau pelanggan baru dengan sistem rekomendasi cerdas dan notifikasi otomatis",
      color: "from-brown-dark to-brown-accent",
      stats: "Auto Promo",
      emoji: "⚡",
    },
  ];

  return (
    <SectionWrapper background="gradient">
      <SectionHeader
        badge={{ icon: Sparkles, text: "Solusi untuk Semua" }}
        title="MapinAja Hadir Sebagai Solusi"
        subtitle="Platform all-in-one yang menghubungkan pelanggan dan UMKM dengan teknologi yang mudah digunakan"
        highlightText="Sebagai Solusi"
      />

      {/* Solution Cards Grid - Regular Grid Layout */}
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-12"
      >
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            className="group relative rounded-2xl p-6 overflow-hidden shadow-lg hover:shadow-xl border border-gray-200 hover:border-brown-light/30 transition-all duration-300"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-linear-to-br ${solution.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
            />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon & Emoji */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${solution.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <solution.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {solution.emoji}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {solution.description}
              </p>

              {/* Stats Badge */}
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center space-x-2 bg-brown-light/10 border border-brown-light/20 rounded-full px-3 py-1.5">
                  <div className="w-2 h-2 bg-brown-accent rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-brown-dark">
                    {solution.stats}
                  </span>
                </div>

                {/* Hover Arrow */}
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowRight className="w-5 h-5 text-brown-accent" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={cardVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative bg-linear-to-r from-brown-accent to-brown-dark rounded-2xl p-8 lg:p-12 shadow-xl overflow-hidden"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 text-center">
          <h3 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
            Siap Membawa Bisnismu
            <br />
            ke Level Selanjutnya?
          </h3>
          <p className="text-base text-brown-light/90 mb-6 max-w-2xl mx-auto">
            Gabung dengan 15,000+ UMKM yang sudah berkembang bersama MapinAja
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="bg-white hover:bg-gray-100 text-brown-dark font-bold text-base px-6 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Mulai Sekarang Gratis
            </Button>
            <Link href="/umkm/map">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 bg-transparent hover:text-white text-white hover:bg-white/10 font-bold text-base px-6 py-4 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                Jelajahi Fitur
              </Button>
            </Link>
          </div>

          {/* Trust Indicator */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-brown-light/80 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-brown-light rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span>Tanpa Biaya Bulanan</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-brown-light rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span>Setup 5 Menit</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-brown-light rounded-full flex items-center justify-center">
                <span className="text-xs">✓</span>
              </div>
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default SolutionSection;

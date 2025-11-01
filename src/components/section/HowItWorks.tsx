"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  Store,
  MapPin,
  MessageCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const stepVariant = {
  hidden: { y: 50, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Daftar & Atur Profil",
      description:
        "Buat akun gratis dalam 2 menit. Pilih sebagai pelanggan atau pemilik UMKM.",
      icon: UserPlus,
      color: "from-[#8B5E3C] to-[#3E2C23]",
      tags: ["Gratis", "Tanpa Kartu Kredit", "2 Menit Setup"],
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#DCC1A0]">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-linear-to-br from-[#8B5E3C] to-[#3E2C23] rounded-2xl flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="h-3 bg-brown-light rounded-full w-full mb-2" />
                <div className="h-3 bg-brown-light rounded-full w-3/4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#8B5E3C]/10 border-2 border-[#8B5E3C] rounded-xl p-3 text-center">
                <Store className="w-6 h-6 text-[#8B5E3C] mx-auto mb-2" />
                <span className="text-xs font-bold text-[#3E2C23]">
                  Pemilik UMKM
                </span>
              </div>
              <div className="bg-brown-light border-2 border-[#DCC1A0] rounded-xl p-3 text-center">
                <Search className="w-6 h-6 text-[#8B5E3C] mx-auto mb-2" />
                <span className="text-xs font-bold text-[#3E2C23]">
                  Pelanggan
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Jelajahi atau Daftarkan UMKM",
      description:
        "Pelanggan: cari UMKM terdekat. Pemilik: daftarkan bisnis dan lengkapi profil toko.",
      icon: Search,
      color: "from-[#3E2C23] to-[#8B5E3C]",
      tags: ["Berbasis Lokasi", "Filter Kategori", "Review & Rating"],
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#DCC1A0]">
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="flex items-center space-x-2 bg-brown-light rounded-full px-4 py-3 border-2 border-[#DCC1A0]">
              <Search className="w-5 h-5 text-[#8B5E3C]" />
              <span className="text-sm text-gray-500">
                Cari UMKM terdekat...
              </span>
            </div>
            {/* Results */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center space-x-3 bg-brown-light rounded-xl p-3"
              >
                <div className="w-12 h-12 bg-linear-to-br from-[#8B5E3C] to-[#3E2C23] rounded-xl flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-2.5 bg-gray-300 rounded-full w-3/4 mb-2" />
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-[#8B5E3C]" />
                    <div className="h-2 bg-gray-300 rounded-full w-16" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Mulai Terhubung & Bertransaksi",
      description:
        "Chat langsung, lihat menu/produk, beri review, dan pantau analytics bisnis real-time.",
      icon: MessageCircle,
      color: "from-[#8B5E3C] to-[#A3B18A]",
      tags: ["Chat Real-time", "Analytics", "Auto Promo"],
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#DCC1A0]">
          <div className="space-y-3">
            {/* Chat Preview */}
            <div className="bg-brown-light rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className="w-5 h-5 text-[#8B5E3C]" />
                <span className="text-xs font-bold text-[#3E2C23]">
                  Chat Aktif
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto" />
              </div>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-2">
                  <div className="h-2 bg-gray-300 rounded-full w-3/4" />
                </div>
                <div className="bg-[#8B5E3C] rounded-lg p-2 ml-8">
                  <div className="h-2 bg-white/50 rounded-full w-2/3" />
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-linear-to-br from-[#8B5E3C] to-[#3E2C23] rounded-xl p-3 text-white">
                <TrendingUp className="w-5 h-5 mb-2" />
                <div className="text-lg font-black">+245</div>
                <div className="text-xs opacity-80">Pengunjung</div>
              </div>
              <div className="bg-brown-light border-2 border-[#DCC1A0] rounded-xl p-3">
                <Sparkles className="w-5 h-5 text-[#8B5E3C] mb-2" />
                <div className="text-lg font-black text-[#3E2C23]">4.9</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <motion.section
      className="relative py-24 sm:py-32 bg-linear-to-b from-white via-[#FAF3E0]/20 to-white overflow-hidden"
      variants={sectionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#8B5E3C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#DCC1A0]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={stepVariant} className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-[#8B5E3C]/10 border border-[#8B5E3C]/30 rounded-full px-6 py-3">
            <Sparkles className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-sm font-bold text-[#3E2C23] uppercase tracking-wider">
              Mudah & Cepat
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-none mb-6">
            Cara Kerja
            <br />
            <span className="bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] bg-clip-text text-transparent">
              MapinAja
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
            Hanya 3 langkah untuk mulai menemukan UMKM atau mengembangkan bisnis
            Anda
          </p>
        </motion.div>

        {/* Steps - Horizontal Flow */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="relative w-full h-full">
              <motion.div
                className="absolute top-0 left-[16.67%] right-[16.67%] h-full bg-linear-to-r from-[#DCC1A0] via-[#8B5E3C] to-[#DCC1A0] rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                viewport={{ once: true }}
              />
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariant}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-[#DCC1A0] hover:border-[#8B5E3C] transition-all duration-500 hover:shadow-2xl group">
                  {/* Number Badge */}
                  <div className="relative mb-6">
                    <div
                      className={`w-20 h-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
                    >
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-3 -left-3 text-7xl font-black text-[#FAF3E0] -z-0">
                      {step.number}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {step.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs font-bold text-[#8B5E3C] bg-brown-light px-3 py-1 rounded-full border border-[#DCC1A0]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Mockup */}
                  {step.mockup}
                </div>

                {/* Arrow - Desktop */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden lg:block absolute top-20 -right-4 z-20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <ArrowRight className="w-8 h-8 text-[#8B5E3C]" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div variants={stepVariant} className="text-center mt-20">
          <Button
            size="lg"
            className="bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] hover:from-[#8B5E3C]/90 hover:to-[#3E2C23]/90 text-white font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            Mulai Sekarang - Gratis!
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-sm text-gray-500 mt-4 font-semibold">
            Tanpa biaya tersembunyi • Setup dalam 2 menit • Tidak perlu kartu
            kredit
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;

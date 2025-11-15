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
import SectionWrapper, { SectionHeader } from "../layout/SectionWrapper";
import Link from "next/link";

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
      color: "from-brown-accent to-brown-dark",
      tags: ["Gratis", "Tanpa Kartu Kredit", "2 Menit Setup"],
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-brown-light">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-linear-to-br from-brown-accent to-brown-dark rounded-2xl flex items-center justify-center">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="h-3 bg-brown-light rounded-full w-full mb-2" />
                <div className="h-3 bg-brown-light rounded-full w-3/4" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-brown-light/10 border-2 border-brown-light rounded-xl p-3 text-center">
                <Store className="w-6 h-6 text-brown-light mx-auto mb-2" />
                <span className="text-xs font-bold text-brown-dark">
                  Pemilik UMKM
                </span>
              </div>
              <div className="bg-brown-light border-2 border-brown-light rounded-xl p-3 text-center">
                <Search className="w-6 h-6 text-brown-light mx-auto mb-2" />
                <span className="text-xs font-bold text-brown-dark">
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
      color: "from-brown-dark to-brown-accent",
      tags: ["Berbasis Lokasi", "Filter Kategori", "Review & Rating"],
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-brown-light">
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="flex items-center space-x-2 bg-brown-light rounded-full px-4 py-3 border-2 border-brown-light">
              <Search className="w-5 h-5 text-brown-light" />
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
                <div className="w-12 h-12 bg-linear-to-br from-brown-accent to-brown-dark rounded-xl flex items-center justify-center shrink-0">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="h-2.5 bg-gray-300 rounded-full w-3/4 mb-2" />
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3 h-3 text-brown-light" />
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
      color: "from-brown-accent to-brown-dark",
      tags: ["Chat Real-time", "Analytics", "Auto Promo"],
      mockup: (
        <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-brown-light">
          <div className="space-y-3">
            {/* Chat Preview */}
            <div className="bg-brown-light rounded-xl p-3">
              <div className="flex items-center space-x-2 mb-3">
                <MessageCircle className="w-5 h-5 text-brown-light" />
                <span className="text-xs font-bold text-brown-dark">
                  Chat Aktif
                </span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto" />
              </div>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-2">
                  <div className="h-2 bg-gray-300 rounded-full w-3/4" />
                </div>
                <div className="bg-brown-light rounded-lg p-2 ml-8">
                  <div className="h-2 bg-white/50 rounded-full w-2/3" />
                </div>
              </div>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-linear-to-br from-brown-accent to-brown-dark rounded-xl p-3 text-white">
                <TrendingUp className="w-5 h-5 mb-2" />
                <div className="text-lg font-black">+245</div>
                <div className="text-xs opacity-80">Pengunjung</div>
              </div>
              <div className="bg-brown-light border-2 border-brown-light rounded-xl p-3">
                <Sparkles className="w-5 h-5 text-brown-light mb-2" />
                <div className="text-lg font-black text-brown-dark">4.9</div>
                <div className="text-xs text-gray-600">Rating</div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper background="gradient">
      <SectionHeader
        badge={{ icon: Sparkles, text: "Mudah & Cepat" }}
        title="Cara Kerja MapinAja"
        subtitle="Hanya 3 langkah untuk mulai menemukan UMKM atau mengembangkan bisnis Anda"
        highlightText="MapinAja"
      />

      {/* Steps - Horizontal Flow */}
      <div className="relative">
        {/* Connecting Line - Desktop */}
        <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
          <div className="relative w-full h-full">
            <motion.div
              className="absolute top-0 left-[16.67%] right-[16.67%] h-full bg-linear-to-r from-brown-accent via-brown-accent to-brown-accent rounded-full"
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
            <motion.div key={index} variants={stepVariant} className="relative">
              {/* Step Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-brown-light hover:border-brown-light transition-all duration-500 hover:shadow-2xl group">
                {/* Number Badge */}
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <step.icon className="w-10 h-10 text-white" />
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
                      className="text-xs font-bold text-brown-dark bg-brown-light px-3 py-1 rounded-full border border-brown-light"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mockup */}
                {step.mockup}
              </div>

              {/* Arrow - Desktop */}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.div variants={stepVariant} className="text-center mt-20">
        <Link href="/auth">
          <Button
            size="lg"
            className="bg-linear-to-r from-brown-accent to-brown-dark hover:from-brown-accent/90 hover:to-brown-dark/90 text-white font-bold text-lg px-10 py-7 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            Mulai Sekarang - Gratis!
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <p className="text-sm text-gray-500 mt-4 font-semibold">
          Tanpa biaya tersembunyi • Setup dalam 2 menit • Tidak perlu kartu
          kredit
        </p>
      </motion.div>
    </SectionWrapper>
  );
};

export default HowItWorksSection;

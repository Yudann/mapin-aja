"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // **[1] Import Link dari next/link**
import {
  MapPin,
  MessageCircle,
  BarChart3,
  Users,
  Store,
  TrendingUp,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatInput from "@/app/(dashboard)/dashboard/seller/chat/components/ChatInput";
import SectionWrapper, { SectionHeader } from "../layout/SectionWrapper";

const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const mockupVariant = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const FeaturesSection = () => {
  const features = [
    {
      id: "peta-interaktif",
      tag: "Untuk Pelanggan",
      title: "Temukan UMKM Terdekat dalam Hitungan Detik",
      description:
        "Cari warung makan, fashion lokal, atau jasa terdekat dengan peta interaktif berbasis lokasi real-time. Filter berdasarkan kategori, rating, dan jarak.",
      icon: MapPin,
      color: "var(--color-brown-dark)",
      cta: "Jelajahi Peta UMKM",
      href: "/umkm/map", // **[2] Tambahkan href untuk fitur Peta**
      mockup: (
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-brown-accent/50">
          <div className="aspect-video bg-linear-to-br from-brown-accent/50 to-brown-accent rounded-2xl mb-4 relative overflow-hidden">
            {/* Map Mockup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Map Pins */}
                {[
                  { x: "25%", y: "30%", active: true },
                  { x: "60%", y: "45%", active: false },
                  { x: "40%", y: "70%", active: false },
                  { x: "75%", y: "25%", active: false },
                ].map((pin, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left: pin.x, top: pin.y }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${
                        pin.active ? "bg-brown-accent" : "bg-brown-dark/50"
                      } border-4 border-white shadow-lg flex items-center justify-center`}
                    >
                      <Store className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>
                ))}
                {/* Active Pin Info Card */}
                <div className="absolute left-1/4 top-1/3 mt-10 bg-white rounded-xl p-3 shadow-xl border-2 border-brown-light min-w-[180px]">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-10 h-10 bg-brown-light rounded-lg flex items-center justify-center">
                      <Store className="w-5 h-5 text-brown-accent" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">
                        Warung Bu Ani
                      </div>
                      <div className="text-xs text-gray-600 flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        0.3 km
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-brown-light fill-yellow-500" />
                      <span className="text-xs font-bold text-gray-900">
                        4.8
                      </span>
                    </div>
                    <span className="text-xs text-green-600 font-semibold">
                      ● Buka
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">
              15,247 UMKM Ditemukan
            </span>
            <Button
              size="sm"
              className="bg-brown-light hover:bg-brown-light/90 text-white rounded-full"
            >
              Lihat Semua
            </Button>
          </div>
        </div>
      ),
    },
    {
      id: "chat-langsung",
      tag: "Komunikasi Real-time",
      title: "Chat Langsung dengan Penjual, Tanpa Ribet",
      description:
        "Tanya stok, nego harga, atau booking produk langsung lewat chat. Semua percakapan tersimpan rapi dalam satu platform.",
      icon: MessageCircle,
      color: "#3E2C23",
      cta: "Coba Fitur Chat",
      href: "#",
      mockup: (
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-brown-light">
          <div className="space-y-3">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 pb-3 border-b border-gray-200">
              <div className="w-12 h-12 bg-linear-to-br from-brown-light to-brown-dark rounded-full flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-gray-900">Toko Kue Mama</div>
                <div className="text-xs text-green-600 flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full mr-1 animate-pulse" />
                  Online
                </div>
              </div>
            </div>
            {/* Chat Messages */}
            <div className="space-y-2">
              <div className="flex justify-start">
                <div className="bg-brown-light rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                  <p className="text-sm text-gray-900">
                    Halo! Kue ulang tahun ready untuk besok?
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-brown-accent rounded-2xl rounded-tr-sm px-4 py-2 max-w-[70%]">
                  <p className="text-sm text-white">
                    Ready kak! Mau ukuran berapa?
                  </p>
                </div>
              </div>
              <div className="flex justify-start">
                <div className="bg-brown-light rounded-2xl rounded-tl-sm px-4 py-2 max-w-[70%]">
                  <p className="text-sm text-gray-900">
                    Yang untuk 10 orang. Harganya berapa?
                  </p>
                </div>
              </div>
            </div>
            {/* Input */}
            <ChatInput
              onSendMessage={(message) => console.log("Sending:", message)}
            />
          </div>
        </div>
      ),
    },
    {
      id: "dashboard-insight",
      tag: "Untuk Pemilik UMKM",
      title: "Dashboard Analytics untuk Tingkatkan Penjualan",
      description:
        "Pantau performa toko real-time: jumlah pengunjung, produk terlaris, rating pelanggan, dan insight untuk tingkatkan bisnis.",
      icon: BarChart3,
      color: "#8B5E3C",
      cta: "Lihat Demo Dashboard",
      href: "#",
      mockup: (
        <div className="bg-white rounded-3xl p-6 shadow-2xl border-4 border-brown-light">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200">
              <h4 className="font-bold text-gray-900">Dashboard Analytics</h4>
              <span className="text-xs text-gray-600 bg-brown-light px-3 py-1 rounded-full">
                Live Data
              </span>
            </div>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-linear-to-br from-brown-accent to-brown-dark rounded-2xl p-4 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-5 h-5" />
                  <TrendingUp className="w-4 h-4 opacity-70" />
                </div>
                <div className="text-2xl font-black mb-1">1,245</div>
                <div className="text-xs opacity-80">Pengunjung Hari Ini</div>
              </div>
              <div className="bg-brown-light border-2 border-brown-light rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <Star className="w-5 h-5 text-brown-light" />
                  <span className="text-xs text-green-600 font-semibold">
                    +12%
                  </span>
                </div>
                <div className="text-2xl font-black text-gray-900 mb-1">
                  4.8
                </div>
                <div className="text-xs text-gray-600">Rating Rata-rata</div>
              </div>
            </div>
            {/* Chart Mockup */}
            <div className="bg-brown-light rounded-2xl p-4">
              <div className="text-xs text-gray-600 mb-3 font-semibold">
                Penjualan Minggu Ini
              </div>
              <div className="flex items-end justify-between h-24 space-x-2">
                {[40, 65, 55, 80, 70, 85, 90].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <motion.div
                      className="w-full bg-linear-to-t from-brown-light to-brown-dark rounded-t-lg"
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                    <span className="text-xs text-gray-600 mt-1">
                      {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <SectionWrapper>
      <SectionHeader
        badge={{ icon: BarChart3, text: "Fitur Unggulan" }}
        title="Platform Lengkap untuk UMKM Modern"
        highlightText="UMKM Modern"
      />

      {/* Features List */}
      <div className="space-y-32">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`grid lg:grid-cols-2 gap-12 items-center ${
              index % 2 === 1 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Text Content */}
            <motion.div
              variants={itemVariant}
              className={`${index % 2 === 1 ? "lg:order-2" : ""}`}
            >
              <div className="inline-flex  bg-brown-accent/20 border-brown-accent/50 items-center space-x-2  border  rounded-full px-4 py-2 mb-6">
                <feature.icon className="w-4 h-4 text-brown-accent" />
                <span className="text-sm font-bold text-gray-900">
                  {feature.tag}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6">
                {feature.title}
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {feature.description}
              </p>

              {/* **[3] Ganti Button dengan Link + Button asChild** */}
              <Button
                asChild // Ini adalah pola umum untuk menggunakan Button sebagai child dari Link
                size="lg"
                className="bg-brown-accent hover:bg-brown-accent/90 text-white font-bold text-base px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Link href={feature.href}>
                  {feature.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </motion.div>

            {/* Mockup */}
            <motion.div
              variants={mockupVariant}
              className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
            >
              {feature.mockup}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default FeaturesSection;

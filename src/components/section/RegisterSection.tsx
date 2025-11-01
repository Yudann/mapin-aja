"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Store,
  ArrowRight,
  Sparkles,
  Heart,
  Target,
  TrendingUp,
  Clock,
  Briefcase,
  MessageCircle,
  Zap,
  Hash,
} from "lucide-react";
// Pastikan komponen Badge Anda sudah diimport dengan benar
// import { Badge } from "@/components/ui/badge";
// Jika tidak ada Badge, ganti dengan div
const Badge = ({ children, className }) => (
  <div
    className={`inline-block rounded-full text-xs font-semibold ${className}`}
  >
    {children}
  </div>
);

interface RegisterSectionProps {
  className?: string;
}

// Definisikan Variabel Gradien Cokelat
const gradientPrimary =
  "linear-gradient(to right, var(--color-brown-accent), var(--color-brown-dark))";
const gradientLight =
  "linear-gradient(to right, var(--color-brown-light), var(--color-brown-accent))";

const RegisterSection: React.FC<RegisterSectionProps> = ({
  className = "",
}) => {
  const [selectedType, setSelectedType] = useState<"customer" | "seller">(
    "customer"
  );

  const handleGetStarted = () => {
    const params = new URLSearchParams({
      mode: "register",
      type: selectedType,
    });
    // Ganti dengan navigasi yang sebenarnya
    console.log(`Navigating to /auth?${params.toString()}`);
    // window.location.href = `/auth?${params.toString()}`;
  };

  // --- Copywriting Tetap ---
  const customerBenefits = [
    { icon: MapPin, text: "Temukan UMKM Autentik di Sekitar Anda" },
    { icon: Target, text: "Rekomendasi Produk Sesuai Minat & Lokasi" },
    { icon: Heart, text: "Dukung Komunitas dan Perekonomian Lokal" },
    { icon: MessageCircle, text: "Berbagi Ulasan dan Cerita Positif" },
  ];

  const sellerBenefits = [
    { icon: Briefcase, text: "Jangkau Ribuan Pelanggan Baru Setiap Hari" },
    {
      icon: TrendingUp,
      text: "Dashboard Analitik Perkembangan Bisnis Real-time",
    },
    { icon: Zap, text: "Otomatisasi Komunikasi & Workflow Pelanggan" },
    { icon: Users, text: "Bangun Komunitas Loyal di Platform Terpusat" },
  ];

  const stats = [
    { number: "15K+", label: "UMKM Lokal Terdaftar" },
    { number: "75K+", label: "Pelanggan Aktif Bulanan" },
    { number: "4.8/5", label: "Rating Kepuasan Pengguna" },
  ];

  // Element Dekoratif dari referensi (kartu dengan angka dan hash)
  const DecorativeStatCard: React.FC<{
    icon: React.FC<any>;
    number: string;
    label: string;
    color: string;
    className?: string;
  }> = ({ icon: Icon, number, label, color, className = "" }) => (
    <div
      className={`flex items-center p-4 rounded-xl shadow-lg bg-white/80 border border-white/50 ${className}`}
    >
      <div className={`p-2 rounded-full mr-3 ${color} text-white`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-xl font-bold text-gray-900">{number}</div>
        <div className="text-xs text-gray-600">{label}</div>
      </div>
    </div>
  );

  // --- New Layout Structure ---
  return (
    <section
      id="register"
      // Mengganti pink/rose gradient menjadi cokelat terang/krem
      className={`relative min-h-screen flex items-center justify-center bg-brown-light/50 overflow-hidden ${className}`}
    >
      {/* Background Elements (Retained and styled with Brown/Accent) */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          // Mengganti pink-200 menjadi brown-accent/50
          className="absolute top-20 left-10 w-8 h-8 bg-brown-accent/50 rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          // Mengganti rose-200 menjadi brown-light/70
          className="absolute top-40 right-20 w-6 h-6 bg-brown-light/70 rounded-full opacity-40"
        />
        <motion.div
          animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          // Mengganti pink-300 menjadi brown-dark/20
          className="absolute bottom-32 left-20 w-12 h-12 bg-brown-dark/20 rounded-lg opacity-20"
        />
        {/* Decorative Hash Elements */}
        {/* Mengganti pink-500/rose-500 menjadi brown-dark/accent */}
        <Hash className="absolute top-1/4 right-5 opacity-10 w-24 h-24 text-brown-accent transform rotate-12" />
        <Hash className="absolute bottom-10 left-1/4 opacity-10 w-16 h-16 text-brown-dark transform -rotate-45" />

        {/* Grid Pattern (Warna Grid Disesuaikan) */}
        {/* Mengganti rgba(0,0,0,0.03) menjadi warna cokelat sangat muda */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(121,85,72,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(121,85,72,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          {/* Mengganti pink-200, pink-500 menjadi brown-light, brown-accent */}
          <Badge className="mb-4 bg-white/80 backdrop-blur-sm text-gray-700 border-brown-light hover:bg-white/90 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2 text-brown-accent" />
            Platform #1 untuk Pertumbuhan UMKM Lokal
          </Badge>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-6">
            <span className="block">
              Saatnya{" "}
              {/* Mengganti pink-500 to rose-500 gradient menjadi brown-accent to brown-dark */}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: gradientPrimary }}
              >
                Tumbuh & Terhubung
              </span>{" "}
              Lebih Jauh
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            MapinAja bukan hanya direktori. Kami adalah ekosistem terpadu yang
            memberdayakan UMKM untuk meningkatkan penjualan dan mempermudah
            pelanggan menemukan produk terbaik di dekat mereka.
          </p>
        </motion.div>

        {/* Main Card Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl border border-brown-light">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Content - Registration Options & Benefits */}
            <div className="space-y-10">
              {/* User Type Selection */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-3xl font-bold text-gray-900 border-b pb-3 border-brown-light">
                  Pilih Peran Anda
                </h3>
                <div className="flex space-x-4">
                  {[
                    { id: "customer", label: "Pelanggan", icon: Users },
                    { id: "seller", label: "Pemilik UMKM", icon: Briefcase },
                  ].map((type) => (
                    <motion.button
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setSelectedType(type.id as "customer" | "seller")
                      }
                      className={`flex-1 flex items-center justify-center space-x-2 p-5 rounded-2xl border-2 transition-all duration-300 ${
                        // Mengganti pink-500, pink-50, pink-700, pink-300 menjadi brown-dark, brown-light/50, brown-dark, brown-accent
                        selectedType === type.id
                          ? "border-brown-dark bg-brown-light/50 text-brown-dark shadow-xl"
                          : "border-gray-200 bg-white text-gray-600 hover:border-brown-accent"
                      }`}
                    >
                      <type.icon className="w-6 h-6" />
                      <span className="font-bold text-lg">{type.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Benefits List */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-5"
              >
                <h4 className="text-xl font-bold text-gray-900">
                  Manfaat Utama{" "}
                  {selectedType === "customer"
                    ? "untuk Pelanggan"
                    : "untuk Bisnis Anda"}
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  {(selectedType === "customer"
                    ? customerBenefits
                    : sellerBenefits
                  ).map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.15 }}
                      // Mengganti pink-100 menjadi brown-light
                      className="flex items-start space-x-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm border border-brown-light shadow-md h-full"
                    >
                      <div
                        className="shrink-0 mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center"
                        // Menggunakan gradien cokelat untuk background icon
                        style={{ backgroundImage: gradientPrimary }}
                      >
                        <benefit.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium leading-relaxed">
                        {benefit.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4"
              >
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    // Mengganti pink shadow menjadi cokelat shadow
                    boxShadow: "0 20px 40px rgba(121, 85, 72, 0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGetStarted}
                  // Mengganti pink/rose gradient menjadi brown-dark/accent gradient
                  className="w-full group relative text-white font-black text-xl py-6 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  style={{ backgroundImage: gradientPrimary }}
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative flex items-center justify-center space-x-3">
                    <span>Gabung MapinAja Sekarang!</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
                <p className="text-center text-gray-500 text-sm mt-3 font-semibold">
                  Gratis Daftar • Tanpa Kartu Kredit • Siap dalam Hitungan Menit
                </p>
              </motion.div>
            </div>

            {/* Right Content - Visual Showcase & Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative lg:mt-16"
            >
              {/* Stats Cards */}
              <div className="absolute -top-16 lg:top-0 right-0 space-y-4 z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <Hash className="absolute -top-2 -right-2 text-gray-900/10 w-10 h-10 z-0" />
                  <DecorativeStatCard
                    icon={Users}
                    number={stats[0].number}
                    label={stats[0].label}
                    // Mengganti warna ungu menjadi brown-dark
                    color="bg-brown-dark"
                    className="transform rotate-3"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="relative lg:ml-20"
                >
                  <Hash className="absolute -bottom-2 -left-2 text-gray-900/10 w-10 h-10 z-0" />
                  <DecorativeStatCard
                    icon={TrendingUp}
                    number={stats[1].number}
                    label={stats[1].label}
                    // Mengganti warna hijau menjadi brown-accent
                    color="bg-brown-accent"
                    className="transform -rotate-1"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="relative lg:ml-10"
                >
                  <Hash className="absolute top-0 right-0 text-gray-900/10 w-10 h-10 z-0" />
                  <DecorativeStatCard
                    icon={Heart}
                    number={stats[2].number}
                    label={stats[2].label}
                    // Mengganti warna rose menjadi cokelat sedang
                    color="bg-brown-dark/70"
                    className="transform rotate-2"
                  />
                </motion.div>
              </div>

              {/* Main Visual Placeholder (Simulating the MapinAja Dashboard Preview) */}
              <div
                // Mengganti pink/rose gradient menjadi brown-light/accent gradient
                className="relative rounded-[2rem] p-10 border-4 border-white/50 shadow-2xl overflow-hidden mt-60 lg:mt-0"
                style={{ backgroundImage: gradientLight }}
              >
                <div className="text-center p-16 rounded-xl bg-white/80 border-2 border-brown-accent/50 border-dashed">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-brown-accent" />
                  <h4 className="text-2xl font-bold text-gray-800">
                    Visualisasi Dashboard Anda
                  </h4>
                  <p className="text-gray-600">
                    Statistik penjualan, interaksi pelanggan, dan data lokasi.
                    *Seperti yang terlihat pada referensi Anda!*
                  </p>
                </div>

                {/* Community Avatars */}
                <div className="flex justify-center -space-x-3 mt-8">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.05 + 0.8 }}
                      className="w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm"
                      // Mengganti orange-400/pink-500 gradient menjadi brown-accent/dark
                      style={{ backgroundImage: gradientPrimary }}
                    >
                      {["😊", "🎉", "🌟", "💼", "🚀", "❤️"][i]}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;

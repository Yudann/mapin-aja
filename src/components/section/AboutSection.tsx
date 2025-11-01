"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Store,
  MapPin,
  TrendingUp,
  Users,
  Check,
  Send,
  Clock,
} from "lucide-react";

// Definisikan Variabel Gradien (menggunakan variabel CSS dari globals.css)
// Ini adalah gradien cokelat gelap ke sedang/aksen
const gradientPrimary =
  "linear-gradient(to bottom right, var(--color-brown-accent), var(--color-brown-dark))";
// Ini adalah gradien cokelat terang ke sedang/aksen
const gradientLight =
  "linear-gradient(to bottom right, var(--color-brown-light), var(--color-brown-accent))";

// --- VARIAN FRAMER MOTION ---

// Varian untuk seluruh section/blok (digunakan pada grid container)
const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Varian untuk elemen teks (slide dan fade dari samping KIRI)
const textVariant = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// Varian untuk kartu (slide dan fade dari samping KANAN)
const cardVariant = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

// Varian untuk kartu kecil/konten di tengah (fade-in dan scale up)
const itemContent = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Varian untuk kartu utama di tengah (muncul dari bawah)
const cardCenterVariant = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const FeaturesSection = () => {
  // Komponen untuk membungkus section dengan animasi scroll
  const AnimatedSection = ({ children, className }) => (
    <motion.section
      className={className}
      variants={sectionContainer}
      initial="hidden"
      // whileInView akan memicu animasi saat section terlihat di viewport
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
    </motion.section>
  );

  return (
    <div>
      {/* Feature 1: Chat & Communication */}
      {/* BACKGROUND: Hitam -> Putih */}
      <AnimatedSection className="py-16 sm:py-24 bg-white text-brown-dark relative overflow-hidden">
        {/* Decorative circles (Mengganti warna border: white -> brown-accent, opacity diperkuat) */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-brown-accent rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 border-4 border-brown-accent rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div variants={textVariant}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
                {/* Teks: brown-light, white -> brown-dark */}
                <span className="text-brown-accent">Terhubung</span> dengan{" "}
                <span className="text-brown-accent">pelanggan</span>{" "}
                <span className="relative inline-block">
                  <span className="text-brown-accent">Anda</span>
                  <div
                    className="absolute -top-3 -right-3 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: gradientPrimary }}
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                </span>{" "}
                <span className="text-brown-accent">sambil kami yang</span>{" "}
                <span className="relative inline-block">
                  <span className="text-brown-accent">sibuk</span>
                  <div
                    className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: gradientPrimary }}
                  >
                    <Store className="w-6 h-6 text-white" />
                  </div>
                </span>{" "}
                <span className="text-brown-accent">di belakang layar.</span>
              </h2>
            </motion.div>

            {/* Right: Feature Cards */}
            <motion.div variants={cardVariant} className="space-y-6">
              {/* Card 1: Chat Feature */}
              <motion.div
                variants={cardCenterVariant}
                className="bg-brown-light/50 text-gray-900 rounded-3xl p-8 shadow-xl border border-brown-light"
              >
                <h3 className="text-2xl font-bold mb-4">
                  Chat real-time dengan pembeli.
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Mulai diskusi langsung dengan pelanggan Anda melalui chat,
                  email, atau platform favorit mereka—baik terjadwal maupun
                  real-time.
                </p>
                <button className="flex items-center space-x-2 font-bold text-brown-dark hover:text-brown-accent transition group">
                  <span>Pelajari Lebih Lanjut</span>
                  <span className="text-2xl group-hover:translate-x-1 transition-transform">
                    👀
                  </span>
                </button>
              </motion.div>

              {/* Card 2: Mini Chat Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mini Card Kiri - MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="bg-white rounded-3xl p-6 shadow-lg border-4 border-brown-light"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                      alt="User"
                      className="w-16 h-16 rounded-2xl"
                    />
                    <div>
                      <div className="font-bold text-gray-900">Ibu Sarah</div>
                      <div className="text-xs text-gray-500">
                        Warung Nasi Padang
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    45,580 members
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-brown-accent rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-brown-dark rounded-full border-2 border-white"></div>
                      <div className="w-8 h-8 bg-brown-light rounded-full border-2 border-white"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Mini Card Kanan - MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="bg-white rounded-3xl p-6 shadow-lg space-y-3"
                >
                  {/* Item 1: DM */}
                  <div className="bg-brown-light/50 rounded-2xl p-4 border-2 border-brown-light">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brown-dark rounded-xl flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            C
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-brown-dark">
                          DM @ibu_sarah
                        </span>
                      </div>
                      <Check className="w-5 h-5 text-brown-accent" />
                    </div>
                  </div>

                  {/* Item 2: Group */}
                  <div className="bg-brown-accent/30 rounded-2xl p-4 border-2 border-brown-accent/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brown-accent rounded-xl flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-brown-dark">
                          #orders-group
                        </span>
                      </div>
                      <Check className="w-5 h-5 text-brown-accent" />
                    </div>
                  </div>

                  <div className="flex items-center justify-around pt-2">
                    <Clock className="w-6 h-6 text-gray-400" />
                    <Send className="w-6 h-6 text-gray-400" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Feature 2: Auto Settlement & Analytics */}
      {/* BACKGROUND: Putih */}
      <AnimatedSection className="py-16 sm:py-24 bg-white text-gray-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Visual Cards */}
            <motion.div variants={textVariant} className="space-y-6">
              {/* Community Card - MENGGUNAKAN cardCenterVariant */}
              <motion.div
                variants={cardCenterVariant}
                className="bg-white rounded-3xl p-6 border-4 border-brown-light shadow-xl"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mifta"
                    alt="Community"
                    className="w-16 h-16 rounded-2xl"
                  />
                  <div>
                    <div className="font-bold text-gray-900">
                      Warung Makan Mifta
                    </div>
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>Tangerang Selatan</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Item 1: Menu Tersedia */}
                  <div className="flex items-center justify-between bg-brown-light/50 p-3 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-brown-accent rounded-lg flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-brown-dark">
                        Menu Tersedia
                      </span>
                    </div>
                    <Check className="w-5 h-5 text-brown-accent" />
                  </div>

                  {/* Item 2: Chat Aktif */}
                  <div className="flex items-center justify-between bg-brown-light/50 p-3 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-brown-dark rounded-lg flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-brown-dark">
                        Chat Aktif
                      </span>
                    </div>
                    <Check className="w-5 h-5 text-brown-accent" />
                  </div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {/* MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="bg-white rounded-3xl p-6 shadow-xl border-2 border-gray-100"
                >
                  <div className="text-sm text-gray-500 mb-2">
                    Pelanggan Baru
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-4xl font-black">550</div>
                    <TrendingUp className="w-6 h-6 text-brown-accent" />
                  </div>
                  <div className="flex -space-x-2 mt-3">
                    <div className="w-8 h-8 bg-brown-accent rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-brown-dark rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-brown-light rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-black rounded-full border-2 border-white"></div>
                  </div>
                </motion.div>

                {/* MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="rounded-3xl p-6 shadow-xl text-white"
                  style={{ background: gradientPrimary }}
                >
                  <div className="text-sm mb-2 opacity-90">Pesan Baru</div>
                  <div className="text-4xl font-black mb-3">+8,173</div>
                  <div className="flex items-center space-x-2 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm">
                    <div className="w-6 h-6 bg-white/30 rounded-lg"></div>
                    <span className="text-xs font-semibold">Live Updates</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Text Content */}
            <motion.div variants={cardVariant}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-brown-dark">
                Biarkan kami yang mengatur semuanya.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Otomatis tambahkan member ke komunitas UMKM atau berikan mereka
                akses ke konten, menu, dan promo—tanpa perlu repot.
              </p>
              <button className="flex items-center space-x-2 font-bold text-brown-dark hover:text-brown-accent transition group">
                <span>Pelajari Lebih Lanjut</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">
                  👀
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Feature 3: Analytics & Insights */}
      {/* BACKGROUND: Krem muda (brown-light/50) -> Putih */}
      <AnimatedSection className="py-16 sm:py-24 bg-linear-to-b from-white to-brown-light text-gray-900 relative overflow-hidden">
        {/* Decorative dots at top (Warna tetap brown-dark) */}
        <div className="absolute top-0 left-0 right-0 flex justify-center space-x-3 pt-8">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-brown-dark rounded-full"></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div variants={textVariant}>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 text-brown-dark">
                Intip statistik bisnis Anda.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Lihat insight dari aktivitas komunitas, menu online, dan
                interaksi pelanggan untuk benar-benar memahami cara
                mendapatkan—dan mempertahankan—pelanggan tetap engaged.
              </p>
              <button className="flex items-center space-x-2 font-bold text-brown-dark hover:text-brown-accent transition group">
                <span>Pelajari Lebih Lanjut</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">
                  👀
                </span>
              </button>
            </motion.div>

            {/* Right: Analytics Cards with flowing line */}
            <motion.div variants={cardVariant} className="relative">
              {/* Flowing Line SVG */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 400 600"
              >
                <motion.path
                  d="M 50 100 Q 200 150 180 250 T 100 400 Q 150 500 300 450"
                  stroke="var(--color-brown-dark)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  // Animasi Garis (Draw/Stroke)
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true, amount: 0.5 }}
                />
              </svg>

              {/* Stats Cards positioned along the line */}
              <div className="space-y-6 relative z-10">
                {/* Card 1 - MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-brown-light max-w-sm ml-auto"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500 font-semibold">
                      Member Baru
                    </span>
                    <div className="w-10 h-10 bg-brown-dark rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">#</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 bg-brown-accent rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">New members</div>
                      <div className="text-2xl font-black">+291</div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-brown-light max-w-xs"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-10 h-10 bg-brown-accent rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">t</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">
                        Pendaftaran baru
                      </div>
                      <div className="text-2xl font-black">305</div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="text-sm text-gray-500 mb-1">On track</div>
                    <div className="text-2xl font-black">1.2K</div>
                  </div>
                </motion.div>

                {/* Card 3 - MENGGUNAKAN itemContent */}
                <motion.div
                  variants={itemContent}
                  className="bg-white rounded-3xl p-6 shadow-xl border-4 border-brown-light max-w-sm ml-auto"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-24 h-24 rounded-full overflow-hidden"
                      style={{ background: gradientLight }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <Store className="w-12 h-12 text-brown-dark" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-500 mb-1">
                        Pesan Baru
                      </div>
                      <div className="text-2xl font-black">+8,173</div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-20 -right-8 w-12 h-12 bg-brown-dark rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">#</span>
                </div>
                <div className="absolute bottom-20 -left-8 w-12 h-12 bg-brown-dark rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">#</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default FeaturesSection;

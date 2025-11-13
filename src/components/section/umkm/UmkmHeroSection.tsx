"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Store,
  Sparkles,
  TrendingUp,
  Users,
  Coffee,
  Shirt,
  Wrench,
  Palette,
  ChevronRight,
} from "lucide-react";

const UmkmHeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    {
      id: "all",
      name: "Semua",
      icon: Sparkles,
      color: "from-brown-accent to-brown-dark",
    },
    {
      id: "food",
      name: "Kuliner",
      icon: Coffee,
      color: "from-amber-500 to-orange-600",
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: Shirt,
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "service",
      name: "Jasa",
      icon: Wrench,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "craft",
      name: "Kerajinan",
      icon: Palette,
      color: "from-purple-500 to-violet-600",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] bg-linear-to-br from-brown-light via-base-light to-brown-light overflow-hidden pt-32 pb-16">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(185, 148, 112, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 148, 112, 0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Soft Gradient Orbs */}
      <div className="absolute top-20 -left-20 w-96 h-96 bg-brown-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brown-accent/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brown-accent/10 border-2 border-brown-accent/30 rounded-full">
                <Sparkles className="w-4 h-4 text-brown-accent" />
                <span className="text-sm font-bold text-brown-accent tracking-wide">
                  DIREKTORI UMKM LOKAL
                </span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h1 className="text-6xl sm:text-7xl  font-black leading-[0.95] mb-6">
                <span className="text-brown-dark">Jelajahi</span>
                <br />
                <span className="bg-linear-to-r from-brown-accent via-brown-dark to-brown-accent bg-clip-text text-transparent">
                  UMKM
                </span>
                <br />
                <span className="text-brown-dark">di Sekitarmu</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-brown-dark/80 leading-relaxed max-w-xl"
            >
              Temukan usaha kuliner, fashion, dan layanan lokal dengan mudah
              berdasarkan lokasi & kategori. Dukung ekonomi lokal bersama
              MapinAja!
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-brown-accent to-brown-dark rounded-2xl flex items-center justify-center shadow-lg">
                  <Store className="w-6 h-6 text-base-light" />
                </div>
                <div>
                  <div className="text-3xl font-black text-brown-dark">
                    1000+
                  </div>
                  <div className="text-sm text-brown-dark/70 font-semibold">
                    UMKM Aktif
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-green-600 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-base-light" />
                </div>
                <div>
                  <div className="text-3xl font-black text-brown-dark">
                    10K+
                  </div>
                  <div className="text-sm text-brown-dark/70 font-semibold">
                    Pengguna
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-base-light" />
                </div>
                <div>
                  <div className="text-3xl font-black text-brown-dark">50+</div>
                  <div className="text-sm text-brown-dark/70 font-semibold">
                    Kategori
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="space-y-4">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all ${
                        isSelected
                          ? "bg-linear-to-r " +
                            cat.color +
                            " text-base-light shadow-lg scale-105"
                          : "bg-base-light border-2 border-brown-accent/30 text-brown-dark hover:border-brown-accent hover:scale-105"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <button className="group flex items-center gap-3 px-8 py-5 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-brown-accent/40 transition-all transform hover:scale-105">
                <span>Temukan Sekarang</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Interactive Map Preview */}
          <motion.div
            variants={itemVariants}
            className="relative hidden lg:block"
          >
            {/* Main Card */}
            <div className="relative bg-base-light/90 backdrop-blur-xl border-3 border-brown-accent/30 rounded-3xl p-8 shadow-2xl">
              {/* Mockup Peta dengan Pins */}
              <div className="relative h-[400px] bg-linear-to-br from-brown-light to-brown-accent/10 rounded-2xl overflow-hidden mb-6 group">
                {/* Grid Pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(185, 148, 112, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 148, 112, 0.5) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Animated Pins */}
                {[
                  { top: "20%", left: "30%", delay: 0 },
                  { top: "50%", left: "60%", delay: 0.2 },
                  { top: "70%", left: "25%", delay: 0.4 },
                  { top: "40%", left: "80%", delay: 0.6 },
                ].map((pin, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: pin.delay + 1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="absolute"
                    style={{ top: pin.top, left: pin.left }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: pin.delay,
                      }}
                      className="relative"
                    >
                      {/* Pin Icon */}
                      <div className="w-10 h-10 bg-linear-to-br from-brown-accent to-brown-dark rounded-full border-3 border-base-light shadow-xl flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-base-light" />
                      </div>
                      {/* Pulse Effect */}
                      <div className="absolute inset-0 bg-brown-accent/40 rounded-full animate-ping" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Info Bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="absolute bottom-6 left-6 bg-base-light/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-brown-accent/30 max-w-[240px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-2xl">
                      ☕
                    </div>
                    <div>
                      <p className="font-bold text-brown-dark">Warung Bu Ani</p>
                      <p className="text-xs text-brown-dark/70 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        1.2 km dari Anda
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Terdekat", value: "12", icon: MapPin },
                  { label: "Populer", value: "24", icon: TrendingUp },
                  { label: "Baru", value: "8", icon: Sparkles },
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="text-center p-4 bg-brown-light rounded-xl border-2 border-brown-accent/20"
                    >
                      <Icon className="w-5 h-5 text-brown-accent mx-auto mb-2" />
                      <div className="text-2xl font-black text-brown-dark">
                        {stat.value}
                      </div>
                      <div className="text-xs text-brown-dark/70 font-semibold">
                        {stat.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute -top-4 -right-4 bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-2xl border-3 border-base-light"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-base-light rounded-full animate-pulse" />
                <span className="text-base-light font-bold text-sm">
                  Live Tracking
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default UmkmHeroSection;

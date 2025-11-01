"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  TrendingDown,
  AlertCircle,
  Eye,
  Clock,
  DollarSign,
  MapPinOff,
  Users,
} from "lucide-react";

const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { y: 40, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const ProblemSection = () => {
  const problems = [
    {
      icon: MapPinOff,
      title: "Sulit Ditemukan Pelanggan",
      color: "bg-[#8B5E3C]",
      stat: "70%",
      statLabel: "UMKM tidak muncul di pencarian lokal",
    },
    {
      icon: DollarSign,
      title: "Promosi Tidak Efektif",
      color: "bg-brown-dark",
      stat: "65%",
      statLabel: "budget iklan terbuang sia-sia",
    },
    {
      icon: TrendingDown,
      title: "Jangkauan Terbatas",
      color: "bg-[#8B5E3C]",
      stat: "80%",
      statLabel: "hanya dikenal di lingkungan sendiri",
    },
    {
      icon: Eye,
      title: "Kurang Data Pelanggan",
      color: "bg-brown-dark",
      stat: "55%",
      statLabel: "tidak tahu preferensi pelanggan",
    },
  ];

  return (
    <motion.section
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
      variants={sectionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Floating Decorative Circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#8B5E3C]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#DCC1A0]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={cardVariant} className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-[#8B5E3C]/10 border border-[#8B5E3C]/30 rounded-full px-6 py-3">
            <AlertCircle className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-sm font-bold text-[#3E2C23] uppercase tracking-wider">
              Masalah yang Sering Dihadapi
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Kenapa UMKM{" "}
            <span className="relative inline-block">
              <span className="text-[#8B5E3C]">Sulit Berkembang?</span>
              <div className="absolute -bottom-2 left-0 right-0 h-3 bg-[#8B5E3C]/20 -z-10" />
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Banyak pelaku UMKM punya produk berkualitas, tapi kesulitan
            menjangkau pelanggan baru
          </p>
        </motion.div>

        {/* Problem Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#8B5E3C]/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Background Gradient on Hover */}
              <div className="absolute inset-0 bg-linear-to-br from-[#8B5E3C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 ${problem.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <problem.icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {problem.title}
                </h3>

                {/* Stat */}
                <div className="bg-brown-light rounded-xl p-4 border border-[#DCC1A0]/30">
                  <div className="text-3xl font-black text-[#8B5E3C] mb-1">
                    {problem.stat}
                  </div>
                  <div className="text-xs text-gray-600 font-semibold leading-tight">
                    {problem.statLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Separator with CTA */}
        <motion.div variants={cardVariant} className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-12 bg-linear-to-b from-[#8B5E3C]/50 to-transparent" />

          {/* CTA Card */}
          <div className="max-w-3xl mx-auto bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Untungnya, Sekarang Ada Solusinya
              </h3>
              <p className="text-lg text-[#FAF3E0]/80 mb-6 max-w-2xl mx-auto">
                MapinAja hadir membantu UMKM berkembang dengan teknologi yang
                mudah dan terjangkau
              </p>
              <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/30 rounded-full px-6 py-3 backdrop-blur-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-sm font-bold text-white">
                  Scroll ke bawah untuk lihat solusinya
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProblemSection;

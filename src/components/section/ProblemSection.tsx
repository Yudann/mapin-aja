"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  TrendingDown,
  AlertCircle,
  Eye,
  DollarSign,
  MapPinOff,
} from "lucide-react";
import SectionWrapper, { SectionHeader } from "../layout/SectionWrapper";

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
      color: "bg-brown-accent",
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
      color: "bg-brown-accent",
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
    <SectionWrapper>
      <SectionHeader
        badge={{ icon: AlertCircle, text: "Masalah yang Sering Dihadapi" }}
        title="Kenapa UMKM Sulit Berkembang?"
        subtitle="Banyak pelaku UMKM punya produk berkualitas, tapi kesulitan menjangkau pelanggan baru"
        highlightText="Sulit Berkembang?"
      />
      {/* Problem Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {problems.map((problem, index) => (
          <motion.div
            key={index}
            variants={cardVariant}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:border-brown-accent/30 hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Background Gradient on Hover */}
            <div className="absolute inset-0 bg-linear-to-br from-brown-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
              <div className="bg-brown-light rounded-xl p-4 border border-brown-light/30">
                <div className="text-3xl font-black text-brown-accent mb-1">
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
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-12 bg-linear-to-b from-brown-accent/50 to-transparent" />

        {/* CTA Card */}
        <div className="max-w-3xl mx-auto bg-linear-to-r from-brown-accent to-brown-dark rounded-3xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Untungnya, Sekarang Ada Solusinya
            </h3>
            <p className="text-lg text-brown-light]/80 mb-6 max-w-2xl mx-auto">
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
    </SectionWrapper>
  );
};

export default ProblemSection;

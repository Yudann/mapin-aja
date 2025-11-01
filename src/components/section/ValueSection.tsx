"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  Heart,
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  Award,
  CheckCircle2,
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
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const ValueSection = () => {
  const mainValues = [
    {
      icon: Shield,
      title: "Terpercaya & Aman",
      description:
        "Verifikasi UMKM resmi dan sistem review transparan untuk pengalaman belanja yang aman",
      color: "from-[#8B5E3C] to-[#3E2C23]",
      stat: "15K+",
      statLabel: "UMKM Terverifikasi",
    },
    {
      icon: Zap,
      title: "Teknologi Modern",
      description:
        "Platform berbasis AI untuk rekomendasi personal dan pencarian lokasi real-time",
      color: "from-[#3E2C23] to-[#8B5E3C]",
      stat: "99.9%",
      statLabel: "Uptime Guarantee",
    },
    {
      icon: Heart,
      title: "Komunitas Lokal",
      description:
        "Dukung ekonomi lokal dan bangun hubungan langsung dengan pemilik bisnis",
      color: "from-[#8B5E3C] to-[#A3B18A]",
      stat: "75K+",
      statLabel: "Pengguna Aktif",
    },
  ];

  const benefits = [
    { icon: TrendingUp, text: "Tingkatkan penjualan hingga 3x lipat" },
    { icon: Users, text: "Jangkau ribuan pelanggan baru" },
    { icon: DollarSign, text: "Tanpa biaya bulanan tersembunyi" },
    { icon: Clock, text: "Support 24/7 dari tim kami" },
    { icon: Award, text: "Dashboard analytics lengkap" },
    { icon: CheckCircle2, text: "Free trial tanpa kartu kredit" },
  ];

  const stats = [
    { number: "15K+", label: "UMKM Terdaftar", icon: Shield },
    { number: "75K+", label: "Pengguna Aktif", icon: Users },
    { number: "3x", label: "Peningkatan Penjualan", icon: TrendingUp },
    { number: "4.8/5", label: "Rating Platform", icon: Award },
  ];

  return (
    <motion.section
      className="relative py-24 sm:py-32 bg-linear-to-b from-white via-[#FAF3E0] to-white overflow-hidden"
      variants={sectionContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Blurred Circles */}
        <div className="absolute top-20 -right-32 w-[600px] h-[600px] bg-[#8B5E3C]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-32 w-96 h-96 bg-[#DCC1A0]/10 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,94,60,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,94,60,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Decorative Icons */}
        <div className="absolute top-40 left-20 opacity-5">
          <Heart className="w-24 h-24 text-[#8B5E3C]" />
        </div>
        <div className="absolute bottom-40 right-20 opacity-5">
          <Shield className="w-28 h-28 text-[#3E2C23]" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={cardVariant} className="text-center mb-20">
          <div className="inline-flex items-center justify-center space-x-2 mb-6 bg-[#8B5E3C]/10 border border-[#8B5E3C]/30 rounded-full px-6 py-3">
            <Award className="w-5 h-5 text-[#8B5E3C]" />
            <span className="text-sm font-bold text-[#3E2C23] uppercase tracking-wider">
              Kenapa MapinAja?
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-none mb-8">
            Lebih dari Sekedar
            <br />
            <span className="relative inline-block mt-2">
              <span className="bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] bg-clip-text text-transparent">
                Direktori UMKM
              </span>
              <motion.div
                className="absolute -bottom-3 left-0 right-0 h-4 bg-[#8B5E3C]/20"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kami adalah ekosistem lengkap yang memberdayakan UMKM lokal untuk
            tumbuh dan berkembang
          </p>
        </motion.div>

        {/* Main Value Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {mainValues.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative bg-white rounded-3xl p-8 shadow-xl border-2 border-[#DCC1A0] hover:border-[#8B5E3C] transition-all duration-500"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-linear-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-4 leading-tight">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  {value.description}
                </p>

                {/* Stat */}
                <div className="bg-brown-light border border-[#DCC1A0] rounded-2xl p-4">
                  <div className="text-3xl font-black text-[#8B5E3C] mb-1">
                    {value.stat}
                  </div>
                  <div className="text-sm text-gray-600 font-semibold">
                    {value.statLabel}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Grid */}
        <motion.div variants={cardVariant} className="mb-20">
          <div className="bg-linear-to-r from-[#3E2C23] to-[#8B5E3C] rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
                  Keuntungan Bergabung dengan MapinAja
                </h3>
                <p className="text-lg text-[#FAF3E0]/80 max-w-2xl mx-auto">
                  Semua fitur yang Anda butuhkan untuk mengembangkan bisnis UMKM
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariant}
                    className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold leading-relaxed">
                      {benefit.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div variants={cardVariant}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#DCC1A0] text-center group hover:border-[#8B5E3C] transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#8B5E3C]/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#8B5E3C] transition-colors duration-300">
                  <stat.icon className="w-6 h-6 text-[#8B5E3C] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-4xl font-black text-[#8B5E3C] mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final Message */}
        <motion.div
          variants={cardVariant}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-relaxed">
            MapinAja bukan hanya platform —{" "}
            <span className="bg-linear-to-r from-[#8B5E3C] to-[#3E2C23] bg-clip-text text-transparent">
              kami adalah partner pertumbuhan bisnis Anda
            </span>
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ValueSection;

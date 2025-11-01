"use client";

import React, { useState } from "react"; // useState untuk selectedRole tetap ada
import { motion } from "framer-motion"; // Import motion
import { Users, BarChart3, Send, Clock, Zap } from "lucide-react";

// Definisikan Variabel Gradien
const gradientPrimary =
  "linear-gradient(to bottom right, var(--color-brown-accent), var(--color-brown-dark))";
const gradientLight =
  "linear-gradient(to bottom right, var(--color-brown-light), var(--color-brown-accent))";

// --- VARIAN FRAMER MOTION ---

// Varian untuk seluruh section/blok (digunakan pada grid container)
const sectionContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Stagger untuk elemen di dalam container
    },
  },
};

// Varian untuk judul dan paragraf (slide dari bawah)
const headerVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

// Varian untuk setiap langkah/card (fade in dan scale up sedikit)
const stepCardVariant = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// Varian untuk elemen visual di dalam kartu (muncul setelah kartu)
const visualItemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  },
};

const HowItWorksSection = () => {
  // Menghapus isVisible dan sectionRef karena Framer Motion akan mengelolanya
  // selectedRole masih relevan jika Anda ingin menambahkan fungsionalitas toggle
  const [selectedRole, setSelectedRole] = useState<"customer" | "seller">(
    "customer"
  );

  // Komponen untuk membungkus section dengan animasi scroll
  const AnimatedSection = ({ children, className }) => (
    <motion.section
      className={className}
      variants={sectionContainer}
      initial="hidden"
      // whileInView akan memicu animasi saat section terlihat di viewport
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }} // Animasi hanya sekali, ketika 20% terlihat
    >
      {children}
    </motion.section>
  );

  const steps = [
    {
      number: "1",
      title: "Hubungkan platform Anda",
      description:
        "Connect your social, community, marketing, and online course platforms.",
      visual: (
        // MENGGUNAKAN motion.div untuk visual agar ada animasi
        <motion.div
          variants={visualItemVariant}
          className="bg-linear-to-b from-white to-brown-light rounded-3xl p-6 shadow-lg border-4 border-brown-dark"
        >
          <div className="space-y-3">
            {/* Google Maps */}
            {/* Mengganti green-50, green-200, green-500 menjadi brown-light/50, brown-light, brown-accent */}
            <div className="flex items-center justify-between bg-brown-light/50 p-3 rounded-xl border-2 border-brown-light">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brown-accent rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">t</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Google Maps
                </span>
              </div>
              <div className="w-6 h-6 bg-brown-dark rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* WhatsApp */}
            {/* Mengganti gray-50, blue-500 menjadi brown-light/20, brown-dark */}
            <div className="flex items-center justify-between bg-brown-light/20 p-3 rounded-xl">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brown-dark rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">C</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  WhatsApp
                </span>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>{" "}
              {/* Tetap abu-abu terang untuk yang belum aktif */}
            </div>

            {/* Instagram */}
            {/* Mengganti purple-50, purple-200, purple-600 menjadi brown-light/50, brown-light, brown-accent */}
            <div className="flex items-center justify-between bg-brown-light/50 p-3 rounded-xl border-2 border-brown-light">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brown-accent rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
                <span className="text-sm font-semibold text-gray-900">
                  Instagram
                </span>
              </div>
              <div className="w-6 h-6 bg-brown-dark rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Zapier-like connection */}
            {/* Mengganti blue-400, blue-500 menjadi brown-accent, brown-dark */}
            <div className="flex items-center justify-between bg-brown-light/20 p-3 rounded-xl">
              <div className="w-8 h-8 bg-brown-accent rounded-lg"></div>
              <div className="flex-1 mx-3">
                <div className="h-3 bg-gray-200 rounded"></div>
              </div>
              <div className="w-6 h-6 bg-brown-dark rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Button */}
            {/* Mengganti gray-900 menjadi brown-dark */}
            <button className="w-full bg-brown-dark text-white py-3 rounded-xl font-bold text-sm hover:bg-brown-accent transition">
              CONNECT
            </button>
          </div>
        </motion.div>
      ),
    },
    {
      number: "2",
      title: "Pahami perjalanan pelanggan",
      description:
        "Understand the full range of your members' journeys, engagement, and activities.",
      visual: (
        // MENGGUNAKAN motion.div untuk visual agar ada animasi
        <motion.div
          variants={visualItemVariant}
          className="bg-white rounded-3xl p-6 shadow-lg border-4 border-brown-dark"
        >
          <div className="mb-4">
            <div className="text-sm font-semibold text-gray-600 mb-3">
              Most Active
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex -space-x-2">
                {/* Mengganti gradien avatar menjadi cokelat */}
                <div
                  className="w-12 h-12 rounded-full border-2 border-white"
                  style={{ background: gradientPrimary }}
                ></div>
                <div
                  className="w-12 h-12 rounded-full border-2 border-white"
                  style={{ background: gradientLight }}
                ></div>
                <div className="w-12 h-12 bg-brown-accent rounded-full border-2 border-white"></div>
              </div>
              <div className="text-3xl font-black text-gray-900">500</div>
            </div>

            {/* Donut Chart */}
            <div className="relative w-40 h-40 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--color-brown-light)" // Mengganti #FFE4E4
                  strokeWidth="20"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--color-brown-accent)" // Mengganti #FFB4B4
                  strokeWidth="20"
                  strokeDasharray="125 251.2"
                  strokeDashoffset="0"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="var(--color-brown-dark)" // Mengganti #B4E4B4
                  strokeWidth="20"
                  strokeDasharray="80 251.2"
                  strokeDashoffset="-125"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Mengganti bg-orange-100 menjadi bg-brown-light */}
                <div className="w-20 h-20 bg-brown-light rounded-full"></div>
              </div>
              {/* Dotted line */}
              <svg className="absolute inset-0" viewBox="0 0 100 100">
                <path
                  d="M 50 10 Q 80 30 70 60"
                  fill="none"
                  stroke="var(--color-brown-dark)" // Mengganti #000
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <circle cx="70" cy="60" r="2" fill="var(--color-brown-dark)" />{" "}
                {/* Mengganti #000 */}
              </svg>
            </div>

            <div className="text-sm font-semibold text-gray-600">
              Messages Sent
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      number: "3",
      title: "Buat workflow otomatis",
      description:
        "Create workflows, schedule messages, and track the success of your community-building strategies.",
      visual: (
        // MENGGUNAKAN motion.div untuk visual agar ada animasi
        <motion.div
          variants={visualItemVariant}
          className="bg-white rounded-3xl p-6 shadow-lg border-4 border-brown-dark"
        >
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                {/* Mengganti green-400 menjadi brown-accent */}
                <div className="w-6 h-6 bg-brown-accent rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-brown-dark rounded-full"></div>{" "}
                  {/* Inner dot tetap gelap */}
                </div>
                <span>Send Welcome Email</span>
              </div>
              <div className="flex items-center space-x-2 mb-3">
                {/* Mengganti blue-500, gray-900, purple-600 menjadi brown-dark, brown-accent */}
                <div className="w-10 h-10 bg-brown-dark rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">M</span>
                </div>
                <div className="w-10 h-10 bg-brown-light/70 rounded-full flex items-center justify-center">
                  <span className="text-brown-dark text-xs font-bold">-</span>
                </div>
                <div className="w-10 h-10 bg-brown-accent rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">+</span>
                </div>
              </div>

              {/* Simple Analytics Chart */}
              <div className="flex items-end space-x-1 h-16 mb-3">
                {/* Mengganti pink-200, pink-300, pink-400 menjadi brown-light, brown-accent, brown-dark */}
                <div
                  className="flex-1 bg-brown-light rounded-t"
                  style={{ height: "40%" }}
                ></div>
                <div
                  className="flex-1 bg-brown-accent/50 rounded-t"
                  style={{ height: "60%" }}
                ></div>
                <div
                  className="flex-1 bg-brown-accent rounded-t"
                  style={{ height: "80%" }}
                ></div>
                <div
                  className="flex-1 bg-brown-dark/70 rounded-t"
                  style={{ height: "50%" }}
                ></div>
              </div>
            </div>

            {/* Scheduled/Sent messages */}
            {/* Mengganti gray-50, gray-900 menjadi brown-light/20, brown-dark */}
            <div className="flex items-center justify-between bg-brown-light/20 p-3 rounded-xl">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">
                  481 Scheduled
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-brown-dark rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-brown-accent rounded-full flex items-center justify-center">
                  <Send className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ),
    },
  ];

  return (
    <AnimatedSection className="py-16 sm:py-24 bg-brown-light/50 relative overflow-hidden text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Menggunakan motion.div untuk header */}
        <motion.div variants={headerVariant} className="mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-4">
            <span className="text-brown-dark">Begini cara</span>
          </h2>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 flex items-center flex-wrap">
            {/* Mengganti green-300 menjadi brown-accent */}
            <span className="text-brown-accent mr-4">kerjanya</span>
            <div className="relative inline-block">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-brown-accent/30 rounded-full overflow-hidden border-4 border-white shadow-xl transform rotate-12">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: gradientPrimary }}
                >
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
            </div>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 max-w-2xl">
            Anda sibuk, jadi kami buat ini mudah.
          </p>
        </motion.div>

        {/* Steps Grid */}
        {/* Menggunakan motion.div untuk grid container, setiap step menggunakan stepCardVariant */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepCardVariant} // Gunakan stepCardVariant di sini
              className="bg-brown-light rounded-3xl p-6 shadow-md transition-colors hover:bg-brown-light/80"
            >
              <div className="mb-6">{step.visual}</div>{" "}
              {/* visual sudah dianimasikan di dalamnya */}
              <div className="text-3xl font-black text-brown-dark mb-3">
                Step {step.number}
              </div>
              <h3 className="text-xl font-bold text-brown-dark mb-3">
                {step.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HowItWorksSection;

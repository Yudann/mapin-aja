"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Search,
  MapPin,
  MessageCircle,
  Heart,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Store,
} from "lucide-react";

// Types
interface Step {
  id: number;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  image: string;
  features: string[];
}

interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  className = "",
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  // Steps data
  const steps: Step[] = [
    {
      id: 0,
      number: "01",
      title: "Cari UMKM Terdekat",
      description:
        "Buka MapinAja dan temukan ribuan UMKM di sekitarmu berdasarkan lokasi real-time. Filter berdasarkan kategori, jarak, atau rating.",
      icon: <Search className="w-6 h-6" />,
      color: "#8B5E3C",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: ["Pencarian real-time", "Filter kategori", "Lihat di peta"],
    },
    {
      id: 1,
      number: "02",
      title: "Lihat Detail & Review",
      description:
        "Jelajahi profil lengkap UMKM, lihat foto produk, baca review dari pembeli lain, dan cek rating serta testimoni terpercaya.",
      icon: <Store className="w-6 h-6" />,
      color: "#A3B18A",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      features: ["Gallery foto", "Review verified", "Rating transparan"],
    },
    {
      id: 2,
      number: "03",
      title: "Chat Langsung",
      description:
        "Hubungi penjual langsung melalui fitur chat real-time. Tanya detail produk, nego harga, atau diskusi kebutuhan kamu dengan pemilik UMKM.",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "#8B5E3C",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
      features: ["Chat real-time", "Respon cepat", "Nego harga"],
    },
    {
      id: 3,
      number: "04",
      title: "Dukung & Simpan Favorit",
      description:
        "Simpan UMKM favorit kamu, berikan review, dan dukung pertumbuhan mereka. Setiap pembelian adalah investasi untuk ekonomi lokal.",
      icon: <Heart className="w-6 h-6" />,
      color: "#A3B18A",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=400&fit=crop",
      features: ["Save favorit", "Tulis review", "Dukung lokal"],
    },
  ];

  // Auto-play steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const currentStep = steps[activeStep];

  return (
    <section
      id="cara-kerja"
      className={`relative min-h-screen bg-white py-20 sm:py-32 overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A3B18A] rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#8B5E3C] rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#A3B18A]/20 rounded-full text-[#8B5E3C] text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Cara Kerja Platform
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#3E2C23] mb-6 leading-tight">
            Mudah, Cepat, dan{" "}
            <span className="text-[#8B5E3C]">Menyenangkan</span>
          </h2>

          <p className="text-lg sm:text-xl text-[#3E2C23]/70 max-w-3xl mx-auto leading-relaxed">
            Hanya 4 langkah sederhana untuk menemukan, terhubung, dan mendukung
            UMKM lokal di sekitarmu
          </p>
        </motion.div>

        {/* Main Content - Split Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Visual Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image Card */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                  transition={{ duration: 0.6 }}
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#DCC1A0]"
                >
                  <img
                    src={currentStep.image}
                    alt={currentStep.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Step Number Badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="absolute top-6 left-6"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl"
                      style={{ backgroundColor: currentStep.color }}
                    >
                      {currentStep.number}
                    </div>
                  </motion.div>

                  {/* Features List */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 space-y-2"
                    >
                      {currentStep.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#A3B18A] flex-shrink-0" />
                          <span className="text-sm font-medium text-[#3E2C23]">
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Floating Icon */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center text-white"
                style={{ backgroundColor: currentStep.color }}
              >
                {currentStep.icon}
              </motion.div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className="group relative"
                >
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? "w-12 bg-[#8B5E3C]"
                        : "w-2 bg-[#DCC1A0] hover:bg-[#8B5E3C]/50"
                    }`}
                  />

                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-[#3E2C23] text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                      Step {index + 1}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Steps List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4 order-1 lg:order-2"
          >
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              const isHovered = hoveredStep === index;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                  className={`relative cursor-pointer group ${
                    isActive ? "lg:pr-8" : ""
                  }`}
                >
                  {/* Step Card */}
                  <motion.div
                    animate={{
                      scale: isActive ? 1.02 : 1,
                      x: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className={`relative rounded-2xl p-6 border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-white border-[#8B5E3C] shadow-xl"
                        : "bg-white/50 border-[#DCC1A0] hover:border-[#8B5E3C]/50 hover:bg-white hover:shadow-lg"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <motion.div
                        animate={{
                          scale: isActive || isHovered ? 1.1 : 1,
                          rotate: isActive || isHovered ? 5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center text-white flex-shrink-0 ${
                          isActive ? "shadow-lg" : ""
                        }`}
                        style={{ backgroundColor: step.color }}
                      >
                        {step.icon}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-sm font-black opacity-40"
                            style={{ color: step.color }}
                          >
                            {step.number}
                          </span>
                          <h3
                            className={`text-xl font-bold transition-colors ${
                              isActive ? "text-[#3E2C23]" : "text-[#3E2C23]/70"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="text-[#3E2C23]/70 leading-relaxed"
                            >
                              {step.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{
                          x: isActive || isHovered ? 5 : 0,
                          opacity: isActive || isHovered ? 1 : 0.3,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight
                          className="w-5 h-5"
                          style={{ color: step.color }}
                        />
                      </motion.div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
                        style={{ backgroundColor: step.color }}
                      />
                    )}
                  </motion.div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[3.5rem] top-[5rem] w-0.5 h-8 bg-[#DCC1A0] hidden lg:block" />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-[#3E2C23]/60 mb-6">
            Siap untuk mulai mendukung UMKM lokal?
          </p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(139, 94, 60, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-[#8B5E3C] hover:bg-[#6d4a2e] text-white rounded-full text-lg font-bold transition-all shadow-xl flex items-center gap-3 mx-auto"
          >
            Mulai Sekarang
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

// src\components\section\map\MapBottomSheet.tsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  Star,
  MapPin,
  Clock,
  Utensils,
  Phone,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { UMKM } from "@/types/umkm";

interface MapBottomSheetProps {
  umkm: UMKM;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onClose: () => void;
}

export default function MapBottomSheet({
  umkm,
  isExpanded,
  onToggleExpand,
  onClose,
}: MapBottomSheetProps) {
  // Variants untuk animasi
  const sheetVariants = {
    collapsed: {
      y: "100%",
      opacity: 0,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    expanded: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
  };

  const contentVariants = {
    collapsed: {
      height: "auto",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
    expanded: {
      height: "85vh",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 300,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="collapsed"
        animate="expanded"
        exit="collapsed"
        variants={sheetVariants}
        className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]"
      >
        {/* Drag Handle */}
        <motion.div
          className="flex justify-center pt-3 pb-2 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <button
            onClick={onToggleExpand}
            className="w-12 h-1.5 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors cursor-grab active:cursor-grabbing"
          />
        </motion.div>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-4 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <X className="w-4 h-4 text-brown-dark" />
        </motion.button>

        {/* Scrollable Content */}
        <motion.div
          className="flex-1 overflow-y-auto"
          variants={contentVariants}
          animate={isExpanded ? "expanded" : "collapsed"}
        >
          <motion.div
            className="px-6 pb-4"
            variants={staggerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Image */}
            <motion.div
              className="relative h-56 -mx-6 mb-4 overflow-hidden"
              variants={itemVariants}
            >
              <motion.img
                src={umkm.image}
                alt={umkm.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

              {/* Badges */}
              <motion.div
                className="absolute top-3 left-3 flex gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {umkm.isOpen ? (
                  <motion.span
                    className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    Buka
                  </motion.span>
                ) : (
                  <motion.span
                    className="px-2 py-1 bg-gray-500 text-white text-xs font-bold rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    Tutup
                  </motion.span>
                )}
                {umkm.isVerified && (
                  <motion.span
                    className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded-full"
                    whileHover={{ scale: 1.05 }}
                  >
                    ✓ Verified
                  </motion.span>
                )}
              </motion.div>
            </motion.div>

            {/* Basic Info */}
            <motion.div variants={itemVariants}>
              <h2 className="text-xl font-black text-brown-dark mb-1 line-clamp-2">
                {umkm.name}
              </h2>
              <p className="text-sm text-brown-accent font-semibold mb-4">
                {umkm.category}
              </p>
            </motion.div>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-3 mb-4"
              variants={itemVariants}
            >
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-base font-bold text-brown-dark">
                  {umkm.rating}
                </span>
              </div>
              <span className="text-sm text-brown-dark/60">
                ({umkm.reviewCount}+ ratings)
              </span>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              className="grid grid-cols-3 gap-2 mb-4"
              variants={staggerVariants}
            >
              {[
                { icon: MapPin, text: `${umkm.distance} km` },
                { icon: Clock, text: umkm.deliveryTime },
                { icon: Utensils, text: umkm.priceRange },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center p-2 bg-brown-light rounded-lg"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(185, 148, 112, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-4 h-4 text-brown-accent mx-auto mb-1" />
                  <p className="text-xs font-semibold text-brown-dark">
                    {stat.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Address */}
            <motion.div
              className="flex items-start gap-2 mb-4 p-3 bg-brown-light rounded-xl"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(185, 148, 112, 0.1)",
              }}
            >
              <MapPin className="w-4 h-4 text-brown-accent shrink-0 mt-0.5" />
              <div className="min-w-0">
                <p className="text-xs text-brown-dark/60 font-semibold mb-1">
                  Alamat
                </p>
                <p className="text-sm text-brown-dark font-medium line-clamp-2">
                  {umkm.address}
                </p>
              </div>
            </motion.div>

            {/* Phone */}
            {umkm.phone && (
              <motion.div
                className="flex items-center gap-2 mb-4"
                variants={itemVariants}
              >
                <Phone className="w-4 h-4 text-brown-accent" />
                <div>
                  <p className="text-xs text-brown-dark/60 font-semibold mb-1">
                    Telepon
                  </p>
                  <a
                    href={`tel:${umkm.phone}`}
                    className="text-sm text-brown-accent font-bold hover:underline"
                  >
                    {umkm.phone}
                  </a>
                </div>
              </motion.div>
            )}

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeInVariants}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <motion.h3
                    className="text-lg font-bold text-brown-dark mb-3"
                    variants={itemVariants}
                  >
                    Deskripsi
                  </motion.h3>
                  <motion.p
                    className="text-sm text-brown-dark/70 leading-relaxed mb-6"
                    variants={itemVariants}
                  >
                    {umkm.description ||
                      "Deskripsi tidak tersedia untuk UMKM ini."}
                  </motion.p>

                  <motion.h3
                    className="text-lg font-bold text-brown-dark mb-3"
                    variants={itemVariants}
                  >
                    Jam Operasional
                  </motion.h3>
                  <motion.div className="space-y-3" variants={staggerVariants}>
                    {[
                      {
                        day: "Senin - Jumat",
                        hours: "10:00 - 22:00",
                        isToday: true,
                      },
                      {
                        day: "Sabtu - Minggu",
                        hours: "09:00 - 23:00",
                        isToday: false,
                      },
                    ].map((schedule, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        className={`flex justify-between items-center py-2 px-3 rounded-lg ${
                          schedule.isToday ? "bg-brown-light" : "bg-gray-50"
                        }`}
                        whileHover={{
                          scale: 1.02,
                          backgroundColor: schedule.isToday
                            ? "rgba(185, 148, 112, 0.15)"
                            : "rgba(0, 0, 0, 0.05)",
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brown-accent" />
                          <span className="text-sm font-medium text-brown-dark">
                            {schedule.day}
                          </span>
                          {schedule.isToday && (
                            <motion.span
                              className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                delay: 0.5 + idx * 0.1,
                              }}
                            >
                              Hari ini
                            </motion.span>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-brown-dark">
                          {schedule.hours}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Action Buttons - Always Visible */}
        <motion.div
          className="shrink-0 border-t border-gray-100 bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-4">
            <div className="flex gap-3 mb-3">
              <motion.button
                className="flex-1 py-3 bg-linear-to-r from-brown-accent to-brown-dark text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(185, 148, 112, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Penjual</span>
              </motion.button>
              <motion.button
                onClick={() => (window.location.href = `/umkm/${umkm.id}`)}
                className="px-4 py-3 bg-brown-light border-2 border-brown-accent text-brown-accent rounded-xl font-bold hover:bg-brown-accent hover:text-white transition-all flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Expand/Collapse Button */}
            <motion.button
              onClick={onToggleExpand}
              className="w-full py-2 flex items-center justify-center gap-2 text-sm font-semibold text-brown-accent hover:bg-brown-light rounded-lg transition-colors"
              whileHover={{ backgroundColor: "rgba(185, 148, 112, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{isExpanded ? "Tutup" : "Lihat Selengkapnya"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

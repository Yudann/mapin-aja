"use client";

import React from "react";
import {
  ArrowRight,
  MapPin,
  Zap,
  TrendingUp,
  Check,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

// Definisikan palet warna untuk konsistensi
const LIGHT_CREAM = "#FAF3E0";
const DARK_BROWN = "#B99470";
const TEXT_PRIMARY = "#2E241F";
const TEXT_SECONDARY = "#6D584C";

// Data langkah-langkah
const steps = [
  {
    icon: MapPin,
    title: "Lokasi",
    subtitle: "Pendaftaran Cepat",
    description:
      "Daftarkan titik lokasi fisik UMKM Anda dalam hitungan menit. Hanya butuh data dasar, sisanya kami urus.",
    details: ["Data Dasar Lokasi", "Verifikasi Instan", "Gratis"],
  },
  {
    icon: Zap,
    title: "Visibilitas",
    subtitle: "Otomasi Peta Digital",
    description:
      "MapinAja memproses dan mengintegrasikan profil Anda ke berbagai peta dan direktori digital populer.",
    details: ["Integrasi Google Maps", "Profil Khusus UMKM", "Pencarian Lokal"],
  },
  {
    icon: TrendingUp,
    title: "Pertumbuhan",
    subtitle: "Hasil yang Terukur",
    description:
      "Lacak kinerja profil Anda, lihat statistik kunjungan, dan tingkatkan konversi penjualan dengan insight kami.",
    details: ["Data Pengunjung", "Analisis Konversi", "Ulasan Pelanggan"],
  },
];

const HowItWorksSection = () => {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: LIGHT_CREAM }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* =================================
        # Header Typography (Gaya Referensi)
        ================================= */}
        <div className="mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black leading-tight"
            style={{ color: TEXT_PRIMARY }}
          >
            Proses. <span style={{ color: DARK_BROWN }}>Efisien.</span>
            <br />
            Kerja{" "}
            <span
              className="underline decoration-wavy decoration-2"
              style={{ textDecorationColor: DARK_BROWN }}
            >
              Otomatis.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl max-w-2xl"
            style={{ color: TEXT_SECONDARY }}
          >
            Kami memastikan UMKM Anda mendapatkan perhatian digital yang layak,
            tanpa kerumitan teknis.
          </motion.p>
        </div>

        {/* =================================
        # Steps/Cards Grid (Dynamic & Asymmetric)
        ================================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`p-8 rounded-3xl shadow-lg border border-opacity-30 ${
                index === 1 ? "lg:scale-105 shadow-2xl" : ""
              }`}
              style={{
                backgroundColor: "white",
                borderColor: DARK_BROWN,
                // Efek border khusus untuk menonjolkan
                boxShadow:
                  index === 1
                    ? `0 25px 50px -12px ${DARK_BROWN}50`
                    : "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Icon & Title */}
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: DARK_BROWN }}
                >
                  <step.icon
                    className="w-6 h-6"
                    style={{ color: LIGHT_CREAM }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs uppercase font-semibold tracking-wider"
                    style={{ color: TEXT_SECONDARY }}
                  >
                    {step.subtitle}
                  </p>
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p
                className="mt-4 pb-4 border-b border-dashed"
                style={{
                  color: TEXT_SECONDARY,
                  borderColor: DARK_BROWN + "30",
                }}
              >
                {step.description}
              </p>

              {/* Details List */}
              <ul className="mt-4 space-y-2">
                {step.details.map((detail, detailIndex) => (
                  <li
                    key={detailIndex}
                    className="flex items-center text-sm"
                    style={{ color: TEXT_PRIMARY }}
                  >
                    <Check
                      className="w-4 h-4 mr-2 flex-shrink-0"
                      style={{ color: DARK_BROWN }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* =================================
        # CTA Footer (Gaya Referensi)
        ================================= */}
        <div
          className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-center p-8 rounded-3xl"
          style={{
            backgroundColor: DARK_BROWN,
            color: LIGHT_CREAM,
          }}
        >
          <div className="mb-4 md:mb-0">
            <p className="text-xl font-semibold mb-1">
              Siap Mengubah Potensi Menjadi Kenyataan?
            </p>
            <p className="text-sm opacity-80">
              Bergabunglah dengan ribuan UMKM yang telah merasakan manfaatnya.
            </p>
          </div>
          <Link
            href="/register"
            className="inline-flex items-center px-6 py-3 border-2 font-semibold rounded-full shadow-lg transition-all hover:shadow-xl hover:opacity-90 flex-shrink-0"
            style={{
              borderColor: LIGHT_CREAM,
              backgroundColor: TEXT_PRIMARY,
              color: LIGHT_CREAM,
            }}
          >
            Daftar UMKM Sekarang <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

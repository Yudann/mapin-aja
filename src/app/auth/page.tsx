// src/app/auth/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MapPin, Store, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AuthLandingPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-brown-light)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl"
      >
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--color-brown-accent)" }}
          >
            <MapPin
              className="w-10 h-10"
              style={{ color: "var(--color-base-light)" }}
            />
          </motion.div>
          <h1
            className="text-5xl font-black mb-4"
            style={{ color: "var(--color-brown-dark)" }}
          >
            Selamat Datang di{" "}
            <span style={{ color: "var(--color-brown-accent)" }}>MapinAja</span>
          </h1>
          <p className="text-xl text-gray-600">
            Platform direktori UMKM terpercaya di Indonesia
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Seller Card */}
          <Link href="/auth/seller">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 rounded-3xl cursor-pointer overflow-hidden"
              style={{ backgroundColor: "var(--color-base-light)" }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(185, 148, 112, 0.1) 0%, rgba(185, 148, 112, 0.05) 100%)",
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "var(--color-brown-dark)" }}
                >
                  <Store
                    className="w-8 h-8"
                    style={{ color: "var(--color-base-light)" }}
                  />
                </div>

                {/* Title */}
                <h2
                  className="text-3xl font-black mb-3"
                  style={{ color: "var(--color-brown-dark)" }}
                >
                  Seller UMKM
                </h2>
                <p className="text-gray-600 mb-6">
                  Daftarkan dan kelola bisnis UMKM Anda dengan mudah. Dapatkan
                  akses ke dashboard lengkap dan analytics.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {[
                    "Dashboard Penjualan",
                    "Kelola Produk",
                    "Chat Pelanggan",
                    "Analytics & Reports",
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-2"
                        style={{ backgroundColor: "var(--color-brown-accent)" }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div
                  className="flex items-center justify-between text-sm font-bold group-hover:translate-x-2 transition-transform"
                  style={{ color: "var(--color-brown-accent)" }}
                >
                  <span>Masuk sebagai Seller</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "rgba(185, 148, 112, 0.1)",
                  color: "var(--color-brown-accent)",
                }}
              >
                Untuk Pemilik UMKM
              </div>
            </motion.div>
          </Link>

          {/* Customer Card */}
          <Link href="/auth/customer">
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="group relative p-8 rounded-3xl cursor-pointer overflow-hidden"
              style={{ backgroundColor: "var(--color-base-light)" }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(185, 148, 112, 0.1) 0%, rgba(185, 148, 112, 0.05) 100%)",
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div
                  className="w-16 h-16 mb-6 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: "var(--color-brown-accent)" }}
                >
                  <Users
                    className="w-8 h-8"
                    style={{ color: "var(--color-base-light)" }}
                  />
                </div>

                {/* Title */}
                <h2
                  className="text-3xl font-black mb-3"
                  style={{ color: "var(--color-brown-dark)" }}
                >
                  Customer
                </h2>
                <p className="text-gray-600 mb-6">
                  Jelajahi ribuan UMKM lokal di sekitar Anda. Temukan produk
                  berkualitas dan dukung ekonomi lokal.
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {[
                    "Jelajahi UMKM",
                    "Chat Penjual",
                    "Simpan Favorit",
                    "Review & Rating",
                  ].map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-600"
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full mr-2"
                        style={{ backgroundColor: "var(--color-brown-accent)" }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <div
                  className="flex items-center justify-between text-sm font-bold group-hover:translate-x-2 transition-transform"
                  style={{ color: "var(--color-brown-accent)" }}
                >
                  <span>Masuk sebagai Customer</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Badge */}
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: "rgba(185, 148, 112, 0.1)",
                  color: "var(--color-brown-accent)",
                }}
              >
                Untuk Pembeli
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Dengan masuk, Anda menyetujui{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--color-brown-accent)" }}
            >
              Syarat & Ketentuan
            </span>{" "}
            dan{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--color-brown-accent)" }}
            >
              Kebijakan Privasi
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

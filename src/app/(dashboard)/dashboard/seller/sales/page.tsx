// app/dashboard/seller/sales/page.tsx
"use client";

import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import SalesToggle from "./components/SalesToggle";
import SalesStats from "./components/SalesStats";
import SalesChart from "./components/SalesChart";
import SalesTable from "./components/SalesTable";
import SalesSummary from "./components/SalesSummary";

export default function SalesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-brown-dark via-brown-accent to-brown-dark rounded-3xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-linear(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-linear(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-black">Dashboard Penjualan</h1>
              </div>
              <p className="text-white/90 text-lg">
                Pantau performa toko dan kelola penjualan dengan mudah
              </p>
            </div>

            <div className="hidden lg:block">
              <div className="text-right">
                <p className="text-white/80 text-sm mb-1">Hari ini</p>
                <p className="text-2xl font-black">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Store Status Toggle */}
      <SalesToggle />

      {/* Stats Cards */}
      <SalesStats />

      {/* Chart and Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart - Takes 2 columns on large screens */}
        <div className="lg:col-span-2">
          <SalesChart />
        </div>

        {/* Quick Insights - Takes 1 column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-lg font-black text-gray-800 mb-4">
            Insight Cepat
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-linear-to-br from-brown-light to-white rounded-xl border border-brownvia-brown-accent/20">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Rata-rata per Transaksi
              </p>
              <p className="text-2xl font-black text-brown-dark">Rp 38.900</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Tingkat Penyelesaian
              </p>
              <p className="text-2xl font-black text-green-700">87%</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Waktu Respons Rata-rata
              </p>
              <p className="text-2xl font-black text-blue-700">3.2 menit</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-semibold text-gray-500 mb-1">
                Pelanggan Baru Hari Ini
              </p>
              <p className="text-2xl font-black text-purple-700">12 orang</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <SalesTable />

      {/* Daily Summary */}
      <SalesSummary />
    </div>
  );
}

// app/dashboard/seller/components/SalesSummary.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Star, Receipt } from "lucide-react";

const summaryData = [
  {
    label: "Produk Terlaris",
    value: "Es Kopi Susu",
    icon: TrendingUp,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    label: "Jam Sibuk",
    value: "12:00 - 14:00",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    label: "Review Baru",
    value: "3 Ulasan Positif",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
  {
    label: "Total Transaksi Minggu Ini",
    value: "Rp 7.200.000",
    icon: Receipt,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export default function SalesSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="space-y-4"
    >
      <h2 className="text-xl font-black text-gray-800">Ringkasan Harian</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className="bg-white p-5 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-500 mb-1">
                    {item.label}
                  </p>
                  <p className="text-base font-black text-gray-800 truncate">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

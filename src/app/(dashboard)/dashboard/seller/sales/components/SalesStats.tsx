// app/dashboard/seller/components/SalesStats.tsx
"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingBag, MessageCircle, Star } from "lucide-react";

const statsData = [
  {
    label: "Total Penjualan Hari Ini",
    value: "Rp 1.245.000",
    icon: DollarSign,
    gradient: "bg-linear-to-br from-[#FAF3E0] to-[#B99470]/20",
    iconColor: "text-[#B99470]",
  },
  {
    label: "Pesanan Masuk",
    value: "32",
    icon: ShoppingBag,
    gradient: "bg-white",
    iconColor: "text-blue-600",
  },
  {
    label: "Chat Baru",
    value: "5",
    icon: MessageCircle,
    gradient: "bg-white",
    iconColor: "text-green-600",
  },
  {
    label: "Rating Hari Ini",
    value: "4.9",
    icon: Star,
    gradient: "bg-white",
    iconColor: "text-yellow-500",
  },
];

export default function SalesStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className={`${stat.gradient} p-6 rounded-2xl border-2 border-gray-200 shadow-md hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  index === 0 ? "bg-[#B99470]/10" : "bg-gray-100"
                }`}
              >
                <Icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-sm font-semibold text-gray-500 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-gray-800">{stat.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

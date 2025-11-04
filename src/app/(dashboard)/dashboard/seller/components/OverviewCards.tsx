// app/dashboard/seller/components/OverviewCards.tsx
"use client";

import { motion } from "framer-motion";
import { Eye, Star, MessageCircle, Package } from "lucide-react";

const stats = [
  {
    title: "Pengunjung Hari Ini",
    value: "1,245",
    icon: Eye,
    color: "bg-gradient-to-br from-brown-dark to-brown-accent",
    textColor: "text-white",
  },
  {
    title: "Rating Rata-rata",
    value: "4.8",
    icon: Star,
    color: "bg-gradient-to-br from-brown-light to-brown-accent",
    textColor: "text-brown-dark",
  },
  {
    title: "Pesan Baru",
    value: "8",
    icon: MessageCircle,
    color: "bg-gradient-to-br from-brown-dark to-brown-accent",
    textColor: "text-white",
  },
  {
    title: "Total Produk",
    value: "24",
    icon: Package,
    color: "bg-gradient-to-bl from-brown-light to-brown-accent",
    textColor: "text-brown-dark",
  },
];

export default function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`${stat.color} ${stat.textColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90 font-medium">{stat.title}</p>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-xl">
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

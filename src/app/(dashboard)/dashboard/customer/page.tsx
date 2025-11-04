// src\app\(dashboard)\dashboard\customer\page.tsx

"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Star,
  Clock,
  Heart,
  MessageSquare,
  ChevronRight,
  Navigation,
  Store,
  Coffee,
  Utensils,
  Shirt,
  Wrench,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Dummy Data
const nearbyUMKM = [
  {
    id: "1",
    name: "Kedai Kopi Bahagia",
    category: "Kopi & Minuman",
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop",
    distance: "0.5 km",
    rating: 4.8,
    reviews: 127,
    isOpen: true,
    isFavorite: true,
  },
  {
    id: "2",
    name: "Toko Kue Mama",
    category: "Bakery & Pastry",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=300&fit=crop",
    distance: "0.8 km",
    rating: 4.9,
    reviews: 89,
    isOpen: true,
    isFavorite: false,
  },
  {
    id: "3",
    name: "Warung Nasi Ibu Ida",
    category: "Makanan",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    distance: "1.2 km",
    rating: 4.7,
    reviews: 203,
    isOpen: true,
    isFavorite: false,
  },
  {
    id: "4",
    name: "Butik Sari Dewi",
    category: "Fashion",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    distance: "1.5 km",
    rating: 4.6,
    reviews: 54,
    isOpen: false,
    isFavorite: true,
  },
];

const recentChats = [
  {
    id: "1",
    umkmName: "Kedai Kopi Bahagia",
    lastMessage: "Terima kasih sudah order! Pesanan sedang disiapkan",
    time: "10 menit lalu",
    unread: 2,
    avatar: "K",
  },
  {
    id: "2",
    umkmName: "Toko Kue Mama",
    lastMessage: "Kue ulang tahun ready untuk besok jam 3 sore ya",
    time: "1 jam lalu",
    unread: 0,
    avatar: "T",
  },
  {
    id: "3",
    umkmName: "Butik Sari Dewi",
    lastMessage: "Oke kak, bisa COD di mall jam 5 sore",
    time: "Kemarin",
    unread: 0,
    avatar: "B",
  },
];

const categories = [
  {
    name: "Makanan",
    icon: Utensils,
    color: "from-orange-500 to-red-500",
    count: 245,
  },
  {
    name: "Minuman",
    icon: Coffee,
    color: "from-brown-500 to-brown-700",
    count: 156,
  },
  {
    name: "Fashion",
    icon: Shirt,
    color: "from-purple-500 to-pink-500",
    count: 89,
  },
  {
    name: "Jasa",
    icon: Wrench,
    color: "from-blue-500 to-cyan-500",
    count: 134,
  },
];

export default function CustomerDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-br from-brown-dark via-brown-accent to-brown-dark rounded-3xl p-8 text-base-light relative overflow-hidden"
      >
        {/* Pattern Overlay */}
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
              <h1 className="text-3xl font-black mb-2">Hai, Ahmad! 👋</h1>
              <p className="text-base-light/90 text-lg mb-6">
                Temukan UMKM terbaik di sekitar Anda
              </p>

              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard/customer/explore"
                  className="px-6 py-3 bg-base-light text-brown-dark rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Navigation className="w-5 h-5" />
                  Jelajah Sekarang
                </Link>
                <button className="px-6 py-3 border-2 border-base-light/30 text-base-light rounded-xl font-bold hover:bg-base-light/10 transition-all">
                  Ubah Lokasi
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-base-light/10 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                <MapPin className="w-16 h-16 text-base-light" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "UMKM Nearby",
            value: "24",
            icon: Store,
            color: "from-blue-500 to-blue-600",
          },
          {
            label: "Favorit",
            value: "8",
            icon: Heart,
            color: "from-red-500 to-pink-500",
          },
          {
            label: "Chat Aktif",
            value: "3",
            icon: MessageSquare,
            color: "from-green-500 to-emerald-600",
          },
          {
            label: "Trending",
            value: "12",
            icon: TrendingUp,
            color: "from-purple-500 to-purple-600",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-linear-to-br ${stat.color} rounded-2xl p-5 text-base-light shadow-lg`}
            >
              <Icon className="w-8 h-8 mb-3 opacity-80" />
              <p className="text-3xl font-black">{stat.value}</p>
              <p className="text-base-light/80 text-sm font-semibold">
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Categories */}
      <div className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-brown-dark">Kategori</h2>
          <Link
            href="/dashboard/customer/explore"
            className="text-brown-accent hover:text-brown-dark font-bold text-sm flex items-center gap-1"
          >
            Lihat Semua
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-brown-light/30 rounded-2xl border-2 border-brown-accent/20 hover:border-brown-accent hover:shadow-lg transition-all"
              >
                <div
                  className={`w-14 h-14 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-base-light" />
                </div>
                <h3 className="font-black text-brown-dark text-lg mb-1">
                  {category.name}
                </h3>
                <p className="text-sm text-brown-dark/60 font-semibold">
                  {category.count} UMKM
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* UMKM Terdekat */}
        <div className="lg:col-span-2 bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-brown-dark flex items-center gap-2">
              <MapPin className="w-6 h-6 text-brown-accent" />
              UMKM Terdekat
            </h2>
            <Link
              href="/dashboard/customer/explore"
              className="text-brown-accent hover:text-brown-dark font-bold text-sm flex items-center gap-1"
            >
              Lihat Semua
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyUMKM.map((umkm, index) => (
              <motion.div
                key={umkm.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl border-2 border-brown-accent/20 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={umkm.image}
                    alt={umkm.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <Heart
                      className={`w-5 h-5 ${
                        umkm.isFavorite
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }`}
                    />
                  </button>

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    {umkm.isOpen ? (
                      <span className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        Buka
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-500 text-white rounded-full text-xs font-bold">
                        Tutup
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-black text-brown-dark group-hover:text-brown-accent transition-colors line-clamp-1">
                        {umkm.name}
                      </h3>
                      <p className="text-sm text-brown-dark/60">
                        {umkm.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-brown-dark">
                          {umkm.rating}
                        </span>
                        <span className="text-brown-dark/60">
                          ({umkm.reviews})
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-brown-dark/60">
                        <MapPin className="w-4 h-4" />
                        <span className="font-semibold">{umkm.distance}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/dashboard/customer/umkm/${umkm.id}`}
                    className="mt-4 w-full py-2 bg-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
                  >
                    Lihat Detail
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Chats */}
        <div className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-brown-dark flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brown-accent" />
              Pesan Terbaru
            </h2>
            <Link
              href="/dashboard/customer/chat"
              className="text-brown-accent hover:text-brown-dark font-bold text-sm flex items-center gap-1"
            >
              Semua
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentChats.map((chat, index) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-brown-light/50 transition-colors cursor-pointer border border-brown-accent/10"
              >
                <div className="w-12 h-12 bg-linear-to-br from-brown-dark to-brown-accent rounded-xl flex items-center justify-center shrink-0">
                  <span className="text-base-light font-bold">
                    {chat.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-brown-dark text-sm truncate">
                      {chat.umkmName}
                    </h4>
                    {chat.unread > 0 && (
                      <span className="w-5 h-5 bg-brown-accent text-base-light rounded-full text-xs flex items-center justify-center font-bold shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-brown-dark/60 line-clamp-2 mb-1">
                    {chat.lastMessage}
                  </p>
                  <p className="text-xs text-brown-dark/40 font-semibold">
                    {chat.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/dashboard/customer/chat"
            className="mt-4 w-full py-3 border-2 border-brown-accent/30 text-brown-accent rounded-xl font-bold hover:bg-brown-accent/10 transition-all flex items-center justify-center gap-2"
          >
            <MessageSquare className="w-5 h-5" />
            Lihat Semua Pesan
          </Link>
        </div>
      </div>
    </div>
  );
}

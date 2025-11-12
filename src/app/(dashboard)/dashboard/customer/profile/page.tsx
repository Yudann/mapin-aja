// src/app/(dashboard)/dashboard/customer/profile/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Camera,
  Save,
  X,
  Shield,
  Bell,
  Heart,
  MessageSquare,
  Clock,
  Star,
  LogOut,
} from "lucide-react";
import LogoutButton from "@/components/layout/LogoutButton";

// Dummy data user
const userData = {
  name: "Bertoo ",
  email: "Bertoo.@email.com",
  phone: "+62 812-3456-7890",
  address: "Jl. Merdeka No. 123, Jakarta Pusat",
  joinDate: "15 Januari 2024",
  avatar:
    "https://media.licdn.com/dms/image/v2/D4E03AQFP0X5olZl_sA/profile-displayphoto-shrink_200_200/B4EZV1HCDEGYAY-/0/1741426536877?e=2147483647&v=beta&t=dZ9beqUYtKT0ZTT8mIBnv9kmwnAieRhdZDdnMmgg5aw",
  stats: {
    favorites: 8,
    chats: 12,
    reviews: 5,
    visits: 24,
  },
};

const recentActivities = [
  {
    id: 1,
    type: "favorite",
    message: "Menambahkan Kedai Kopi Bahagia ke favorit",
    time: "2 jam lalu",
    icon: Heart,
    color: "text-red-500",
  },
  {
    id: 2,
    type: "chat",
    message: "Mengobrol dengan Toko Kue Mama",
    time: "5 jam lalu",
    icon: MessageSquare,
    color: "text-green-500",
  },
  {
    id: 3,
    type: "review",
    message: "Memberi rating 5 bintang untuk Warung Soto Pak Karno",
    time: "1 hari lalu",
    icon: Star,
    color: "text-yellow-500",
  },
  {
    id: 4,
    type: "visit",
    message: "Mengunjungi profil Butik Sari Dewi",
    time: "2 hari lalu",
    icon: Clock,
    color: "text-blue-500",
  },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
  });

  const handleSave = () => {
    // Simpan perubahan ke API atau state management
    console.log("Data saved:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      address: userData.address,
    });
    setIsEditing(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-brown-dark via-brown-accent to-brown-dark rounded-3xl p-6 md:p-8 text-base-light relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-black">Profil Saya</h1>
              <p className="text-base-light/90">Kelola informasi profil Anda</p>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-base-light/20 backdrop-blur-sm text-base-light rounded-xl font-bold hover:bg-base-light/30 transition-all border border-base-light/30"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profil
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all"
                >
                  <Save className="w-4 h-4" />
                  Simpan
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all"
                >
                  <X className="w-4 h-4" />
                  Batal
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info & Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6"
          >
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-brown-accent/20">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brown-accent text-base-light rounded-full flex items-center justify-center hover:shadow-lg transition-all border-4 border-base-light">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-brown-dark mb-2">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none text-brown-dark font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-brown-dark mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none text-brown-dark font-semibold"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-black text-brown-dark mb-2">
                      {userData.name}
                    </h2>
                    <div className="space-y-2 text-brown-dark/80">
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5" />
                        <span className="font-semibold">{userData.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5" />
                        <span className="font-semibold">{userData.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5" />
                        <span className="font-semibold">
                          {userData.address}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-brown-dark/60 mt-3">
                      Bergabung sejak {userData.joinDate}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Fields for Editing */}
            {isEditing && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brown-dark mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none text-brown-dark font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brown-dark mb-2">
                    Alamat
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange("address", e.target.value)}
                    className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none text-brown-dark font-semibold"
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                label: "Favorit",
                value: userData.stats.favorites,
                icon: Heart,
                color: "from-red-500 to-pink-500",
              },
              {
                label: "Chat Aktif",
                value: userData.stats.chats,
                icon: MessageSquare,
                color: "from-green-500 to-emerald-600",
              },
              {
                label: "Ulasan",
                value: userData.stats.reviews,
                icon: Star,
                color: "from-yellow-500 to-orange-500",
              },
              {
                label: "Kunjungan",
                value: userData.stats.visits,
                icon: Clock,
                color: "from-blue-500 to-cyan-500",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${stat.color} rounded-2xl p-4 text-base-light shadow-lg`}
                >
                  <Icon className="w-6 h-6 mb-2 opacity-80" />
                  <p className="text-2xl font-black">{stat.value}</p>
                  <p className="text-sm font-semibold opacity-90">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6"
          >
            <h3 className="text-xl font-black text-brown-dark mb-4">
              Aktivitas Terbaru
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={activity.id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-brown-light/30 transition-colors"
                  >
                    <div className={`p-2 rounded-lg bg-brown-light/50`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-brown-dark">
                        {activity.message}
                      </p>
                      <p className="text-sm text-brown-dark/60">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Settings & Actions */}
        <div className="space-y-6">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6"
          >
            <h3 className="text-xl font-black text-brown-dark mb-4">
              Pengaturan Akun
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brown-light/30 transition-colors text-left">
                <Bell className="w-5 h-5 text-brown-accent" />
                <div>
                  <p className="font-semibold text-brown-dark">Notifikasi</p>
                  <p className="text-sm text-brown-dark/60">
                    Kelola notifikasi
                  </p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brown-light/30 transition-colors text-left">
                <Shield className="w-5 h-5 text-brown-accent" />
                <div>
                  <p className="font-semibold text-brown-dark">
                    Privasi & Keamanan
                  </p>
                  <p className="text-sm text-brown-dark/60">Ubah kata sandi</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-brown-light/30 transition-colors text-left">
                <User className="w-5 h-5 text-brown-accent" />
                <div>
                  <p className="font-semibold text-brown-dark">Preferensi</p>
                  <p className="text-sm text-brown-dark/60">
                    Bahasa & tampilan
                  </p>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg p-6"
          >
            <h3 className="text-xl font-black text-brown-dark mb-4">
              Tindakan Cepat
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-brown-accent text-base-light font-bold hover:shadow-lg transition-all justify-center">
                <Heart className="w-5 h-5" />
                Lihat Favorit
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-brown-accent text-brown-accent font-bold hover:bg-brown-accent/10 transition-all justify-center">
                <MessageSquare className="w-5 h-5" />
                Chat Saya
              </button>

              <LogoutButton />
            </div>
          </motion.div>

          {/* Help & Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-base-light"
          >
            <h3 className="text-lg font-black mb-2">Butuh Bantuan?</h3>
            <p className="text-base-light/90 text-sm mb-4">
              Hubungi tim support kami untuk pertanyaan dan bantuan
            </p>
            <button className="w-full py-2 bg-base-light text-blue-600 rounded-xl font-bold hover:shadow-lg transition-all">
              Hubungi Support
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

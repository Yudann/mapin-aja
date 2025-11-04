"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Lock,
  Bell,
  Globe,
  CreditCard,
  Shield,
  LogOut,
  Camera,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Save,
  X,
  Check,
  AlertCircle,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Volume2,
  MessageSquare,
  Package,
  TrendingUp,
  DollarSign,
  Calendar,
  Settings as SettingsIcon,
} from "lucide-react";

type SettingsTab =
  | "profile"
  | "security"
  | "notifications"
  | "preferences"
  | "billing";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle"
  );

  const tabs = [
    { id: "profile" as const, label: "Profil", icon: User },
    { id: "security" as const, label: "Keamanan", icon: Shield },
    { id: "notifications" as const, label: "Notifikasi", icon: Bell },
    { id: "preferences" as const, label: "Preferensi", icon: SettingsIcon },
    { id: "billing" as const, label: "Pembayaran", icon: CreditCard },
  ];

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-brown-dark">Pengaturan</h1>
          <p className="text-brown-dark/70 mt-2 text-lg">
            Kelola akun dan preferensi Anda
          </p>
        </div>

        {/* Save Button */}
        <motion.button
          onClick={handleSave}
          disabled={saveStatus === "saving"}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            saveStatus === "saved"
              ? "bg-green-500 text-base-light"
              : saveStatus === "saving"
              ? "bg-brown-accent/50 text-base-light cursor-not-allowed"
              : "bg-gradient-to-r from-brown-dark to-brown-accent text-base-light hover:shadow-lg"
          }`}
          whileHover={saveStatus === "idle" ? { scale: 1.02 } : {}}
          whileTap={saveStatus === "idle" ? { scale: 0.98 } : {}}
        >
          {saveStatus === "saving" ? (
            <>
              <div className="w-5 h-5 border-2 border-base-light border-t-transparent rounded-full animate-spin" />
              Menyimpan...
            </>
          ) : saveStatus === "saved" ? (
            <>
              <Check className="w-5 h-5" />
              Tersimpan!
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Simpan Perubahan
            </>
          )}
        </motion.button>
      </div>

      {/* Main Content Card */}
      <div className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b-2 border-brown-accent/10 bg-brown-light/30">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-6 font-bold text-sm transition-all relative whitespace-nowrap ${
                    activeTab === tab.id
                      ? "text-brown-accent"
                      : "text-brown-dark/60 hover:text-brown-dark"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-1 bg-brown-accent rounded-t-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && <ProfileTab key="profile" />}
            {activeTab === "security" && (
              <SecurityTab
                key="security"
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            )}
            {activeTab === "notifications" && (
              <NotificationsTab key="notifications" />
            )}
            {activeTab === "preferences" && (
              <PreferencesTab key="preferences" />
            )}
            {activeTab === "billing" && <BillingTab key="billing" />}
          </AnimatePresence>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-base-light rounded-3xl border-2 border-red-200 shadow-lg overflow-hidden">
        <div className="bg-red-50 p-6 border-b-2 border-red-200">
          <h3 className="text-xl font-black text-red-800 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Zona Berbahaya
          </h3>
          <p className="text-red-700 mt-2">
            Tindakan di bawah ini bersifat permanen dan tidak dapat dibatalkan
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl">
            <div>
              <p className="font-bold text-brown-dark">Nonaktifkan Akun</p>
              <p className="text-sm text-brown-dark/60">
                Akun akan disembunyikan, tapi data tetap tersimpan
              </p>
            </div>
            <button className="px-5 py-2 border-2 border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-all font-bold">
              Nonaktifkan
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-red-50/50 rounded-2xl">
            <div>
              <p className="font-bold text-brown-dark">Hapus Akun Permanen</p>
              <p className="text-sm text-brown-dark/60">
                Semua data akan dihapus dan tidak dapat dipulihkan
              </p>
            </div>
            <button className="px-5 py-2 bg-red-500 text-base-light rounded-xl hover:bg-red-600 transition-all font-bold">
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Profile Tab
function ProfileTab() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {/* Profile Picture */}
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="w-32 h-32 bg-gradient-to-br from-brown-dark to-brown-accent rounded-3xl flex items-center justify-center">
            <span className="text-5xl font-black text-base-light">C</span>
          </div>
          <button className="absolute inset-0 bg-brown-dark/80 backdrop-blur-sm rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
            <Camera className="w-8 h-8 text-base-light" />
          </button>
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-black text-brown-dark">
            Cici Cantiikkk
          </h3>
          <p className="text-brown-dark/60 mt-1">Seller Premium</p>
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg transition-all">
              Upload Foto Baru
            </button>
            <button className="px-4 py-2 border-2 border-brown-accent/30 text-brown-dark rounded-xl font-bold hover:bg-brown-light/50 transition-all">
              Hapus Foto
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-6">
        <h4 className="text-xl font-black text-brown-dark">
          Informasi Pribadi
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-brown-dark">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <input
                type="text"
                defaultValue="Cici Cantiikkk"
                className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-brown-dark">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <input
                type="email"
                defaultValue="cici@kedaikopi.com"
                className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-brown-dark">
              Nomor Telepon
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <input
                type="tel"
                defaultValue="+62 812-3456-7890"
                className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-bold text-brown-dark">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <input
                type="url"
                defaultValue="www.kedaikopibahagia.com"
                className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-brown-dark">
            Alamat
          </label>
          <div className="relative">
            <MapPin className="absolute left-4 top-4 w-5 h-5 text-brown-accent/50" />
            <textarea
              rows={3}
              defaultValue="Jl. Merdeka No. 123, Jakarta Pusat, DKI Jakarta 10110"
              className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all resize-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-bold text-brown-dark">Bio</label>
          <textarea
            rows={4}
            placeholder="Ceritakan sedikit tentang diri Anda..."
            className="w-full px-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all resize-none"
          />
        </div>
      </div>
    </motion.div>
  );
}

// Security Tab
function SecurityTab({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}: any) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {/* Password Change */}
      <div className="space-y-6">
        <h4 className="text-xl font-black text-brown-dark">Ubah Password</h4>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-bold text-brown-dark">
              Password Saat Ini
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full pl-12 pr-12 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-accent/50 hover:text-brown-accent transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-brown-dark">
                Password Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-brown-dark">
                Konfirmasi Password Baru
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brown-accent/50 hover:text-brown-accent transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
            <p className="text-sm text-blue-800 font-medium">
              💡 Password harus minimal 8 karakter dan mengandung huruf besar,
              huruf kecil, angka, dan simbol
            </p>
          </div>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-black text-brown-dark">
              Autentikasi Dua Faktor
            </h4>
            <p className="text-sm text-brown-dark/60 mt-1">
              Tambahkan lapisan keamanan ekstra untuk akun Anda
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brown-accent"></div>
          </label>
        </div>

        {twoFactorEnabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-green-50 border-2 border-green-200 rounded-2xl p-6"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-base-light" />
              </div>
              <div>
                <h5 className="font-bold text-green-800 mb-2">2FA Aktif</h5>
                <p className="text-sm text-green-700 mb-4">
                  Akun Anda dilindungi dengan autentikasi dua faktor. Gunakan
                  aplikasi authenticator untuk login.
                </p>
                <button className="px-4 py-2 bg-green-500 text-base-light rounded-xl font-bold hover:bg-green-600 transition-all">
                  Lihat Kode Backup
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Active Sessions */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <h4 className="text-xl font-black text-brown-dark">Sesi Aktif</h4>

        <div className="space-y-3">
          {[
            {
              device: "Chrome on Windows",
              location: "Jakarta, Indonesia",
              time: "Aktif sekarang",
              icon: Monitor,
              current: true,
            },
            {
              device: "Mobile App on iPhone",
              location: "Jakarta, Indonesia",
              time: "2 jam yang lalu",
              icon: Smartphone,
              current: false,
            },
          ].map((session, index) => {
            const Icon = session.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brown-accent/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-brown-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-brown-dark flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          Saat ini
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-brown-dark/60">
                      {session.location} • {session.time}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all">
                    Logout
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Notifications Tab
function NotificationsTab() {
  const notificationSettings = [
    {
      category: "Pesanan",
      icon: Package,
      items: [
        {
          label: "Pesanan Baru",
          description: "Notifikasi saat ada pesanan baru masuk",
          enabled: true,
        },
        {
          label: "Update Status Pesanan",
          description: "Pemberitahuan perubahan status pesanan",
          enabled: true,
        },
        {
          label: "Pesanan Dibatalkan",
          description: "Notifikasi pembatalan pesanan",
          enabled: true,
        },
      ],
    },
    {
      category: "Pesan",
      icon: MessageSquare,
      items: [
        {
          label: "Pesan Baru",
          description: "Notifikasi pesan dari pelanggan",
          enabled: true,
        },
        {
          label: "Balasan Ulasan",
          description: "Pemberitahuan balasan pada ulasan Anda",
          enabled: false,
        },
      ],
    },
    {
      category: "Bisnis",
      icon: TrendingUp,
      items: [
        {
          label: "Laporan Harian",
          description: "Ringkasan performa harian via email",
          enabled: true,
        },
        {
          label: "Tips & Saran",
          description: "Saran untuk meningkatkan bisnis",
          enabled: false,
        },
        {
          label: "Update Platform",
          description: "Pemberitahuan fitur dan update baru",
          enabled: true,
        },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {notificationSettings.map((category, categoryIndex) => {
        const Icon = category.icon;
        return (
          <div key={categoryIndex} className="space-y-4">
            <h4 className="text-xl font-black text-brown-dark flex items-center gap-2">
              <Icon className="w-6 h-6 text-brown-accent" />
              {category.category}
            </h4>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <label
                  key={itemIndex}
                  className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20 cursor-pointer hover:bg-brown-light/50 transition-colors"
                >
                  <div>
                    <p className="font-bold text-brown-dark">{item.label}</p>
                    <p className="text-sm text-brown-dark/60">
                      {item.description}
                    </p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={item.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brown-accent/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brown-accent"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}

// Preferences Tab
function PreferencesTab() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [language, setLanguage] = useState("id");

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {/* Theme Selection */}
      <div className="space-y-4">
        <h4 className="text-xl font-black text-brown-dark">Tema Tampilan</h4>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setTheme("light")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              theme === "light"
                ? "border-brown-accent bg-brown-accent/10"
                : "border-brown-accent/20 hover:border-brown-accent/40"
            }`}
          >
            <Sun className="w-8 h-8 text-brown-accent mx-auto mb-3" />
            <p className="font-bold text-brown-dark">Terang</p>
            <p className="text-sm text-brown-dark/60 mt-1">Mode siang hari</p>
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`p-6 rounded-2xl border-2 transition-all ${
              theme === "dark"
                ? "border-brown-accent bg-brown-accent/10"
                : "border-brown-accent/20 hover:border-brown-accent/40"
            }`}
          >
            <Moon className="w-8 h-8 text-brown-accent mx-auto mb-3" />
            <p className="font-bold text-brown-dark">Gelap</p>
            <p className="text-sm text-brown-dark/60 mt-1">Mode malam hari</p>
          </button>
        </div>
      </div>

      {/* Language */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <h4 className="text-xl font-black text-brown-dark">Bahasa</h4>
        <div className="relative">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
          >
            <option value="id">🇮🇩 Bahasa Indonesia</option>
            <option value="en">🇺🇸 English</option>
            <option value="zh">🇨🇳 中文</option>
          </select>
        </div>
      </div>

      {/* Other Preferences */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <h4 className="text-xl font-black text-brown-dark">
          Preferensi Lainnya
        </h4>

        <label className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20 cursor-pointer hover:bg-brown-light/50 transition-colors">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-brown-accent" />
            <div>
              <p className="font-bold text-brown-dark">Suara Notifikasi</p>
              <p className="text-sm text-brown-dark/60">
                Putar suara saat ada notifikasi baru
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="w-5 h-5 text-brown-accent rounded focus:ring-brown-accent"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20 cursor-pointer hover:bg-brown-light/50 transition-colors">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-brown-accent" />
            <div>
              <p className="font-bold text-brown-dark">Notifikasi Desktop</p>
              <p className="text-sm text-brown-dark/60">
                Tampilkan notifikasi di desktop
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            defaultChecked
            className="w-5 h-5 text-brown-accent rounded focus:ring-brown-accent"
          />
        </label>

        <label className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20 cursor-pointer hover:bg-brown-light/50 transition-colors">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-brown-accent" />
            <div>
              <p className="font-bold text-brown-dark">Newsletter</p>
              <p className="text-sm text-brown-dark/60">
                Terima tips bisnis dan update via email
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 text-brown-accent rounded focus:ring-brown-accent"
          />
        </label>
      </div>

      {/* Display Settings */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <h4 className="text-xl font-black text-brown-dark">
          Pengaturan Tampilan
        </h4>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-bold text-brown-dark mb-2">
              Zona Waktu
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <select className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all">
                <option>(GMT+7) Jakarta, Bangkok</option>
                <option>(GMT+8) Singapore, Kuala Lumpur</option>
                <option>(GMT+9) Tokyo, Seoul</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-brown-dark mb-2">
              Format Mata Uang
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-accent/50" />
              <select className="w-full pl-12 pr-4 py-3 bg-brown-light/30 border-2 border-brown-accent/20 rounded-xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all">
                <option>IDR (Rp) - Rupiah Indonesia</option>
                <option>USD ($) - US Dollar</option>
                <option>SGD ($) - Singapore Dollar</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Billing Tab
function BillingTab() {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const plans = [
    {
      id: "free",
      name: "Gratis",
      price: "Rp 0",
      period: "/bulan",
      features: [
        "Maksimal 5 produk",
        "Dashboard basic",
        "Dukungan email",
        "Transaksi bulanan terbatas",
      ],
      color: "from-gray-500 to-gray-600",
      recommended: false,
    },
    {
      id: "premium",
      name: "Premium",
      price: "Rp 99.000",
      period: "/bulan",
      features: [
        "Produk unlimited",
        "Dashboard lengkap & analytics",
        "Prioritas dukungan 24/7",
        "Transaksi unlimited",
        "Badge Premium",
        "Featured di homepage",
      ],
      color: "from-brown-dark to-brown-accent",
      recommended: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "Hubungi Kami",
      period: "",
      features: [
        "Semua fitur Premium",
        "Multiple stores",
        "API access",
        "Dedicated account manager",
        "Custom integration",
        "White-label option",
      ],
      color: "from-purple-500 to-purple-600",
      recommended: false,
    },
  ];

  const paymentHistory = [
    {
      date: "01 Nov 2024",
      plan: "Premium",
      amount: "Rp 99.000",
      status: "Lunas",
      invoice: "#INV-001",
    },
    {
      date: "01 Okt 2024",
      plan: "Premium",
      amount: "Rp 99.000",
      status: "Lunas",
      invoice: "#INV-002",
    },
    {
      date: "01 Sep 2024",
      plan: "Premium",
      amount: "Rp 99.000",
      status: "Lunas",
      invoice: "#INV-003",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-8"
    >
      {/* Current Plan */}
      <div className="bg-gradient-to-br from-brown-dark to-brown-accent rounded-2xl p-6 text-base-light">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-base-light/80 font-semibold mb-1">
              Paket Saat Ini
            </p>
            <h3 className="text-3xl font-black">Premium</h3>
            <p className="text-base-light/90 mt-2">
              Berlaku hingga 01 Desember 2024
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-black">Rp 99k</p>
            <p className="text-base-light/80">/bulan</p>
            <button className="mt-4 px-5 py-2 bg-base-light text-brown-dark rounded-xl font-bold hover:shadow-lg transition-all">
              Perpanjang
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4">
        <h4 className="text-xl font-black text-brown-dark">Pilih Paket</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-6 border-2 transition-all ${
                selectedPlan === plan.id
                  ? "border-brown-accent shadow-lg scale-105"
                  : "border-brown-accent/20 hover:border-brown-accent/40"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brown-dark to-brown-accent text-base-light rounded-full text-xs font-bold">
                  Direkomendasikan
                </div>
              )}

              <div className="text-center mb-6">
                <h5 className="text-xl font-black text-brown-dark mb-2">
                  {plan.name}
                </h5>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-3xl font-black text-brown-accent">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-brown-dark/60 mb-1">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-brown-dark"
                  >
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  selectedPlan === plan.id
                    ? "bg-gradient-to-r from-brown-dark to-brown-accent text-base-light"
                    : "bg-brown-light/50 text-brown-dark hover:bg-brown-light"
                }`}
              >
                {selectedPlan === plan.id ? "Paket Aktif" : "Pilih Paket"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <h4 className="text-xl font-black text-brown-dark">
          Metode Pembayaran
        </h4>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border-2 border-brown-accent/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-base-light" />
              </div>
              <div>
                <p className="font-bold text-brown-dark">•••• •••• •••• 4242</p>
                <p className="text-sm text-brown-dark/60">
                  Berlaku hingga 12/25
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-brown-accent hover:bg-brown-accent/10 rounded-xl font-bold transition-all">
                Edit
              </button>
              <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-bold transition-all">
                Hapus
              </button>
            </div>
          </div>

          <button className="w-full py-4 border-2 border-dashed border-brown-accent/30 rounded-2xl text-brown-accent hover:bg-brown-accent/5 transition-all font-bold flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Tambah Metode Pembayaran
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="space-y-4 pt-6 border-t-2 border-brown-accent/10">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-black text-brown-dark">
            Riwayat Pembayaran
          </h4>
          <button className="text-brown-accent hover:text-brown-dark font-bold text-sm">
            Lihat Semua
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-brown-accent/10">
                <th className="text-left py-3 px-4 text-sm font-bold text-brown-dark/60">
                  Tanggal
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brown-dark/60">
                  Invoice
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brown-dark/60">
                  Paket
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brown-dark/60">
                  Jumlah
                </th>
                <th className="text-left py-3 px-4 text-sm font-bold text-brown-dark/60">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-sm font-bold text-brown-dark/60">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-brown-accent/10 hover:bg-brown-light/30 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-brown-dark">
                    {payment.date}
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-brown-dark">
                    {payment.invoice}
                  </td>
                  <td className="py-4 px-4 text-sm text-brown-dark">
                    {payment.plan}
                  </td>
                  <td className="py-4 px-4 text-sm font-bold text-brown-accent">
                    {payment.amount}
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-brown-accent hover:text-brown-dark font-bold text-sm">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

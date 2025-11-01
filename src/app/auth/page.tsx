"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  MapPin,
  Users,
  Store,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

type AuthMode = "login" | "register";
type UserType = "customer" | "seller";

interface Toast {
  title: string;
  description: string;
  variant?: "default" | "destructive";
}

const ToastNotification = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`fixed top-4 right-4 z-50 max-w-md p-4 rounded-2xl shadow-2xl ${
      toast.variant === "destructive" ? "bg-red-500" : "bg-green-500"
    } text-white`}
  >
    <div className="flex items-start space-x-3">
      {toast.variant === "destructive" ? (
        <span className="text-xl">⚠️</span>
      ) : (
        <CheckCircle2 className="w-6 h-6" />
      )}
      <div className="flex-1">
        <p className="font-bold">{toast.title}</p>
        <p className="text-sm opacity-90">{toast.description}</p>
      </div>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white text-2xl"
      >
        ×
      </button>
    </div>
  </motion.div>
);

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialMode = (searchParams.get("mode") as AuthMode) || "login";
  const initialType = (searchParams.get("type") as UserType) || "customer";

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [userType, setUserType] = useState<UserType>(initialType);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("mode", mode);
    params.set("type", userType);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [mode, userType]);

  const showToast = (toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 4000);
  };

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      showToast({
        title: "Error",
        description: "Email dan password wajib diisi",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      showToast({
        title: "Berhasil! 🎉",
        description: "Selamat datang kembali",
      });
      setTimeout(
        () => router.push(userType === "seller" ? "/dashboard-seller" : "/"),
        1000
      );
    } catch (error: any) {
      showToast({
        title: "Login Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      showToast({
        title: "Error",
        description: "Semua field wajib diisi",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast({
        title: "Error",
        description: "Password tidak cocok",
        variant: "destructive",
      });
      return;
    }

    if (formData.password.length < 6) {
      showToast({
        title: "Error",
        description: "Password minimal 6 karakter",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.fullName, user_type: userType },
        },
      });

      if (error) throw error;

      showToast({
        title: "Berhasil! 🎉",
        description: "Cek email untuk verifikasi",
      });
      setTimeout(() => {
        setMode("login");
        setFormData((prev) => ({
          ...prev,
          password: "",
          fullName: "",
          confirmPassword: "",
        }));
      }, 2000);
    } catch (error: any) {
      showToast({
        title: "Registrasi Gagal",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "var(--color-brown-light)" }}
    >
      <AnimatePresence>
        {toast && (
          <ToastNotification toast={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-7xl p-6 h-[90%] rounded-4xl shadow-2xl overflow-hidden"
        style={{ backgroundColor: "var(--color-base-light)" }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Visual */}
          <div
            className="hidden h-[90%] lg:block lg:w-1/2 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden"
            style={{ backgroundColor: "var(--color-brown-dark)" }}
          >
            {/* Animated 3D Shapes Background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(185, 148, 112, 0.2), rgba(185, 148, 112, 0.3))",
                }}
              />
              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full blur-3xl"
                style={{
                  background:
                    "linear-gradient(to bottom right, rgba(185, 148, 112, 0.15), rgba(185, 148, 112, 0.25))",
                }}
              />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-brown-accent)" }}
                >
                  <MapPin
                    className="w-6 h-6"
                    style={{ color: "var(--color-base-light)" }}
                  />
                </div>
                <span
                  className="text-2xl font-black"
                  style={{ color: "var(--color-base-light)" }}
                >
                  MapinAja
                </span>
              </div>

              {/* Stacked Cards with 3D Effect */}
              <div className="relative flex-1 flex items-center justify-center perspective-1000 min-h-[500px]">
                {/* Card 1 - Chat with Seller (Top Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    x: [0, -3, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute top-4 left-4 w-64 rounded-2xl p-4 shadow-2xl transform -rotate-6 z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--color-brown-accent), #8B6F47)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="text-xs font-bold mb-2 flex items-center space-x-2"
                    style={{ color: "var(--color-brown-light)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--color-brown-light)" }}
                    />
                    <span>💬 Chat dengan Seller</span>
                  </div>
                  <div className="space-y-2 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl rounded-tl-sm p-2">
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-base-light)" }}
                      >
                        Halo! Ada yang bisa saya bantu? 😊
                      </p>
                    </div>
                    <div className="bg-white/90 rounded-xl rounded-tr-sm p-2 ml-6">
                      <p
                        className="text-xs"
                        style={{ color: "var(--color-brown-dark)" }}
                      >
                        Apakah masih buka hari ini?
                      </p>
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex items-center space-x-1 text-white/70 text-xs"
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0,
                        }}
                        className="w-1 h-1 bg-white/70 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                        className="w-1 h-1 bg-white/70 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                        className="w-1 h-1 bg-white/70 rounded-full"
                      />
                    </div>
                    <span className="text-xs">mengetik...</span>
                  </motion.div>
                </motion.div>

                {/* Card 2 - Transaction Receipt (Top Right) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    x: [0, 5, 0],
                    y: [0, -4, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    x: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                    y: {
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                  }}
                  className="absolute top-16 right-8 w-56 rounded-2xl p-4 shadow-2xl transform rotate-[8deg] z-10"
                  style={{
                    backgroundColor: "var(--color-base-light)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="text-xs font-bold mb-2"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    💰 Total Revenue
                  </div>
                  <div
                    className="text-3xl font-black mb-3"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    Rp 850K
                  </div>
                  <div
                    className="rounded-xl p-2 mb-2"
                    style={{ backgroundColor: "var(--color-brown-light)" }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs"
                        style={{ color: "var(--color-brown-dark)" }}
                      >
                        Transaksi
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "var(--color-brown-accent)" }}
                      >
                        +24
                      </span>
                    </div>
                    <div
                      className="w-full rounded-full h-1.5"
                      style={{ backgroundColor: "#D4B896" }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 1 }}
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: "var(--color-brown-accent)" }}
                      />
                    </div>
                  </div>
                  <div
                    className="flex items-center space-x-1 text-xs"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "var(--color-brown-accent)" }}
                    />
                    <span>↗ +32% bulan ini</span>
                  </div>
                </motion.div>

                {/* Card 3 - Featured UMKM (Bottom Center-Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    x: [0, 2, 0],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    x: {
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    },
                    y: {
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    },
                  }}
                  className="absolute bottom-12 left-16 w-72 rounded-2xl p-4 shadow-2xl transform rotate-[-4deg] z-30"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #8B6F47, var(--color-brown-accent))",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative z-10">
                    <div
                      className="text-xs font-bold mb-2"
                      style={{ color: "var(--color-brown-light)" }}
                    >
                      🔥 Featured UMKM
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Store
                          className="w-6 h-6"
                          style={{ color: "var(--color-base-light)" }}
                        />
                      </div>
                      <div>
                        <div
                          className="font-black text-base"
                          style={{ color: "var(--color-base-light)" }}
                        >
                          Warung Kopi Asik
                        </div>
                        <div
                          className="text-xs flex items-center space-x-1"
                          style={{ color: "var(--color-brown-light)" }}
                        >
                          <span>⭐ 4.9</span>
                          <span>•</span>
                          <span>📍 0.5 km</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/25 backdrop-blur-md rounded-xl p-2 mb-2">
                      <p
                        className="text-xs font-medium"
                        style={{ color: "var(--color-base-light)" }}
                      >
                        💡 Kopi terbaik! Promo 30% pelanggan baru
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1">
                        {["😊", "🎉", "⭐"].map((emoji, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 bg-white/30 rounded-full border-2 flex items-center justify-center text-xs"
                            style={{ borderColor: "var(--color-base-light)" }}
                          >
                            {emoji}
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                        <span
                          className="font-bold text-xs"
                          style={{ color: "var(--color-base-light)" }}
                        >
                          Buka ✓
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                </motion.div>

                {/* Card 4 - Stats Badge (Bottom Right) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -8, 0],
                    rotate: [0, 3, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    },
                    rotate: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    },
                  }}
                  className="absolute bottom-24 right-6 rounded-xl p-3 shadow-xl z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--color-brown-accent), #8B6F47)",
                  }}
                >
                  <div
                    className="font-black text-xl mb-0.5"
                    style={{ color: "var(--color-base-light)" }}
                  >
                    1000+
                  </div>
                  <div
                    className="text-xs font-semibold"
                    style={{ color: "var(--color-brown-light)" }}
                  >
                    UMKM Aktif
                  </div>
                </motion.div>
              </div>

              {/* Bottom Text */}
              <div
                className="text-sm mt-8"
                style={{ color: "rgba(250, 243, 224, 0.6)" }}
              >
                <div
                  className="font-bold mb-2"
                  style={{ color: "var(--color-base-light)" }}
                >
                  TEMUKAN UMKM LOKAL
                </div>
                Platform direktori UMKM terpercaya di Indonesia
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 px-8 pt-4 lg:px-12">
            <div className="w-full mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div
                  className="text-sm font-bold uppercase tracking-wider mb-2"
                  style={{ color: "var(--color-brown-accent)" }}
                >
                  MapinAja
                </div>
                <h1
                  className="text-4xl font-black mb-2"
                  style={{ color: "var(--color-brown-dark)" }}
                >
                  {mode === "login" ? "WELCOME TO" : "CREATE ACCOUNT"}
                  <br />
                  <span
                    style={{
                      background:
                        "linear-gradient(to right, var(--color-brown-accent), #8B6F47)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    MAPINAJA
                  </span>
                </h1>
              </div>

              {/* User Type Selection */}
              <div className="mb-6">
                <label
                  className="text-sm font-bold block mb-3"
                  style={{ color: "var(--color-brown-dark)" }}
                >
                  Bergabung sebagai:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      id: "customer" as UserType,
                      label: "Customer",
                      icon: Users,
                    },
                    {
                      id: "seller" as UserType,
                      label: "Seller UMKM",
                      icon: Store,
                    },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                      className={`p-3 rounded-xl border-2 transition-all flex items-center justify-center space-x-2 ${
                        userType === type.id
                          ? "text-gray-600 hover:border-gray-300"
                          : ""
                      }`}
                      style={
                        userType === type.id
                          ? {
                              borderColor: "var(--color-brown-accent)",
                              backgroundColor: "rgba(185, 148, 112, 0.05)",
                              color: "var(--color-brown-accent)",
                            }
                          : {
                              borderColor: "#E5E7EB",
                              color: "#6B7280",
                            }
                      }
                    >
                      <type.icon className="w-5 h-5" />
                      <span className="font-semibold text-sm">
                        {type.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label
                        className="text-sm font-bold block mb-2"
                        style={{ color: "var(--color-brown-dark)" }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Nama Lengkap"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ borderColor: "#E5E7EB" }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-brown-accent)")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label
                    className="text-sm font-bold block mb-2"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors"
                    style={{ borderColor: "#E5E7EB" }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--color-brown-accent)")
                    }
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                </div>

                <div>
                  <label
                    className="text-sm font-bold block mb-2"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors pr-12"
                      style={{ borderColor: "#E5E7EB" }}
                      onFocus={(e) =>
                        (e.target.style.borderColor =
                          "var(--color-brown-accent)")
                      }
                      onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {mode === "register" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <label
                        className="text-sm font-bold block mb-2"
                        style={{ color: "var(--color-brown-dark)" }}
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-2.5 border-2 rounded-xl focus:outline-none transition-colors"
                        style={{ borderColor: "#E5E7EB" }}
                        onFocus={(e) =>
                          (e.target.style.borderColor =
                            "var(--color-brown-accent)")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={mode === "login" ? handleLogin : handleRegister}
                  disabled={loading}
                  className="w-full py-4 font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--color-brown-accent)",
                    color: "var(--color-base-light)",
                  }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : mode === "login" ? (
                    "Login"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>

              {/* Switch Mode */}
              <div className="text-center mt-4">
                <span className="text-sm" style={{ color: "#6B7280" }}>
                  {mode === "login"
                    ? "Don't have an account? "
                    : "Already have an account? "}
                </span>
                <button
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setFormData((prev) => ({
                      ...prev,
                      password: "",
                      fullName: "",
                      confirmPassword: "",
                    }));
                  }}
                  className="font-bold text-sm hover:underline"
                  style={{ color: "var(--color-brown-accent)" }}
                >
                  {mode === "login" ? "Sign Up" : "Login"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div
          className="flex justify-center items-center h-screen"
          style={{ backgroundColor: "var(--color-brown-light)" }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div
              className="w-16 h-16 rounded-2xl animate-pulse flex items-center justify-center"
              style={{ backgroundColor: "var(--color-brown-accent)" }}
            >
              <MapPin
                className="w-8 h-8"
                style={{ color: "var(--color-base-light)" }}
              />
            </div>
            <span
              className="text-lg font-semibold"
              style={{ color: "var(--color-brown-dark)" }}
            >
              Loading...
            </span>
          </div>
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}

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
    <div className="min-h-screen flex items-center justify-center bg-pink-200 p-4 ">
      <AnimatePresence>
        {toast && (
          <ToastNotification toast={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-7xl p-6 bg-white h-[90%] rounded-4xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Visual */}
          <div className="hidden h-[90%] lg:block lg:w-1/2 bg-black rounded-[3rem] p-8 lg:p-12 relative overflow-hidden">
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
                className="absolute -top-20 -right-20 w-64 h-64 bg-linear-to-br from-green-400/20 to-cyan-400/20 rounded-full blur-3xl"
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
                className="absolute -bottom-32 -left-32 w-80 h-80 bg-linear-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
              />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-green-400 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black text-white">MapinAja</span>
              </div>

              {/* Stacked Cards with 3D Effect */}
              <div className="relative flex-1 flex items-center justify-center perspective-1000 min-h-[500px]">
                {/* Card 1 - Chat with Seller (Top Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    // y: 0,
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
                  className="absolute top-4 left-4 w-64 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 shadow-2xl transform -rotate-6 z-20"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-white/90 text-xs font-bold mb-2 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                    <span>💬 Chat dengan Seller</span>
                  </div>
                  <div className="space-y-2 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl rounded-tl-sm p-2">
                      <p className="text-white text-xs">
                        Halo! Ada yang bisa saya bantu? 😊
                      </p>
                    </div>
                    <div className="bg-white/90 rounded-xl rounded-tr-sm p-2 ml-6">
                      <p className="text-gray-800 text-xs">
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
                    // y: 0,
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
                  className="absolute top-16 right-8 w-56 bg-white rounded-2xl p-4 shadow-2xl transform rotate-[8deg] z-10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="text-gray-600 text-xs font-bold mb-2">
                    💰 Total Revenue
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-3">
                    Rp 850K
                  </div>
                  <div className="bg-green-50 rounded-xl p-2 mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Transaksi</span>
                      <span className="text-xs font-bold text-green-600">
                        +24
                      </span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-1.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1, delay: 1 }}
                        className="bg-green-500 h-1.5 rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <span>↗ +32% bulan ini</span>
                  </div>
                </motion.div>

                {/* Card 3 - Featured UMKM (Bottom Center-Left) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    // y: 0,
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
                  className="absolute bottom-12 left-16 w-72 bg-linear-to-br from-pink-500 to-orange-500 rounded-2xl p-4 shadow-2xl transform rotate-[-4deg] z-30"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="relative z-10">
                    <div className="text-white/90 text-xs font-bold mb-2">
                      🔥 Featured UMKM
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <Store className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-black text-base">
                          Warung Kopi Asik
                        </div>
                        <div className="text-white/90 text-xs flex items-center space-x-1">
                          <span>⭐ 4.9</span>
                          <span>•</span>
                          <span>📍 0.5 km</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/25 backdrop-blur-md rounded-xl p-2 mb-2">
                      <p className="text-white text-xs font-medium">
                        💡 Kopi terbaik! Promo 30% pelanggan baru
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-1">
                        {["😊", "🎉", "⭐"].map((emoji, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 bg-white/30 rounded-full border-2 border-white flex items-center justify-center text-xs"
                          >
                            {emoji}
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/30 backdrop-blur-sm rounded-full px-2 py-1">
                        <span className="text-white font-bold text-xs">
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
                  className="absolute bottom-24 right-6 bg-linear-to-br from-purple-500 to-indigo-500 rounded-xl p-3 shadow-xl z-20"
                >
                  <div className="text-white font-black text-xl mb-0.5">
                    1000+
                  </div>
                  <div className="text-white/80 text-xs font-semibold">
                    UMKM Aktif
                  </div>
                </motion.div>
              </div>

              {/* Bottom Text */}
              <div className="text-white/60 text-sm mt-8">
                <div className="font-bold text-white mb-2">
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
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                  MapinAja
                </div>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  {mode === "login" ? "WELCOME TO" : "CREATE ACCOUNT"}
                  <br />
                  <span className="bg-green-400 bg-clip-text text-transparent">
                    MAPINAJA
                  </span>
                </h1>
              </div>

              {/* User Type Selection */}
              <div className="mb-6">
                <label className="text-sm font-bold text-gray-700 mb-3 block">
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
                          ? "border-green-400 bg-green-400/5 text-green-400"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
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
                      <label className="text-sm font-bold text-gray-700 block mb-2">
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
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">
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
                    className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">
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
                      className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors pr-12"
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
                      <label className="text-sm font-bold text-gray-700 block mb-2">
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
                        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:border-green-400 focus:outline-none transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={mode === "login" ? handleLogin : handleRegister}
                  disabled={loading}
                  className="w-full py-4 bg-green-400 text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center"
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
                <span className="text-gray-600 text-sm">
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
                  className="text-green-400 font-bold text-sm hover:underline"
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
        <div className="flex justify-center items-center h-screen bg-gray-50">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-green-400 rounded-2xl animate-pulse flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <span className="text-lg font-semibold text-gray-700">
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

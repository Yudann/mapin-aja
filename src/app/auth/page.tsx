// src/app/auth/page.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  MapPin,
  Users,
  Store,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

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
  const searchParams = useSearchParams();

  const initialType = (searchParams.get("type") as UserType) || "customer";

  const [userType, setUserType] = useState<UserType>(initialType);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("type", userType);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [userType]);

  const showToast = (toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 4000);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      const redirectTo =
        userType === "seller" ? "/dashboard/seller" : "/explore";

      // Gunakan origin yang dinamis dari window.location
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${
            window.location.origin
          }/api/auth/callback?user_type=${userType}&redirect=${encodeURIComponent(
            redirectTo
          )}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.error("❌ Google login error:", error);
        showToast({
          title: "Login Gagal",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
      }
      // Don't set loading false on success - user will be redirected
    } catch (error) {
      console.error("❌ Unexpected error:", error);
      showToast({
        title: "Error",
        description: "Terjadi kesalahan yang tidak terduga",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handlePhoneLogin = () => {
    showToast({
      title: "Fitur Dalam Pengembangan",
      description: "Login dengan nomor telepon akan segera hadir!",
      variant: "default",
    });
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
          {/* Left Side - Visual (Tetap sama, tapi lebih rapi) */}
          <div
            className="hidden h-[90%] lg:block lg:w-1/2 rounded-[3rem] p-8 lg:p-12 relative overflow-hidden"
            style={{ backgroundColor: "var(--color-brown-dark)" }}
          >
            {/* Animated Background */}
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

              {/* Stacked Cards - Diperkecil dan lebih rapi */}
              <div className="relative flex-1 flex items-center justify-center perspective-1000 min-h-[400px]">
                {/* Card 1 - Chat (Lebih Kecil) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    x: [0, -2, 0],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute top-8 left-4 w-72 rounded-2xl p-3 shadow-2xl transform -rotate-6 z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--color-brown-accent), #8B6F47)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="text-md font-bold mb-2 flex items-center space-x-2"
                    style={{ color: "var(--color-brown-light)" }}
                  >
                    <div
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: "var(--color-brown-light)" }}
                    />
                    <span>💬 Chat Real-time</span>
                  </div>
                  <div className="space-y-1 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg rounded-tl-sm p-2">
                      <p
                        className="text-md"
                        style={{ color: "var(--color-base-light)" }}
                      >
                        Ada promo hari ini? 🎉
                      </p>
                    </div>
                    <div className="bg-white/90 rounded-lg rounded-tr-sm p-2 ml-4">
                      <p
                        className="text-md"
                        style={{ color: "var(--color-brown-dark)" }}
                      >
                        Ya! Diskon 20% 🎊
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Card 2 - Revenue (Lebih Kecil) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    x: [0, 3, 0],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4,
                    x: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 3.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute top-20 right-6 w-48 rounded-2xl p-3 shadow-2xl transform rotate-[8deg] z-10"
                  style={{
                    backgroundColor: "var(--color-base-light)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div
                    className="text-md font-bold mb-1"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    💰 Revenue
                  </div>
                  <div
                    className="text-2xl font-black mb-2"
                    style={{ color: "var(--color-brown-dark)" }}
                  >
                    Rp 850K
                  </div>
                  <div className="flex items-center space-x-1 text-md">
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: "var(--color-brown-accent)" }}
                    />
                    <span style={{ color: "var(--color-brown-dark)" }}>
                      ↗ +32%
                    </span>
                  </div>
                </motion.div>

                {/* Card 3 - UMKM (Lebih Kecil) */}
                <motion.div
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{
                    opacity: 1,
                    rotateX: 0,
                    x: [0, 1, 0],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6,
                    x: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                    y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute bottom-16 left-12 w-60 rounded-2xl p-3 shadow-2xl transform rotate-[-4deg] z-30"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #8B6F47, var(--color-brown-accent))",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative z-10">
                    <div
                      className="text-md font-bold mb-1"
                      style={{ color: "var(--color-brown-light)" }}
                    >
                      🔥 Warung Kopi Asik
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <Store
                          className="w-4 h-4"
                          style={{ color: "var(--color-base-light)" }}
                        />
                      </div>
                      <div>
                        <div
                          className="font-black text-sm"
                          style={{ color: "var(--color-base-light)" }}
                        >
                          Kopi Special
                        </div>
                        <div
                          className="text-md"
                          style={{ color: "var(--color-brown-light)" }}
                        >
                          ⭐ 4.9 • 📍 0.5 km
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Card 4 - Stats (Lebih Kecil) */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8,
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="absolute bottom-20 right-8 rounded-xl px-8 py-4 shadow-xl z-20"
                  style={{
                    background:
                      "linear-gradient(to bottom right, var(--color-brown-accent), #8B6F47)",
                  }}
                >
                  <div
                    className="font-black text-lg mb-0.5"
                    style={{ color: "var(--color-base-light)" }}
                  >
                    1000+
                  </div>
                  <div
                    className="text-md font-semibold"
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

          {/* Right Side - Form yang Disederhanakan */}
          <div className="lg:w-1/2 px-8 pt-8 lg:px-12 lg:pt-12">
            <div className="w-full mx-auto">
              {/* Header */}
              <div className="mb-8 text-center lg:text-left">
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
                  WELCOME TO
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
                <p className="text-gray-600 mt-4">
                  Pilih role dan login untuk mulai menjelajahi UMKM lokal
                </p>
              </div>

              {/* User Type Selection */}
              <div className="mb-8">
                <label
                  className="text-sm font-bold block mb-4 text-center lg:text-left"
                  style={{ color: "var(--color-brown-dark)" }}
                >
                  Bergabung sebagai:
                </label>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                  {[
                    {
                      id: "customer" as UserType,
                      label: "Customer",
                      icon: Users,
                      description: "Jelajahi UMKM",
                    },
                    {
                      id: "seller" as UserType,
                      label: "Seller UMKM",
                      icon: Store,
                      description: "Kelola bisnis",
                    },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setUserType(type.id)}
                      className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center space-y-2 ${
                        userType === type.id ? "shadow-lg" : "hover:shadow-md"
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
                      <type.icon className="w-6 h-6" />
                      <span className="font-semibold text-sm">
                        {type.label}
                      </span>
                      <span className="text-xs opacity-70 text-center">
                        {type.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Login Buttons */}
              <div className="space-y-4 max-w-md mx-auto lg:mx-0">
                {/* Google Login Button */}
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-4 font-bold rounded-xl border-2 transition-all disabled:opacity-50 flex items-center justify-center space-x-3 hover:shadow-lg group"
                  style={{
                    borderColor: "var(--color-brown-accent)",
                    backgroundColor: "white",
                    color: "var(--color-brown-dark)",
                  }}
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </button>

                {/* Phone Login Button (Dummy) */}
                <button
                  onClick={handlePhoneLogin}
                  disabled={loading}
                  className="w-full py-4 font-bold rounded-xl border-2 transition-all disabled:opacity-50 flex items-center justify-center space-x-3 hover:shadow-lg group opacity-70"
                  style={{
                    borderColor: "#E5E7EB",
                    backgroundColor: "#F9FAFB",
                    color: "#6B7280",
                  }}
                >
                  <Phone className="w-5 h-5" />
                  <span>Continue with Phone</span>
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    Soon
                  </span>
                </button>
              </div>

              {/* Info Text */}
              <div className="mt-8 text-center lg:text-left">
                <p className="text-sm text-gray-600">
                  {userType === "seller"
                    ? "Sebagai seller, Anda akan diarahkan ke proses onboarding setelah login"
                    : "Sebagai customer, Anda bisa langsung menjelajahi UMKM lokal"}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  *Login otomatis mendaftarkan akun baru jika belum terdaftar
                </p>
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

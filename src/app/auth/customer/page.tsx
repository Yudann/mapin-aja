// src/app/auth/customer/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  MapPin,
  Compass,
  Heart,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

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

export default function AuthCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 4000);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      console.log("═══════════════════════════════════");
      console.log("👤 CUSTOMER LOGIN INITIATED");
      console.log("═══════════════════════════════════");

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback/customer`,
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
        className="w-full max-w-7xl rounded-4xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        style={{ backgroundColor: "var(--color-base-light)" }}
      >
        {/* LEFT SIDE - Login Form */}
        <div className="lg:w-1/2 p-8 lg:p-12 flex items-center order-2 lg:order-1">
          <div className="w-full max-w-md mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div
                className="inline-block px-4 py-2 rounded-full mb-4"
                style={{ backgroundColor: "rgba(185, 148, 112, 0.1)" }}
              >
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--color-brown-accent)" }}
                >
                  👤 CUSTOMER
                </span>
              </div>
              <h1
                className="text-4xl font-black mb-3"
                style={{ color: "var(--color-brown-dark)" }}
              >
                Jelajahi UMKM Lokal
              </h1>
              <p className="text-gray-600">
                Temukan produk lokal terbaik di sekitar Anda dan dukung UMKM
                Indonesia
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-4 font-bold rounded-xl border-2 transition-all disabled:opacity-50 flex items-center justify-center space-x-3 hover:shadow-lg mb-6"
              style={{
                borderColor: "var(--color-brown-accent)",
                backgroundColor: "white",
                color: "var(--color-brown-dark)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Menghubungkan...</span>
                </>
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

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Atau</span>
              </div>
            </div>

            {/* Switch to Seller */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Punya UMKM? Daftarkan bisnis Anda
              </p>
              <Link
                href="/auth/seller"
                className="inline-flex items-center space-x-2 text-sm font-semibold hover:underline"
                style={{ color: "var(--color-brown-accent)" }}
              >
                <span>Masuk sebagai Seller</span>
                <span>→</span>
              </Link>
            </div>

            {/* Info */}
            <div className="mt-8 p-4 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-600">
                <strong>Keuntungan Customer:</strong> Langsung akses semua fitur
                tanpa onboarding, jelajahi UMKM terdekat, chat dengan penjual,
                dan simpan favorit.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Customer Features */}
        <div
          className="lg:w-1/2 rounded-t-4xl lg:rounded-r-4xl lg:rounded-tl-none p-8 lg:p-12 relative overflow-hidden order-1 lg:order-2"
          style={{ backgroundColor: "var(--color-brown-dark)" }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{ rotate: [360, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl"
              style={{
                background:
                  "linear-gradient(to bottom right, rgba(185, 148, 112, 0.2), rgba(185, 148, 112, 0.3))",
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

            {/* Customer Features */}
            <div className="flex-1 flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2
                  className="text-4xl font-black mb-4"
                  style={{ color: "var(--color-base-light)" }}
                >
                  Temukan UMKM Favorit Anda
                </h2>
                <p
                  className="text-lg opacity-80"
                  style={{ color: "var(--color-brown-light)" }}
                >
                  Jelajahi ribuan produk lokal berkualitas dari UMKM terdekat
                </p>
              </motion.div>

              {/* Feature Cards */}
              <div className="space-y-4">
                {[
                  {
                    icon: Compass,
                    title: "Jelajahi UMKM",
                    desc: "Temukan UMKM terdekat dengan peta interaktif",
                  },
                  {
                    icon: MessageSquare,
                    title: "Chat Langsung",
                    desc: "Tanya produk langsung ke penjual",
                  },
                  {
                    icon: Heart,
                    title: "Simpan Favorit",
                    desc: "Koleksi UMKM favorit Anda",
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: "var(--color-brown-accent)" }}
                    >
                      <feature.icon
                        className="w-6 h-6"
                        style={{ color: "var(--color-base-light)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-lg mb-1"
                        style={{ color: "var(--color-base-light)" }}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className="text-sm opacity-80"
                        style={{ color: "var(--color-brown-light)" }}
                      >
                        {feature.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div
                    className="text-sm font-semibold opacity-60"
                    style={{ color: "var(--color-brown-light)" }}
                  >
                    Dukung
                  </div>
                  <div
                    className="text-2xl font-black"
                    style={{ color: "var(--color-base-light)" }}
                  >
                    1000+ UMKM Lokal
                  </div>
                </div>
                <div className="text-4xl">🛍️</div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

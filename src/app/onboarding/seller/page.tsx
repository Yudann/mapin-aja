"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Store,
  Tag,
  MapPin,
  Phone,
  FileText,
  Check,
  ArrowRight,
  ArrowLeft,
  Sun,
  Moon,
  Utensils,
  Shirt,
  Wrench,
  Monitor,
  HeartPulse,
  Box,
  ChevronRight,
  Loader2,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

// --- PERBAIKAN: Nilai 'value' disesuaikan dengan ENUM Bahasa Inggris di DB ---
const CATEGORIES = [
  { value: "food_beverage", label: "Makanan & Minuman", icon: Utensils },
  { value: "fashion", label: "Fashion & Pakaian", icon: Shirt },
  { value: "handicraft", label: "Kerajinan", icon: Box },
  { value: "services", label: "Jasa & Layanan", icon: Wrench },
  { value: "retail", label: "Toko Ritel/Umum", icon: ShoppingBag },
  { value: "health_beauty", label: "Kesehatan & Kecantikan", icon: HeartPulse },
  { value: "other", label: "Lainnya", icon: Monitor },
];
// Catatan: Saya mengasumsikan 'handicraft' dan 'services' adalah kategori terpisah.
// Saya menggunakan 'retail' untuk menggantikan 'elektronik' karena ENUM 'retail' lebih umum.

// Helper Components (Menggunakan komponen yang sudah disempurnakan sebelumnya)
const StepHeader = ({ Icon, title, subtitle }) => (
  <motion.div
    className="text-center mb-6 md:mb-8"
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.1, duration: 0.3 }}
  >
    <div className="w-14 h-14 md:w-16 md:h-16 bg-(--color-bg-secondary) rounded-2xl mx-auto flex items-center justify-center mb-3 md:mb-4 border border-(--color-accent)/30 shadow-lg transition-colors duration-500">
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-(--color-accent) transition-colors duration-500" />
    </div>
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-(--color-text-primary) mb-2 leading-tight px-4 transition-colors duration-500">
      {title}
    </h2>
    <p className="text-sm md:text-base text-(--color-text-primary)/70 max-w-lg mx-auto px-4 transition-colors duration-500">
      {subtitle}
    </p>
  </motion.div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-2 border-b border-(--color-text-primary)/10 last:border-b-0 transition-colors duration-500">
    <span className="font-medium w-1/3 text-sm md:text-base text-(--color-text-primary)/70 transition-colors duration-500">
      {label}:
    </span>
    <span className="text-right w-2/3 text-sm md:text-base text-(--color-text-primary) font-semibold transition-colors duration-500">
      {value || "-"}
    </span>
  </div>
);

export default function SellerOnboarding() {
  const [step, setStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const root = window.document.documentElement;
    // Tambahkan transisi halus untuk tema mode gelap
    root.classList.add("transition-colors", "duration-500");

    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    return () => {
      root.classList.remove("dark");
    };
  }, [isDarkMode]);

  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    address: "",
    phone: "",
    description: "",
  });

  const handleNext = () => {
    if (canProceed()) {
      setError("");
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setError("");
      setStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return formData.businessName.trim().length >= 3;
      case 2:
        return formData.category.length > 0;
      case 3:
        return formData.address.trim().length >= 10;
      case 4:
        return /^\+?\d{8,15}$/.test(formData.phone.trim());
      case 5:
        return formData.description.trim().length >= 20;
      case 6:
        return true;
      default:
        return false;
    }
  };

  const selectedCategoryLabel = useMemo(() => {
    return (
      CATEGORIES.find((c) => c.value === formData.category)?.label ||
      "Belum dipilih"
    );
  }, [formData.category]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      // API Route: /api/onboarding
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Menangkap error dari API route, termasuk error 409, 400, 401, 500
        throw new Error(
          data.message || `Gagal menyimpan data (${response.status})`
        );
      }

      console.log("✅ Onboarding success:", data);
      setStep(7); // Pindah ke step Selesai
    } catch (err) {
      console.error("❌ Submit error:", err);
      // Menampilkan pesan error yang lebih jelas
      setError(err.message || "Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const totalSteps = 6;
  const progressPercentage = step > 0 ? (step / totalSteps) * 100 : 0;
  const currentStepNum = step > 0 && step <= totalSteps ? step : 0;

  return (
    // Tambahkan 'transition-colors duration-500' pada div utama untuk smooth mode
    <div className="min-h-screen bg-linear-to-br from-(--color-bg-primary) via-(--color-bg-secondary) to-(--color-bg-primary) flex items-center justify-center p-4 overflow-x-hidden transition-colors duration-500">
      <div className="w-full max-w-3xl">
        {/* Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 md:p-3 rounded-full shadow-xl transition-all duration-300 border border-(--color-text-primary)/10 bg-(--color-bg-secondary) text-(--color-accent) hover:scale-105"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Moon className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>
        </div>

        {/* Main Content */}
        <div className="py-6 md:py-8 px-4">
          {/* Progress Bar */}
          {step > 0 && step <= totalSteps && (
            <div className="mb-6 md:mb-8 pt-2 max-w-lg mx-auto">
              <p className="text-xs md:text-sm font-semibold text-(--color-text-primary)/80 mb-2 text-center transition-colors duration-500">
                Langkah **{currentStepNum}** dari **{totalSteps}**
              </p>
              <div className="h-2 bg-(--color-text-primary)/10 rounded-full overflow-hidden shadow-inner transition-colors duration-500">
                <motion.div
                  className="h-full bg-linear-to-r from-(--color-accent) to-(--color-text-primary) rounded-full transition-colors duration-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-start gap-3 transition-colors duration-500"
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5 transition-colors duration-500" />
              <p className="text-sm text-red-800 dark:text-red-200 transition-colors duration-500">
                {error}
              </p>
            </motion.div>
          )}

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ type: "tween", duration: 0.25 }}
              className="max-w-lg mx-auto"
            >
              {/* Step 0: Welcome */}
              {step === 0 && (
                <div className="text-center space-y-6 py-4">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-(--color-accent) to-(--color-text-primary) rounded-3xl mx-auto flex items-center justify-center transform rotate-3 shadow-2xl transition-colors duration-500">
                    <Store className="w-10 h-10 md:w-12 md:h-12 text-(--color-bg-secondary) transform -rotate-3 transition-colors duration-500" />
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-(--color-text-primary) leading-tight px-4 transition-colors duration-500">
                    Siap Kembangkan UMKM Anda di{" "}
                    <span className="text-(--color-accent) transition-colors duration-500">
                      MapinAja
                    </span>
                    ? 👋
                  </h1>
                  <p className="text-base md:text-lg text-(--color-text-primary)/80 max-w-md mx-auto px-4 transition-colors duration-500">
                    Daftarkan toko Anda dalam **6 langkah cepat**. Kami akan
                    memandu Anda untuk terhubung dengan lebih banyak pelanggan.
                  </p>
                  <motion.button
                    onClick={handleNext}
                    className="mt-4 w-full max-w-xs px-8 py-3 md:py-4 bg-(--color-accent) text-white rounded-full font-bold text-base md:text-lg hover:bg-(--color-text-primary) transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 mx-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Mulai Pendaftaran <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* Step 1: Business Name */}
              {step === 1 && (
                <div className="space-y-4 md:space-y-6">
                  <StepHeader
                    Icon={Store}
                    title="Identitas Toko Anda"
                    subtitle="Apa nama UMKM atau brand Anda? Pastikan mudah diingat dan unik."
                  />
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    placeholder="Contoh: Kedai Kopi Senja"
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-lg md:text-xl border-2 border-(--color-text-primary)/20 rounded-xl focus:border-(--color-accent) focus:ring-4 focus:ring-(--color-accent)/30 focus:outline-none transition-all shadow-md text-(--color-text-primary) bg-(--color-bg-secondary) placeholder-(--color-text-primary)/40"
                    autoFocus
                  />
                  {formData.businessName.length > 0 &&
                    formData.businessName.trim().length < 3 && (
                      <p className="text-red-500 text-xs md:text-sm font-medium">
                        Nama UMKM minimal 3 karakter.
                      </p>
                    )}
                </div>
              )}

              {/* Step 2: Category */}
              {step === 2 && (
                <div className="space-y-4 md:space-y-6">
                  <StepHeader
                    Icon={Tag}
                    title={`Hebat, ${formData.businessName || "Toko"}! ✨`}
                    subtitle="Pilih kategori yang paling sesuai agar pelanggan tepat sasaran menemukan produk Anda."
                  />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() =>
                          setFormData({ ...formData, category: cat.value })
                        }
                        className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center justify-center space-y-1 md:space-y-2 h-full group ${
                          formData.category === cat.value
                            ? "border-(--color-accent) bg-(--color-bg-primary) shadow-lg scale-[1.02] ring-4 ring-(--color-accent)/30"
                            : "border-(--color-text-primary)/10 bg-(--color-bg-secondary) hover:border-(--color-accent) hover:shadow-md"
                        }`}
                      >
                        <cat.icon
                          className={`w-7 h-7 md:w-9 md:h-9 text-(--color-accent) transition-all duration-300 ${
                            formData.category === cat.value
                              ? "scale-110"
                              : "group-hover:scale-110"
                          }`}
                        />
                        <div className="text-xs md:text-sm font-bold leading-tight text-(--color-text-primary) transition-colors duration-300">
                          {cat.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Address */}
              {step === 3 && (
                <div className="space-y-4 md:space-y-6">
                  <StepHeader
                    Icon={MapPin}
                    title="Lokasi Usaha Anda"
                    subtitle="Tuliskan alamat lengkap lokasi fisik Anda."
                  />
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Contoh: Jl. Merdeka Raya Blok B No. 12, Kel. Sukamaju"
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-2 border-(--color-text-primary)/20 rounded-xl focus:border-(--color-accent) focus:ring-4 focus:ring-(--color-accent)/30 focus:outline-none transition-all shadow-md text-(--color-text-primary) bg-(--color-bg-secondary) placeholder-(--color-text-primary)/40 resize-none"
                    rows={4}
                    autoFocus
                  />
                  {formData.address.length > 0 &&
                    formData.address.trim().length < 10 && (
                      <p className="text-red-500 text-xs md:text-sm font-medium">
                        Alamat minimal 10 karakter.
                      </p>
                    )}
                </div>
              )}

              {/* Step 4: Phone */}
              {step === 4 && (
                <div className="space-y-4 md:space-y-6">
                  <StepHeader
                    Icon={Phone}
                    title="Nomor Kontak Aktif"
                    subtitle="Masukkan nomor WhatsApp/Telepon yang dapat dihubungi pelanggan Anda."
                  />
                  <div className="flex items-center border-2 border-(--color-text-primary)/20 rounded-xl focus-within:border-(--color-accent) focus-within:ring-4 focus-within:ring-(--color-accent)/30 transition-all shadow-md bg-(--color-bg-secondary) text-(--color-text-primary)">
                    <span className="px-3 md:px-4 text-lg md:text-xl opacity-70 font-mono transition-colors duration-300">
                      +62
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/[^0-9+]/g, ""),
                        })
                      }
                      placeholder="81234567890"
                      className="w-full px-2 py-3 md:py-4 text-lg md:text-xl rounded-r-xl focus:outline-none bg-transparent transition-colors duration-300"
                      autoFocus
                    />
                  </div>
                  {!canProceed() && formData.phone.length > 0 && (
                    <p className="text-red-500 text-xs md:text-sm font-medium">
                      Format nomor telepon tidak valid. Gunakan 8-15 digit.
                    </p>
                  )}
                </div>
              )}

              {/* Step 5: Description */}
              {step === 5 && (
                <div className="space-y-4 md:space-y-6">
                  <StepHeader
                    Icon={FileText}
                    title="Ceritakan Tentang Toko Anda"
                    subtitle="Deskripsikan keunikan, spesialisasi, atau layanan utama Anda. (Minimal 20 karakter)"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Contoh: Kami menyediakan kopi premium dari petani lokal dengan suasana cozy untuk nongkrong..."
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-2 border-(--color-text-primary)/20 rounded-xl focus:border-(--color-accent) focus:ring-4 focus:ring-(--color-accent)/30 focus:outline-none transition-all shadow-md text-(--color-text-primary) bg-(--color-bg-secondary) placeholder-(--color-text-primary)/40 resize-none"
                    rows={5}
                    autoFocus
                  />
                  {formData.description.length > 0 &&
                    formData.description.trim().length < 20 && (
                      <p className="text-red-500 text-xs md:text-sm font-medium">
                        Deskripsi minimal 20 karakter. Saat ini:{" "}
                        {formData.description.trim().length} karakter.
                      </p>
                    )}
                </div>
              )}

              {/* Step 6: Review */}
              {step === 6 && (
                <div className="space-y-6 md:space-y-8">
                  <StepHeader
                    Icon={Check}
                    title="Tinjau Data Anda"
                    subtitle="Pastikan semua informasi sudah benar sebelum menyelesaikan pendaftaran."
                  />
                  <div className="bg-(--color-bg-secondary) rounded-xl p-4 md:p-6 border-l-4 border-(--color-accent) shadow-xl transition-colors duration-500">
                    <h3 className="text-lg md:text-xl font-bold text-(--color-text-primary) mb-3 md:mb-4 flex items-center gap-2 transition-colors duration-500">
                      <Store className="w-5 h-5 text-(--color-accent) transition-colors duration-500" />{" "}
                      Detail Toko:
                    </h3>
                    <div className="space-y-2 md:space-y-3">
                      <DetailRow
                        label="Nama Toko"
                        value={formData.businessName}
                      />
                      <DetailRow
                        label="Kategori"
                        value={selectedCategoryLabel}
                      />
                      <DetailRow
                        label="Alamat"
                        value={
                          formData.address.substring(0, 60) +
                          (formData.address.length > 60 ? "..." : "")
                        }
                      />
                      <DetailRow
                        label="Telepon"
                        value={`+62 ${formData.phone}`}
                      />
                      <DetailRow
                        label="Deskripsi"
                        value={
                          formData.description.substring(0, 60) +
                          (formData.description.length > 60 ? "..." : "")
                        }
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Success */}
              {step === 7 && (
                <div className="text-center space-y-6 md:space-y-8 py-4">
                  <motion.div
                    className="w-20 h-20 md:w-24 md:h-24 bg-linear-to-br from-(--color-success) to-green-600 rounded-full mx-auto flex items-center justify-center shadow-2xl transition-colors duration-500"
                    initial={{ scale: 0.5, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  >
                    <Check className="w-10 h-10 md:w-14 md:h-14 text-white" />
                  </motion.div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-(--color-text-primary) leading-tight px-4 transition-colors duration-500">
                    🎉 Pendaftaran Selesai!
                  </h1>
                  <p className="text-base md:text-lg text-(--color-text-primary)/80 max-w-md mx-auto px-4 transition-colors duration-500">
                    Selamat datang di keluarga MapinAja! Toko Anda akan segera
                    aktif. Mari kembangkan bisnis Anda.
                  </p>
                  <motion.button
                    onClick={() => (window.location.href = "/dashboard/seller")}
                    className="mt-4 w-full max-w-xs px-8 py-3 md:py-4 bg-linear-to-r from-(--color-accent) to-(--color-text-primary) text-white rounded-full font-bold text-base md:text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-2 mx-auto"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Masuk ke Dashboard <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {step > 0 && step <= totalSteps && (
            <div className="flex gap-3 md:gap-4 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-(--color-text-primary)/10 max-w-lg mx-auto transition-colors duration-500">
              {step > 1 && (
                <button
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-(--color-text-primary)/20 rounded-full font-semibold text-sm md:text-base text-(--color-text-primary)/80 hover:border-(--color-accent)/50 transition-colors duration-300 flex items-center gap-2 bg-(--color-bg-secondary) hover:shadow-md disabled:opacity-50"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali
                </button>
              )}

              <button
                onClick={step === totalSteps ? handleSubmit : handleNext}
                disabled={!canProceed() || isSubmitting}
                className={`flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-full font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  canProceed() && !isSubmitting
                    ? "bg-(--color-accent) text-white hover:opacity-90 shadow-lg"
                    : "bg-(--color-text-primary)/10 text-(--color-text-primary)/50 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />{" "}
                    Menyimpan...
                  </>
                ) : (
                  <>
                    {step === totalSteps ? (
                      <>
                        Selesaikan <Check className="w-4 h-4 md:w-5 md:h-5" />
                      </>
                    ) : (
                      <>
                        Lanjut <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                      </>
                    )}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

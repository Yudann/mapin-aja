// app/dashboard/seller/components/StoreStatusToggle.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Store, Clock, CheckCircle, XCircle } from "lucide-react";

export default function StoreStatusToggle() {
  const [isOpen, setIsOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <>
      <motion.div
        className="p-6 bg-white border-2 border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Info */}
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                isOpen
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              <Store className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-lg text-gray-800 mb-1">
                Status Toko
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                {isOpen
                  ? "Toko kamu sedang buka dan dapat dilihat pelanggan."
                  : "Toko sedang tutup, pelanggan tidak dapat melihat toko ini."}
              </p>
              {isOpen && (
                <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Tutup jam 22:00</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Toggle */}
          <div className="flex items-center gap-4">
            {/* Custom Toggle Switch */}
            <button
              onClick={handleToggle}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                isOpen ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{
                  x: isOpen ? 32 : 0,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>

            {/* Status Label */}
            <div className="flex items-center gap-2">
              {isOpen ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span
                className={`font-bold text-base ${
                  isOpen ? "text-green-600" : "text-red-500"
                }`}
              >
                {isOpen ? "Buka" : "Tutup"}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <motion.div
          className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm ${
            isOpen
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
          {isOpen ? "Toko Aktif & Terlihat" : "Toko Tidak Terlihat"}
        </motion.div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-6 left-1/2 z-50 px-6 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl flex items-center gap-3"
          >
            {isOpen ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <span className="font-semibold">
              Toko kamu sekarang{" "}
              <span className={isOpen ? "text-green-400" : "text-red-400"}>
                {isOpen ? "Buka" : "Tutup"}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

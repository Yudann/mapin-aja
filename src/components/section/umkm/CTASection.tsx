// src\components\section\umkm\CTASection.tsx

import React from "react";
import { Store, ChevronRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="bg-linear-to-r from-brown-dark to-brown-accent py-16 mt-12">
      <div className="max-w-4xl mx-auto text-center px-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
          <Store className="w-5 h-5 text-white" />
          <span className="text-sm font-bold text-white">
            UNTUK PEMILIK UMKM
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
          Punya UMKM? Daftar Sekarang!
        </h2>
        <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
          Bergabung dengan ribuan UMKM lainnya dan jangkau lebih banyak
          pelanggan. Gratis pendaftaran!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-white text-brown-dark rounded-xl font-bold text-base hover:shadow-2xl transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2">
            <span>Daftar UMKM Saya</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-xl font-bold text-base hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2">
            <span>Pelajari Lebih Lanjut</span>
          </button>
        </div>
      </div>
    </section>
  );
}

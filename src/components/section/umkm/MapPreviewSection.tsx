// src\components\section\umkm\SimpleMapSection.tsx

import React from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function MapSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl p-6 text-center">
        <div className="w-16 h-16 bg-linear-to-br from-brown-accent to-brown-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-xl font-bold text-brown-dark mb-2">
          Lihat UMKM di Sekitar Anda
        </h3>

        <p className="text-brown-dark/60 text-sm mb-6 max-w-md mx-auto">
          Jelajahi peta untuk menemukan UMKM terdekat dengan lokasi yang tepat
        </p>

        <Link
          href="/umkm/map"
          className="px-8 cursor-pointer py-3 bg-linear-to-r from-brown-accent to-brown-dark text-white rounded-xl font-bold hover:shadow-lg transition-all inline-flex items-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          <span>Buka Peta</span>
        </Link>
      </div>
    </section>
  );
}

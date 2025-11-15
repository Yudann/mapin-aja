// src\components\section\umkm\CitiesSection.tsx

import React from "react";
import { ChevronRight } from "lucide-react";
import { CITIES } from "@/data/umkm";

export default function CitiesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold text-brown-dark mb-4">
        Kota-kota yang ada MapinAja
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {CITIES.map((city) => (
          <button
            key={city}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-brown-dark hover:border-brown-accent hover:bg-brown-light transition-all"
          >
            {city}
          </button>
        ))}
      </div>
      <button className="mt-4 text-sm font-semibold text-brown-accent hover:text-brown-dark flex items-center gap-1">
        Tampilkan semua kota
        <ChevronRight className="w-4 h-4" />
      </button>
    </section>
  );
}

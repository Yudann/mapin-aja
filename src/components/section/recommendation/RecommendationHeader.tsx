// src\components\section\recommendation\RecommendationHeader.tsx

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function RecommendationHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/umkm"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brown-light transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-brown-dark" />
        </Link>

        <div className="text-center flex-1 mx-4">
          <h1 className="text-base font-black text-brown-dark">Rekomendasi</h1>
        </div>

        <button
          onClick={() => (window.location.href = "/umkm")}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-brown-light transition-colors"
        >
          <Home className="w-5 h-5 text-brown-dark" />
        </button>
      </div>
    </header>
  );
}

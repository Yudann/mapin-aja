// src\components\section\umkm\WhyChooseSection.tsx

import React from "react";
import { Store, Navigation, Tag, Zap } from "lucide-react";

export default function WhyChooseSection() {
  const features = [
    {
      title: "20,000+ UMKM baru setiap menitnya",
      icon: Store,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Delivery atau ambil sendiri di UMKM",
      icon: Navigation,
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Belanja apa aja, promonya ada",
      icon: Tag,
      color: "from-pink-500 to-rose-600",
    },
    {
      title: "Diantar dengan aman & cepat",
      icon: Zap,
      color: "from-orange-500 to-red-600",
    },
  ];

  return (
    <section className="bg-brown-light py-12 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-brown-dark text-center mb-8">
          Kenapa beli pakai MapinAja?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center`}
                >
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <p className="text-sm font-bold text-brown-dark leading-snug">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

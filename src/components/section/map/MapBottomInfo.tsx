// src\components\section\map\MapBottomInfo.tsx

import React from "react";
import { Store, ChevronRight } from "lucide-react";
import { DUMMY_UMKMS } from "@/data/umkm";

export default function MapBottomInfo() {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-40">
      <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-brown-accent to-brown-dark rounded-xl flex items-center justify-center">
            <Store className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-brown-dark/60 font-medium">
              Tersedia di peta
            </p>
            <p className="text-lg font-black text-brown-dark">
              {DUMMY_UMKMS.length} UMKM
            </p>
          </div>
        </div>
        <ChevronRight className="w-6 h-6 text-brown-accent" />
      </div>
    </div>
  );
}

// src\components\section\umkm-detail\UmkmDetailFooter.tsx

import React from "react";
import { MessageCircle, Navigation } from "lucide-react";

export default function UmkmDetailFooter() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 shadow-lg">
      <div className="flex gap-3 max-w-2xl mx-auto">
        <button className="flex-1 py-4 bg-linear-to-r from-brown-accent to-brown-dark text-white rounded-xl font-bold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span>Chat Penjual</span>
        </button>
        <button className="px-6 py-4 bg-brown-light border-2 border-brown-accent text-brown-accent rounded-xl font-bold hover:bg-brown-accent hover:text-white transition-all flex items-center justify-center">
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

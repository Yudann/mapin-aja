// src\components\section\map\MapFiltersModal.tsx

import React from "react";
import { X } from "lucide-react";

interface MapFiltersModalProps {
  onClose: () => void;
}

export default function MapFiltersModal({ onClose }: MapFiltersModalProps) {
  return (
    <div
      className="absolute inset-0 bg-black/50 z-50 flex items-end sm:items-center sm:justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-96 sm:rounded-3xl rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-brown-dark">Filter Peta</h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-brown-dark" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brown-dark mb-2">
              Kategori
            </label>
            <select className="w-full px-4 py-3 bg-brown-light border border-brown-accent/30 rounded-xl text-brown-dark focus:outline-none focus:ring-2 focus:ring-brown-accent">
              <option>Semua Kategori</option>
              <option>Kuliner</option>
              <option>Kafe & Minuman</option>
              <option>Fashion</option>
              <option>Kerajinan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-dark mb-2">
              Status
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-brown-accent"
                />
                <span className="text-sm text-brown-dark">Buka Sekarang</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-brown-accent"
                />
                <span className="text-sm text-brown-dark">Terverifikasi</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-brown-dark mb-2">
              Jarak Maksimal
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              className="w-full accent-brown-accent"
            />
            <div className="flex justify-between text-xs text-brown-dark/60 mt-1">
              <span>0 km</span>
              <span>10 km</span>
            </div>
          </div>

          <button className="w-full py-4 bg-linear-to-r from-brown-accent to-brown-dark text-white rounded-xl font-bold hover:shadow-lg transition-all">
            Terapkan Filter
          </button>

          <button
            onClick={onClose}
            className="w-full py-4 bg-white border-2 border-brown-accent text-brown-accent rounded-xl font-bold hover:bg-brown-light transition-all"
          >
            Reset Filter
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import {
  ChevronRight,
  Navigation,
  TrendingUp,
  Tag,
  Zap,
  Heart,
  Clock,
  LucideIcon, // Import tipe LucideIcon untuk pengetikan yang lebih baik
} from "lucide-react";
// Impor ini sekarang akan merujuk ke file UMKMRecommendationCard.tsx yang baru dibuat
import { QuickFilter, UMKM } from "@/types/umkm";
import UMKMRecommendationCard from "./UMKMRecommendationCard";

interface UMKMHorizontalListProps {
  filter: QuickFilter;
  umkms: UMKM[];
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
  scrollRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

export default function UMKMHorizontalList({
  filter,
  umkms,
  favorites,
  toggleFavorite,
  scrollRefs,
}: UMKMHorizontalListProps) {
  // Gunakan Record<string, LucideIcon> untuk memastikan tipe Icon adalah komponen React
  const iconMap: Record<string, LucideIcon> = {
    // Referensikan langsung ikon yang sudah diimpor, yang sebelumnya menyebabkan error require()
    Navigation: Navigation,
    TrendingUp: TrendingUp,
    Tag: Tag,
    Zap: Zap,
    Heart: Heart,
    Clock: Clock,
  };

  // Ambil komponen ikon, dengan fallback ke Zap jika tidak ditemukan (untuk berjaga-jaga)
  const Icon = iconMap[filter.icon] || Zap;

  return (
    <div
      ref={(el) => (scrollRefs.current[filter.id] = el)}
      className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
    >
      {umkms.map((umkm) => (
        <UMKMRecommendationCard
          key={umkm.id}
          umkm={umkm}
          isFavorite={favorites.has(umkm.id)}
          onToggleFavorite={toggleFavorite}
        />
      ))}

      <div
        onClick={() => (window.location.href = `/umkm?filter=${filter.id}`)}
        className="shrink-0 w-64 sm:w-72 bg-linear-to-br from-brown-light to-white rounded-2xl border-2 border-dashed border-brown-accent/40 flex flex-col items-center justify-center p-8 snap-start cursor-pointer hover:border-brown-accent hover:shadow-lg transition-all group/see-all"
      >
        <div
          className={`w-16 h-16 mb-4 rounded-2xl bg-linear-to-br ${filter.color} flex items-center justify-center shadow-lg transform group-hover/see-all:rotate-12 group-hover/see-all:scale-110 transition-transform`}
        >
          {/* Ikon digunakan di sini */}
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h4 className="text-lg font-black text-brown-dark mb-2">Lihat Semua</h4>
        <p className="text-sm text-brown-dark/60 text-center mb-4">
          {umkms.length}+ UMKM
          <br />
          menanti untuk dipilih
        </p>
        <div className="flex items-center gap-2 text-brown-accent font-bold text-sm group-hover/see-all:gap-3 transition-all">
          <span>Jelajahi</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

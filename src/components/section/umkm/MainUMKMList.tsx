// src\components\section\umkm\MainUMKMList.tsx

import React from "react";
import { useRouter } from "next/navigation";
import UMKMListCard from "./UMKMListCard";
import { UMKM } from "@/types/umkm";

interface MainUMKMListProps {
  selectedFilter: string;
  filteredUmkms: UMKM[];
  favorites: Set<string>;
  toggleFavorite: (id: string) => void;
}

export default function MainUMKMList({
  selectedFilter,
  filteredUmkms,
  favorites,
  toggleFavorite,
}: MainUMKMListProps) {
  const router = useRouter();

  const getSectionTitle = () => {
    switch (selectedFilter) {
      case "terdekat":
        return "Apa aja nih yang enak di sekitar Anda?";
      case "terlaris":
        return "UMKM Terlaris di Daerah Anda";
      case "hemat":
        return "Menu Hemat Untuk Kantong Anda";
      case "cepat":
        return "Cepat Sampai, Cepat Kenyang";
      case "favorit":
        return "Favorit Banyak Orang";
      case "buka":
        return "Buka Kapan Aja, Mau Jam Berapa Aja";
      default:
        return "UMKM Terdekat";
    }
  };

  const handleCardClick = (umkmId: string) => {
    router.push(`/umkm/${umkmId}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-brown-dark mb-2">
          {getSectionTitle()}
        </h2>
        <p className="text-sm text-brown-dark/60">
          Yuk, dicek koleksi UMKM populer, favoritnya foodies lokal, dan
          penawaran terbaik kami di lokasimu!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredUmkms.map((umkm) => (
          <UMKMListCard
            key={umkm.id}
            umkm={umkm}
            isFavorite={favorites.has(umkm.id)}
            onToggleFavorite={toggleFavorite}
            onClick={() => handleCardClick(umkm.id)}
          />
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="px-8 py-3 bg-white border-2 border-brown-accent text-brown-accent rounded-xl font-bold hover:bg-brown-light transition-all">
          Muat Lebih Banyak
        </button>
      </div>
    </section>
  );
}

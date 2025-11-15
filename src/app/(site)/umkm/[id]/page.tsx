// src\app\(site)\umkm\[id]\page.tsx

"use client";

import React, { useState } from "react";
import UmkmDetailHeader from "@/components/section/umkm-detail/UmkmDetailHeader";
import UmkmDetailInfo from "@/components/section/umkm-detail/UmkmDetailInfo";
import UmkmDetailTabs from "@/components/section/umkm-detail/UmkmDetailTabs";
import UmkmDetailFooter from "@/components/section/umkm-detail/UmkmDetailFooter";
import { UMKM_DETAIL_DATA } from "@/data/umkm-detail";

export default function UmkmDetailPage() {
  const [activeTab, setActiveTab] = useState<"produk" | "ulasan" | "info">(
    "produk"
  );
  const [isFavorite, setIsFavorite] = useState(UMKM_DETAIL_DATA.isFavorite);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  return (
    <div className="min-h-screen bg-white">
      <UmkmDetailHeader
        umkm={UMKM_DETAIL_DATA}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite(!isFavorite)}
      />

      <div className="px-4 py-4">
        <UmkmDetailInfo umkm={UMKM_DETAIL_DATA} />

        <UmkmDetailTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          umkm={UMKM_DETAIL_DATA}
        />
      </div>

      <UmkmDetailFooter />
    </div>
  );
}

// src\components\section\umkm-detail\UmkmDetailTabs.client.tsx

"use client";

import React, { useState } from "react";
import ProductsTab from "./tabs/ProductsTab";
import ReviewsTab from "./tabs/ReviewsTab";
import InfoTab from "./tabs/InfoTab";
import { UMKM } from "@/types/umkm";

interface UmkmDetailTabsProps {
  umkm: UMKM;
}

export default function UmkmDetailTabsClient({ umkm }: UmkmDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<"produk" | "ulasan" | "info">(
    "produk"
  );
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  return (
    <>
      <div className="flex border-b border-gray-200 mb-6">
        <TabButton
          active={activeTab === "produk"}
          onClick={() => setActiveTab("produk")}
          label="Produk/Layanan"
        />
        <TabButton
          active={activeTab === "ulasan"}
          onClick={() => setActiveTab("ulasan")}
          label={`Ulasan (${umkm.reviewCount})`}
        />
        <TabButton
          active={activeTab === "info"}
          onClick={() => setActiveTab("info")}
          label="Informasi"
        />
      </div>

      <div className="pb-24">
        {activeTab === "produk" && (
          <ProductsTab
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            umkm={umkm}
          />
        )}
        {activeTab === "ulasan" && <ReviewsTab umkm={umkm} />}
        {activeTab === "info" && <InfoTab umkm={umkm} />}
      </div>
    </>
  );
}

function TabButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-sm font-bold transition-colors relative ${
        active ? "text-brown-dark" : "text-brown-dark/40"
      }`}
    >
      {label}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brown-accent" />
      )}
    </button>
  );
}

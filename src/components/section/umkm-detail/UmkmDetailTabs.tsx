// src\components\section\umkm-detail\UmkmDetailTabs.tsx

import React from "react";
import { UMKM } from "@/types/umkm";
import ProductsTab from "./tabs/ProductsTab";
import ReviewsTab from "./tabs/ReviewsTab";
import InfoTab from "./tabs/InfoTab";

interface UmkmDetailTabsProps {
  activeTab: "produk" | "ulasan" | "info";
  onTabChange: (tab: "produk" | "ulasan" | "info") => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  umkm: UMKM;
}

export default function UmkmDetailTabs({
  activeTab,
  onTabChange,
  selectedCategory,
  onCategoryChange,
  umkm,
}: UmkmDetailTabsProps) {
  return (
    <>
      <div className="flex border-b border-gray-200 mb-6">
        <TabButton
          active={activeTab === "produk"}
          onClick={() => onTabChange("produk")}
          label="Produk/Layanan"
        />
        <TabButton
          active={activeTab === "ulasan"}
          onClick={() => onTabChange("ulasan")}
          label={`Ulasan (${umkm.reviewCount})`}
        />
        <TabButton
          active={activeTab === "info"}
          onClick={() => onTabChange("info")}
          label="Informasi"
        />
      </div>

      <div className="pb-24">
        {activeTab === "produk" && (
          <ProductsTab
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
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

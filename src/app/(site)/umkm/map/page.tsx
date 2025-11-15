// src\app\(site)\umkm\map\page.tsx

"use client";

import React, { useState, useEffect } from "react";
import MapContainer from "@/components/section/map/MapContainer";
import MapTopBar from "@/components/section/map/MapTopBar";
import MapFloatingActions from "@/components/section/map/MapFloatingActions";
import MapBottomInfo from "@/components/section/map/MapBottomInfo";
import MapBottomSheet from "@/components/section/map/MapBottomSheet";
import MapFiltersModal from "@/components/section/map/MapFiltersModal";

export default function UmkmMapPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUmkm, setSelectedUmkm] = useState<any>(null);
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Prevent body scroll when component mounts
  useEffect(() => {
    // Add overflow-hidden to body and html
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
    setTimeout(() => setSelectedUmkm(null), 300);
  };

  return (
    <div className="fixed inset-0 h-screen w-full overflow-hidden bg-gray-100">
      <MapContainer
        selectedUmkm={selectedUmkm}
        onUmkmSelect={(umkm) => {
          setSelectedUmkm(umkm);
          setShowBottomSheet(true);
          setIsExpanded(false);
        }}
      />

      <MapTopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onShowFilters={() => setShowFilters(true)}
      />

      <MapFloatingActions />

      {!showBottomSheet && <MapBottomInfo />}

      {showBottomSheet && selectedUmkm && (
        <MapBottomSheet
          umkm={selectedUmkm}
          isExpanded={isExpanded}
          onToggleExpand={() => setIsExpanded(!isExpanded)}
          onClose={handleCloseBottomSheet}
        />
      )}

      {showFilters && <MapFiltersModal onClose={() => setShowFilters(false)} />}
    </div>
  );
}

// src\components\section\umkm\UmkmSearchBar.tsx

"use client";

import React, { useState, useCallback } from "react";
import { Search, X } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UmkmSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function UmkmSearchBar({
  onSearch,
  placeholder = "Cari UMKM, kategori, atau lokasi...",
}: UmkmSearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery);
      onSearch(searchQuery);
    },
    [onSearch]
  );

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-dark/60" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-brown-dark placeholder:text-brown-dark/40 text-base font-medium focus:outline-none focus:ring-4 focus:ring-brown-accent/30 shadow-xl border border-gray-200"
      />
      {query && (
        <button
          onClick={clearSearch}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown-dark/40 hover:text-brown-dark transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

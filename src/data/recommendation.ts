// src\data\recommendation.ts

import { UMKM, QuickFilter } from "@/types/umkm";
import { DUMMY_UMKMS } from "./umkm";

// Use the same UMKM data from umkm.ts
export const RECOMMENDATION_UMKMS: UMKM[] = DUMMY_UMKMS;

export const RECOMMENDATION_FILTERS: QuickFilter[] = [
  {
    id: "terdekat",
    label: "Terdekat",
    icon: "Navigation",
    emoji: "📍",
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "terlaris",
    label: "Terlaris",
    icon: "TrendingUp",
    emoji: "🔥",
    color: "from-orange-500 to-red-600",
  },
  {
    id: "hemat",
    label: "Menu Hemat",
    icon: "Tag",
    emoji: "💰",
    color: "from-green-500 to-emerald-600",
  },
  {
    id: "cepat",
    label: "Paling Cepat",
    icon: "Zap",
    emoji: "⚡",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: "favorit",
    label: "Terfavorit",
    icon: "Heart",
    emoji: "❤️",
    color: "from-pink-500 to-rose-600",
  },
  {
    id: "buka",
    label: "24 Jam",
    icon: "Clock",
    emoji: "🌙",
    color: "from-purple-500 to-violet-600",
  },
];
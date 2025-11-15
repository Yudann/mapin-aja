// src\utils\umkm.ts

import { UMKM } from "@/types/umkm";
import { DUMMY_UMKMS } from "@/data/umkm";

export function getUmkmById(id: string): UMKM | null {
  return DUMMY_UMKMS.find(umkm => umkm.id === id) || null;
}

export function getAllUmkm(): UMKM[] {
  return DUMMY_UMKMS;
}

export function getUmkmByCategory(category: string): UMKM[] {
  return DUMMY_UMKMS.filter(umkm => 
    umkm.category.toLowerCase().includes(category.toLowerCase())
  );
}
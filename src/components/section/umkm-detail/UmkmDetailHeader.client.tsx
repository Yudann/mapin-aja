// src\components\section\umkm-detail\UmkmDetailHeader.client.tsx

"use client";

import React, { useState } from "react";
import { UMKM } from "@/types/umkm";
import UmkmDetailHeader from "./UmkmDetailHeader";

interface UmkmDetailHeaderClientProps {
  umkm: UMKM;
}

export default function UmkmDetailHeaderClient({
  umkm,
}: UmkmDetailHeaderClientProps) {
  const [isFavorite, setIsFavorite] = useState(umkm.isFavorite || false);

  return (
    <UmkmDetailHeader
      umkm={umkm}
      isFavorite={isFavorite}
      onToggleFavorite={() => setIsFavorite(!isFavorite)}
    />
  );
}

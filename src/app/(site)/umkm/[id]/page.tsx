// src\app\(site)\umkm\[id]\page.tsx

import React from "react";
import { notFound } from "next/navigation";
import UmkmDetailInfo from "@/components/section/umkm-detail/UmkmDetailInfo";
import UmkmDetailFooter from "@/components/section/umkm-detail/UmkmDetailFooter";
import { getUmkmById } from "@/utils/umkm";
import UmkmDetailTabsClient from "@/components/section/umkm-detail/UmkmDetailTabs.client";
import UmkmDetailHeaderClient from "@/components/section/umkm-detail/UmkmDetailHeader.client";

interface UmkmDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UmkmDetailPage({ params }: UmkmDetailPageProps) {
  // Await the params
  const { id } = await params;

  // Get UMKM data by ID
  const umkm = getUmkmById(id);

  // Jika UMKM tidak ditemukan, tampilkan 404
  if (!umkm) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <UmkmDetailHeaderClient umkm={umkm} />

      <div className="px-4 py-4">
        <UmkmDetailInfo umkm={umkm} />

        <UmkmDetailTabsClient umkm={umkm} />
      </div>

      <UmkmDetailFooter />
    </div>
  );
}

// Generate static params untuk SSG
export async function generateStaticParams() {
  const { DUMMY_UMKMS } = await import("@/data/umkm");

  return DUMMY_UMKMS.map((umkm) => ({
    id: umkm.id,
  }));
}

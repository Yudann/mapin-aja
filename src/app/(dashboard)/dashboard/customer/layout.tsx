// src\app\(dashboard)\dashboard\customer\layout.tsx

import LayoutClient from "@/components/layout/dashboard/LayoutClient";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// Ganti import dari CustomerLayoutClient spesifik

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Customer - MapinAja",
  description: "Temukan UMKM terbaik di sekitar Anda",
};

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      {/* Ganti CustomerLayoutClient dengan LayoutClient yang baru */}
      <LayoutClient>{children}</LayoutClient>
    </div>
  );
}

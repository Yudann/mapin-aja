// src\app\(dashboard)\dashboard\seller\layout.tsx

import LayoutClient from "@/components/layout/dashboard/LayoutClient";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard Seller - MapinAja",
  description: "Dashboard untuk seller UMKM MapinAja",
};

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <LayoutClient>{children}</LayoutClient>
    </div>
  );
}

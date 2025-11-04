// src\app\(dashboard)\dashboard\seller\layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SellerLayoutClient from "./components/SellerLayoutClient";

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
      <SellerLayoutClient>{children}</SellerLayoutClient>
    </div>
  );
}

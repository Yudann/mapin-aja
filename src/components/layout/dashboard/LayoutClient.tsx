"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutDashboard,
  Store,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  Home,
  Compass,
  Heart,
  User,
  StoreIcon,
  LucideIcon,
} from "lucide-react";

// Tipe untuk item menu
interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

// Data Menu dan Konfigurasi untuk Customer
const customerMenuItems: MenuItem[] = [
  { name: "Beranda", path: "/dashboard/customer", icon: Home },
  { name: "Jelajah", path: "/dashboard/customer/explore", icon: Compass },
  { name: "Pesan", path: "/dashboard/customer/chats", icon: MessageSquare },
  { name: "Favorit", path: "/dashboard/customer/favorites", icon: Heart },
  { name: "Profil", path: "/dashboard/customer/profile", icon: User },
];

const customerConfig = {
  role: "customer" as const,
  userName: "Bertoo",
  userInitials: "A",
  userAvatarBg: "bg-gradient-to-br from-brown-accent to-brown-dark",
  activeBg: "bg-brown-accent",
  activeText: "text-base-light",
  hoverBg: "hover:bg-brown-light",
  hoverText: "hover:text-brown-dark",
};

// Data Menu dan Konfigurasi untuk Seller
const sellerMenuItems: MenuItem[] = [
  { name: "Penjualan", path: "/dashboard/seller/sales", icon: StoreIcon },
  { name: "Dashboard", path: "/dashboard/seller", icon: LayoutDashboard },
  { name: "UMKM Saya", path: "/dashboard/seller/umkm", icon: Store },
  { name: "Produk", path: "/dashboard/seller/products", icon: Package },
  { name: "Pesan", path: "/dashboard/seller/chat", icon: MessageSquare },
  { name: "Statistik", path: "/dashboard/seller/stats", icon: BarChart3 },
  { name: "Pengaturan", path: "/dashboard/seller/settings", icon: Settings },
];

const sellerConfig = {
  role: "seller" as const,
  userName: "Cicii Gemasssshhhh",
  userInitials: "Y",
  userAvatarBg: "bg-gradient-to-br from-brown-dark to-brown-accent",
  activeBg: "bg-brown-dark",
  activeText: "text-brown-light",
  hoverBg: "hover:bg-brown-dark",
  hoverText: "hover:text-brown-light",
};

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  // State baru untuk mengontrol collapse di desktop
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Tentukan peran berdasarkan path
  const isSellerPath = pathname.includes("/dashboard/seller");
  const config = isSellerPath ? sellerConfig : customerConfig;
  const menuItems = isSellerPath ? sellerMenuItems : customerMenuItems;

  const isChatPage = pathname.includes("/chat") || pathname.includes("/chats");

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // Menggunakan useEffect untuk menangani perubahan ukuran layar
  useEffect(() => {
    const handleResize = () => {
      // Jika layar lebih besar dari sm (640px), pastikan mobile sidebar tertutup
      if (window.innerWidth >= 640 && isMobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };
    // Tambahkan event listener saat komponen dipasang
    window.addEventListener("resize", handleResize);
    // Hapus event listener saat komponen di-unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSidebarOpen]);

  return (
    <div className="flex min-h-screen w-full bg-linear-to-br from-white to-brown-light/20">
      <Sidebar
        menuItems={menuItems}
        userRole={config.role}
        userName={config.userName}
        userInitials={config.userInitials}
        userAvatarBg={config.userAvatarBg}
        activeBg={config.activeBg}
        activeText={config.activeText}
        hoverBg={config.hoverBg}
        hoverText={config.hoverText}
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        isCollapsed={isSidebarCollapsed}
      />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar
          userRole={config.role}
          userName={config.userName}
          userInitials={config.userInitials}
          userAvatarBg={config.userAvatarBg}
          setMobileSidebarOpen={setMobileSidebarOpen}
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebarCollapsed={toggleSidebarCollapsed}
        />
        <main
          className={`flex-1 ${
            isChatPage ? "relative overflow-hidden" : "p-4 sm:p-6 overflow-auto"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

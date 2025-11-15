// src/components/layout/LayoutClient.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useUser } from "@/hooks/useUser";
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

interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

const customerMenuItems: MenuItem[] = [
  { name: "Beranda", path: "/dashboard/customer", icon: Home },
  { name: "Jelajah", path: "/dashboard/customer/explore", icon: Compass },
  { name: "Pesan", path: "/dashboard/customer/chats", icon: MessageSquare },
  { name: "Favorit", path: "/dashboard/customer/favorites", icon: Heart },
  { name: "Profil", path: "/dashboard/customer/profile", icon: User },
];

const sellerMenuItems: MenuItem[] = [
  { name: "Penjualan", path: "/dashboard/seller/sales", icon: StoreIcon },
  { name: "Dashboard", path: "/dashboard/seller", icon: LayoutDashboard },
  { name: "UMKM Saya", path: "/dashboard/seller/umkm", icon: Store },
  { name: "Produk", path: "/dashboard/seller/products", icon: Package },
  { name: "Pesan", path: "/dashboard/seller/chat", icon: MessageSquare },
  { name: "Statistik", path: "/dashboard/seller/stats", icon: BarChart3 },
  { name: "Pengaturan", path: "/dashboard/seller/settings", icon: Settings },
];

const getInitials = (name: string): string => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const getShortName = (name: string): string => {
  if (!name) return "User";
  return name.split(" ")[0];
};

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, profile, isLoading } = useUser();

  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Handle redirect logic ketika user atau profile berubah
  useEffect(() => {
    if (isLoading) return;

    // Jika tidak ada user, redirect ke auth
    if (!user) {
      console.log("⚠️ No user, redirecting to auth");
      router.push("/auth");
      return;
    }

    // Jika user ada tapi profile belum ada (new user), tunggu sebentar
    if (!profile) {
      console.log("⚠️ User exists but profile not loaded yet, waiting...");
      // Trigger refetch after short delay
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    }

    // Jika seller belum complete onboarding
    if (profile.role === "seller" && !profile.onboarding_completed) {
      if (!pathname.includes("/onboarding")) {
        console.log("⚠️ Seller needs onboarding, redirecting...");
        router.push("/onboarding/seller");
      }
      return;
    }

    // Jika customer mencoba akses seller page atau sebaliknya
    const isSellerPath = pathname.includes("/dashboard/seller");
    const isCustomerPath =
      pathname.includes("/dashboard/customer") || pathname.includes("/umkm");

    if (profile.role === "seller" && isCustomerPath) {
      router.push("/dashboard/seller");
    } else if (profile.role === "customer" && isSellerPath) {
      router.push("/umkm");
    }
  }, [user, profile, isLoading, pathname, router]);

  const isSellerPath = pathname.includes("/dashboard/seller");
  const userRole = profile?.role || (isSellerPath ? "seller" : "customer");
  const menuItems = userRole === "seller" ? sellerMenuItems : customerMenuItems;

  const config = {
    role: userRole as "customer" | "seller",
    userName: profile?.full_name || user?.email?.split("@")[0] || "User",
    userInitials: getInitials(profile?.full_name || user?.email || "User"),
    userAvatarBg:
      userRole === "seller"
        ? "bg-linear-to-br from-brown-dark to-brown-accent"
        : "bg-linear-to-br from-brown-accent to-brown-dark",
    activeBg: userRole === "seller" ? "bg-brown-dark" : "bg-brown-accent",
    activeText: userRole === "seller" ? "text-brown-light" : "text-base-light",
    hoverBg:
      userRole === "seller" ? "hover:bg-brown-dark" : "hover:bg-brown-light",
    hoverText:
      userRole === "seller"
        ? "hover:text-brown-light"
        : "hover:text-brown-dark",
  };

  const isChatPage = pathname.includes("/chat") || pathname.includes("/chats");

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640 && isMobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileSidebarOpen]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-brown-light/20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-dark font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  // No user - akan di-handle oleh useEffect redirect
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-brown-light/20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-dark font-medium">
            Mengalihkan ke halaman login...
          </p>
        </div>
      </div>
    );
  }

  // Profile belum dimuat
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-white to-brown-light/20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brown-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-brown-dark font-medium">
            Menyiapkan profil Anda...
          </p>
          <p className="text-brown-medium text-sm mt-2">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-linear-to-br from-white to-brown-light/20">
      <Sidebar
        menuItems={menuItems}
        userRole={config.role}
        userName={getShortName(config.userName)}
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
          userName={getShortName(config.userName)}
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

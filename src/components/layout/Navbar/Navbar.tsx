"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Menu, Search, Sparkles, Store, LogIn, MapPinned } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

// Components & Types
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import { NavigationItem } from "./navbar.type";

// Hooks & Libs
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase/client";

// --- Konstanta Navigasi ---
const navigationItems: NavigationItem[] = [
  { type: "link", href: "/umkm", label: "Jelajahi UMKM", icon: Search },
  { type: "link", href: "/umkm/map", label: "Peta UMKM", icon: MapPinned },
  { type: "link", href: "/blog", label: "Blog", icon: Sparkles },
];

const HIDDEN_ROUTES_PREFIXES = [
  "/umkm",
  "/umkm/",
  "/dashboard-seller",
  "/dashboard-seller/",
  "/auth",
  "/auth/",
];

// --- Komponen Item Navigasi Desktop ---
// Dipindahkan keluar untuk kejelasan dan potensi memoization
const NavItemDesktop: React.FC<{
  item: NavigationItem;
  isActive: boolean;
  onClick: () => void;
}> = React.memo(({ item, isActive, onClick }) => {
  const IconComponent = item.icon;

  const content = (
    <div
      className={`flex items-center gap-3 px-5 py-2.5 rounded-full transition-colors font-medium text-sm ${
        isActive
          ? "bg-brown-dark text-brown-light"
          : "text-gray-700 hover:bg-brown-dark hover:text-brown-light"
      }`}
    >
      <IconComponent className="h-4 w-4" />
      <span>{item.label}</span>
    </div>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (item.type === "scroll") {
    return (
      <motion.button
        {...motionProps}
        onClick={onClick}
        className="flex items-center gap-2"
      >
        {content}
      </motion.button>
    );
  }

  return (
    <Link href={item.href!} passHref>
      <motion.div {...motionProps} className="flex items-center gap-2">
        {content}
      </motion.div>
    </Link>
  );
});

NavItemDesktop.displayName = "NavItemDesktop";

// --- Komponen Utama Navbar ---
const Navbar: React.FC = () => {
  const { user, profile, isLoading, isAuthenticated } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const userRole = profile?.role ?? "customer";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Perhitungan Navbar Tersembunyi
  const shouldHideNavbar = useMemo(() => {
    return HIDDEN_ROUTES_PREFIXES.some((route) => pathname.startsWith(route));
  }, [pathname]);

  // Handler Scroll untuk Efek Sembunyi/Tampil
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    // Menggunakan event listener dengan opsi `passive: true`
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]); // Dependensi `lastScrollY`

  // Fungsi pengecekan item aktif
  const isActiveItem = useCallback(
    (item: NavigationItem): boolean => {
      if (item.type === "link" && item.href) {
        if (item.href === "/umkm" && pathname.startsWith("/umkm")) {
          return true;
        }
        // Khusus untuk link, cek kecocokan persis atau awalan tertentu
        return pathname === item.href;
      }
      return false;
    },
    [pathname]
  );

  // Fungsi Logout
  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      setMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [router]);

  // Fungsi Scroll untuk Navigasi Internal
  const scrollToSection = useCallback(
    (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        // Jika di halaman lain, navigasi ke halaman utama dengan hash
        router.push(`/#${sectionId}`);
      }
    },
    [router]
  );

  // Pengaturan navigasi scroll di desktop
  const handleNavItemClick = useCallback(
    (item: NavigationItem) => {
      if (item.type === "scroll" && item.section) {
        scrollToSection(item.section);
      }
    },
    [scrollToSection]
  );

  // --- Render Tersembunyi dan Loading State ---
  if (shouldHideNavbar) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-full">
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gray-200 rounded-xl animate-pulse" />
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse hidden sm:block" />
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // --- Tombol Gabung (Login/Register) ---
  const JoinButton = () => (
    <>
      {/* Tampilan Desktop */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/auth?mode=login")} // Arahkan ke login sebagai default
        className="hidden md:flex items-center gap-2 px-5 py-2 bg-brown-accent text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow text-sm"
      >
        <LogIn className="w-4 h-4" />
        Bergabung
      </motion.button>

      {/* Tampilan Mobile - Hanya tombol Login (sebelumnya ada Daftar & Login) */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => router.push("/auth?mode=login")}
        className="md:hidden px-4 py-2 bg-brown-accent text-white rounded-full text-xs font-semibold"
      >
        Login
      </motion.button>
    </>
  );

  // --- Render Utama Navbar ---
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 1, // Mempertahankan opacity 1 untuk transisi y yang halus
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
        }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 transition-all duration-300 ${
          scrolled ? "max-w-7xl" : "max-w-[1440px]" // Menggunakan nilai yang lebih eksplisit untuk max-w:360 jika itu maksudnya
        }`}
        // Menghapus style inline karena sudah diatur oleh `animate` dan `className`
      >
        <div
          className={`w-full rounded-full transition-all ${
            scrolled
              ? "shadow-xl border border-gray-200 bg-white/80 backdrop-blur-md" // Menambahkan border yang hilang
              : "" // Jika tidak discroll, biarkan tanpa styling ekstra
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-1.5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-9 h-9 bg-brown-accent rounded-xl flex items-center justify-center shadow-sm">
                  <Image
                    width={100}
                    height={100}
                    src="/mapinaja-logo-dark.png"
                    alt="mapinaja logo"
                    // Tambahkan properti `priority` jika logo penting
                  />
                </div>
              </motion.div>
              <span className="hidden sm:block text-lg font-black text-brown-dark">
                MapinAja
              </span>
            </Link>

            {/* Navigasi Desktop */}
            <nav className="hidden lg:flex items-center gap-1 bg-white rounded-full p-2 shadow">
              {navigationItems.map((item) => (
                <NavItemDesktop
                  key={item.label} // Menggunakan label sebagai key yang lebih stabil
                  item={item}
                  isActive={isActiveItem(item)}
                  onClick={() => handleNavItemClick(item)}
                />
              ))}
            </nav>

            {/* Aksi Pengguna */}
            <div className="flex items-center gap-2">
              {isAuthenticated && user && profile ? (
                // Dropdown Pengguna Terautentikasi
                <UserDropdown
                  user={user}
                  profile={profile}
                  userRole={userRole}
                  onLogout={handleLogout}
                />
              ) : (
                // Tombol Bergabung/Login (Tidak Terautentikasi)
                <JoinButton />
              )}

              {/* Tombol Menu Mobile */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigationItems={navigationItems}
        user={user}
        userRole={userRole}
        onLogout={handleLogout}
        onNavigate={scrollToSection}
        currentPath={pathname}
      />
    </>
  );
};

export default Navbar;

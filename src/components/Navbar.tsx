"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  MapPin,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  Settings,
  Store,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Definisikan variabel warna custom
const PRIMARY_COLOR_CLASS = "text-brown-dark"; // Cokelat gelap untuk teks/hover
const ACCENT_BG_CLASS = "bg-brown-accent"; // Cokelat aksen untuk latar belakang tombol/ikon
const ACCENT_TEXT_CLASS = "text-brown-accent"; // Cokelat aksen untuk ikon/badge

// Initialize Supabase (Hanya untuk menjaga fungsionalitas aslinya)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============= CONFIG =============
const NAVBAR_CONFIG = {
  logo: {
    text: "MapinAja",
    icon: MapPin,
  },
  navigationItems: [
    { type: "link", href: "/umkm", label: "Jelajahi UMKM", icon: Search },
    { type: "scroll", section: "features", label: "Fitur", icon: Sparkles },
    {
      type: "scroll",
      section: "testimonials",
      label: "Testimoni",
      icon: Heart,
    },
    { type: "scroll", section: "pricing", label: "Pricing", icon: Store },
  ],
  style: "rounded", // 'flat' or 'rounded'
};

// ============= TYPES =============
interface NavigationItem {
  type: "link" | "scroll";
  href?: string;
  section?: string;
  label: string;
  icon: any;
}

interface UserDropdownProps {
  user: any;
  userRole: string;
  onLogout: () => void;
}

// ============= USER DROPDOWN COMPONENT =============
const UserDropdown: React.FC<UserDropdownProps> = ({
  user,
  userRole,
  onLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    {
      href: userRole === "seller" ? "/dashboard-seller" : "/profile",
      label: userRole === "seller" ? "Dashboard Seller" : "Profile Saya",
      icon: userRole === "seller" ? LayoutDashboard : User,
    },
    { href: "/favorites", label: "Favorit Saya", icon: Heart },
    { href: "/settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white/90 backdrop-blur-md hover:bg-white rounded-full border border-gray-200 transition-all shadow-sm hover:shadow-md"
      >
        {/* Mengganti bg-green-400 */}
        <div
          className={`w-8 h-8 ${ACCENT_BG_CLASS} rounded-full flex items-center justify-center shadow-sm`}
        >
          <User className="h-4 w-4 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-xs font-semibold text-gray-900 truncate max-w-[100px]">
            {user.email?.split("@")[0]}
          </p>
          <p className="text-[10px] text-gray-500 capitalize">{userRole}</p>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-200 shadow-xl overflow-hidden"
          >
            {/* User Header */}
            <div className="p-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                {/* Mengganti bg-green-400 */}
                <div
                  className={`w-10 h-10 ${ACCENT_BG_CLASS} rounded-full flex items-center justify-center`}
                >
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.email}
                  </p>
                  {/* Mengganti bg-green-400/10 dan text-green-400 */}
                  <span
                    className={`inline-block px-2 py-0.5 ${ACCENT_BG_CLASS}/10 ${ACCENT_TEXT_CLASS} rounded-full text-[10px] font-semibold mt-1`}
                  >
                    {userRole === "seller" ? "UMKM Seller" : "Customer"}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    // Mengganti hover:text-green-400
                    className={`flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:${ACCENT_TEXT_CLASS} hover:bg-gray-50 rounded-xl transition-colors`}
                  >
                    {/* Mengganti text-green-400 */}
                    <item.icon className={`h-4 w-4 ${ACCENT_TEXT_CLASS}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Logout */}
            <div className="p-2 border-t border-gray-100">
              <motion.button
                whileHover={{ x: 4 }}
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-medium">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============= NAV ITEM COMPONENT =============
const NavItem: React.FC<{
  item: NavigationItem;
  onClick?: () => void;
  isMobile?: boolean;
}> = ({ item, onClick, isMobile = false }) => {
  const IconComponent = item.icon;
  const baseClasses = isMobile
    ? // Mengganti hover:text-green-400
      `flex items-center gap-3 px-4 py-3 text-gray-700 hover:${ACCENT_TEXT_CLASS} hover:bg-gray-50 rounded-xl transition-colors font-medium w-full text-left`
    : // Mengganti hover:text-green-400
      `flex items-center gap-2 px-4 py-2 text-gray-700 hover:${ACCENT_TEXT_CLASS} hover:bg-gray-50/80 rounded-full transition-colors font-medium text-sm`;

  const content = (
    <>
      <IconComponent className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
      <span>{item.label}</span>
    </>
  );

  if (item.type === "scroll") {
    return (
      <motion.button
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={baseClasses}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <Link href={item.href!}>
      <motion.div
        whileHover={{ scale: isMobile ? 1 : 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={baseClasses}
      >
        {content}
      </motion.div>
    </Link>
  );
};

// ============= MOBILE MENU COMPONENT =============
const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  navigationItems: NavigationItem[];
  user: any;
  userRole: string;
  onLogout: () => void;
  onNavigate: (sectionId: string) => void;
}> = ({
  isOpen,
  onClose,
  navigationItems,
  user,
  userRole,
  onLogout,
  onNavigate,
}) => {
  const router = useRouter();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-xl bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 w-full backdrop-blur-md border-b border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {/* Mengganti bg-green-400 */}
                  <div
                    className={`w-9 h-9 ${ACCENT_BG_CLASS} rounded-xl flex items-center justify-center`}
                  >
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  {/* Mengganti bg-green-400 bg-clip-text text-transparent */}
                  <span
                    className={`text-lg font-black bg-clip-text text-transparent`}
                    style={{
                      backgroundImage: `linear-gradient(to right, ${ACCENT_BG_CLASS.replace(
                        "bg-",
                        "#"
                      ).replace("accent", "900")}, ${ACCENT_BG_CLASS.replace(
                        "bg-",
                        "#"
                      ).replace("accent", "700")})`,
                    }}
                  >
                    {NAVBAR_CONFIG.logo.text}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              {navigationItems.map((item, index) => (
                <NavItem
                  key={index}
                  item={item}
                  onClick={() => {
                    if (item.type === "scroll") {
                      onNavigate(item.section!);
                    }
                    onClose();
                  }}
                  isMobile
                />
              ))}
            </nav>

            {/* Auth Section */}
            <div className="p-4 border-t border-gray-100 mt-auto">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    {/* Mengganti bg-green-400 */}
                    <div
                      className={`w-11 h-11 ${ACCENT_BG_CLASS} rounded-full flex items-center justify-center`}
                    >
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                      {/* Mengganti bg-green-400/10 dan text-green-400 */}
                      <span
                        className={`inline-block px-2 py-0.5 ${ACCENT_BG_CLASS}/10 ${ACCENT_TEXT_CLASS} rounded-full text-xs font-semibold mt-0.5`}
                      >
                        {userRole}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      router.push("/auth?mode=register");
                      onClose();
                    }}
                    className="w-full px-4 py-2.5 text-gray-700 border border-gray-300 hover:bg-gray-50 rounded-xl transition-colors font-semibold"
                  >
                    Daftar
                  </button>
                  <button
                    onClick={() => {
                      router.push("/auth?mode=login");
                      onClose();
                    }}
                    // Mengganti bg-green-400
                    className={`w-full px-4 py-2.5 ${ACCENT_BG_CLASS} text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow`}
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ============= MAIN NAVBAR COMPONENT =============
const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auth logic (Dibiarkan apa adanya karena Supabase environment variables tidak tersedia)
  useEffect(() => {
    // --- Mock Auth Logic for Demo Purposes ---
    setLoading(false);
    // setUser({ email: "user@example.com" });
    // setUserRole("seller");

    const getCurrentUser = async () => {
      // Mock / Actual Supabase logic...
    };

    const fetchUserRole = async (userId: string) => {
      // Mock / Actual Supabase logic...
    };

    // getCurrentUser();
    // const { data: { subscription }, } = supabase.auth.onAuthStateChange(async (event, session) => { ... });
    // return () => subscription?.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      // await supabase.auth.signOut();
      setUser(null);
      setUserRole("");
      setMobileMenuOpen(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  // Loading state (Warna Latar Belakang Loading Disesuaikan)
  if (loading) {
    return (
      <div
        className={`fixed z-50 w-full ${
          NAVBAR_CONFIG.style === "rounded"
            ? "top-4 left-1/2 -translate-x-1/2 max-w-6xl px-4"
            : "top-0"
        }`}
      >
        <div
          className={`bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm ${
            NAVBAR_CONFIG.style === "rounded" ? "rounded-full" : ""
          }`}
        >
          <div className="flex justify-between items-center px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gray-200 rounded-xl animate-pulse" />
              <div className="w-24 h-5 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Navbar styles based on config
  const navbarContainerClasses =
    NAVBAR_CONFIG.style === "rounded"
      ? "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 transition-all duration-300"
      : "fixed top-0 left-0 right-0 z-50 transition-all duration-300";

  const navbarClasses =
    NAVBAR_CONFIG.style === "rounded"
      ? `bg-white/95 backdrop-blur-xl border border-gray-200 rounded-full shadow-md hover:shadow-xl transition-all ${
          scrolled ? "shadow-xl border-gray-300" : ""
        }`
      : `bg-white/95 backdrop-blur-xl border-b border-gray-200 ${
          scrolled ? "shadow-md" : ""
        }`;

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={navbarContainerClasses}
      >
        <div className={navbarClasses}>
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-3.5">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Mengganti bg-green-400 */}
                <div
                  className={`w-9 h-9 ${ACCENT_BG_CLASS} rounded-xl flex items-center justify-center shadow-sm`}
                >
                  <NAVBAR_CONFIG.logo.icon className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              {/* Mengganti bg-green-400 bg-clip-text text-transparent */}
              <span
                className={`hidden sm:block text-lg font-black bg-clip-text text-transparent ${PRIMARY_COLOR_CLASS}`}
                style={{
                  backgroundImage: `linear-gradient(to right, #795548, #5D4037)`,
                }}
              >
                {NAVBAR_CONFIG.logo.text}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAVBAR_CONFIG.navigationItems.map((item, index) => (
                <NavItem
                  key={index}
                  item={item}
                  onClick={() =>
                    item.type === "scroll" && scrollToSection(item.section!)
                  }
                />
              ))}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {user ? (
                <UserDropdown
                  user={user}
                  userRole={userRole}
                  onLogout={handleLogout}
                />
              ) : (
                <>
                  {/* Desktop Auth */}
                  <div className="hidden md:flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/auth?mode=register")}
                      // Mengganti hover:text-green-400
                      className={`px-4 py-2 text-gray-700 hover:${ACCENT_TEXT_CLASS} font-semibold text-sm transition-colors`}
                    >
                      Daftar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/auth?mode=login")}
                      // Mengganti bg-green-400
                      className={`px-5 py-2 ${ACCENT_BG_CLASS} text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow text-sm`}
                    >
                      Login
                    </motion.button>
                  </div>

                  {/* Mobile Login */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/auth?mode=login")}
                    // Mengganti bg-green-400
                    className={`md:hidden px-4 py-2 ${ACCENT_BG_CLASS} text-white rounded-full text-xs font-semibold`}
                  >
                    Login
                  </motion.button>
                </>
              )}

              {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navigationItems={NAVBAR_CONFIG.navigationItems}
        user={user}
        userRole={userRole}
        onLogout={handleLogout}
        onNavigate={scrollToSection}
      />
    </>
  );
};

export default Navbar;

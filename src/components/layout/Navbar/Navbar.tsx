"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, MapPin, Search, Sparkles, Store } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import { NavigationItem, User } from "./navbar.type";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const navigationItems: NavigationItem[] = [
    { type: "link", href: "/umkm", label: "Jelajahi UMKM", icon: Search },
    { type: "link", href: "#", label: "Tentang", icon: Store },
    { type: "link", href: "#", label: "Blog", icon: Sparkles },
  ];

  // Routes where navbar should be hidden
  const hiddenRoutes = [
    "/umkm/", // Semua route di bawah /umkm
    "/dashboard-seller",
    "/dashboard-seller/",
    "/auth",
    "/auth/",
  ];

  // Check if current route should hide navbar
  const shouldHideNavbar = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Scroll behavior untuk hide/show navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Set scrolled state untuk background change
      setScrolled(currentScrollY > 20);

      // Logic untuk hide/show navbar berdasarkan scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll ke bawah - hide navbar
        setIsVisible(false);
      } else {
        // Scroll ke atas - show navbar
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Check if a navigation item is active
  const isActiveItem = (item: NavigationItem): boolean => {
    if (item.type === "link" && item.href) {
      if (item.href === "/umkm" && pathname.startsWith("/umkm")) {
        return true;
      }
      return pathname === item.href;
    }
    return false;
  };

  const handleLogout = async () => {
    try {
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

  const NavItemDesktop: React.FC<{ item: NavigationItem }> = ({ item }) => {
    const IconComponent = item.icon;
    const isActive = isActiveItem(item);

    const handleClick = () => {
      if (item.type === "scroll") {
        scrollToSection(item.section!);
      }
    };

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

    if (item.type === "scroll") {
      return (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClick}
          className="flex items-center gap-2"
        >
          {content}
        </motion.button>
      );
    }

    return (
      <Link href={item.href!}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2"
        >
          {content}
        </motion.div>
      </Link>
    );
  };

  // Jika route termasuk dalam hiddenRoutes, return null (navbar disembunyikan)
  if (shouldHideNavbar) {
    return null;
  }

  if (loading) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4">
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm rounded-full">
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

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 transition-all duration-300"
        style={{
          transform: `translate(-50%, ${isVisible ? "0" : "-100%"})`,
          opacity: isVisible ? 1 : 1,
        }}
      >
        <div
          className={`border border-gray-200 bg-white/50 rounded-full transition-all ${
            scrolled
              ? "shadow-xl border-gray-300 bg-white/80 backdrop-blur-md"
              : ""
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-1.5">
            <Link href="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-9 h-9 bg-brown-accent rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              <span className="hidden sm:block text-lg font-black text-brown-dark">
                MapinAja
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1 bg-white rounded-full p-2 shadow">
              {navigationItems.map((item, index) => (
                <NavItemDesktop key={index} item={item} />
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {user ? (
                <UserDropdown
                  user={user}
                  userRole={userRole}
                  onLogout={handleLogout}
                />
              ) : (
                <>
                  <div className="hidden md:flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/auth?mode=register")}
                      className="px-4 py-2 text-gray-700 hover:text-brown-accent font-semibold text-sm transition-colors"
                    >
                      Daftar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/auth?mode=login")}
                      className="px-5 py-2 bg-brown-accent text-white font-semibold rounded-full shadow-sm hover:shadow-md transition-shadow text-sm"
                    >
                      Login
                    </motion.button>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/auth?mode=login")}
                    className="md:hidden px-4 py-2 bg-brown-accent text-white rounded-full text-xs font-semibold"
                  >
                    Login
                  </motion.button>
                </>
              )}

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

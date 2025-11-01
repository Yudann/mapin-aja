"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, MapPin, Search, Sparkles, Heart, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UserDropdown from "./UserDropdown";
import MobileMenu from "./MobileMenu";
import { NavigationItem, User } from "./navbar.type";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  const navigationItems: NavigationItem[] = [
    { type: "link", href: "/umkm", label: "Jelajahi UMKM", icon: Search },
    { type: "scroll", section: "features", label: "Fitur", icon: Sparkles },
    {
      type: "scroll",
      section: "testimonials",
      label: "Testimoni",
      icon: Heart,
    },
    { type: "scroll", section: "pricing", label: "Pricing", icon: Store },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setLoading(false);
  }, []);

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

    const handleClick = () => {
      if (item.type === "scroll") {
        scrollToSection(item.section!);
      }
    };

    const content = (
      <div className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-brown-accent hover:bg-gray-50/80 rounded-full transition-colors font-medium text-sm">
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-7xl px-4 transition-all duration-300"
      >
        <div
          className={`bg-white/95 backdrop-blur-xl border border-gray-200 rounded-full shadow-md hover:shadow-xl transition-all ${
            scrolled ? "shadow-xl border-gray-300" : ""
          }`}
        >
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-3.5">
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

            <nav className="hidden lg:flex items-center gap-1">
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
      />
    </>
  );
};

export default Navbar;

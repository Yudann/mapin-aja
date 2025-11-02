"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MobileMenuProps, NavigationItem } from "./navbar.type";

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navigationItems,
  user,
  userRole,
  onLogout,
  onNavigate,
  currentPath, // Gunakan prop yang diterima
}) => {
  const router = useRouter();

  // Routes where navbar should be hidden
  const hiddenRoutes = [
    "/umkm/",
    "/dashboard-seller",
    "/dashboard-seller/",
    "/auth",
    "/auth/",
  ];

  // Check if current route should hide navbar
  const shouldHideNavbar = hiddenRoutes.some((route) =>
    currentPath.startsWith(route)
  );

  // Jika route termasuk dalam hiddenRoutes, return null HANYA JIKA mobile menu tidak terbuka
  if (shouldHideNavbar && !isOpen) {
    return null;
  }

  const NavItemMobile: React.FC<{ item: NavigationItem }> = ({ item }) => {
    const IconComponent = item.icon;

    const handleClick = () => {
      if (item.type === "scroll") {
        onNavigate(item.section!);
      }
      onClose();
    };

    const content = (
      <div className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-brown-accent hover:bg-gray-50 rounded-xl transition-colors font-medium w-full text-left">
        <IconComponent className="h-5 w-5" />
        <span>{item.label}</span>
      </div>
    );

    if (item.type === "scroll") {
      return (
        <button onClick={handleClick} className="w-full">
          {content}
        </button>
      );
    }

    return (
      <Link href={item.href!} onClick={handleClick} className="w-full">
        {content}
      </Link>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-xl bg-white shadow-2xl z-50 overflow-y-auto"
          >
            <div className="sticky top-0 bg-white/95 w-full backdrop-blur-md border-b border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-brown-accent rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-black text-brown-dark">
                    MapinAja
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

            <nav className="p-4 space-y-1">
              {navigationItems.map((item, index) => (
                <NavItemMobile key={index} item={item} />
              ))}
            </nav>

            <div className="p-4 border-t border-gray-100 mt-auto">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-11 h-11 bg-brown-accent rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.email}
                      </p>
                      <span className="inline-block px-2 py-0.5 bg-brown-accent/10 text-brown-accent rounded-full text-xs font-semibold mt-0.5">
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
                    className="w-full px-4 py-2.5 bg-brown-accent text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow"
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

export default MobileMenu;

// src/components/navbar/MobileMenu.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, LogOut, User, Store, Search, Sparkles } from "lucide-react";
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
  currentPath,
}) => {
  const router = useRouter();

  // Fungsi untuk mendapatkan icon berdasarkan nama
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      Search,
      Store,
      Sparkles,
    };
    return iconMap[iconName] || Search;
  };

  const NavItemMobile: React.FC<{ item: NavigationItem }> = ({ item }) => {
    const IconComponent = item.icon || getIconComponent(item.iconName || "");

    const handleClick = () => {
      if (item.type === "scroll") {
        onNavigate(item.section!);
      }
      onClose();
    };

    const isActive = item.type === "link" && item.href === currentPath;

    const content = (
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium w-full text-left ${
          isActive
            ? "bg-brown-dark text-brown-light"
            : "text-gray-700 hover:text-brown-accent hover:bg-gray-50"
        }`}
      >
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

  // Handler untuk navigasi ke halaman auth
  const handleAuthNavigation = () => {
    router.push("/auth");
    onClose();
  };

  // Handler untuk dashboard berdasarkan role
  const handleDashboardNavigation = () => {
    if (userRole === "seller") {
      router.push("/dashboard-seller");
    } else {
      router.push("/dashboard");
    }
    onClose();
  };

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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 z-10">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={onClose}
                  className="flex items-center gap-2"
                >
                  <div className="w-9 h-9 bg-brown-accent rounded-xl flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-black text-brown-dark">
                    MapinAja
                  </span>
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <NavItemMobile key={`${item.label}-${index}`} item={item} />
                ))}
              </nav>

              {/* User Section */}
              <div className="p-4 border-t border-gray-100">
                {user ? (
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-11 h-11 bg-brown-accent rounded-full flex items-center justify-center shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {user.email}
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-brown-accent/10 text-brown-accent rounded-full text-xs font-semibold mt-0.5 capitalize">
                          {userRole}
                        </span>
                      </div>
                    </div>

                    {/* Dashboard Button */}
                    <button
                      onClick={handleDashboardNavigation}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-brown-accent text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow"
                    >
                      <Store className="h-4 w-4" />
                      Dashboard {userRole === "seller" ? "Seller" : ""}
                    </button>

                    {/* Logout Button */}
                    <button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold border border-red-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  // TAMPILAN UNTUK USER YANG BELUM LOGIN
                  <div className="space-y-3">
                    {/* Single Auth Button - SEDERHANA */}
                    <button
                      onClick={handleAuthNavigation}
                      className="w-full px-4 py-2.5 bg-brown-accent text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-shadow"
                    >
                      Bergabung
                    </button>

                    {/* Optional: Quick access untuk seller */}
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-xs text-gray-500 text-center mb-2">
                        Untuk UMKM/Penjual
                      </p>
                      <button
                        onClick={() => {
                          router.push("/auth/seller");
                          onClose();
                        }}
                        className="w-full px-4 py-2 text-brown-accent border border-brown-accent hover:bg-brown-accent/5 rounded-xl transition-colors font-semibold text-sm"
                      >
                        Daftar sebagai Seller
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;

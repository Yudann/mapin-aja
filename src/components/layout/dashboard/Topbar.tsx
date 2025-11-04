"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Komponen Tombol Toggle Universal
interface UniversalSidebarToggleProps {
  isMobile: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const UniversalSidebarToggle = ({
  isMobile,
  isCollapsed,
  onClick,
}: UniversalSidebarToggleProps) => (
  <button
    onClick={onClick}
    aria-expanded={isMobile ? "false" : "true"}
    aria-label={
      isMobile
        ? "Buka sidebar mobile"
        : isCollapsed
        ? "Buka sidebar desktop"
        : "Tutup sidebar desktop"
    }
    className="no-draggable hover:bg-token-surface-hover focus-visible:bg-token-surface-hover touch:h-10 touch:w-10 no-draggable flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg focus-visible:outline-0 disabled:opacity-50"
    aria-controls="stage-slideover-sidebar"
    data-testid="close-sidebar-button"
    data-state="closed"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      data-rtl-flip=""
      className=""
    >
      <path d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z"></path>
    </svg>
  </button>
);

// Tipe untuk props Topbar yang diperbarui
interface TopbarProps {
  userRole: "customer" | "seller";
  userName: string;
  userInitials: string;
  userAvatarBg: string;
  setMobileSidebarOpen: (isOpen: boolean) => void;
  isSidebarCollapsed: boolean; // Tambah prop status collapse
  toggleSidebarCollapsed: () => void; // Tambah fungsi toggle collapse
}

export default function Topbar({
  userRole,
  userName,
  userInitials,
  setMobileSidebarOpen,
  isSidebarCollapsed,
  toggleSidebarCollapsed,
}: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [location, setLocation] = useState("Jakarta Pusat");

  const isCustomer = userRole === "customer";
  const searchPlaceholder = isCustomer
    ? "Cari UMKM, produk, atau kategori..."
    : "Cari UMKM, produk, atau pelanggan...";

  const userDropdownItems = isCustomer
    ? ["Profil Saya", "Favorit", "Pengaturan"]
    : ["Profile", "Pengaturan"];

  const handleToggleClick = () => {
    if (window.innerWidth < 640) {
      setMobileSidebarOpen(true);
    } else {
      toggleSidebarCollapsed();
    }
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Tombol Toggle Universal */}
        <UniversalSidebarToggle
          isMobile={window.innerWidth < 640}
          isCollapsed={isSidebarCollapsed}
          onClick={handleToggleClick}
        />

        {/* Location & Search Bar */}
        <div className="flex-1 flex items-center gap-4 max-w-3xl">
          {/* Location (Customer Only) */}
          {isCustomer && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-brown-light/50 rounded-xl">
              <MapPin className="w-4 h-4 text-brown-accent" />
              <span className="text-sm font-semibold text-brown-dark whitespace-nowrap">
                {location}
              </span>
            </div>
          )}

          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-brown-accent focus:bg-white transition-all outline-none text-sm"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications & User Menu (Sama seperti sebelumnya) */}
          <button
            className="relative p-2 text-gray-600 hover:text-brown-dark hover:bg-gray-100 rounded-xl transition-colors"
            aria-label="Notifikasi"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              className="flex items-center gap-2 sm:gap-3 px-1 sm:px-3 py-1 sm:py-2 rounded-xl hover:bg-gray-100 transition-colors"
              aria-expanded={isUserDropdownOpen}
              aria-label="Buka menu pengguna"
            >
              <div className="w-8 h-8 bg-linear-to-br from-brown-accent to-brown-dark rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-semibold text-sm">
                  {userInitials}
                </span>
              </div>
              <div className="text-left hidden md:block min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  {userName}
                </div>
                <div className="text-xs text-gray-500 truncate">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500 hidden md:block" />
            </button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 origin-top-right"
                >
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      Akun Saya
                    </div>
                  </div>

                  {userDropdownItems.map((item) => (
                    <button
                      key={item}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {item}
                    </button>
                  ))}

                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

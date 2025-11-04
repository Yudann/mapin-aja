"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  LucideIcon,
  ChevronLeft, // Tetap di-import untuk Logo Section Mobile
} from "lucide-react";

// Tipe untuk item menu
interface MenuItem {
  name: string;
  path: string;
  icon: LucideIcon;
}

// Tipe untuk props Sidebar yang diperbarui
interface SidebarProps {
  menuItems: MenuItem[];
  userRole: "customer" | "seller";
  userName: string;
  userInitials: string;
  userAvatarBg: string;
  activeBg: string;
  activeText: string;
  hoverBg: string;
  hoverText: string;
  isMobileOpen: boolean;
  setMobileOpen: (isOpen: boolean) => void;
  isCollapsed: boolean; // Tambahkan prop untuk kontrol collapse desktop
}

export default function Sidebar({
  menuItems,
  userRole,
  userName,
  userInitials,
  userAvatarBg,
  activeBg,
  activeText,
  hoverBg,
  hoverText,
  isMobileOpen,
  setMobileOpen,
  isCollapsed, // Gunakan prop ini
}: SidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isMobileOpen) {
      setMobileOpen(false);
    }
  }, [pathname]);

  const handleMobileLinkClick = () => {
    setMobileOpen(false);
  };

  const sidebarClass = `
    sticky top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col 
    ${isCollapsed ? "w-16" : "w-64"} 
    hidden sm:flex 
  `;

  const mobileSidebarClass = `
    fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-transform duration-300 z-50 flex flex-col w-64
    ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
    sm:hidden 
  `;

  const desktopContent = (
    <aside className={sidebarClass}>
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!isCollapsed && (
          <Link
            href={`/dashboard/${userRole}`}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-brown-accent rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-brown-dark">MapinAja</span>
          </Link>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-brown-accent rounded-xl flex items-center justify-center mx-auto shrink-0">
            <span className="text-white font-bold text-sm">M</span>
          </div>
        )}
        {/* TOMBOL TOGGLE COLLAPSE TELAH DIHAPUS DARI SINI */}
      </div>

      {/* Navigation Menu (Desktop) */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? `${activeBg} ${activeText} shadow-sm`
                  : `text-gray-600 ${hoverBg} ${hoverText}`
              }`}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? activeText : "text-current"
                }`}
              />
              {!isCollapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section (Desktop) */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* User Info */}
        <div
          className={`flex items-center gap-3 p-2 rounded-lg ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div
            className={`w-8 h-8 ${userAvatarBg} rounded-full flex items-center justify-center shrink-0`}
          >
            <span className="text-white font-semibold text-xs">
              {userInitials}
            </span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </p>
            </div>
          )}
        </div>

        {/* Logout Button */}
        {!isCollapsed && (
          <button className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        )}
      </div>
    </aside>
  );

  const mobileContent = (
    <>
      {/* Sidebar Mobile */}
      <div className={mobileSidebarClass}>
        {/* Logo Section (Mobile) */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
          <Link
            href={`/dashboard/${userRole}`}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-brown-accent rounded-xl flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-brown-dark">MapinAja</span>
          </Link>
          {/* Tombol close mobile di sini */}
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            aria-label="Tutup sidebar mobile"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Menu (Mobile) */}
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? `${activeBg} ${activeText} shadow-sm`
                    : `text-gray-600 ${hoverBg} ${hoverText}`
                }`}
                onClick={handleMobileLinkClick}
              >
                <Icon
                  className={`w-5 h-5 shrink-0 ${
                    isActive ? activeText : "text-current"
                  }`}
                />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Section (Mobile) */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          {/* User Info & Logout */}
          <div className="flex items-center gap-3 p-2 rounded-lg">
            <div
              className={`w-8 h-8 ${userAvatarBg} rounded-full flex items-center justify-center shrink-0`}
            >
              <span className="text-white font-semibold text-xs">
                {userInitials}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </p>
            </div>
          </div>
          <button
            className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
            onClick={handleMobileLinkClick}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
      {/* Backdrop/Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {desktopContent}
      {mobileContent}
    </>
  );
}

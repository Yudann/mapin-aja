// src\app\(dashboard)\dashboard\seller\components\Sidebar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Store,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/dashboard/seller", icon: LayoutDashboard },
  { name: "UMKM Saya", path: "/dashboard/seller/umkm", icon: Store },
  { name: "Produk", path: "/dashboard/seller/products", icon: Package },
  { name: "Pesan", path: "/dashboard/seller/chat", icon: MessageSquare },
  { name: "Statistik", path: "/dashboard/seller/stats", icon: BarChart3 },
  { name: "Pengaturan", path: "/dashboard/seller/settings", icon: Settings },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`sticky top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        {!collapsed && (
          <Link href="/dashboard/seller" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brown-accent rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-lg text-brown-dark">MapinAja</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-brown-accent rounded-xl flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">M</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
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
                  ? "bg-brown-dark text-brown-light shadow-sm"
                  : "text-gray-600 hover:bg-brown-dark hover:text-brown-light"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? "text-brown-light" : "text-current"
                }`}
              />
              {!collapsed && (
                <span className="font-medium text-sm">{item.name}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section & Footer */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        {/* User Info */}
        <div
          className={`flex items-center gap-3 p-2 rounded-lg ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-brown-dark to-brown-accent rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-xs">Y</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                Cici Immmuuutttsss
              </p>
              <p className="text-xs text-gray-500 truncate">Seller</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
  Heart,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { UserDropdownProps } from "./navbar.type";

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
        <div className="w-8 h-8 bg-brown-accent rounded-full flex items-center justify-center shadow-sm">
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
            <div className="p-4 bg-linear-to-r from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brown-accent rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user.email}
                  </p>
                  <span className="inline-block px-2 py-0.5 bg-brown-accent/10 text-brown-accent rounded-full text-[10px] font-semibold mt-1">
                    {userRole === "seller" ? "UMKM Seller" : "Customer"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:text-brown-accent hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    <item.icon className="h-4 w-4 text-brown-accent" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              ))}
            </div>

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

export default UserDropdown;

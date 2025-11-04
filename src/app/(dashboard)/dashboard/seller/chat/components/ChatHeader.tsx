"use client";

import { motion } from "framer-motion";
import { ChevronLeft, Phone, Video, Info } from "lucide-react";
import { Chat } from "../chat.type";

interface ChatHeaderProps {
  chat: Chat;
  onBack?: () => void;
}

export default function ChatHeader({ chat, onBack }: ChatHeaderProps) {
  return (
    <div className="bg-white/90 backdrop-blur-md border-b border-brown-light px-4 py-3 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          {onBack && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-1 hover:bg-brown-light rounded-lg transition-colors md:hidden"
            >
              <ChevronLeft className="w-5 h-5 text-brown-dark" />
            </motion.button>
          )}

          {/* Avatar */}
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-brown-dark to-brown-accent rounded-full flex items-center justify-center text-white font-semibold">
              {chat.name.charAt(0)}
            </div>
            {chat.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          {/* Chat Info */}
          <div>
            <h2 className="font-semibold text-brown-dark">{chat.name}</h2>
            <div className="flex items-center gap-1">
              {chat.isOnline ? (
                <>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">
                    Online
                  </span>
                </>
              ) : (
                <span className="text-xs text-gray-500">
                  {chat.lastSeen || "Offline"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section - Action Buttons */}
        <div className="flex items-center gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-brown-accent hover:bg-brown-light rounded-xl transition-colors"
            title="Panggilan Suara"
          >
            <Phone className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-brown-accent hover:bg-brown-light rounded-xl transition-colors"
            title="Panggilan Video"
          >
            <Video className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-brown-accent hover:bg-brown-light rounded-xl transition-colors"
            title="Info UMKM"
          >
            <Info className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

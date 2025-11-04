"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus } from "lucide-react";
import { Chat } from "../chat.type";

interface ChatSidebarProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}

export default function ChatSidebar({
  chats,
  selectedChat,
  onSelectChat,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col bg-white border-r border-brown-light">
      {/* Header */}
      <div className="p-4 border-b border-brown-light">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-brown-dark">Pesan</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-brown-accent text-white rounded-xl hover:bg-brown-dark transition-colors"
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Cari percakapan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-brown-light/30 border border-brown-light rounded-xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none transition-all placeholder-gray-500"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat, index) => (
          <motion.button
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-4 text-left border-b border-brown-light/30 transition-all ${
              selectedChat?.id === chat.id
                ? "bg-brown-accent/10 border-l-4 border-brown-accent"
                : "hover:bg-brown-light/50"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Avatar with Online Indicator */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-brown-dark to-brown-accent rounded-full flex items-center justify-center text-white font-semibold">
                  {chat.name.charAt(0)}
                </div>
                {chat.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-brown-dark truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {chat.time}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                  {chat.unreadCount && chat.unreadCount > 0 && (
                    <span className="bg-brown-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 ml-2">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>

                {/* Last Seen for Offline */}
                {!chat.isOnline && chat.lastSeen && (
                  <p className="text-xs text-gray-400 mt-1">{chat.lastSeen}</p>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Empty State */}
      {filteredChats.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-brown-accent" />
            </div>
            <p className="text-gray-500">Tidak ada percakapan ditemukan</p>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatSidebar from "./components/ChatSidebar";
import ChatHeader from "./components/ChatHeader";
import ChatMessages from "./components/ChatMessages";
import ChatInput from "./components/ChatInput";
import { Chat, Message } from "./chat.type";

// Dummy data
const dummyChats: Chat[] = [
  {
    id: "1",
    name: "Kopi Senja",
    lastMessage: "Pesanan kamu udah siap ya ☕",
    time: "09:41",
    avatar: "/api/placeholder/40/40",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    name: "Rina Handmade",
    lastMessage: "Boleh kirim foto produknya kak?",
    time: "08:22",
    avatar: "/api/placeholder/40/40",
    isOnline: false,
    lastSeen: "2 jam yang lalu",
  },
  {
    id: "3",
    name: "Toko Kue Mama",
    lastMessage: "Kue ulang tahun ready untuk besok!",
    time: "Kemarin",
    avatar: "/api/placeholder/40/40",
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: "4",
    name: "UMKM Batik Indah",
    lastMessage: "Terima kasih sudah order!",
    time: "27/12",
    avatar: "/api/placeholder/40/40",
    isOnline: false,
    lastSeen: "5 jam yang lalu",
  },
];

const dummyMessages: Message[] = [
  {
    id: "1",
    sender: "them",
    text: "Halo! Kue ulang tahun ready untuk besok?",
    time: "09:12",
    timestamp: new Date("2024-01-15T09:12:00"),
  },
  {
    id: "2",
    sender: "me",
    text: "Ready kak! Mau ukuran berapa?",
    time: "09:13",
    timestamp: new Date("2024-01-15T09:13:00"),
  },
  {
    id: "3",
    sender: "them",
    text: "Yang untuk 10 orang ya.",
    time: "09:14",
    timestamp: new Date("2024-01-15T09:14:00"),
  },
  {
    id: "4",
    sender: "me",
    text: "Oke, harga total Rp 350.000. Mau tambah tulisan?",
    time: "09:15",
    timestamp: new Date("2024-01-15T09:15:00"),
  },
  {
    id: "5",
    sender: "them",
    text: "Iya, tambahin 'Happy Birthday Rina' ya. Bisa ready jam berapa?",
    time: "09:16",
    timestamp: new Date("2024-01-15T09:16:00"),
  },
  {
    id: "6",
    sender: "me",
    text: "Bisa diambil besok jam 3 sore ya kak. Sudah termasuk lilin dan pisau kue.",
    time: "09:17",
    timestamp: new Date("2024-01-15T09:17:00"),
  },
  {
    id: "7",
    sender: "them",
    text: "Perfect! Oke sip, nanti saya transfer dulu ya. Terima kasih banyak! 🎂",
    time: "09:18",
    timestamp: new Date("2024-01-15T09:18:00"),
  },
  {
    id: "8",
    sender: "me",
    text: "Bisa diambil besok jam 3 sore ya kak. Sudah termasuk lilin dan pisau kue.",
    time: "09:17",
    timestamp: new Date("2024-01-15T09:17:00"),
  },
  {
    id: "9",
    sender: "them",
    text: "Perfect! Oke sip, nanti saya transfer dulu ya. Terima kasih banyak! 🎂",
    time: "09:18",
    timestamp: new Date("2024-01-15T09:18:00"),
  },
];

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showChatView, setShowChatView] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSelectChat = (chat: Chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowChatView(true);
    }
  };

  const handleBackToChats = () => {
    setShowChatView(false);
    setSelectedChat(null);
  };

  return (
    <div className="absolute inset-0 flex bg-linear-to-br from-brown-light/30 to-white overflow-hidden">
      {/* Sidebar - Always visible on desktop, conditionally on mobile */}
      <div
        className={`${
          isMobile && showChatView ? "hidden" : "flex"
        } md:flex w-full md:w-80 lg:w-96 shrink-0`}
      >
        <ChatSidebar
          chats={dummyChats}
          selectedChat={selectedChat}
          onSelectChat={handleSelectChat}
        />
      </div>

      {/* Chat View */}
      <AnimatePresence mode="wait">
        {selectedChat && (
          <motion.div
            key={selectedChat.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`flex-1 flex flex-col ${
              isMobile ? "fixed inset-0 z-50 bg-white" : "relative"
            }`}
          >
            <ChatHeader
              chat={selectedChat}
              onBack={isMobile ? handleBackToChats : undefined}
            />
            <ChatMessages messages={dummyMessages} />
            <ChatInput
              onSendMessage={(message) => console.log("Sending:", message)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      <AnimatePresence>
        {!selectedChat && !isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex items-center justify-center bg-linear-to-br from-brown-light/10 to-white/50"
          >
            <div className="text-center max-w-md mx-6">
              <div className="w-24 h-24 bg-brown-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-16 h-16 bg-brown-accent/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-brown-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-brown-dark mb-2">
                Pilih Percakapan
              </h3>
              <p className="text-gray-600">
                Pilih percakapan dari sidebar untuk mulai mengobrol dengan UMKM
                favorit Anda
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

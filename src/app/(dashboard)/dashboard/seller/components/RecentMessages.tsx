// app/dashboard/seller/components/RecentMessages.tsx
"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ChatInput from "../chat/components/ChatInput";

const messages = [
  {
    store: "Toko Kue Mama",
    status: "Online",
    messages: [
      { text: "Halo! Kue ulang tahun ready untuk besok?", isCustomer: true },
      { text: "Ready kak! Mau ukuran berapa?", isCustomer: false },
    ],
  },
  {
    store: "Kedai Kopi Pak Joko",
    status: "Offline",
    messages: [
      { text: "Yang untuk 10 orang, Harganya berapa?", isCustomer: true },
      { text: "Untuk 10 orang Rp 350.000 kak", isCustomer: false },
    ],
  },
  {
    store: "Butik Sari Dewi",
    status: "Online",
    messages: [
      { text: "Bisa cod di mall?", isCustomer: true },
      { text: "Bisa kak, jam berapa?", isCustomer: false },
    ],
  },
];

export default function RecentMessages() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Pesan Terbaru</h2>
        <MessageCircle className="w-5 h-5 text-brown-accent]" />
      </div>

      <div className="space-y-4">
        {messages.map((conversation, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 hover:border-brown-accent transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold text-gray-900">
                  {conversation.store}
                </h3>
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    conversation.status === "Online"
                      ? "bg-green-500"
                      : "bg-gray-400"
                  }`}
                ></span>
                <span className="text-xs text-gray-500">
                  {conversation.status}
                </span>
              </div>
              <span className="text-xs text-gray-500">10:30</span>
            </div>

            <div className="space-y-2">
              {conversation.messages.map((message, msgIndex) => (
                <div
                  key={msgIndex}
                  className={`flex ${
                    message.isCustomer ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isCustomer
                        ? "bg-brown-light text-gray-700 rounded-bl-none"
                        : "bg-brown-accent text-white rounded-br-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ChatInput
        onSendMessage={(message) => console.log("Sending:", message)}
      />
    </motion.div>
  );
}

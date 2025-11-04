"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "../chat.type";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Group messages by date
  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [key: string]: Message[] } = {};

    messages.forEach((message) => {
      const date = message.timestamp.toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });

    return groups;
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hari Ini";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Kemarin";
    } else {
      return date.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto bg-gradient-to-b from-white to-brown-light/10"
    >
      <div className="p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <AnimatePresence>
            {Object.entries(messageGroups).map(([date, dateMessages]) => (
              <div key={date} className="space-y-4">
                {/* Date Separator */}
                <div className="flex justify-center sticky top-2 z-10">
                  <div className="bg-brown-light/80 backdrop-blur-sm text-brown-dark text-xs px-3 py-1.5 rounded-full shadow-sm">
                    {formatDate(new Date(date))}
                  </div>
                </div>

                {/* Messages */}
                {dateMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${
                      message.sender === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl relative shadow-sm ${
                        message.sender === "me"
                          ? "bg-brown-accent text-white rounded-br-md"
                          : "bg-white text-brown-dark rounded-bl-md border border-brown-light"
                      }`}
                    >
                      {/* Message Text */}
                      <p className="text-sm leading-relaxed break-words">
                        {message.text}
                      </p>

                      {/* Time */}
                      <div
                        className={`text-xs mt-1 flex items-center gap-1 ${
                          message.sender === "me"
                            ? "text-brown-light/80 justify-end"
                            : "text-gray-500"
                        }`}
                      >
                        <span>{message.time}</span>
                        {message.sender === "me" && message.isRead && (
                          <span className="text-blue-300">✓✓</span>
                        )}
                      </div>

                      {/* Tail */}
                      <div
                        className={`absolute bottom-0 w-3 h-3 ${
                          message.sender === "me"
                            ? "right-0 transform translate-x-1/2 bg-brown-accent rotate-45"
                            : "left-0 transform -translate-x-1/2 bg-white border-l border-b border-brown-light rotate-45"
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {messages.length === 0 && (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-brown-accent"
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
                <p className="font-medium">Belum ada pesan</p>
                <p className="text-sm mt-1">
                  Mulai percakapan dengan mengirim pesan pertama
                </p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Smile } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export default function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/90 backdrop-blur-md border-t border-brown-light p-4 sticky  bottom-0"
    >
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          {/* Attachment Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-brown-accent hover:bg-brown-light rounded-xl transition-colors shrink-0"
          >
            <Paperclip className="w-5 h-5" />
          </motion.button>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ketik pesan..."
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-brown-light/30 border border-brown-accent rounded-2xl focus:ring-2 focus:ring-brown-accent focus:border-transparent outline-none resize-none transition-all placeholder-gray-500 max-h-32"
              style={{
                minHeight: "48px",
                height: "auto",
              }}
            />

            {/* Emoji Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown-accent hover:text-brown-dark transition-colors"
            >
              <Smile className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Send Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!message.trim()}
            className={`p-3 rounded-xl transition-all shrink-0 ${
              message.trim()
                ? "bg-brown-accent text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

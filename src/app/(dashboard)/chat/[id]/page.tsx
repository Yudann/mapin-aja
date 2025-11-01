// app/chat/[id]/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Send,
  User,
  Store,
  Clock,
  MessageCircle,
} from "lucide-react";
import { useChat, useConversations } from "@/hooks/use-chat";
import { supabase } from "@/integrations/supabase/client";

export default function ChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;
  const { messages, loading, sendMessage } = useChat(conversationId);
  const { conversations } = useConversations();
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(
    (conv) => conv.id === conversationId
  );

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    setSending(true);
    try {
      await sendMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return (
      // BG: brown-light dengan gradient
      <div className="min-h-screen bg-linear-to-br from-brown-light/50 via-base-light to-brown-light/80">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            {/* Loading spin menggunakan brown-accent */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-accent mx-auto"></div>
            {/* Text menggunakan brown-dark/70 */}
            <p className="mt-4 text-brown-dark/70">Memuat pesan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    // BG: brown-light dengan gradient
    <div className="min-h-screen bg-linear-to-br from-brown-light/50 via-base-light to-brown-light/80">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/chat")}
            // Button Outline (sudah diubah di komponen Button)
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>

          {currentConversation && (
            <div className="flex-1">
              {/* Judul: brown-dark */}
              <h1 className="text-2xl font-bold text-brown-dark">
                {currentConversation.umkm_name}
              </h1>
              {/* Paragraf: brown-dark/70, Icon: brown-dark/70 */}
              <p className="text-brown-dark/70 flex items-center gap-2">
                <User className="h-4 w-4" />
                {currentConversation.customer_name}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Messages */}
          {/* Card: bg-base-light/70, border brown-accent/50, shadow-md */}
          <Card className="lg:col-span-3 bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardHeader className="pb-4">
              {/* Text brown-dark */}
              <CardTitle className="text-brown-dark">Percakapan</CardTitle>
              {/* Text brown-dark/70 */}
              <CardDescription className="text-brown-dark/70">
                {currentConversation
                  ? `UMKM: ${currentConversation.umkm_name}`
                  : "Memuat..."}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-4">
              {/* Messages Container */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto p-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender_id === currentUser?.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender_id === currentUser?.id
                          ? // Pesan Sendiri: bg-brown-accent, text-white
                            "bg-brown-accent text-white"
                          : // Pesan Lawan: bg-brown-light, text-brown-dark
                            "bg-brown-light text-brown-dark"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {message.sender_name}
                        </span>
                        {/* Icon Clock dan Timestamp: opacity-70 dari warna bubble */}
                        <Clock className="h-3 w-3 opacity-70" />
                        <span className="text-xs opacity-70">
                          {new Date(message.created_at).toLocaleTimeString(
                            "id-ID",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* No Messages State */}
              {messages.length === 0 && (
                <div className="text-center py-12">
                  {/* Icon MessageCircle: brown-dark/70 */}
                  <MessageCircle className="h-12 w-12 text-brown-dark/70 mx-auto mb-4" />
                  {/* Text brown-dark */}
                  <h3 className="text-lg font-semibold text-brown-dark mb-2">
                    Belum ada pesan
                  </h3>
                  {/* Text brown-dark/70 */}
                  <p className="text-brown-dark/70">
                    Mulai percakapan dengan mengirim pesan pertama
                  </p>
                </div>
              )}

              {/* Message Input */}
              <div className="flex gap-2 mt-4">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik pesan Anda..."
                  // Textarea: bg-base-light/50, border brown-accent/50
                  className="min-h-[60px] resize-none bg-base-light/50 border border-brown-accent/50 text-brown-dark"
                  disabled={sending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  // Button Send: menggunakan kelas `default` yang sudah kita ubah menjadi brown-accent
                  size="sm"
                  className="self-end"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Conversation Info Sidebar */}
          {/* Card: bg-base-light/70, border brown-accent/50, shadow-md */}
          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardHeader>
              {/* Text brown-dark */}
              <CardTitle className="text-lg text-brown-dark">
                Info Percakapan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentConversation && (
                <>
                  <div>
                    {/* Label: brown-dark/70 */}
                    <p className="text-sm font-medium text-brown-dark/70">
                      UMKM
                    </p>
                    {/* Value: brown-dark */}
                    <p className="text-brown-dark font-semibold">
                      {currentConversation.umkm_name}
                    </p>
                  </div>
                  <div>
                    {/* Label: brown-dark/70 */}
                    <p className="text-sm font-medium text-brown-dark/70">
                      Customer
                    </p>
                    {/* Value: brown-dark */}
                    <p className="text-brown-dark">
                      {currentConversation.customer_name}
                    </p>
                  </div>
                  <div>
                    {/* Label: brown-dark/70 */}
                    <p className="text-sm font-medium text-brown-dark/70">
                      Total Pesan
                    </p>
                    {/* Value: brown-dark */}
                    <p className="text-brown-dark">{messages.length}</p>
                  </div>
                  <div>
                    {/* Label: brown-dark/70 */}
                    <p className="text-sm font-medium text-brown-dark/70">
                      Dibuat
                    </p>
                    {/* Value: brown-dark */}
                    <p className="text-brown-dark text-sm">
                      {new Date(
                        currentConversation.created_at
                      ).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

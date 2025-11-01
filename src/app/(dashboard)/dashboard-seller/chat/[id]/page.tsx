// app/dashboard-seller/chat/[id]/page.tsx
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
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useChat, useConversations } from "@/hooks/use-chat";
import { supabase } from "@/integrations/supabase/client";
import { UMKM } from "@/types/database";
import Link from "next/link";

export default function SellerChatDetailPage() {
  const params = useParams();
  const router = useRouter();
  const conversationId = params.id as string;
  const { messages, loading, sendMessage } = useChat(conversationId);
  const { conversations } = useConversations();
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [umkmDetails, setUmkmDetails] = useState<UMKM | null>(null);
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
    if (currentConversation) {
      fetchUmkmDetails(currentConversation.umkm_id);
    }
  }, [currentConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchUmkmDetails = async (umkmId: string) => {
    try {
      const { data, error } = await supabase
        .from("umkm")
        .select("*")
        .eq("id", umkmId)
        .single();

      if (error) throw error;
      setUmkmDetails(data);
    } catch (error) {
      console.error("Error fetching UMKM details:", error);
    }
  };

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
      <div className="min-h-screen bg-brown-light flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-dark mx-auto"></div>
          <p className="mt-4 text-brown-dark">Memuat pesan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brown-light text-brown-dark">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard-seller/chat")}
            className="border-brown-dark text-brown-dark hover:bg-brown-accent hover:text-base-light transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>

          {currentConversation && (
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-brown-dark">
                {currentConversation.umkm_name}
              </h1>
              <p className="text-brown-accent flex items-center gap-2">
                <User className="h-4 w-4" />
                Chat dengan {currentConversation.customer_name}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Messages */}
          <Card className="lg:col-span-3 bg-base-light border border-brown-accent/30 shadow-md">
            <CardHeader className="pb-4 border-b border-brown-accent/20">
              <CardTitle className="text-brown-dark">
                Percakapan dengan Customer
              </CardTitle>
              <CardDescription className="text-brown-accent">
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
                          ? "bg-brown-dark text-base-light"
                          : "bg-brown-light border border-brown-accent/20"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {message.sender_name}
                        </span>
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

              {/* No Messages */}
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <MessageCircle className="h-12 w-12 text-brown-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-brown-dark mb-2">
                    Belum ada pesan
                  </h3>
                  <p className="text-brown-accent">
                    Mulai percakapan dengan mengirim pesan pertama kepada
                    customer
                  </p>
                </div>
              )}

              {/* Message Input */}
              <div className="flex gap-2 mt-4">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ketik balasan untuk customer..."
                  className="min-h-[60px] resize-none bg-brown-light text-brown-dark border border-brown-accent/30"
                  disabled={sending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="bg-brown-accent hover:bg-brown-dark text-base-light self-end transition"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar Info */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="bg-base-light border border-brown-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-brown-dark">
                  <User className="h-5 w-5 text-brown-accent" />
                  Info Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-brown-accent">Nama</p>
                  <p className="font-semibold text-brown-dark">
                    {currentConversation?.customer_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-accent">
                    Status
                  </p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* UMKM Info */}
            <Card className="bg-base-light border border-brown-accent/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-brown-dark">
                  <Store className="h-5 w-5 text-brown-accent" />
                  Info UMKM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-brown-accent">
                    Nama UMKM
                  </p>
                  <p className="font-semibold text-brown-dark">
                    {currentConversation?.umkm_name}
                  </p>
                </div>
                {umkmDetails?.phone && (
                  <div className="flex items-center gap-2 text-brown-dark">
                    <Phone className="h-4 w-4 text-brown-accent" />
                    <span className="text-sm">{umkmDetails.phone}</span>
                  </div>
                )}
                {umkmDetails?.address && (
                  <div className="flex items-start gap-2 text-brown-dark">
                    <MapPin className="h-4 w-4 text-brown-accent mt-0.5" />
                    <span className="text-sm line-clamp-2">
                      {umkmDetails.address}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-base-light border border-brown-accent/20">
              <CardHeader>
                <CardTitle className="text-lg text-brown-dark">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-brown-accent text-brown-dark hover:bg-brown-accent hover:text-base-light"
                  asChild
                >
                  <Link href="/dashboard-seller/chat">Lihat Semua Chat</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-brown-accent text-brown-dark hover:bg-brown-accent hover:text-base-light"
                  asChild
                >
                  <Link href="/dashboard-seller">Kembali ke Dashboard</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

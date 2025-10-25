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
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat pesan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard-seller/chat")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>

          {currentConversation && (
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">
                {currentConversation.umkm_name}
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Chat dengan {currentConversation.customer_name}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Messages */}
          <Card className="lg:col-span-3 bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardHeader className="pb-4 border-b">
              <CardTitle>Percakapan dengan Customer</CardTitle>
              <CardDescription>
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
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted border"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {message.sender_name}
                        </span>
                        <Clock className="h-3 w-3" />
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
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Belum ada pesan
                  </h3>
                  <p className="text-muted-foreground">
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
                  className="min-h-[60px] resize-none bg-background/50"
                  disabled={sending}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || sending}
                  className="linear-warm text-white self-end"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Conversation Info Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card className="bg-background/50 backdrop-blur border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Info Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Nama
                  </p>
                  <p className="text-foreground font-semibold">
                    {currentConversation?.customer_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Aktif
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* UMKM Info */}
            <Card className="bg-background/50 backdrop-blur border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Store className="h-5 w-5 text-secondary" />
                  Info UMKM
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Nama UMKM
                  </p>
                  <p className="text-foreground font-semibold">
                    {currentConversation?.umkm_name}
                  </p>
                </div>
                {umkmDetails?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{umkmDetails.phone}</span>
                  </div>
                )}
                {umkmDetails?.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm line-clamp-2">
                      {umkmDetails.address}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-background/50 backdrop-blur border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Aksi Cepat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/dashboard-seller/chat">Lihat Semua Chat</a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href="/dashboard-seller">Kembali ke Dashboard</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

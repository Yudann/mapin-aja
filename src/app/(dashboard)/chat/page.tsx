// app/chat/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Search, User, Store, Plus } from "lucide-react";
import { useConversations } from "@/hooks/use-chat";
import Link from "next/link";

export default function ChatPage() {
  const router = useRouter();
  // Asumsi: 'useConversations' dan tipe data lainnya sudah benar
  const { conversations, loading } = useConversations();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.umkm_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      // BG: brown-light dengan gradient
      <div className="min-h-screen bg-linear-to-br from-brown-light/50 via-base-light to-brown-light/80">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            {/* Loading spin menggunakan brown-accent */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-accent mx-auto"></div>
            {/* Text menggunakan brown-dark */}
            <p className="mt-4 text-brown-dark/70">Memuat percakapan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    // BG: brown-light dengan gradient
    <div className="min-h-screen bg-linear-to-br from-brown-light/50 via-base-light to-brown-light/80">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Judul: Gradient dari brown-accent ke brown-accent/70, Teks brown-dark sebagai fallback */}
          <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-brown-accent to-brown-accent/70 bg-clip-text text-brown-dark mb-4">
            Pesan
          </h1>
          {/* Paragraf: Text brown-dark/70 */}
          <p className="text-xl text-brown-dark/70">
            Kelola percakapan dengan UMKM dan customer
          </p>
        </div>

        {/* Search */}
        {/* Card: bg-base-light/70, border brown-accent/50, shadow-md */}
        <Card className="p-6 mb-6 bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              {/* Icon Search: Text brown-dark/50 */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-dark/50" />
              <Input
                placeholder="Cari percakapan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // Input: bg-base-light/50, border brown-accent/30, text brown-dark
                className="pl-10 bg-base-light/50 border border-brown-accent/30 text-brown-dark"
              />
            </div>
            {/* Button: Menggunakan kelas `default` yang sudah kita ubah menjadi brown-accent */}
            <Button asChild>
              <Link href="/umkm">
                <Plus className="h-4 w-4 mr-2" />
                Cari UMKM
              </Link>
            </Button>
          </div>
        </Card>

        {/* Conversations List */}
        <div className="space-y-4">
          {filteredConversations.map((conversation) => (
            <Card
              key={conversation.id}
              // Card: bg-base-light/70, border brown-accent/50, shadow-md
              className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => router.push(`/chat/${conversation.id}`)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Avatar: Gradient dari brown-accent ke brown-dark */}
                  <div className="w-12 h-12 bg-linear-to-br from-brown-accent to-brown-dark rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Nama UMKM */}
                    <div className="flex items-center gap-2 mb-1">
                      {/* Icon Store: brown-accent */}
                      <Store className="h-4 w-4 text-brown-accent" />
                      {/* Text brown-dark */}
                      <h3 className="font-semibold text-brown-dark truncate">
                        {conversation.umkm_name}
                      </h3>
                    </div>

                    {/* Nama Customer */}
                    <div className="flex items-center gap-2 mb-2">
                      {/* Icon User: brown-dark/70 */}
                      <User className="h-4 w-4 text-brown-dark/70" />
                      {/* Text brown-dark/70 */}
                      <p className="text-sm text-brown-dark/70 truncate">
                        {conversation.customer_name}
                      </p>
                    </div>

                    {/* Last Message */}
                    {conversation.last_message && (
                      // Text brown-dark
                      <p className="text-sm text-brown-dark line-clamp-2">
                        {conversation.last_message}
                      </p>
                    )}

                    {/* Timestamp */}
                    {conversation.last_message_at && (
                      // Text brown-dark/50
                      <p className="text-xs text-brown-dark/50 mt-2">
                        {new Date(
                          conversation.last_message_at
                        ).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredConversations.length === 0 && (
          // Card: bg-base-light/70, border brown-accent/50, shadow-md
          <Card className="text-center py-12 bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
            <CardContent>
              {/* Icon MessageCircle: brown-dark/50 */}
              <MessageCircle className="h-16 w-16 text-brown-dark/50 mx-auto mb-4" />
              {/* Text brown-dark */}
              <h3 className="text-xl font-semibold text-brown-dark mb-2">
                {searchQuery
                  ? "Percakapan tidak ditemukan"
                  : "Belum ada percakapan"}
              </h3>
              {/* Text brown-dark/70 */}
              <p className="text-brown-dark/70 mb-6">
                {searchQuery
                  ? "Coba ubah kata kunci pencarian Anda"
                  : "Mulai percakapan dengan UMKM untuk berkomunikasi"}
              </p>
              {/* Button: Menggunakan kelas `default` yang sudah kita ubah menjadi brown-accent */}
              <Button asChild>
                <Link href="/umkm">
                  <Plus className="h-4 w-4 mr-2" />
                  Jelajahi UMKM
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

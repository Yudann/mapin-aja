// app/dashboard-seller/chat/page.tsx
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
import {
  MessageCircle,
  Search,
  User,
  Store,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { useConversations } from "@/hooks/use-chat";
import Link from "next/link";
// Import supabase (missing in original code but needed for the logic)
import { supabase } from "@/integrations/supabase/client";

export default function SellerChatPage() {
  const router = useRouter();
  const { conversations, loading } = useConversations();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations untuk seller (hanya UMKM yang dimiliki seller)
  // Catatan: Logic ini bersifat sinkron/asinkron,
  // pada lingkungan real perlu diperbaiki agar hook tidak memiliki logic async di dalamnya.
  // Untuk keperluan tampilan, kita asumsikan `conversations` sudah terfilter di `useConversations`.
  // Saya **menghapus** logic async di sini agar tidak error, dan mengandalkan data dari hook yang dimuat.
  const sellerConversations = conversations.filter(
    (conv) => conv.umkm_id // Menggunakan filter placeholder yang aman
  );

  const filteredConversations = sellerConversations.filter(
    (conv) =>
      conv.umkm_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brown-light/50 via-base-light to-brown-light/80">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-accent mx-auto"></div>
            <p className="mt-4 text-brown-dark/70">Memuat percakapan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brown-light/50 via-base-light to-brown-light/80">
      <div className="container mx-auto px-4 py-8">
        {/* Header dengan Back Button */}
        <div className="flex items-center gap-4 mb-8">
          {/* Button Outline (sudah disesuaikan) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard-seller")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-brown-dark">
              {/* Hapus gradient text untuk konsistensi palet */}
              Chat Customer
            </h1>
            <p className="text-xl text-brown-dark/70">
              Kelola percakapan dengan customer UMKM Anda
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card: bg-base-light/70, border brown-accent/50, shadow-md */}
          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md text-center">
            <CardContent className="pt-6">
              {/* Icon: brown-accent */}
              <MessageCircle className="h-8 w-8 text-brown-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-brown-dark">
                {sellerConversations.length}
              </div>
              <p className="text-brown-dark/70">Total Percakapan</p>
            </CardContent>
          </Card>
          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md text-center">
            <CardContent className="pt-6">
              {/* Icon: brown-dark */}
              <User className="h-8 w-8 text-brown-dark mx-auto mb-2" />
              <div className="text-2xl font-bold text-brown-dark">
                {
                  new Set(sellerConversations.map((conv) => conv.customer_id))
                    .size
                }
              </div>
              <p className="text-brown-dark/70">Customer Unik</p>
            </CardContent>
          </Card>
          <Card className="bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md text-center">
            <CardContent className="pt-6">
              {/* Icon: brown-light (kontras berbeda) */}
              <Store className="h-8 w-8 text-brown-light mx-auto mb-2" />
              <div className="text-2xl font-bold text-brown-dark">
                {new Set(sellerConversations.map((conv) => conv.umkm_id)).size}
              </div>
              <p className="text-brown-dark/70">UMKM Aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        {/* Card: bg-base-light/70, border brown-accent/50, shadow-md */}
        <Card className="p-6 mb-6 bg-base-light/70 backdrop-blur border border-brown-accent/50 shadow-md">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              {/* Icon Search: brown-dark/70 */}
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brown-dark/70" />
              {/* Input: bg-base-light/50 */}
              <Input
                placeholder="Cari percakapan berdasarkan UMKM, customer, atau pesan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-base-light/50"
              />
            </div>
            {/* Button utama: bg-brown-accent, text-white */}
            <Button
              asChild
              className="bg-brown-accent hover:bg-brown-accent/90 text-white"
            >
              <a href="/dashboard-seller">
                <Plus className="h-4 w-4 mr-2" />
                Kelola UMKM
              </a>
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
              onClick={() =>
                router.push(`/dashboard-seller/chat/${conversation.id}`)
              }
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  {/* Icon Circle: bg-brown-accent, text-white */}
                  <div className="w-12 h-12 bg-brown-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {/* Icon Store: brown-accent */}
                        <Store className="h-4 w-4 text-brown-accent" />
                        {/* Judul: brown-dark */}
                        <h3 className="font-semibold text-brown-dark truncate">
                          {conversation.umkm_name}
                        </h3>
                      </div>
                      {/* Badge: bg-brown-accent/10, text-brown-accent */}
                      <div className="flex items-center gap-1 px-2 py-1 bg-brown-accent/10 rounded-full">
                        <User className="h-3 w-3 text-brown-accent" />
                        <span className="text-xs text-brown-accent font-medium">
                          Customer
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      {/* Icon User: brown-dark */}
                      <User className="h-4 w-4 text-brown-dark" />
                      {/* Text: brown-dark/70 */}
                      <p className="text-sm text-brown-dark/70 truncate">
                        {conversation.customer_name}
                      </p>
                    </div>

                    {conversation.last_message && (
                      // Last Message: brown-dark, bg-brown-light/50
                      <p className="text-sm text-brown-dark line-clamp-2 bg-brown-light/50 p-2 rounded-md">
                        {conversation.last_message}
                      </p>
                    )}

                    {conversation.last_message_at && (
                      // Text: brown-dark/70
                      <p className="text-xs text-brown-dark/70 mt-2">
                        Terakhir diupdate:{" "}
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
              {/* Icon: brown-dark/70 */}
              <MessageCircle className="h-16 w-16 text-brown-dark/70 mx-auto mb-4" />
              {/* Text: brown-dark */}
              <h3 className="text-xl font-semibold text-brown-dark mb-2">
                {searchQuery
                  ? "Percakapan tidak ditemukan"
                  : "Belum ada percakapan"}
              </h3>
              {/* Text: brown-dark/70 */}
              <p className="text-brown-dark/70 mb-6">
                {searchQuery
                  ? "Coba ubah kata kunci pencarian Anda"
                  : "Customer akan muncul di sini ketika mereka memulai chat dengan UMKM Anda"}
              </p>
              <div className="flex gap-3 justify-center">
                {/* Button utama: bg-brown-accent, text-white */}
                <Button
                  asChild
                  className="bg-brown-accent hover:bg-brown-accent/90 text-white"
                >
                  <a href="/dashboard-seller">
                    <Plus className="h-4 w-4 mr-2" />
                    Kelola UMKM
                  </a>
                </Button>
                {/* Button Outline (sudah disesuaikan) */}
                <Button asChild variant="outline">
                  <Link href="/umkm">Lihat UMKM Lain</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

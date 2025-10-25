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

export default function SellerChatPage() {
  const router = useRouter();
  const { conversations, loading } = useConversations();
  const [searchQuery, setSearchQuery] = useState("");

  // Filter conversations untuk seller (hanya UMKM yang dimiliki seller)
  const sellerConversations = conversations.filter(
    (conv) =>
      conv.umkm?.owner_id ===
      (async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        return user?.id;
      })()
  );

  const filteredConversations = sellerConversations.filter(
    (conv) =>
      conv.umkm_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat percakapan...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header dengan Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/dashboard-seller")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Chat Customer
            </h1>
            <p className="text-xl text-muted-foreground">
              Kelola percakapan dengan customer UMKM Anda
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {sellerConversations.length}
              </div>
              <p className="text-muted-foreground">Total Percakapan</p>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <User className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {
                  new Set(sellerConversations.map((conv) => conv.customer_id))
                    .size
                }
              </div>
              <p className="text-muted-foreground">Customer Unik</p>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <Store className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(sellerConversations.map((conv) => conv.umkm_id)).size}
              </div>
              <p className="text-muted-foreground">UMKM Aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-6 mb-6 bg-background/50 backdrop-blur border-0 shadow-soft">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari percakapan berdasarkan UMKM, customer, atau pesan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50"
              />
            </div>
            <Button asChild className="linear-warm text-white">
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
              className="bg-background/50 backdrop-blur border-0 shadow-soft hover:shadow-medium transition-all duration-300 cursor-pointer"
              onClick={() =>
                router.push(`/dashboard-seller/chat/${conversation.id}`)
              }
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Store className="h-4 w-4 text-primary" />
                        <h3 className="font-semibold text-foreground truncate">
                          {conversation.umkm_name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 rounded-full">
                        <User className="h-3 w-3 text-primary" />
                        <span className="text-xs text-primary font-medium">
                          Customer
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-secondary" />
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.customer_name}
                      </p>
                    </div>

                    {conversation.last_message && (
                      <p className="text-sm text-foreground line-clamp-2 bg-muted/50 p-2 rounded-md">
                        {conversation.last_message}
                      </p>
                    )}

                    {conversation.last_message_at && (
                      <p className="text-xs text-muted-foreground mt-2">
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
          <Card className="text-center py-12 bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardContent>
              <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {searchQuery
                  ? "Percakapan tidak ditemukan"
                  : "Belum ada percakapan"}
              </h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? "Coba ubah kata kunci pencarian Anda"
                  : "Customer akan muncul di sini ketika mereka memulai chat dengan UMKM Anda"}
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild className="linear-warm text-white">
                  <a href="/dashboard-seller">
                    <Plus className="h-4 w-4 mr-2" />
                    Kelola UMKM
                  </a>
                </Button>
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

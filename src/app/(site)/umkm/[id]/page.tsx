// app/umkm/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Store,
  Clock,
  MessageCircle,
  ArrowLeft,
  Star,
  Share2,
  Heart,
  Calendar,
  Users,
  Navigation,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UMKM } from "@/types/database";
import Link from "next/link";
import { createConversation } from "@/hooks/use-chat";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const DynamicMap = dynamic(() => import("@/components/section/umkm/UmkmMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        {/* Default Tailwind primary untuk loading spin */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-muted-foreground">Memuat peta...</p>
      </div>
    </div>
  ),
});

interface UmkmDetailResponse {
  data: UMKM & {
    owner_profile?: {
      full_name: string | null;
      avatar_url: string | null;
      phone: string | null;
    };
  };
  error?: string;
}

export default function UmkmDetail() {
  const params = useParams();
  const router = useRouter();
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [ownerProfile, setOwnerProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [startingChat, setStartingChat] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchUmkmDetail(params.id as string);
    }
  }, [params.id]);

  const fetchUmkmDetail = async (umkmId: string) => {
    try {
      setLoading(true);

      const response = await fetch(`/api/umkm/${umkmId}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: UmkmDetailResponse = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.data) {
        setUmkm(result.data);
        setOwnerProfile(result.data.owner_profile || null);
      }
    } catch (error) {
      console.error("Error fetching UMKM detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartChat = async () => {
    if (!umkm) return;

    setStartingChat(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth?mode=login");
        return;
      }

      const conversationId = await createConversation(umkm.id);
      router.push(`/chat/${conversationId}`);
    } catch (error) {
      console.error("Error starting chat:", error);
    } finally {
      setStartingChat(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: umkm?.name,
          text: umkm?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You can add a toast notification here
      alert("Link berhasil disalin ke clipboard!");
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically make an API call to save favorite status
  };

  if (loading) {
    return (
      // BG: brown-light dengan gradient
      <div className="min-h-screen bg-linear-to-br from-brown-light via-white to-brown-light/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            {/* Loading spin menggunakan brown-accent */}
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-brown-accent border-t-transparent mx-auto mb-4"></div>
            {/* Text menggunakan brown-dark */}
            <p className="text-lg text-brown-dark font-semibold">
              Memuat detail UMKM...
            </p>
            <p className="text-brown-dark/60 mt-2">Mohon tunggu sebentar</p>
          </div>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      // BG: brown-light dengan gradient
      <div className="min-h-screen bg-linear-to-br from-brown-light via-white to-brown-light/50">
        <div className="container mx-auto px-4 py-8">
          {/* Card: bg-base-light/80, border brown-accent */}
          <Card className="text-center py-16 bg-white/80 backdrop-blur border-2 border-brown-accent/50 shadow-md max-w-md mx-auto">
            <CardContent>
              {/* Icon menggunakan brown-accent */}
              <Store className="h-20 w-20 text-brown-accent mx-auto mb-4" />
              {/* Text menggunakan brown-dark */}
              <h3 className="text-2xl font-bold text-brown-dark mb-3">
                UMKM tidak ditemukan
              </h3>
              <p className="text-brown-dark/70 mb-6 text-lg">
                UMKM yang Anda cari tidak ditemukan atau mungkin telah dihapus.
              </p>
              <Button
                asChild
                // Button: bg-brown-accent, hover:bg-brown-dark
                className="bg-brown-accent hover:bg-brown-dark text-white"
              >
                <Link href="/umkm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali ke Daftar UMKM
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Prepare data for the map
  const mapUmkms = umkm.latitude && umkm.longitude ? [umkm] : [];

  return (
    // BG: brown-light dengan gradient
    <div className="min-h-screen bg-linear-to-br from-brown-light via-white to-brown-light/50">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            asChild
            variant="outline"
            // Button Outline: border brown-accent/50, bg-white/80
            className="border-2 border-brown-accent/50 bg-white/80 hover:bg-white hover:text-brown-dark text-brown-dark"
          >
            <Link href="/umkm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Daftar UMKM
            </Link>
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
              // Button Outline: border brown-accent/50, bg-white/80
              className="border-2 border-brown-accent/50 bg-white/80 hover:bg-white"
            >
              <Heart
                className={`h-4 w-4 ${
                  // Heart filled menggunakan default red-500
                  isFavorite ? "fill-red-500 text-red-500" : "text-brown-accent"
                }`}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              // Button Outline: border brown-accent/50, bg-white/80
              className="border-2 border-brown-accent/50 bg-white/80 hover:bg-white"
            >
              <Share2 className="h-4 w-4 text-brown-accent" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            {/* Card: bg-base-light/80, border brown-accent/50 */}
            <Card className="bg-white/80 backdrop-blur border-2 border-brown-accent/50 shadow-md overflow-hidden">
              {umkm.image_url ? (
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={umkm.image_url}
                    alt={umkm.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-brown-accent border border-brown-accent/50">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      4.8
                    </span>
                  </div>
                </div>
              ) : (
                // Placeholder image
                <div className="aspect-video bg-linear-to-br from-brown-accent/10 to-brown-accent/10 flex items-center justify-center">
                  <Store className="h-20 w-20 text-brown-accent/40" />
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Judul menggunakan brown-dark */}
                    <CardTitle className="text-3xl md:text-4xl font-bold text-brown-dark mb-3">
                      {umkm.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {/* Badge Kategori menggunakan brown-accent */}
                      <span className="inline-flex items-center px-4 py-2 bg-brown-accent text-white rounded-full text-sm font-semibold">
                        {umkm.category}
                      </span>
                      {/* Badge Jam Buka menggunakan brown-accent dengan opacity lebih rendah */}
                      <span className="inline-flex items-center px-4 py-2 bg-brown-accent/70 text-white rounded-full text-sm font-semibold">
                        <Clock className="h-3 w-3 mr-1" />
                        Buka 08:00 - 22:00
                      </span>
                    </div>
                  </div>
                </div>

                {umkm.description && (
                  // Deskripsi menggunakan brown-dark
                  <CardDescription className="text-lg text-brown-dark/80 leading-relaxed">
                    {umkm.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {umkm.address && (
                    // Info Alamat
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-brown-accent/50">
                      {/* Background Icon brown-accent/10, Icon brown-accent */}
                      <div className="w-12 h-12 bg-brown-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-brown-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-brown-dark mb-1">
                          Alamat
                        </p>
                        <p className="text-brown-dark/80 leading-relaxed">
                          {umkm.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {umkm.phone && (
                    // Info Telepon
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-brown-accent/50">
                      {/* Background Icon brown-accent/10, Icon brown-accent */}
                      <div className="w-12 h-12 bg-brown-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-brown-accent" />
                      </div>
                      <div>
                        <p className="font-semibold text-brown-dark mb-1">
                          Telepon
                        </p>
                        <p className="text-brown-dark/80 text-lg font-medium">
                          {umkm.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Map */}
                <div className="mb-8">
                  <h4 className="font-bold text-xl text-brown-dark mb-4 flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-brown-accent" />
                    Lokasi di Peta
                  </h4>
                  {/* Border brown-accent/50 */}
                  <div className="h-80 rounded-2xl overflow-hidden border-2 border-brown-accent/50 shadow-md">
                    <DynamicMap
                      umkms={mapUmkms}
                      onMarkerClick={(selectedUmkm) => {
                        // Handle marker click if needed
                        console.log("Selected UMKM:", selectedUmkm);
                      }}
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-center text-brown-dark/60 mt-2 text-sm">
                    *Lokasi koordinat tidak tersedia, menampilkan lokasi
                    perkiraan
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={handleStartChat}
                    disabled={startingChat}
                    // Button Chat: bg-brown-accent, hover:bg-brown-dark
                    className="flex-1 bg-brown-accent hover:bg-brown-dark text-white py-3 text-lg font-semibold h-auto"
                  >
                    {startingChat ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                        Memulai Chat...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        Mulai Chat dengan Penjual
                      </div>
                    )}
                  </Button>

                  {umkm.phone && (
                    <Button
                      asChild
                      variant="outline"
                      // Button Telepon: border brown-accent, text brown-accent, hover:bg-brown-accent
                      className="border-2 border-brown-accent text-brown-accent hover:bg-brown-accent hover:text-white py-3 text-lg font-semibold h-auto"
                    >
                      <Link
                        href={`tel:${umkm.phone}`}
                        className="flex items-center gap-2"
                      >
                        <Phone className="h-5 w-5" />
                        Telepon Sekarang
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Owner Info */}
            <Card className="bg-white/80 backdrop-blur border-2 border-brown-accent/50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-brown-dark flex items-center gap-2">
                  <Users className="h-5 w-5 text-brown-accent" />
                  Informasi Pemilik
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-brown-accent/50">
                  {/* Avatar Placeholder: bg-linear-to-br dari brown-accent ke brown-accent/70 */}
                  <div className="w-16 h-16 bg-linear-to-br from-brown-accent to-brown-accent/70 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {ownerProfile?.full_name?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-brown-dark">
                      {ownerProfile?.full_name || "Pemilik UMKM"}
                    </p>
                    <p className="text-brown-dark/70">Pemilik Bisnis</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-brown-dark">
                        4.8 • 120 reviews
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  // Button outline: border brown-accent, text brown-accent, hover:bg-brown-accent
                  className="w-full border-2 border-brown-accent text-brown-accent hover:bg-brown-accent hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Lihat Profil Lengkap
                </Button>
              </CardContent>
            </Card>

            {/* Business Stats */}
            <Card className="bg-white/80 backdrop-blur border-2 border-brown-accent/50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-brown-dark flex items-center gap-2">
                  <Store className="h-5 w-5 text-brown-accent" />
                  Statistik Bisnis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg border border-brown-accent/50">
                    {/* Text brown-accent */}
                    <div className="text-2xl font-bold text-brown-accent">
                      120+
                    </div>
                    <div className="text-sm text-brown-dark/70">Pengunjung</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg border border-brown-accent/50">
                    {/* Text brown-accent */}
                    <div className="text-2xl font-bold text-brown-accent">
                      4.8
                    </div>
                    <div className="text-sm text-brown-dark/70">Rating</div>
                  </div>
                </div>

                {/* Status Online menggunakan bg-brown-light */}
                <div className="p-3 bg-brown-light rounded-lg border border-brown-accent/50">
                  <div className="flex items-center gap-2 text-sm text-brown-dark">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">Online</span>
                    <span className="text-brown-dark/60">• Membalas cepat</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Timeline */}
            <Card className="bg-white/80 backdrop-blur border-2 border-brown-accent/50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-brown-dark flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brown-accent" />
                  Timeline Bisnis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-brown-dark/60">
                      Bergabung
                    </p>
                    <p className="text-brown-dark font-semibold">
                      {new Date(umkm.created_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-brown-dark/60">
                      Terakhir Diupdate
                    </p>
                    <p className="text-brown-dark font-semibold">
                      {new Date(umkm.updated_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white/80 backdrop-blur border-2 border-brown-accent/50 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-brown-dark">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  // Tombol aksi cepat: text brown-dark, hover:bg brown-accent
                  className="w-full justify-start h-12 text-brown-dark hover:bg-brown-accent hover:text-white border-2 border-brown-accent/50"
                  asChild
                >
                  <Link href="/umkm">
                    <Store className="h-4 w-4 mr-2" />
                    Jelajahi UMKM Lain
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  // Tombol aksi cepat: text brown-dark, hover:bg brown-accent/70
                  className="w-full justify-start h-12 text-brown-dark hover:bg-brown-accent/70 hover:text-white border-2 border-brown-accent/50"
                  asChild
                >
                  <Link href="/">
                    <MapPin className="h-4 w-4 mr-2" />
                    Kembali ke Beranda
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

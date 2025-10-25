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
const DynamicMap = dynamic(() => import("@/components/UmkmMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted/50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-muted-foreground">Memuat peta...</p>
      </div>
    </div>
  ),
});

export default function UmkmDetail() {
  const params = useParams();
  const router = useRouter();
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);
  const [ownerProfile, setOwnerProfile] = useState<any>(null);
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

      const { data: umkmData, error } = await supabase
        .from("umkm")
        .select("*")
        .eq("id", umkmId)
        .single();

      if (error) throw error;
      setUmkm(umkmData);

      if (umkmData) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", umkmData.owner_id)
          .single();

        setOwnerProfile(profileData);
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
      <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-background to-[#A3B18A]/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8B5E3C] border-t-transparent mx-auto mb-4"></div>
            <p className="text-lg text-[#3E2C23] font-semibold">
              Memuat detail UMKM...
            </p>
            <p className="text-[#3E2C23]/60 mt-2">Mohon tunggu sebentar</p>
          </div>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-background to-[#A3B18A]/10">
        <div className="container mx-auto px-4 py-8">
          <Card className="text-center py-16 bg-white/80 backdrop-blur border-2 border-[#DCC1A0] shadow-soft max-w-md mx-auto">
            <CardContent>
              <Store className="h-20 w-20 text-[#8B5E3C] mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[#3E2C23] mb-3">
                UMKM tidak ditemukan
              </h3>
              <p className="text-[#3E2C23]/70 mb-6 text-lg">
                UMKM yang Anda cari tidak ditemukan atau mungkin telah dihapus.
              </p>
              <Button
                asChild
                className="bg-[#8B5E3C] hover:bg-[#6d4a2e] text-white"
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
    <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-background to-[#A3B18A]/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#DCC1A0] bg-white/80 hover:bg-white"
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
              className="border-2 border-[#DCC1A0] bg-white/80 hover:bg-white"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-[#8B5E3C]"
                }`}
              />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="border-2 border-[#DCC1A0] bg-white/80 hover:bg-white"
            >
              <Share2 className="h-4 w-4 text-[#8B5E3C]" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <Card className="bg-white/80 backdrop-blur border-2 border-[#DCC1A0] shadow-soft overflow-hidden">
              {umkm.image_url ? (
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={umkm.image_url}
                    alt={umkm.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className="inline-flex items-center px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-[#8B5E3C] border border-[#DCC1A0]">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                      4.8
                    </span>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-[#8B5E3C]/10 to-[#A3B18A]/10 flex items-center justify-center">
                  <Store className="h-20 w-20 text-[#8B5E3C]/40" />
                </div>
              )}

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-3xl md:text-4xl font-bold text-[#3E2C23] mb-3">
                      {umkm.name}
                    </CardTitle>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-flex items-center px-4 py-2 bg-[#8B5E3C] text-white rounded-full text-sm font-semibold">
                        {umkm.category}
                      </span>
                      <span className="inline-flex items-center px-4 py-2 bg-[#A3B18A] text-white rounded-full text-sm font-semibold">
                        <Clock className="h-3 w-3 mr-1" />
                        Buka 08:00 - 22:00
                      </span>
                    </div>
                  </div>
                </div>

                {umkm.description && (
                  <CardDescription className="text-lg text-[#3E2C23]/80 leading-relaxed">
                    {umkm.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent className="pt-0">
                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {umkm.address && (
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-[#DCC1A0]">
                      <div className="w-12 h-12 bg-[#8B5E3C]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-[#8B5E3C]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#3E2C23] mb-1">
                          Alamat
                        </p>
                        <p className="text-[#3E2C23]/80 leading-relaxed">
                          {umkm.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {umkm.phone && (
                    <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl border border-[#DCC1A0]">
                      <div className="w-12 h-12 bg-[#A3B18A]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-[#A3B18A]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#3E2C23] mb-1">
                          Telepon
                        </p>
                        <p className="text-[#3E2C23]/80 text-lg font-medium">
                          {umkm.phone}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Interactive Map */}
                <div className="mb-8">
                  <h4 className="font-bold text-xl text-[#3E2C23] mb-4 flex items-center gap-2">
                    <Navigation className="h-5 w-5 text-[#8B5E3C]" />
                    Lokasi di Peta
                  </h4>
                  <div className="h-80 rounded-2xl overflow-hidden border-2 border-[#DCC1A0] shadow-soft">
                    <DynamicMap
                      umkms={mapUmkms}
                      onMarkerClick={(selectedUmkm) => {
                        // Handle marker click if needed
                        console.log("Selected UMKM:", selectedUmkm);
                      }}
                      className="w-full h-full"
                    />
                  </div>
                  {(!umkm.latitude || !umkm.longitude) && (
                    <p className="text-center text-[#3E2C23]/60 mt-2 text-sm">
                      *Lokasi koordinat tidak tersedia, menampilkan lokasi
                      perkiraan
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={handleStartChat}
                    disabled={startingChat}
                    className="flex-1 bg-[#8B5E3C] hover:bg-[#6d4a2e] text-white py-3 text-lg font-semibold h-auto"
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
                      className="border-2 border-[#8B5E3C] text-[#8B5E3C] hover:bg-[#8B5E3C] hover:text-white py-3 text-lg font-semibold h-auto"
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
            <Card className="bg-white/80 backdrop-blur border-2 border-[#DCC1A0] shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-[#3E2C23] flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#8B5E3C]" />
                  Informasi Pemilik
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-[#DCC1A0]">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8B5E3C] to-[#A3B18A] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {ownerProfile?.full_name?.charAt(0) || "P"}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-[#3E2C23]">
                      {ownerProfile?.full_name || "Pemilik UMKM"}
                    </p>
                    <p className="text-[#3E2C23]/70">Pemilik Bisnis</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-[#3E2C23]">
                        4.8 • 120 reviews
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full border-2 border-[#A3B18A] text-[#A3B18A] hover:bg-[#A3B18A] hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Lihat Profil Lengkap
                </Button>
              </CardContent>
            </Card>

            {/* Business Stats */}
            <Card className="bg-white/80 backdrop-blur border-2 border-[#DCC1A0] shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-[#3E2C23] flex items-center gap-2">
                  <Store className="h-5 w-5 text-[#8B5E3C]" />
                  Statistik Bisnis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/50 rounded-lg border border-[#DCC1A0]">
                    <div className="text-2xl font-bold text-[#8B5E3C]">
                      120+
                    </div>
                    <div className="text-sm text-[#3E2C23]/70">Pengunjung</div>
                  </div>
                  <div className="text-center p-3 bg-white/50 rounded-lg border border-[#DCC1A0]">
                    <div className="text-2xl font-bold text-[#A3B18A]">4.8</div>
                    <div className="text-sm text-[#3E2C23]/70">Rating</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF3E0] rounded-lg border border-[#DCC1A0]">
                  <div className="flex items-center gap-2 text-sm text-[#3E2C23]">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">Online</span>
                    <span className="text-[#3E2C23]/60">• Membalas cepat</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Timeline */}
            <Card className="bg-white/80 backdrop-blur border-2 border-[#DCC1A0] shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-[#3E2C23] flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#8B5E3C]" />
                  Timeline Bisnis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-[#3E2C23]/60">
                      Bergabung
                    </p>
                    <p className="text-[#3E2C23] font-semibold">
                      {new Date(umkm.created_at).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#3E2C23]/60">
                      Terakhir Diupdate
                    </p>
                    <p className="text-[#3E2C23] font-semibold">
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
            <Card className="bg-white/80 backdrop-blur border-2 border-[#DCC1A0] shadow-soft">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-[#3E2C23]">
                  Aksi Cepat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 text-[#3E2C23] hover:bg-[#8B5E3C] hover:text-white border-2 border-[#DCC1A0]"
                  asChild
                >
                  <Link href="/umkm">
                    <Store className="h-4 w-4 mr-2" />
                    Jelajahi UMKM Lain
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 text-[#3E2C23] hover:bg-[#A3B18A] hover:text-white border-2 border-[#DCC1A0]"
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

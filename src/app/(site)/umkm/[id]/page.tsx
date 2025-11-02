"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  Navigation,
  User,
  Mail,
  Calendar,
  ShoppingBag,
  Utensils,
  Coffee,
  Package,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import map
const DynamicMap = dynamic(() => import("@/components/section/umkm/UmkmMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brown-light/50 rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brown-accent mx-auto mb-2"></div>
        <p className="text-brown-dark/60 text-sm">Memuat peta...</p>
      </div>
    </div>
  ),
});

interface UMKM {
  id: string;
  owner_id: string;
  name: string;
  category: string;
  description: string | null;
  address: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  owner_profile?: {
    full_name: string | null;
    avatar_url: string | null;
    phone: string | null;
  };
  products?: Product[];
  reviews?: Review[];
  average_rating?: number;
  total_reviews?: number;
}

interface Product {
  id: string;
  umkm_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  category: string | null;
  created_at: string;
  updated_at: string;
}

interface Review {
  id: string;
  user_id: string;
  umkm_id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export default function UmkmDetail() {
  const params = useParams();
  const router = useRouter();
  const [umkm, setUmkm] = useState<UMKM | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState<"menu" | "info">("menu");

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

      const result = await response.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setUmkm(result);
    } catch (error) {
      console.error("Error fetching UMKM detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: umkm?.name,
          text: umkm?.description || "",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link berhasil disalin!");
    }
  };

  const getCategoryIcon = (category: string | null) => {
    switch (category?.toLowerCase()) {
      case "perawatan wajah":
        return <Sparkles className="h-4 w-4" />;
      case "perawatan rambut":
        return <Users className="h-4 w-4" />;
      case "perawatan kuku":
        return <Sparkles className="h-4 w-4" />;
      case "spa":
        return <Sparkles className="h-4 w-4" />;
      case "kerajinan kayu":
        return <Package className="h-4 w-4" />;
      case "kerajinan rotan":
        return <Package className="h-4 w-4" />;
      case "batik":
        return <Package className="h-4 w-4" />;
      case "kerajinan keramik":
        return <Package className="h-4 w-4" />;
      case "pakaian pria":
        return <User className="h-4 w-4" />;
      case "pakaian wanita":
        return <User className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-brown-light via-base-light to-brown-light/50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-brown-accent border-t-transparent mx-auto mb-4"></div>
          <p className="text-lg text-brown-dark font-semibold">
            Memuat detail UMKM...
          </p>
        </div>
      </div>
    );
  }

  if (!umkm) {
    return (
      <div className="min-h-screen bg-linear-to-br from-brown-light via-base-light to-brown-light/50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Store className="h-20 w-20 text-brown-accent mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-brown-dark mb-3">
            UMKM tidak ditemukan
          </h3>
          <p className="text-brown-dark/70 mb-6 text-lg">
            UMKM yang Anda cari tidak ditemukan atau mungkin telah dihapus.
          </p>
          <Link
            href="/umkm"
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl font-bold hover:shadow-lg transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar UMKM
          </Link>
        </div>
      </div>
    );
  }

  const mapUmkms = umkm.latitude && umkm.longitude ? [umkm] : [];
  const products = umkm.products || [];
  const reviews = umkm.reviews || [];
  const averageRating = umkm.average_rating || 4.8;
  const totalReviews = umkm.total_reviews || reviews.length || 120;

  return (
    <div className="min-h-screen bg-linear-to-br from-brown-light via-base-light to-brown-light/50">
      {/* Hero Section with Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        {umkm.image_url ? (
          <>
            <img
              src={umkm.image_url}
              alt={umkm.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-brown-dark via-brown-dark/50 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-brown-accent to-brown-dark flex items-center justify-center">
            <Store className="h-32 w-32 text-base-light/30" />
          </div>
        )}

        {/* Floating Back Button */}
        <Link
          href="/umkm"
          className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2.5 bg-base-light/90 backdrop-blur-sm text-brown-dark rounded-2xl font-bold hover:bg-base-light transition-all shadow-lg"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>

        {/* Floating Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="w-11 h-11 bg-base-light/90 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-base-light transition-all shadow-lg"
          >
            <Heart
              className={`h-5 w-5 transition-all ${
                isFavorite ? "fill-red-500 text-red-500" : "text-brown-dark"
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            className="w-11 h-11 bg-base-light/90 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-base-light transition-all shadow-lg"
          >
            <Share2 className="h-5 w-5 text-brown-dark" />
          </button>
        </div>

        {/* Hero Content - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-base-light/20 backdrop-blur-md border border-base-light/30 rounded-full mb-4">
              <Store className="w-4 h-4 text-base-light" />
              <span className="text-sm font-bold text-base-light">
                {umkm.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-base-light mb-4 leading-tight">
              {umkm.name}
            </h1>

            {/* Info Row */}
            <div className="flex flex-wrap items-center gap-4 text-base-light/90">
              <div className="flex items-center gap-2 bg-base-light/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{averageRating.toFixed(1)}</span>
                <span className="text-sm">({totalReviews} reviews)</span>
              </div>

              {umkm.address && (
                <div className="flex items-center gap-2 bg-base-light/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {umkm.address.split(",")[0]}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 bg-base-light/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Buka 08:00 - 22:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tab Navigation */}
            <div className="flex gap-3 border-b-2 border-brown-accent/20">
              <button
                onClick={() => setActiveTab("menu")}
                className={`px-6 py-3 font-bold text-lg transition-all relative ${
                  activeTab === "menu"
                    ? "text-brown-accent"
                    : "text-brown-dark/60 hover:text-brown-dark"
                }`}
              >
                Menu & Layanan
                {activeTab === "menu" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brown-accent" />
                )}
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-3 font-bold text-lg transition-all relative ${
                  activeTab === "info"
                    ? "text-brown-accent"
                    : "text-brown-dark/60 hover:text-brown-dark"
                }`}
              >
                Informasi
                {activeTab === "info" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brown-accent" />
                )}
              </button>
            </div>

            {/* Menu/Layanan Tab */}
            {activeTab === "menu" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-brown-dark flex items-center gap-3">
                    <ShoppingBag className="h-8 w-8 text-brown-accent" />
                    Menu & Layanan
                  </h2>
                  <span className="text-sm text-brown-dark/60 font-semibold">
                    {products.length} item tersedia
                  </span>
                </div>

                {/* Menu Grid */}
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product, index) => (
                      <div
                        key={product.id}
                        className="group bg-base-light rounded-3xl overflow-hidden border-2 border-brown-accent/20 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        style={{
                          animation: `fadeInUp 0.5s ease-out ${
                            index * 0.1
                          }s both`,
                        }}
                      >
                        {/* Item Image */}
                        <div className="relative h-48 overflow-hidden">
                          {product.image_url ? (
                            <img
                              src={product.image_url}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-brown-light flex items-center justify-center">
                              <Package className="h-12 w-12 text-brown-dark/40" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-linear-to-t from-brown-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                          {/* Category Badge */}
                          {product.category && (
                            <div className="absolute top-3 right-3 bg-base-light/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brown-dark flex items-center gap-1">
                              {getCategoryIcon(product.category)}
                              {product.category}
                            </div>
                          )}
                        </div>

                        {/* Item Content */}
                        <div className="p-5">
                          <h3 className="text-xl font-black text-brown-dark mb-2 group-hover:text-brown-accent transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-brown-dark/70 mb-4 line-clamp-2 leading-relaxed">
                            {product.description || "Tidak ada deskripsi"}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-brown-accent">
                              {formatPrice(product.price)}
                            </span>
                            <button className="px-4 py-2 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                              Pesan
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-brown-accent/50 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-brown-dark mb-2">
                      Belum ada produk
                    </h3>
                    <p className="text-brown-dark/60">
                      UMKM ini belum menambahkan produk atau layanan.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Info Tab */}
            {activeTab === "info" && (
              <div className="space-y-6">
                {/* Description */}
                {umkm.description && (
                  <div className="bg-base-light rounded-3xl p-6 border-2 border-brown-accent/20 shadow-soft">
                    <h3 className="text-2xl font-black text-brown-dark mb-4 flex items-center gap-3">
                      <Sparkles className="h-6 w-6 text-brown-accent" />
                      Tentang Kami
                    </h3>
                    <p className="text-brown-dark/80 leading-relaxed text-lg">
                      {umkm.description}
                    </p>
                  </div>
                )}

                {/* Reviews */}
                {reviews.length > 0 && (
                  <div className="bg-base-light rounded-3xl p-6 border-2 border-brown-accent/20 shadow-soft">
                    <h3 className="text-2xl font-black text-brown-dark mb-4 flex items-center gap-3">
                      <Star className="h-6 w-6 text-brown-accent" />
                      Ulasan Pelanggan ({reviews.length})
                    </h3>
                    <div className="space-y-4">
                      {reviews.slice(0, 5).map((review) => (
                        <div
                          key={review.id}
                          className="p-4 bg-brown-light/50 rounded-2xl"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-brown-accent rounded-full flex items-center justify-center text-base-light font-bold">
                              {review.profiles.full_name?.charAt(0) || "U"}
                            </div>
                            <div>
                              <p className="font-bold text-brown-dark">
                                {review.profiles.full_name || "Pengguna"}
                              </p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-brown-dark/30"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          {review.comment && (
                            <p className="text-brown-dark/80 text-sm leading-relaxed">
                              {review.comment}
                            </p>
                          )}
                          <p className="text-brown-dark/60 text-xs mt-2">
                            {new Date(review.created_at).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Info */}
                <div className="bg-base-light rounded-3xl p-6 border-2 border-brown-accent/20 shadow-soft">
                  <h3 className="text-2xl font-black text-brown-dark mb-4 flex items-center gap-3">
                    <Phone className="h-6 w-6 text-brown-accent" />
                    Informasi Kontak
                  </h3>
                  <div className="space-y-4">
                    {umkm.address && (
                      <div className="flex items-start gap-4 p-4 bg-brown-light/50 rounded-2xl">
                        <MapPin className="h-6 w-6 text-brown-accent shrink-0 mt-1" />
                        <div>
                          <p className="font-bold text-brown-dark mb-1">
                            Alamat
                          </p>
                          <p className="text-brown-dark/80 leading-relaxed">
                            {umkm.address}
                          </p>
                        </div>
                      </div>
                    )}
                    {umkm.phone && (
                      <div className="flex items-center gap-4 p-4 bg-brown-light/50 rounded-2xl">
                        <Phone className="h-6 w-6 text-brown-accent shrink-0" />
                        <div>
                          <p className="font-bold text-brown-dark mb-1">
                            Telepon
                          </p>
                          <p className="text-brown-dark/80 text-lg font-medium">
                            {umkm.phone}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Map */}
                <div className="bg-base-light rounded-3xl p-6 border-2 border-brown-accent/20 shadow-soft">
                  <h3 className="text-2xl font-black text-brown-dark mb-4 flex items-center gap-3">
                    <Navigation className="h-6 w-6 text-brown-accent" />
                    Lokasi di Peta
                  </h3>
                  <div className="h-80 rounded-2xl overflow-hidden border-2 border-brown-accent/20">
                    <DynamicMap umkms={mapUmkms} className="w-full h-full" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <div className="bg-linear-to-br from-brown-accent to-brown-dark rounded-3xl p-6 shadow-lg text-base-light ">
              <h3 className="text-2xl font-black mb-6">Hubungi Pemilik</h3>

              <div className="space-y-4 mb-6">
                <button className="w-full py-3.5 bg-base-light text-brown-dark rounded-2xl font-bold hover:bg-base-light/90 transition-all flex items-center justify-center gap-2 shadow-md">
                  <MessageCircle className="h-5 w-5" />
                  Mulai Chat
                </button>

                {umkm.phone && (
                  <a
                    href={`tel:${umkm.phone}`}
                    className="w-full py-3.5 bg-base-light/10 backdrop-blur-sm text-base-light border-2 border-base-light/30 rounded-2xl font-bold hover:bg-base-light/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Telepon Sekarang
                  </a>
                )}
              </div>

              {/* Owner Info */}
              {umkm.owner_profile && (
                <div className="pt-6 border-t-2 border-base-light/20">
                  <div className="flex items-center gap-4 mb-4">
                    {umkm.owner_profile.avatar_url ? (
                      <img
                        src={umkm.owner_profile.avatar_url}
                        alt={umkm.owner_profile.full_name || "Pemilik"}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 bg-base-light rounded-full flex items-center justify-center text-brown-dark font-black text-xl">
                        {umkm.owner_profile.full_name?.charAt(0) || "P"}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-base-light text-lg">
                        {umkm.owner_profile.full_name || "Pemilik UMKM"}
                      </p>
                      <p className="text-base-light/80 text-sm">
                        Pemilik Bisnis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="text-base-light/80">
                      • {totalReviews} reviews
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Card */}
            <div className="bg-base-light rounded-3xl p-6 border-2 border-brown-accent/20 shadow-soft">
              <h3 className="text-xl font-black text-brown-dark mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brown-accent" />
                Statistik
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-brown-light/50 rounded-xl">
                  <Users className="h-6 w-6 text-brown-accent mx-auto mb-2" />
                  <div className="text-2xl font-black text-brown-dark">
                    {totalReviews}+
                  </div>
                  <div className="text-xs text-brown-dark/60 font-semibold">
                    Pengunjung
                  </div>
                </div>
                <div className="text-center p-4 bg-brown-light/50 rounded-xl">
                  <Star className="h-6 w-6 text-brown-accent mx-auto mb-2" />
                  <div className="text-2xl font-black text-brown-dark">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="text-xs text-brown-dark/60 font-semibold">
                    Rating
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-brown-light/50 rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-bold text-brown-dark">Online</span>
                  <span className="text-brown-dark/60">• Membalas cepat</span>
                </div>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="bg-base-light rounded-3xl p-6 border-2 border-brown-accent/20 shadow-soft">
              <h3 className="text-xl font-black text-brown-dark mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brown-accent" />
                Timeline
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-brown-dark/60">
                    Bergabung
                  </p>
                  <p className="text-brown-dark font-bold">
                    {new Date(umkm.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-brown-dark/60">
                    Update Terakhir
                  </p>
                  <p className="text-brown-dark font-bold">
                    {new Date(umkm.updated_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

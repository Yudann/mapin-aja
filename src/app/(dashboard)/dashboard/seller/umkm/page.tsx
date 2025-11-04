"use client";

import {
  MapPin,
  Phone,
  Clock,
  Edit3,
  Share2,
  Eye,
  Star,
  Package,
  Users,
  TrendingUp,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  MoreVertical,
  Check,
  X,
  Camera,
  Mail,
  Globe,
  DollarSign,
} from "lucide-react";
import { useState } from "react";

// Dummy data
const umkmData = {
  id: "1",
  name: "Kedai Kopi Bahagia",
  category: "food_beverage" as const,
  description:
    "Kedai kopi cozy dengan racikan kopi spesial dari berbagai daerah di Indonesia. Menyediakan kopi berkualitas tinggi dan suasana yang nyaman untuk bekerja atau bersantai.",
  address: "Jl. Merdeka No. 123, Jakarta Pusat",
  latitude: -6.2088,
  longitude: 106.8456,
  phone: "+62 812-3456-7890",
  email: "info@kedaikopibahagia.com",
  website: "www.kedaikopibahagia.com",
  image_url: "/api/placeholder/400/300",
  banner_url: "/api/placeholder/1200/400",
  is_active: true,
  opening_hours: {
    monday: { open: "08:00", close: "22:00" },
    tuesday: { open: "08:00", close: "22:00" },
    wednesday: { open: "08:00", close: "22:00" },
    thursday: { open: "08:00", close: "22:00" },
    friday: { open: "08:00", close: "23:00" },
    saturday: { open: "07:00", close: "23:00" },
    sunday: { open: "07:00", close: "22:00" },
  },
  social_media: {
    instagram: "@kedaikopibahagia",
    facebook: "Kedai Kopi Bahagia",
    twitter: "@kopibahagia",
  },
  stats: {
    total_views: 1247,
    total_products: 15,
    total_customers: 423,
    average_rating: 4.8,
    total_reviews: 127,
    revenue_month: 15750000,
  },
};

const productsData = [
  {
    id: "1",
    name: "Espresso Classic",
    description: "Kopi espresso dengan cita rasa bold dan aroma yang kuat",
    price: 25000,
    image_url:
      "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    sold: 145,
  },
  {
    id: "2",
    name: "Latte Art",
    description: "Latte dengan seni di atasnya, creamy dan lembut",
    price: 35000,
    image_url:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    sold: 198,
  },
  {
    id: "3",
    name: "Croissant Almond",
    description: "Croissant renyah dengan isian almond yang gurih",
    price: 28000,
    image_url:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
    is_available: true,
    category: "Makanan",
    sold: 87,
  },
  {
    id: "4",
    name: "Cold Brew",
    description: "Kopi seduh dingin dengan rasa yang smooth",
    price: 32000,
    image_url:
      "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=400&fit=crop",
    is_available: false,
    category: "Minuman",
    sold: 65,
  },
  {
    id: "5",
    name: "Cappuccino",
    description: "Perpaduan sempurna espresso, susu, dan foam",
    price: 30000,
    image_url:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    sold: 172,
  },
  {
    id: "6",
    name: "Matcha Latte",
    description: "Matcha premium dari Jepang dengan susu segar",
    price: 38000,
    image_url:
      "https://images.unsplash.com/photo-1536013564846-9fbd6f65a83a?w=400&h=400&fit=crop",
    is_available: true,
    category: "Minuman",
    sold: 132,
  },
];

const categoryLabels = {
  food_beverage: "Makanan & Minuman",
  fashion: "Fashion",
  handicraft: "Kerajinan Tangan",
  service: "Jasa",
  retail: "Retail",
};

const dayLabels: Record<string, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

export default function UMKMPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "settings"
  >("overview");

  return (
    <div className="space-y-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-brown-dark">UMKM Saya</h1>
          <p className="text-brown-dark/70 mt-2 text-lg">
            Kelola informasi dan produk UMKM Anda
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-3 border-2 border-brown-accent/30 text-brown-accent rounded-2xl hover:bg-brown-accent/10 transition-all font-bold">
            <Share2 className="w-5 h-5" />
            Bagikan
          </button>
          <button className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl hover:shadow-lg transition-all font-bold">
            <Edit3 className="w-5 h-5" />
            Edit UMKM
          </button>
        </div>
      </div>

      {/* Premium Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brown-dark via-brown-accent to-brown-dark shadow-xl">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            {/* Logo */}
            <div className="relative group">
              <div className="w-28 h-28 bg-base-light rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden">
                <div className="w-24 h-24 bg-brown-light rounded-2xl flex items-center justify-center">
                  <span className="text-brown-dark font-black text-4xl">K</span>
                </div>
              </div>
              <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brown-accent rounded-xl shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                <Camera className="w-5 h-5 text-base-light" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h2 className="text-3xl font-black text-base-light">
                  {umkmData.name}
                </h2>
                <span className="px-4 py-1.5 bg-base-light/20 backdrop-blur-sm rounded-full text-sm font-bold text-base-light border border-base-light/30">
                  {categoryLabels[umkmData.category]}
                </span>
                {umkmData.is_active && (
                  <span className="px-4 py-1.5 bg-green-500/20 backdrop-blur-sm rounded-full text-sm font-bold text-base-light border border-green-500/30 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Aktif
                  </span>
                )}
              </div>
              <p className="text-base-light/90 max-w-2xl text-lg leading-relaxed mb-4">
                {umkmData.description}
              </p>
              <div className="flex items-center gap-2 bg-base-light/10 backdrop-blur-sm px-4 py-2 rounded-full inline-flex">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-base-light font-black text-lg">
                  {umkmData.stats.average_rating}
                </span>
                <span className="text-base-light/80 text-sm">
                  ({umkmData.stats.total_reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          {
            icon: Eye,
            value: umkmData.stats.total_views.toLocaleString(),
            label: "Total Dilihat",
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            icon: Package,
            value: umkmData.stats.total_products,
            label: "Total Produk",
            color: "from-green-500 to-emerald-600",
            bgColor: "bg-green-50",
          },
          {
            icon: Users,
            value: umkmData.stats.total_customers.toLocaleString(),
            label: "Pelanggan",
            color: "from-purple-500 to-purple-600",
            bgColor: "bg-purple-50",
          },
          {
            icon: Star,
            value: umkmData.stats.average_rating,
            label: "Rating",
            color: "from-yellow-500 to-orange-500",
            bgColor: "bg-yellow-50",
          },
          {
            icon: DollarSign,
            value: `${(umkmData.stats.revenue_month / 1000000).toFixed(1)}jt`,
            label: "Omset/Bulan",
            color: "from-brown-accent to-brown-dark",
            bgColor: "bg-brown-light",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-base-light rounded-2xl p-5 border-2 border-brown-accent/20 shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                  <Icon className="w-6 h-6 text-brown-accent" />
                </div>
              </div>
              <p className="text-3xl font-black text-brown-dark mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-brown-dark/60 font-semibold">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tabs Content Card */}
      <div className="bg-base-light rounded-3xl border-2 border-brown-accent/20 shadow-lg overflow-hidden">
        {/* Tab Navigation */}
        <div className="border-b-2 border-brown-accent/10 bg-brown-light/30">
          <nav className="flex space-x-1 px-6">
            {[
              { id: "overview" as const, label: "Overview" },
              { id: "products" as const, label: "Produk" },
              { id: "settings" as const, label: "Pengaturan" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-bold text-sm transition-all relative ${
                  activeTab === tab.id
                    ? "text-brown-accent"
                    : "text-brown-dark/60 hover:text-brown-dark"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brown-accent rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === "overview" && <OverviewTab umkmData={umkmData} />}
          {activeTab === "products" && <ProductsTab products={productsData} />}
          {activeTab === "settings" && <SettingsTab umkmData={umkmData} />}
        </div>
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ umkmData }: { umkmData: any }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-brown-dark flex items-center gap-3">
            <Phone className="h-6 w-6 text-brown-accent" />
            Informasi Kontak
          </h3>
          <button className="text-brown-accent hover:text-brown-dark text-sm font-bold">
            Edit
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-4 p-4 bg-brown-light/50 rounded-2xl border border-brown-accent/20">
            <MapPin className="w-6 h-6 text-brown-accent shrink-0 mt-1" />
            <div>
              <p className="text-xs font-bold text-brown-dark/60 mb-1">
                Alamat
              </p>
              <p className="text-brown-dark font-medium">{umkmData.address}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-brown-light/50 rounded-2xl border border-brown-accent/20">
            <Phone className="w-6 h-6 text-brown-accent shrink-0" />
            <div>
              <p className="text-xs font-bold text-brown-dark/60 mb-1">
                Telepon
              </p>
              <p className="text-brown-dark font-medium">{umkmData.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-brown-light/50 rounded-2xl border border-brown-accent/20">
            <Mail className="w-6 h-6 text-brown-accent shrink-0" />
            <div>
              <p className="text-xs font-bold text-brown-dark/60 mb-1">Email</p>
              <p className="text-brown-dark font-medium">{umkmData.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-brown-light/50 rounded-2xl border border-brown-accent/20">
            <Globe className="w-6 h-6 text-brown-accent shrink-0" />
            <div>
              <p className="text-xs font-bold text-brown-dark/60 mb-1">
                Website
              </p>
              <p className="text-brown-accent font-medium">
                {umkmData.website}
              </p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="pt-4">
          <h4 className="font-black text-brown-dark mb-4 text-lg">
            Media Sosial
          </h4>
          <div className="flex gap-3">
            {umkmData.social_media.instagram && (
              <a
                href="#"
                className="flex-1 p-4 bg-gradient-to-br from-pink-500 to-purple-600 text-base-light rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-bold"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            )}
            {umkmData.social_media.facebook && (
              <a
                href="#"
                className="flex-1 p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-base-light rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-bold"
              >
                <Facebook className="w-5 h-5" />
                Facebook
              </a>
            )}
            {umkmData.social_media.twitter && (
              <a
                href="#"
                className="flex-1 p-4 bg-gradient-to-br from-blue-400 to-blue-500 text-base-light rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-bold"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-black text-brown-dark flex items-center gap-3">
            <Clock className="h-6 w-6 text-brown-accent" />
            Jam Operasional
          </h3>
          <button className="text-brown-accent hover:text-brown-dark text-sm font-bold">
            Edit
          </button>
        </div>

        <div className="space-y-2">
          {Object.entries(umkmData.opening_hours).map(
            ([day, hours]: [string, any]) => (
              <div
                key={day}
                className="flex justify-between items-center p-4 bg-brown-light/50 rounded-2xl border border-brown-accent/20 hover:bg-brown-light/80 transition-colors"
              >
                <span className="font-bold text-brown-dark">
                  {dayLabels[day]}
                </span>
                <div className="flex items-center gap-2 text-brown-dark/80 font-medium">
                  <Clock className="w-4 h-4 text-brown-accent" />
                  <span>
                    {hours.open} - {hours.close}
                  </span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// Products Tab Component
function ProductsTab({ products }: { products: any[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-2xl font-black text-brown-dark">Daftar Produk</h3>
          <p className="text-brown-dark/60 mt-1">
            Kelola semua produk dan layanan Anda
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl hover:shadow-lg transition-all font-bold">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="group bg-base-light border-2 border-brown-accent/20 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            style={{
              animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
            }}
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-brown-light">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {!product.is_available && (
                <div className="absolute inset-0 bg-brown-dark/80 backdrop-blur-sm flex items-center justify-center">
                  <span className="bg-red-500 text-base-light px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Stok Habis
                  </span>
                </div>
              )}

              {/* Sold Badge */}
              <div className="absolute top-3 left-3 bg-base-light/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-brown-accent" />
                <span className="text-xs font-bold text-brown-dark">
                  {product.sold} terjual
                </span>
              </div>

              {/* Action Button */}
              <button className="absolute top-3 right-3 w-9 h-9 bg-base-light/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-base-light">
                <MoreVertical className="w-4 h-4 text-brown-dark" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-black text-lg text-brown-dark group-hover:text-brown-accent transition-colors">
                  {product.name}
                </h4>
              </div>
              <p className="text-brown-dark/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-black text-brown-accent">
                  Rp{product.price.toLocaleString("id-ID")}
                </span>
                <span className="px-3 py-1 bg-brown-light rounded-full text-xs font-bold text-brown-dark">
                  {product.category}
                </span>
              </div>
              <button className="w-full mt-4 py-2.5 bg-brown-accent/10 text-brown-accent rounded-xl font-bold hover:bg-brown-accent hover:text-base-light transition-all">
                Edit Produk
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Settings Tab Component
function SettingsTab({ umkmData }: { umkmData: any }) {
  return (
    <div className="max-w-3xl space-y-8">
      {/* Status Info Banner */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center shrink-0">
            <Check className="w-6 h-6 text-base-light" />
          </div>
          <div>
            <h4 className="font-black text-green-800 mb-2 text-lg">
              Status UMKM Aktif
            </h4>
            <p className="text-green-700 leading-relaxed">
              UMKM Anda saat ini aktif dan terlihat oleh semua pelanggan di
              platform MapinAja.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-brown-dark">Pengaturan UMKM</h3>

        <div className="grid grid-cols-1 gap-6">
          {/* Status UMKM */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-brown-dark">
              Status UMKM
            </label>
            <select className="w-full px-4 py-3 border-2 border-brown-accent/20 bg-brown-light/30 rounded-2xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all">
              <option value="active">✓ Aktif - Terlihat di platform</option>
              <option value="inactive">✗ Tidak Aktif - Disembunyikan</option>
            </select>
          </div>

          {/* Kategori */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-brown-dark">
              Kategori UMKM
            </label>
            <select
              defaultValue={umkmData.category}
              className="w-full px-4 py-3 border-2 border-brown-accent/20 bg-brown-light/30 rounded-2xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all"
            >
              <option value="food_beverage">🍔 Makanan & Minuman</option>
              <option value="fashion">👕 Fashion</option>
              <option value="handicraft">🎨 Kerajinan Tangan</option>
              <option value="service">🔧 Jasa</option>
              <option value="retail">🏪 Retail</option>
            </select>
          </div>

          {/* Deskripsi */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-brown-dark">
              Deskripsi UMKM
            </label>
            <textarea
              rows={4}
              defaultValue={umkmData.description}
              className="w-full px-4 py-3 border-2 border-brown-accent/20 bg-brown-light/30 rounded-2xl focus:border-brown-accent focus:outline-none focus:ring-4 focus:ring-brown-accent/10 text-brown-dark font-medium transition-all resize-none"
              placeholder="Ceritakan tentang UMKM Anda..."
            />
          </div>

          {/* Notification Settings */}
          <div className="space-y-4 pt-4 border-t-2 border-brown-accent/10">
            <h4 className="font-black text-brown-dark">Notifikasi</h4>

            <label className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20 cursor-pointer hover:bg-brown-light/50 transition-colors">
              <div>
                <p className="font-bold text-brown-dark">Pesanan Baru</p>
                <p className="text-sm text-brown-dark/60">
                  Terima notifikasi saat ada pesanan baru
                </p>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 text-brown-accent rounded focus:ring-brown-accent"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-brown-light/30 rounded-2xl border border-brown-accent/20 cursor-pointer hover:bg-brown-light/50 transition-colors">
              <div>
                <p className="font-bold text-brown-dark">Promosi & Tips</p>
                <p className="text-sm text-brown-dark/60">
                  Dapatkan tips bisnis dan info promosi
                </p>
              </div>
              <input
                type="checkbox"
                className="w-5 h-5 text-brown-accent rounded focus:ring-brown-accent"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t-2 border-brown-accent/10">
        <button className="flex-1 px-6 py-4 bg-gradient-to-r from-brown-dark to-brown-accent text-base-light rounded-2xl hover:shadow-lg transition-all font-bold text-lg">
          Simpan Perubahan
        </button>
        <button className="px-6 py-4 border-2 border-brown-accent/30 text-brown-dark rounded-2xl hover:bg-brown-light/50 transition-all font-bold">
          Batalkan
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mt-8">
        <h4 className="font-black text-red-800 mb-3 text-lg flex items-center gap-2">
          <X className="w-5 h-5" />
          Zona Berbahaya
        </h4>
        <p className="text-red-700 mb-4">
          Tindakan berikut bersifat permanen dan tidak dapat dibatalkan.
        </p>
        <button className="px-6 py-3 bg-red-500 text-base-light rounded-xl hover:bg-red-600 transition-colors font-bold">
          Nonaktifkan UMKM Permanen
        </button>
      </div>
    </div>
  );
}

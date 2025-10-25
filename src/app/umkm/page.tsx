// app/umkm/page.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid,
  Map,
  Search,
  MapPin,
  Star,
  Phone,
  Store,
  RefreshCw,
  Users,
  Sparkles,
  TrendingUp,
  Compass,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UMKM } from "@/types/database";
import UmkmMap from "@/components/UmkmMap";

export default function LihatUmkm() {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [umkms, setUmkms] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    fetchUmkms();
  }, []);

  const fetchUmkms = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("umkm")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setUmkms(data || []);

      // Extract unique categories and locations
      const uniqueCategories = Array.from(
        new Set(data?.map((umkm) => umkm.category).filter(Boolean) || [])
      );
      const uniqueLocations = Array.from(
        new Set(data?.map((umkm) => umkm.address).filter(Boolean) || [])
      );

      setCategories(uniqueCategories as string[]);
      setLocations(uniqueLocations as string[]);
    } catch (error) {
      console.error("Error fetching UMKM:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter UMKM based on search and filters
  const filteredUmkms = umkms.filter((umkm) => {
    const matchesSearch =
      umkm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      umkm.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || umkm.category === categoryFilter;
    const matchesLocation =
      locationFilter === "all" || umkm.address === locationFilter;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat UMKM...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-backrgound">
      <section className="relative pt-40 pb-20 bg-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 w-72 h-72  rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-10 w-80 h-80  rounded-full blur-3xl"
          />

          {/* Floating Icons */}
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-20 text-4xl opacity-20"
          >
            🏪
          </motion.div>
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-20 right-20 text-3xl opacity-20"
          >
            ☕
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Jelajahi UMKM Lokal
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Temukan <span className="text-primary">Keunikan</span> di
                  Setiap <span className="text-accent">Sudut Kota</span>
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed">
                  Jelajahi peta interaktif kami untuk menemukan UMKM terbaik di
                  sekitar Anda. Setiap pin adalah cerita baru yang menunggu
                  untuk ditemukan.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    number: umkms.length,
                    label: "UMKM",
                    icon: Store,
                    color: "bg-primary",
                  },
                  {
                    number: locations.length,
                    label: "Lokasi",
                    icon: MapPin,
                    color: "bg-accent",
                  },
                  {
                    number: categories.length,
                    label: "Kategori",
                    icon: TrendingUp,
                    color: "bg-primary",
                  },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <Card className="bg-background/80 backdrop-blur-sm border-border">
                      <CardContent className="p-4">
                        <div
                          className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2`}
                        >
                          <stat.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div className="text-2xl font-bold text-foreground">
                          {stat.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Quick Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Cari UMKM favorit Anda..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 bg-background/80 backdrop-blur-sm border-border"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={() =>
                    document
                      .getElementById("umkm-section")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <Compass className="w-4 h-4 mr-2" />
                  Jelajahi
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <Card className="bg-background/80 backdrop-blur-sm border-border shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <div className="text-center space-y-4 p-8">
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-6xl"
                      >
                        🗺️
                      </motion.div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Peta Interaktif
                      </h3>
                      <p className="text-muted-foreground">
                        Temukan UMKM terdekat dengan navigasi yang mudah
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6"
              >
                <Card className="bg-primary text-primary-foreground border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        50K+ Pengguna
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -top-6 -right-6"
              >
                <Card className="bg-accent text-primary-foreground border-0 shadow-lg">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-semibold">4.8 Rating</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#8B5E3C] mb-4">
            Jelajahi UMKM Lokal
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Temukan bisnis lokal terbaik di sekitar Anda dan dukung perekonomian
            daerah
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <Store className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {umkms.length}
              </div>
              <p className="text-muted-foreground">Total UMKM</p>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <MapPin className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {locations.length}
              </div>
              <p className="text-muted-foreground">Lokasi</p>
            </CardContent>
          </Card>
          <Card className="bg-background/50 backdrop-blur border-0 shadow-soft text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">
                {categories.length}
              </div>
              <p className="text-muted-foreground">Kategori</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 bg-background/50 backdrop-blur border-0 shadow-soft">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama UMKM atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 bg-background/50"
                />
              </div>
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-11 bg-background/50">
                <SelectValue placeholder="Semua Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="h-11 bg-background/50">
                <SelectValue placeholder="Semua Lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Lokasi</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Menampilkan {filteredUmkms.length} dari {umkms.length} UMKM
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="linear-warm "
              >
                <Grid className="h-4 w-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
              >
                <Map className="h-4 w-4 mr-2" />
                Peta
              </Button>
            </div>
          </div>
        </Card>

        {/* Content */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUmkms.map((umkm) => (
              <Card
                key={umkm.id}
                className="group bg-background/50 backdrop-blur border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden"
              >
                <div className="aspect-video overflow-hidden bg-muted/50">
                  {umkm.image_url ? (
                    <img
                      src={umkm.image_url}
                      alt={umkm.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/10 to-secondary/10">
                      <Store className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {umkm.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">
                      {umkm.address || "Lokasi tidak tersedia"}
                    </span>
                  </div>

                  {umkm.phone && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Phone className="h-4 w-4" />
                      <span>{umkm.phone}</span>
                    </div>
                  )}

                  {umkm.description && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {umkm.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {umkm.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">-</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full mt-4 linear-warm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Link href={`/umkm/${umkm.id}`}>Lihat Detail</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-0 bg-background/50 backdrop-blur border-0 shadow-soft overflow-hidden">
            <div className="h-[600px]">
              <UmkmMap
                umkms={filteredUmkms}
                onMarkerClick={(umkm) => {
                  // Optional: Handle marker click jika perlu
                  console.log("UMKM clicked:", umkm);
                }}
              />
            </div>

            {/* Map Controls Info */}
            <div className="p-4 bg-background/80 border-t">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-[#8B5E3C] rounded-sm rotate-45"></div>
                    <span>Lokasi UMKM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Lokasi Anda</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setViewMode("grid")}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Grid className="h-4 w-4" />
                    Tampilkan Grid
                  </Button>

                  <Button
                    onClick={() => {
                      // Refresh data jika perlu
                      fetchUmkms();
                    }}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="mt-3 p-3 bg-primary/5 rounded-lg">
                <p className="text-xs text-muted-foreground text-center">
                  💡 <strong>Tips:</strong> Klik marker pada peta untuk melihat
                  detail UMKM, gunakan tombol navigasi untuk menemukan lokasi
                  Anda
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Empty State */}
        {filteredUmkms.length === 0 && (
          <Card className="text-center py-12 bg-background/50 backdrop-blur border-0 shadow-soft">
            <CardContent>
              <Store className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Tidak ada UMKM ditemukan
              </h3>
              <p className="text-muted-foreground mb-6">
                Coba ubah pencarian atau filter untuk menemukan UMKM yang Anda
                cari.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setLocationFilter("all");
                }}
                variant="outline"
              >
                Reset Filter
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

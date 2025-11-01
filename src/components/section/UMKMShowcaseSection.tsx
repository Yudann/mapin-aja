"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Star, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Types
interface UMKM {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: string;
  priceRange: string;
  isFeatured: boolean;
  tags: string[];
  owner: string;
  story: string;
}

interface UMKMShowcaseSectionProps {
  className?: string;
}

const UMKMShowcaseSection: React.FC<UMKMShowcaseSectionProps> = ({
  className = "",
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedUMKM, setSelectedUMKM] = useState<UMKM | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  // Sample UMKM data
  const umkmData: UMKM[] = [
    {
      id: 1,
      name: "Kedai Kopi Ibu Sri",
      category: "food",
      description:
        "Kopi racikan tradisional dengan biji pilihan lokal. Setiap cangkir punya cerita.",
      image:
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=500&fit=crop",
      rating: 4.8,
      reviewCount: 342,
      distance: "0.5 km",
      priceRange: "Rp 15-50 rb",
      isFeatured: true,
      tags: ["Kopi", "Traditional", "Cozy"],
      owner: "Ibu Sri",
      story:
        "Berdiri sejak 1998, warung ini mewarisi resep turun-temurun dari kakek buyut Ibu Sri.",
    },
    {
      id: 2,
      name: "Bengkel Kreatif D'Art",
      category: "craft",
      description:
        "Kerajinan tangan dari kayu bekas yang diubah menjadi seni bernilai.",
      image:
        "https://images.unsplash.com/photo-1581375301542-751f2c5b5fd9?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 128,
      distance: "1.2 km",
      priceRange: "Rp 50-500 rb",
      isFeatured: true,
      tags: ["Handmade", "Eco-Friendly", "Art"],
      owner: "Pak Budi & Keluarga",
      story:
        "Dimulai dari hobi, kini menjadi sumber penghidupan untuk 5 pengrajin lokal.",
    },
    {
      id: 3,
      name: "Warung Nasi Uduk Mbak Rina",
      category: "food",
      description:
        "Nasi uduk dengan bumbu rahasia keluarga, dimasak dengan penuh cinta.",
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
      rating: 4.7,
      reviewCount: 567,
      distance: "0.8 km",
      priceRange: "Rp 20-35 rb",
      isFeatured: false,
      tags: ["Traditional", "Family Recipe", "Halal"],
      owner: "Mbak Rina",
      story:
        "Meneruskan warisan kuliner keluarga yang sudah ada sejak 3 generasi.",
    },
    {
      id: 4,
      name: "Studio Tenun Modern",
      category: "craft",
      description:
        "Tenun kontemporer yang memadukan tradisi dengan desain masa kini.",
      image:
        "https://images.unsplash.com/photo-1506629905607-e48b0e67d879?w=400&h=400&fit=crop",
      rating: 4.6,
      reviewCount: 89,
      distance: "2.1 km",
      priceRange: "Rp 200 rb - 2 jt",
      isFeatured: true,
      tags: ["Textile", "Modern", "Luxury"],
      owner: "Sari & Tim",
      story:
        "Memberdayakan 15 penenun lokal dengan teknik modern tanpa meninggalkan akar tradisi.",
    },
    {
      id: 5,
      name: "Toko Kue Brownies Ambu",
      category: "food",
      description:
        "Brownies legendaris dengan tekstur lembut dan rasa yang authentic.",
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=500&fit=crop",
      rating: 4.9,
      reviewCount: 891,
      distance: "1.5 km",
      priceRange: "Rp 25-150 rb",
      isFeatured: false,
      tags: ["Dessert", "Legendary", "Homemade"],
      owner: "Ibu Ambu",
      story:
        "Resep rahasia yang hanya diajarkan ke satu orang setiap generasi.",
    },
    {
      id: 6,
      name: "Pottery Lab",
      category: "craft",
      description:
        "Gerabah dan keramik handmade dengan sentuhan artistik kontemporer.",
      image:
        "https://images.unsplash.com/photo-1574737331674-0e0d1e60ee07?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 156,
      distance: "3.0 km",
      priceRange: "Rp 75-800 rb",
      isFeatured: true,
      tags: ["Ceramic", "Artistic", "Workshop"],
      owner: "Kadek & Partner",
      story:
        "Studio kecil dengan impian besar: melestarikan seni gerabah dengan cara kekinian.",
    },
  ];

  // Categories dengan data real
  const categories = [
    {
      id: "all",
      name: "Semua UMKM",
      count: umkmData.length,
      icon: "🌟",
      description: "Jelajahi semua UMKM menarik",
    },
    {
      id: "food",
      name: "Kuliner",
      count: umkmData.filter((u) => u.category === "food").length,
      icon: "🍽️",
      description: "Rasa autentik warisan lokal",
    },
    {
      id: "craft",
      name: "Kerajinan",
      count: umkmData.filter((u) => u.category === "craft").length,
      icon: "🎨",
      description: "Karya tangan penuh cerita",
    },
    {
      id: "featured",
      name: "Unggulan",
      count: umkmData.filter((u) => u.isFeatured).length,
      icon: "⭐",
      description: "Pilihan terbaik komunitas",
    },
  ];

  // Filter UMKM based on category
  const filteredUMKM = umkmData.filter((umkm) => {
    return (
      activeCategory === "all" ||
      (activeCategory === "featured"
        ? umkm.isFeatured
        : umkm.category === activeCategory)
    );
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="umkm-showcase"
      className={`relative py-20 bg-background overflow-hidden ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(var(--color-primary) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        ref={containerRef}
        style={{ opacity, scale }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <Badge className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            UMKM Unggulan
          </Badge>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Temukan
            <span className="text-primary"> Cerita </span>
            di Balik
            <br />
            Setiap
            <span className="text-accent"> Produk </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Jelajahi keunikan UMKM lokal dengan cerita-cerita inspiratif di
            balik setiap produk. Setiap pembelian adalah dukungan nyata untuk
            mimpi dan kerja keras mereka.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-2 border-2 ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground border-primary shadow-lg"
                  : "bg-background text-foreground border-border hover:bg-accent/10"
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
              <Badge variant="secondary" className="ml-1 text-xs">
                {category.count}
              </Badge>
            </motion.button>
          ))}
        </motion.div>

        {/* UMKM Showcase - Masonry Layout */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredUMKM.map((umkm, index) => (
              <motion.div
                key={umkm.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedUMKM(umkm)}
              >
                <UMKMCard
                  umkm={umkm}
                  isFavorite={favorites.includes(umkm.id)}
                  onToggleFavorite={toggleFavorite}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredUMKM.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Tidak ada UMKM ditemukan
            </h3>
            <p className="text-muted-foreground">
              Coba kategori lain untuk menemukan UMKM yang sesuai
            </p>
          </motion.div>
        )}

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
            onClick={() => (window.location.href = "/umkm")}
          >
            Jelajahi Semua UMKM
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <p className="text-muted-foreground mt-4">
            Temukan {umkmData.length}+ UMKM menarik lainnya dengan cerita unik
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

// UMKM Card Component dengan CSS Variables
const UMKMCard = ({
  umkm,
  isFavorite,
  onToggleFavorite,
}: {
  umkm: UMKM;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-border hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Image Container */}
          <div className="relative overflow-hidden flex-shrink-0">
            <img
              src={umkm.image}
              alt={umkm.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Favorite Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(umkm.id);
              }}
              className="absolute top-4 right-4 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-border"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-muted-foreground"
                }`}
              />
            </motion.button>

            {/* Badges Container */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {/* Featured Badge */}
              {umkm.isFeatured && (
                <Badge className="bg-primary text-primary-foreground border-0">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Unggulan
                </Badge>
              )}

              {/* Category Badge */}
              <Badge
                variant="secondary"
                className={`${
                  umkm.category === "food"
                    ? "bg-accent/20 text-accent"
                    : "bg-primary/20 text-primary"
                } border-0`}
              >
                {umkm.category === "food" ? "🍽️ Kuliner" : "🎨 Kerajinan"}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                {umkm.name}
              </h3>
            </div>

            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 flex-1">
              {umkm.description}
            </p>

            {/* Rating & Distance */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-foreground">
                    {umkm.rating}
                  </span>
                </div>
                <span className="text-muted-foreground text-sm">
                  ({umkm.reviewCount})
                </span>
              </div>

              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4" />
                {umkm.distance}
              </div>
            </div>

            {/* Price Range & Owner */}
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-primary font-semibold">
                {umkm.priceRange}
              </span>
              <span className="text-muted-foreground">by {umkm.owner}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border">
              {umkm.tags.slice(0, 2).map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs bg-background"
                >
                  {tag}
                </Badge>
              ))}
              {umkm.tags.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{umkm.tags.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UMKMShowcaseSection;

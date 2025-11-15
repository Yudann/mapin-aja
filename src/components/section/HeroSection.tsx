"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Sparkles,
  TrendingUp,
  Users,
  ChevronRight,
  Star,
  Store,
  Heart,
  Navigation,
} from "lucide-react";
import {
  FaCoffee,
  FaUtensils,
  FaTshirt,
  FaPaintBrush,
  FaShoppingBag,
  FaLeaf,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

// Dummy UMKM images untuk slider
const UMKM_IMAGES = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=400&fit=crop",
    title: "Kopi Kenangan",
    category: "Kafe",
    rating: 4.8,
    distance: "0.8 km",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
    title: "Warung Nasi Ibu",
    category: "Kuliner",
    rating: 4.6,
    distance: "1.2 km",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    title: "Batik Nusantara",
    category: "Fashion",
    rating: 4.9,
    distance: "2.1 km",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1585399000684-d2f72660f092?w=400&h=400&fit=crop",
    title: "Kerajinan Kayu",
    category: "Kerajinan",
    rating: 4.7,
    distance: "3.5 km",
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
    title: "Toko Roti Manis",
    category: "Bakery",
    rating: 4.8,
    distance: "0.5 km",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    title: "Fashion Lokal",
    category: "Fashion",
    rating: 4.5,
    distance: "1.8 km",
  },
  {
    id: 7,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    title: "Kafe Cozy",
    category: "Kafe",
    rating: 4.9,
    distance: "2.3 km",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
    title: "Pancake House",
    category: "Kuliner",
    rating: 4.7,
    distance: "1.1 km",
  },
];

const CATEGORIES = [
  { icon: FaCoffee, label: "Kopi", color: "from-amber-500 to-orange-600" },
  { icon: FaUtensils, label: "Kuliner", color: "from-red-500 to-pink-600" },
  { icon: FaTshirt, label: "Fashion", color: "from-purple-500 to-indigo-600" },
  {
    icon: FaPaintBrush,
    label: "Kerajinan",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: FaShoppingBag,
    label: "Retail",
    color: "from-green-500 to-emerald-600",
  },
  { icon: FaLeaf, label: "Organik", color: "from-lime-500 to-green-600" },
];

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      router.push(`/umkm?search=${encodeURIComponent(query)}`);
    } else {
      router.push("/umkm");
    }
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/umkm?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-linear-to-br from-brown-light via-base-light to-brown-light/50 pt-32 sm:pt-44 pb-16 sm:pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(185, 148, 112, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(185, 148, 112, 0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-brown-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-96 h-96 sm:w-[500px] sm:h-[500px] bg-brown-accent/15 rounded-full blur-3xl"
      />

      <div className="relative z-10  mx-auto ">
        {/* Center Content */}
        <div className="text-center space-y-8 sm:space-y-10 mb-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-base-light/80 backdrop-blur-sm border-2 border-brown-accent/30 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 shadow-lg"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brown-accent" />
            <span className="text-xs sm:text-sm font-bold text-brown-dark tracking-wide">
              Jelajahi 15.000+ UMKM Lokal Terdaftar
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl  font-black leading-tight text-brown-dark px-4">
              Temukan{" "}
              <span className="bg-linear-to-r from-brown-accent via-brown-dark to-brown-accent bg-clip-text text-transparent">
                Keunikan Lokal
              </span>
              <br className="hidden sm:block" />
              <span className="sm:inline block mt-2 sm:mt-0">
                {" "}
                di Sekitar Anda
              </span>
            </h1>

            <p className="text-base sm:text-lg  text-brown-dark/70 max-w-2xl mx-auto leading-relaxed font-medium px-4">
              Dari kedai kopi tersembunyi hingga kerajinan tangan eksklusif.
              Dukung ekonomi lokal sambil menemukan pengalaman berbelanja
              terbaik.
            </p>
          </motion.div>

          {/* Hero Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto px-4"
          >
            <form onSubmit={handleSearch}>
              <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-brown-accent to-brown-dark rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />

                {/* Search Bar */}
                <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-base-light rounded-2xl shadow-2xl border-2 border-brown-accent/30 p-2 hover:border-brown-accent/50 transition-all gap-2 sm:gap-0">
                  <div className="flex items-center gap-3 px-4 py-2 sm:py-0 flex-1">
                    <Search className="w-5 h-5 text-brown-accent shrink-0" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari kopi, kuliner, fashion, atau jasa..."
                      className="flex-1 text-sm sm:text-base bg-transparent border-none outline-none text-brown-dark placeholder:text-brown-dark/40 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-brown-dark to-brown-accent hover:from-brown-accent hover:to-brown-dark text-base-light px-6 py-3 sm:py-3 text-sm font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    <span>Cari</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Filters - Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {CATEGORIES.map((cat, idx) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleCategoryClick(cat.label)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.1 }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-base-light border border-brown-accent/20 rounded-full hover:border-brown-accent hover:bg-brown-accent/10 transition-all font-medium text-xs text-brown-dark group hover:scale-105"
                  >
                    <Icon className="w-3 h-3 text-brown-accent group-hover:scale-110 transition-transform" />
                    <span className="whitespace-nowrap">{cat.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Image Slider Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative w-full"
        >
          {/* Slider Container */}
          <div className="relative overflow-hidden   py-3 -mx-4 sm:mx-0">
            <motion.div
              animate={{
                x: [0, -1600],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 35,
                  ease: "linear",
                },
              }}
              className="flex gap-4 px-4"
            >
              {/* Duplicate for infinite loop */}
              {[...UMKM_IMAGES, ...UMKM_IMAGES].map((umkm, idx) => (
                <div
                  key={idx}
                  className="group relative shrink-0 w-56 h-64 sm:w-64 sm:h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
                  <img
                    src={umkm.image}
                    alt={umkm.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-brown-dark/90 via-brown-dark/40 to-transparent" />

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-4 text-base-light">
                    <div className="mb-2">
                      <span className="inline-block px-2 py-1 bg-brown-accent/80 backdrop-blur-sm rounded-full text-xs font-bold">
                        {umkm.category}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-black mb-1 line-clamp-1">
                      {umkm.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <HiLocationMarker className="w-3 h-3" />
                        <span>{umkm.distance}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{umkm.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-base-light/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-base-light transition-all opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4 text-brown-accent" />
                  </button>
                </div>
              ))}
            </motion.div>
          </div>

          {/* CTA Below Slider */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <button
              onClick={() => router.push("/umkm")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-brown-dark to-brown-accent text-base-light rounded-xl font-bold hover:shadow-lg hover:shadow-brown-accent/30 transition-all hover:scale-105 text-sm"
            >
              <MapPin className="w-4 h-4" />
              Jelajahi Semua UMKM
            </button>
            <button
              onClick={() => router.push("/umkm/map")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-base-light border border-brown-accent/30 text-brown-accent rounded-xl font-bold hover:bg-brown-accent/10 transition-all hover:scale-105 text-sm"
            >
              <Navigation className="w-4 h-4" />
              Lihat Peta
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import { CATEGORIES } from "./blogData";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: HeroSectionProps) {
  return (
    <section className="max-w-7xl mx-auto relative pt-32 pb-16 px-4 overflow-hidden">
      {/* Background Decorations */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-10 w-96 h-96 bg-brown-accent/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-brown-accent/15 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border-2 border-brown-accent/30 rounded-full px-5 py-2.5 mb-6">
            <BookOpen className="w-5 h-5 text-brown-accent" />
            <span className="text-sm font-bold text-brown-dark">
              Blog & Artikel
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-brown-dark mb-6 leading-tight">
            Inspirasi & Tips untuk{" "}
            <span className="bg-linear-to-r from-brown-accent to-brown-dark bg-clip-text text-transparent">
              UMKM Lokal
            </span>
          </h1>

          <p className="text-lg text-brown-dark/70 max-w-2xl mx-auto leading-relaxed">
            Temukan strategi bisnis, tips marketing, kisah sukses, dan insight
            terbaru untuk mengembangkan UMKM Anda
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-brown-accent to-brown-dark rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative flex items-center bg-white rounded-2xl shadow-xl border-2 border-brown-accent/30 p-2 hover:border-brown-accent/50 transition-all">
              <Search className="w-5 h-5 text-brown-accent ml-4 mr-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari artikel, tips, atau topik..."
                className="flex-1 bg-transparent border-none outline-none text-brown-dark placeholder:text-brown-dark/40 font-medium py-3"
              />
              <button className="bg-linear-to-r from-brown-dark to-brown-accent hover:from-brown-accent hover:to-brown-dark text-white font-bold rounded-xl px-6 py-3 transition-all">
                Cari
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-16"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${
                selectedCategory === cat.name
                  ? "bg-linear-to-r from-brown-accent to-brown-dark text-white shadow-lg"
                  : "bg-white border-2 border-brown-accent/20 text-brown-dark hover:border-brown-accent/40"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === cat.name
                    ? "bg-white/20"
                    : "bg-brown-accent/10"
                }`}
              >
                {cat.count}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

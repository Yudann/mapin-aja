"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Heart,
  Star,
  Zap,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface FeatureNode {
  id: number;
  title: string;
  description: string;
  position: { x: number; y: number };
  icon: React.ReactNode;
  color: string;
  image: string;
  stats: string;
  duration: number;
}

interface FeaturesSectionProps {
  className?: string;
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  className = "",
}) => {
  const [activeNode, setActiveNode] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Interactive journey map nodes
  const journeyNodes: FeatureNode[] = [
    {
      id: 0,
      title: "Mulai Petualangan",
      description:
        "Buka MapinAja dan biarkan kami membawamu dalam perjalanan menemukan keunikan lokal. Setiap tap adalah langkah menuju cerita baru.",
      position: { x: 15, y: 20 },
      icon: <Play className="w-4 h-4" />,
      color: "var(--color-primary)",
      image:
        "https://images.unsplash.com/photo-1542744173-05336fcc7ad4?w=400&h=300&fit=crop",
      stats: "3 detik",
      duration: 3000,
    },
    {
      id: 1,
      title: "Jelajahi Peta Hidup",
      description:
        "Peta kami bukan sekadar gambar - ini adalah kanvas yang hidup. Setiap pin berdetak dengan cerita, setiap lokasi punya jiwa.",
      position: { x: 35, y: 45 },
      icon: <MapPin className="w-4 h-4" />,
      color: "var(--color-accent)",
      image:
        "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
      stats: "50+ Kota",
      duration: 4000,
    },
    {
      id: 2,
      title: "Temukan Cerita",
      description:
        "Scroll melalui galeri visual UMKM. Setiap swipe mengungkap cerita di balik produk - dari tangan pembuat sampai ke pelanggan.",
      position: { x: 65, y: 25 },
      icon: <Search className="w-4 h-4" />,
      color: "var(--color-primary)",
      image:
        "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=300&fit=crop",
      stats: "5K+ Cerita",
      duration: 3500,
    },
    {
      id: 3,
      title: "Sambungkan Hati",
      description:
        "Baca review yang ditulis dengan hati. Setiap bintang punya arti, setiap ulasan adalah percakapan dalam komunitas.",
      position: { x: 45, y: 70 },
      icon: <Heart className="w-4 h-4" />,
      color: "var(--color-accent)",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      stats: "100K+ Connection",
      duration: 4500,
    },
    {
      id: 4,
      title: "Buat Jejak Digital",
      description:
        "Rating-mu membantu UMKM tumbuh. Setiap review adalah jejak digital yang membangun kepercayaan dalam ekosistem lokal.",
      position: { x: 75, y: 55 },
      icon: <Star className="w-4 h-4" />,
      color: "var(--color-primary)",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      stats: "94% Impact",
      duration: 4000,
    },
    {
      id: 5,
      title: "Lanjutkan Perjalanan",
      description:
        "Petualangan tak pernah berakhir. MapinAja terus belajar dari jelajahmu, menghadirkan rekomendasi yang semakin personal.",
      position: { x: 25, y: 85 },
      icon: <Zap className="w-4 h-4" />,
      color: "var(--color-accent)",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      stats: "Always On",
      duration: 5000,
    },
  ];

  // Auto-play through nodes
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setTimeout(() => {
      setActiveNode((prev) => (prev + 1) % journeyNodes.length);
    }, journeyNodes[activeNode]?.duration || 4000);

    return () => clearTimeout(timer);
  }, [activeNode, isPlaying, journeyNodes]);

  const handleNodeClick = (nodeId: number) => {
    setActiveNode(nodeId);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextNode = () => {
    setActiveNode((prev) => (prev + 1) % journeyNodes.length);
    setIsPlaying(false);
  };

  const currentNode = journeyNodes[activeNode];

  return (
    <section
      id="journey"
      className={`relative min-h-[96vh] flex items-center bg-background overflow-hidden ${className}`}
    >
      {/* Background Art */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <Badge className="mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Journey Map
          </Badge>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Alur Pengalaman
            <br />
            <span className="text-primary">yang Mengalir</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            MapinAja dirancang seperti percakapan baik dengan teman - natural,
            menyenangkan, dan penuh kejutan menyenangkan di setiap langkah.
          </motion.p>
        </motion.div>

        {/* Interactive Journey Map */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Journey Visualization */}
          <div className="relative h-[400px] lg:h-[450px]">
            <Card className="absolute inset-0 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 h-full relative">
                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {journeyNodes.map((node, index) => {
                    const nextNode =
                      journeyNodes[(index + 1) % journeyNodes.length];
                    return (
                      <motion.path
                        key={`line-${index}`}
                        d={`M ${node.position.x}% ${node.position.y}% L ${nextNode.position.x}% ${nextNode.position.y}%`}
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{
                          pathLength: activeNode >= index ? 1 : 0,
                          opacity: activeNode >= index ? 0.6 : 0.2,
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                    );
                  })}
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="var(--color-primary)" />
                      <stop offset="100%" stopColor="var(--color-accent)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Interactive Nodes */}
                {journeyNodes.map((node, index) => (
                  <motion.button
                    key={node.id}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 z-10 border-2 border-background ${
                      activeNode === index ? "shadow-lg scale-110" : "shadow-md"
                    }`}
                    style={{
                      left: `${node.position.x}%`,
                      top: `${node.position.y}%`,
                      backgroundColor: node.color,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: activeNode >= index ? 1 : 0.8,
                      opacity: activeNode >= index ? 1 : 0.6,
                    }}
                    whileHover={{
                      scale: 1.15,
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNodeClick(node.id)}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: index * 0.1,
                    }}
                  >
                    <div className="text-primary-foreground">{node.icon}</div>

                    {/* Pulse animation for active node */}
                    {activeNode === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-current"
                        initial={{ scale: 1, opacity: 0.7 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeOut",
                        }}
                      />
                    )}

                    {/* Node label */}
                    <motion.div
                      className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-foreground"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: activeNode === index ? 1 : 0.7,
                        y: 0,
                      }}
                    >
                      {node.stats}
                    </motion.div>
                  </motion.button>
                ))}

                {/* Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-8 right-8 w-16 h-16 bg-accent/20 rounded-xl blur-xl"
                />
                <motion.div
                  animate={{
                    y: [0, 12, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute bottom-8 left-8 w-20 h-20 bg-primary/15 rounded-xl blur-xl"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right: Feature Details */}
          <div className="relative h-[400px] lg:h-[450px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, x: 30, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="h-full"
              >
                <Card className="h-full backdrop-blur-sm border-border/50">
                  <CardContent className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shadow-md"
                        style={{ backgroundColor: currentNode.color }}
                      >
                        {currentNode.icon}
                      </div>
                      <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground">
                          {currentNode.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: currentNode.color }}
                          />
                          Step {activeNode + 1} of {journeyNodes.length}
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                      <img
                        src={currentNode.image}
                        alt={currentNode.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

                      {/* Progress Bar */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 bg-primary-foreground/30"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isPlaying ? 1 : 0 }}
                        transition={{
                          duration: currentNode.duration / 1000,
                          ease: "linear",
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed flex-grow mb-4 text-sm lg:text-base">
                      {currentNode.description}
                    </p>

                    {/* Controls */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={togglePlay}
                          className="w-10 h-10 p-0 rounded-full"
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={nextNode}
                          className="flex items-center gap-1"
                        >
                          Skip <ChevronRight className="w-3 h-3" />
                        </Button>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">
                          {currentNode.stats}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Average time
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-8"
        >
          <Card className="bg-background/60 backdrop-blur-sm border-border">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                {journeyNodes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleNodeClick(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeNode === index
                        ? "bg-primary scale-125"
                        : "bg-border hover:bg-accent"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

// Badge Component untuk konsistensi
const Badge = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`inline-flex items-center gap-2 px-3 py-1 bg-accent/20 text-primary rounded-full text-sm font-medium ${className}`}
  >
    {children}
  </motion.span>
);

export default FeaturesSection;

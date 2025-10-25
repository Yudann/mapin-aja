"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Search,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Star,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Types
interface HeroProps {
  className?: string;
}

const HeroSection: React.FC<HeroProps> = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [counter3, setCounter3] = useState(0);

  // Counter animation
  useEffect(() => {
    const animateCounter = (
      setValue: React.Dispatch<React.SetStateAction<number>>,
      target: number,
      duration: number,
      delay: number
    ) => {
      let start = 0;
      const increment = target / (duration * 60);

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          start += increment;
          if (start >= target) {
            setValue(target);
            clearInterval(interval);
          } else {
            setValue(Math.round(start));
          }
        }, 1000 / 60);

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => clearTimeout(timer);
    };

    animateCounter(setCounter1, 5000, 2, 0.5);
    animateCounter(setCounter2, 50, 2, 0.7);
    animateCounter(setCounter3, 100, 2, 0.9);
  }, []);

  // Animation variants with proper typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      className={`relative min-h-screen flex items-center bg-background overflow-hidden ${className}`}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* linear Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-linear-to-br from-accent/30 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-linear-to-tr from-primary/20 to-transparent rounded-full blur-3xl"
        />

        {/* Floating Icons - Hidden on mobile */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block absolute top-32 left-[10%] text-primary/10"
        >
          <MapPin className="w-12 h-12 lg:w-16 lg:h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="hidden lg:block absolute bottom-32 right-[15%] text-accent/10"
        >
          <MessageCircle className="w-16 h-16 lg:w-20 lg:h-20" />
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
        >
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <Badge
                variant="secondary"
                className="inline-flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 border-2 border-border rounded-full text-primary text-xs md:text-sm font-semibold shadow-sm"
              >
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                <span className="whitespace-nowrap">
                  Platform Direktori UMKM #1 di Indonesia
                </span>
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1]">
                Temukan UMKM,{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 text-primary">
                    Chat Langsung
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-1 md:bottom-2 left-0 h-2 md:h-3 bg-accent/30 -z-10"
                  />
                </span>{" "}
                & Belanja Lokal
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              MapinAja menghubungkan kamu dengan ribuan UMKM lokal. Temukan
              berdasarkan lokasi, chat langsung dengan penjual, dan dukung
              ekonomi Indonesia.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-bold shadow-xl"
              >
                <Search className="w-4 h-4 md:w-5 md:h-5" />
                Jelajahi UMKM Sekarang
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 md:px-8 py-3 md:py-4 rounded-full text-sm md:text-base font-bold border-2"
              >
                Daftar sebagai Seller
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </Button>
            </motion.div>

            {/* Stats Counter */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t-2 border-border"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">
                  {counter1.toLocaleString()}+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  UMKM Terdaftar
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">
                  {counter2}+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  Kota
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">
                  {counter3}K+
                </div>
                <div className="text-xs md:text-sm text-muted-foreground font-medium">
                  Pengguna
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Interactive Cards */}
          <motion.div
            variants={itemVariants}
            className="relative h-[600px] lg:h-[600px] order-2 lg:order-2"
          >
            {/* Main Feature Card */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-0 right-0 w-full sm:w-[85%] h-[55%] sm:h-[65%]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Card className="w-full h-full rounded-2xl md:rounded-3xl shadow-2xl border-2 border-border overflow-hidden">
                <CardContent className="p-0 h-full">
                  {/* Image */}
                  <div className="relative h-[55%] sm:h-[60%] overflow-hidden">
                    <motion.img
                      animate={{ scale: isHovered ? 1.1 : 1 }}
                      transition={{ duration: 0.6 }}
                      src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop"
                      alt="UMKM Local"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

                    {/* Location Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="absolute top-2 left-2 md:top-4 md:left-4"
                    >
                      <Badge
                        variant="secondary"
                        className="gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 bg-background/95 backdrop-blur-sm shadow-lg"
                      >
                        <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary" />
                        <span className="text-xs md:text-sm font-semibold text-foreground">
                          500m dari kamu
                        </span>
                      </Badge>
                    </motion.div>

                    {/* Rating Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                      className="absolute top-2 right-2 md:top-4 md:right-4"
                    >
                      <Badge className="gap-1 px-2 py-1 md:px-3 md:py-2 bg-primary shadow-lg">
                        <Star className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground fill-primary-foreground" />
                        <span className="text-xs md:text-sm font-bold text-primary-foreground">
                          4.8
                        </span>
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-6 space-y-2 md:space-y-3">
                    <h3 className="text-base md:text-xl font-bold text-foreground">
                      Warung Kopi Kenangan
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground">
                      Kafe & Minuman • Buka hingga 22:00
                    </p>

                    {/* Chat Button */}
                    <Button className="w-full py-2 md:py-3 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-semibold text-xs md:text-sm">
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                      Chat dengan Penjual
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Chat Notification Card */}
            <motion.div
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute bottom-0  left-0 w-full sm:w-[80%] md:w-[70%]"
            >
              <Card className="rounded-xl md:rounded-2xl shadow-xl border-2 border-border">
                <CardContent className="p-3 md:p-5">
                  <div className="flex items-start gap-3 md:gap-4">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center shrink-0"
                    >
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1 md:mb-2">
                        <span className="font-bold text-foreground text-sm md:text-base">
                          Chat Real-time
                        </span>
                        <motion.span
                          animate={{ opacity: [1, 0.5, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-xs text-accent font-semibold"
                        >
                          • Online
                        </motion.span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {` "Apakah ada promo untuk hari ini? Saya tertarik dengan menu..." `}
                      </p>
                    </div>
                  </div>

                  {/* Typing Indicator */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex items-center gap-2 mt-2 md:mt-3 ml-13 md:ml-16"
                  >
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                          className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent rounded-full"
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Penjual sedang mengetik...
                    </span>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Floating Badge - Review Count - Hidden on mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: "spring" }}
              className="hidden sm:block absolute top-[30%] md:top-[35%] -right-[5%] md:-right-[15%]"
            >
              <Card className="px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-xl border-2 border-border">
                <CardContent className="p-0">
                  <div className="flex items-center gap-2">
                    <div className="text-xl md:text-2xl">💬</div>
                    <div>
                      <div className="text-base md:text-lg font-black text-primary">
                        1.2K+
                      </div>
                      <div className="text-[10px] md:text-xs text-muted-foreground font-medium whitespace-nowrap">
                        Chat Hari Ini
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs font-medium uppercase tracking-wider">
            Scroll untuk lanjut
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

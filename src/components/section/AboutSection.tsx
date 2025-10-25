"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { MapPin, Heart, Sparkles, TrendingUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Types
interface StorySection {
  id: number;
  title: string;
  description: string;
  highlight: string;
  image: string;
  icon: React.ReactNode;
  color: string;
}

interface AboutSectionProps {
  className?: string;
}

const AboutSection: React.FC<AboutSectionProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Scroll progress hanya untuk section ini
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Track jika section dalam viewport
  const inView = useInView(sectionRef, {
    margin: "-50% 0px -50% 0px", // Trigger ketika 50% section terlihat
  });

  useEffect(() => {
    setIsInView(inView);
  }, [inView]);

  // Check mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Smooth spring animation for progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Story sections data
  const storySections: StorySection[] = [
    {
      id: 0,
      title: "Berawal dari Mimpi Sederhana",
      description:
        "MapinAja lahir dari keresahan melihat UMKM lokal yang sulit ditemukan oleh masyarakat. Padahal, mereka punya produk berkualitas dan cerita inspiratif di baliknya. Kami percaya, teknologi harus menjembatani jarak antara produk lokal dan konsumen yang peduli.",
      highlight: "Teknologi untuk UMKM",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop",
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "var(--color-accent)",
    },
    {
      id: 1,
      title: "Menghubungkan Komunitas Lokal",
      description:
        "Setiap UMKM punya cerita unik. Ada Ibu Siti yang mulai jualan kue dari rumah, Pak Budi dengan warung kopinya yang jadi tempat ngumpul warga, atau Mbak Dina dengan kerajinan tangannya. MapinAja hadir untuk memastikan cerita mereka terdengar.",
      highlight: "Cerita di Balik UMKM",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "var(--color-primary)",
    },
    {
      id: 2,
      title: "Membangun Ekonomi Indonesia",
      description:
        "Setiap rupiah yang kamu belanjakan di UMKM lokal adalah investasi untuk ekonomi Indonesia. Uang itu berputar di komunitas, menciptakan lapangan kerja, dan membangun kemandirian ekonomi. MapinAja bukan sekadar platform, tapi gerakan untuk Indonesia yang lebih kuat.",
      highlight: "Dampak Nyata",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "var(--color-accent)",
    },
    {
      id: 3,
      title: "Masa Depan Bersama",
      description:
        "Kami bermimpi suatu hari nanti, setiap orang di Indonesia bisa dengan mudah menemukan dan mendukung UMKM di sekitar mereka. Platform ini terus berkembang dengan fitur-fitur baru, selalu mendengarkan kebutuhan UMKM dan pelanggan. Bersama, kita bangun Indonesia dari yang dekat.",
      highlight: "Visi Kami",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
      icon: <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "var(--color-primary)",
    },
  ];

  // Update active section based on scroll - HANYA ketika section dalam viewport
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (isInView) {
        const sectionIndex = Math.min(
          Math.floor(latest * storySections.length),
          storySections.length - 1
        );
        setActiveSection(sectionIndex);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, storySections.length, isInView]);

  // Mobile variant - simpler animation
  const mobileContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      {/* Desktop Progress Indicator - HANYA muncul ketika section dalam viewport */}
      {!isMobile && isInView && (
        <motion.div
          className="fixed left-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {storySections.map((section, index) => (
            <motion.div
              key={section.id}
              className="relative cursor-pointer"
              whileHover={{ scale: 1.2 }}
              onClick={() => {
                const sectionHeight = window.innerHeight;
                window.scrollTo({
                  top: sectionRef.current!.offsetTop + index * sectionHeight,
                  behavior: "smooth",
                });
              }}
            >
              <div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === index ? "bg-primary scale-150" : "bg-border"
                }`}
              />
              {activeSection === index && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium text-primary bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full border border-border shadow-sm"
                >
                  {section.highlight}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Main Section */}
      <section
        ref={sectionRef}
        id="tentang"
        className={`relative bg-background ${className}`}
        style={{
          height: isMobile ? "auto" : `${storySections.length * 100}vh`,
          minHeight: isMobile ? "100vh" : "auto",
        }}
      >
        {/* Scroll Container untuk progress tracking */}
        <div ref={containerRef} className="h-full">
          {/* Mobile Layout */}
          {isMobile ? (
            <div className="py-16 px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={mobileContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="max-w-3xl mx-auto space-y-12"
              >
                {/* Section Header */}
                <motion.div
                  variants={mobileItemVariants}
                  className="text-center space-y-4"
                >
                  <Badge
                    variant="secondary"
                    className="px-4 py-2 text-primary border-primary/20"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Tentang MapinAja
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Cerita Kami
                  </h2>
                  <p className="text-lg text-muted-foreground">
                    Perjalanan MapinAja dalam mendukung UMKM Indonesia
                  </p>
                </motion.div>

                {/* Mobile Story Cards */}
                {storySections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    variants={mobileItemVariants}
                    className="relative"
                  >
                    <Card className="rounded-2xl shadow-lg border-border overflow-hidden">
                      <CardContent className="p-0">
                        {/* Image */}
                        <div className="relative h-48 sm:h-56 overflow-hidden">
                          <img
                            src={section.image}
                            alt={section.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                          {/* Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge
                              className="flex items-center gap-2 px-3 py-2 text-white border-0"
                              style={{ backgroundColor: section.color }}
                            >
                              {section.icon}
                              <span className="text-sm font-semibold">
                                {section.highlight}
                              </span>
                            </Badge>
                          </div>

                          {/* Chapter Number */}
                          <div className="absolute top-4 right-4">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                              style={{ backgroundColor: section.color }}
                            >
                              {index + 1}
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-4">
                          <h3 className="text-xl font-bold text-foreground">
                            {section.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {section.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* Progress Indicator for Mobile */}
                <motion.div
                  variants={mobileItemVariants}
                  className="text-center space-y-4"
                >
                  <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
                    <span>Progress Cerita</span>
                    <span className="font-semibold text-primary">
                      {activeSection + 1} / {storySections.length}
                    </span>
                  </div>
                  <Progress
                    value={((activeSection + 1) / storySections.length) * 100}
                    className="h-2 bg-border"
                  />
                </motion.div>
              </motion.div>
            </div>
          ) : (
            /* Desktop Layout */
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  {/* Left Side - Text Content */}
                  <div className="space-y-6 lg:space-y-8 order-2 lg:order-2">
                    {/* Section Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      <Badge
                        variant="secondary"
                        className="px-4 py-2 bg-accent/20 text-primary border-0"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          {storySections[activeSection].icon}
                        </motion.div>
                        <span className="ml-2">Tentang MapinAja</span>
                      </Badge>
                    </motion.div>

                    {/* Animated Title */}
                    <div className="relative h-[120px] sm:h-[150px] overflow-hidden">
                      {storySections.map((section, index) => (
                        <motion.h2
                          key={section.id}
                          initial={{ opacity: 0, y: 100 }}
                          animate={{
                            opacity: activeSection === index ? 1 : 0,
                            y:
                              activeSection === index
                                ? 0
                                : activeSection > index
                                ? -100
                                : 100,
                          }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="absolute inset-0 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight"
                        >
                          {section.title}
                        </motion.h2>
                      ))}
                    </div>

                    {/* Animated Description */}
                    <div className="relative min-h-[180px] sm:min-h-[200px]">
                      {storySections.map((section, index) => (
                        <motion.p
                          key={section.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{
                            opacity: activeSection === index ? 1 : 0,
                            y:
                              activeSection === index
                                ? 0
                                : activeSection > index
                                ? -50
                                : 50,
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut",
                            delay: 0.1,
                          }}
                          className="absolute inset-0 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed"
                        >
                          {section.description}
                        </motion.p>
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>
                          {activeSection + 1} / {storySections.length}
                        </span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          style={{
                            scaleX: useTransform(
                              smoothProgress,
                              [0, 1],
                              [0, 1]
                            ),
                            transformOrigin: "left",
                          }}
                        />
                      </div>
                    </div>

                    {/* Highlight Badge */}
                    <motion.div
                      key={activeSection}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Badge
                        className="px-6 py-3 rounded-2xl font-semibold text-white border-0 shadow-lg flex items-center gap-2"
                        style={{
                          backgroundColor: storySections[activeSection].color,
                        }}
                      >
                        <Sparkles className="w-5 h-5" />
                        {storySections[activeSection].highlight}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Right Side - Sticky Image Gallery */}
                  <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-1 lg:order-1">
                    {/* Background Decorations */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -top-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl"
                    />

                    {/* Image Stack */}
                    <div className="relative w-full h-full">
                      {storySections.map((section, index) => {
                        const isActive = activeSection === index;
                        const isPast = activeSection > index;

                        return (
                          <motion.div
                            key={section.id}
                            className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                            animate={{
                              opacity: isActive ? 1 : isPast ? 0 : 0.3,
                              scale: isActive ? 1 : isPast ? 0.8 : 0.9,
                              rotateY: isActive ? 0 : isPast ? 90 : -45,
                              zIndex: isActive
                                ? 10
                                : isPast
                                ? index
                                : storySections.length - index,
                              x: isActive ? 0 : isPast ? 100 : -50,
                            }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              opacity: { duration: 0.3 },
                            }}
                            style={{
                              transformStyle: "preserve-3d",
                              perspective: 1000,
                            }}
                          >
                            {/* Image */}
                            <img
                              src={section.image}
                              alt={section.title}
                              className="w-full h-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Image Label */}
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{
                                opacity: isActive ? 1 : 0,
                                y: isActive ? 0 : 20,
                              }}
                              transition={{ delay: 0.3 }}
                              className="absolute bottom-6 left-6 right-6"
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                                  style={{ backgroundColor: section.color }}
                                >
                                  {section.icon}
                                </div>
                                <div>
                                  <div className="text-white font-semibold text-lg">
                                    {section.highlight}
                                  </div>
                                  <div className="text-white/80 text-sm">
                                    Chapter {index + 1}
                                  </div>
                                </div>
                              </div>
                            </motion.div>

                            {/* Border Glow */}
                            {isActive && (
                              <motion.div
                                className="absolute inset-0 border-4 rounded-3xl pointer-events-none"
                                style={{ borderColor: section.color }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Counter Badge */}
                    <motion.div
                      className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <Card className="px-6 py-3 rounded-full shadow-xl border-border">
                        <CardContent className="p-0">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-primary">
                              {String(activeSection + 1).padStart(2, "0")}
                            </div>
                            <div className="h-8 w-px bg-border" />
                            <div className="text-sm text-muted-foreground">
                              of {String(storySections.length).padStart(2, "0")}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Scroll Hint - Only show on first section */}
              {activeSection === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
                >
                  <span className="text-sm font-medium">
                    Scroll untuk lanjut
                  </span>
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AboutSection;

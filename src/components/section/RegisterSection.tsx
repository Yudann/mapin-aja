"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Store,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Star,
  Heart,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RegisterSectionProps {
  className?: string;
}

const RegisterSection: React.FC<RegisterSectionProps> = ({
  className = "",
}) => {
  const [selectedType, setSelectedType] = useState<"customer" | "seller">(
    "customer"
  );

  const handleGetStarted = () => {
    const params = new URLSearchParams({
      mode: "register",
      type: selectedType,
    });
    window.location.href = `/auth?${params.toString()}`;
  };

  const customerBenefits = [
    "Temukan UMKM terdekat dengan cerita unik",
    "Dapatkan rekomendasi personalized",
    "Support ekonomi lokal langsung",
    "Review dan bagikan pengalaman",
  ];

  const sellerBenefits = [
    "Tampilkan usaha ke ribuan pengguna",
    "Kelola info produk dan promo dengan mudah",
    "Terima order dan chat langsung dari customer",
    "Analytics perkembangan bisnis real-time",
  ];

  return (
    <section
      id="register"
      className={`relative min-h-[80vh] flex items-center justify-center bg-background overflow-hidden ${className}`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
        />

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 text-4xl opacity-10"
        >
          🛍️
        </motion.div>
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-20 right-20 text-3xl opacity-10"
        >
          ☕
        </motion.div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <Badge className="bg-accent/20 text-primary border-0">
                <Sparkles className="w-4 h-4 mr-2" />
                Gabung Sekarang
              </Badge>

              <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
                Mulai
                <span className="text-primary"> Perjalanan </span>
                Lokalmu
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Pilih peranmu dan jadilah bagian dari gerakan mendukung UMKM
                lokal.{" "}
                <span className="font-semibold text-primary">
                  Gratis selamanya
                </span>
                , dampaknya untuk Indonesia.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  number: "50K+",
                  label: "Pengguna",
                  icon: Users,
                  color: "bg-primary",
                },
                {
                  number: "5K+",
                  label: "UMKM",
                  icon: Store,
                  color: "bg-accent",
                },
                {
                  number: "4.8",
                  label: "Rating",
                  icon: Star,
                  color: "bg-primary",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
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
                      <div className="text-xl font-bold text-foreground">
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

            {/* Features */}
            <div className="space-y-3">
              {[
                { icon: Rocket, text: "Setup dalam 2 menit" },
                { icon: Shield, text: "Aman & Terpercaya" },
                { icon: Zap, text: "Gratis Selamanya" },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/auth?mode=login")}
                className="border-primary text-primary-foreground bg-primary hover:bg-accent-foreground cursor-pointer hover:text-primary-foreground"
              >
                Sudah punya akun? Login di sini
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Role Selection */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            {/* Role Cards */}
            <div className="grid gap-4">
              {/* Customer Card */}
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative cursor-pointer rounded transition-all duration-300 ${
                  selectedType === "customer"
                    ? "ring-3 ring-primary/30 shadow-lg"
                    : "hover:ring-2 hover:ring-border"
                }`}
                onClick={() => setSelectedType("customer")}
              >
                <Card
                  className={`border-2  overflow-hidden ${
                    selectedType === "customer"
                      ? "border-primary"
                      : "border-border"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          selectedType === "customer"
                            ? "bg-primary"
                            : "bg-accent"
                        }`}
                      >
                        <Users className="w-6 h-6 text-primary-foreground" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              Sebagai Customer
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Jelajahi & dukung UMKM lokal
                            </p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedType === "customer"
                                ? "bg-primary border-primary"
                                : "bg-background border-border"
                            }`}
                          >
                            {selectedType === "customer" && (
                              <CheckCircle className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {customerBenefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 text-sm text-muted-foreground"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                  selectedType === "customer"
                                    ? "bg-primary"
                                    : "bg-accent"
                                }`}
                              />
                              {benefit}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Seller Card */}
              <motion.div
                whileHover={{ y: -2 }}
                className={`relative cursor-pointer rounded transition-all duration-300 ${
                  selectedType === "seller"
                    ? "ring-3 ring-accent/30 shadow-lg"
                    : "hover:ring-2 hover:ring-border"
                }`}
                onClick={() => setSelectedType("seller")}
              >
                <Card
                  className={`border-2 overflow-hidden ${
                    selectedType === "seller"
                      ? "border-accent"
                      : "border-border"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          selectedType === "seller" ? "bg-accent" : "bg-primary"
                        }`}
                      >
                        <Store className="w-6 h-6 text-primary-foreground" />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-foreground">
                              Sebagai Seller
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Tampilkan & kembangkan usaha
                            </p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              selectedType === "seller"
                                ? "bg-accent border-accent"
                                : "bg-background border-border"
                            }`}
                          >
                            {selectedType === "seller" && (
                              <CheckCircle className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          {sellerBenefits.map((benefit, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 text-sm text-muted-foreground"
                            >
                              <div
                                className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                  selectedType === "seller"
                                    ? "bg-accent"
                                    : "bg-primary"
                                }`}
                              />
                              {benefit}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                onClick={handleGetStarted}
                className="w-full py-6 text-lg font-semibold shadow-lg"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Daftar Sekarang - Gratis!
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
            >
              <Heart className="w-4 h-4 text-primary" />
              <span>Trusted by 50,000+ users</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;

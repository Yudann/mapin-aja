"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Store, TrendingUp, MessageCircle, Users } from "lucide-react";
import Particles from "../HeroBg";

const gradientPrimary =
  "linear-gradient(to bottom right, var(--color-brown-accent), var(--color-brown-dark))";
const gradientSecondary =
  "linear-gradient(to bottom right, var(--color-brown-accent), var(--color-brown-light))";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemTitle = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const itemContent = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden pt-20">
      {/* Background Particles - Diperbaiki untuk full height */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>

      {/* Kontainer Utama Animasi */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Main Hero Text */}
        <div className="mb-16 sm:mb-24">
          {/* Baris 1: Temukan UMKM */}
          <motion.h1
            variants={itemTitle}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mb-4"
          >
            <span className="text-white">Temukan</span>{" "}
            <span className="relative inline-block">
              <span className="text-brown-accent">UMKM</span>
              {/* Icon Store - Diperbaiki positioning */}
              <div className="absolute top-4 sm:top-6 lg:top-4 xl:top-6 -right-4 sm:-right-2 lg:-right-4 xl:-right-2 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden border-4 border-black shadow-xl transform -rotate-12 z-20">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: gradientPrimary }}
                >
                  <Store className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 text-white" />
                </div>
              </div>
            </span>
          </motion.h1>

          {/* Baris 2: lokal di */}
          <motion.h1
            variants={itemTitle}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mb-4"
          >
            <span className="text-brown-light">lokal</span>{" "}
            <span className="relative inline-block">
              <span className="text-white">di</span>
            </span>
          </motion.h1>

          {/* Baris 3: sekitar mu. */}
          <motion.h1
            variants={itemTitle}
            className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black leading-none"
          >
            <span className="text-white">sekitar</span>
            <span className="relative inline-block ml-4">
              <span className="text-white">mu.</span>
              {/* Icon MapPin - Diperbaiki positioning */}
              <div className="absolute -top-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 xl:w-20 xl:h-20 rounded-full overflow-hidden border-4 border-black shadow-xl transform rotate-12 z-20">
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: gradientPrimary }}
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-white" />
                </div>
              </div>
            </span>
          </motion.h1>
        </div>

        {/* Cards Section */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Left Card - Statistics */}
          <motion.div
            variants={itemContent}
            className="bg-white text-gray-900 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-3">
                  <div
                    className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-white font-bold z-10"
                    style={{ background: gradientPrimary }}
                  >
                    A
                  </div>
                  <div
                    className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center font-bold text-brown-dark z-20"
                    style={{ background: gradientSecondary }}
                  >
                    B
                  </div>
                  <div
                    className="w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-white font-bold z-30"
                    style={{
                      background:
                        "linear-gradient(to bottom right, var(--color-brown-dark), var(--color-brown-accent))",
                    }}
                  >
                    C
                  </div>
                </div>
                <div className="text-2xl font-black">+15K</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 font-semibold mb-1">
                  Top Spaces
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-xl">
                  <div
                    className="w-6 h-6 rounded-lg"
                    style={{ background: gradientPrimary }}
                  ></div>
                  <span className="font-bold text-sm text-brown-dark">
                    fashion-talks
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="text-xs text-gray-500 font-semibold mb-2">
                  New members
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-3xl font-black">+55</div>
                  <TrendingUp className="w-5 h-5 text-brown-accent" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-xl">
                  <div className="w-6 h-6 bg-brown-dark rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-sm text-brown-dark">
                    general-chat
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-xl">
                  <div className="w-6 h-6 bg-brown-accent rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-sm text-brown-dark">
                    workshop-group
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 rounded-2xl p-4">
              <div className="text-xs text-gray-500 font-semibold mb-2">
                New messages
              </div>
              <div className="text-3xl font-black">+29,127</div>
            </div>
          </motion.div>

          {/* Right Side - Text & Cards */}
          <div className="space-y-6">
            {/* Description Text & Button */}
            <motion.div variants={itemContent} className="relative z-10">
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed mb-8">
                Platform direktori UMKM berbasis lokasi untuk membantu Anda
                menemukan dan mendukung bisnis lokal.
              </p>
              <button className="bg-brown-accent hover:opacity-80 text-brown-dark font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2 relative z-20">
                <span>GET STARTED FREE</span>
                <span className="text-2xl">✨</span>
              </button>
            </motion.div>

            {/* Bottom Cards Container */}
            <motion.div variants={container} className="space-y-4">
              {/* Automated Message Card */}
              <motion.div
                variants={itemContent}
                className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl relative z-10"
              >
                <div className="text-xs text-gray-500 font-semibold mb-3">
                  Automated Message
                </div>
                <div className="flex items-start space-x-3">
                  <div
                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold"
                    style={{ background: gradientPrimary }}
                  >
                    N
                  </div>
                  <div>
                    <div className="font-bold mb-1">Nicole Anderson</div>
                    <p className="text-sm text-gray-600">
                      Hi Adam 👋 welcome to our community - the best first step
                      is to join the #intros channel and let us know more about
                      you!
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Automations Card */}
              <motion.div
                variants={itemContent}
                className="bg-white text-gray-900 rounded-2xl p-6 shadow-xl relative z-10"
              >
                <div className="text-xs text-gray-500 font-semibold mb-3">
                  Automations
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <span className="font-semibold">Renewal Reminder</span>
                    </div>
                    <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-brown-accent rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full"></div>
                      </div>
                      <span className="font-semibold">Onboarding Flow</span>
                    </div>
                    <div className="w-6 h-6 bg-gray-800 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm py-6 overflow-hidden z-10">
        <div className="flex space-x-12 animate-scroll whitespace-nowrap">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex space-x-12">
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                LEARNING COMMUNITY
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                ONLINE FORUMS
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                ONLINE CHAT
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                AUTOMATION
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                TEACHING
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                LEARNING MANAGEMENT PLATFORMS
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                COMMUNITY
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                PUBLIC SOCIAL
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                COURSES
              </span>
              <span className="text-gray-500 uppercase tracking-wider text-sm font-bold">
                EMAIL MARKETING
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

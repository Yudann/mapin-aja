// components/Footer.tsx
"use client";

import {
  MapPin,
  Mail,
  Phone,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  ArrowUp,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation"; // Import hook untuk mendapatkan rute

// --- Konstanta Rute Tersembunyi (SAMA DENGAN NAVIGASI) ---
// Footer akan disembunyikan jika rute saat ini dimulai dengan salah satu prefix ini.
const HIDDEN_ROUTES_PREFIXES = [
  "/umkm",
  "/umkm/",
  "/dashboard-seller",
  "/dashboard-seller/",
  "/auth",
  "/auth/",
];

// --- Komponen Footer Utama ---
const Footer = () => {
  const pathname = usePathname(); // Dapatkan rute saat ini

  // 1. Logika Pengecekan Kustomisasi
  const shouldHideFooter = HIDDEN_ROUTES_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );

  // 2. Render Tersembunyi
  if (shouldHideFooter) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/umkm", label: "Jelajahi UMKM" },
    { href: "/auth?mode=login", label: "Login" },
    { href: "/auth?mode=register", label: "Daftar" },
  ];

  const companyLinks = [
    { href: "/about", label: "Tentang Kami" },
    { href: "/blog", label: "Blog" },
    { href: "/careers", label: "Karir" },
    { href: "/press", label: "Press Kit" },
  ];

  const supportLinks = [
    { href: "/help", label: "Pusat Bantuan" },
    { href: "/contact", label: "Kontak" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com/mapinaja",
      label: "Instagram",
      icon: Instagram,
      color: "hover:text-brown-accent",
    },
    {
      href: "https://twitter.com/mapinaja",
      label: "Twitter",
      icon: Twitter,
      color: "hover:text-brown-accent",
    },
    {
      href: "https://facebook.com/mapinaja",
      label: "Facebook",
      icon: Facebook,
      color: "hover:text-brown-accent",
    },
  ];

  return (
    <footer className="bg-linear-to-b from-brown-light to-brown-accent/50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brown-accent rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brown-accent/70 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1 space-y-6"
            >
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-linear-to-br from-brown-dark to-brown-accent rounded-lg flex items-center justify-center shadow-lg"
                >
                  <MapPin className="h-5 w-5 text-white" />
                </motion.div>
                <span className="text-2xl font-bold bg-linear-to-r from-brown-dark to-brown-accent bg-clip-text text-transparent">
                  MapinAja
                </span>
              </Link>

              {/* Description */}
              <p className="text-brown-dark/80 leading-relaxed text-lg">
                Temukan yang{" "}
                <span className="text-brown-accent font-semibold">Dekat</span>,
                Dukung yang{" "}
                <span className="text-brown-accent/90 font-semibold">
                  Lokal
                </span>
                . Platform direktori UMKM Indonesia yang menghubungkan komunitas
                dengan produk terbaik.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 bg-white/80 backdrop-blur-sm rounded-xl border border-brown-accent/50 text-brown-dark/60 transition-all duration-200 ${social.color} hover:shadow-lg hover:border-brown-accent`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-brown-dark">Navigasi</h3>
              <div className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-brown-dark/70 hover:text-brown-accent transition-colors duration-200 font-medium group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Perusahaan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-brown-dark">Perusahaan</h3>
              <div className="space-y-3">
                {companyLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-brown-dark/70 hover:text-brown-accent transition-colors duration-200 font-medium group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Support & Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-bold text-brown-dark">Support</h3>
              <div className="space-y-3">
                {supportLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block text-brown-dark/70 hover:text-brown-accent transition-colors duration-200 font-medium group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* Contact Info */}
              <div className="pt-4 space-y-3">
                <a
                  href="mailto:hello@mapinaja.com"
                  className="flex items-center gap-3 text-brown-dark/70 hover:text-brown-accent transition-colors duration-200 group"
                >
                  <Mail className="h-5 w-5 text-brown-accent group-hover:scale-110 transition-transform" />
                  <span className="font-medium">hello@mapinaja.com</span>
                </a>
                <a
                  href="tel:+6281234567890"
                  className="flex items-center gap-3 text-brown-dark/70 hover:text-brown-accent transition-colors duration-200 group"
                >
                  <Phone className="h-5 w-5 text-brown-accent group-hover:scale-110 transition-transform" />
                  <span className="font-medium">+62 812 3456 7890</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-brown-accent/50 py-8"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-brown-dark/70 text-sm">
              <span>© {new Date().getFullYear()} MapinAja. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span>in Indonesia</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm text-brown-dark/70">
              <Link
                href="/privacy"
                className="hover:text-brown-accent transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-brown-accent transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-brown-accent transition-colors"
              >
                Sitemap
              </Link>
            </div>

            {/* Back to Top Button */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-brown-accent/50 text-brown-dark rounded-xl hover:bg-white hover:border-brown-accent transition-all duration-200 font-medium"
            >
              <ArrowUp className="h-4 w-4" />
              Back to Top
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating UMKM Elements */}
      <div className="absolute bottom-20 left-10 opacity-10">
        <div className="text-6xl">🛍️</div>
      </div>
      <div className="absolute top-20 right-10 opacity-10">
        <div className="text-6xl">☕</div>
      </div>
    </footer>
  );
};

export default Footer;

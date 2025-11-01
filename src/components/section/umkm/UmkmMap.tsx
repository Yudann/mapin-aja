"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Navigation,
  X,
  Phone,
  MessageCircle,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

// Types
interface UMKM {
  id: string;
  name: string;
  description?: string;
  category: string;
  address: string;
  phone?: string;
  image_url?: string;
  latitude?: number;
  longitude?: number;
}

interface UmkmMapProps {
  umkms?: UMKM[];
  onMarkerClick?: (umkm: UMKM) => void;
  className?: string;
}

// Dummy data untuk testing
const DUMMY_UMKMS: UMKM[] = [
  {
    id: "1",
    name: "Warung Kopi Kenangan",
    description: "Kopi tradisional dengan rasa autentik",
    category: "Kafe & Minuman",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    phone: "+62 812-3456-7890",
    image_url:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop",
    latitude: -6.2088,
    longitude: 106.8456,
  },
  {
    id: "2",
    name: "Toko Kerajinan Batik",
    description: "Kerajinan batik handmade berkualitas",
    category: "Kerajinan",
    address: "Jl. Thamrin No. 45, Jakarta Selatan",
    phone: "+62 813-4567-8901",
    image_url:
      "https://images.unsplash.com/photo-1584735264930-6dc7b3eb4db3?w=400&h=300&fit=crop",
    latitude: -6.2188,
    longitude: 106.8356,
  },
  {
    id: "3",
    name: "Rumah Makan Padang Sederhana",
    description: "Masakan Padang asli dengan cita rasa tradisional",
    category: "Kuliner",
    address: "Jl. Gatot Subroto No. 67, Jakarta Barat",
    phone: "+62 814-5678-9012",
    image_url:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
    latitude: -6.1988,
    longitude: 106.8556,
  },
];

// Default center (Jakarta)
const DEFAULT_CENTER = { lat: -6.2088, lng: 106.8456 };
const DEFAULT_ZOOM = 13;

const UmkmMap: React.FC<UmkmMapProps> = ({
  umkms = DUMMY_UMKMS,
  onMarkerClick,
  className = "",
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [selectedUmkm, setSelectedUmkm] = useState<UMKM | null>(null);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingMap, setIsLoadingMap] = useState(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);

  // Load Leaflet dynamically dengan error handling
  useEffect(() => {
    let isMounted = true;

    const loadLeaflet = async () => {
      try {
        setIsLoadingMap(true);
        setMapError(null);

        // Cek jika Leaflet sudah tersedia di window
        if (typeof window === "undefined") return;

        // Import Leaflet CSS
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          link.integrity =
            "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
          link.crossOrigin = "";
          document.head.appendChild(link);
        }

        // Import Leaflet JS
        const leaflet = await import("leaflet");

        // Fix default marker icon issue
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        if (isMounted) {
          setL(leaflet);
          setIsLoadingMap(false);
        }
      } catch (error) {
        console.error("Error loading Leaflet:", error);
        if (isMounted) {
          setMapError("Gagal memuat peta. Silakan refresh halaman.");
          setIsLoadingMap(false);
        }
      }
    };

    loadLeaflet();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize map dengan safety check
  useEffect(() => {
    if (!L || !mapRef.current || map) return;

    try {
      const newMap = L.map(mapRef.current).setView(
        [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng],
        DEFAULT_ZOOM
      );

      // Add tile layer dengan error handling
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(newMap);

      setMap(newMap);
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Gagal menginisialisasi peta.");
    }

    return () => {
      if (map) {
        try {
          map.remove();
        } catch (error) {
          console.error("Error removing map:", error);
        }
      }
    };
  }, [L, map]);

  // Add markers untuk UMKM dengan safety check
  useEffect(() => {
    if (!map || !L || !umkms || umkms.length === 0) return;

    try {
      // Clear existing markers
      markersRef.current.forEach((marker) => {
        if (marker && map) {
          try {
            marker.remove();
          } catch (error) {
            console.error("Error removing marker:", error);
          }
        }
      });
      markersRef.current = [];

      // Create custom icon
      // MENGGANTI WARNA MARKER UMKM
      const customIcon = L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            background-color: #4A90E2; /* brown-accent */
            width: 40px;
            height: 40px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            border: 3px solid white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <svg style="
              width: 20px;
              height: 20px;
              transform: rotate(45deg);
              fill: white;
            " viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const bounds = L.latLngBounds([]);
      let hasValidCoordinates = false;

      umkms.forEach((umkm) => {
        try {
          // Use provided coordinates or generate random ones near default center
          const lat =
            umkm.latitude || DEFAULT_CENTER.lat + (Math.random() - 0.5) * 0.05;
          const lng =
            umkm.longitude || DEFAULT_CENTER.lng + (Math.random() - 0.5) * 0.05;

          // Validate coordinates
          if (isNaN(lat) || isNaN(lng)) {
            console.warn(`Invalid coordinates for UMKM ${umkm.name}:`, {
              lat,
              lng,
            });
            return;
          }

          const marker = L.marker([lat, lng], { icon: customIcon })
            .addTo(map)
            .on("click", () => {
              setSelectedUmkm(umkm);
              if (onMarkerClick) onMarkerClick(umkm);
            });

          // Add popup
          // MENGGANTI WARNA TEKS POPUP
          marker.bindPopup(`
            <div style="padding: 8px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #3E2C23;">${umkm.name}</h3> <p style="margin: 0 0 8px 0; color: #666; font-size: 12px;">${umkm.category}</p>
              <p style="margin: 0; color: #888; font-size: 11px;">${umkm.address}</p>
            </div>
          `);

          markersRef.current.push(marker);
          bounds.extend([lat, lng]);
          hasValidCoordinates = true;
        } catch (error) {
          console.error(`Error creating marker for UMKM ${umkm.name}:`, error);
        }
      });

      // Fit bounds to show all markers
      if (hasValidCoordinates && bounds.isValid()) {
        try {
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
        } catch (error) {
          console.error("Error fitting bounds:", error);
        }
      }
    } catch (error) {
      console.error("Error adding markers:", error);
      setMapError("Gagal menampilkan marker UMKM.");
    }
  }, [map, L, umkms, onMarkerClick]);

  // Get user location dengan error handling
  const getUserLocation = () => {
    setIsLoadingLocation(true);
    setMapError(null);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          try {
            const location = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(location);

            if (map && L) {
              map.setView([location.lat, location.lng], 15);

              // Remove existing user marker
              if (userMarkerRef.current) {
                userMarkerRef.current.remove();
              }

              // Add user location marker
              // WARNA MARKER LOKASI USER DI PERTAHANKAN (BIRU)
              const userIcon = L.divIcon({
                className: "user-location-marker",
                html: `
                  <div style="
                    background: linear-gradient(135deg, #3B82F6, #2563EB);
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    border: 4px solid white;
                    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
                  "></div>
                `,
                iconSize: [20, 20],
                iconAnchor: [10, 10],
              });

              userMarkerRef.current = L.marker([location.lat, location.lng], {
                icon: userIcon,
              })
                .addTo(map)
                .bindPopup("<b>Lokasi Anda</b>")
                .openPopup();
            }

            setIsLoadingLocation(false);
          } catch (error) {
            console.error("Error processing user location:", error);
            setMapError("Gagal memproses lokasi Anda.");
            setIsLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Tidak dapat mengakses lokasi Anda.";

          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Izin lokasi ditolak. Silakan aktifkan izin lokasi di browser Anda.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Informasi lokasi tidak tersedia.";
              break;
            case error.TIMEOUT:
              errorMessage = "Permintaan lokasi timeout.";
              break;
          }

          setMapError(errorMessage);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      setMapError("Browser Anda tidak mendukung geolocation.");
      setIsLoadingLocation(false);
    }
  };

  // Retry loading map
  const retryLoadMap = () => {
    setMapError(null);
    setIsLoadingMap(true);

    // Force reload komponen
    if (map) {
      try {
        map.remove();
      } catch (error) {
        console.error("Error removing map on retry:", error);
      }
      setMap(null);
    }

    // Reload Leaflet
    const loadLeaflet = async () => {
      try {
        const leaflet = await import("leaflet");
        setL(leaflet);
        setIsLoadingMap(false);
      } catch (error) {
        console.error("Error reloading Leaflet:", error);
        setMapError("Gagal memuat peta. Silakan refresh halaman.");
        setIsLoadingMap(false);
      }
    };

    loadLeaflet();
  };

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Map Container */}
      <div
        ref={mapRef}
        // Mengganti bg-gray-200 dengan bg-brown-light/50
        className="w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-brown-light/50"
      />

      {/* Controls: Lokasi Saya Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={getUserLocation}
        disabled={isLoadingLocation || !map}
        // Mengganti warna teks, hover, dan border dengan brown-accent/brown-light
        className="absolute top-4 right-4 z-[1000] bg-white hover:bg-brown-light text-brown-accent p-3 rounded-full shadow-lg border-2 border-brown-accent/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        title="Cari lokasi saya"
      >
        {isLoadingLocation ? (
          // Mengganti warna border loader dengan brown-accent
          <div className="w-6 h-6 border-2 border-brown-accent border-t-transparent rounded-full animate-spin" />
        ) : (
          <Navigation className="w-6 h-6" />
        )}
      </motion.button>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        // Mengganti warna border dengan brown-accent/50
        className="absolute bottom-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border-2 border-brown-accent/50"
      >
        <div className="flex items-center gap-3 mb-2">
          <div
            // Mengganti warna marker Legend dengan brown-accent
            className="w-6 h-6 bg-brown-accent rounded-full border-2 border-white shadow-md"
            style={{
              transform: "rotate(45deg)",
              borderRadius: "50% 50% 50% 0",
            }}
          />
          {/* Mengganti warna teks dengan brown-dark */}
          <span className="text-sm font-semibold text-brown-dark">
            Lokasi UMKM
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Warna Lokasi Anda (Biru) dipertahankan */}
          <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md" />
          {/* Mengganti warna teks dengan brown-dark */}
          <span className="text-sm font-semibold text-brown-dark">
            Lokasi Anda
          </span>
        </div>
      </motion.div>

      {/* UMKM Detail Card */}
      <AnimatePresence>
        {selectedUmkm && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25 }}
            // Mengganti warna border dengan brown-accent/50
            className="absolute top-4 left-4 z-[1000] w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border-2 border-brown-accent/50 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedUmkm(null)}
              className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              {/* Mengganti warna ikon dengan brown-dark */}
              <X className="w-5 h-5 text-brown-dark" />
            </button>

            {/* Image */}
            {selectedUmkm.image_url ? (
              <div className="relative h-40 overflow-hidden">
                <img
                  src={selectedUmkm.image_url}
                  alt={selectedUmkm.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
              </div>
            ) : (
              // Mengganti warna fallback image dengan brown-accent/brown-light
              <div className="h-40 bg-linear-to-br from-brown-accent/20 to-brown-light/50 flex items-center justify-center">
                {/* Mengganti warna ikon dengan brown-accent/40 */}
                <MapPin className="w-16 h-16 text-brown-accent/40" />
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Title & Category */}
              <div>
                {/* Mengganti warna judul dengan brown-dark */}
                <h3 className="text-xl font-bold text-brown-dark mb-2">
                  {selectedUmkm.name}
                </h3>
                {/* Mengganti warna badge dengan brown-accent */}
                <span className="inline-block px-3 py-1 bg-brown-accent/20 text-brown-accent rounded-full text-xs font-semibold">
                  {selectedUmkm.category}
                </span>
              </div>

              {/* Description */}
              {selectedUmkm.description && (
                // Mengganti warna teks dengan brown-dark/70
                <p className="text-sm text-brown-dark/70">
                  {selectedUmkm.description}
                </p>
              )}

              {/* Address */}
              <div className="flex items-start gap-3">
                {/* Mengganti warna ikon dengan brown-accent */}
                <MapPin className="w-5 h-5 text-brown-accent flex-shrink-0 mt-0.5" />
                {/* Mengganti warna teks dengan brown-dark/80 */}
                <span className="text-sm text-brown-dark/80">
                  {selectedUmkm.address}
                </span>
              </div>

              {/* Phone */}
              {selectedUmkm.phone && (
                <div className="flex items-center gap-3">
                  {/* Mengganti warna ikon dengan brown-accent */}
                  <Phone className="w-5 h-5 text-brown-accent" />
                  {/* Mengganti warna teks dengan brown-dark/80 */}
                  <span className="text-sm text-brown-dark/80">
                    {selectedUmkm.phone}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  // Mengganti warna tombol dengan brown-accent/brown-dark
                  className="flex-1 bg-brown-accent hover:bg-brown-dark text-white py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </motion.button>
                <Link
                  href={`/umkm/${selectedUmkm.id}`}
                  // Mengganti warna border dan teks dengan brown-accent
                  className="flex-1 bg-white hover:bg-brown-light border-2 border-brown-accent text-brown-accent py-2.5 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Detail
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Overlay */}
      {isLoadingMap && !mapError && (
        // Mengganti bg dengan brown-light
        <div className="absolute inset-0 bg-brown-light flex flex-col items-center justify-center z-[1001] rounded-2xl">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            // Mengganti warna loader dengan brown-accent
            className="w-12 h-12 border-4 border-brown-accent border-t-transparent rounded-full mb-4"
          />
          {/* Mengganti warna teks dengan brown-dark */}
          <p className="text-brown-dark font-semibold">Memuat peta...</p>
        </div>
      )}

      {/* Error Overlay */}
      {mapError && (
        // Mengganti bg dengan brown-light
        <div className="absolute inset-0 bg-brown-light flex flex-col items-center justify-center z-[1001] rounded-2xl p-6">
          <div className="text-center max-w-md">
            {/* Warna error (Merah) dipertahankan */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <X className="w-8 h-8 text-red-600" />
            </div>
            {/* Mengganti warna teks dengan brown-dark */}
            <h3 className="text-lg font-bold text-brown-dark mb-2">
              Gagal Memuat Peta
            </h3>
            {/* Mengganti warna teks dengan brown-dark/70 */}
            <p className="text-brown-dark/70 mb-4">{mapError}</p>
            <div className="flex gap-3">
              <button
                onClick={retryLoadMap}
                // Mengganti warna tombol dengan brown-accent/brown-dark
                className="bg-brown-accent hover:bg-brown-dark text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Coba Lagi
              </button>
              <button
                onClick={() => window.location.reload()}
                // Mengganti warna border dan teks dengan brown-accent
                className="bg-white hover:bg-brown-light border-2 border-brown-accent text-brown-accent px-4 py-2 rounded-lg font-semibold transition-colors"
              >
                Refresh Halaman
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overlay */}
      {map && !mapError && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          // Mengganti warna border dengan brown-accent/50
          className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border-2 border-brown-accent/50"
        >
          <div className="flex items-center gap-2">
            {/* Mengganti warna ikon dengan brown-accent */}
            <MapPin className="w-5 h-5 text-brown-accent" />
            {/* Mengganti warna teks dengan brown-dark */}
            <span className="font-bold text-brown-dark">{umkms.length}</span>
            {/* Mengganti warna teks dengan brown-dark/70 */}
            <span className="text-sm text-brown-dark/70">UMKM di peta</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UmkmMap;

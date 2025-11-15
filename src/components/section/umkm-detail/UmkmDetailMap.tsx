// src\components\section\umkm-detail\UmkmDetailMap.tsx

"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, ExternalLink, Loader2 } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UmkmDetailMapProps {
  umkm: UMKM;
}

export default function UmkmDetailMap({ umkm }: UmkmDetailMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [L, setL] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Generate OpenStreetMap URL untuk link eksternal
  const getOpenStreetMapUrl = () => {
    return `https://www.openstreetmap.org/?mlat=${umkm.latitude}&mlon=${umkm.longitude}#map=16/${umkm.latitude}/${umkm.longitude}`;
  };

  // Generate Google Maps directions URL (tetap bisa tanpa API key untuk link eksternal)
  const getDirectionsUrl = () => {
    return `https://www.google.com/maps/dir/?api=1&destination=${umkm.latitude},${umkm.longitude}`;
  };

  // Load Leaflet untuk peta interaktif
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        if (typeof window === "undefined") return;

        // Load CSS Leaflet jika belum ada
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }

        const leaflet = await import("leaflet");

        // Fix untuk marker icons
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        setL(leaflet);
        setMapLoaded(true);
      } catch (error) {
        console.error("Error loading Leaflet:", error);
      }
    };

    loadLeaflet();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!L || !mapRef.current || map) return;

    try {
      const newMap = L.map(mapRef.current).setView(
        [umkm.latitude, umkm.longitude],
        15
      );

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(newMap);

      // Add custom marker
      const customIcon = L.divIcon({
        className: "custom-umkm-marker-detail",
        html: `
          <div style="position: relative; width: 48px; height: 48px;">
            <div style="
              background: linear-gradient(135deg, #B99470, #3E2C23);
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: 4px solid white;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
            ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 48],
      });

      L.marker([umkm.latitude, umkm.longitude], {
        icon: customIcon,
      }).addTo(newMap);

      setMap(newMap);
    } catch (error) {
      console.error("Error initializing map:", error);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [L, umkm.latitude, umkm.longitude, map]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-brown-dark">Lokasi</h3>
        <div className="flex gap-2">
          <a
            href={getDirectionsUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-brown-accent text-white rounded-lg text-sm font-semibold hover:bg-brown-dark transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Petunjuk Arah</span>
          </a>
          <a
            href={getOpenStreetMapUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-brown-light border border-brown-accent text-brown-accent rounded-lg text-sm font-semibold hover:bg-brown-accent hover:text-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Buka di Maps</span>
          </a>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-brown-light rounded-2xl p-4">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-brown-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-brown-dark font-medium mb-1">
              {umkm.address}
            </p>
            <p className="text-xs text-brown-dark/60">
              {umkm.distance} km dari lokasi Anda
            </p>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="relative h-64 rounded-xl overflow-hidden bg-brown-light">
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="text-center">
                <Loader2 className="w-8 h-8 text-brown-accent animate-spin mx-auto mb-2" />
                <p className="text-sm text-brown-dark">Memuat peta...</p>
              </div>
            </div>
          )}
          <div
            ref={mapRef}
            className="absolute inset-0 z-0"
            style={{
              opacity: mapLoaded ? 1 : 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
        </div>

        {/* Map Instructions */}
        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
          <p className="text-xs text-brown-dark/60 text-center">
            Klik Petunjuk Arah untuk navigasi ke {umkm.name}
          </p>
        </div>
      </div>
    </div>
  );
}

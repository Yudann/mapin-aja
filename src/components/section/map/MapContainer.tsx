// src\components\section\map\MapContainer.tsx

import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { DUMMY_UMKMS } from "@/data/umkm";
import { UMKM } from "@/types/umkm";

// Tambahkan di bagian atas file, setelah import
const DEFAULT_CENTER = {
  lat: -6.2088,
  lng: 106.8456,
};

const DEFAULT_ZOOM = 13;

// Buat mapping sederhana untuk data peta
const MAP_UMKMS = DUMMY_UMKMS.map((umkm) => ({
  id: umkm.id,
  name: umkm.name,
  latitude: umkm.latitude,
  longitude: umkm.longitude,
}));

interface MapContainerProps {
  selectedUmkm: UMKM | null;
  onUmkmSelect: (umkm: UMKM) => void;
}

export default function MapContainer({ onUmkmSelect }: MapContainerProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [L, setL] = useState<any>(null);
  const [map, setMap] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        if (typeof window === "undefined") return;

        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(link);
        }

        const leaflet = await import("leaflet");

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

  useEffect(() => {
    if (!L || !mapRef.current || map) return;

    try {
      const newMap = L.map(mapRef.current, {
        zoomControl: false,
      }).setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], DEFAULT_ZOOM);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(newMap);

      L.control.zoom({ position: "bottomright" }).addTo(newMap);

      setMap(newMap);
    } catch (error) {
      console.error("Error initializing map:", error);
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

  useEffect(() => {
    if (!map || !L) return;

    markersRef.current.forEach((marker) => {
      try {
        marker.remove();
      } catch (error) {
        console.error("Error removing marker:", error);
      }
    });
    markersRef.current = [];

    const customIcon = L.divIcon({
      className: "custom-umkm-marker",
      html: `
        <div style="position: relative; width: 40px; height: 40px;">
          <div style="
            background: linear-gradient(135deg, #B99470, #3E2C23);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          ">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    MAP_UMKMS.forEach((mapUmkm) => {
      try {
        // Cari data UMKM lengkap dari DUMMY_UMKMS berdasarkan ID
        const fullUmkmData = DUMMY_UMKMS.find((umkm) => umkm.id === mapUmkm.id);

        if (!fullUmkmData) {
          console.warn(`Data UMKM tidak ditemukan untuk ID: ${mapUmkm.id}`);
          return;
        }

        const marker = L.marker([mapUmkm.latitude, mapUmkm.longitude], {
          icon: customIcon,
        })
          .addTo(map)
          .on("click", () => {
            onUmkmSelect(fullUmkmData);
            map.setView([mapUmkm.latitude, mapUmkm.longitude], 15, {
              animate: true,
              duration: 0.5,
            });
          });

        markersRef.current.push(marker);
      } catch (error) {
        console.error(`Error creating marker for ${mapUmkm.name}:`, error);
      }
    });
  }, [map, L, onUmkmSelect]);

  return (
    <div ref={mapRef} className="absolute inset-0 z-0">
      {!mapLoaded && (
        <div className="absolute inset-0 bg-brown-light flex items-center justify-center z-50">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-brown-accent animate-spin mx-auto mb-4" />
            <p className="text-brown-dark font-semibold">Memuat peta...</p>
          </div>
        </div>
      )}
    </div>
  );
}

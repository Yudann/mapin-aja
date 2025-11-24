// src\components\section\map\MapContainer.tsx

import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { DUMMY_UMKMS } from "@/data/umkm";
import { UMKM } from "@/types/umkm";

const DEFAULT_CENTER = {
  lat: -6.2323,
  lng: 106.6153,
};

const DEFAULT_ZOOM = 50;

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
            transition: transform 0.2s ease;
            color: #ffffff;
          ">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store-icon lucide-store"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"/><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"/><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"/></svg>
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
    <div ref={mapRef} className="absolute inset-0 z-0 overflow-hidden">
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

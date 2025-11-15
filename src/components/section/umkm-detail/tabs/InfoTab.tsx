// src\components\section\umkm-detail\tabs\InfoTab.tsx

import React from "react";
import { MapPin, Navigation, Clock, Phone, MessageCircle } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface InfoTabProps {
  umkm: UMKM;
}

export default function InfoTab({ umkm }: InfoTabProps) {
  const openingHours = [
    {
      day: "Senin - Jumat",
      hours: "10:00 - 22:00",
      isToday: true,
    },
    {
      day: "Sabtu - Minggu",
      hours: "09:00 - 23:00",
      isToday: false,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-brown-dark mb-3">Tentang</h3>
        <p className="text-sm text-brown-dark/70 leading-relaxed">
          {umkm.description}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-brown-dark mb-3">Alamat</h3>
        <div className="flex items-start gap-3 p-4 bg-brown-light rounded-xl">
          <MapPin className="w-5 h-5 text-brown-accent shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-brown-dark font-medium mb-2">
              {umkm.address}
            </p>
            <p className="text-xs text-brown-dark/60 mb-3">
              {umkm.distance} km dari lokasi Anda
            </p>
            <button className="text-sm font-bold text-brown-accent hover:text-brown-dark transition-colors flex items-center gap-1">
              <Navigation className="w-4 h-4" />
              <span>Lihat di Peta</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-brown-dark mb-3">
          Jam Operasional
        </h3>
        <div className="space-y-3">
          {openingHours.map((schedule, idx) => (
            <div
              key={idx}
              className={`flex justify-between items-center py-3 px-4 rounded-xl ${
                schedule.isToday ? "bg-brown-light" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brown-accent" />
                <span className="text-sm font-semibold text-brown-dark">
                  {schedule.day}
                </span>
                {schedule.isToday && (
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                    Hari ini
                  </span>
                )}
              </div>
              <span className="text-sm font-bold text-brown-dark">
                {schedule.hours}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-brown-dark mb-3">Kontak</h3>
        <div className="space-y-3">
          <a
            href={`tel:${umkm.phone}`}
            className="flex items-center gap-3 p-4 bg-brown-light rounded-xl hover:bg-brown-accent/20 transition-colors"
          >
            <Phone className="w-5 h-5 text-brown-accent" />
            <div>
              <p className="text-xs text-brown-dark/60 mb-0.5">Telepon</p>
              <p className="text-sm font-bold text-brown-dark">{umkm.phone}</p>
            </div>
          </a>

          <div className="flex items-center gap-3 p-4 bg-brown-light rounded-xl">
            <MessageCircle className="w-5 h-5 text-brown-accent" />
            <div>
              <p className="text-xs text-brown-dark/60 mb-0.5">Waktu Respon</p>
              <p className="text-sm font-bold text-brown-dark">
                {umkm.responseTime}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

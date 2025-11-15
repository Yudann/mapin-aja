// src\components\section\umkm-detail\tabs\InfoTab.tsx

import React from "react";
import { Clock, Phone, MessageCircle } from "lucide-react";
import UmkmDetailMap from "../UmkmDetailMap";
import UmkmDetailGallery from "../UmkmDetailGallery";
import { UMKM } from "@/types/umkm";

interface InfoTabProps {
  umkm: UMKM;
}

export default function InfoTab({ umkm }: InfoTabProps) {
  return (
    <div className="space-y-8">
      {/* Gallery Section */}
      <UmkmDetailGallery umkm={umkm} />

      {/* Map Section */}
      <UmkmDetailMap umkm={umkm} />

      {/* About Section */}
      <div>
        <h3 className="text-lg font-bold text-brown-dark mb-3">Tentang</h3>
        <p className="text-sm text-brown-dark/70 leading-relaxed">
          {umkm.description}
        </p>
      </div>

      {/* Opening Hours */}
      <div>
        <h3 className="text-lg font-bold text-brown-dark mb-3">
          Jam Operasional
        </h3>
        <div className="space-y-3">
          {umkm.openingSchedules.map((schedule, idx) => (
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

      {/* Contact */}
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

// src\components\section\umkm-detail\UmkmDetailGallery.tsx

"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { UMKM } from "@/types/umkm";

interface UmkmDetailGalleryProps {
  umkm: UMKM;
}

export default function UmkmDetailGallery({ umkm }: UmkmDetailGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Collect all images from UMKM (banner + product images)
  const allImages = [
    umkm.bannerImage,
    umkm.image,
    ...umkm.products.map((product) => product.image),
    ...umkm.reviews.flatMap((review) => review.images || []),
  ].filter((image, index, self) => image && self.indexOf(image) === index);

  const openImage = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length);
    setSelectedImage(allImages[(currentIndex + 1) % allImages.length]);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    setSelectedImage(
      allImages[(currentIndex - 1 + allImages.length) % allImages.length]
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-brown-dark">Galeri Foto</h3>

      {/* Image Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {allImages.slice(0, 8).map((image, index) => (
          <div
            key={index}
            onClick={() => openImage(image, index)}
            className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
          >
            <img
              src={image}
              alt={`Galeri ${umkm.name} ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </div>
        ))}
      </div>

      {allImages.length > 8 && (
        <p className="text-sm text-brown-dark/60 text-center">
          +{allImages.length - 8} foto lainnya
        </p>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeImage}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          <div className="relative max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt={`Galeri ${umkm.name}`}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {allImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

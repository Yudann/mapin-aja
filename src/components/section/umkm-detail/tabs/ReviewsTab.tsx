// src\components\section\umkm-detail\tabs\ReviewsTab.tsx

import React from "react";
import { Star, ThumbsUp, ChevronRight } from "lucide-react";
import { REVIEWS } from "@/data/umkm-detail";
import { UMKM } from "@/types/umkm";

interface ReviewsTabProps {
  umkm: UMKM;
}

export default function ReviewsTab({ umkm }: ReviewsTabProps) {
  return (
    <div>
      <div className="bg-brown-light rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-6 mb-4">
          <div className="text-center">
            <div className="text-4xl font-black text-brown-dark mb-1">
              {umkm.rating}
            </div>
            <div className="flex items-center gap-1 justify-center mb-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <p className="text-xs text-brown-dark/60">
              {umkm.reviewCount}+ rating
            </p>
          </div>

          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-xs font-semibold text-brown-dark w-4">
                  {rating}
                </span>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brown-accent"
                    style={{
                      width: `${rating === 5 ? 80 : rating === 4 ? 15 : 5}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-100 pb-4 last:border-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <h4 className="font-bold text-brown-dark text-sm">
                  {review.userName}
                </h4>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${
                          star <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-brown-dark/60">
                    {review.date}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-brown-dark/80 mb-3 leading-relaxed">
              {review.comment}
            </p>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 mb-3">
                {review.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Review ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <button className="flex items-center gap-2 text-xs text-brown-dark/60 hover:text-brown-accent transition-colors">
              <ThumbsUp className="w-4 h-4" />
              <span>Membantu ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>

      <button className="w-full py-3 mt-4 text-sm font-bold text-brown-accent hover:text-brown-dark transition-colors flex items-center justify-center gap-2">
        <span>Lihat Semua Ulasan</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

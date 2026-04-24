"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({
  images,
  name,
}: {
  images: string[];
  name: string;
}) {
  const [activeImage, setActiveImage] = useState(
    images[0] || "/placeholder-gear.jpg",
  );

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div className="relative aspect-square md:aspect-video lg:aspect-4/3 w-full rounded-[3rem] overflow-hidden bg-white border border-slate-200 group">
        <Image
          src={activeImage}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                activeImage === img
                  ? "border-blue-600 scale-95"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${name} thumb ${idx}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

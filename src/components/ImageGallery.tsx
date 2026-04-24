"use client";

import { useState } from "react";
import { PropertyImage, getImageUrl } from "@/lib/api";

export default function ImageGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-64 sm:h-96 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <svg className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" strokeWidth={0.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 0 0 1.5-1.5V5.25a1.5 1.5 0 0 0-1.5-1.5H3.75a1.5 1.5 0 0 0-1.5 1.5v14.25c0 .828.672 1.5 1.5 1.5Z" />
          </svg>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-64 sm:h-[32rem] group">
        <img
          src={getImageUrl(images[activeIndex].image_url)}
          alt={`${title} - Image ${activeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        {images.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((i) => (i > 0 ? i - 1 : images.length - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((i) => (i < images.length - 1 ? i + 1 : 0))}
              className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white"
            >
              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}

        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-lg font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setActiveIndex(index)}
              className={`shrink-0 w-20 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                index === activeIndex ? "border-blue-600 shadow-md shadow-blue-200" : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={getImageUrl(image.image_url)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

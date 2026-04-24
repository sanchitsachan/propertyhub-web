"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { PropertyImage, getImageUrl } from "@/lib/api";

export default function PropertyGallery({ images, title }: { images: PropertyImage[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images?.length) return (
    <div className="bg-gray-100 rounded-2xl h-64 lg:h-96 flex items-center justify-center text-gray-400">
      <div className="text-center"><Images className="h-12 w-12 mx-auto mb-2 stroke-1" /><p className="text-sm">No photos available</p></div>
    </div>
  );

  return (
    <>
      {/* Desktop: main + thumbs */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        {/* Main image */}
        <div className="lg:col-span-3 relative h-64 sm:h-80 lg:h-[420px] bg-gray-100 cursor-pointer group" onClick={() => setLightbox(true)}>
          <img src={getImageUrl(images[active].image_url)} alt={`${title} - ${active + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          <button className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-black/60 backdrop-blur-sm text-white text-xs font-semibold hover:bg-black/80 transition-colors">
            <Images className="h-3.5 w-3.5" /> View all {images.length} photos
          </button>
          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button onClick={e => { e.stopPropagation(); setActive(i => i > 0 ? i - 1 : images.length - 1); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button onClick={e => { e.stopPropagation(); setActive(i => i < images.length - 1 ? i + 1 : 0); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white">
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </>
          )}
        </div>
        {/* Thumbnails */}
        <div className="hidden lg:flex flex-col gap-2 h-[420px] overflow-hidden">
          {images.slice(0, 4).map((img, i) => (
            <button key={img.id} onClick={() => setActive(i)}
              className={`flex-1 rounded-lg overflow-hidden border-2 transition-all ${active === i ? "border-emerald-500 shadow-md" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <img src={getImageUrl(img.image_url)} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10">
            <X className="h-5 w-5" />
          </button>
          <button onClick={e => { e.stopPropagation(); setActive(i => i > 0 ? i - 1 : images.length - 1); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={e => { e.stopPropagation(); setActive(i => i < images.length - 1 ? i + 1 : 0); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10">
            <ChevronRight className="h-6 w-6" />
          </button>
          <img src={getImageUrl(images[active].image_url)} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          <div className="absolute bottom-4 text-center text-white text-sm font-medium">{active + 1} / {images.length}</div>
        </div>
      )}
    </>
  );
}

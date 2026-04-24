"use client";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize, Heart, Camera } from "lucide-react";
import { Property, formatPrice, getImageUrl } from "@/lib/api";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/properties/${property.slug}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-300">
        <div className="relative h-52 bg-gray-100 overflow-hidden">
          {property.images?.[0] ? (
            <img src={getImageUrl(property.images[0].image_url)} alt={property.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-gray-300">
              <Maximize className="h-12 w-12 stroke-1" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg ${property.purpose === "sale" ? "bg-emerald-500 text-white" : "bg-blue-500 text-white"}`}>
              {property.purpose === "sale" ? "Buy" : "Rent"}
            </span>
            {property.featured && <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-amber-500 text-white">Featured</span>}
          </div>
          <div className="absolute top-3 right-3">
            <button onClick={e => { e.preventDefault(); e.stopPropagation(); }}
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white shadow-sm transition-all">
              <Heart className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] font-medium">
            <Camera className="h-3 w-3" /> {property.images?.length || 0}
          </div>
          <div className="absolute bottom-3 right-3">
            <p className="text-lg font-extrabold text-white drop-shadow-lg">{formatPrice(property.price, property.purpose)}</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">{property.title}</h3>
          <div className="flex items-center gap-1 mt-1.5">
            <MapPin className="h-3 w-3 text-gray-400 shrink-0" />
            <p className="text-xs text-gray-500 truncate">{property.city?.name}{property.area ? `, ${property.area.name}` : ""}</p>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-4 text-xs text-gray-500">
            {property.bedrooms > 0 && <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-gray-400" /><strong className="text-gray-700">{property.bedrooms}</strong> Beds</span>}
            {property.bathrooms > 0 && <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-gray-400" /><strong className="text-gray-700">{property.bathrooms}</strong> Baths</span>}
            {property.size_sqft > 0 && <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-gray-400" /><strong className="text-gray-700">{property.size_sqft.toLocaleString()}</strong> sqft</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}

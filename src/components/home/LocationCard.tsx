import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { City } from "@/lib/api";

// Real city skyline images (Unsplash free)
const cityImages: Record<string, string> = {
  "Mumbai": "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&q=80",
  "Delhi NCR": "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80",
  "Bangalore": "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80",
  "Hyderabad": "https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?w=800&q=80",
  "Pune": "https://images.unsplash.com/photo-1625731226721-b4d51ae70e20?w=800&q=80",
  "Chennai": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
};

const fallbackImg = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";

export default function LocationCard({ city, index, size = "normal" }: { city: City; index: number; size?: "large" | "normal" }) {
  const img = cityImages[city.name] || fallbackImg;
  const isLarge = size === "large";

  return (
    <Link href={`/properties?city_id=${city.id}`}
      className="group relative rounded-2xl overflow-hidden h-full w-full block min-h-[200px]">
      {/* Background image */}
      <img
        src={img}
        alt={city.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        loading="lazy"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/70 transition-all duration-300" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-5 lg:p-6">
        {/* Property count badge */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-[11px] font-semibold">
            <MapPin className="h-3 w-3" />
            {city.properties_count || 0} Properties
          </div>
        </div>

        {/* City name */}
        <h3 className={`font-bold text-white leading-tight ${isLarge ? "text-2xl lg:text-3xl" : "text-lg lg:text-xl"}`}>
          {city.name}
        </h3>

        {/* Explore link — appears on hover */}
        <div className="flex items-center gap-1.5 mt-2 text-white/0 group-hover:text-white/90 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-xs font-semibold">Explore Properties</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </Link>
  );
}

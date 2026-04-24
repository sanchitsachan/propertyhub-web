"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, BedDouble, Bath, DollarSign, Maximize, RotateCcw, SlidersHorizontal } from "lucide-react";
import { City, Area, PropertyType, PropertyFilters } from "@/lib/api";

interface Props {
  filters: PropertyFilters;
  cities: City[];
  areas: Area[];
  propertyTypes: PropertyType[];
}

export default function FiltersSidebar({ filters, cities, areas, propertyTypes }: Props) {
  const router = useRouter();
  const [f, setF] = useState(filters);

  const apply = () => {
    const p = new URLSearchParams();
    Object.entries(f).forEach(([k, v]) => { if (v && k !== "page") p.set(k, v); });
    router.push(`/properties?${p.toString()}`);
  };

  const reset = () => { setF({}); router.push("/properties"); };

  const cls = "w-full px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4 sticky top-24 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-emerald-600" /> Filters
        </h3>
        <button onClick={reset} className="text-xs font-semibold text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors">
          <RotateCcw className="h-3 w-3" /> Reset
        </button>
      </div>

      {/* Purpose */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Purpose</label>
        <div className="flex gap-1">
          {[{ v: "", l: "All" }, { v: "sale", l: "Buy" }, { v: "rent", l: "Rent" }].map(o => (
            <button key={o.v} onClick={() => setF({ ...f, purpose: o.v })}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${f.purpose === o.v ? "bg-emerald-600 text-white shadow-sm" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
              {o.l}
            </button>
          ))}
        </div>
      </div>

      {/* Keyword */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Keyword</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <input type="text" placeholder="Search..." value={f.keyword || ""} onChange={e => setF({ ...f, keyword: e.target.value })} className={cls + " pl-9"} />
        </div>
      </div>

      {/* City */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">City</label>
        <select value={f.city_id || ""} onChange={e => setF({ ...f, city_id: e.target.value, area_id: "" })} className={cls}>
          <option value="">All Cities</option>
          {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      {/* Area */}
      {areas.length > 0 && (
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Area</label>
          <select value={f.area_id || ""} onChange={e => setF({ ...f, area_id: e.target.value })} className={cls}>
            <option value="">All Areas</option>
            {areas.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      )}

      {/* Type */}
      <div>
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Property Type</label>
        <select value={f.type_id || ""} onChange={e => setF({ ...f, type_id: e.target.value })} className={cls}>
          <option value="">All Types</option>
          {propertyTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Bedrooms / Bathrooms */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Beds</label>
          <select value={f.bedrooms || ""} onChange={e => setF({ ...f, bedrooms: e.target.value })} className={cls}>
            <option value="">Any</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Baths</label>
          <select value={f.bathrooms || ""} onChange={e => setF({ ...f, bathrooms: e.target.value })} className={cls}>
            <option value="">Any</option>
            {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}+</option>)}
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Min Price</label>
          <input type="number" placeholder="0" value={f.min_price || ""} onChange={e => setF({ ...f, min_price: e.target.value })} className={cls} />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Max Price</label>
          <input type="number" placeholder="Any" value={f.max_price || ""} onChange={e => setF({ ...f, max_price: e.target.value })} className={cls} />
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={f.featured === "true"} onChange={e => setF({ ...f, featured: e.target.checked ? "true" : "" })}
          className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
        <span className="text-sm text-gray-700 font-medium">Featured Only</span>
      </label>

      {/* Apply */}
      <button onClick={apply}
        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 transition-all">
        Apply Filters
      </button>
    </div>
  );
}

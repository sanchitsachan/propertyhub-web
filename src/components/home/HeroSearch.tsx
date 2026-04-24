"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, IndianRupee, BedDouble, Building2, Star, Users, ShieldCheck } from "lucide-react";
import { City, PropertyType } from "@/lib/api";

export default function HeroSearch({ cities, propertyTypes }: { cities: City[]; propertyTypes: PropertyType[] }) {
  const router = useRouter();
  const [tab, setTab] = useState<"sale" | "rent">("sale");
  const [form, setForm] = useState({ city_id: "", type_id: "", min_price: "", bedrooms: "", keyword: "" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("purpose", tab);
    Object.entries(form).forEach(([k, v]) => { if (v) params.set(k, v); });
    router.push(`/properties?${params.toString()}`);
  };

  const sel = "w-full pl-9 pr-3 py-3.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all appearance-none cursor-pointer";

  return (
    <section className="relative min-h-[620px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Real background image */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
        alt="Luxury property"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Trust bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Verified Listings
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <Star className="h-3.5 w-3.5 text-amber-400" /> 4.8 Rating
            </span>
            <span className="h-3 w-px bg-white/20" />
            <span className="flex items-center gap-1.5 text-xs text-white/80 font-medium">
              <Users className="h-3.5 w-3.5 text-blue-400" /> 5K+ Happy Clients
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-white leading-[1.15] tracking-tight">
            Find Your Dream Home
            <span className="block text-emerald-400 mt-1">In India&apos;s Top Cities</span>
          </h1>
          <p className="mt-4 text-base lg:text-lg text-white/60 max-w-xl mx-auto">
            Search from 10,000+ verified properties for sale and rent across Mumbai, Bangalore, Delhi &amp; more
          </p>
        </div>

        {/* Search Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl shadow-black/30 overflow-hidden">
            {/* Tabs */}
            <div className="flex">
              {(["sale", "rent"] as const).map(t => (
                <button key={t} onClick={() => setTab(t)}
                  className={`flex-1 py-4 text-sm font-bold transition-all relative ${
                    tab === t ? "text-emerald-600 bg-white" : "text-gray-500 bg-gray-50 hover:text-gray-700 hover:bg-gray-100/50"
                  }`}>
                  {t === "sale" ? "Buy" : "Rent"}
                  {tab === t && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSearch} className="p-5 lg:p-6">
              {/* Keyword */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Search by city, locality, project or landmark..."
                  value={form.keyword} onChange={e => setForm({ ...form, keyword: e.target.value })}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:bg-white transition-all" />
              </div>

              {/* Filters grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select value={form.city_id} onChange={e => setForm({ ...form, city_id: e.target.value })} className={sel}>
                    <option value="">All Cities</option>
                    {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select value={form.type_id} onChange={e => setForm({ ...form, type_id: e.target.value })} className={sel}>
                    <option value="">Property Type</option>
                    {propertyTypes.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select value={form.min_price} onChange={e => setForm({ ...form, min_price: e.target.value })} className={sel}>
                    <option value="">Budget</option>
                    {[500000, 1000000, 2500000, 5000000, 10000000, 50000000].map(p => (
                      <option key={p} value={p}>{p >= 10000000 ? `₹${(p/10000000).toFixed(0)} Cr` : `₹${(p/100000).toFixed(0)} Lac`}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <select value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })} className={sel}>
                    <option value="">Bedrooms</option>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} BHK</option>)}
                  </select>
                </div>
              </div>

              <button type="submit"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 transition-all duration-200 flex items-center justify-center gap-2">
                <Search className="h-4.5 w-4.5" /> Search Properties
              </button>
            </form>
          </div>

          {/* Bottom stats */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {[
              { val: "10,000+", label: "Properties" },
              { val: "500+", label: "Agents" },
              { val: "6", label: "Cities" },
              { val: "98%", label: "Satisfaction" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-[11px] text-white/50 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

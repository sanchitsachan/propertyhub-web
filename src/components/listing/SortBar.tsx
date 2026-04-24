"use client";
import { useRouter } from "next/navigation";
import { ArrowUpDown, LayoutGrid, List } from "lucide-react";
import { PropertyFilters } from "@/lib/api";

export default function SortBar({ total, filters }: { total: number; filters: PropertyFilters }) {
  const router = useRouter();
  const handleSort = (sort: string) => {
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v && k !== "sort" && k !== "page") p.set(k, v); });
    p.set("sort", sort);
    router.push(`/properties?${p.toString()}`);
  };

  return (
    <div className="flex items-center justify-between bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm">
      <p className="text-sm text-gray-600">
        <strong className="text-gray-900">{total}</strong> properties found
      </p>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
          <select value={filters.sort || "newest"} onChange={e => handleSort(e.target.value)}
            className="text-sm font-semibold text-gray-700 bg-transparent border-0 focus:outline-none cursor-pointer pr-6">
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low → High</option>
            <option value="price_high">Price: High → Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

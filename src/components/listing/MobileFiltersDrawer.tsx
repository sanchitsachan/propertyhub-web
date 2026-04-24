"use client";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import FiltersSidebar from "./FiltersSidebar";
import { City, Area, PropertyType, PropertyFilters } from "@/lib/api";

interface Props {
  filters: PropertyFilters;
  cities: City[];
  areas: Area[];
  propertyTypes: PropertyType[];
}

export default function MobileFiltersDrawer({ filters, cities, areas, propertyTypes }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
        <SlidersHorizontal className="h-4 w-4" /> Filters
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">Filters</h3>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4" onClick={() => setOpen(false)}>
              <FiltersSidebar filters={filters} cities={cities} areas={areas} propertyTypes={propertyTypes} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

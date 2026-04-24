"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { City, Area, PropertyType, PropertyFilters as Filters } from "@/lib/api";

export default function PropertyFilters({
  filters,
  cities,
  areas,
  propertyTypes,
}: {
  filters: Filters;
  cities: City[];
  areas: Area[];
  propertyTypes: PropertyType[];
}) {
  const router = useRouter();
  const [form, setForm] = useState(filters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    Object.entries(form).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    router.push(`/properties?${params.toString()}`);
  };

  const handleReset = () => {
    setForm({});
    router.push("/properties");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4 sticky top-20">
      <h3 className="font-semibold text-gray-900">Filters</h3>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Keyword</label>
        <input
          type="text"
          value={form.keyword || ""}
          onChange={(e) => setForm({ ...form, keyword: e.target.value })}
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Purpose</label>
        <select
          value={form.purpose || ""}
          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          <option value="sale">For Sale</option>
          <option value="rent">For Rent</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Property Type</label>
        <select
          value={form.type_id || ""}
          onChange={(e) => setForm({ ...form, type_id: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          {propertyTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">City</label>
        <select
          value={form.city_id || ""}
          onChange={(e) => setForm({ ...form, city_id: e.target.value, area_id: "" })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="">Any</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      {areas.length > 0 && (
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Area</label>
          <select
            value={form.area_id || ""}
            onChange={(e) => setForm({ ...form, area_id: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>{area.name}</option>
            ))}
          </select>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Min Price</label>
          <input
            type="number"
            value={form.min_price || ""}
            onChange={(e) => setForm({ ...form, min_price: e.target.value })}
            placeholder="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Max Price</label>
          <input
            type="number"
            value={form.max_price || ""}
            onChange={(e) => setForm({ ...form, max_price: e.target.value })}
            placeholder="Any"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Bedrooms</label>
          <select
            value={form.bedrooms || ""}
            onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">Bathrooms</label>
          <select
            value={form.bathrooms || ""}
            onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}+</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

"use client";

import { useRouter } from "next/navigation";

export default function SortDropdown({
  currentSort,
  filters,
}: {
  currentSort: string;
  filters: Record<string, string | undefined>;
}) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v && k !== "sort" && k !== "page") params.set(k, v);
    });
    params.set("sort", e.target.value);
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <select
      defaultValue={currentSort}
      onChange={handleChange}
      className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
    >
      <option value="newest">Newest First</option>
      <option value="price_low">Price: Low to High</option>
      <option value="price_high">Price: High to Low</option>
    </select>
  );
}

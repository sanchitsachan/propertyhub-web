import { Metadata } from "next";
import { Home, ChevronRight, SearchX } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import FiltersSidebar from "@/components/listing/FiltersSidebar";
import MobileFiltersDrawer from "@/components/listing/MobileFiltersDrawer";
import SortBar from "@/components/listing/SortBar";
import Pagination from "@/components/listing/Pagination";
import { getProperties, getCities, getAreas, getPropertyTypes, PropertyFilters as Filters } from "@/lib/api";

export const metadata: Metadata = {
  title: "Browse Properties",
  description: "Find the best properties for sale and rent. Filter by city, price, bedrooms and more.",
};

export default async function PropertiesPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const filters: Filters = {
    purpose: params.purpose || "", city_id: params.city_id || "", area_id: params.area_id || "",
    type_id: params.type_id || "", min_price: params.min_price || "", max_price: params.max_price || "",
    bedrooms: params.bedrooms || "", bathrooms: params.bathrooms || "", keyword: params.keyword || "",
    sort: params.sort || "newest", featured: params.featured || "", page: params.page || "1",
  };

  let properties, cities, areas, propertyTypes;
  try {
    [properties, cities, areas, propertyTypes] = await Promise.all([
      getProperties(filters), getCities(), getAreas(filters.city_id), getPropertyTypes(),
    ]);
  } catch {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Unable to load properties.</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <nav className="flex items-center gap-1.5 text-emerald-200 text-xs mb-3">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-medium">Properties</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Browse Properties</h1>
          <p className="text-sm text-emerald-200 mt-1">Find the best listings available for sale and rent</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-72 shrink-0">
            <FiltersSidebar filters={filters} cities={cities} areas={areas} propertyTypes={propertyTypes} />
          </div>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {/* Mobile filter + Sort bar */}
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <MobileFiltersDrawer filters={filters} cities={cities} areas={areas} propertyTypes={propertyTypes} />
            </div>
            <div className="mb-5">
              <SortBar total={properties.total} filters={filters} />
            </div>

            {/* Grid */}
            {properties.data.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {properties.data.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                <SearchX className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-base font-bold text-gray-900 mb-1">No properties match your filters</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search criteria</p>
                <Link href="/properties" className="inline-flex px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">
                  Reset Filters
                </Link>
              </div>
            )}

            <Pagination links={properties.links} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}

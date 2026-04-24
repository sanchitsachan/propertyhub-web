import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, BedDouble, Bath, Maximize, MapPin, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import { compareProperties, formatPrice, getImageUrl, Property } from "@/lib/api";

export const metadata: Metadata = { title: "Compare Properties", description: "Compare properties side by side to find the best match." };

export default async function ComparePage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams;
  const ids = params.ids?.split(",").map(Number).filter(Boolean) || [];

  let properties: Property[] = [];
  if (ids.length >= 2) {
    try { properties = await compareProperties(ids); } catch {}
  }

  if (properties.length < 2) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Compare Properties</h1>
          <p className="text-sm text-gray-500 mb-6">Select 2-3 properties from the listing page to compare them side by side.</p>
          <Link href="/properties" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Browse Properties
          </Link>
        </div>
      </div>
    );
  }

  const rows: { label: string; key: string; render?: (p: Property) => React.ReactNode }[] = [
    { label: "Price", key: "price", render: p => <span className="text-lg font-extrabold text-emerald-600">{formatPrice(p.price, p.purpose)}</span> },
    { label: "Purpose", key: "purpose", render: p => <span className="capitalize">{p.purpose}</span> },
    { label: "Type", key: "type", render: p => p.type?.name || "—" },
    { label: "City", key: "city", render: p => p.city?.name || "—" },
    { label: "Area", key: "area", render: p => p.area?.name || "—" },
    { label: "Bedrooms", key: "bedrooms", render: p => <span className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-gray-400" /> {p.bedrooms}</span> },
    { label: "Bathrooms", key: "bathrooms", render: p => <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-gray-400" /> {p.bathrooms}</span> },
    { label: "Size", key: "size", render: p => <span className="flex items-center gap-1"><Maximize className="h-4 w-4 text-gray-400" /> {p.size_sqft?.toLocaleString() || "—"} sqft</span> },
    { label: "Price/sqft", key: "psf", render: p => p.size_sqft ? `₹${Math.round(p.price / p.size_sqft).toLocaleString('en-IN')}` : "—" },
    { label: "Status", key: "status", render: p => <span className="capitalize">{p.status}</span> },
    { label: "Featured", key: "featured", render: p => p.featured ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-gray-300" /> },
    { label: "Address", key: "address", render: p => p.address || "—" },
    { label: "Agent", key: "agent", render: p => p.agent?.name || "—" },
  ];

  // Collect all amenities across all properties
  const allAmenities = [...new Set(properties.flatMap(p => p.amenities?.map(a => a.name) || []))].sort();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-emerald-600 flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/properties" className="hover:text-emerald-600">Properties</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium">Compare</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Compare Properties ({properties.length})</h1>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden overflow-x-auto">
          <table className="min-w-full">
            {/* Header with images */}
            <thead>
              <tr>
                <th className="w-40 px-4 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase sticky left-0 z-10">Feature</th>
                {properties.map(p => (
                  <th key={p.id} className="px-4 py-4 bg-gray-50 min-w-[240px]">
                    <Link href={`/properties/${p.slug}`} className="group block">
                      <div className="h-36 rounded-xl overflow-hidden bg-gray-100 mb-3">
                        {p.images?.[0] && <img src={getImageUrl(p.images[0].image_url)} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 text-left line-clamp-2 group-hover:text-emerald-600 transition-colors">{p.title}</h3>
                      <p className="text-xs text-gray-500 text-left mt-1 flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.city?.name}{p.area ? `, ${p.area.name}` : ""}</p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((row, i) => (
                <tr key={row.key} className={i % 2 === 0 ? "" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-500 sticky left-0 bg-white z-10">{row.label}</td>
                  {properties.map(p => (
                    <td key={p.id} className="px-4 py-3 text-sm text-gray-900">{row.render ? row.render(p) : "—"}</td>
                  ))}
                </tr>
              ))}

              {/* Amenities comparison */}
              {allAmenities.length > 0 && (
                <>
                  <tr className="bg-emerald-50/50"><td colSpan={properties.length + 1} className="px-4 py-2 text-xs font-bold text-emerald-700 uppercase">Amenities</td></tr>
                  {allAmenities.map(amenity => (
                    <tr key={amenity}>
                      <td className="px-4 py-2 text-xs text-gray-500 sticky left-0 bg-white z-10">{amenity}</td>
                      {properties.map(p => (
                        <td key={p.id} className="px-4 py-2">
                          {p.amenities?.some(a => a.name === amenity)
                            ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            : <XCircle className="h-4 w-4 text-gray-200" />
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

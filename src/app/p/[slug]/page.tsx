import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight, MapPin, Building2, ArrowRight } from "lucide-react";
import { getSeoPage, getProperties, PropertyFilters } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const page = await getSeoPage(slug);
    return {
      title: page.meta_title,
      description: page.meta_description,
      keywords: page.meta_keywords || undefined,
      openGraph: { title: page.meta_title, description: page.meta_description, images: page.og_image ? [page.og_image] : [] },
      ...(page.canonical_url ? { alternates: { canonical: page.canonical_url } } : {}),
    };
  } catch { return { title: "Page Not Found" }; }
}

export default async function SeoLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let page;
  try { page = await getSeoPage(slug); } catch { notFound(); }

  // Build property filters from the SEO page targeting
  const filters: PropertyFilters = {};
  if (page.city_id) filters.city_id = String(page.city_id);
  if (page.area_id) filters.area_id = String(page.area_id);
  if (page.type_id) filters.type_id = String(page.type_id);
  if (page.purpose) filters.purpose = page.purpose;

  let properties;
  try { properties = await getProperties({ ...filters, page: "1" }); } catch { properties = { data: [], total: 0 }; }

  // Build the "View All" link
  const viewAllParams = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => { if (v) viewAllParams.set(k, v); });
  const viewAllUrl = `/properties?${viewAllParams.toString()}`;

  const jsonLd = {
    "@context": "https://schema.org", "@type": "WebPage",
    name: page.meta_title, description: page.meta_description,
    url: page.canonical_url || undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
            <nav className="flex items-center gap-1.5 text-emerald-200 text-xs mb-3">
              <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/properties" className="hover:text-white">Properties</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white font-medium">{page.title}</span>
            </nav>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">{page.h1_heading}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {page.city && <span className="flex items-center gap-1 text-emerald-200 text-sm"><MapPin className="h-3.5 w-3.5" /> {page.city.name}</span>}
              {page.area && <span className="text-emerald-200 text-sm">· {page.area.name}</span>}
              {page.type && <span className="flex items-center gap-1 text-emerald-200 text-sm"><Building2 className="h-3.5 w-3.5" /> {page.type.name}</span>}
              {page.purpose && <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/20 text-white">{page.purpose === 'sale' ? 'Buy' : 'Rent'}</span>}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* SEO Content */}
          {page.content && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm mb-8">
              <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-gray-900 [&>p]:mb-3"
                dangerouslySetInnerHTML={{ __html: page.content }} />
            </div>
          )}

          {/* Properties */}
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Properties {page.purpose === 'sale' ? 'for Sale' : page.purpose === 'rent' ? 'for Rent' : ''} {page.city ? `in ${page.city.name}` : ''}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{properties.total || 0} properties found</p>
            </div>
            <Link href={viewAllUrl} className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {properties.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {properties.data.slice(0, 12).map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
              <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-sm text-gray-500">No properties found for this filter.</p>
              <Link href="/properties" className="inline-flex mt-4 px-5 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors">Browse All</Link>
            </div>
          )}

          {/* View all link mobile */}
          <div className="mt-6 text-center sm:hidden">
            <Link href={viewAllUrl} className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700">
              View All Properties <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Keywords for SEO */}
          {page.target_keywords && (
            <div className="mt-8 flex flex-wrap gap-2">
              {page.target_keywords.split(',').map(kw => (
                <span key={kw.trim()} className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600 font-medium">{kw.trim()}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

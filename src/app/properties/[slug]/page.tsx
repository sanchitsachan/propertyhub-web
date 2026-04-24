import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight, BedDouble, Bath, Maximize, Building2, MapPin, Calendar, Tag, CheckCircle2, Share2, Heart, Printer, ArrowRight, Shield, Zap, Clock } from "lucide-react";
import { getProperty, getProperties, formatPrice, getImageUrl } from "@/lib/api";
import PropertyGallery from "@/components/detail/PropertyGallery";
import AgentContactCard from "@/components/detail/AgentContactCard";
import StickyMobileContactBar from "@/components/detail/StickyMobileContactBar";
import PropertyCard from "@/components/PropertyCard";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const p = await getProperty(slug);
    return { title: p.meta_title || p.title, description: p.meta_description || p.title, openGraph: { title: p.meta_title || p.title, images: p.images?.[0] ? [getImageUrl(p.images[0].image_url)] : [] } };
  } catch { return { title: "Property Not Found" }; }
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let property;
  try { property = await getProperty(slug); } catch { notFound(); }

  let similar;
  try { similar = await getProperties({ city_id: String(property.city_id), type_id: String(property.type_id), page: "1" }); } catch { similar = { data: [] }; }
  const similarProps = similar.data.filter(p => p.id !== property.id).slice(0, 4);

  const jsonLd = { "@context": "https://schema.org", "@type": "RealEstateListing", name: property.title, description: property.description?.replace(/<[^>]*>/g, ""), offers: { "@type": "Offer", price: property.price, priceCurrency: "INR" } };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-gray-50 min-h-screen pb-20 lg:pb-0">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex items-center gap-1.5 text-xs text-gray-500">
              <Link href="/" className="hover:text-emerald-600 flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/properties" className="hover:text-emerald-600">Properties</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-gray-900 font-medium truncate max-w-[250px]">{property.title}</span>
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Gallery */}
          <PropertyGallery images={property.images} title={property.title} />

          {/* ===== TITLE + PRICE + HIGHLIGHTS ===== */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Title row */}
            <div className="p-5 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg ${property.purpose === "sale" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
                      For {property.purpose === "sale" ? "Sale" : "Rent"}
                    </span>
                    {property.featured && <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-amber-100 text-amber-700">Featured</span>}
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-gray-100 text-gray-600 capitalize">{property.status}</span>
                    <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-50 text-emerald-600"><Shield className="h-3 w-3" /> Verified</span>
                  </div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{property.title}</h1>
                  <p className="text-sm text-gray-500 mt-1.5 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-gray-400" /> {property.city?.name}{property.area ? `, ${property.area.name}` : ""}{property.address ? ` — ${property.address}` : ""}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-2xl lg:text-3xl font-extrabold text-emerald-600">{formatPrice(property.price, property.purpose)}</p>
                  {property.size_sqft > 0 && (
                    <p className="text-xs text-gray-400 mt-1">₹{Math.round(property.price / property.size_sqft).toLocaleString('en-IN')}/sqft</p>
                  )}
                </div>
              </div>
            </div>

            {/* Highlights bar */}
            <div className="border-t border-gray-100 bg-gray-50/50 px-5 lg:px-6 py-4">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {[
                  { icon: <BedDouble className="h-4 w-4" />, val: property.bedrooms || "—", label: "Beds" },
                  { icon: <Bath className="h-4 w-4" />, val: property.bathrooms || "—", label: "Baths" },
                  { icon: <Maximize className="h-4 w-4" />, val: property.size_sqft ? `${property.size_sqft.toLocaleString()}` : "—", label: "Sqft" },
                  { icon: <Building2 className="h-4 w-4" />, val: property.type?.name || "—", label: "Type" },
                  { icon: <Calendar className="h-4 w-4" />, val: new Date(property.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), label: "Listed" },
                ].map(h => (
                  <div key={h.label} className="flex items-center gap-2">
                    <span className="text-gray-400">{h.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900 leading-none">{String(h.val)}</p>
                      <p className="text-[10px] text-gray-400">{h.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ===== LEFT COLUMN ===== */}
            <div className="lg:col-span-2 space-y-5">

              {/* Description */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-1 w-5 rounded-full bg-emerald-500" /> Description
                </h2>
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&>p]:mb-3" dangerouslySetInnerHTML={{ __html: property.description || "No description available." }} />
              </div>

              {/* Amenities — pill grid */}
              {property.amenities?.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <div className="h-1 w-5 rounded-full bg-emerald-500" /> Amenities & Features
                  </h2>
                  <div className="flex flex-wrap gap-2.5">
                    {property.amenities.map(a => (
                      <div key={a.id} className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all cursor-default">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" /> {a.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Details — modern table */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <div className="h-1 w-5 rounded-full bg-emerald-500" /> Property Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {([
                    ["Property ID", `#${property.id}`], ["Type", property.type?.name], ["Purpose", property.purpose === "sale" ? "Sale" : "Rent"],
                    ["Price", formatPrice(property.price, property.purpose)], ["Bedrooms", property.bedrooms], ["Bathrooms", property.bathrooms],
                    ["Size", property.size_sqft ? `${property.size_sqft.toLocaleString()} sqft` : "—"], ["City", property.city?.name],
                    ["Area", property.area?.name || "—"], ["Address", property.address || "—"], ["Status", property.status], ["Agent", property.agent?.name],
                  ] as [string, string | number | undefined][]).map(([label, value], i) => (
                    <div key={label} className={`flex items-center justify-between py-3.5 px-4 ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'} ${i < 10 ? 'border-b border-gray-100' : ''}`}>
                      <span className="text-sm text-gray-500">{label}</span>
                      <span className="text-sm font-semibold text-gray-900">{String(value || "—")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              {property.latitude && property.longitude && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-6 pb-0">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <div className="h-1 w-5 rounded-full bg-emerald-500" /> Location
                    </h2>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="rounded-xl overflow-hidden border border-gray-100">
                      <iframe width="100%" height="320" style={{ border: 0 }} loading="lazy"
                        src={`https://www.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`} />
                    </div>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {property.address || `${property.city?.name}${property.area ? `, ${property.area.name}` : ''}`}
                    </div>
                  </div>
                </div>
              )}

              {/* Trust badges */}
              <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5">
                <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
                  {[
                    { icon: <Shield className="h-4 w-4" />, text: "Verified Listing" },
                    { icon: <Zap className="h-4 w-4" />, text: "Instant Response" },
                    { icon: <Clock className="h-4 w-4" />, text: "24/7 Support" },
                  ].map(b => (
                    <div key={b.text} className="flex items-center gap-2 text-emerald-700">
                      {b.icon}
                      <span className="text-xs font-semibold">{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ===== RIGHT SIDEBAR ===== */}
            <div id="inquiry">
              {property.agent && <AgentContactCard agent={property.agent} propertyId={property.id} />}
            </div>
          </div>

          {/* ===== SIMILAR PROPERTIES ===== */}
          {similarProps.length > 0 && (
            <div className="mt-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Similar Properties</h2>
                  <p className="text-sm text-gray-500 mt-0.5">You might also be interested in</p>
                </div>
                <Link href={`/properties?city_id=${property.city_id}`} className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">
                  View More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {similarProps.map(p => <PropertyCard key={p.id} property={p} />)}
              </div>
            </div>
          )}
        </div>

        <StickyMobileContactBar phone={property.agent?.phone} propertyId={property.id} />
      </div>
    </>
  );
}

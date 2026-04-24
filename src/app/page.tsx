import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, BadgeDollarSign, HeadphonesIcon, Building2, Home, Warehouse, LandPlot, Store, Building } from "lucide-react";
import { getProperties, getCities, getPropertyTypes, getAgents, getBlogPosts, BlogPost, Property, City, PropertyType, Agent } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";
import HeroSearch from "@/components/home/HeroSearch";
import LocationCard from "@/components/home/LocationCard";
import TestimonialSlider from "@/components/home/TestimonialSlider";

export default async function HomePage() {
  let featured: { data: Property[]; total: number }, latest: { data: Property[]; total: number };
  let cities: City[], types: PropertyType[], agents: Agent[], blogPosts: BlogPost[];

  try {
    const [f, l, c, t, a] = await Promise.all([
      getProperties({ featured: "true", page: "1" }),
      getProperties({ sort: "newest", page: "1" }),
      getCities(),
      getPropertyTypes(),
      getAgents(),
    ]);
    featured = f; latest = l; cities = c; types = t; agents = a;
  } catch {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Unable to connect to API. Ensure Laravel is running on port 8000.</div>;
  }

  // Fetch blog posts
  try {
    const res = await getBlogPosts({ limit: "3" });
    blogPosts = Array.isArray(res) ? res : (res as any).data || [];
  } catch { blogPosts = []; }

  // Dynamic stats from real data
  const totalProperties = latest.total || 0;
  const totalAgents = agents.length || 0;
  const totalCities = cities.length || 0;

  const typeIcons: Record<string, React.ReactNode> = {
    Apartment: <Building2 className="h-6 w-6" />, Villa: <Home className="h-6 w-6" />,
    Townhouse: <Building className="h-6 w-6" />, Penthouse: <Building2 className="h-6 w-6" />,
    Studio: <Home className="h-6 w-6" />, Office: <Building className="h-6 w-6" />,
    Shop: <Store className="h-6 w-6" />, Warehouse: <Warehouse className="h-6 w-6" />,
    Land: <LandPlot className="h-6 w-6" />,
  };

  const blogImages = [
    "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80",
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  ];

  return (
    <>
      {/* S1 — HERO + SEARCH */}
      <HeroSearch cities={cities} propertyTypes={types} />

      {/* S3 — POPULAR LOCATIONS */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead title="Popular Destinations" sub="We have selected some best locations around India for you" link="/properties" linkText="All Locations" />
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[220px] lg:auto-rows-[240px]">
            {cities.slice(0, 2).map((city, i) => (
              <div key={city.id} className="lg:col-span-2 lg:row-span-1">
                <LocationCard city={city} index={i} size="large" />
              </div>
            ))}
            {cities.slice(2, 6).map((city, i) => (
              <div key={city.id} className="col-span-1">
                <LocationCard city={city} index={i + 2} size="normal" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* S4 — FEATURED PROPERTIES */}
      {featured.data.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead title="Featured Properties" sub="Handpicked premium listings" link="/properties?featured=true" linkText="View All" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.data.slice(0, 6).map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* S5 — BROWSE BY PROPERTY TYPE */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead title="Browse by Property Type" sub="Find exactly what you are looking for" />
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {(() => {
              const typeImages: Record<string, string> = {
                Apartment: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80',
                Villa: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
                Townhouse: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80',
                Penthouse: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80',
                Studio: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
                Office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
                Shop: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80',
                Warehouse: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
                Land: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80',
              };
              return types.map(t => (
                <Link key={t.id} href={`/properties?type_id=${t.id}`}
                  className="group relative h-44 sm:h-48 rounded-2xl overflow-hidden">
                  <img src={typeImages[t.name] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80'}
                    alt={t.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/60 transition-all" />
                  <div className="relative h-full flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">{t.name}</h3>
                        <p className="text-[11px] text-white/70 mt-0.5">{t.properties_count || 0} properties</p>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* S6 — WHY CHOOSE US — Split layout */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">Why PropertyHub</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug">The smarter way to<br />find your perfect home</h2>
              <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-md">We combine technology with human expertise to make your property journey seamless, transparent, and rewarding.</p>
              <div className="mt-8 grid grid-cols-2 gap-5">
                {[
                  { icon: <ShieldCheck className="h-5 w-5" />, title: "Verified Listings", desc: "Every property inspected and verified by our team" },
                  { icon: <Users className="h-5 w-5" />, title: "Trusted Agents", desc: `${totalAgents}+ licensed professionals at your service` },
                  { icon: <BadgeDollarSign className="h-5 w-5" />, title: "Best Prices", desc: "No hidden fees, transparent pricing always" },
                  { icon: <HeadphonesIcon className="h-5 w-5" />, title: "24/7 Support", desc: "Dedicated team available around the clock" },
                ].map(item => (
                  <div key={item.title} className="flex gap-3">
                    <div className="h-10 w-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">{item.icon}</div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-300/30">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" alt="Property" className="w-full h-72 lg:h-80 object-cover" />
              </div>
              {/* Floating stats card — dynamic */}
              <div className="absolute -bottom-6 left-4 right-4 sm:left-6 sm:right-6 bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-5">
                <div className="grid grid-cols-4 gap-4 text-center">
                  {[
                    { val: `${totalProperties}+`, label: "Properties" },
                    { val: `${totalAgents}+`, label: "Agents" },
                    { val: `${totalCities}`, label: "Cities" },
                    { val: "98%", label: "Satisfaction" },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-lg sm:text-xl font-extrabold text-emerald-600">{s.val}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5 font-medium">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S7 — LATEST PROPERTIES */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead title="Latest Properties" sub="Recently added to our platform" link="/properties" linkText="View All Properties" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {latest.data.slice(0, 8).map(p => <PropertyCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* S8 — CTA */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-auto">
            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80" alt="List your property" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-emerald-900/30" />
          </div>
          <div className="bg-[#0f2537] px-8 py-14 lg:px-16 lg:py-20 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/8 rounded-full blur-[100px]" />
            <div className="relative">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">For Property Owners</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">Want to Sell or Rent<br />Your Property Fast?</h2>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-md">List your property on PropertyHub and reach thousands of verified buyers and tenants. Free listing, premium visibility.</p>
              <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Free Listing</span>
                <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-emerald-400" /> {totalProperties}+ Buyers</span>
                <span className="flex items-center gap-1.5"><HeadphonesIcon className="h-4 w-4 text-emerald-400" /> Dedicated Support</span>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all">List Your Property — It&apos;s Free</Link>
                <Link href="/contact" className="px-7 py-3.5 rounded-xl border border-gray-700 text-gray-300 text-sm font-bold hover:bg-gray-800 transition-all">Talk to Expert</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S9 — TOP AGENTS — hidden for now */}
      {false && agents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead title="Meet Our Top Agents" sub="Experienced professionals ready to help you" link="/agents" linkText="View All Agents" />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {agents.slice(0, 4).map((agent, i) => {
                const gradients = ['from-blue-500 to-indigo-600', 'from-emerald-500 to-teal-600', 'from-violet-500 to-purple-600', 'from-rose-500 to-pink-600'];
                return (
                  <Link key={agent.id} href={`/agents/${agent.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300">
                    <div className={`h-24 bg-gradient-to-r ${gradients[i % 4]} relative`}>
                      <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
                        <div className="h-14 w-14 rounded-2xl bg-white p-1 shadow-lg">
                          <div className="h-full w-full rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 font-bold text-lg">{agent.name.charAt(0)}</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-10 pb-5 px-5 text-center">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{agent.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">Property Consultant</p>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-center gap-4 text-[11px] text-gray-500">
                        <span><strong className="text-gray-900">{agent.properties_count || 0}</strong> Listings</span>
                        <span className="h-3 w-px bg-gray-200" />
                        <span>{agent.phone}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* S10 — TESTIMONIALS */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead title="What Our Clients Say" sub="Real stories from real clients" />
          <div className="mt-8">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* S11 — BLOG — Dynamic from API */}
      {blogPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHead title="Latest from Our Blog" sub="Market insights, tips, and property guides" link="/blog" linkText="All Articles" />
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Featured post */}
              <div className="lg:col-span-3">
                <Link href={`/blog/${blogPosts[0].slug}`} className="group relative h-72 sm:h-80 lg:h-full rounded-2xl overflow-hidden block">
                  <img src={blogImages[0]} alt={blogPosts[0].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
                    <span className="inline-block w-fit px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider mb-3">{blogPosts[0].category}</span>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug max-w-md">{blogPosts[0].title}</h3>
                    <p className="text-sm text-white/70 mt-2 max-w-sm line-clamp-2">{blogPosts[0].excerpt}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 group-hover:text-emerald-200 transition-colors">
                      Read Article <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </div>
              {/* Side posts */}
              <div className="lg:col-span-2 flex flex-col gap-5">
                {blogPosts.slice(1, 3).map((post, i) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group flex gap-4 bg-gray-50 rounded-2xl p-4 hover:bg-white hover:shadow-lg hover:border hover:border-gray-100 transition-all duration-200">
                    <div className="h-24 w-28 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                      <img src={blogImages[(i + 1) % blogImages.length]} alt={post.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-50 text-emerald-700">{post.category}</span>
                        <span className="text-[10px] text-gray-400">{new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                      <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function SectionHead({ title, sub, link, linkText, center }: { title: string; sub?: string; link?: string; linkText?: string; center?: boolean }) {
  return (
    <div className={`flex items-end justify-between ${center ? "flex-col items-center text-center" : ""}`}>
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
        {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
      </div>
      {link && (
        <Link href={link} className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800 shrink-0 transition-colors">
          {linkText || "View All"} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

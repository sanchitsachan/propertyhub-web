export const dynamic = "force-dynamic";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Users,
  BadgeDollarSign,
  HeadphonesIcon,
  Building2,
  Home,
  Warehouse,
  LandPlot,
  Store,
  Building,
} from "lucide-react";

import {
  getProperties,
  getCities,
  getPropertyTypes,
  getAgents,
  getBlogPosts,
  BlogPost,
  Property,
  City,
  PropertyType,
  Agent,
} from "@/lib/api";

import PropertyCard from "@/components/PropertyCard";
import HeroSearch from "@/components/home/HeroSearch";
import LocationCard from "@/components/home/LocationCard";
import TestimonialSlider from "@/components/home/TestimonialSlider";

export default async function HomePage() {
  let featured = { data: [] as Property[], total: 0 };
  let latest = { data: [] as Property[], total: 0 };
  let cities: City[] = [];
  let types: PropertyType[] = [];
  let agents: Agent[] = [];
  let blogPosts: BlogPost[] = [];

  try {
    const [f, l, c, t, a] = await Promise.all([
      getProperties({ featured: "true", page: "1" }),
      getProperties({ sort: "newest", page: "1" }),
      getCities(),
      getPropertyTypes(),
      getAgents(),
    ]);

    featured = f || featured;
    latest = l || latest;
    cities = c || [];
    types = t || [];
    agents = a || [];
  } catch (e) {
    console.error("API error:", e);
  }

  try {
    const res = await getBlogPosts({ limit: "3" });
    blogPosts = Array.isArray(res) ? res : res?.data || [];
  } catch (e) {
    console.error("Blog error:", e);
  }

  const totalProperties = latest?.total || 0;
  const totalAgents = agents?.length || 0;
  const totalCities = cities?.length || 0;

  const mainPost = blogPosts?.[0];

  try {
    return (
      <>
        {/* HERO */}
        <HeroSearch cities={cities || []} propertyTypes={types || []} />

        {/* LOCATIONS */}
        {cities?.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cities.slice(0, 6).map((city, i) => (
                  <LocationCard key={city.id} city={city} index={i} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FEATURED */}
        {featured?.data?.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.data.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        {/* TYPES */}
        {types?.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {types.map((t) => (
                <Link key={t.id} href={`/properties?type_id=${t.id}`}>
                  <div className="p-4 border rounded-xl text-center">
                    {t.name}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* LATEST */}
        {latest?.data?.length > 0 && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {latest.data.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}

        {/* STATS */}
        <section className="py-16 bg-gray-50 text-center">
          <h2 className="text-2xl font-bold">Stats</h2>
          <p>{totalProperties}+ Properties</p>
          <p>{totalAgents}+ Agents</p>
          <p>{totalCities} Cities</p>
        </section>

        {/* BLOG */}
        {mainPost && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <Link href={`/blog/${mainPost.slug}`}>
                <h2 className="text-xl font-bold">{mainPost.title}</h2>
              </Link>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {blogPosts.slice(1).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`}>
                    <div className="p-4 border rounded-lg">
                      {post.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TESTIMONIAL */}
        <TestimonialSlider />
      </>
    );
  } catch (err) {
    console.error("Render crash:", err);
    return <h1>Something broke ❌</h1>;
  }
}
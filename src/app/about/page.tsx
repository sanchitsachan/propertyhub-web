import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, ShieldCheck, Handshake, Eye, Target, Building2, Users, MapPin, HeadphonesIcon, BadgeDollarSign, ArrowRight, TrendingUp, Award } from "lucide-react";
import { getAgents, Agent } from "@/lib/api";

export const metadata: Metadata = { title: "About Us", description: "Learn about PropertyHub — India's trusted platform for buying and renting properties." };

export default async function AboutPage() {
  let agents: Agent[] = [];
  try { agents = await getAgents(); } catch { agents = []; }

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
          <nav className="flex items-center justify-center gap-1.5 text-emerald-200 text-xs mb-4">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" /> <span className="text-white font-medium">About</span>
          </nav>
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white">About PropertyHub</h1>
          <p className="mt-3 text-emerald-200 max-w-xl mx-auto">India&apos;s trusted platform for buying, renting, and investing in premium properties.</p>
        </div>
      </section>

      {/* STORY — Image + Text */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" alt="About PropertyHub" className="w-full h-72 lg:h-96 object-cover" />
              </div>
              <div className="absolute -bottom-5 -right-3 lg:-right-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"><Award className="h-6 w-6" /></div>
                  <div><p className="text-lg font-extrabold text-gray-900">10+</p><p className="text-[11px] text-gray-500">Years of Trust</p></div>
                </div>
              </div>
            </div>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">Our Story</span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-5">We&apos;re making property search simple &amp; transparent</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">PropertyHub was founded with a simple mission: to make finding a home easy, transparent, and enjoyable. We connect property seekers with verified listings and experienced agents across India.</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">Whether you&apos;re a first-time buyer, looking for a rental, or an investor, our platform provides the tools, data, and expert guidance you need.</p>
              <Link href="/properties" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all">
                Browse Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS — Dark section with icons */}
      <section className="bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { icon: <Building2 className="h-6 w-6" />, val: "10,000+", label: "Properties Listed" },
              { icon: <Users className="h-6 w-6" />, val: "5,000+", label: "Happy Clients" },
              { icon: <MapPin className="h-6 w-6" />, val: "50+", label: "Cities Covered" },
              { icon: <TrendingUp className="h-6 w-6" />, val: "98%", label: "Satisfaction" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="h-12 w-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">{s.icon}</div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">{s.val}</p>
                <p className="text-xs text-gray-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / VISION / VALUES — Numbered cards */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">What Drives Us</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Our Mission, Vision & Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { num: "01", icon: <Target className="h-6 w-6" />, title: "Our Mission", desc: "To simplify the real estate journey by providing a transparent, reliable platform where every listing is verified and every agent is trusted.", color: "from-emerald-500 to-teal-600" },
              { num: "02", icon: <Eye className="h-6 w-6" />, title: "Our Vision", desc: "To become India's most trusted real estate marketplace, empowering millions to find their perfect property with confidence.", color: "from-blue-500 to-indigo-600" },
              { num: "03", icon: <Handshake className="h-6 w-6" />, title: "Our Values", desc: "Transparency, integrity, and customer-first approach guide everything we do. Trust is the foundation of every successful deal.", color: "from-violet-500 to-purple-600" },
            ].map(card => (
              <div key={card.title} className="group relative bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-xl hover:border-gray-200 transition-all duration-300 overflow-hidden">
                <span className="absolute top-3 right-4 text-6xl font-extrabold text-gray-50 group-hover:text-emerald-50 transition-colors select-none">{card.num}</span>
                <div className={`relative h-12 w-12 rounded-xl bg-gradient-to-br ${card.color} text-white flex items-center justify-center mb-5 shadow-lg`}>{card.icon}</div>
                <h3 className="relative text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                <p className="relative text-sm text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US — Horizontal cards with left accent */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">Benefits</span>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Why Choose PropertyHub?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { icon: <ShieldCheck className="h-6 w-6" />, title: "Verified Properties", desc: "Every listing undergoes rigorous verification. No fake listings, guaranteed.", accent: "border-l-emerald-500" },
              { icon: <BadgeDollarSign className="h-6 w-6" />, title: "Transparent Pricing", desc: "No hidden fees, no brokerage surprises. Direct from owners & agents.", accent: "border-l-blue-500" },
              { icon: <Users className="h-6 w-6" />, title: "Trusted Agents", desc: "500+ licensed professionals with verified identities at your service.", accent: "border-l-violet-500" },
              { icon: <HeadphonesIcon className="h-6 w-6" />, title: "24/7 Dedicated Support", desc: "Customer support via phone, email, and WhatsApp. Always available.", accent: "border-l-amber-500" },
            ].map(item => (
              <div key={item.title} className={`flex gap-4 p-5 rounded-2xl border-l-4 ${item.accent} bg-white border border-gray-100 hover:shadow-lg transition-all duration-200`}>
                <div className="h-12 w-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-700 shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      {agents.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">Our Team</span>
                <h2 className="text-2xl font-bold text-gray-900">Meet Our Top Agents</h2>
              </div>
              <Link href="/agents" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800">View All <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {agents.slice(0, 4).map((a, i) => {
                const g = ['from-emerald-500 to-teal-600', 'from-blue-500 to-indigo-600', 'from-violet-500 to-purple-600', 'from-rose-500 to-pink-600'];
                return (
                  <Link key={a.id} href={`/agents/${a.id}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all">
                    <div className={`h-20 bg-gradient-to-r ${g[i % 4]} relative`}>
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2"><div className="h-12 w-12 rounded-xl bg-white p-0.5 shadow-lg"><div className="h-full w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 font-bold">{a.name.charAt(0)}</div></div></div>
                    </div>
                    <div className="pt-9 pb-5 px-4 text-center">
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{a.name}</h3>
                      <p className="text-[11px] text-gray-400 mt-0.5">Consultant</p>
                      <p className="text-xs font-semibold text-emerald-600 mt-2">{a.properties_count || 0} listings</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">Looking to buy or sell property?</h2>
          <p className="mt-3 text-sm text-emerald-100">Start your journey with us. Browse verified listings or list your property free.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/properties" className="px-7 py-3.5 rounded-xl bg-white text-emerald-700 text-sm font-bold shadow-lg hover:bg-emerald-50 transition-all">Browse Properties</Link>
            <Link href="/contact" className="px-7 py-3.5 rounded-xl border-2 border-white/30 text-white text-sm font-bold hover:bg-white/10 transition-all">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

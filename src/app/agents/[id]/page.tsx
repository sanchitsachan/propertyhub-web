import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight, Phone, Mail, MessageCircle, Building2, Star, MapPin, Award, Globe } from "lucide-react";
import { getAgent, getImageUrl } from "@/lib/api";
import PropertyCard from "@/components/PropertyCard";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  try {
    const a = await getAgent(parseInt(id));
    return { title: `${a.name} - Agent Profile`, description: `View properties listed by ${a.name}. Contact for expert real estate guidance.` };
  } catch { return { title: "Agent Not Found" }; }
}

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let agent;
  try { agent = await getAgent(parseInt(id)); } catch { notFound(); }

  const stats = [
    { icon: <Building2 className="h-5 w-5" />, value: agent.properties_count || 0, label: "Active Listings" },
    { icon: <Star className="h-5 w-5" />, value: "4.8", label: "Avg Rating" },
    { icon: <Award className="h-5 w-5" />, value: "5+", label: "Years Experience" },
    { icon: <Globe className="h-5 w-5" />, value: "EN, AR", label: "Languages" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 lg:pb-0">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-500">
            <Link href="/" className="hover:text-emerald-600 flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/agents" className="hover:text-emerald-600">Agents</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-900 font-medium">{agent.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="h-24 w-24 rounded-2xl bg-white p-1.5 shadow-xl shrink-0">
              <div className="h-full w-full rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-3xl font-bold overflow-hidden">
                {agent.profile_photo
                  ? <img src={getImageUrl(agent.profile_photo)} alt={agent.name} className="h-full w-full object-cover rounded-xl" />
                  : agent.name.charAt(0).toUpperCase()
                }
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-white">{agent.name}</h1>
              <p className="text-emerald-200 text-sm mt-0.5">Property Consultant</p>
              <div className="flex items-center gap-1 justify-center sm:justify-start mt-1.5">
                {[1,2,3,4,5].map(i => <Star key={i} className={`h-3.5 w-3.5 ${i <= 4 ? "text-yellow-300 fill-yellow-300" : "text-emerald-300"}`} />)}
                <span className="text-xs text-emerald-200 ml-1">4.8 rating</span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                {agent.phone && (
                  <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-bold hover:bg-white/30 transition-colors">
                    <Phone className="h-3.5 w-3.5" /> {agent.phone}
                  </a>
                )}
                <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 backdrop-blur-sm text-white text-xs font-bold hover:bg-white/30 transition-colors">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
                {agent.phone && (
                  <a href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25d366] text-white text-xs font-bold hover:bg-[#20bd5a] transition-colors">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 -mt-14 relative z-10 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5 text-center shadow-sm">
              <div className="text-emerald-600 flex justify-center mb-2">{s.icon}</div>
              <p className="text-xl font-extrabold text-gray-900">{String(s.value)}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm mb-6">
          <h2 className="text-base font-bold text-gray-900 mb-3">About {agent.name}</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {agent.name} is an experienced real estate consultant specializing in residential and commercial properties. With extensive knowledge of the local market, they help clients find their ideal property whether buying, selling, or renting.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Luxury", "Apartments", "Villas", "Investment", "Commercial"].map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">{tag}</span>
            ))}
          </div>
        </div>

        {/* Properties */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Properties by {agent.name}</h2>
          {agent.properties && agent.properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {agent.properties.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Building2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No active listings at this time.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 px-4 py-3">
          {agent.phone && (
            <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
          )}
          {agent.phone && (
            <a href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25d366] text-white text-xs font-bold">
              <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
            </a>
          )}
          <a href={`mailto:${agent.email}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold">
            <Mail className="h-3.5 w-3.5" /> Email
          </a>
        </div>
      </div>
    </div>
  );
}

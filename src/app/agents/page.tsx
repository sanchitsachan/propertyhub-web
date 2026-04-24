import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Phone, MessageCircle, Building2, Mail, MapPin, Users } from "lucide-react";
import { getAgents, getImageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Our Agents",
  description: "Meet our experienced real estate agents. Connect with professionals to find your perfect property.",
};

export default async function AgentsPage() {
  let agents;
  try { agents = await getAgents(); } catch { return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">Unable to load agents.</div>; }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav className="flex items-center gap-1.5 text-emerald-200 text-xs mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" /> <span className="text-white font-medium">Agents</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <Users className="h-7 w-7" /> Meet Our Trusted Agents
          </h1>
          <p className="text-sm text-emerald-200 mt-1.5">Connect with professional agents to find the right property</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <p className="text-sm text-gray-500 mb-5"><strong className="text-gray-900">{agents.length}</strong> agents available</p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map(agent => (
            <div key={agent.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 group">
              {/* Top gradient strip */}
              <div className="h-20 bg-gradient-to-r from-emerald-500 to-teal-600 relative">
                <div className="absolute -bottom-8 left-5">
                  <div className="h-16 w-16 rounded-2xl bg-white p-1 shadow-lg">
                    <div className="h-full w-full rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-bold overflow-hidden">
                      {agent.profile_photo
                        ? <img src={getImageUrl(agent.profile_photo)} alt={agent.name} className="h-full w-full object-cover rounded-xl" />
                        : agent.name.charAt(0).toUpperCase()
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-10 px-5 pb-5">
                <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{agent.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">Real Estate Consultant</p>

                <div className="mt-3 space-y-1.5">
                  {agent.phone && (
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Phone className="h-3.5 w-3.5 text-gray-400" /> {agent.phone}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400" /> {agent.email}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold">
                    <Building2 className="h-3 w-3" /> {agent.properties_count || 0} Listings
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <Link href={`/agents/${agent.id}`}
                    className="flex-1 text-center py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors">
                    View Profile
                  </Link>
                  {agent.phone && (
                    <a href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white transition-colors">
                      <MessageCircle className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {agents.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500">No agents found.</p>
          </div>
        )}
      </div>
    </div>
  );
}

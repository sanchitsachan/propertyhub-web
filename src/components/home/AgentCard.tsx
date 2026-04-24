import Link from "next/link";
import { Phone, Building2 } from "lucide-react";
import { Agent, getImageUrl } from "@/lib/api";

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-200 group">
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-emerald-700 text-xl font-bold shrink-0 overflow-hidden">
          {agent.profile_photo
            ? <img src={getImageUrl(agent.profile_photo)} alt={agent.name} className="h-16 w-16 object-cover" />
            : agent.name.charAt(0).toUpperCase()
          }
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{agent.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">Real Estate Agent</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
        {agent.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-3.5 w-3.5 text-gray-400" /> {agent.phone}
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 className="h-3.5 w-3.5 text-gray-400" /> {agent.properties_count || 0} Active Listings
        </div>
      </div>
      <Link href={`/agents/${agent.id}`}
        className="mt-4 block text-center py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all">
        View Profile
      </Link>
    </div>
  );
}

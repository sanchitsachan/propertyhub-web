"use client";
import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MessageCircle, CalendarCheck } from "lucide-react";
import { Agent, getImageUrl, submitInquiry } from "@/lib/api";

export default function AgentContactCard({ agent, propertyId }: { agent: Agent; propertyId: number }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "I am interested in this property. Please contact me." });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading");
    try { await submitInquiry({ property_id: propertyId, ...form }); setStatus("success"); } catch { setStatus("error"); }
  };

  const ic = "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24 overflow-hidden">
      {/* Agent info */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-lg overflow-hidden shrink-0">
            {agent.profile_photo ? <img src={getImageUrl(agent.profile_photo)} alt={agent.name} className="h-12 w-12 object-cover" /> : agent.name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">{agent.name}</p>
            <p className="text-xs text-gray-500">Property Agent</p>
          </div>
        </div>
        <div className="flex gap-2">
          {agent.phone && (
            <a href={`tel:${agent.phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
              <Phone className="h-3.5 w-3.5" /> Call
            </a>
          )}
          <a href={`https://wa.me/${agent.phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#25d366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-colors">
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
        </div>
        <Link href={`/agents/${agent.id}`} className="block mt-2 text-center py-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700">View Agent Profile →</Link>
      </div>

      {/* Inquiry form */}
      <div className="p-5">
        {status === "success" ? (
          <div className="text-center py-4">
            <CalendarCheck className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900">Inquiry Sent!</p>
            <p className="text-xs text-gray-500 mt-1">Agent will contact you shortly.</p>
            <button onClick={() => setStatus("idle")} className="mt-2 text-xs font-semibold text-emerald-600">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Request Information</h4>
            {status === "error" && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">Something went wrong. Try again.</p>}
            <input type="text" placeholder="Your Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={ic} />
            <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={ic} />
            <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={ic} />
            <textarea rows={3} placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={ic + " resize-none"} />
            <button type="submit" disabled={status === "loading"}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all">
              {status === "loading" ? "Sending..." : "Send Inquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

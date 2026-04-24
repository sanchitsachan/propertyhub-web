"use client";
import { useState } from "react";
import { submitInquiry } from "@/lib/api";

export default function InquiryForm({ propertyId }: { propertyId: number }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading");
    try { await submitInquiry({ property_id: propertyId, ...form }); setStatus("success"); setForm({ name: "", email: "", phone: "", message: "" }); }
    catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="text-center py-6">
      <div className="text-3xl mb-2">✅</div>
      <p className="text-sm font-bold text-gray-900">Inquiry Sent!</p>
      <p className="text-xs text-gray-500 mt-1">Agent will contact you soon.</p>
      <button onClick={() => setStatus("idle")} className="mt-3 text-xs font-semibold text-[#e4002b]">Send another</button>
    </div>
  );

  const ic = "w-full px-3 py-2.5 rounded border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:border-[#e4002b] focus:ring-1 focus:ring-[#e4002b] transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h3 className="text-sm font-bold text-gray-900">Contact Agent</h3>
      {status === "error" && <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded">Failed. Please try again.</p>}
      <input type="text" placeholder="Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={ic} />
      <input type="email" placeholder="Email *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={ic} />
      <input type="tel" placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={ic} />
      <textarea placeholder="I am interested in this property..." rows={3} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={ic + " resize-none"} />
      <button type="submit" disabled={status === "loading"} className="w-full py-2.5 rounded bg-[#e4002b] hover:bg-[#c40025] text-white text-sm font-bold disabled:opacity-50 transition-colors">
        {status === "loading" ? "Sending..." : "Send Inquiry"}
      </button>
      <a href="https://wa.me/971501234567?text=Hi, I'm interested in this property" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold transition-colors">
        💬 WhatsApp
      </a>
    </form>
  );
}

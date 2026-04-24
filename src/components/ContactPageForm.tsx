"use client";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/lib/api";

export default function ContactPageForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("loading");
    try { await submitContact(form); setStatus("success"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }
    catch { setStatus("error"); }
  };

  if (status === "success") return (
    <div className="text-center py-10">
      <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
      <h3 className="text-lg font-bold text-gray-900">Message Sent!</h3>
      <p className="text-sm text-gray-500 mt-1">We&apos;ll get back to you within 24 hours.</p>
      <button onClick={() => setStatus("idle")} className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-800">Send another message</button>
    </div>
  );

  const ic = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-gray-50 hover:bg-white focus:bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">Something went wrong. Please try again.</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name *" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={ic} />
        <input type="email" placeholder="Email Address *" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={ic} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="tel" placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={ic} />
        <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className={ic}>
          <option value="">Select Subject</option>
          <option value="Buying">Buying Property</option>
          <option value="Selling">Selling Property</option>
          <option value="Renting">Renting Property</option>
          <option value="Investment">Investment</option>
          <option value="General">General Inquiry</option>
        </select>
      </div>
      <textarea placeholder="Your Message *" required rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={ic + " resize-none"} />
      <button type="submit" disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
        {status === "loading" ? (
          <><svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg> Sending...</>
        ) : (
          <><Send className="h-4 w-4" /> Send Message</>
        )}
      </button>
    </form>
  );
}

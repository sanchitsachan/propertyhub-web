"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="text-center py-10">
      <div className="text-4xl mb-3">✅</div>
      <h3 className="text-lg font-bold text-gray-900">Message Sent!</h3>
      <p className="text-sm text-gray-500 mt-1">We&apos;ll get back to you within 24 hours.</p>
      <button onClick={() => setSent(false)} className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-800">Send another</button>
    </div>
  );

  const inputCls = "w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all";

  return (
    <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="text" placeholder="Full Name *" required className={inputCls} />
        <input type="email" placeholder="Email Address *" required className={inputCls} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input type="tel" placeholder="Phone Number" className={inputCls} />
        <input type="text" placeholder="Subject *" required className={inputCls} />
      </div>
      <textarea placeholder="Your Message *" required rows={5} className={inputCls + " resize-none"} />
      <button type="submit" className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold transition-colors">
        Send Message
      </button>
    </form>
  );
}

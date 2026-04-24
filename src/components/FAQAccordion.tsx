"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "How do I list my property on PropertyHub?", a: "You can list your property by clicking the 'Post Property' button in the header. Fill in the details about your property, upload photos, and submit. Our team will review and publish it within 24 hours." },
  { q: "How do I contact an agent?", a: "Each property listing has the agent's contact information. You can call, email, WhatsApp, or fill out the inquiry form on the property page to get in touch directly." },
  { q: "Does PropertyHub charge any fees?", a: "Browsing properties and contacting agents is completely free. For property sellers/landlords, we offer free basic listings and premium options with additional visibility features." },
  { q: "Are the properties verified?", a: "Yes, every property on PropertyHub goes through a verification process. Our team checks the listing details, photos, and ownership documentation before publishing." },
  { q: "How can I schedule a property viewing?", a: "You can schedule a viewing by contacting the listing agent through the property page. Use the 'Request Viewing' button or directly call/WhatsApp the agent." },
  { q: "Can I save properties to view later?", a: "Yes, click the heart icon on any property card to save it to your favorites. You can access your saved properties anytime from your account." },
];

export default function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all">
          <button onClick={() => setOpenIdx(openIdx === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left">
            <span className="text-sm font-semibold text-gray-900 pr-4">{faq.q}</span>
            <ChevronDown className={`h-4 w-4 text-gray-400 shrink-0 transition-transform duration-200 ${openIdx === i ? "rotate-180" : ""}`} />
          </button>
          {openIdx === i && (
            <div className="px-5 pb-4 -mt-1">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

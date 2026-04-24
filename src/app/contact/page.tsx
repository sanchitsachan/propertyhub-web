import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Phone, Mail, MapPin, Clock, Send, MessageSquare, HelpCircle } from "lucide-react";
import ContactPageForm from "@/components/ContactPageForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = { title: "Contact Us", description: "Get in touch with PropertyHub. We're here to help you find the perfect property." };

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav className="flex items-center gap-1.5 text-emerald-200 text-xs mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" /> <span className="text-white font-medium">Contact</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Get in Touch</h1>
          <p className="text-sm text-emerald-200 mt-1.5">We&apos;re here to help you find the perfect property</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* CONTACT CARDS — Overlapping hero */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-12 relative z-10 mb-10">
          {[
            { icon: <Phone className="h-5 w-5" />, title: "Call Us", value: "+91-22-12345678", sub: "Mon-Sat, 9AM-6PM", href: "tel:+912212345678", color: "bg-emerald-500" },
            { icon: <Mail className="h-5 w-5" />, title: "Email Us", value: "info@propertyhub.in", sub: "Reply within 24 hours", href: "mailto:info@propertyhub.in", color: "bg-blue-500" },
            { icon: <MapPin className="h-5 w-5" />, title: "Visit Office", value: "Lower Parel, Mumbai", sub: "Maharashtra, India", href: null, color: "bg-violet-500" },
            { icon: <Clock className="h-5 w-5" />, title: "Working Hours", value: "Mon-Fri: 9AM-6PM", sub: "Sat: 10AM-4PM", href: null, color: "bg-amber-500" },
          ].map(c => (
            <div key={c.title} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-lg transition-all duration-200">
              <div className="flex items-start gap-3.5">
                <div className={`h-11 w-11 rounded-xl ${c.color} text-white flex items-center justify-center shrink-0 shadow-sm`}>{c.icon}</div>
                <div className="min-w-0">
                  <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{c.title}</h3>
                  {c.href ? (
                    <a href={c.href} className="block text-sm font-bold text-gray-900 mt-0.5 hover:text-emerald-600 transition-colors truncate">{c.value}</a>
                  ) : (
                    <p className="text-sm font-bold text-gray-900 mt-0.5">{c.value}</p>
                  )}
                  <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FORM + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 lg:p-8 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">Send us a Message</h2>
                <p className="text-sm text-gray-500 mt-1">Fill out the form and our team will get back to you within 24 hours.</p>
              </div>
              <div className="p-6 lg:p-8">
                <ContactPageForm />
              </div>
            </div>
          </div>

          {/* Sidebar — Map + Quick Contact */}
          <div className="lg:col-span-2 space-y-5">
            {/* Map */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <iframe src="https://www.google.com/maps?q=18.9969,72.8319&z=15&output=embed"
                width="100%" height="240" style={{ border: 0 }} loading="lazy" />
              <div className="px-4 py-3 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                <MapPin className="h-3.5 w-3.5 text-gray-400" /> Lower Parel, Mumbai, Maharashtra
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Quick Contact</h3>
              <div className="space-y-2.5">
                <a href="tel:+912212345678" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition-colors shadow-sm">
                  <Phone className="h-4 w-4" /> Call Us Now
                </a>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25d366] hover:bg-[#20bd5a] text-white text-sm font-bold transition-colors shadow-sm">
                  <MessageSquare className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <a href="mailto:info@propertyhub.in"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-colors">
                  <Mail className="h-4 w-4" /> Send Email
                </a>
              </div>
            </div>

            {/* Trust badges */}
            <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-5 space-y-3">
              {[
                { text: "Average response time: 2 hours" },
                { text: "Available in English & Hindi" },
                { text: "No spam, guaranteed" },
              ].map(b => (
                <div key={b.text} className="flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                  {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-14">
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
              <HelpCircle className="h-3 w-3 inline -mt-0.5 mr-1" /> FAQ
            </span>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-sm text-gray-500 mt-1">Quick answers to common questions</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <FAQAccordion />
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-14 relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="relative p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-lg font-bold text-white">Stay Updated</h3>
                <p className="text-sm text-emerald-200 mt-1">Get the latest property listings and market insights in your inbox.</p>
              </div>
              <form className="flex w-full lg:w-auto gap-2">
                <input type="email" placeholder="Enter your email" className="flex-1 lg:w-72 px-4 py-3.5 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/30" />
                <button type="submit" className="px-6 py-3.5 rounded-xl bg-white text-emerald-700 text-sm font-bold hover:bg-emerald-50 flex items-center gap-2 shrink-0 transition-colors shadow-sm">
                  <Send className="h-4 w-4" /> Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

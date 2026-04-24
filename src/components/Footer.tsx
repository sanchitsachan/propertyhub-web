import Link from "next/link";
import { Building2, Mail, Phone, MapPin, Send, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white">Subscribe to our Newsletter</h3>
              <p className="text-sm text-gray-500 mt-1">Get the latest properties and market insights delivered to your inbox.</p>
            </div>
            <form className="flex w-full lg:w-auto gap-2">
              <input type="email" placeholder="Enter your email" className="flex-1 lg:w-80 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500" />
              <button type="submit" className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold flex items-center gap-2 shrink-0 transition-colors">
                <Send className="h-4 w-4" /> Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">PropertyHub</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">The most trusted real estate platform. Find your dream property with verified listings and expert agents.</p>
            <div className="flex gap-3">
              {["FB", "IG", "TW", "IN"].map((label, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-lg bg-gray-800 hover:bg-emerald-600 flex items-center justify-center text-gray-400 hover:text-white transition-all text-[10px] font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/properties?purpose=sale" className="hover:text-white transition-colors">Buy Property</Link></li>
              <li><Link href="/properties?purpose=rent" className="hover:text-white transition-colors">Rent Property</Link></li>
              <li><Link href="/properties?featured=true" className="hover:text-white transition-colors">New Projects</Link></li>
              <li><Link href="/agents" className="hover:text-white transition-colors">Find Agents</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" /> Lower Parel, Mumbai, India</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-emerald-500 shrink-0" /> +91-22-12345678</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-emerald-500 shrink-0" /> info@propertyhub.in</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>&copy; {new Date().getFullYear()} PropertyHub. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms-of-service" className="hover:text-gray-400">Terms</Link>
            <Link href="/privacy-policy" className="hover:text-gray-400">Privacy</Link>
            <Link href="/cookie-policy" className="hover:text-gray-400">Cookies</Link>
            <Link href="/disclaimer" className="hover:text-gray-400">Disclaimer</Link>
            <Link href="/refund-policy" className="hover:text-gray-400">Refund</Link>
            <Link href="/sitemap.xml" className="hover:text-gray-400">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

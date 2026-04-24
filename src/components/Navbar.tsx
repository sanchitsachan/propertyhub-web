"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, Menu, X, ChevronDown, Building2, Globe } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "Agents", href: "/agents" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-gray-900 text-gray-300 text-xs hidden lg:block">
        <div className="mx-auto max-w-7xl px-6 flex items-center justify-between h-9">
          <div className="flex items-center gap-5">
            <a href="tel:+912212345678" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" /> +91-22-12345678
            </a>
            <a href="mailto:info@propertyhub.in" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="h-3 w-3" /> info@propertyhub.in
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              {["FB", "IG", "TW", "IN"].map((label, i) => (
                <a key={i} href="#" className="hover:text-white transition-colors text-[10px] font-bold">{label}</a>
              ))}
            </div>
            <div className="h-3 w-px bg-gray-700" />
            <button className="flex items-center gap-1 hover:text-white transition-colors">
              EN <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-lg shadow-md" : "bg-white"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-[72px] items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="leading-none">
                <span className="text-xl font-extrabold text-gray-900 tracking-tight">Property</span>
                <span className="text-xl font-extrabold text-emerald-600 tracking-tight">Hub</span>
                <span className="block text-[9px] text-gray-400 font-semibold tracking-[0.2em] uppercase -mt-0.5">Real Estate</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(link => {
                const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                return (
                  <Link key={link.name} href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      active ? "text-emerald-600 bg-emerald-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}>
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link href="/contact"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-200">
                List Your Property
              </Link>
              <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden pb-4 border-t border-gray-100 pt-3 space-y-1">
              {navLinks.map(link => (
                <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                  {link.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileOpen(false)}
                className="block mx-4 mt-2 text-center py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold">
                List Your Property
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

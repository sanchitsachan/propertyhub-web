"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1.5">
              <div className="h-7 w-7 rounded bg-[#e4002b] flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" /></svg>
              </div>
              <span className="text-base font-extrabold text-gray-900">Property<span className="text-[#e4002b]">Hub</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5">
              {[
                { name: "Buy", href: "/properties?purpose=sale" },
                { name: "Rent", href: "/properties?purpose=rent" },
                { name: "New Projects", href: "/properties?featured=true" },
                { name: "Agents", href: "/agents" },
              ].map(item => (
                <Link key={item.name} href={item.href} className="px-3 py-1.5 text-[13px] font-semibold text-gray-700 hover:text-[#e4002b] transition-colors">{item.name}</Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about" className="hidden sm:block text-[13px] font-semibold text-gray-600 hover:text-gray-900">About</Link>
            <Link href="/contact" className="hidden sm:block text-[13px] font-semibold text-gray-600 hover:text-gray-900">Contact</Link>
            <Link href="/contact" className="px-4 py-1.5 rounded-md bg-[#e4002b] text-white text-[13px] font-bold hover:bg-[#c40025] transition-colors">Post Property <span className="hidden sm:inline">FREE</span></Link>
            <button className="lg:hidden p-1.5 text-gray-600" onClick={() => setOpen(!open)}>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d={open ? "M6 18 18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} /></svg>
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden pb-3 border-t border-gray-100 pt-2 space-y-1">
            {["Buy", "Rent", "New Projects", "Agents", "About", "Contact"].map(n => (
              <Link key={n} href={n === 'Buy' ? '/properties?purpose=sale' : n === 'Rent' ? '/properties?purpose=rent' : n === 'New Projects' ? '/properties?featured=true' : `/${n.toLowerCase()}`}
                onClick={() => setOpen(false)} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded">{n}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

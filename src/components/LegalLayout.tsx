import Link from "next/link";
import { Home, ChevronRight, FileText, Calendar } from "lucide-react";

const legalPages = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Service", href: "/terms-of-service" },
  { name: "Cookie Policy", href: "/cookie-policy" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Refund Policy", href: "/refund-policy" },
];

export default function LegalLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav className="flex items-center gap-1.5 text-emerald-200 text-xs mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-medium">{title}</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3">
            <FileText className="h-7 w-7" /> {title}
          </h1>
          <div className="flex items-center gap-1.5 mt-2 text-emerald-200 text-sm">
            <Calendar className="h-3.5 w-3.5" /> Last updated: {updated}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm sticky top-24">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Legal Pages</h3>
              <nav className="space-y-1">
                {legalPages.map(page => (
                  <Link key={page.href} href={page.href}
                    className={`block px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      page.name === title ? "bg-emerald-50 text-emerald-700 font-bold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}>
                    {page.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <article className="prose prose-sm max-w-none text-gray-600 leading-relaxed
                [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:first:mt-0
                [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mt-5 [&>h3]:mb-2
                [&>p]:mb-3 [&>p]:text-sm
                [&>ul]:mb-4 [&>ul]:ml-5 [&>ul]:list-disc [&>ul>li]:mb-1.5 [&>ul>li]:text-sm
              ">
                {children}
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

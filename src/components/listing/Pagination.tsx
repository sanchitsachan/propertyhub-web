import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationLink { url: string | null; label: string; active: boolean; }

export default function Pagination({ links, filters }: { links: PaginationLink[]; filters: Record<string, string | undefined | string> }) {
  if (!links || links.length <= 3) return null;

  const buildUrl = (apiUrl: string) => {
    try {
      const u = new URL(apiUrl);
      const page = u.searchParams.get("page");
      const p = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v && k !== "page") p.set(k, v); });
      if (page) p.set("page", page);
      return `/properties?${p.toString()}`;
    } catch { return "/properties"; }
  };

  return (
    <nav className="flex items-center justify-center gap-1.5 mt-8">
      {links.map((link, i) => {
        if (!link.url && !link.active) {
          return <span key={i} className="h-10 w-10 rounded-xl flex items-center justify-center text-sm text-gray-300 bg-white border border-gray-100"
            dangerouslySetInnerHTML={{ __html: link.label.includes("Previous") ? "‹" : "›" }} />;
        }
        const isArrow = link.label.includes("Previous") || link.label.includes("Next");
        return (
          <Link key={i} href={link.url ? buildUrl(link.url) : "#"} prefetch={false}
            className={`h-10 min-w-10 px-3 rounded-xl flex items-center justify-center text-sm font-semibold border transition-all ${
              link.active ? "bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-200" : "bg-white text-gray-700 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
            }`}>
            {isArrow ? (link.label.includes("Previous") ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />) : <span dangerouslySetInnerHTML={{ __html: link.label }} />}
          </Link>
        );
      })}
    </nav>
  );
}

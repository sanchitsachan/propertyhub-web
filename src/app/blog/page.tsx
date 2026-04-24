import { Metadata } from "next";
import Link from "next/link";
import { Home, ChevronRight, Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { getBlogPosts, BlogPost } from "@/lib/api";

export const metadata: Metadata = { title: "Blog", description: "Property tips, market insights, and real estate guides from PropertyHub." };

const categoryColors: Record<string, string> = {
  Investment: "bg-blue-100 text-blue-700", Guide: "bg-emerald-100 text-emerald-700",
  Market: "bg-violet-100 text-violet-700", Legal: "bg-amber-100 text-amber-700",
  Finance: "bg-rose-100 text-rose-700", Lifestyle: "bg-cyan-100 text-cyan-700",
  General: "bg-gray-100 text-gray-700",
};

const blogImages = [
  "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=800&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
];

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  try { const res = await getBlogPosts(); posts = Array.isArray(res) ? res : res.data; } catch {}

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23fff' fill-opacity='.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <nav className="flex items-center gap-1.5 text-emerald-200 text-xs mb-3">
            <Link href="/" className="hover:text-white flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <ChevronRight className="h-3 w-3" /> <span className="text-white font-medium">Blog</span>
          </nav>
          <h1 className="text-2xl lg:text-3xl font-bold text-white flex items-center gap-3"><BookOpen className="h-7 w-7" /> Blog & Insights</h1>
          <p className="text-sm text-emerald-200 mt-1.5">Property tips, market trends, and expert real estate guides</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured post */}
        {posts.length > 0 && (
          <Link href={`/blog/${posts[0].slug}`} className="group block mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative h-64 lg:h-80">
                <img src={blogImages[0]} alt={posts[0].title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <span className={`inline-block w-fit px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${categoryColors[posts[0].category] || categoryColors.General}`}>{posts[0].category}</span>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors leading-snug">{posts[0].title}</h2>
                <p className="text-sm text-gray-500 mt-3 line-clamp-3 leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center gap-4 mt-5 text-xs text-gray-400">
                  {posts[0].author && <span className="flex items-center gap-1"><User className="h-3 w-3" /> {posts[0].author.name}</span>}
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(posts[0].created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 group-hover:gap-2.5 transition-all">
                  Read Article <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.slice(1).map((post, i) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300">
              <div className="relative h-48 bg-gray-100">
                <img src={blogImages[(i + 1) % blogImages.length]} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${categoryColors[post.category] || categoryColors.General}`}>{post.category}</span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                </div>
                <h3 className="text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">{post.title}</h3>
                <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read More <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-sm text-gray-500">No blog posts yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

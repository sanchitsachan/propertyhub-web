import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight, Calendar, User, ArrowLeft, ArrowRight, Clock, Share2, BookOpen, Tag, MessageSquare, Heart, Bookmark, Copy, Send } from "lucide-react";
import { getBlogPost, getBlogPosts, BlogPost, getImageUrl } from "@/lib/api";

const blogImages = [
  "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
];

const categoryColors: Record<string, string> = {
  Investment: "bg-blue-100 text-blue-700", Guide: "bg-emerald-100 text-emerald-700",
  Market: "bg-violet-100 text-violet-700", Legal: "bg-amber-100 text-amber-700",
  Finance: "bg-rose-100 text-rose-700", Lifestyle: "bg-cyan-100 text-cyan-700", General: "bg-gray-100 text-gray-700",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getBlogPost(slug);
    const img = post.featured_image ? getImageUrl(post.featured_image) : blogImages[(post.id - 1) % blogImages.length];
    return { title: post.meta_title || post.title, description: post.meta_description || post.excerpt || post.title, openGraph: { title: post.meta_title || post.title, description: post.meta_description || post.excerpt || '', images: [img] } };
  } catch { return { title: "Post Not Found" }; }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: BlogPost;
  try { post = await getBlogPost(slug); } catch { notFound(); }

  let relatedPosts: BlogPost[] = [];
  try { const res = await getBlogPosts({ limit: "6" }); relatedPosts = (Array.isArray(res) ? res : (res as any).data || []).filter((p: BlogPost) => p.id !== post.id).slice(0, 3); } catch {}

  const heroImg = post.featured_image ? getImageUrl(post.featured_image) : blogImages[(post.id - 1) % blogImages.length];
  const readTime = Math.max(3, Math.round(post.content.replace(/<[^>]*>/g, '').split(/\s+/).length / 200));
  const wordCount = post.content.replace(/<[^>]*>/g, '').split(/\s+/).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Premium Hero */}
      <section className="relative h-[78vh] min-h-[560px] max-h-[820px] overflow-hidden bg-gray-900 isolate">
        {/* Background image with slow Ken Burns zoom */}
        <img src={heroImg} alt={post.title} className="absolute inset-0 w-full h-full object-cover animate-hero-zoom" />

        {/* Gradient stack — heavier on bottom-left for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/55 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />

        {/* Glow accents */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full bg-teal-600/15 blur-3xl" />

        {/* Top breadcrumb on dark */}
        <div className="absolute top-0 inset-x-0 z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
            <nav className="flex items-center gap-1.5 text-[11px] text-white/60">
              <Link href="/" className="hover:text-white transition flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/90 font-medium truncate max-w-[260px]">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Content bottom-aligned */}
        <div className="relative h-full flex items-end pb-14 lg:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl">
              {/* Badge row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500 text-white text-[10px] font-black uppercase tracking-[0.15em] shadow-lg shadow-emerald-500/40">
                  <Tag className="h-3 w-3" /> {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white text-[11px] font-semibold">
                  <Clock className="h-3 w-3" /> {readTime} min read
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white text-[11px] font-semibold">
                  <BookOpen className="h-3 w-3" /> {wordCount.toLocaleString()} words
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[68px] font-black text-white leading-[1.05] tracking-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]" style={{ textWrap: 'balance' } as React.CSSProperties}>
                {post.title}
              </h1>

              {/* Excerpt as lead paragraph */}
              {post.excerpt && (
                <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed font-light max-w-3xl line-clamp-3">
                  {post.excerpt}
                </p>
              )}

              {/* Meta row */}
              <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-x-8 gap-y-4">
                {post.author && (
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-base font-black ring-2 ring-white/30 shadow-xl shadow-emerald-500/30">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">Written by</p>
                      <p className="text-sm font-bold text-white mt-0.5">{post.author.name}</p>
                    </div>
                  </div>
                )}
                <div className="h-10 w-px bg-white/15 hidden sm:block" />
                <div>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">Published</p>
                  <p className="text-sm font-semibold text-white mt-0.5 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <div className="h-10 w-px bg-white/15 hidden lg:block" />
                <div className="hidden lg:block">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/50 font-bold">Share</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <button className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition" title="Copy link"><Copy className="h-3 w-3" /></button>
                    <button className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition" title="Share"><Send className="h-3 w-3" /></button>
                    <button className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 ring-1 ring-white/15 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition" title="WhatsApp"><MessageSquare className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/60 animate-scroll-cue pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.35em] font-bold">Scroll to read</span>
          <ChevronRight className="h-3 w-3 rotate-90" />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Article */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <article className="p-6 lg:p-8 prose prose-sm lg:prose-base max-w-none text-gray-700
                [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mt-8 [&>h2]:mb-3 [&>h2]:pb-2 [&>h2]:border-b [&>h2]:border-gray-100
                [&>h3]:text-lg [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mt-6 [&>h3]:mb-2
                [&>p]:mb-4 [&>p]:leading-[1.8] [&>p]:text-[15px]
                [&>ul]:mb-4 [&>ul]:ml-5 [&>ul]:list-disc [&>ul>li]:mb-2 [&>ul>li]:leading-relaxed
                [&>ol]:mb-4 [&>ol]:ml-5 [&>ol]:list-decimal [&>ol>li]:mb-2
                [&>blockquote]:border-l-4 [&>blockquote]:border-emerald-500 [&>blockquote]:bg-emerald-50 [&>blockquote]:px-4 [&>blockquote]:py-3 [&>blockquote]:my-6 [&>blockquote]:rounded-r-xl [&>blockquote]:italic
                [&>table]:w-full [&>table]:border-collapse [&>table]:my-6 [&>table]:rounded-xl [&>table]:overflow-hidden
                [&_td]:border [&_td]:border-gray-200 [&_td]:px-4 [&_td]:py-2.5 [&_td]:text-sm
                [&_th]:bg-gray-50 [&_th]:border [&_th]:border-gray-200 [&_th]:px-4 [&_th]:py-2.5 [&_th]:text-sm [&_th]:font-bold
                [&>strong]:text-gray-900
              " dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags + Share */}
              <div className="px-6 lg:px-8 py-5 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-400" />
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${categoryColors[post.category] || categoryColors.General}`}>{post.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 mr-1">Share:</span>
                  <button className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center text-gray-500 transition-colors" title="Copy Link"><Copy className="h-3.5 w-3.5" /></button>
                  <button className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-sky-100 hover:text-sky-600 flex items-center justify-center text-gray-500 transition-colors" title="Share"><Send className="h-3.5 w-3.5" /></button>
                  <button className="h-8 w-8 rounded-lg bg-gray-100 hover:bg-green-100 hover:text-green-600 flex items-center justify-center text-gray-500 transition-colors" title="WhatsApp"><MessageSquare className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>

            {/* Author card */}
            {post.author && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-6 flex gap-4 items-start">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-lg shadow-emerald-500/20">{post.author.name.charAt(0)}</div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Written by</p>
                  <h3 className="text-base font-bold text-gray-900 mt-0.5">{post.author.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">Real estate expert and content writer at PropertyHub. Sharing insights on property trends, investment tips, and home buying guides across India.</p>
                </div>
              </div>
            )}

            {/* Nav */}
            <div className="flex items-center justify-between mt-6">
              <Link href="/blog" className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-800 transition-colors">
                <ArrowLeft className="h-4 w-4" /> All Articles
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Post stats */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Article Info</h3>
              <div className="space-y-3">
                {[
                  { icon: <Clock className="h-4 w-4" />, label: "Read Time", value: `${readTime} minutes` },
                  { icon: <BookOpen className="h-4 w-4" />, label: "Word Count", value: `${wordCount.toLocaleString()} words` },
                  { icon: <Calendar className="h-4 w-4" />, label: "Published", value: new Date(post.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) },
                  { icon: <Tag className="h-4 w-4" />, label: "Category", value: post.category },
                ].map(s => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs text-gray-500"><span className="text-gray-400">{s.icon}</span> {s.label}</span>
                    <span className="text-xs font-semibold text-gray-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Posts sidebar */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.map((rp) => (
                    <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-3">
                      <div className="h-16 w-20 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img src={rp.featured_image ? getImageUrl(rp.featured_image) : blogImages[(rp.id - 1) % blogImages.length]} alt={rp.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold uppercase text-emerald-600">{rp.category}</span>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mt-0.5 leading-snug group-hover:text-emerald-600 transition-colors">{rp.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-5 text-center">
              <h3 className="text-base font-bold text-white">Looking for a property?</h3>
              <p className="text-xs text-emerald-200 mt-1">Browse verified listings across India</p>
              <Link href="/properties" className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-white text-emerald-700 text-sm font-bold hover:bg-emerald-50 transition-colors shadow-sm">
                Browse Properties
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Newsletter</h3>
              <p className="text-xs text-gray-500 mb-3">Get property tips in your inbox weekly.</p>
              <form className="space-y-2">
                <input type="email" placeholder="Your email" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom related — full width */}
      {relatedPosts.length > 0 && (
        <div className="bg-white border-t border-gray-100 mt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
                <p className="text-sm text-gray-500 mt-1">More articles on property and real estate</p>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-800">
                All Articles <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg hover:bg-white transition-all duration-300 border border-transparent hover:border-gray-200">
                  <div className="h-44 overflow-hidden">
                    <img src={rp.featured_image ? getImageUrl(rp.featured_image) : blogImages[(rp.id - 1) % blogImages.length]} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${categoryColors[rp.category] || categoryColors.General}`}>{rp.category}</span>
                      <span className="text-[10px] text-gray-400">{new Date(rp.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">{rp.title}</h3>
                    {rp.excerpt && <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">{rp.excerpt}</p>}
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read More <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

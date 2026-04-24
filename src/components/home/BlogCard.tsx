import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200 group">
      <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-4xl">
        {post.image}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700">{post.category}</span>
          <span className="flex items-center gap-1 text-[11px] text-gray-400"><Calendar className="h-3 w-3" /> {post.date}</span>
        </div>
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 group-hover:text-emerald-600 transition-colors leading-snug">{post.title}</h3>
        <p className="mt-2 text-xs text-gray-500 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
          Read More <ArrowRight className="h-3 w-3" />
        </span>
      </div>
    </div>
  );
}

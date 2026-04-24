"use client";
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Vikram Malhotra", city: "Mumbai", rating: 5, text: "PropertyHub helped me find my dream apartment in Bandra. The agent was incredibly professional and the process was smooth from start to finish.", photo: "V" },
  { name: "Priya Iyer", city: "Bangalore", rating: 5, text: "I was looking for a villa for my family and PropertyHub made it so easy. The verified listings saved me so much time. Highly recommend!", photo: "P" },
  { name: "Karthik Nair", city: "Hyderabad", rating: 4, text: "Great platform with genuine listings. Found a perfect office space in HITEC City within my budget. The team was very helpful.", photo: "K" },
  { name: "Ananya Sharma", city: "Delhi NCR", rating: 5, text: "Was worried about finding a good rental in Gurgaon. PropertyHub connected me with a fantastic agent who found me the perfect place in 3 days!", photo: "A" },
];

export default function TestimonialSlider() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <div className="relative bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 lg:p-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <Quote className="absolute top-6 right-6 h-16 w-16 text-white/10" />

      <div className="relative">
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < t.rating ? "text-yellow-300 fill-yellow-300" : "text-white/30"}`} />
          ))}
        </div>
        <p className="text-white text-base lg:text-lg leading-relaxed mb-6 max-w-2xl">&ldquo;{t.text}&rdquo;</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">{t.photo}</div>
            <div>
              <p className="text-sm font-bold text-white">{t.name}</p>
              <p className="text-xs text-emerald-200">{t.city}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setIdx(i => i > 0 ? i - 1 : testimonials.length - 1)}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button onClick={() => setIdx(i => i < testimonials.length - 1 ? i + 1 : 0)}
              className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5 mt-5">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-white" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

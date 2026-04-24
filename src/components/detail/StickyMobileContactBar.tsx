"use client";
import { Phone, MessageCircle, Mail } from "lucide-react";

export default function StickyMobileContactBar({ phone, propertyId }: { phone?: string; propertyId: number }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="flex items-center gap-2 px-4 py-3">
        {phone && (
          <a href={`tel:${phone}`} className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold">
            <Phone className="h-3.5 w-3.5" /> Call Agent
          </a>
        )}
        <a href={`https://wa.me/${phone?.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#25d366] text-white text-xs font-bold">
          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
        </a>
        <a href="#inquiry" className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-xs font-bold">
          <Mail className="h-3.5 w-3.5" /> Inquire
        </a>
      </div>
    </div>
  );
}

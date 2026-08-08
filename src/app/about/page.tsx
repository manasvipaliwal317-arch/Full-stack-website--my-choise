"use client";

import React from "react";
import Image from "next/image";
import { Award, ShieldCheck, Clock, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Heritage & Legacy</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white">The Zenvia Atelier Story</h1>
        <p className="text-sm text-zinc-300 font-light leading-relaxed">
          Founded in Geneva and Paris, Zenvia Atelier represents the pinnacle of luxury horlogerie, high-jewelry craftsmanship, and vegetable-tanned Florentine leather goods.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/10 aspect-[4/3]">
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"
            alt="Atelier Workshop"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-6 text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
          <h2 className="text-2xl font-serif font-bold text-white">Artisanal Perfection & Uncompromising Precision</h2>
          <p>
            Each Zenvia timepiece undergoes 400+ hours of micro-mechanical assembly by master horlogists in Geneva. Our flying tourbillon cages are crafted from aerospace-grade Grade 5 titanium, hand-beveled and mirror-polished to fractions of a micron.
          </p>
          <p>
            Our fine jewelry pieces utilize 100% ethically sourced Conflict-Free diamonds and recycled 18k solid gold, stamped with official atelier hallmarks.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 text-white font-serif">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="text-2xl font-bold gold-text-gradient">Geneva & Paris</span>
              <p className="text-[11px] font-sans text-zinc-400 mt-1">Master Workshops</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
              <span className="text-2xl font-bold gold-text-gradient">50 Pieces</span>
              <p className="text-[11px] font-sans text-zinc-400 mt-1">Global Limited Editions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

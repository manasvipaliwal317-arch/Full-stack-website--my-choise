"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/data";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Universes</span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white">Curated Luxury Categories</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-light">
          Explore rare horlogerie, 18K solid gold fine jewelry, and Italian calfskin leathercraft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className="group relative rounded-3xl overflow-hidden glass-card border border-white/10 aspect-[4/5] flex flex-col justify-end p-8"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="relative z-10 space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">
                {cat.productCount} Items Available
              </span>
              <h2 className="text-2xl font-serif font-bold text-white group-hover:text-luxury-gold transition-colors">
                {cat.name}
              </h2>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">{cat.description}</p>
              <div className="pt-2 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Discover Collection</span>
                <ArrowRight className="w-4 h-4 text-luxury-gold" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5" />
        <span>404 - Vault Object Unlocated</span>
      </div>

      <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white">Masterpiece Not Found</h1>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto font-light leading-relaxed">
        The requested timepiece, collection, or dossier address could not be located in our atelier register.
      </p>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxury-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-luxury-gold-dark transition-all shadow-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Atelier Storefront
        </Link>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, ProductItem } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Search, Sparkles } from "lucide-react";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);

  const results = PRODUCTS.filter((p) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atelier Vault Search</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Search Vault Register</h1>

        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-luxury-gold" />
          <input
            type="text"
            placeholder="Search Tourbillons, Gold Solitaire, Leather Briefcases..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold shadow-2xl"
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs text-zinc-400 border-b border-white/10 pb-4">
        <span>Found {results.length} results {query && `for "${query}"`}</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((product, idx) => (
          <ProductCard key={product.id} product={product} index={idx} />
        ))}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading Search...</div>}>
      <SearchContent />
    </Suspense>
  );
}

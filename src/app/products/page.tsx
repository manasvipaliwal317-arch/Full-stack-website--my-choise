"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS, ProductItem } from "@/lib/data";
import { Search, SlidersHorizontal, ArrowUpDown, Filter, Sparkles } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<ProductItem[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
  const [maxPrice, setMaxPrice] = useState<number>(20000);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    if (categoryParam) setSelectedCategory(categoryParam);
    if (searchParam !== null) setSearchQuery(searchParam);
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.categoryId === selectedCategory ||
      p.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPrice = (p.discountPrice || p.price) <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (sortOption === "price-low") return priceA - priceB;
    if (sortOption === "price-high") return priceB - priceA;
    if (sortOption === "rating") return b.rating - a.rating;
    return b.featured ? 1 : -1;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="relative rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 overflow-hidden text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Haute Atelier Register</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
          The Collector Vault Catalog
        </h1>
        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto font-light">
          Browse handcrafted Swiss chronographs, fine jewelry rings, and Italian leather weekender bags.
        </p>
      </div>

      {/* Controls Bar (Search, Category Pills, Sort) */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === "all"
                ? "bg-luxury-gold text-black shadow-md shadow-luxury-gold/20"
                : "bg-white/5 text-zinc-400 hover:text-white border border-white/10"
            }`}
          >
            All Items ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-luxury-gold text-black shadow-md shadow-luxury-gold/20"
                  : "bg-white/5 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e: any) => setSortOption(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold cursor-pointer"
            >
              <option value="featured" className="bg-zinc-900 text-white">Sort: Featured</option>
              <option value="price-low" className="bg-zinc-900 text-white">Price: Low to High</option>
              <option value="price-high" className="bg-zinc-900 text-white">Price: High to Low</option>
              <option value="rating" className="bg-zinc-900 text-white">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Info */}
      <div className="flex justify-between items-center text-xs text-zinc-400 px-2">
        <span>Showing {filteredProducts.length} of {PRODUCTS.length} Vault Items</span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-luxury-gold hover:underline"
          >
            Clear Search Filter
          </button>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center glass-card rounded-2xl p-8 space-y-4">
          <Filter className="w-12 h-12 text-zinc-600 mx-auto" />
          <h3 className="text-lg font-serif font-semibold text-white">No Masterpieces Found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            No items matched your current filter criteria. Try adjusting your search query or selected category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-6 py-2.5 rounded-full bg-luxury-gold text-black font-semibold text-xs transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-zinc-400">Loading Atelier Catalog...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

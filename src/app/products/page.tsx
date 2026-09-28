"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/product-card";
import { ProductItem } from "@/lib/data";
import { Search, SlidersHorizontal, ArrowUpDown, Filter, Sparkles, ShoppingBag } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";

  const { products, categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState<"featured" | "price-low" | "price-high" | "rating">("featured");
  const [maxPrice, setMaxPrice] = useState<number>(500000);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const subCategoryParam = searchParams.get("subCategory");
    const searchParam = searchParams.get("search");
    const brandParam = searchParams.get("brand");
    if (categoryParam) setSelectedCategory(categoryParam);
    if (subCategoryParam) setSelectedSubCategory(subCategoryParam);
    if (searchParam !== null) setSearchQuery(searchParam);
    else if (brandParam !== null) setSearchQuery(brandParam);
  }, [searchParams]);

  // Active Category Object & Subcategories
  const activeCategoryObj = categories.find(
    (c) => c.slug === selectedCategory || c.id === selectedCategory
  );
  const availableSubCategories = activeCategoryObj?.subCategories || [];

  // Filter & Sort Logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "all" ||
      p.categoryId === selectedCategory ||
      (activeCategoryObj && p.categoryId === activeCategoryObj.id) ||
      (activeCategoryObj && p.category.toLowerCase() === activeCategoryObj.name.toLowerCase()) ||
      p.category.toLowerCase().replace(/[^a-z0-9]/g, "") === selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      p.slug.replace(/[^a-z0-9]/g, "").includes(selectedCategory.toLowerCase().replace(/[^a-z0-9]/g, "")) ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase().replace("-", " "));

    const activeSubCatObj = activeCategoryObj?.subCategories?.find(
      (s) => s.slug === selectedSubCategory || s.id === selectedSubCategory
    );

    const matchesSubCategory =
      selectedSubCategory === "all" ||
      p.subCategoryId === selectedSubCategory ||
      (activeSubCatObj && p.subCategoryId === activeSubCatObj.id) ||
      p.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase() ||
      p.subCategory?.toLowerCase().replace(/[^a-z0-9]/g, "") === selectedSubCategory.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      (activeSubCatObj && p.subCategory?.toLowerCase().includes(activeSubCatObj.name.toLowerCase()));

    const matchesSearch =
      !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesPrice = (p.discountPrice || p.price) <= maxPrice;

    return matchesCategory && matchesSubCategory && matchesSearch && matchesPrice;
  }).sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;

    if (sortOption === "price-low") return priceA - priceB;
    if (sortOption === "price-high") return priceB - priceA;
    if (sortOption === "rating") return b.rating - a.rating;
    return b.featured ? 1 : -1;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-8 sm:p-12 overflow-hidden shadow-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Catalog & Deals</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Explore All Products
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto font-medium">
          Discover top-rated smartphones, wireless earbuds, smart watches, fashion apparel, beauty skincare, and accessories on my choise.
        </p>
      </div>

      {/* Controls Bar (Search, Category Pills, Department Sub-Pills, Sort) */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedSubCategory("all");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              All Products ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.slug);
                  setSelectedSubCategory("all");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.slug || selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

        {/* Search & Sort */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
            />
          </div>

          <div className="relative">
            <select
              value={sortOption}
              onChange={(e: any) => setSortOption(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-600 cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Department / Subcategory Filter Pills */}
      {availableSubCategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-3 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <span>Department:</span>
          </span>
          <button
            onClick={() => setSelectedSubCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubCategory === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            All {activeCategoryObj?.name}
          </button>
          {availableSubCategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubCategory(sub.slug)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubCategory === sub.slug || selectedSubCategory === sub.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {sub.name}
            </button>
          ))}
        </div>
      )}
    </div>

      {/* Product Results Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm p-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting the category filter.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 text-sm font-semibold">
          Loading catalog...
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

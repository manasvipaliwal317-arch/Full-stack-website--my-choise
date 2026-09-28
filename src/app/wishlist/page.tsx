"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Heart, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4 flex justify-between items-end">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-rose-600 mb-1 block">
            Saved Favorites
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            My Wishlist ({wishlist.length})
          </h1>
        </div>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4 max-w-md mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg font-black text-slate-900">Your Wishlist is Empty</h3>
          <p className="text-xs text-slate-500">
            Click the heart icon on any product to save it here for later.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            Explore Deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

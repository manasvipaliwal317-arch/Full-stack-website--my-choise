"use client";

import React from "react";
import { useCart } from "@/context/cart-context";
import { PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Heart, Sparkles } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useCart();
  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-white/10 pb-6 flex justify-between items-end">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Saved Atelier Collection</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Your Saved Wishlist ({wishlist.length})</h1>
        </div>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="py-20 text-center glass-card rounded-2xl p-8 space-y-4 max-w-md mx-auto">
          <Heart className="w-12 h-12 text-zinc-600 mx-auto stroke-[1.5]" />
          <h3 className="text-lg font-serif font-semibold text-white">Your Wishlist is Empty</h3>
          <p className="text-xs text-zinc-400">
            Click the heart icon on any masterwork in our catalog to save it to your private client register.
          </p>
          <Link href="/products" className="inline-block px-6 py-2.5 rounded-full bg-luxury-gold text-black font-bold text-xs">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

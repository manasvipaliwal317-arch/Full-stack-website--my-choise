"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShoppingBag, Eye, Heart } from "lucide-react";
import { ProductItem } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { QuickViewModal } from "./quick-view-modal";

interface ProductCardProps {
  product: ProductItem;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice || product.price);
  const inWishlist = isInWishlist(product.id);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        className="group relative rounded-2xl glass-card overflow-hidden flex flex-col justify-between"
      >
        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-3 inset-x-3 z-10 flex justify-between items-center pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {product.isNew && (
              <span className="bg-luxury-gold/90 text-black text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-md">
                New
              </span>
            )}
            {discountPercent > 0 && (
              <span className="bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md border border-red-400/30">
                -{discountPercent}%
              </span>
            )}
          </div>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`pointer-events-auto w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition-all ${
              inWishlist
                ? "bg-red-500/20 border-red-500/40 text-red-500"
                : "bg-black/40 border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500" : ""}`} />
          </button>
        </div>

        {/* Image Container with Hover Quick View */}
        <div className="relative w-full aspect-[4/5] bg-zinc-900 overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold hover:bg-white hover:text-black flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span className="uppercase tracking-wider font-semibold text-luxury-gold">{product.category}</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                <span className="font-semibold text-white text-xs">{product.rating}</span>
              </div>
            </div>

            <Link href={`/products/${product.id}`}>
              <h3 className="text-base font-serif font-semibold text-white group-hover:text-luxury-gold transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
            <p className="text-xs text-zinc-400 line-clamp-2 mt-1 font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500">Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-bold text-white">
                  {formatCurrency(product.discountPrice || product.price)}
                </span>
                {product.discountPrice && (
                  <span className="text-xs text-zinc-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-luxury-gold text-zinc-300 hover:text-black border border-white/10 hover:border-luxury-gold flex items-center justify-center transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <QuickViewModal product={product} onClose={() => setIsQuickViewOpen(false)} />
      )}
    </>
  );
}

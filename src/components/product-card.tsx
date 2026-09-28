"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingBag, Eye, Heart, Check, Sparkles } from "lucide-react";
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
  const [addedRecently, setAddedRecently] = useState(false);

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice || product.price);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1500);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.05 }}
        className="group relative rounded-2xl bg-white border border-slate-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
      >
        {/* Top Badges & Wishlist Button */}
        <div className="absolute top-2.5 inset-x-2.5 z-10 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            {discountPercent > 0 && (
              <span className="bg-amber-400 text-slate-900 text-[10px] font-black tracking-tight px-2 py-0.5 rounded-lg shadow-sm">
                -{discountPercent}%
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-lg shadow-sm">
                New
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.75 }}
            whileHover={{ scale: 1.15 }}
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={`pointer-events-auto w-8 h-8 rounded-full shadow-sm flex items-center justify-center transition-all ${
              inWishlist
                ? "bg-rose-50 text-rose-600 border border-rose-200"
                : "bg-white/90 backdrop-blur-sm border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-white"
            }`}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <motion.div animate={inWishlist ? { scale: [1, 1.4, 1] } : { scale: 1 }} transition={{ duration: 0.3 }}>
              <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
            </motion.div>
          </motion.button>
        </div>

        {/* Product Image & Quick View trigger */}
        <div className="relative w-full aspect-square bg-slate-50 overflow-hidden">
          <Link href={`/products/${product.id}`} className="block w-full h-full">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          </Link>

          {/* Quick View Hover Pill */}
          <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center">
            <button
              onClick={() => setIsQuickViewOpen(true)}
              className="w-full py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold rounded-xl backdrop-blur-sm flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Quick View</span>
            </button>
          </div>
        </div>

        {/* Product Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            {/* Category & Rating */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-[11px] text-blue-600 uppercase tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800 text-[11px]">{product.rating}</span>
                <span className="text-slate-600 text-[10px]">({product.numReviews})</span>
              </div>
            </div>

            {/* Title */}
            <Link href={`/products/${product.id}`}>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 leading-snug">
                {product.title}
              </h3>
            </Link>

            {/* Stock status indicator */}
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>In Stock</span>
            </div>
          </div>

          {/* Pricing & Add to Cart Action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base sm:text-lg font-black text-slate-900">
                  {formatCurrency(product.discountPrice || product.price)}
                </span>
                {product.discountPrice && (
                  <span className="text-xs text-slate-600 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.86 }}
              whileHover={{ scale: 1.08 }}
              onClick={handleAddToCart}
              className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center transition-colors shadow-sm ${
                addedRecently
                  ? "bg-emerald-600 text-white ring-2 ring-emerald-400/50 shadow-emerald-500/20"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
              }`}
              title="Add to Cart"
            >
              <AnimatePresence mode="wait">
                {addedRecently ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="bag"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
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

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { ProductItem } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import Image from "next/image";

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice || product.price);
  const inWishlist = isInWishlist(product.id);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-[#0F111A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden overflow-y-auto z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-zinc-400 hover:text-white border border-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column - Gallery */}
          <div className="p-6 bg-black/30 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-zinc-900 group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {discountPercent > 0 && (
                <span className="absolute top-3 left-3 bg-red-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-red-400/30">
                  -{discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      selectedImageIndex === idx ? "border-luxury-gold scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">
                  {product.category}
                </span>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                  In Stock ({product.stock} available)
                </span>
              </div>

              <h2 className="text-2xl font-serif font-bold text-white mt-2 mb-3">{product.title}</h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-white">{product.rating}</span>
                <span className="text-xs text-zinc-400">({product.numReviews} client reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-white gold-text-gradient">
                  {formatCurrency(product.discountPrice || product.price)}
                </span>
                {product.discountPrice && (
                  <span className="text-lg text-zinc-500 line-through">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Details List */}
              {product.details && product.details.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Specifications</h4>
                  <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
                    {product.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-white/10 rounded-xl bg-black/40 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-zinc-400 hover:text-white px-2 font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-semibold text-white px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-zinc-400 hover:text-white px-2 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    onClose();
                  }}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-luxury-gold/20 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Bag
                </button>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    inWishlist
                      ? "bg-red-500/10 border-red-500/30 text-red-500"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-[11px] text-zinc-400 text-center">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-luxury-gold" />
                  <span>Authenticity Guaranteed</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-luxury-gold" />
                  <span>Complimentary Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-luxury-gold" />
                  <span>30-Day Bespoke Returns</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

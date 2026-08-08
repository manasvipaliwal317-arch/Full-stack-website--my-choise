"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, Sparkles, CheckCircle } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    couponCode,
    applyCoupon,
    totalAmount,
    totalItems,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const freeShippingThreshold = 2000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    if (applyCoupon(inputCoupon)) {
      setCouponSuccess(`Coupon ${inputCoupon.toUpperCase()} applied!`);
    } else {
      setCouponError("Invalid promo code. Try 'ZENVIA10' or 'VIP20'");
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0F111A] border-l border-white/10 shadow-2xl z-50 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 flex items-center justify-center text-luxury-gold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-wide text-white">Your Atelier Bag</h2>
                  <p className="text-xs text-zinc-400">{totalItems} {totalItems === 1 ? "item" : "items"} selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="bg-white/[0.02] p-4 border-b border-white/5">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-zinc-300 font-medium">
                  {remainingForFreeShipping === 0
                    ? "✨ Complimentary White-Glove Shipping Unlocked!"
                    : `Add ${formatCurrency(remainingForFreeShipping)} more for Free Express Shipping`}
                </span>
                <span className="text-luxury-gold font-semibold">{Math.round(progressToFreeShipping)}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToFreeShipping}%` }}
                  className="h-full bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 mb-4">
                    <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Your Bag is Empty</h3>
                  <p className="text-sm text-zinc-400 max-w-xs mb-6">
                    Explore our haute horlogerie, fine jewelry, and artisanal leather pieces.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-luxury-gold hover:bg-luxury-gold-dark text-black font-semibold text-sm transition-all shadow-lg shadow-luxury-gold/20"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                cart.map(({ product, quantity }) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-medium text-white line-clamp-1">{product.title}</h4>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-luxury-gold mt-0.5">{product.category}</p>
                      </div>

                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm font-semibold text-white">
                          {formatCurrency(product.discountPrice || product.price)}
                        </span>

                        <div className="flex items-center border border-white/10 rounded-full bg-black/40 px-2 py-0.5">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium text-white px-2.5">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="p-1 text-zinc-400 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#0B0C12] space-y-4">
                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (ZENVIA10)"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {couponSuccess && (
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> {couponSuccess}
                  </p>
                )}
                {couponError && <p className="text-xs text-red-400">{couponError}</p>}

                {/* Subtotal & Total */}
                <div className="space-y-1.5 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">{formatCurrency(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount ({couponCode})</span>
                      <span>-{formatCurrency(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax & Duties</span>
                    <span className="text-zinc-400">Calculated at Checkout</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold text-white pt-2 border-t border-white/10">
                    <span>Total Amount</span>
                    <span className="gold-text-gradient">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-luxury-gold/15 transition-all"
                >
                  Proceed to Secure Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

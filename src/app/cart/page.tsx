"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Sparkles } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, discount, totalAmount, totalItems, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-white/5 mx-auto flex items-center justify-center text-zinc-500">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-white">Your Atelier Bag is Empty</h2>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-sm mx-auto">
          Explore our haute horlogerie, 18K solid gold fine jewelry, and Italian leather weekender bags.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-luxury-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-luxury-gold-dark transition-all shadow-lg"
        >
          Explore Collections
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Your Order Selection</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">Shopping Bag ({totalItems})</h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-zinc-400 hover:text-red-400 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> Empty Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-4 sm:p-6 rounded-2xl glass-card border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                  <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest">
                    {product.category}
                  </span>
                  <h3 className="text-base font-serif font-semibold text-white line-clamp-1">{product.title}</h3>
                  <p className="text-xs text-zinc-400 font-light line-clamp-1">{product.description}</p>
                  <span className="text-sm font-bold text-white block pt-1">
                    {formatCurrency(product.discountPrice || product.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 border-t sm:border-t-0 pt-4 sm:pt-0 border-white/10">
                <div className="flex items-center border border-white/10 rounded-xl bg-black/40 px-3 py-1.5">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="text-zinc-400 hover:text-white px-2 font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-semibold text-white px-3">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="text-zinc-400 hover:text-white px-2 font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold gold-text-gradient block">
                    {formatCurrency((product.discountPrice || product.price) * quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 p-6 rounded-2xl glass-panel border border-white/10 space-y-6">
            <h3 className="text-lg font-serif font-bold text-white pb-4 border-b border-white/10">
              Order Summary
            </h3>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-white font-medium">{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Promotional Savings</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>White-Glove Shipping</span>
                <span className="text-emerald-400 font-semibold">Complimentary</span>
              </div>

              <div className="flex justify-between">
                <span>Duties & Import Taxes</span>
                <span className="text-zinc-400">Included</span>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-between items-baseline text-sm font-bold text-white">
                <span>Total Investment</span>
                <span className="text-xl gold-text-gradient">{formatCurrency(totalAmount)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-luxury-gold/20 transition-all"
            >
              Proceed to Secure Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-[11px] text-zinc-400 justify-center pt-2">
              <ShieldCheck className="w-4 h-4 text-luxury-gold" />
              <span>Protected by 256-Bit SSL Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

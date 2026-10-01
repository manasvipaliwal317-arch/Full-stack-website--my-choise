"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, discount, totalAmount, totalItems, clearCart } = useCart();

  const isFreeDelivery = subtotal >= 499;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          Explore trending smartphones, headphones, smart watches, fashion apparel, and footwear!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
        >
          Explore Products
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-200 pb-5">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Review Items</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
            Shopping Cart ({totalItems} items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-500 hover:text-rose-600 transition-colors flex items-center gap-1 font-semibold"
        >
          <Trash2 className="w-4 h-4" /> Empty Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="p-3.5 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
            >
              <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                  <Image src={product.images[0]} alt={product.title} fill sizes="96px" className="object-contain p-2" />
                </div>
                <div className="space-y-1 flex-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold text-blue-600 tracking-wider">
                    {product.category}
                  </span>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="text-xs sm:text-base font-bold text-slate-900 hover:text-blue-600 transition-colors line-clamp-1">
                      {product.title}
                    </h3>
                  </Link>
                  <p className="text-xs text-slate-500 line-clamp-1">{product.description}</p>
                  <span className="text-xs sm:text-sm font-black text-slate-900 block pt-0.5">
                    {formatCurrency(product.discountPrice || product.price)}
                  </span>
                </div>
              </div>

              {/* Quantity Controls & Remove */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 px-2.5 sm:px-3 py-1 sm:py-1.5">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="text-slate-500 hover:text-slate-900 px-2 font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-slate-900 px-2 sm:px-3">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="text-slate-500 hover:text-slate-900 px-2 font-bold"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <span className="text-sm sm:text-base font-black text-slate-900 block">
                    {formatCurrency((product.discountPrice || product.price) * quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-xs text-slate-400 hover:text-rose-600 font-medium transition-colors"
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
          <div className="sticky top-32 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-lg font-black text-slate-900 pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-slate-900 font-bold">{formatCurrency(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  <span>Standard Delivery</span>
                </span>
                <span className={`font-bold ${isFreeDelivery ? "text-emerald-600" : "text-slate-900"}`}>
                  {isFreeDelivery ? "FREE (Orders > ₹499)" : "₹49"}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                <span>Total Amount</span>
                <span className="text-xl font-black text-blue-600">
                  {formatCurrency(totalAmount + (isFreeDelivery ? 0 : 49))}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 transition-all hover:scale-[1.01]"
            >
              Proceed to Checkout
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

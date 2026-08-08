"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { INITIAL_ORDERS, PRODUCTS } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { User, Package, Heart, MapPin, Clock, CheckCircle2, ChevronRight, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";

export default function AccountPage() {
  const { wishlist } = useCart();
  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "addresses">("orders");

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-black font-serif font-bold text-2xl flex items-center justify-center shadow-xl">
            EV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-white">Lady Eleanor Vance</h1>
              <span className="bg-luxury-gold/20 text-luxury-gold border border-luxury-gold/40 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                VIP Collector
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">eleanor.vance@luxury.co • Client ID #ZENVIA-8832</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === "orders" ? "bg-luxury-gold text-black" : "bg-white/5 text-zinc-300 border border-white/10"
            }`}
          >
            <Package className="w-4 h-4" /> Order History
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
              activeTab === "wishlist" ? "bg-luxury-gold text-black" : "bg-white/5 text-zinc-300 border border-white/10"
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-white">Bespoke Orders Register</h2>

          <div className="space-y-4">
            {INITIAL_ORDERS.map((order) => (
              <div key={order.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-luxury-gold">{order.id}</span>
                    <span className="text-xs text-zinc-400 ml-3">Placed on {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-zinc-400">Status:</span>
                    <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                      order.status === "DELIVERED"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Items list */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10">
                          <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{item.title}</h4>
                          <span className="text-zinc-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-white">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping & Total */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-white/10 text-xs text-zinc-400 gap-2">
                  <p>Destination: <span className="text-white">{order.shippingAddress}</span></p>
                  <div className="text-sm font-bold text-white">
                    Total: <span className="gold-text-gradient">{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-white">Saved Vault Wishlist</h2>
          {wishlistProducts.length === 0 ? (
            <div className="p-12 text-center glass-card rounded-2xl space-y-3">
              <Heart className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-base font-semibold text-white">Your Wishlist is Empty</h3>
              <p className="text-xs text-zinc-400">Click the heart icon on any product to save it to your client register.</p>
              <Link href="/products" className="inline-block px-6 py-2 rounded-full bg-luxury-gold text-black text-xs font-bold">
                Explore Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistProducts.map((prod, idx) => (
                <ProductCard key={prod.id} product={prod} index={idx} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

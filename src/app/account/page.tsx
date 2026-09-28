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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-blue-500/20">
            AS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900">Aarav Sharma</h1>
              <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full">
                Gold Member
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">aarav.sharma@example.com • Member ID #MC-91823</p>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === "orders" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Package className="w-4 h-4" /> My Orders
          </button>
          <button
            onClick={() => setActiveTab("wishlist")}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
              activeTab === "wishlist" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Heart className="w-4 h-4" /> Wishlist ({wishlist.length})
          </button>
        </div>
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900">Recent Orders</h2>

          <div className="space-y-4">
            {INITIAL_ORDERS.map((order) => (
              <div key={order.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-600">{order.id}</span>
                    <span className="text-xs text-slate-500 ml-3">Placed on {formatDate(order.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {order.status}
                    </span>
                    <span className="text-sm font-black text-slate-900">{formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                          <Image src={item.image} alt={item.title} fill sizes="48px" className="object-contain p-1" />
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{item.title}</span>
                          <span className="text-slate-500">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Delivered to: {order.shippingAddress}</span>
                  </span>
                  <Link href={`/my-orders`} className="text-blue-600 font-bold hover:underline flex items-center gap-0.5">
                    View Tracking <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div className="space-y-6">
          <h2 className="text-xl font-black text-slate-900">Saved to Wishlist</h2>
          {wishlistProducts.length === 0 ? (
            <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
              <Heart className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">No items saved in wishlist yet.</p>
              <Link href="/products" className="inline-block px-5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs">
                Explore Deals
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlistProducts.map((p, idx) => (
                <ProductCard key={p.id} product={p} index={idx} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

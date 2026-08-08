"use client";

import React from "react";
import { INITIAL_ORDERS } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";

export default function MyOrdersPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Client Transactions</span>
        <h1 className="text-3xl font-serif font-bold text-white mt-1">My Orders & Tracking Timeline</h1>
      </div>

      <div className="space-y-6">
        {INITIAL_ORDERS.map((order) => (
          <div key={order.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-luxury-gold">{order.id}</span>
                <span className="text-xs text-zinc-400 ml-3">Placed on {formatDate(order.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                  order.status === "DELIVERED"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                }`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
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

            <div className="flex justify-between items-center pt-4 border-t border-white/10 text-xs text-zinc-400">
              <span>Destination: <span className="text-white">{order.shippingAddress}</span></span>
              <div className="text-sm font-bold text-white">
                Total: <span className="gold-text-gradient">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { INITIAL_ORDERS, InitialOrder } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { updateOrderStatusAction } from "@/app/actions/ecommerce";
import { Package, ShieldCheck, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import Image from "next/image";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<InitialOrder[]>(INITIAL_ORDERS);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: any) => {
    setUpdatingId(orderId);
    const res = await updateOrderStatusAction(orderId, newStatus);
    if (res.success) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
    setUpdatingId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Atelier Fulfillment Control</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white mt-2">Executive Order Management</h1>
      </div>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="p-6 rounded-2xl glass-card border border-white/10 space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-luxury-gold">{order.id}</span>
                  <span className="text-xs text-zinc-400">Placed on {formatDate(order.createdAt)}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-1">{order.customerName} ({order.customerEmail})</h4>
                <p className="text-xs text-zinc-400">{order.shippingAddress}</p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400">Order Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                  disabled={updatingId === order.id}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-luxury-gold font-semibold cursor-pointer"
                >
                  <option value="PENDING" className="bg-zinc-900 text-amber-300">PENDING</option>
                  <option value="PROCESSING" className="bg-zinc-900 text-blue-300">PROCESSING</option>
                  <option value="SHIPPED" className="bg-zinc-900 text-purple-300">SHIPPED</option>
                  <option value="DELIVERED" className="bg-zinc-900 text-emerald-300">DELIVERED</option>
                  <option value="CANCELLED" className="bg-zinc-900 text-red-300">CANCELLED</option>
                </select>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <span className="text-zinc-400">Quantity: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-white">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-zinc-400">Payment Status: <span className="text-emerald-400 font-bold">{order.paymentStatus}</span></span>
              <div className="text-sm font-bold text-white">
                Grand Total: <span className="gold-text-gradient">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

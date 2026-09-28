"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/store-context";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Package, ShieldCheck, Truck, CheckCircle2, Clock, XCircle, Check } from "lucide-react";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useStore();
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const handleStatusChange = (orderId: string, newStatus: any) => {
    setUpdatingId(orderId);
    updateOrderStatus(orderId, newStatus);
    setNotification(`Order #${orderId} status changed to ${newStatus}`);
    setTimeout(() => {
      setUpdatingId(null);
      setNotification(null);
    }, 2500);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Fulfillment & Dispatch</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">Customer Orders Management</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review customer checkouts, address details, and update shipping stages. Changes update customer order tracking immediately.
        </p>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="p-6 rounded-2xl border border-white/10 bg-[#0C0E18] space-y-4">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-bold text-blue-400">{order.id}</span>
                  <span className="text-xs text-zinc-400">Placed on {formatDate(order.createdAt)}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mt-1">
                  {order.customerName} ({order.customerEmail})
                </h4>
                <p className="text-xs text-zinc-400">{order.shippingAddress}</p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-400">Fulfillment Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                  disabled={updatingId === order.id}
                  className="bg-zinc-900 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-semibold cursor-pointer"
                >
                  <option value="PENDING" className="bg-zinc-900 text-amber-300">PENDING</option>
                  <option value="PROCESSING" className="bg-zinc-900 text-blue-300">PROCESSING</option>
                  <option value="SHIPPED" className="bg-zinc-900 text-purple-300">SHIPPED</option>
                  <option value="DELIVERED" className="bg-zinc-900 text-emerald-300">DELIVERED</option>
                  <option value="CANCELLED" className="bg-zinc-900 text-rose-300">CANCELLED</option>
                </select>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image src={item.image} alt={item.title} fill sizes="48px" className="object-cover" />
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

            <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
              <span className="text-zinc-400">
                Payment Status: <span className="text-emerald-400 font-bold">{order.paymentStatus}</span>
              </span>
              <div className="text-sm font-bold text-white">
                Grand Total: <span className="text-blue-400 font-black">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

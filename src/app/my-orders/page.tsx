"use client";

import React from "react";
import { INITIAL_ORDERS } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Package, Truck, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MyOrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Track Purchases</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">My Orders & Tracking</h1>
      </div>

      <div className="space-y-5">
        {INITIAL_ORDERS.map((order) => (
          <div key={order.id} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-600">{order.id}</span>
                <span className="text-xs text-slate-500 ml-3">Placed on {formatDate(order.createdAt)}</span>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    order.status === "DELIVERED"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  ● {order.status}
                </span>
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
                      <h4 className="font-bold text-slate-900">{item.title}</h4>
                      <span className="text-slate-500">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-3 border-t border-slate-100 text-xs text-slate-500 gap-2">
              <span>Delivered to: <strong className="text-slate-800">{order.shippingAddress}</strong></span>
              <div className="text-sm font-bold text-slate-900">
                Total: <span className="text-blue-600 font-black">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

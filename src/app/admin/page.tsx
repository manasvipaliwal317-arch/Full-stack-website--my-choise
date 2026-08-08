"use client";

import React, { useState } from "react";
import Link from "next/link";
import { INITIAL_ORDERS, PRODUCTS, CUSTOMERS } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { DollarSign, ShoppingBag, Users, TrendingUp, ShieldCheck, Plus, Package, ArrowUpRight, AlertTriangle, Bell, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AdminDashboardPage() {
  const totalRevenue = INITIAL_ORDERS.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = INITIAL_ORDERS.length;
  const totalProducts = PRODUCTS.length;
  const totalCustomers = CUSTOMERS.length;

  const lowStockProducts = PRODUCTS.filter((p) => p.stock < 5);

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Executive Management Control</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-2">ZENVIA Executive Analytics</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-md animate-pulse" />
          </button>

          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl bg-luxury-gold text-black font-bold text-xs flex items-center gap-2 hover:bg-luxury-gold-dark transition-colors shadow-lg"
          >
            <Plus className="w-4 h-4" /> Add New Masterpiece
          </Link>
        </div>
      </div>

      {/* Notifications Drawer */}
      {notificationsOpen && (
        <div className="p-4 rounded-2xl bg-luxury-gold/10 border border-luxury-gold/30 text-xs text-white space-y-2">
          <div className="flex justify-between font-semibold text-luxury-gold">
            <span>Executive Notifications</span>
            <button onClick={() => setNotificationsOpen(false)}>Dismiss</button>
          </div>
          <ul className="space-y-1 text-zinc-300">
            <li>• New VIP order #ORD-98231 requires white-glove courier dispatch.</li>
            <li>• Stock for Verve Obsidian 18K Ring reached critical threshold (2 units left).</li>
          </ul>
        </div>
      )}

      {/* Low Stock Warning Alert */}
      {lowStockProducts.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-bold text-amber-300">Low Inventory Alert ({lowStockProducts.length} Items)</h4>
              <p className="text-zinc-300">
                {lowStockProducts.map((p) => `${p.title} (${p.stock} remaining)`).join(", ")}
              </p>
            </div>
          </div>
          <Link
            href="/admin/inventory"
            className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs hover:bg-amber-400 shrink-0"
          >
            Manage Stock
          </Link>
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Total Revenue</span>
            <DollarSign className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="text-3xl font-bold text-white gold-text-gradient">{formatCurrency(totalRevenue)}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24.8% vs last month
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="text-3xl font-bold text-white">{totalOrders} Orders</div>
          <div className="text-[11px] text-emerald-400 pt-1">100% Fulfillment Rate</div>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Total Products</span>
            <Package className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="text-3xl font-bold text-white">{totalProducts} Items</div>
          <div className="text-[11px] text-zinc-400 pt-1">5 Haute Categories</div>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Total Customers</span>
            <Users className="w-4 h-4 text-luxury-gold" />
          </div>
          <div className="text-3xl font-bold text-white">{totalCustomers} Clients</div>
          <div className="text-[11px] text-luxury-gold pt-1">VIP Register</div>
        </div>
      </div>

      {/* Interactive SVG Sales Growth Chart */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-serif font-bold text-white">Quarterly Sales Performance</h3>
            <p className="text-xs text-zinc-400">Revenue growth breakdown (USD)</p>
          </div>
          <span className="text-xs text-luxury-gold font-bold bg-luxury-gold/10 px-3 py-1 rounded-full border border-luxury-gold/30">
            +32% Annual Growth
          </span>
        </div>

        {/* SVG Sales Curve */}
        <div className="w-full h-48 relative flex items-end justify-between pt-6 px-2">
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 150">
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,130 Q75,90 150,110 T300,50 T450,20 L500,10 L500,150 L0,150 Z"
              fill="url(#salesGrad)"
            />
            <path
              d="M0,130 Q75,90 150,110 T300,50 T450,20 L500,10"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
            />
          </svg>
          <div className="relative z-10 w-full flex justify-between text-[11px] text-zinc-400 font-mono pt-40">
            <span>May ($12.4k)</span>
            <span>Jun ($15.8k)</span>
            <span>Jul ($18.2k)</span>
            <span>Aug ($23.0k)</span>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-serif font-bold text-white">Recent Client Orders</h3>
            <Link href="/admin/orders" className="text-xs text-luxury-gold hover:underline flex items-center gap-1">
              View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_ORDERS.map((order) => (
              <div key={order.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-xs">
                <div>
                  <h4 className="font-semibold text-white">{order.customerName}</h4>
                  <span className="text-zinc-500 font-mono">{order.id} • {formatDate(order.createdAt)}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-white block">{formatCurrency(order.totalAmount)}</span>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-serif font-bold text-white">Low Stock Warning</h3>
            <Link href="/admin/inventory" className="text-xs text-luxury-gold hover:underline flex items-center gap-1">
              Inventory <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white line-clamp-1">{p.title}</h4>
                    <span className="text-zinc-400">{p.category}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-full">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

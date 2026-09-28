"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/context/store-context";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  ShieldCheck,
  Plus,
  Package,
  ArrowUpRight,
  AlertTriangle,
  Bell,
  CheckCircle,
  FolderTree,
  Tag,
  Zap,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { products, categories, orders, settings } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalCategories = categories.length;

  const lowStockProducts = products.filter((p) => p.stock < 5);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Master Store Control</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight mt-2">
            {settings.storeName.toUpperCase()} Executive Analytics
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time management dashboard with instant synchronization across the storefront.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {lowStockProducts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <Link
            href="/admin/products"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" /> Manage Catalog
          </Link>
        </div>
      </div>

      {/* Notifications Drawer */}
      {notificationsOpen && (
        <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 text-xs text-white space-y-2">
          <div className="flex justify-between font-semibold text-blue-400">
            <span>Executive Alerts</span>
            <button onClick={() => setNotificationsOpen(false)}>Dismiss</button>
          </div>
          <ul className="space-y-1.5 text-zinc-300">
            <li>• Catalog has {totalProducts} active products across {totalCategories} departments.</li>
            {lowStockProducts.length > 0 && (
              <li className="text-amber-300">• {lowStockProducts.length} items require inventory restocking.</li>
            )}
            <li>• Storefront operating in real-time mode: changes apply instantly without reload.</li>
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
                {lowStockProducts.map((p) => `${p.title.slice(0, 30)}... (${p.stock} remaining)`).join(", ")}
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
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0E18] space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Total Gross Sales</span>
            <DollarSign className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">{formatCurrency(totalRevenue)}</div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 pt-1 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" /> +28.4% vs last month
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0E18] space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Active Orders</span>
            <ShoppingBag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-black text-white">{totalOrders} Orders</div>
          <div className="text-[11px] text-emerald-400 pt-1 font-semibold">100% Fulfillment Rate</div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0E18] space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Live Products in Store</span>
            <Package className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white">{totalProducts} Items</div>
          <div className="text-[11px] text-blue-400 pt-1 font-semibold">{totalCategories} Active Departments</div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-[#0C0E18] space-y-2">
          <div className="flex justify-between items-center text-zinc-400 text-xs">
            <span>Departments & Lines</span>
            <FolderTree className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white">{totalCategories} Categories</div>
          <div className="text-[11px] text-zinc-400 pt-1">24 Subcategories Covered</div>
        </div>
      </div>

      {/* Recent Orders & Low Stock Warning */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 rounded-2xl p-6 border border-white/10 bg-[#0C0E18] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Recent Customer Orders</h3>
            <Link href="/admin/orders" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              View All Orders <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <h4 className="font-semibold text-white">{order.customerName}</h4>
                  <span className="text-zinc-500 font-mono">
                    {order.id} • {formatDate(order.createdAt)}
                  </span>
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

        <div className="lg:col-span-5 rounded-2xl p-6 border border-white/10 bg-[#0C0E18] space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Critical Stock Watch</h3>
            <Link href="/admin/inventory" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
              Inventory <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <p className="text-xs text-zinc-500 p-4 text-center">All inventory levels are healthy!</p>
            ) : (
              lowStockProducts.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image src={p.images[0]} alt={p.title} fill sizes="40px" className="object-cover" />
                    </div>
                    <div className="min-w-0 max-w-[170px]">
                      <h4 className="font-semibold text-white truncate">{p.title}</h4>
                      <span className="text-zinc-400 text-[10px]">{p.category}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full shrink-0">
                    {p.stock} left
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

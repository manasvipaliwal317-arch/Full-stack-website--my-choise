"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/store-context";
import { formatCurrency } from "@/lib/utils";
import { Boxes, AlertTriangle, Plus, Minus, Search, Check, ShieldCheck } from "lucide-react";

export default function AdminInventoryPage() {
  const { products, updateStock } = useStore();
  const [search, setSearch] = useState("");
  const [filterLowStock, setFilterLowStock] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdjust = (id: string, delta: number, title: string) => {
    updateStock(id, delta, true);
    showNotification(`Stock adjusted for "${title}"`);
  };

  const filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());

    const matchLow = filterLowStock ? p.stock < 5 : true;
    return matchSearch && matchLow;
  });

  const lowStockCount = products.filter((p) => p.stock < 5).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Boxes className="w-3.5 h-3.5" />
            <span>Real-Time Warehousing</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Inventory Control & Stock Adjustments</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time stock balance across all catalog items. Adjustments take effect immediately on public shop pages and prevent overselling.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterLowStock(!filterLowStock)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-colors ${
              filterLowStock
                ? "bg-amber-500/20 border-amber-500 text-amber-300"
                : "bg-white/5 border-white/10 text-zinc-300 hover:text-white"
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Low Stock Filter ({lowStockCount})</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
        <input
          type="text"
          placeholder="Filter by product name, SKU, or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#11131F] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden bg-[#0A0C14]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/5 border-b border-white/10 text-white font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Item Details</th>
                <th className="p-4">Department</th>
                <th className="p-4">Unit Value</th>
                <th className="p-4">Stock Health</th>
                <th className="p-4 text-center">Live Units Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image src={item.images[0]} alt={item.title} fill sizes="44px" className="object-cover" />
                    </div>
                    <div className="max-w-xs sm:max-w-md">
                      <h4 className="font-semibold text-white line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{item.id}</span>
                    </div>
                  </td>
                  <td className="p-4 text-blue-400 font-medium">{item.category}</td>
                  <td className="p-4 font-bold text-white">{formatCurrency(item.discountPrice || item.price)}</td>
                  <td className="p-4">
                    {item.stock === 0 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                        Out of Stock
                      </span>
                    ) : item.stock < 5 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" /> Critical ({item.stock} Units)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        Optimal ({item.stock} Units)
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center border border-white/10 rounded-xl bg-black/40 px-2.5 py-1">
                      <button
                        onClick={() => handleAdjust(item.id, -1, item.title)}
                        disabled={item.stock <= 0}
                        className="p-1 text-zinc-400 hover:text-white disabled:opacity-30"
                        title="Deduct 1 unit"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold text-white px-3">{item.stock}</span>
                      <button
                        onClick={() => handleAdjust(item.id, 1, item.title)}
                        className="p-1 text-zinc-400 hover:text-white"
                        title="Add 1 unit"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

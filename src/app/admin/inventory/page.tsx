"use client";

import React, { useState } from "react";
import { PRODUCTS, ProductItem } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Boxes, AlertTriangle, Plus, Minus } from "lucide-react";
import Image from "next/image";

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<ProductItem[]>(PRODUCTS);

  const handleStockUpdate = (id: string, delta: number) => {
    setInventory(
      inventory.map((item) =>
        item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <Boxes className="w-3.5 h-3.5" />
          <span>Vault Stock Levels</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Inventory Control & Stock Adjustments</h1>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/5 border-b border-white/10 text-white font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Vault Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Unit Value</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-center">Adjust Units</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02]">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image src={item.images[0]} alt={item.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{item.id}</span>
                    </div>
                  </td>
                  <td className="p-4 text-luxury-gold font-medium">{item.category}</td>
                  <td className="p-4 font-bold text-white">{formatCurrency(item.discountPrice || item.price)}</td>
                  <td className="p-4">
                    {item.stock < 5 ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
                        <AlertTriangle className="w-3 h-3" /> Low Stock ({item.stock} Units)
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                        Optimal ({item.stock} Units)
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center border border-white/10 rounded-xl bg-black/40 px-2 py-1">
                      <button
                        onClick={() => handleStockUpdate(item.id, -1)}
                        className="p-1 text-zinc-400 hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-white px-3">{item.stock}</span>
                      <button
                        onClick={() => handleStockUpdate(item.id, 1)}
                        className="p-1 text-zinc-400 hover:text-white"
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

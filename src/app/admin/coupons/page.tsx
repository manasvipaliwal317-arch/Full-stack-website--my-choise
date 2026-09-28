"use client";

import React, { useState } from "react";
import { useStore } from "@/context/store-context";
import { Ticket, Plus, Trash2, X, Check } from "lucide-react";

export default function AdminCouponsPage() {
  const { coupons, addCoupon, deleteCoupon } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("15");
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    addCoupon({
      code: code.trim().toUpperCase(),
      discountPercent: parseInt(discountPercent, 10) || 10,
      validUntil: "2026-12-31",
    });

    setIsModalOpen(false);
    showNotification(`Coupon code "${code.trim().toUpperCase()}" created and active!`);
    setCode("");
  };

  const handleDelete = (id: string, couponCode: string) => {
    if (confirm(`Delete coupon "${couponCode}"?`)) {
      deleteCoupon(id);
      showNotification(`Coupon "${couponCode}" deactivated and deleted.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Discount Engine</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Coupons & Promo Codes</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Create storewide promo codes. Customers can apply these codes in the cart drawer and checkout immediately.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      {notification && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{notification}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="rounded-2xl p-5 border border-white/10 bg-[#0C0E18] space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono font-black text-blue-400 text-xl tracking-wider block">{c.code}</span>
                <span className="text-xs font-semibold text-white mt-0.5 block">{c.discountPercent}% OFF Cart Total</span>
              </div>
              <button
                onClick={() => handleDelete(c.id, c.code)}
                className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                title="Delete Coupon"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-400 border-t border-white/5 pt-2">
              <span>Valid until {c.validUntil}</span>
              <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {c.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-[#0F111A] border border-white/15 rounded-3xl p-6 z-10 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Create Promo Code</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Coupon Code (Uppercase)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FLASH30"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="90"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-zinc-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

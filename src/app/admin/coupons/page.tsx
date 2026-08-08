"use client";

import React, { useState } from "react";
import { COUPONS, CouponItem } from "@/lib/data";
import { Ticket, Plus, Trash2, X } from "lucide-react";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>(COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("15");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: CouponItem = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase(),
      discountPercent: parseInt(discountPercent),
      validUntil: "2026-12-31",
      status: "ACTIVE",
      usageCount: 0,
    };
    setCoupons([newCoupon, ...coupons]);
    setIsModalOpen(false);
    setCode("");
  };

  const handleDelete = (id: string) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Ticket className="w-3.5 h-3.5" />
            <span>Promotional Engine</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Coupons & Promo Codes</h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-luxury-gold text-black font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((c) => (
          <div key={c.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono font-bold text-luxury-gold text-lg">{c.code}</span>
                <span className="text-xs text-white block">{c.discountPercent}% Discount</span>
              </div>
              <button onClick={() => handleDelete(c.id)} className="text-zinc-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="flex justify-between items-center text-[11px] text-zinc-400 border-t border-white/5 pt-2">
              <span>Valid until {c.validUntil}</span>
              <span className="font-bold text-emerald-400">{c.usageCount} Uses</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-[#0F111A] border border-white/10 rounded-2xl p-6 z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif font-bold text-white">Create Promo Code</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="SUMMER25"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  required
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-luxury-gold text-black font-bold text-xs uppercase">
                Save Code
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

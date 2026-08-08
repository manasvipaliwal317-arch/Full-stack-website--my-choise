"use client";

import React from "react";
import { CUSTOMERS } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Users, Award } from "lucide-react";

export default function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <Users className="w-3.5 h-3.5" />
          <span>VIP Directory</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Registered VIP Collectors</h1>
      </div>

      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/5 border-b border-white/10 text-white font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Collector</th>
                <th className="p-4">Membership Tier</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Lifetime Spend</th>
                <th className="p-4">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {CUSTOMERS.map((cust) => (
                <tr key={cust.id} className="hover:bg-white/[0.02]">
                  <td className="p-4">
                    <h4 className="font-semibold text-white">{cust.name}</h4>
                    <span className="text-[10px] text-zinc-500">{cust.email}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-luxury-gold font-bold bg-luxury-gold/10 border border-luxury-gold/30 px-2.5 py-0.5 rounded-full">
                      {cust.tier}
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-white">{cust.ordersCount} Orders</td>
                  <td className="p-4 font-bold text-white gold-text-gradient">
                    {formatCurrency(cust.totalSpent)}
                  </td>
                  <td className="p-4 text-zinc-400">{cust.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

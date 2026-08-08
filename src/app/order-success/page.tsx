"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Printer } from "lucide-react";
import { InvoiceModal } from "@/components/invoice-modal";
import { INITIAL_ORDERS } from "@/lib/data";

export default function OrderSuccessPage() {
  const [showInvoice, setShowInvoice] = useState(false);
  const sampleOrder = INITIAL_ORDERS[0];

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-2xl">
        <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-luxury-gold">Transaction Sealed</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">Order Confirmed & Register Recorded</h1>
        <p className="text-xs text-zinc-400">
          Order Reference: <span className="font-mono text-luxury-gold font-bold">ORD-98231</span>
        </p>
      </div>

      <div className="p-6 rounded-2xl glass-panel border border-white/10 text-left space-y-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h4 className="text-xs uppercase font-bold text-white">White-Glove Shipping Summary</h4>
          <button
            onClick={() => setShowInvoice(true)}
            className="text-xs text-luxury-gold hover:underline flex items-center gap-1 font-semibold"
          >
            <Printer className="w-3.5 h-3.5" /> View Official Invoice
          </button>
        </div>
        <div className="text-xs text-zinc-300 space-y-1">
          <p className="font-semibold text-white">Lady Eleanor Vance</p>
          <p>740 Park Avenue, Apt 14B, New York, NY 10021</p>
          <p className="text-luxury-gold pt-2 font-medium">Delivery Method: Express Insured Courier (48h)</p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <Link
          href="/account"
          className="px-6 py-3 rounded-full bg-luxury-gold text-black font-bold text-xs hover:bg-luxury-gold-dark transition-colors"
        >
          View Order History
        </Link>
        <Link
          href="/products"
          className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-colors flex items-center gap-2"
        >
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {showInvoice && <InvoiceModal order={sampleOrder} onClose={() => setShowInvoice(false)} />}
    </div>
  );
}

"use client";

import React from "react";
import { X, Printer, ShieldCheck, Download } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface InvoiceModalProps {
  order: any;
  onClose: () => void;
}

export function InvoiceModal({ order, onClose }: InvoiceModalProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

      <div className="relative w-full max-w-2xl bg-[#0F111A] border border-white/10 rounded-3xl p-6 sm:p-8 z-10 space-y-6 overflow-hidden text-zinc-200">
        {/* Actions Bar */}
        <div className="flex justify-between items-center border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-luxury-gold" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">ZENVIA Official Invoice</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-1.5 rounded-lg bg-luxury-gold text-black font-bold text-xs flex items-center gap-1.5 hover:bg-luxury-gold-dark transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1.5 text-zinc-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Header */}
        <div className="space-y-6 print:text-black">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-serif font-bold text-white tracking-widest">ZENVIA ATELIER S.A.</h2>
              <p className="text-xs text-zinc-400">Rue du Rhône 28, 1204 Geneva, Switzerland</p>
              <p className="text-xs text-zinc-400">VAT ID: CHE-982.104.882</p>
            </div>

            <div className="text-right">
              <span className="text-sm font-mono font-bold text-luxury-gold">{order.id}</span>
              <p className="text-xs text-zinc-400">Date: {formatDate(order.createdAt || new Date())}</p>
              <p className="text-xs text-emerald-400 font-semibold">Status: PAID</p>
            </div>
          </div>

          {/* Recipient Details */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs space-y-1">
            <h4 className="font-bold text-white uppercase tracking-wider mb-1">Billed & Shipped To</h4>
            <p className="font-semibold text-white">{order.customerName}</p>
            <p className="text-zinc-300">{order.shippingAddress}</p>
            <p className="text-zinc-400">{order.customerEmail}</p>
          </div>

          {/* Line Items Table */}
          <div className="border border-white/10 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-white uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-3">Masterpiece</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {order.items?.map((item: any, idx: number) => (
                  <tr key={idx}>
                    <td className="p-3 font-medium text-white">{item.title}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">{formatCurrency(item.price)}</td>
                    <td className="p-3 text-right font-semibold text-white">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Calculation */}
          <div className="flex justify-end text-xs">
            <div className="w-64 space-y-1.5 text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>White-Glove Shipping</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-white/10">
                <span>Total Amount Paid</span>
                <span className="gold-text-gradient">{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

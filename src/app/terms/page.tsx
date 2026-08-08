"use client";

import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Legal Governance</span>
        <h1 className="text-3xl font-serif font-bold text-white mt-1">Terms & Conditions of Sale</h1>
        <p className="text-xs text-zinc-400 mt-1">Effective Date: August 2026 • Zenvia Atelier S.A.</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <section className="space-y-2">
          <h3 className="text-base font-serif font-bold text-white">1. Authenticity & Limited Editions</h3>
          <p>
            All timepieces, fine jewelry, and leather goods sold by Zenvia Atelier S.A. are guaranteed authentic, accompanied by an official physical Certificate of Authenticity stamped with unique edition numbers.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-serif font-bold text-white">2. White-Glove Shipping & Insurance</h3>
          <p>
            Orders are dispatched via fully insured high-value global couriers. Title and risk of loss transfer to the client upon physical delivery confirmation signature.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-serif font-bold text-white">3. Returns & Bespoke Orders</h3>
          <p>
            Standard stock items are eligible for 30-day complimentary returns provided security tags remain intact. Custom engravings and bespoke gemstone commissions are final sale.
          </p>
        </section>
      </div>
    </div>
  );
}

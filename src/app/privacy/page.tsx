"use client";

import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-zinc-300 text-xs sm:text-sm font-light leading-relaxed">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Legal Governance</span>
        <h1 className="text-3xl font-serif font-bold text-white mt-1">Privacy Policy & Client Data Protection</h1>
        <p className="text-xs text-zinc-400 mt-1">Effective Date: August 2026 • Zenvia Atelier S.A.</p>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        <section className="space-y-2">
          <h3 className="text-base font-serif font-bold text-white">1. Client Confidentiality Standards</h3>
          <p>
            At Zenvia Atelier S.A., client confidentiality is held to Swiss banking secrecy protocols. All client records, order references, transaction values, and delivery destinations are encrypted using 256-bit AES standards.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-serif font-bold text-white">2. Information Collection</h3>
          <p>
            We collect personal identification data exclusively for order fulfillment, certificate of authenticity registration, and private concierge communication. We never sell or share client information with third-party marketing entities.
          </p>
        </section>

        <section className="space-y-2">
          <h3 className="text-base font-serif font-bold text-white">3. Security & Payment Processing</h3>
          <p>
            Payment instruments are processed via PCI-DSS Level 1 certified payment gateways. Credit card numbers and bank credentials are never stored on our servers.
          </p>
        </section>
      </div>
    </div>
  );
}

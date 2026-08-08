"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, RefreshCw, Award, Lock, CheckCircle2 } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#07080C] border-t border-white/10 text-zinc-400 text-xs pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Value Proposition Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
          <div className="flex flex-col items-center gap-2 p-2">
            <Award className="w-6 h-6 text-luxury-gold stroke-[1.5]" />
            <h4 className="text-sm font-semibold text-white">Authenticity Certificate</h4>
            <p className="text-[11px] text-zinc-400">Verified mastercraftsmanship with every order.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <ShieldCheck className="w-6 h-6 text-luxury-gold stroke-[1.5]" />
            <h4 className="text-sm font-semibold text-white">White-Glove Delivery</h4>
            <p className="text-[11px] text-zinc-400">Insured express global courier shipping.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <RefreshCw className="w-6 h-6 text-luxury-gold stroke-[1.5]" />
            <h4 className="text-sm font-semibold text-white">Complimentary Returns</h4>
            <p className="text-[11px] text-zinc-400">30-day hassle-free concierge return policy.</p>
          </div>
          <div className="flex flex-col items-center gap-2 p-2">
            <Lock className="w-6 h-6 text-luxury-gold stroke-[1.5]" />
            <h4 className="text-sm font-semibold text-white">Encrypted Payments</h4>
            <p className="text-[11px] text-zinc-400">Bank-level 256-bit SSL encryption standards.</p>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Info & VIP Newsletter */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-luxury-gold-dark to-luxury-gold text-black font-bold font-serif flex items-center justify-center text-base">
                Z
              </div>
              <span className="font-serif tracking-widest text-lg font-bold text-white">ZENVIA ATELIER</span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              Curating rare tourbillons, ethically sourced high-jewelry, and Italian leathercraft for discerning connoisseurs worldwide.
            </p>

            <div className="pt-2">
              <h5 className="text-xs uppercase font-semibold tracking-wider text-white mb-2">
                Join the Private Collector Gazette
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Welcome to the Zenvia Atelier Private Register.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter client email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-luxury-gold text-black font-bold text-xs hover:bg-luxury-gold-dark transition-colors shrink-0 flex items-center gap-1"
                  >
                    Join <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Haute Collections</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/products?category=horlogerie" className="hover:text-luxury-gold transition-colors">
                  Swiss Tourbillons
                </Link>
              </li>
              <li>
                <Link href="/products?category=jewelry" className="hover:text-luxury-gold transition-colors">
                  18K Solitaire Jewelry
                </Link>
              </li>
              <li>
                <Link href="/products?category=leather-goods" className="hover:text-luxury-gold transition-colors">
                  Florentine Leather
                </Link>
              </li>
              <li>
                <Link href="/products?category=audio" className="hover:text-luxury-gold transition-colors">
                  Audiophile Sound Systems
                </Link>
              </li>
              <li>
                <Link href="/products?category=fragrance" className="hover:text-luxury-gold transition-colors">
                  Niche Amber Perfumery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Concierge Services</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/account" className="hover:text-luxury-gold transition-colors">
                  Track Order Status
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-luxury-gold transition-colors">
                  Bespoke Customization
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-luxury-gold transition-colors">
                  White Glove Checkout
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-luxury-gold transition-colors text-luxury-gold font-medium">
                  Admin Executive Portal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold text-white mb-4">Global Flagships</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>Paris: 14 Place Vendôme</li>
              <li>Geneva: Rue du Rhône 28</li>
              <li>New York: 740 Fifth Avenue</li>
              <li>Tokyo: Ginza 6-Chome</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© 2026 Zenvia Atelier S.A. All rights reserved. Crafted for luxury e-commerce.</p>
          <div className="flex gap-6">
            <span className="hover:text-zinc-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-zinc-300 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

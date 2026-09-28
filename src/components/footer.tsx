"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  CheckCircle2,
  Mail,
  Heart,
} from "lucide-react";

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
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-xs pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* WHY SHOP WITH US / TRUST BADGES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Fast Delivery</h4>
              <p className="text-[11px] text-slate-500 font-medium">Free on orders above ₹499</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">100% Secure Payment</h4>
              <p className="text-[11px] text-slate-500 font-medium">Bank-grade 256-bit encryption</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">7-Day Easy Returns</h4>
              <p className="text-[11px] text-slate-500 font-medium">Hassle-free instant refunds</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">24/7 Dedicated Support</h4>
              <p className="text-[11px] text-slate-500 font-medium">Live chat and phone helpline</p>
            </div>
          </div>
        </div>

        {/* MAIN FOOTER COLUMNS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group select-none">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900 p-0.5 shadow-md shadow-blue-950/30 group-hover:scale-105 transition-all">
                <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
                  <svg className="w-5 h-5" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M24 10C21.5 7 17.5 6 12.5 8C7.5 10 5 14.5 5 19.5C5 24.5 8.5 27 13.5 27C18.5 27 22 24.5 23.5 21"
                      stroke="#38BDF8"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 20V12.5L15.5 17L20 12.5V20"
                      stroke="#FFFFFF"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="24.5" cy="8.5" r="2.2" fill="#F59E0B" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline font-brand leading-none">
                  <span className="text-xl font-semibold text-slate-900">my</span>
                  <span className="text-xl font-extrabold ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                    choise
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 ml-1 inline-block animate-pulse" />
                </div>
                <span className="text-[8px] tracking-[0.25em] uppercase font-bold text-slate-400 mt-0.5">
                  Curated Marketplace
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
              Your preferred destination for trending electronics, wearables, smart audio, fashion, and lifestyle essentials. High quality guaranteed with everyday lowest prices.
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-900 block mb-2">
                Subscribe for special offers & ₹100 discount coupon
              </span>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-semibold py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Coupon code CHOISE10 sent to your email!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    Subscribe <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/products?category=electronics" className="hover:text-blue-600 transition-colors">
                  Electronics & Gadgets
                </Link>
              </li>
              <li>
                <Link href="/products?category=smart-watches" className="hover:text-blue-600 transition-colors">
                  Smart Watches & Fitness
                </Link>
              </li>
              <li>
                <Link href="/products?category=audio" className="hover:text-blue-600 transition-colors">
                  Headphones & Audio
                </Link>
              </li>
              <li>
                <Link href="/products?category=laptops" className="hover:text-blue-600 transition-colors">
                  Laptops & Computers
                </Link>
              </li>
              <li>
                <Link href="/products?category=fashion" className="hover:text-blue-600 transition-colors">
                  Men & Women Fashion
                </Link>
              </li>
              <li>
                <Link href="/products?category=footwear" className="hover:text-blue-600 transition-colors">
                  Footwear & Sneakers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-3">Customer Support</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/my-orders" className="hover:text-blue-600 transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Returns & Replacements
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Shipping Policies & Rates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Contact Us (24/7)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links / Legal */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-slate-900 mb-3">About & Policies</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">
                  About my choise
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors">
                  Help & FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT ROW */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] font-medium">
          <p>© 2026 my choise. All rights reserved. Registered trademark.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">UPI</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">VISA</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">Mastercard</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">RuPay</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">NetBanking</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

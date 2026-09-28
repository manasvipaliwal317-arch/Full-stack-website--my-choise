"use client";

import React, { useState } from "react";
import { useStore } from "@/context/store-context";
import { Settings, Save, ShieldCheck, Check } from "lucide-react";

export default function AdminSettingsPage() {
  const { settings, updateSettings } = useStore();

  const [storeName, setStoreName] = useState(settings.storeName || "my choise");
  const [tagline, setTagline] = useState(settings.tagline || "Curated Marketplace & Next-Gen Deals");
  const [currency, setCurrency] = useState(settings.currency || "INR (₹)");
  const [taxRate, setTaxRate] = useState(settings.taxRate?.toString() || "18");
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(
    settings.freeShippingThreshold?.toString() || "499"
  );
  const [supportEmail, setSupportEmail] = useState(settings.supportEmail || "support@mychoise.in");
  const [supportPhone, setSupportPhone] = useState(settings.supportPhone || "+91 1800 200 4567");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      tagline,
      currency,
      taxRate: parseFloat(taxRate) || 18,
      freeShippingThreshold: parseFloat(freeShippingThreshold) || 499,
      supportEmail,
      supportPhone,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Global Store Configurations</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">System & Store Settings</h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure branding, tax calculations, free delivery thresholds, and 24/7 customer help lines.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0C0E18] space-y-6 max-w-2xl">
        {saved && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Store settings saved and updated across entire website immediately!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Brand Name</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Storefront Tagline</label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="INR (₹)">India - INR (₹)</option>
                <option value="USD ($)">United States - USD ($)</option>
                <option value="EUR (€)">Europe - EUR (€)</option>
                <option value="GBP (£)">United Kingdom - GBP (£)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">GST / Tax Calculation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Free Shipping Order Threshold (₹)</label>
            <input
              type="number"
              required
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Official Support Email</label>
              <input
                type="email"
                required
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">24/7 Helpline Phone</label>
              <input
                type="text"
                required
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all mt-4"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </form>
      </div>
    </div>
  );
}

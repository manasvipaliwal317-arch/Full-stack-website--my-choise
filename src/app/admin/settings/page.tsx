"use client";

import React, { useState } from "react";
import { Settings, Save, ShieldCheck } from "lucide-react";

export default function AdminSettingsPage() {
  const [storeName, setStoreName] = useState("Zenvia Atelier Geneva");
  const [currency, setCurrency] = useState("USD ($)");
  const [taxRate, setTaxRate] = useState("8.5");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <Settings className="w-3.5 h-3.5" />
          <span>Global Store Configurations</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">System Settings</h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 max-w-2xl">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            Global settings updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Store Front Designation</label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Base Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CHF (Fr.)">CHF (Fr.)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Tax Calculation Rate (%)</label>
              <input
                type="number"
                step="0.1"
                required
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" /> Save System Settings
          </button>
        </form>
      </div>
    </div>
  );
}

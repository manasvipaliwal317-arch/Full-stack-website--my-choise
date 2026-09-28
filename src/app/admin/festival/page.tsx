"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Clock,
  Save,
  RotateCcw,
  ExternalLink,
  Tag,
  Eye,
  Sliders,
  BellRing,
  Calendar,
  Gift,
  CheckCircle2,
  Percent,
} from "lucide-react";
import { useStore } from "@/context/store-context";
import { DEFAULT_FESTIVAL_SETTINGS, FestivalSettings } from "@/lib/data";
import { useToast } from "@/components/toast";

export default function AdminFestivalPage() {
  const { festivalSettings, updateFestivalSettings } = useStore();
  const { addToast } = useToast();

  const [form, setForm] = useState<FestivalSettings>(festivalSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync form when festivalSettings loads or updates
  useEffect(() => {
    setForm(festivalSettings);
  }, [festivalSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFestivalSettings(form);
    setSavedSuccess(true);
    addToast("Festival campaign settings saved successfully! Live store updated.", "success");
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleResetDefaults = () => {
    if (confirm("Reset festival offer settings to original Diwali Dhamaka defaults?")) {
      updateFestivalSettings(DEFAULT_FESTIVAL_SETTINGS);
      setForm(DEFAULT_FESTIVAL_SETTINGS);
      addToast("Reset to Diwali Dhamaka defaults.", "info");
    }
  };

  const setTargetPresetDays = (days: number, hours = 18, mins = 36) => {
    const futureDate = new Date(Date.now() + (days * 24 * 3600 + hours * 3600 + mins * 60) * 1000);
    setForm((prev) => ({
      ...prev,
      countdownTargetDate: futureDate.toISOString(),
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Seasonal Promotions Engine</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white flex items-center gap-2.5">
            <span>Festival & Diwali Campaign Manager</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Configure the Great Indian Festival / Diwali Special banner, top announcement bar, countdown timer & bank offers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs flex items-center gap-2 border border-white/10 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <span>Preview Store</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="rounded-2xl border border-amber-500/30 bg-[#0C0E17] p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Eye className="w-4 h-4 text-amber-400" />
            <span>Real-time Live Preview</span>
          </div>
          <span className="text-[11px] text-zinc-400">
            {form.heroBannerEnabled ? "Hero Banner Active" : "Hero Banner Disabled"}
          </span>
        </div>

        {/* 1. Preview Announcement Bar */}
        {form.announcementEnabled ? (
          <div className="rounded-xl bg-gradient-to-r from-[#B0124C] via-[#C9184A] to-[#E85D04] text-white text-xs py-2 px-4 font-bold shadow-sm flex items-center justify-center gap-2 text-center">
            <span>{form.announcementText}</span>
            <span className="opacity-40">|</span>
            <span className="underline font-black text-amber-200">Shop Now →</span>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-zinc-900/60 border border-dashed border-white/10 text-center text-xs text-zinc-500">
            Top announcement bar is currently disabled
          </div>
        )}

        {/* 2. Preview Hero Banner (Matching the Reference Image) */}
        {form.heroBannerEnabled ? (
          <div className="rounded-2xl overflow-hidden border border-amber-400/40 bg-gradient-to-r from-[#B0124C] via-[#C9184A] to-[#E85D04] text-white shadow-xl">
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Left Column */}
              <div className="md:col-span-7 space-y-3.5 text-left">
                {/* Royal Emblem */}
                <div className="inline-flex items-center gap-2">
                  <div className="px-4 py-1.5 rounded-full bg-[#FFFDF0] border border-amber-300 text-center shadow">
                    <span className="text-[9px] font-black text-[#B45309] block uppercase">my choise</span>
                    <span className="text-base font-black text-[#831843] uppercase font-serif">{form.title}</span>
                  </div>
                  <div className="px-3 py-1 rounded bg-[#4A0426] text-amber-200 border border-amber-300/60 text-[10px] font-black uppercase">
                    ★ {form.festivalTag} ★
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {form.discountText}
                  </h3>
                  <p className="text-lg font-bold text-amber-200">
                    {form.categoryHighlight}
                  </p>
                </div>

                <div className="text-xs font-bold text-amber-100/90">
                  {form.valueProps}
                </div>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <span className="px-6 py-2 rounded-full bg-white text-slate-950 font-black text-xs shadow-md">
                    {form.ctaText}
                  </span>
                  {form.couponCode && (
                    <span className="px-3 py-1.5 rounded-full bg-black/50 border border-amber-300/50 text-amber-300 text-xs font-mono font-bold">
                      Code: {form.couponCode}
                    </span>
                  )}
                </div>

                {form.countdownEnabled && (
                  <div className="pt-1 text-xs text-amber-200 font-bold flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-300" />
                    <span>{form.countdownLabel}: 04 : 18 : 36 : 52 (DAYS : HRS : MIN : SEC)</span>
                  </div>
                )}
              </div>

              {/* Right Column: Mini Golden Archway Preview */}
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-56 aspect-[4/3] rounded-t-full border-2 border-amber-300 bg-amber-400/10 flex flex-col items-center justify-center p-3 text-center shadow-lg relative">
                  <span className="text-[10px] font-black text-amber-200 uppercase tracking-wider">
                    Illuminated Festive Arch
                  </span>
                  <span className="text-xs font-bold text-white mt-1">
                    💻 Laptop • 🎧 Headphones • ⌚ Watch
                  </span>
                  <div className="absolute -bottom-1 left-2 flex items-center">
                    <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="absolute -bottom-1 right-2 flex items-center">
                    <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bank Partner Bar */}
            <div className="bg-white text-slate-900 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs border-t border-slate-200 font-bold">
              <div className="flex items-center gap-2 text-[10px]">
                <span className="px-2 py-0.5 rounded bg-[#97144D]/10 text-[#97144D]">AXIS BANK</span>
                <span className="px-2 py-0.5 rounded bg-[#F26522]/10 text-[#F26522]">BOBCARD</span>
                <span className="px-2 py-0.5 rounded bg-[#991B1B]/10 text-[#991B1B]">IDFC FIRST</span>
                <span className="px-2 py-0.5 rounded bg-[#1E3A8A]/10 text-[#1E3A8A]">RBL Bank</span>
              </div>
              <div className="text-right">
                <span className="text-slate-950 font-black">{form.bankOfferText}</span>
                <span className="text-[10px] text-slate-500 ml-1.5">{form.bankOfferSubtext}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-dashed border-white/10 text-center text-xs text-zinc-500">
            Large festival hero banner is currently disabled
          </div>
        )}
      </div>

      {/* Campaign Configuration Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Thin Announcement Bar */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <BellRing className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">1. Top Thin Announcement Bar</h3>
                <p className="text-xs text-zinc-400">Fixed strip displayed at the very top of every page.</p>
              </div>
            </div>

            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.announcementEnabled}
                onChange={(e) => setForm({ ...form, announcementEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Announcement Headline</label>
              <input
                type="text"
                value={form.announcementText}
                onChange={(e) => setForm({ ...form, announcementText: e.target.value })}
                placeholder="🪔 Diwali Special — Extra 10% OFF on selected gadgets"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-medium"
              />
            </div>

            <div className="md:col-span-4 space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Link Destination URL</label>
              <input
                type="text"
                value={form.announcementLink}
                onChange={(e) => setForm({ ...form, announcementLink: e.target.value })}
                placeholder="/products?deals=diwali"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Large Hero Banner Content */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                <Flame className="w-4 h-4 fill-yellow-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">2. Large Festival Hero Banner (Reference Layout)</h3>
                <p className="text-xs text-zinc-400">Positioned immediately below header navigation with illuminated archway.</p>
              </div>
            </div>

            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.heroBannerEnabled}
                onChange={(e) => setForm({ ...form, heroBannerEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Festival Title */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Festival Main Title (Emblem)</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Great Indian Festival"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            {/* Festival Tag */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Festival Ribbon Badge (Under Seal)</label>
              <input
                type="text"
                value={form.festivalTag}
                onChange={(e) => setForm({ ...form, festivalTag: e.target.value })}
                placeholder="Diwali Special"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            {/* Discount Callout */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Discount Headline (Big White Text)</label>
              <input
                type="text"
                value={form.discountText}
                onChange={(e) => setForm({ ...form, discountText: e.target.value })}
                placeholder="Up to 80% off*"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-black text-sm"
              />
            </div>

            {/* Category Highlight */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Category Subtitle (Yellow Headline)</label>
              <input
                type="text"
                value={form.categoryHighlight}
                onChange={(e) => setForm({ ...form, categoryHighlight: e.target.value })}
                placeholder="Electronics & accessories"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            {/* Value Props */}
            <div className="md:col-span-2 space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Value Propositions Strip</label>
              <input
                type="text"
                value={form.valueProps}
                onChange={(e) => setForm({ ...form, valueProps: e.target.value })}
                placeholder="Great Prices   |   Exchange Offer   |   No Cost EMI"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* CTA Button Text */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">CTA Button Text (White Pill)</label>
              <input
                type="text"
                value={form.ctaText}
                onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                placeholder="Shop Now"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            {/* CTA Button Link */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">CTA Button Target URL</label>
              <input
                type="text"
                value={form.ctaLink}
                onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                placeholder="/products?deals=diwali"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Coupon Code */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Associated Coupon Code</label>
              <input
                type="text"
                value={form.couponCode}
                onChange={(e) => setForm({ ...form, couponCode: e.target.value.toUpperCase() })}
                placeholder="DIWALI10"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono font-bold"
              />
            </div>

            {/* Bank Offer Text */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Bottom Bank Strip Offer Text</label>
              <input
                type="text"
                value={form.bankOfferText}
                onChange={(e) => setForm({ ...form, bankOfferText: e.target.value })}
                placeholder="10% Instant Discount*"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Countdown Timer */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">3. Offer Countdown Timer (DAYS : HRS : MIN : SEC)</h3>
                <p className="text-xs text-zinc-400">Controls real-time live ticker counting down to offer expiration.</p>
              </div>
            </div>

            {/* Toggle */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={form.countdownEnabled}
                onChange={(e) => setForm({ ...form, countdownEnabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Countdown Header Label</label>
              <input
                type="text"
                value={form.countdownLabel}
                onChange={(e) => setForm({ ...form, countdownLabel: e.target.value })}
                placeholder="OFFER ENDS IN"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-zinc-300">Target Expiration Date & Time</label>
              <input
                type="datetime-local"
                value={form.countdownTargetDate ? form.countdownTargetDate.slice(0, 16) : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setForm({ ...form, countdownTargetDate: new Date(e.target.value).toISOString() });
                  }
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Quick Presets */}
            <div className="md:col-span-2 pt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs text-zinc-400 font-semibold mr-1">Quick Presets:</span>
              <button
                type="button"
                onClick={() => setTargetPresetDays(2)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-200 transition-colors"
              >
                +2 Days
              </button>
              <button
                type="button"
                onClick={() => setTargetPresetDays(4, 18, 36)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs text-amber-300 font-bold transition-colors"
              >
                4 Days 18 Hrs (Diwali Special)
              </button>
              <button
                type="button"
                onClick={() => setTargetPresetDays(7)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-200 transition-colors"
              >
                +7 Days (Full Festive Week)
              </button>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              All changes applied to live store!
            </span>
          )}

          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Save className="w-4 h-4 stroke-[2.5]" />
            <span>Save & Publish Campaign</span>
          </button>
        </div>
      </form>
    </div>
  );
}

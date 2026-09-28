"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Copy,
  Check,
  Zap,
  Tag,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "@/context/store-context";
import { useToast } from "@/components/toast";
import confetti from "canvas-confetti";

export function FestivalHeroBanner() {
  const { festivalSettings } = useStore();
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  // Real-time Countdown calculation based on target date
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 36,
    seconds: 52,
  });

  useEffect(() => {
    if (!festivalSettings.countdownTargetDate) return;

    const calculateTime = () => {
      const target = new Date(festivalSettings.countdownTargetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [festivalSettings.countdownTargetDate]);

  const handleCopyCode = () => {
    if (festivalSettings.couponCode) {
      navigator.clipboard.writeText(festivalSettings.couponCode);
      setCopied(true);
      addToast(`Coupon "${festivalSettings.couponCode}" copied to clipboard!`, "success");

      // Festive golden & vibrant confetti celebration burst
      try {
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.38 },
          colors: ["#F59E0B", "#FCD34D", "#EC4899", "#E11D48", "#FFFFFF", "#6366F1"],
          ticks: 220,
          gravity: 1,
          scalar: 1,
        });
      } catch {
        // Fallback
      }

      setTimeout(() => setCopied(false), 2500);
    }
  };

  // If disabled by admin, hide gracefully
  if (!festivalSettings.heroBannerEnabled) {
    return null;
  }

  return (
    <section className="w-full">
      <div className="relative w-full overflow-hidden shadow-xl border-b border-amber-300/40 bg-gradient-to-r from-[#B0124C] via-[#C9184A] to-[#E85D04]">
        
        {/* TOP ORNAMENTAL HANGING GARLANDS & RANGOLI MOTIFS */}
        <div className="absolute inset-x-0 top-0 h-10 pointer-events-none flex justify-around opacity-40 z-10">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="flex flex-col items-center animate-pulse" style={{ animationDelay: `${i * 0.25}s` }}>
              <div className="w-[1.5px] h-4 bg-gradient-to-b from-amber-300 to-amber-500" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-300 shadow-[0_0_8px_#FCD34D]" />
            </div>
          ))}
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-20 w-80 h-80 bg-rose-400/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400/25 rounded-full blur-3xl pointer-events-none" />

        {/* Traditional Mandala Watermark Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#FDE047_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

        {/* MAIN HERO CONTENT GRID (Max width 7xl centered inside edge-to-edge banner) */}
        <div className="relative z-20 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
          
          {/* ================= LEFT CONTENT COLUMN ================= */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5 text-left">
            
            {/* 1. ROYAL FESTIVAL EMBLEM (Matching Reference Image) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 sm:gap-3"
            >
              {/* Left Elephant Silhouette with Crown */}
              <div className="relative w-12 sm:w-16 h-10 sm:h-12 shrink-0 opacity-95">
                <svg viewBox="0 0 100 80" fill="none" className="w-full h-full drop-shadow-md">
                  <path
                    d="M85 45 C85 25 70 15 50 15 C30 15 15 28 15 50 C15 65 25 75 35 75 L45 75 C45 68 50 65 55 65 C60 65 65 68 65 75 L75 75 C85 75 85 60 85 45 Z"
                    fill="#FDE047"
                  />
                  <path d="M15 50 C10 45 5 50 5 60 C5 68 12 70 15 65" stroke="#FDE047" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="70" cy="30" r="3" fill="#831843" />
                  {/* Ornaments */}
                  <path d="M45 20 L55 35 L35 35 Z" fill="#991B1B" />
                  <circle cx="50" cy="12" r="4" fill="#FEF08A" />
                </svg>
              </div>

              {/* Central Seal & Ribbon */}
              <div className="flex flex-col items-center">
                {/* Circular Sunburst Seal */}
                <div className="relative px-5 sm:px-7 py-2.5 rounded-full bg-gradient-to-b from-[#FFFDF0] to-[#FFF3C4] border-2 border-amber-300 shadow-xl text-center">
                  <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#B45309] block uppercase">
                    my choise
                  </span>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-[#831843] leading-none py-0.5 font-serif uppercase">
                    {festivalSettings.title || "Great Indian Festival"}
                  </div>
                </div>

                {/* Hanging Deep Ribbon: "Diwali Special" */}
                <div className="-mt-2 relative z-10 px-4 sm:px-6 py-1 rounded-md bg-[#4A0426] text-amber-200 border border-amber-300/70 shadow-lg text-[11px] sm:text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-amber-400">★</span>
                  <span>{festivalSettings.festivalTag || "Diwali Special"}</span>
                  <span className="text-amber-400">★</span>
                </div>
              </div>

              {/* Right Elephant Silhouette with Crown */}
              <div className="relative w-12 sm:w-16 h-10 sm:h-12 shrink-0 opacity-95 scale-x-[-1]">
                <svg viewBox="0 0 100 80" fill="none" className="w-full h-full drop-shadow-md">
                  <path
                    d="M85 45 C85 25 70 15 50 15 C30 15 15 28 15 50 C15 65 25 75 35 75 L45 75 C45 68 50 65 55 65 C60 65 65 68 65 75 L75 75 C85 75 85 60 85 45 Z"
                    fill="#FDE047"
                  />
                  <path d="M15 50 C10 45 5 50 5 60 C5 68 12 70 15 65" stroke="#FDE047" strokeWidth="6" strokeLinecap="round" />
                  <circle cx="70" cy="30" r="3" fill="#831843" />
                  <path d="M45 20 L55 35 L35 35 Z" fill="#991B1B" />
                  <circle cx="50" cy="12" r="4" fill="#FEF08A" />
                </svg>
              </div>
            </motion.div>

            {/* 2. BIG DISCOUNT HEADLINE (Matching Reference Image: "Up to 80% off*") */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="space-y-1.5"
            >
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {festivalSettings.discountText || "Up to 80% off*"}
              </h2>

              <p className="text-xl sm:text-2xl font-bold text-amber-200 tracking-tight">
                {festivalSettings.categoryHighlight || "Electronics & accessories"}
              </p>
            </motion.div>

            {/* 3. VALUE PROPOSITIONS (Great Prices | Exchange Offer | No Cost EMI) */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm font-bold text-amber-100/90 pt-1">
              <span className="flex items-center gap-1.5">
                <span className="text-amber-300">✔</span> Great Prices
              </span>
              <span className="text-amber-300/40">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-300">✔</span> Exchange Offer
              </span>
              <span className="text-amber-300/40">•</span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-300">✔</span> No Cost EMI
              </span>
            </div>

            {/* 4. ACTION BUTTONS (Shop Now pill button + Coupon copy) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={festivalSettings.ctaLink || "/products"}
                className="px-8 sm:px-10 py-3 sm:py-3.5 rounded-full bg-white hover:bg-amber-100 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-black/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group"
              >
                <span>{festivalSettings.ctaText || "Shop Now"}</span>
                <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </Link>

              {festivalSettings.couponCode && (
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleCopyCode}
                  className="px-5 py-3 rounded-full bg-slate-950/60 hover:bg-slate-950 border border-amber-300/50 text-amber-300 font-bold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-md transition-all hover:border-amber-300 shadow-md active:shadow-inner cursor-pointer"
                  title="Click to copy coupon"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                      <span className="text-emerald-300 font-extrabold">Code Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-300" />
                      <span>Use Code: <span className="font-mono font-black text-white">{festivalSettings.couponCode}</span></span>
                    </>
                  )}
                </motion.button>
              )}
            </div>

            {/* 5. COUNTDOWN TIMER UX FEATURE (Requested by User) */}
            {festivalSettings.countdownEnabled && (
              <div className="pt-2">
                <div className="inline-flex flex-col items-start p-3 sm:p-3.5 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/40 shadow-inner">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-300 uppercase tracking-wider mb-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                    <span>{festivalSettings.countdownLabel || "OFFER ENDS IN"}</span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-center">
                    <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-400/30">
                      <span className="text-base sm:text-lg font-black text-amber-300">
                        {String(timeLeft.days).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block -mt-0.5">DAYS</span>
                    </div>
                    <span className="font-black text-amber-400">:</span>
                    <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-400/30">
                      <span className="text-base sm:text-lg font-black text-amber-300">
                        {String(timeLeft.hours).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block -mt-0.5">HRS</span>
                    </div>
                    <span className="font-black text-amber-400">:</span>
                    <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-400/30">
                      <span className="text-base sm:text-lg font-black text-amber-300">
                        {String(timeLeft.minutes).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block -mt-0.5">MIN</span>
                    </div>
                    <span className="font-black text-amber-400">:</span>
                    <div className="px-2.5 py-1 rounded-lg bg-slate-900 border border-amber-400/30">
                      <span className="text-base sm:text-lg font-black text-amber-400 animate-pulse">
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 block -mt-0.5">SEC</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT SHOWCASE IN GOLDEN ARCH ================= */}
          <div className="lg:col-span-6 xl:col-span-5 relative flex items-center justify-center pt-4 lg:pt-0">
            
            {/* The Illuminated Golden Archway (Matching Reference Image) */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[4/3.8] rounded-t-full border-[3px] border-amber-300/80 shadow-[0_0_60px_rgba(251,191,36,0.35)] bg-gradient-to-b from-amber-400/15 via-transparent to-black/30 flex items-end justify-center p-4 overflow-visible">
              
              {/* Fairy Lights along Arch perimeter */}
              <div className="absolute inset-x-8 top-3 flex justify-between pointer-events-none opacity-80">
                {[...Array(7)].map((_, idx) => (
                  <div key={idx} className="w-2 h-2 rounded-full bg-amber-200 shadow-[0_0_6px_#FEF08A] animate-pulse" />
                ))}
              </div>

              {/* 1. Centerpiece: Laptop with open screen and specs (Gentle Float) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 sm:w-80 aspect-[16/10] z-10 transition-transform duration-500 hover:scale-105"
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
                  {/* Laptop Screen Content with Specs */}
                  <Image
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop"
                    alt="StreamBook Laptop"
                    fill
                    sizes="(max-width: 640px) 250px, 320px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-2.5">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-[10px] font-black bg-blue-600/90 px-2 py-0.5 rounded shadow">
                        Intel Core Ultra 5
                      </span>
                      <span className="text-[9px] font-bold text-amber-300 bg-black/60 px-1.5 py-0.5 rounded">
                        16GB SSD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Laptop Keyboard Base shadow reflection */}
                <div className="w-[92%] h-2.5 mx-auto bg-slate-800 rounded-b-md shadow-lg" />
              </motion.div>

              {/* 2. Foreground Left: White Wireless Studio Headphones (Floating Levitation) */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-1.5, 1, -1.5] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-1 -left-2 sm:left-2 w-24 sm:w-28 h-28 sm:h-32 z-20 drop-shadow-2xl transition-transform hover:scale-110"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white/95 p-1.5 border border-slate-200/80 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                    alt="Studio ANC Headphones"
                    fill
                    sizes="110px"
                    className="object-contain p-1"
                  />
                </div>
              </motion.div>

              {/* 3. Foreground Right: Smart Watch & Tablet / Gadget (Floating Levitation) */}
              <motion.div
                animate={{ y: [0, -11, 0], rotate: [1, -1.5, 1] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -bottom-1 -right-2 sm:right-2 w-22 sm:w-26 h-26 sm:h-30 z-20 drop-shadow-2xl transition-transform hover:scale-110"
              >
                <div className="relative w-20 sm:w-24 h-24 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 p-1.5 border border-amber-300/40 shadow-2xl">
                  <Image
                    src="/products/smartwatch-black.jpg"
                    alt="AMOLED Smart Watch"
                    fill
                    sizes="100px"
                    className="object-contain p-1"
                  />
                </div>
              </motion.div>

              {/* 4. Traditional Golden Lit Diyas at corners on the ground */}
              <div className="absolute -bottom-3 left-4 z-30 flex items-center gap-1">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse drop-shadow-[0_0_8px_#F59E0B]" />
              </div>
              <div className="absolute -bottom-3 right-4 z-30 flex items-center gap-1">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse drop-shadow-[0_0_8px_#F59E0B]" />
              </div>

              {/* Ground Reflective Shadow */}
              <div className="absolute -bottom-2 inset-x-4 h-4 bg-black/40 blur-md rounded-full pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BANK PARTNER DISCOUNT STRIP ================= */}
        <div className="relative z-20 bg-white border-t border-slate-200 py-3 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-900">
            {/* Left: Bank Partner Badges */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs">
              {/* AXIS BANK */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#97144D]/10 border border-[#97144D]/30 text-[#97144D] font-black text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#97144D]" />
                <span>AXIS BANK</span>
              </div>

              {/* BOBCARD */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F26522]/10 border border-[#F26522]/30 text-[#F26522] font-black text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                <span>BOBCARD</span>
              </div>

              {/* IDFC FIRST Bank */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#991B1B]/10 border border-[#991B1B]/30 text-[#991B1B] font-black text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#991B1B]" />
                <span>IDFC FIRST Bank</span>
              </div>

              {/* RBL Bank */}
              <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1E3A8A]/10 border border-[#1E3A8A]/30 text-[#1E3A8A] font-black text-[11px]">
                <span className="w-2 h-2 rounded-full bg-[#1E3A8A]" />
                <span>RBL Bank</span>
              </div>
            </div>

            {/* Right: Bank Discount Highlight */}
            <div className="flex items-center gap-2 text-center sm:text-right">
              <span className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                {festivalSettings.bankOfferText || "10% Instant Discount*"}
              </span>
              <span className="text-[11px] font-bold text-slate-500">
                {festivalSettings.bankOfferSubtext || "*T&C apply"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

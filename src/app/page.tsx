"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Clock,
  ChevronRight,
  ChevronLeft,
  Flame,
  Star,
  ShoppingBag,
  Heart,
  Eye,
  Check,
  Zap,
  TrendingUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, BRANDS, ProductItem } from "@/lib/data";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/product-card";
import { FestivalHeroBanner } from "@/components/festival-hero-banner";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

// Hero Banner Deals Slider Data
const HERO_SLIDES = [
  {
    id: 1,
    tag: "Flash Electronics Sale",
    title: "Electronics Sale Live Now – 24 Hours to Save",
    subtitle: "Your next gadget is waiting – up to 60% off during our flash sale.",
    badge: "Save Up to 60%",
    ctaText: "Shop Now",
    ctaLink: "/products?category=electronics",
    image: "/products/earbuds-white-1.jpg",
    productTitle: "StreamAir Pro ANC Earbuds",
    productPrice: 799,
    originalPrice: 1299,
  },
  {
    id: 2,
    tag: "Next-Gen Wearables",
    title: "AMOLED Smart Watches with Bluetooth Calling",
    subtitle: "Track fitness, monitor heart health, and stay connected on the go.",
    badge: "Up to 50% Off",
    ctaText: "Discover Watches",
    ctaLink: "/products?category=smart-watches",
    image: "/products/smartwatch-black.jpg",
    productTitle: "Trackline Sport Edition Watch",
    productPrice: 1299,
    originalPrice: 2499,
  },
  {
    id: 3,
    tag: "Ultrabooks & Laptops",
    title: "Ultra Thin High Performance Laptops",
    subtitle: "Power through multitasking, creativity, and work with SSD speeds.",
    badge: "Special Deal",
    ctaText: "Explore Laptops",
    ctaLink: "/products?category=laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
    productTitle: "StreamBook Air Ultra 14\"",
    productPrice: 54999,
    originalPrice: 64999,
  },
];

// Circular category icons matching reference image
const CIRCLE_CATEGORIES = [
  { name: "Laptops", slug: "laptops", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=400&auto=format&fit=crop" },
  { name: "Smart Watches", slug: "smart-watches", img: "/products/smartwatch-black.jpg" },
  { name: "Projectors", slug: "electronics", img: "/products/projector-main.jpg" },
  { name: "Headphones", slug: "audio", img: "/products/earbuds-white-1.jpg" },
  { name: "Speakers", slug: "audio", img: "/products/speaker-teal.jpg" },
  { name: "Fashion", slug: "fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop" },
  { name: "Footwear", slug: "footwear", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop" },
  { name: "Home", slug: "home", img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=400&auto=format&fit=crop" },
  { name: "Beauty", slug: "beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=400&auto=format&fit=crop" },
];

export default function HomePage() {
  const { addToCart } = useCart();
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  // Countdown timer for deals (04:32:18 countdown)
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 32,
    seconds: 18,
  });

  // Hero Countdown timer (02d : 02h : 59m : 14s)
  const [heroTime, setHeroTime] = useState({
    days: 2,
    hours: 2,
    minutes: 59,
    seconds: 14,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });

      setHeroTime((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto advance banner slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  const { products, categories } = useStore();

  // Filter products for trending 4x2 grid
  const trendingProducts = activeTab === "all"
    ? products.slice(0, 8)
    : products.filter((p) => p.categoryId.includes(activeTab) || p.category.toLowerCase().includes(activeTab)).slice(0, 8);

  // Deals of the Day (explicit 5 products matching ASCII diagram: ₹799, ₹1,299, ₹499, ₹999, ₹699)
  const dealsOfTheDay = products.slice(0, 5);

  const currentHero = HERO_SLIDES[activeSlide];

  return (
    <div className="space-y-10 pb-16">
      {/* 0. FESTIVAL SPECIAL HERO BANNER (Diwali Dhamaka with Countdown & Offer CTA) */}
      <FestivalHeroBanner />

      {/* 1. SHOP BY CATEGORY (Circular Categories with Smooth Hover Effects) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Shop by Category</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Browse popular departments and curated collections</p>
            </div>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline group"
          >
            <span>Shop All</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        {/* Circular Cards Horizontal Swipeable Track on Mobile, Grid on Desktop */}
        <div className="flex items-start gap-4 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 sm:gap-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CIRCLE_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04, duration: 0.35, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              className="flex flex-col items-center shrink-0 w-20 sm:w-auto"
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group flex flex-col items-center gap-2.5 text-center relative focus:outline-none w-full"
              >
                {/* Avatar with Glow Aura, Gradient Ring, and Shine Sweep */}
                <div className="relative">
                  {/* 1. Ambient Glow Aura on Hover */}
                  <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-amber-400 opacity-0 group-hover:opacity-80 blur-md transition-all duration-300 -z-10 group-hover:scale-110" />

                  {/* 2. Outer Gradient Ring / Border */}
                  <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full p-[2.5px] bg-slate-200 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:via-indigo-500 group-hover:to-cyan-400 shadow-sm group-hover:shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300 relative overflow-hidden flex items-center justify-center">
                    
                    {/* 3. Inner White Spacer */}
                    <div className="relative w-full h-full rounded-full p-0.5 bg-white overflow-hidden">
                      
                      {/* 4. Product Image Container */}
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-50">
                        <Image
                          src={cat.img}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 80px, 88px"
                          className="object-cover group-hover:scale-120 group-hover:rotate-1 transition-transform duration-500 ease-out"
                        />

                        {/* 5. Glistening Light Beam Sweep on Hover */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-10" />

                        {/* 6. Subtle Color Tint Overlay */}
                        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Name & Animated Expanding Underline */}
                <div className="relative flex flex-col items-center pt-0.5">
                  <span className="text-xs font-bold text-slate-700 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
                    {cat.name}
                  </span>
                  <span className="h-0.5 w-0 bg-blue-600 rounded-full group-hover:w-full transition-all duration-300 ease-out mt-0.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. SECOND HERO BANNER / OFFER CAROUSEL (Edge-to-Edge Full Width) */}
      <section className="w-full bg-[#0F172A] text-white relative overflow-hidden shadow-xl border-y border-slate-800">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[420px] sm:min-h-[460px] flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8 sm:py-12 z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left">
              {/* Live Flash Timer Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-amber-400 text-xs font-bold shadow-inner">
                <Clock className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>
                  {String(heroTime.days).padStart(2, "0")}d : {String(heroTime.hours).padStart(2, "0")}h :{" "}
                  {String(heroTime.minutes).padStart(2, "0")}m : {String(heroTime.seconds).padStart(2, "0")}s
                </span>
              </div>

              {/* Big Headline */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-3"
                >
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                    {currentHero.title}
                  </h1>

                  <p className="text-slate-300 text-xs sm:text-base max-w-xl font-medium leading-relaxed">
                    {currentHero.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2 sm:pt-3">
                <Link
                  href={currentHero.ctaLink}
                  className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-400/25 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <span>{currentHero.ctaText}</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </Link>

                <Link
                  href="/products"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all"
                >
                  Explore All Deals
                </Link>
              </div>
            </div>

            {/* Right Product Highlight with Discount Callout Badge */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHero.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full max-w-sm aspect-square flex items-center justify-center"
                >
                  {/* Yellow Discount Circle Badge with organic pulse & tilt */}
                  <motion.div
                    animate={{ rotate: [10, 14, 10], scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-2 right-2 sm:right-4 z-20 w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-amber-400 text-slate-950 flex flex-col items-center justify-center font-black shadow-xl"
                  >
                    <span className="text-[8px] sm:text-[11px] uppercase tracking-tight leading-none font-bold">Save Up to</span>
                    <span className="text-base sm:text-2xl font-black leading-tight">60%</span>
                  </motion.div>

                  {/* Cutout Product Image with Gentle Floating Levitation */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-800/40 to-slate-900/60 p-4 border border-slate-700/60 hover:border-slate-500/60 transition-colors flex items-center justify-center"
                  >
                    <Image
                      src={currentHero.image}
                      alt={currentHero.productTitle}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain p-4 drop-shadow-2xl transition-transform duration-500 hover:scale-105"
                    />

                    {/* Bottom overlay with quick price */}
                    <div className="absolute bottom-3 inset-x-3 bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block line-clamp-1">{currentHero.productTitle}</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-black text-amber-400">
                            {formatCurrency(currentHero.productPrice)}
                          </span>
                          <span className="text-xs text-slate-400 line-through">
                            {formatCurrency(currentHero.originalPrice)}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={currentHero.ctaLink}
                        className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Carousel Dots & Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all rounded-full ${
                  activeSlide === idx ? "w-8 h-2 bg-amber-400" : "w-2 h-2 bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. DEALS OF THE DAY (Ends in 04:32:18 • VIEW ALL ->) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Header Row with Live Countdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <Flame className="w-6 h-6 fill-amber-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Deals of the Day
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-wider animate-pulse">
                    Hot Deals
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
                  <span>Ends in: </span>
                  <span className="text-rose-600 font-black tracking-wide font-mono">
                    {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m :{" "}
                    <motion.span
                      key={timeLeft.seconds}
                      initial={{ scale: 1.25, color: "#E11D48" }}
                      animate={{ scale: 1, color: "#E11D48" }}
                      transition={{ duration: 0.25 }}
                      className="inline-block"
                    >
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </motion.span>
                    s
                  </span>
                </div>
              </div>
            </div>

            <Link
              href="/products"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm hover:scale-105 active:scale-95"
            >
              <span>VIEW ALL</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 5 Deal Cards Grid matching ASCII Mockup: ₹799, ₹1,299, ₹499, ₹999, ₹699 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {dealsOfTheDay.map((deal, idx) => {
              const discount = calculateDiscountPercentage(deal.price, deal.discountPrice || deal.price);
              const claimedPercent = 72 + idx * 5;
              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-blue-400 hover:bg-white hover:shadow-xl transition-all p-3.5 flex flex-col justify-between group"
                >
                  <div>
                    {/* Badge */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-[10px] shadow-xs">
                        -{discount}% OFF
                      </span>
                      <div className="flex items-center gap-0.5 text-amber-500 font-bold text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 stroke-none" />
                        <span>{deal.rating}</span>
                      </div>
                    </div>

                    {/* Image */}
                    <Link href={`/products/${deal.id}`} className="block relative w-full aspect-square mb-3">
                      <Image
                        src={deal.images[0]}
                        alt={deal.title}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                      />
                    </Link>

                    {/* Title */}
                    <Link href={`/products/${deal.id}`}>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {deal.title}
                      </h3>
                    </Link>

                    {/* Stock Claimed Urgency Bar */}
                    <div className="mt-2.5 space-y-1">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-500">Only <span className="text-rose-600 font-extrabold">{idx % 2 === 0 ? "3 left" : "6 left"}</span></span>
                        <span className="text-slate-600 font-extrabold">{claimedPercent}% Claimed</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200/90 rounded-full overflow-hidden relative">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${claimedPercent}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.1 + idx * 0.07, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-amber-500 via-rose-500 to-rose-600 rounded-full relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.45)_50%,transparent_100%)] animate-shimmer-sweep [background-size:200%_100%]" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Add to Cart button */}
                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-200/60">
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-base font-black text-slate-950">
                        {formatCurrency(deal.discountPrice || deal.price)}
                      </span>
                      {deal.discountPrice && (
                        <span className="text-[11px] text-slate-400 line-through">
                          {formatCurrency(deal.price)}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => addToCart(deal)}
                      className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-sm"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. TRENDING PRODUCTS (4 × 2 Grid with filter pills) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Trending Products
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium">Most loved items right now across all categories</p>
          </div>

          {/* Filter Pills with Sliding Animation Pill */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none p-1 bg-slate-100/90 rounded-full border border-slate-200/80">
            {[
              { id: "all", label: "All Items" },
              { id: "electronics", label: "Electronics" },
              { id: "audio", label: "Audio" },
              { id: "smart-watches", label: "Smart Watches" },
              { id: "fashion", label: "Fashion" },
              { id: "footwear", label: "Footwear" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-bold transition-colors shrink-0 z-10 cursor-pointer ${
                    isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="trendingActivePill"
                      className="absolute inset-0 bg-blue-600 rounded-full shadow-md shadow-blue-500/25 -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 x 2 Product Grid with Smooth Tab Switch Crossfade */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5"
          >
            {trendingProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 5. SHOP BY BRAND (Moving In-Line Effect) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">Shop by Brand</h2>
            <p className="text-xs text-slate-500 font-medium">Official stores & certified genuine manufacturers</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 bg-slate-100/80 border border-slate-200/80 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Hover to pause
            </span>
            <Link
              href="/products"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
            >
              <span>All Brands</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Continuous Moving In-Line Marquee Track */}
        <div className="relative overflow-hidden py-3 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 group">
          {/* Left Gradient Fade Mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent z-10" />

          {/* Right Gradient Fade Mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/90 to-transparent z-10" />

          {/* Moving In-Line Track */}
          <div className="flex gap-3 sm:gap-4 animate-marquee-line py-1">
            {[...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
              <Link
                key={`${brand.id}-${idx}`}
                href={`/products?search=${encodeURIComponent(brand.name)}`}
                className="w-36 sm:w-48 p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col items-center justify-center text-center shrink-0 group/card shadow-sm hover:-translate-y-1 duration-200"
              >
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden mb-2 sm:mb-3 bg-slate-50 p-2 border border-slate-100 flex items-center justify-center shadow-inner">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="56px"
                    className="object-cover group-hover/card:scale-110 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs sm:text-sm font-black text-slate-900 group-hover/card:text-blue-600 transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                  {brand.productCount}+ Products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. RECOMMENDED FOR YOU / PROMO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Banner 1: Audio Collection */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-800 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[220px] sm:min-h-[240px] group cursor-pointer"
          >
            <div className="space-y-2 z-10 max-w-[220px] sm:max-w-xs">
              <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider inline-block">
                RECOMMENDED
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight">Next-Gen Audio & Earbuds</h3>
              <p className="text-xs text-blue-100 font-medium">Immerse yourself with high-fidelity acoustic sound.</p>
              <Link
                href="/products?category=audio"
                className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-white text-blue-700 font-black text-xs hover:bg-blue-50 transition-all shadow-md hover:scale-105 active:scale-95"
              >
                Explore Audio <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-90 pointer-events-none overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
                alt="Audio Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover mix-blend-luminosity group-hover:scale-110 group-hover:mix-blend-normal transition-all duration-700"
              />
            </div>
          </motion.div>

          {/* Banner 2: Footwear & Lifestyle */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-xl min-h-[220px] sm:min-h-[240px] group cursor-pointer"
          >
            <div className="space-y-2 z-10 max-w-[220px] sm:max-w-xs">
              <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black uppercase tracking-wider inline-block">
                UP TO 50% OFF
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-tight">Performance Footwear & Kicks</h3>
              <p className="text-xs text-slate-300 font-medium">Engineered for comfort, running, and street style.</p>
              <Link
                href="/products?category=footwear"
                className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition-all shadow-md hover:scale-105 active:scale-95"
              >
                Shop Sneakers <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-90 pointer-events-none overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop"
                alt="Footwear Collection"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover mix-blend-luminosity group-hover:scale-110 group-hover:mix-blend-normal transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

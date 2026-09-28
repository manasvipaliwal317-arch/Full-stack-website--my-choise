"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Truck,
  PhoneCall,
  Check,
  ArrowRight,
  Layers,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useStore } from "@/context/store-context";
import { AuthModal } from "./auth-modal";
import { CATEGORIES } from "@/lib/data";



const ANNOUNCEMENTS = [
  { text: "FREE EXPRESS DELIVERY ON ORDERS ABOVE ₹499", badge: "EXCLUSIVE", link: "/products" },
  { text: "FESTIVE SALE: UP TO 70% OFF ON SMART WATCHES & AUDIO", badge: "HOT DEAL", link: "/products?category=cat-electronics" },
  { text: "NEW ARRIVALS: LUXURY OUD PERFUMES & FRENCH LINEN FITS", badge: "TRENDING", link: "/products?category=cat-beauty" },
  { text: "100% CERTIFIED GENUINE • 7-DAY HASSLE-FREE RETURNS", badge: "VERIFIED", link: "/products" },
];

export function Navbar() {
  const { totalItems, setIsCartOpen, wishlist, subtotal } = useCart();
  const { festivalSettings } = useStore();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>(null);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const categoryMenuRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryMouseEnter = (catId: string) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setHoveredCategory(catId);
  };

  const handleCategoryMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
    }, 220);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryMenuRef.current && !categoryMenuRef.current.contains(event.target as Node)) {
        setIsCategoryMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      let url = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
      if (selectedCategory !== "All") {
        url += `&category=${encodeURIComponent(selectedCategory.toLowerCase())}`;
      }
      router.push(url);
    } else if (selectedCategory !== "All") {
      router.push(`/products?category=${encodeURIComponent(selectedCategory.toLowerCase())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md shadow-[0_4px_25px_-5px_rgba(15,23,42,0.06)] border-b border-slate-100 transition-all duration-300">
        {/* 1. FESTIVAL SPECIAL THIN ANNOUNCEMENT BAR */}
        {festivalSettings.announcementEnabled && (
          <div className="bg-gradient-to-r from-[#B0124C] via-[#C9184A] to-[#E85D04] text-white text-xs py-2 px-4 font-bold shadow-sm border-b border-amber-300/40">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
              <span className="flex items-center gap-1.5 font-bold tracking-tight text-white drop-shadow-sm">
                {festivalSettings.announcementText}
              </span>
              <span className="text-white/40 hidden sm:inline">|</span>
              <Link
                href={festivalSettings.announcementLink || "/products?deals=diwali"}
                className="inline-flex items-center gap-1 font-black underline underline-offset-2 text-amber-200 hover:text-white transition-colors ml-1"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
              </Link>
            </div>
          </div>
        )}

        {/* TOP ANNOUNCEMENT STRIP WITH ROTATING TICKER */}
        <div className="bg-gradient-to-r from-slate-950 via-[#0F172A] to-slate-950 text-white text-xs py-2 px-4 sm:px-6 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Animated Rotating Notification Banner */}
            <div className="h-5 overflow-hidden flex items-center flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={announcementIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.28 }}
                  className="flex items-center gap-2 text-[11px] sm:text-xs font-medium truncate"
                >
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[9px] tracking-wider uppercase shadow-xs shrink-0">
                    {ANNOUNCEMENTS[announcementIndex].badge}
                  </span>
                  <span className="text-slate-200 truncate">
                    {ANNOUNCEMENTS[announcementIndex].text}
                  </span>
                  <Link
                    href={ANNOUNCEMENTS[announcementIndex].link}
                    className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 ml-1 shrink-0 hidden md:inline"
                  >
                    Shop Now &rarr;
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Customer Utility Links (NO ADMIN) */}
            <div className="flex items-center gap-3 text-[11px] text-slate-300 font-medium shrink-0">
              <Link
                href="/products?category=cat-electronics"
                className="hover:text-amber-400 transition-colors hidden sm:flex items-center gap-1 font-semibold"
              >
                <span>⚡ Flash Deals</span>
              </Link>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <Link
                href="/contact"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <PhoneCall className="w-3 h-3 text-blue-400" />
                <span>Help & 24/7 Support</span>
              </Link>
            </div>
          </div>
        </div>

        {/* MAIN HEADER ROW */}
        <div className="py-3 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* ULTRA-MODERN BRAND IDENTITY LOGO: my choise */}
            <Link href="/" className="flex items-center gap-3 group shrink-0 select-none">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-950 via-slate-900 to-blue-900 p-0.5 shadow-lg shadow-blue-950/30 group-hover:scale-105 group-hover:shadow-indigo-500/25 transition-all duration-300">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
                  {/* Subtle animated light reflection sweep */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* Futuristic Geometric Monogram Icon */}
                  <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M24 10C21.5 7 17.5 6 12.5 8C7.5 10 5 14.5 5 19.5C5 24.5 8.5 27 13.5 27C18.5 27 22 24.5 23.5 21"
                      stroke="url(#mc-brand-gradient)"
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
                    <defs>
                      <linearGradient id="mc-brand-gradient" x1="5" y1="8" x2="25" y2="27" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38BDF8" />
                        <stop offset="0.5" stopColor="#6366F1" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline font-brand leading-none">
                  <span className="text-[25px] font-semibold text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors">
                    my
                  </span>
                  <span className="text-[25px] font-extrabold tracking-tight ml-0.5 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                    choise
                  </span>
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 ml-1 inline-block animate-pulse shadow-xs" />
                </div>
                <span className="text-[8.5px] tracking-[0.28em] uppercase font-bold text-slate-400 group-hover:text-slate-500 transition-colors mt-0.5">
                  Curated Marketplace
                </span>
              </div>
            </Link>



            {/* SEARCH BAR (Animated glowing focus & gradient button) */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative flex items-center">
              <div className="w-full flex items-center rounded-2xl border border-slate-200 bg-slate-100/70 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-500/15 transition-all duration-200 shadow-inner">
                {/* Category Dropdown inside search */}
                <div className="relative shrink-0 hidden sm:block" ref={categoryMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                    className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:text-slate-900 border-r border-slate-200/90 bg-slate-200/50 hover:bg-slate-200/80 rounded-l-2xl transition-colors"
                  >
                    <span>{selectedCategory}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  <AnimatePresence>
                    {isCategoryMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50"
                      >
                        {["All", "Electronics", "Fashion", "Audio", "Smart Watches", "Laptops", "Home", "Footwear"].map(
                          (cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => {
                                setSelectedCategory(cat);
                                setIsCategoryMenuOpen(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs transition-colors flex items-center justify-between ${
                                selectedCategory === cat
                                  ? "bg-blue-50 text-blue-600 font-bold"
                                  : "text-slate-700 hover:bg-slate-50 font-medium"
                              }`}
                            >
                              <span>{cat}</span>
                              {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-blue-600" />}
                            </button>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <input
                  type="text"
                  placeholder="Search for smart watches, audio, perfumes, streetwear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                />

                <button
                  type="submit"
                  aria-label="Search"
                  className="mr-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-xl font-bold text-xs transition-all shadow-sm hover:shadow-md hover:shadow-blue-500/25 active:scale-95 flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden md:inline">Search</span>
                </button>
              </div>
            </form>

            {/* ACTION ICONS (Account, Wishlist, Cart) WITH MICRO-INTERACTIONS */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Account */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-2xl text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-all hover:-translate-y-0.5 group"
              >
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-[10px] text-slate-500 font-medium leading-none">Welcome</span>
                  <span className="text-xs font-bold text-slate-900 leading-tight">Account</span>
                </div>
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 sm:px-3 sm:py-2 rounded-2xl text-slate-700 hover:text-rose-600 hover:bg-rose-50/60 transition-all flex items-center gap-2 hover:-translate-y-0.5 group"
                title="Wishlist"
              >
                <div className="relative">
                  <Heart className="w-5 h-5 text-slate-700 group-hover:text-rose-600 transition-colors" />
                  <AnimatePresence mode="popLayout">
                    {wishlist.length > 0 && (
                      <motion.span
                        key={wishlist.length}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: [1, 1.4, 1], opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
                      >
                        {wishlist.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-xs font-bold text-slate-900 hidden lg:inline">Wishlist</span>
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2.5 p-2 sm:px-3.5 sm:py-2 bg-gradient-to-r from-blue-50 to-indigo-50/70 hover:from-blue-100 hover:to-indigo-100 border border-blue-200/80 rounded-2xl text-blue-800 font-bold transition-all shadow-xs hover:shadow-sm hover:-translate-y-0.5 group"
                aria-label="Open cart"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <AnimatePresence mode="popLayout">
                    {totalItems > 0 && (
                      <motion.span
                        key={totalItems}
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: [1, 1.45, 1], opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 18 }}
                        className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-md"
                      >
                        {totalItems}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-blue-600/80 font-medium leading-none">Cart</span>
                  <span className="text-xs font-black text-blue-950 leading-tight">
                    {totalItems > 0 ? `₹${Math.round(subtotal).toLocaleString("en-IN")}` : "0 Items"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* SECONDARY CATEGORY STRIP WITH INTERACTIVE MEGA MENU */}
        <div
          className="relative bg-slate-50/95 border-t border-b border-slate-200/80 py-2 px-4 sm:px-6 lg:px-8"
          onMouseLeave={handleCategoryMouseLeave}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-medium text-slate-700">
            <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto scrollbar-none py-0.5">
              {/* Menu / All categories pill */}
              <Link
                href="/products"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-sm shrink-0 hover:scale-105"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>All Categories</span>
              </Link>

              {/* SALE BADGE WITH SHIMMER SWEEP ANIMATION */}
              <Link
                href="/products?category=cat-electronics"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-slate-950 font-black text-[11px] animate-shimmer-sweep shadow-xs hover:scale-105 transition-transform shrink-0 border border-amber-300"
              >
                <Zap className="w-3.5 h-3.5 fill-slate-950" />
                <span>SALE UP TO 70%</span>
              </Link>

              {/* DYNAMIC CATEGORY BUTTONS WITH MEGA MENU HOVER */}
              {CATEGORIES.map((cat) => {
                const isHovered = hoveredCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    className="relative shrink-0"
                    onMouseEnter={() => handleCategoryMouseEnter(cat.id)}
                  >
                    <Link
                      href={`/products?category=${cat.id}`}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isHovered
                          ? "bg-blue-50 text-blue-700 shadow-sm"
                          : "text-slate-700 hover:text-blue-600 hover:bg-slate-100"
                      }`}
                    >
                      <span>{cat.name}</span>
                      {cat.subCategories && cat.subCategories.length > 0 && (
                        <ChevronDown
                          className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${
                            isHovered ? "rotate-180 text-blue-600" : ""
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>

            <div className="hidden xl:flex items-center gap-4 text-slate-600 text-[11px] font-semibold shrink-0">
              <span className="flex items-center gap-1 text-emerald-600">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" /> 100% Genuine Products
              </span>
              <span>•</span>
              <span>India (INR ₹)</span>
            </div>
          </div>

          {/* FLOATING MEGA MENU FLYOUT */}
          <AnimatePresence>
            {hoveredCategory && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.16 }}
                onMouseEnter={() => {
                  if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleCategoryMouseLeave}
                className="absolute left-0 right-0 top-full bg-white border-b border-slate-200 shadow-2xl z-50 py-6 px-4 sm:px-6 lg:px-8"
              >
                {(() => {
                  const currentCat = CATEGORIES.find((c) => c.id === hoveredCategory);
                  if (!currentCat) return null;
                  return (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      {/* Department Title & Quick Description */}
                      <div className="md:col-span-3 border-r border-slate-100 pr-6 space-y-2">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold">
                          <Sparkles className="w-3 h-3 text-blue-600" />
                          Department Taxonomy
                        </div>
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">{currentCat.name}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{currentCat.description}</p>
                        <Link
                          href={`/products?category=${currentCat.id}`}
                          onClick={() => setHoveredCategory(null)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-2 group"
                        >
                          <span>Explore All {currentCat.name}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                      {/* Subcategories Grid */}
                      <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {currentCat.subCategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/products?category=${currentCat.id}&subCategory=${encodeURIComponent(sub.slug)}`}
                            onClick={() => setHoveredCategory(null)}
                            className="p-3 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group flex items-start gap-3 bg-slate-50/40"
                          >
                            <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 text-slate-600 flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                              <Layers className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600 block transition-colors">
                                {sub.name}
                              </span>
                              <span className="text-[11px] text-slate-400 block truncate">
                                {sub.description || `Browse curated ${sub.name.toLowerCase()}`}
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>

                      {/* Flagship Visual Preview Card */}
                      <div className="md:col-span-3">
                        <Link
                          href={`/products?category=${currentCat.id}`}
                          onClick={() => setHoveredCategory(null)}
                          className="relative block rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group h-44 shadow-sm"
                        >
                          <Image
                            src={currentCat.image}
                            alt={currentCat.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 25vw"
                            className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
                            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                              Featured Collection
                            </span>
                            <h4 className="text-sm font-bold text-white drop-shadow-sm">{currentCat.name}</h4>
                            <span className="text-[11px] text-slate-200 flex items-center gap-1 font-medium">
                              Browse {currentCat.productCount}+ items <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE MENU DRAWER */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-b border-slate-200 bg-white py-4 px-6 space-y-4 shadow-xl max-h-[80vh] overflow-y-auto"
            >


              <div className="space-y-1">
                <div className="text-[11px] font-black uppercase text-slate-400 px-2 tracking-wider">
                  Departments & Sub-Product Lines
                </div>
                {CATEGORIES.map((cat) => {
                  const isExpanded = mobileExpandedCat === cat.id;
                  return (
                    <div key={cat.id} className="border-b border-slate-100 pb-1">
                      <div className="flex items-center justify-between">
                        <Link
                          href={`/products?category=${cat.id}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 flex-1 font-semibold text-xs"
                        >
                          {cat.name}
                        </Link>
                        {cat.subCategories && cat.subCategories.length > 0 && (
                          <button
                            type="button"
                            onClick={() => setMobileExpandedCat(isExpanded ? null : cat.id)}
                            className="p-2 text-slate-400 hover:text-slate-600"
                            aria-label={`Expand ${cat.name}`}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isExpanded ? "rotate-180 text-blue-600" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                      {isExpanded && cat.subCategories && (
                        <div className="pl-4 pb-2 space-y-1 bg-slate-50 rounded-xl p-2 mt-1">
                          {cat.subCategories.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/products?category=${cat.id}&subCategory=${encodeURIComponent(sub.slug)}`}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1.5 px-2.5 text-xs text-slate-600 hover:text-blue-600 font-medium rounded-lg hover:bg-white transition-colors"
                            >
                              • {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <nav className="flex flex-col gap-2 text-sm font-medium">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Home</span>
                  <span className="text-xs text-blue-600 font-bold">Featured</span>
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100"
                >
                  All Products
                </Link>
                <Link
                  href="/products?category=electronics"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100"
                >
                  Electronics & Gadgets
                </Link>
                <Link
                  href="/products?category=fashion"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100"
                >
                  Fashion & Streetwear
                </Link>
                <Link
                  href="/products?category=smart-watches"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100"
                >
                  Smart Watches & Fitness
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-800 hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Wishlist</span>
                  <span className="text-xs bg-rose-100 text-rose-600 px-2 py-0.5 rounded-full font-bold">
                    {wishlist.length}
                  </span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center gap-2 text-xs"
                >
                  <PhoneCall className="w-4 h-4" />
                  24/7 Customer Help & Support
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal Component */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}

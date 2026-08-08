"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Shield, Award, Clock, ArrowUpRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, PRODUCTS } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { formatCurrency } from "@/lib/utils";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const heroProduct = PRODUCTS[0]; // Zenvia Celestial Tourbillon

  const filteredProducts = activeCategory === "all"
    ? PRODUCTS.slice(0, 6)
    : PRODUCTS.filter((p) => p.categoryId === activeCategory);

  return (
    <div className="space-y-24 pb-16 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-6">
        {/* Glow Spheres */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
              <span>Private Vault Collection 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white tracking-tight leading-[1.1]">
              Crafting Timeless <br />
              <span className="gold-text-gradient italic">Elegance & Perfection</span>
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base max-w-xl font-light leading-relaxed">
              Explore rare Swiss tourbillons, 18k solid gold high jewelry, and hand-stitched Florentine leather goods. Engineered for those who appreciate true mastercraftsmanship.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 text-black font-bold text-sm tracking-wide flex items-center gap-2 shadow-xl shadow-luxury-gold/20 transition-all hover:scale-[1.02]"
              >
                Explore Atelier Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/products?category=horlogerie"
                className="px-6 py-4 rounded-xl glass-card hover:bg-white/10 text-white font-semibold text-sm border border-white/10 flex items-center gap-2 transition-all"
              >
                Haute Horlogerie
                <ArrowUpRight className="w-4 h-4 text-luxury-gold" />
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-md">
              <div>
                <span className="text-2xl font-serif font-bold text-white">100%</span>
                <p className="text-[11px] text-zinc-400">Swiss & Italian Certified</p>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white">50 Pcs</span>
                <p className="text-[11px] text-zinc-400">Worldwide Limited Editions</p>
              </div>
              <div>
                <span className="text-2xl font-serif font-bold text-white">24/7</span>
                <p className="text-[11px] text-zinc-400">Concierge Support</p>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Product Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl glass-panel p-5 border border-white/15 shadow-2xl overflow-hidden group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-900">
                <Image
                  src={heroProduct.images[0]}
                  alt={heroProduct.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              </div>

              {/* Overlay Specs Badge */}
              <div className="absolute bottom-8 inset-x-8 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-white flex justify-between items-center">
                <div>
                  <span className="text-[10px] uppercase font-bold text-luxury-gold tracking-widest">
                    Featured Masterpiece
                  </span>
                  <h3 className="text-base font-serif font-semibold line-clamp-1">{heroProduct.title}</h3>
                  <span className="text-sm font-bold gold-text-gradient">
                    {formatCurrency(heroProduct.discountPrice || heroProduct.price)}
                  </span>
                </div>
                <Link
                  href={`/products/${heroProduct.id}`}
                  className="w-10 h-10 rounded-full bg-luxury-gold hover:bg-luxury-gold-dark text-black flex items-center justify-center font-bold transition-all shrink-0"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-luxury-gold">
              Curated Universes
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Explore Our Atelier Categories
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs uppercase font-bold tracking-wider text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            View All Categories <ArrowRight className="w-4 h-4 text-luxury-gold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={`/products?category=${cat.id}`}
                className="group relative block aspect-[16/10] rounded-2xl overflow-hidden glass-card border border-white/10"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-xs font-semibold text-luxury-gold uppercase tracking-wider mb-1">
                    {cat.productCount} Items Available
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-luxury-gold transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-1 mt-1 font-light">{cat.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase font-semibold tracking-widest text-luxury-gold">
            Handpicked Excellence
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Featured Atelier Masterpieces
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-light">
            Every piece is individually inspected, registered with authenticity credentials, and sealed in velvet gift packaging.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-luxury-gold text-black shadow-lg shadow-luxury-gold/20"
                : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            All Masterpieces
          </button>
          {CATEGORIES.slice(0, 4).map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeCategory === c.id
                  ? "bg-luxury-gold text-black shadow-lg shadow-luxury-gold/20"
                  : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod, idx) => (
            <ProductCard key={prod.id} product={prod} index={idx} />
          ))}
        </div>

        <div className="text-center pt-6">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase transition-all"
          >
            Explore Complete Vault Collection
            <ArrowRight className="w-4 h-4 text-luxury-gold" />
          </Link>
        </div>
      </section>

      {/* LUXURY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 lg:p-16 border border-white/15 glass-panel bg-gradient-to-r from-[#12141D] via-[#1A1C29] to-[#0A0B10] text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-xs uppercase tracking-widest font-bold text-luxury-gold">
              Private Concierge Service
            </span>
            <h3 className="text-3xl font-serif font-bold text-white leading-tight">
              Require a Bespoke Timepiece or Custom Gemstone Cut?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              Our private horlogerie masters & gemologists offer custom commissions, tailored engravings, and private appointment viewings at our Paris and Geneva ateliers.
            </p>
          </div>
          <Link
            href="/account"
            className="px-8 py-4 rounded-xl bg-luxury-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-luxury-gold-dark transition-all shrink-0 shadow-xl shadow-luxury-gold/20"
          >
            Request VIP Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}

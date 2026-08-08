"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Heart, Search, User, ShieldCheck, Menu, X, SlidersHorizontal } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { AuthModal } from "./auth-modal";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { totalItems, setIsCartOpen, wishlist } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-panel py-3 shadow-2xl border-b border-white/10"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light flex items-center justify-center font-serif text-black font-extrabold text-lg shadow-lg shadow-luxury-gold/20 group-hover:scale-105 transition-transform">
              Z
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-widest text-lg font-bold text-white group-hover:text-luxury-gold transition-colors">
                ZENVIA
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-gold font-semibold -mt-1">
                Atelier
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase">
            <Link href="/" className="text-zinc-300 hover:text-luxury-gold transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-zinc-300 hover:text-luxury-gold transition-colors">
              Collections
            </Link>
            <Link href="/products?category=horlogerie" className="text-zinc-300 hover:text-luxury-gold transition-colors">
              Horlogerie
            </Link>
            <Link href="/products?category=jewelry" className="text-zinc-300 hover:text-luxury-gold transition-colors">
              Fine Jewelry
            </Link>
            <Link href="/admin" className="text-luxury-gold hover:underline flex items-center gap-1 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin Portal
            </Link>
          </nav>

          {/* Actions (Search, Wishlist, Cart, Auth) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              href="/account"
              className="relative p-2 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors hidden sm:flex"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-luxury-gold text-black text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Account Sign In */}
            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-white font-medium flex items-center gap-2 transition-all"
            >
              <User className="w-4 h-4 text-luxury-gold" />
              <span className="hidden sm:inline">Account</span>
            </button>
          </div>
        </div>

        {/* Live Search Modal Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 bg-[#0B0C12] py-3 px-4 shadow-xl"
            >
              <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-3">
                <Search className="w-5 h-5 text-luxury-gold shrink-0" />
                <input
                  type="text"
                  placeholder="Search Tourbillons, Solid Gold Rings, Calfskin Leather..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-luxury-gold text-black text-xs font-bold hover:bg-luxury-gold-dark transition-colors"
                >
                  Search
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden glass-panel border-b border-white/10 py-6 px-6 space-y-4"
            >
              <nav className="flex flex-col gap-4 text-sm font-medium">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-luxury-gold"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white hover:text-luxury-gold"
                >
                  All Collections
                </Link>
                <Link
                  href="/products?category=horlogerie"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-zinc-300 hover:text-luxury-gold"
                >
                  Haute Horlogerie
                </Link>
                <Link
                  href="/products?category=jewelry"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-zinc-300 hover:text-luxury-gold"
                >
                  Fine Jewelry
                </Link>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-zinc-300 hover:text-luxury-gold"
                >
                  Client Account & Wishlist
                </Link>
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-luxury-gold font-bold flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Executive Portal
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}

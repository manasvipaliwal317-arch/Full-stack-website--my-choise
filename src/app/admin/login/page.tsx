"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("admin@zenvia.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/admin");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07080C] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-luxury-gold-dark to-luxury-gold text-black font-serif font-extrabold text-2xl mx-auto flex items-center justify-center shadow-xl shadow-luxury-gold/20">
            Z
          </div>
          <h1 className="text-2xl font-serif font-bold text-white pt-2">ZENVIA Executive Access</h1>
          <p className="text-xs text-zinc-400">Secure Root Authentication Terminal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Executive Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Passcode</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            {loading ? "Authenticating Terminal..." : "Enter Executive Suite"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500 pt-2 border-t border-white/10">
          <Link href="/" className="hover:text-luxury-gold">
            ← Return to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}

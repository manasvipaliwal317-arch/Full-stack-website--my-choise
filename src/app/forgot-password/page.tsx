"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-serif font-bold text-white">Reset Account Password</h1>
          <p className="text-xs text-zinc-400">Enter your registered email address to receive recovery instructions.</p>
        </div>

        {sent ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs space-y-2 text-center">
            <CheckCircle2 className="w-6 h-6 mx-auto" />
            <p>Password reset instructions sent to <span className="font-bold">{email}</span></p>
            <Link href="/login" className="inline-block pt-2 text-luxury-gold font-bold underline">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="client@zenvia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              Send Reset Instructions
            </button>
          </form>
        )}

        <div className="text-center text-xs text-zinc-400 pt-2 border-t border-white/10">
          Remember your password?{" "}
          <Link href="/login" className="text-white hover:text-luxury-gold font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

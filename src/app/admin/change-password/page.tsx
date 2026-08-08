"use client";

import React, { useState } from "react";
import { KeyRound, ShieldCheck, Save } from "lucide-react";

export default function AdminChangePasswordPage() {
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setStatus("New passwords do not match.");
      return;
    }
    setStatus("Passcode successfully updated in Security Vault.");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <KeyRound className="w-3.5 h-3.5" />
          <span>Security Protocol</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Change Passcode</h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 max-w-md">
        {status && (
          <div className="p-3 rounded-xl bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Current Passcode</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">New Passcode</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Confirm New Passcode</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" /> Update Terminal Passcode
          </button>
        </form>
      </div>
    </div>
  );
}

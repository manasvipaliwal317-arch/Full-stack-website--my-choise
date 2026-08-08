"use client";

import React, { useState } from "react";
import { UserCheck, Save, ShieldCheck } from "lucide-react";

export default function AdminProfilePage() {
  const [name, setName] = useState("Executive Admin");
  const [email, setEmail] = useState("admin@zenvia.com");
  const [role, setRole] = useState("Root Systems Administrator");
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
          <UserCheck className="w-3.5 h-3.5" />
          <span>Executive Dossier</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Admin Profile Manager</h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 max-w-xl">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            Admin profile dossier updated successfully.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Executive Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Admin Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
            />
          </div>

          <div>
            <label className="block font-semibold text-zinc-300 mb-1">Role Designation</label>
            <input
              type="text"
              disabled
              value={role}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-zinc-400 cursor-not-allowed font-medium"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" /> Save Profile Details
          </button>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Save, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const [name, setName] = useState("Lady Eleanor Vance");
  const [email, setEmail] = useState("eleanor.vance@luxury.co");
  const [phone, setPhone] = useState("+1 (212) 555-0198");
  const [address, setAddress] = useState("740 Park Avenue, Apt 14B, New York, NY 10021");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>VIP Collector Dossier</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Client Profile Settings</h1>
      </div>

      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
        {saved && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
            Profile changes successfully saved to Zenvia Vault Register.
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Email Address</label>
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Private Telephone</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-zinc-300 mb-1">Default Delivery Residence</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            Update Profile Dossier
          </button>
        </form>
      </div>
    </div>
  );
}

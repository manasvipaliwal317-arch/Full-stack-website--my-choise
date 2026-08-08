"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Private Concierge</span>
        <h1 className="text-4xl font-serif font-bold text-white">Contact Zenvia Concierge</h1>
        <p className="text-xs sm:text-sm text-zinc-400 font-light">
          For bespoke commissions, tourbillon servicing, or private appointment viewings at our Place Vendôme atelier.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <h3 className="text-lg font-serif font-bold text-white">Global Concierge Salons</h3>

          <div className="space-y-4 text-xs text-zinc-300">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Paris Salon</p>
                <p>14 Place Vendôme, 75001 Paris, France</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-luxury-gold shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Geneva Salon</p>
                <p>Rue du Rhône 28, 1204 Geneva, Switzerland</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-5 h-5 text-luxury-gold shrink-0" />
              <span>+41 22 819 9000 (Geneva)</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-luxury-gold shrink-0" />
              <span>concierge@zenvia.com</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
          {submitted ? (
            <div className="py-12 text-center space-y-3 text-emerald-400">
              <CheckCircle2 className="w-12 h-12 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-white">Inquiry Received</h3>
              <p className="text-xs text-zinc-300 max-w-sm mx-auto">
                A private client manager will reach out to you within 4 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Lord Harrington"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  placeholder="client@zenvia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block font-semibold text-zinc-300 mb-1">Inquiry Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Inquire regarding bespoke engravings, private viewings, or custom gemstones..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Send className="w-4 h-4" /> Send VIP Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

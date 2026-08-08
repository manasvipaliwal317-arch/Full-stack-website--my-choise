"use client";

import React, { useState } from "react";
import { Star, CheckCircle, Trash2 } from "lucide-react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([
    { id: "rev-1", author: "Sir Alistair Sterling", rating: 5, comment: "Exceeded all expectations. The tourbillon movement and titanium bezel are indistinguishable from top Swiss horlogerie houses.", product: "Zenvia Celestial Tourbillon Titanium", status: "APPROVED" },
    { id: "rev-2", author: "Sophia Montgomery", rating: 5, comment: "White glove courier delivery arrived in under 48 hours in insulated velvet packaging with full certificate of authenticity.", product: "Verve Obsidian 18K Ring", status: "APPROVED" },
    { id: "rev-3", author: "Lord Harrington", rating: 4, comment: "Exceptional Alcantara interior lining in the Italian weekender bag.", product: "Milanese Leather Weekender", status: "PENDING" },
  ]);

  const toggleStatus = (id: string) => {
    setReviews(reviews.map((r) => r.id === id ? { ...r, status: r.status === "APPROVED" ? "PENDING" : "APPROVED" } : r));
  };

  const handleDelete = (id: string) => {
    setReviews(reviews.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
          <Star className="w-3.5 h-3.5" />
          <span>Client Testimonials</span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-white">Reviews Moderation</h1>
      </div>

      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl glass-card border border-white/10 space-y-2">
            <div className="flex justify-between items-start text-xs">
              <div>
                <h4 className="font-semibold text-white">{r.author}</h4>
                <span className="text-luxury-gold font-medium">{r.product}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleStatus(r.id)}
                  className={`px-3 py-1 rounded-full font-bold text-[10px] ${
                    r.status === "APPROVED"
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  }`}
                >
                  {r.status}
                </button>
                <button onClick={() => handleDelete(r.id)} className="text-zinc-500 hover:text-red-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex text-amber-400">
              {[...Array(r.rating)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              ))}
            </div>

            <p className="text-xs text-zinc-300 font-light">{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

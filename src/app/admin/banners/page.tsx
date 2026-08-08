"use client";

import React, { useState } from "react";
import { BANNERS, BannerItem } from "@/lib/data";
import { Image as ImageIcon, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<BannerItem[]>(BANNERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newBanner: BannerItem = {
      id: `ban-${Date.now()}`,
      title,
      subtitle,
      image: imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      ctaText: "Explore Collection",
      ctaLink: "/products",
      active: true,
    };
    setBanners([newBanner, ...banners]);
    setIsModalOpen(false);
    setTitle("");
    setSubtitle("");
  };

  const handleDelete = (id: string) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Store Showcase</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Promotional Banners</h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-luxury-gold text-black font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Hero Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((b) => (
          <div key={b.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10 space-y-3 p-4">
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
              <Image src={b.image} alt={b.title} fill className="object-cover" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-white text-base">{b.title}</h3>
                <p className="text-xs text-zinc-400">{b.subtitle}</p>
              </div>
              <button onClick={() => handleDelete(b.id)} className="text-zinc-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-[#0F111A] border border-white/10 rounded-2xl p-6 z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif font-bold text-white">Create Banner</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Banner Title</label>
                <input
                  type="text"
                  required
                  placeholder="Swiss Vault 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  placeholder="Masterpieces forged in titanium"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-luxury-gold text-black font-bold text-xs uppercase">
                Save Banner
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

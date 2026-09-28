"use client";

import React, { useState } from "react";
import { BRANDS, BrandItem } from "@/lib/data";
import { Plus, Trash2, Tag, X } from "lucide-react";
import Image from "next/image";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<BrandItem[]>(BRANDS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newBrand: BrandItem = {
      id: `b-${Date.now()}`,
      name,
      country,
      logo: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?q=80&w=300&auto=format&fit=crop",
      productCount: 1,
    };
    setBrands([newBrand, ...brands]);
    setIsModalOpen(false);
    setName("");
    setCountry("");
  };

  const handleDelete = (id: string) => {
    setBrands(brands.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5" />
            <span>Luxury Houses</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Brands CRUD Management</h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Brand House
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {brands.map((b) => (
          <div key={b.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-serif font-bold text-white text-base">{b.name}</h3>
                <span className="text-xs text-zinc-400">{b.country}</span>
              </div>
              <button onClick={() => handleDelete(b.id)} className="text-zinc-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <span className="text-[10px] text-luxury-gold font-bold uppercase block border-t border-white/5 pt-2">
              {b.productCount} Associated Products
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-[#0F111A] border border-white/10 rounded-2xl p-6 z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif font-bold text-white">Add Brand House</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Patek Philippe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Country of Origin</label>
                <input
                  type="text"
                  required
                  placeholder="Switzerland"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-luxury-gold text-black font-bold text-xs uppercase">
                Save Brand
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

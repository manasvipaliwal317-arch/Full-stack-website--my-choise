"use client";

import React, { useState } from "react";
import { CATEGORIES, CategoryItem } from "@/lib/data";
import { Plus, Trash2, FolderTree, X } from "lucide-react";
import Image from "next/image";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>(CATEGORIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: CategoryItem = {
      id: `cat-${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
      image: imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      productCount: 0,
    };
    setCategories([newCat, ...categories]);
    setIsModalOpen(false);
    setName("");
    setDescription("");
    setImageUrl("");
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Store Hierarchy</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white">Categories CRUD Management</h1>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="glass-card rounded-2xl p-5 border border-white/10 space-y-3 relative group">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
              <Image src={cat.image} alt={cat.name} fill className="object-cover" />
            </div>

            <div className="flex justify-between items-center">
              <h3 className="font-serif font-bold text-white text-base">{cat.name}</h3>
              <button onClick={() => handleDelete(cat.id)} className="text-zinc-500 hover:text-red-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-zinc-400 line-clamp-2">{cat.description}</p>
            <span className="text-[10px] text-luxury-gold font-bold uppercase tracking-wider block">
              {cat.productCount} Linked Masterpieces
            </span>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-[#0F111A] border border-white/10 rounded-2xl p-6 z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif font-bold text-white">Add Atelier Category</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rare Timepieces"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-2.5 text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-luxury-gold text-black font-bold text-xs uppercase">
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

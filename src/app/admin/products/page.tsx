"use client";

import React, { useState } from "react";
import { PRODUCTS, CATEGORIES, ProductItem } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { deleteProductAction } from "@/app/actions/ecommerce";
import { Plus, Trash2, Edit, ShieldCheck, X, Upload, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminProductsPage() {
  const [productList, setProductList] = useState<ProductItem[]>(PRODUCTS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("cat-watches");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price,
          categoryId,
          description,
          images: [imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"],
          stock: 10,
          featured: true,
        }),
      });

      const data = await res.json();
      if (data.success && data.product) {
        setProductList((prev) => [data.product, ...prev]);
        setMessage("Masterpiece added to catalog!");
        setIsAddModalOpen(false);
        setTitle("");
        setPrice("");
        setDescription("");
        setImageUrl("");
      }
    } catch (e) {
      console.error("Failed to add product:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (confirm("Are you sure you want to remove this piece from the vault?")) {
      const result = await deleteProductAction(productId);
      if (result.success) {
        setProductList((prev) => prev.filter((p) => p.id !== productId));
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-luxury-gold/10 border border-luxury-gold/30 text-luxury-gold text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vault Inventory Management</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white mt-2">Product Catalog CRUD</h1>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-luxury-gold/20"
        >
          <Plus className="w-4 h-4" /> Add Masterpiece
        </button>
      </div>

      {message && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
          {message}
        </div>
      )}

      {/* Table List */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/5 border-b border-white/10 text-white font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Vault Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {productList.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                      <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white line-clamp-1">{product.title}</h4>
                      <span className="text-[10px] text-zinc-500 font-mono">{product.id}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-luxury-gold font-medium">{product.category}</span>
                  </td>
                  <td className="p-4 font-bold text-white">
                    {formatCurrency(product.discountPrice || product.price)}
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium">
                      {product.stock} Units
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-zinc-400 hover:text-red-400 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-lg bg-[#0F111A] border border-white/10 rounded-2xl p-6 sm:p-8 z-10 space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="text-xl font-serif font-bold text-white">Add New Vault Masterpiece</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Royal Oak Tourbillon Platinum"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Price (USD)</label>
                  <input
                    type="number"
                    required
                    placeholder="12500"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-luxury-gold"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">High-Res Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter detailed craftsmanship background..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-luxury-gold/20 transition-all"
              >
                {loading ? "Publishing to Vault..." : "Publish Product to Storefront"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

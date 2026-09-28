"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/context/store-context";
import { CategoryItem } from "@/lib/data";
import { Plus, Trash2, Edit, FolderTree, X, Check, Layers } from "lucide-react";

export default function AdminCategoriesPage() {
  const { categories, products, addCategory, updateCategory, deleteCategory } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setImageUrl("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setImageUrl(cat.image);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        description,
        image: imageUrl || editingCategory.image,
      });
      showNotification(`Category "${name}" updated successfully!`);
    } else {
      addCategory({
        name,
        description,
        image: imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      });
      showNotification(`Category "${name}" created successfully!`);
    }

    setIsModalOpen(false);
    setEditingCategory(null);
    setName("");
    setDescription("");
    setImageUrl("");
  };

  const handleDelete = (id: string, catName: string) => {
    if (confirm(`Are you sure you want to delete category "${catName}"?`)) {
      deleteCategory(id);
      showNotification(`Category "${catName}" removed.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderTree className="w-3.5 h-3.5" />
            <span>Store Taxonomy & Hierarchy</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Categories & Departments Control</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Manage product lines, banners, and subcategories. Updates apply immediately to navbar, home tabs, and filter pills.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const linkedCount = products.filter(
            (p) => p.categoryId === cat.id || p.category.toLowerCase() === cat.name.toLowerCase()
          ).length;

          return (
            <div
              key={cat.id}
              className="rounded-2xl p-5 border border-white/10 bg-[#0C0E18] space-y-3 relative group hover:border-blue-500/40 transition-colors"
            >
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                <Image src={cat.image} alt={cat.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-3 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">
                  {linkedCount} Products
                </span>
              </div>

              <div className="flex justify-between items-center pt-1">
                <h3 className="font-bold text-white text-base">{cat.name}</h3>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-colors"
                    title="Edit Category"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id, cat.name)}
                    className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-zinc-400 line-clamp-2">{cat.description}</p>

              {cat.subCategories && cat.subCategories.length > 0 && (
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block">
                    Subcategories ({cat.subCategories.length}):
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {cat.subCategories.map((s) => (
                      <span
                        key={s.id}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
          <div className="relative w-full max-w-md bg-[#0F111A] border border-white/15 rounded-3xl p-6 z-10 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Category / Department Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Smart Watches & Wearables"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Short description for banner and discovery..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-zinc-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

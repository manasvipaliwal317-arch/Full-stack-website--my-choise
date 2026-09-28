"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useStore } from "@/context/store-context";
import { ProductItem } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import {
  Plus,
  Trash2,
  Edit,
  ShieldCheck,
  X,
  Search,
  Sparkles,
  Star,
  Check,
  ArrowUpDown,
  RotateCcw,
  Package,
  Layers,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  const {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    toggleFeatured,
    resetToDefaults,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Add Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    title: "",
    brand: "",
    categoryId: "cat-electronics",
    subCategoryId: "",
    price: "",
    discountPrice: "",
    mrp: "",
    stock: "15",
    imageUrl: "",
    description: "",
    featured: true,
  });

  // Edit Modal State
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    brand: "",
    categoryId: "",
    subCategoryId: "",
    price: "",
    discountPrice: "",
    mrp: "",
    stock: "",
    imageUrl: "",
    description: "",
    featured: false,
  });

  const showNotification = (text: string, type: "success" | "error" = "success") => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategoryFilter === "all" ||
        p.categoryId === selectedCategoryFilter ||
        p.category.toLowerCase() === selectedCategoryFilter.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.brand && p.brand.toLowerCase().includes(q)) ||
        (p.subCategory && p.subCategory.toLowerCase().includes(q));

      return matchCat && matchSearch;
    });
  }, [products, selectedCategoryFilter, searchQuery]);

  // Selected Category's Subcategories for Add Modal
  const activeAddCategory = useMemo(() => {
    return categories.find((c) => c.id === addForm.categoryId) || categories[0];
  }, [categories, addForm.categoryId]);

  // Selected Category's Subcategories for Edit Modal
  const activeEditCategory = useMemo(() => {
    return categories.find((c) => c.id === editForm.categoryId) || categories[0];
  }, [categories, editForm.categoryId]);

  // Open Edit Modal with Pre-filled Product Details
  const handleOpenEdit = (p: ProductItem) => {
    setEditingProduct(p);
    setEditForm({
      title: p.title,
      brand: p.brand || "",
      categoryId: p.categoryId,
      subCategoryId: p.subCategoryId || "",
      price: p.price.toString(),
      discountPrice: p.discountPrice ? p.discountPrice.toString() : "",
      mrp: p.mrp ? p.mrp.toString() : "",
      stock: p.stock.toString(),
      imageUrl: p.images[0] || "",
      description: p.description,
      featured: p.featured,
    });
  };

  // Submit Edit Form
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const catObj = categories.find((c) => c.id === editForm.categoryId);
    const subObj = catObj?.subCategories?.find((s) => s.id === editForm.subCategoryId);

    updateProduct(editingProduct.id, {
      title: editForm.title,
      brand: editForm.brand || "my choise",
      category: catObj ? catObj.name : editingProduct.category,
      categoryId: editForm.categoryId,
      subCategory: subObj ? subObj.name : undefined,
      subCategoryId: editForm.subCategoryId || undefined,
      price: parseFloat(editForm.price) || editingProduct.price,
      discountPrice: editForm.discountPrice ? parseFloat(editForm.discountPrice) : undefined,
      mrp: editForm.mrp ? parseFloat(editForm.mrp) : undefined,
      stock: parseInt(editForm.stock, 10) || 0,
      description: editForm.description,
      featured: editForm.featured,
      images: editForm.imageUrl ? [editForm.imageUrl, ...editingProduct.images.slice(1)] : editingProduct.images,
    });

    setEditingProduct(null);
    showNotification(`Product "${editForm.title}" updated immediately! Changes live across website.`);
  };

  // Submit Add Form
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === addForm.categoryId);
    const subObj = catObj?.subCategories?.find((s) => s.id === addForm.subCategoryId);

    const created = addProduct({
      title: addForm.title,
      brand: addForm.brand || "my choise",
      category: catObj ? catObj.name : "Electronics",
      categoryId: addForm.categoryId,
      subCategory: subObj ? subObj.name : undefined,
      subCategoryId: addForm.subCategoryId || undefined,
      price: parseFloat(addForm.price) || 999,
      discountPrice: addForm.discountPrice ? parseFloat(addForm.discountPrice) : undefined,
      mrp: addForm.mrp ? parseFloat(addForm.mrp) : undefined,
      stock: parseInt(addForm.stock, 10) || 10,
      description: addForm.description || "Premium product listed on my choise.",
      featured: addForm.featured,
      images: addForm.imageUrl
        ? [addForm.imageUrl]
        : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"],
    });

    setIsAddModalOpen(false);
    setAddForm({
      title: "",
      brand: "",
      categoryId: "cat-electronics",
      subCategoryId: "",
      price: "",
      discountPrice: "",
      mrp: "",
      stock: "15",
      imageUrl: "",
      description: "",
      featured: true,
    });

    showNotification(`New product "${created.title}" successfully published to catalog!`);
  };

  // Delete with confirmation
  const handleDeleteProduct = (id: string, title: string) => {
    if (confirm(`Are you sure you want to permanently delete "${title}" from the catalog?`)) {
      deleteProduct(id);
      showNotification(`Product "${title}" removed from catalog.`, "success");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Real-Time Catalog Control</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">Products Management & Live Editing</h1>
          <p className="text-xs text-zinc-400 mt-1">
            Admin has full control to create, edit prices, update stock, modify descriptions, and toggle featured products. All updates reflect immediately storewide.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              if (confirm("Reset catalog to default verified products? Any temporary test items will be cleared.")) {
                resetToDefaults();
                showNotification("Catalog reset to factory default products.");
              }
            }}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
            title="Restore catalog to original verified products"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </button>
        </div>
      </div>

      {/* Live Notification Banner */}
      {message && (
        <div
          className={`p-3.5 rounded-2xl text-xs flex items-center justify-between border ${
            message.type === "success"
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4" />
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-zinc-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search, Filter & Quick Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by title, brand, product ID, or subcategory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#11131F] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="relative">
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="w-full bg-[#11131F] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer"
          >
            <option value="all">All Departments ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-right text-xs text-zinc-400 flex items-center justify-end gap-2">
          <span>Showing <strong>{filteredProducts.length}</strong> of {products.length} products</span>
        </div>
      </div>

      {/* Main Products Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden bg-[#0A0C14]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-white/5 border-b border-white/10 text-white font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">Category & Subcategory</th>
                <th className="p-4">Pricing (INR)</th>
                <th className="p-4 text-center">Live Stock</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-zinc-500">
                    No matching products found for current search and department filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-white/[0.02] transition-colors group">
                    {/* Item Thumbnail & Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.jpg"}
                            alt={product.title}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 max-w-xs sm:max-w-sm">
                          <h4 className="font-semibold text-white truncate text-xs group-hover:text-blue-400 transition-colors">
                            {product.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-zinc-500 font-mono">{product.id}</span>
                            {product.brand && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/5 text-zinc-400 border border-white/5">
                                {product.brand}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department & Subcategory */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="text-white font-medium">{product.category}</span>
                        {product.subCategory && (
                          <span className="text-[10px] text-blue-400 truncate mt-0.5">
                            • {product.subCategory}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Pricing */}
                    <td className="p-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-white text-xs">
                          {formatCurrency(product.discountPrice || product.price)}
                        </span>
                        {product.discountPrice && product.price > product.discountPrice && (
                          <span className="text-[10px] text-zinc-500 line-through">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock Quick Steppers */}
                    <td className="p-4 text-center">
                      <div className="inline-flex items-center gap-2 bg-[#121422] border border-white/10 rounded-xl px-2 py-1">
                        <button
                          onClick={() => updateStock(product.id, -1, true)}
                          disabled={product.stock <= 0}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
                          title="Decrease 1 unit"
                        >
                          -
                        </button>
                        <span
                          className={`font-mono font-bold text-xs ${
                            product.stock === 0
                              ? "text-rose-400"
                              : product.stock < 5
                              ? "text-amber-400"
                              : "text-emerald-400"
                          }`}
                        >
                          {product.stock}
                        </span>
                        <button
                          onClick={() => updateStock(product.id, 1, true)}
                          className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
                          title="Increase 1 unit"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Featured Toggle */}
                    <td className="p-4 text-center">
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          product.featured
                            ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                            : "bg-white/5 border-white/10 text-zinc-600 hover:text-zinc-400"
                        }`}
                        title="Click to toggle featured spotlight"
                      >
                        <Star className={`w-4 h-4 ${product.featured ? "fill-amber-400" : ""}`} />
                      </button>
                    </td>

                    {/* Actions: Edit & Delete */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          target="_blank"
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                          title="Preview Product Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(product)}
                          className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 transition-colors"
                          title="Edit Product Details"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id, product.title)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setEditingProduct(null)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-2xl bg-[#0F111A] border border-white/15 rounded-3xl p-6 sm:p-8 z-10 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Live Editor</span>
                <h3 className="text-xl font-bold text-white">Edit Product: {editingProduct.id}</h3>
              </div>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Brand Name</label>
                  <input
                    type="text"
                    value={editForm.brand}
                    onChange={(e) => setEditForm({ ...editForm, brand: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editForm.stock}
                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Department / Category</label>
                  <select
                    value={editForm.categoryId}
                    onChange={(e) => setEditForm({ ...editForm, categoryId: e.target.value, subCategoryId: "" })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Subcategory Type</label>
                  <select
                    value={editForm.subCategoryId}
                    onChange={(e) => setEditForm({ ...editForm, subCategoryId: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">None / General</option>
                    {(activeEditCategory?.subCategories || []).map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editForm.price}
                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Optional deal price"
                    value={editForm.discountPrice}
                    onChange={(e) => setEditForm({ ...editForm, discountPrice: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Original MRP"
                    value={editForm.mrp}
                    onChange={(e) => setEditForm({ ...editForm, mrp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Primary Image URL</label>
                <input
                  type="text"
                  required
                  value={editForm.imageUrl}
                  onChange={(e) => setEditForm({ ...editForm, imageUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Product Description</label>
                <textarea
                  rows={3}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="editFeatured"
                  checked={editForm.featured}
                  onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="editFeatured" className="text-zinc-300 font-medium">
                  Spotlight in Homepage Featured Collection & Hot Deals
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
                >
                  Save & Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setIsAddModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-2xl bg-[#0F111A] border border-white/15 rounded-3xl p-6 sm:p-8 z-10 space-y-6 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">New Item</span>
                <h3 className="text-xl font-bold text-white">Add New Product to Catalog</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UltraFit Pro GPS Smartwatch with SpO2"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Brand Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Apple, Nike, boAt"
                    value={addForm.brand}
                    onChange={(e) => setAddForm({ ...addForm, brand: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={addForm.stock}
                    onChange={(e) => setAddForm({ ...addForm, stock: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Department / Category</label>
                  <select
                    value={addForm.categoryId}
                    onChange={(e) => setAddForm({ ...addForm, categoryId: e.target.value, subCategoryId: "" })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Subcategory Type</label>
                  <select
                    value={addForm.subCategoryId}
                    onChange={(e) => setAddForm({ ...addForm, subCategoryId: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select Subcategory (Recommended)</option>
                    {(activeAddCategory?.subCategories || []).map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="1999"
                    value={addForm.price}
                    onChange={(e) => setAddForm({ ...addForm, price: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">Discount Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Optional deal price"
                    value={addForm.discountPrice}
                    onChange={(e) => setAddForm({ ...addForm, discountPrice: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-zinc-300 font-semibold mb-1">MRP Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Original MRP"
                    value={addForm.mrp}
                    onChange={(e) => setAddForm({ ...addForm, mrp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Primary Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={addForm.imageUrl}
                  onChange={(e) => setAddForm({ ...addForm, imageUrl: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of features, materials, and benefits..."
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="addFeatured"
                  checked={addForm.featured}
                  onChange={(e) => setAddForm({ ...addForm, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="addFeatured" className="text-zinc-300 font-medium">
                  Spotlight in Homepage Featured Collection & Hot Deals
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
                >
                  Publish Product Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

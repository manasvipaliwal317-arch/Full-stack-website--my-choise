"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, ArrowLeft, Send, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/context/cart-context";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { submitReviewAction } from "@/app/actions/ecommerce";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id || p.slug === resolvedParams.id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif text-white">Product Not Found</h2>
        <p className="text-xs text-zinc-400">The requested timepiece or gemstone does not exist in our catalog.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-full bg-luxury-gold text-black text-xs font-bold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("Grade 5 Titanium / Alligator Strap");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);

  const discountPercent = calculateDiscountPercentage(product.price, product.discountPrice || product.price);
  const inWishlist = isInWishlist(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 3);

  const variantsList = [
    "Grade 5 Titanium / Alligator Strap",
    "18K Solid Gold / Onyx Dial",
    "Platinum Case / Diamond Bezel",
  ];

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("rating", reviewRating.toString());
    formData.append("comment", reviewComment);
    formData.append("userName", reviewAuthor || "Authenticated Client");

    const result = await submitReviewAction(formData);
    if (result.success) {
      setReviewStatus(result.message);
      setReviewComment("");
      setReviewAuthor("");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Back Link */}
      <Link href="/products" className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4 text-luxury-gold" />
        Back to Collections
      </Link>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Media Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden glass-panel border border-white/10 bg-zinc-900 group">
            <Image
              src={product.images[selectedImageIndex] || product.images[0]}
              alt={product.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full border border-red-400/30">
                -{discountPercent}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx ? "border-luxury-gold scale-105" : "border-white/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Buying Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">
                {product.category}
              </span>
              <span className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full font-medium">
                In Vault Stock ({product.stock} left)
              </span>
            </div>

            <h1 className="text-3xl font-serif font-bold text-white mt-2 mb-3 leading-tight">{product.title}</h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">{product.rating}</span>
              <span className="text-xs text-zinc-400">({product.numReviews} Client Reviews)</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-4xl font-bold text-white gold-text-gradient">
                {formatCurrency(product.discountPrice || product.price)}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-zinc-500 line-through font-normal">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>

            <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Product Variants Selector */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs uppercase font-bold text-luxury-gold tracking-wider">
                Select Finish & Edition Variant
              </label>
              <div className="space-y-2">
                {variantsList.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={`w-full p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                      selectedVariant === v
                        ? "bg-luxury-gold/10 border-luxury-gold text-white"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span>{v}</span>
                    {selectedVariant === v && <Check className="w-4 h-4 text-luxury-gold" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Specifications Card */}
            {product.details && product.details.length > 0 && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 mb-6">
                <h4 className="text-xs uppercase font-semibold text-luxury-gold tracking-wider">
                  Atelier Craftsmanship Specifications
                </h4>
                <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside">
                  {product.details.map((detail, idx) => (
                    <li key={idx}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Purchasing Controls */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-white/10 rounded-xl bg-black/40 px-3 py-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-zinc-400 hover:text-white px-2 font-bold"
                >
                  -
                </button>
                <span className="text-sm font-semibold text-white px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-zinc-400 hover:text-white px-2 font-bold"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 text-black font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl shadow-luxury-gold/20 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Atelier Bag
              </button>

              {/* Wishlist Toggle */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-4 rounded-xl border transition-colors ${
                  inWishlist
                    ? "bg-red-500/10 border-red-500/30 text-red-500"
                    : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} />
              </button>
            </div>

            {/* Service Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-[11px] text-zinc-400 text-center">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                <span>Swiss Certified</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Truck className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                <span>Insured Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RefreshCw className="w-5 h-5 text-luxury-gold stroke-[1.5]" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS & CLIENT FEEDBACK SECTION */}
      <div className="pt-12 border-t border-white/10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Client Testimonials</span>
          <h3 className="text-2xl font-serif font-bold text-white">Client Reviews & Rating</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Submit Review Form */}
          <div className="md:col-span-5 glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h4 className="text-sm font-bold text-white">Write a Collector Review</h4>

            {reviewStatus && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded-lg border border-emerald-500/20">
                {reviewStatus}
              </p>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lord Harrington"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Rating</label>
                <select
                  value={reviewRating}
                  onChange={(e) => setReviewRating(parseInt(e.target.value))}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                >
                  <option value={5}>5 Stars - Flawless Quality</option>
                  <option value={4}>4 Stars - Exceptional</option>
                  <option value={3}>3 Stars - Good</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">Your Feedback</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe craftsmanship, finishing, and delivery experience..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-luxury-gold hover:bg-luxury-gold-dark text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit Verification Review
              </button>
            </form>
          </div>

          {/* Sample Verified Reviews List */}
          <div className="md:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Sir Alistair Sterling</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                "Exceeded all expectations. The finishing on the tourbillon movement and titanium bezel is indistinguishable from top Swiss haute horlogerie houses."
              </p>
              <span className="text-[10px] text-zinc-500 block pt-1">Verified Purchase • Geneva, Switzerland</span>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-white">Sophia Montgomery</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 stroke-none" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-zinc-300 font-light leading-relaxed">
                "White glove delivery arrived in under 48 hours in insulated velvet packaging with full certificate of authenticity."
              </p>
              <span className="text-[10px] text-zinc-500 block pt-1">Verified Purchase • London, UK</span>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <div className="pt-12 border-t border-white/10 space-y-6">
          <h3 className="text-2xl font-serif font-bold text-white">You May Also Admire</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

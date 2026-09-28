"use client";

import React, { useState, use, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowLeft,
  Send,
  ChevronRight,
  MapPin,
  Lock,
  Sparkles,
  Plus,
  Award,
  Box,
  CreditCard,
  Percent,
  CheckCircle2,
  X,
  ShoppingCart,
  ThumbsUp,
  Ruler,
  Droplet,
  Leaf,
} from "lucide-react";
import { ProductItem, AboutBullet, ProductVariant } from "@/lib/data";
import { useStore } from "@/context/store-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/components/toast";
import { formatCurrency, calculateDiscountPercentage } from "@/lib/utils";
import { ProductCard } from "@/components/product-card";
import { submitReviewAction } from "@/app/actions/ecommerce";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { showToast } = useToast();
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useCart();
  const { products } = useStore();

  const product = products.find((p) => p.id === resolvedParams.id || p.slug === resolvedParams.id);

  // States
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string>(product?.images[0] || "");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [protectionPlan, setProtectionPlan] = useState(false);
  const [pincode, setPincode] = useState("110001");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>("Delivery available (Fast 2-Day Delivery)");
  const [isChangingPincode, setIsChangingPincode] = useState(false);
  const [tempPincode, setTempPincode] = useState("");
  const [activeOfferModal, setActiveOfferModal] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [selectedSkinType, setSelectedSkinType] = useState("All Skin Types");
  const [activeRufusQA, setActiveRufusQA] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState("");
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [bundleItemsChecked, setBundleItemsChecked] = useState<Record<string, boolean>>({});
  const [showAllBullets, setShowAllBullets] = useState(false);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: "none" });

  // Review states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewStatus, setReviewStatus] = useState<string | null>(null);
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, number>>({
    r1: 34,
    r2: 19,
    r3: 8,
  });

  // Sync state whenever product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0] || "");
      setSelectedVariantId(product.variants?.[0]?.id || null);
      setSelectedImageIndex(0);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Product Not Found</h2>
        <p className="text-sm text-slate-500">The requested item does not exist or has been relocated.</p>
        <Link
          href="/products"
          className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-md hover:bg-blue-700"
        >
          Return to All Products
        </Link>
      </div>
    );
  }

  // Active variant resolution
  const variants = product.variants || [];
  const selectedVariant = variants.find((v) => v.id === selectedVariantId) || variants[0] || null;

  // Category-specific flags for adaptive presentation
  const isFashionCategory = product.categoryId === "cat-fashion" || product.categoryId === "cat-footwear";
  const isBeautyCategory = product.categoryId === "cat-beauty";
  const isFragrance =
    product.subCategoryId === "sub-fragrance" ||
    product.title.toLowerCase().includes("parfum") ||
    product.title.toLowerCase().includes("perfume");

  // Active pricing calculation
  const currentPrice = selectedVariant ? selectedVariant.price : (product.discountPrice || product.price);
  const originalMrp = product.mrp || (selectedVariant && selectedVariant.mrp) || Math.round(product.price * 1.6);
  const discountPercent = calculateDiscountPercentage(originalMrp, currentPrice);
  const inWishlist = isInWishlist(product.id);

  // Gallery images: maintain all images of product and all unique variant images
  const galleryImages = useMemo(() => {
    const list = [...product.images];
    if (product.variants) {
      for (const v of product.variants) {
        if (v.image && !list.includes(v.image)) {
          list.push(v.image);
        }
      }
    }
    return list;
  }, [product.images, product.variants]);

  // Current main display image
  const currentMainImage = activeImage || galleryImages[selectedImageIndex] || galleryImages[0];

  // Map image to its corresponding variant (for price & attribute synchronization)
  const getVariantForImage = (img: string, idx: number): ProductVariant | null => {
    if (!variants || variants.length === 0) return null;

    // 1. Exact match with variant image URL
    const direct = variants.find((v) => v.image === img);
    if (direct) return direct;

    // 2. URL match without query params
    const cleanImg = img.split("?")[0];
    const cleanMatch = variants.find((v) => v.image.split("?")[0] === cleanImg);
    if (cleanMatch) return cleanMatch;

    // 3. Keyword / color matching in variant names
    const lowerImg = img.toLowerCase();
    for (const v of variants) {
      const words = v.name.toLowerCase().split(/[\s\/\-_,]+/).filter((w) => w.length > 2);
      if (words.some((w) => lowerImg.includes(w))) {
        return v;
      }
    }

    // 4. Positional 1:1 match if variant count equals image count
    if (variants.length === product.images.length && variants[idx]) {
      return variants[idx];
    }

    // 5. If this is an angle photo belonging to the primary variant (e.g. angle 1, 2, 3)
    if (product.images.includes(img)) {
      const primaryVariant = variants.find((v) => v.image === product.images[0]) || variants[0];
      if (primaryVariant) return primaryVariant;
    }

    return null;
  };

  // Handler for variant click: IMMEDIATELY changes variant, main image, and price
  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariantId(variant.id);
    if (variant.image) {
      setActiveImage(variant.image);
      const idx = galleryImages.indexOf(variant.image);
      if (idx !== -1) {
        setSelectedImageIndex(idx);
      }
    }
  };

  // Handler for thumbnail click: switches main image AND updates variant & price accordingly
  const handleSelectThumbnail = (img: string, idx: number) => {
    setSelectedImageIndex(idx);
    setActiveImage(img);

    const matchedVariant = getVariantForImage(img, idx);
    if (matchedVariant) {
      setSelectedVariantId(matchedVariant.id);
    }
  };

  // Frequently bought together bundle
  const bundleCompanion = product.frequentlyBoughtTogether?.[0] || null;
  const isPrimaryChecked = bundleItemsChecked["primary"] ?? true;
  const isCompanionChecked = bundleItemsChecked["companion"] ?? true;

  const bundleTotal = useMemo(() => {
    let sum = 0;
    if (isPrimaryChecked) sum += currentPrice;
    if (isCompanionChecked && bundleCompanion) sum += bundleCompanion.price;
    return sum;
  }, [isPrimaryChecked, isCompanionChecked, currentPrice, bundleCompanion]);

  // About this item bullets
  const aboutBullets: AboutBullet[] = useMemo(() => {
    if (product.aboutThisItem && product.aboutThisItem.length > 0) {
      return product.aboutThisItem.map((item) => {
        if (typeof item === "string") {
          const parts = item.split(":");
          return {
            title: parts.length > 1 ? parts[0].replace(/\*\*/g, "").trim() : "Key Feature",
            description: parts.length > 1 ? parts.slice(1).join(":").trim() : item,
          };
        }
        return item;
      });
    }

    if (product.details && product.details.length > 0) {
      return product.details.map((detail, idx) => {
        const titles = [
          "Premium Quality & Durability",
          "Ergonomic & Functional Design",
          "High Performance Architecture",
          "Seamless Everyday Usability",
          "Manufacturer Reliability",
        ];
        return {
          title: titles[idx] || "Special Feature",
          description: detail,
        };
      });
    }

    return [
      { title: "Premium Engineering", description: product.description },
      { title: "Long-lasting Reliability", description: "Built with high-grade components engineered for dependable daily performance." },
      { title: "Customer Satisfaction", description: "Backed by standard brand warranty and dedicated 24/7 post-purchase support." },
    ];
  }, [product]);

  // Specifications key-value map
  const specsMap: Record<string, string> = useMemo(() => {
    if (product.specs && Object.keys(product.specs).length > 0) {
      const merged = { ...product.specs };
      if (selectedVariant) {
        merged["Colour"] = selectedVariant.name;
      }
      return merged;
    }
    return {
      Colour: selectedVariant ? selectedVariant.name : "Standard Edition",
      Brand: product.brand || "my choise Select",
      Category: product.category,
      "Item Condition": "100% Brand New Original",
      Warranty: "1 Year Comprehensive Manufacturer Warranty",
      "Package Included": "1x Main Unit, User Guide, Warranty Card",
    };
  }, [product, selectedVariant]);

  // Related products
  const relatedProducts = products.filter((p) => product && p.categoryId === product.categoryId && p.id !== product.id).slice(0, 6);
  const trendingComplementary = products.filter((p) => product && p.id !== product.id).slice(0, 6);

  // Q&A Chips ("Ask Rufus")
  const defaultQAs = [
    {
      question: "Is this product covered by warranty?",
      answer: "Yes! It comes with 1 Year Manufacturer Warranty along with hassle-free 7-day replacement support.",
    },
    {
      question: "How fast is delivery?",
      answer: "Order placed within the countdown timer qualifies for express dispatch and delivery within 24 to 48 hours.",
    },
    {
      question: "Are there any hidden charges?",
      answer: "No hidden charges! All prices shown are inclusive of all GST and applicable taxes.",
    },
  ];
  const activeQAs = product.qa && product.qa.length > 0 ? product.qa : defaultQAs;

  // Handlers
  const handleAddToCart = () => {
    const itemToAdd: ProductItem = {
      ...product,
      id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
      title: selectedVariant ? `${product.title} (${selectedVariant.name})` : product.title,
      discountPrice: currentPrice,
      price: selectedVariant?.mrp || product.mrp || product.price,
      images: activeImage ? [activeImage, ...product.images.filter((i) => i !== activeImage)] : product.images,
    };
    addToCart(itemToAdd, quantity);
    showToast(`Added ${quantity}x "${selectedVariant?.name ? `${product.title.slice(0, 24)}... (${selectedVariant.name})` : product.title.slice(0, 32)}" to your cart!`, "success");
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    const itemToAdd: ProductItem = {
      ...product,
      id: selectedVariant ? `${product.id}-${selectedVariant.id}` : product.id,
      title: selectedVariant ? `${product.title} (${selectedVariant.name})` : product.title,
      discountPrice: currentPrice,
      price: selectedVariant?.mrp || product.mrp || product.price,
      images: activeImage ? [activeImage, ...product.images.filter((i) => i !== activeImage)] : product.images,
    };
    addToCart(itemToAdd, quantity);
    router.push("/checkout");
  };

  const handleAddBundleToCart = () => {
    if (isPrimaryChecked) {
      addToCart(product, 1);
    }
    if (isCompanionChecked && bundleCompanion) {
      const mockCompanionProduct: ProductItem = {
        id: bundleCompanion.id,
        title: bundleCompanion.title,
        slug: bundleCompanion.id,
        category: product.category,
        categoryId: product.categoryId,
        brand: product.brand,
        price: bundleCompanion.mrp || bundleCompanion.price * 1.5,
        discountPrice: bundleCompanion.price,
        stock: 10,
        rating: bundleCompanion.rating,
        numReviews: 89,
        featured: false,
        isNew: false,
        description: bundleCompanion.title,
        details: ["Official bundle accessory", "100% match guarantee"],
        images: [bundleCompanion.image],
      };
      addToCart(mockCompanionProduct, 1);
    }
    showToast(`Bundle added to cart! (${formatCurrency(bundleTotal)})`, "success");
    setIsCartOpen(true);
  };

  const handleShare = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Product link copied to clipboard!", "info");
    } else {
      showToast("Link: " + window.location.href, "info");
    }
  };

  const handlePincodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempPincode.trim().length === 6) {
      setPincode(tempPincode.trim());
      setPincodeStatus("Delivery available! Estimated delivery in 2 business days.");
      setIsChangingPincode(false);
      showToast(`Pincode updated to ${tempPincode.trim()}`, "success");
    } else {
      setPincodeStatus("Please enter a valid 6-digit Indian PIN code.");
    }
  };

  const handleAskRufus = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const qLower = userQuery.toLowerCase();
    if (qLower.includes("weight") || qLower.includes("heavy") || qLower.includes("hold")) {
      setCustomAnswer("Engineered with high load-bearing capacity and reinforced joints to support maximum weight reliably.");
    } else if (qLower.includes("pot") || qLower.includes("included") || qLower.includes("accessories")) {
      setCustomAnswer("This listing includes the main unit and essential assembly hardware. Other items shown in photos are for styling demonstration.");
    } else if (qLower.includes("return") || qLower.includes("replace") || qLower.includes("refund")) {
      setCustomAnswer("Enjoy a hassle-free 7-day return and replacement policy with instant pickup from your address.");
    } else if (qLower.includes("water") || qLower.includes("weather") || qLower.includes("outdoor")) {
      setCustomAnswer("Protected with weather-resistant anti-corrosive powder coating suitable for both outdoor balconies and indoor living spaces.");
    } else {
      setCustomAnswer(`Yes, regarding "${userQuery}": This product is verified by my choise Quality Control and meets high standard manufacturing specifications.`);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", product.id);
    formData.append("rating", reviewRating.toString());
    formData.append("comment", reviewComment);
    formData.append("userName", reviewAuthor || "Verified Buyer");

    const result = await submitReviewAction(formData);
    if (result.success) {
      setReviewStatus(result.message || "Review submitted successfully!");
      setReviewComment("");
      setReviewAuthor("");
      showToast("Review submitted successfully! Thank you.", "success");
    }
  };

  // Image Magnifier Hover effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: "block",
      backgroundImage: `url(${currentMainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "220%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-slate-900 font-sans pb-16">
      {/* 1. TOP BREADCRUMBS BAR */}
      <div className="border-b border-slate-200 bg-slate-50/60 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <nav className="flex items-center space-x-1.5 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href={`/products?category=${product.categoryId}`} className="hover:text-blue-600 transition-colors">
              {product.category}
            </Link>
            {product.subCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <Link
                  href={`/products?category=${product.categoryId}&subCategory=${encodeURIComponent(product.subCategoryId || product.subCategory)}`}
                  className="hover:text-blue-600 transition-colors font-medium text-slate-600"
                >
                  {product.subCategory}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-700 font-medium">{product.brand || "Store"}</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400 truncate max-w-xs">{product.title}</span>
          </nav>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-1 text-slate-600 hover:text-blue-600 font-medium shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to results
          </Link>
        </div>
      </div>

      {/* 2. MAIN BALANCED PRODUCT PRESENTATION (NO UNWANTED SPACE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
          
          {/* ================= LEFT COLUMN: GALLERY & RUFUS (lg:col-span-5) ================= */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-6">
            {/* Main Stage with Zoom Lens */}
            <div className="relative">
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full aspect-square rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-center overflow-hidden cursor-crosshair group shadow-sm"
              >
                <Image
                  src={currentMainImage}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-contain p-3 transition-transform duration-200 group-hover:scale-105"
                />

                {/* Floating Top-Right Action Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
                  <button
                    onClick={handleShare}
                    title="Share this product"
                    className="w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-sm flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    title={inWishlist ? "In Wishlist" : "Add to Wishlist"}
                    className={`w-9 h-9 rounded-full bg-white/90 border shadow-sm flex items-center justify-center transition-colors ${
                      inWishlist ? "border-rose-300 text-rose-600" : "border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? "fill-rose-500 text-rose-500" : ""}`} />
                  </button>
                </div>

                {/* Discount Ribbon */}
                {discountPercent > 0 && (
                  <span className="absolute top-3 left-3 bg-[#CC0C39] text-white text-[11px] font-black px-2.5 py-1 rounded shadow-sm uppercase tracking-wide">
                    {discountPercent}% off
                  </span>
                )}
              </div>

              {/* Hover Zoom Preview Panel (Visible on Desktop hover) */}
              <div
                style={zoomStyle}
                className="hidden xl:block pointer-events-none absolute left-[102%] top-0 w-[460px] h-[460px] border border-slate-200 rounded-2xl bg-white shadow-2xl z-30 overflow-hidden"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectThumbnail(img, idx)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 bg-white transition-all ${
                    currentMainImage === img
                      ? "border-[#E77600] shadow-md ring-2 ring-[#E77600]/30"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <Image src={img} alt={`Angle ${idx + 1}`} fill sizes="64px" className="object-contain p-1.5" />
                </button>
              ))}
            </div>

            {/* "Ask Rufus" AI Product Assistant Chips */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-slate-50 border border-blue-200/80 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-slate-900 tracking-wide">
                  Ask Rufus • AI Product Assistant
                </span>
              </div>

              {/* Question Pills */}
              <div className="flex flex-wrap gap-1.5">
                {activeQAs.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveRufusQA(activeRufusQA === qa.question ? null : qa.question);
                      setCustomAnswer(null);
                    }}
                    className={`text-[11px] px-3 py-1.5 rounded-full border transition-all text-left font-medium ${
                      activeRufusQA === qa.question
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-white text-slate-700 border-slate-300 hover:border-blue-500 hover:bg-blue-50/50"
                    }`}
                  >
                    {qa.question}
                  </button>
                ))}
              </div>

              {/* Expanded Answer Bubble */}
              {activeRufusQA && (
                <div className="p-3 rounded-xl bg-white border border-blue-200 text-xs text-slate-700 shadow-sm space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center justify-between text-blue-700 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Rufus Answer:
                    </span>
                    <button onClick={() => setActiveRufusQA(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="leading-relaxed">
                    {activeQAs.find((q) => q.question === activeRufusQA)?.answer}
                  </p>
                </div>
              )}

              {/* Custom Answer Bubble */}
              {customAnswer && (
                <div className="p-3 rounded-xl bg-white border border-blue-200 text-xs text-slate-700 shadow-sm space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center justify-between text-blue-700 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Rufus Verified Response:
                    </span>
                    <button onClick={() => setCustomAnswer(null)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="leading-relaxed">{customAnswer}</p>
                </div>
              )}

              {/* Free-form Question Input */}
              <form onSubmit={handleAskRufus} className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="Ask a question about this item..."
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
                >
                  Ask
                </button>
              </form>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: COMPLETE DETAILS & BUY BOX (lg:col-span-7) ================= */}
          {/* This expands across the full remaining width so there is ZERO unwanted white space on the right! */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header: Title, Brand Link, Ratings */}
            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug">
                {product.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <Link
                  href={`/products?brand=${product.brand || "all"}`}
                  className="text-xs font-semibold text-[#007185] hover:text-[#C7511F] hover:underline"
                >
                  Visit the {product.brand || "my choise"} Store
                </Link>
                <span className="text-[11px] text-slate-400 font-medium">SKU: {product.id}</span>
              </div>

              {/* Ratings and Search link */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 text-[#007185] hover:text-[#C7511F] cursor-pointer">
                  <span className="font-bold text-slate-800">{product.rating}</span>
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-500 hover:underline">({product.numReviews} ratings)</span>
                </div>
                <span className="text-slate-300">|</span>
                <a href="#customer-reviews" className="text-[#007185] hover:underline hover:text-[#C7511F]">
                  Search this page
                </a>
              </div>

              {/* Limited Time Deal Badge */}
              <div className="inline-flex items-center gap-2 pt-1">
                <span className="bg-[#CC0C39] text-white text-[11px] font-black px-2.5 py-0.5 rounded shadow-sm">
                  Limited time deal
                </span>
                {product.featured && (
                  <span className="bg-[#232F3E] text-amber-400 text-[11px] font-bold px-2 py-0.5 rounded shadow-sm">
                    #1 Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* INTEGRATED BUY BOX & PRICING BAR */}
            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                {/* Price Display */}
                <div>
                  <div className="flex items-baseline gap-2.5">
                    {discountPercent > 0 && (
                      <span className="text-2xl sm:text-3xl font-light text-[#CC0C39]">
                        -{discountPercent}%
                      </span>
                    )}
                    <div className="flex items-start">
                      <span className="text-sm font-semibold text-slate-900 mt-1">₹</span>
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        {currentPrice.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {originalMrp > currentPrice && (
                    <div className="text-xs text-slate-500">
                      M.R.P.: <span className="line-through">{formatCurrency(originalMrp)}</span>
                    </div>
                  )}

                  <div className="text-xs text-slate-700 font-medium pt-0.5">
                    Inclusive of all taxes •{" "}
                    <span className="font-bold">EMI</span> starts at ₹{Math.round(currentPrice / 12).toLocaleString("en-IN")}/mo.{" "}
                    <button
                      onClick={() => setActiveOfferModal("emi")}
                      className="text-[#007185] hover:underline font-semibold"
                    >
                      EMI options
                    </button>
                  </div>
                </div>

                {/* Stock Urgency Tag */}
                <div className="text-left sm:text-right shrink-0">
                  {product.stock <= 3 ? (
                    <span className="text-sm font-bold text-[#B12704] block">
                      Only {product.stock} left in stock - order soon.
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-[#007600] block">
                      In stock • Ready to Ship
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-medium">
                    Ships from <strong>my choise</strong>
                  </span>
                </div>
              </div>

              {/* Delivery info & Location Changer */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-700">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>
                    FREE delivery <strong>Tuesday, 29 September</strong> to <strong>Manas - {pincode}</strong>
                  </span>
                </div>
                <button
                  onClick={() => setIsChangingPincode(!isChangingPincode)}
                  className="text-[#007185] hover:underline font-semibold"
                >
                  {isChangingPincode ? "Cancel" : "Change pincode"}
                </button>
              </div>

              {/* Pincode Change input */}
              {isChangingPincode && (
                <form onSubmit={handlePincodeSubmit} className="pt-1 flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN"
                    value={tempPincode}
                    onChange={(e) => setTempPincode(e.target.value)}
                    className="max-w-xs bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs shrink-0"
                  >
                    Check Availability
                  </button>
                  {pincodeStatus && (
                    <span className="text-xs text-emerald-700 font-medium self-center">
                      {pincodeStatus}
                    </span>
                  )}
                </form>
              )}

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-full px-3 py-2 shrink-0">
                  <span className="text-xs font-semibold text-slate-600">Qty:</span>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="bg-transparent text-xs text-slate-900 font-bold focus:outline-none cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Add to Cart (Signature Amazon Yellow) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-6 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all border border-[#FCD200] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>

                {/* Buy Now (Signature Amazon Orange) */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-6 rounded-full bg-[#FFA41C] hover:bg-[#FA8900] text-slate-950 font-bold text-xs sm:text-sm shadow-sm transition-all border border-[#FF8F00] active:scale-[0.99] flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>

              {/* Extended Protection Plan checkbox */}
              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={protectionPlan}
                    onChange={(e) => setProtectionPlan(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <span>
                    Add <strong>1-Year Extended Warranty Plan</strong> for ₹199
                  </span>
                </label>
                <span className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Lock className="w-3 h-3 text-slate-400" /> Secure Transaction
                </span>
              </div>
            </div>

            {/* ADAPTIVE CATEGORY-SPECIFIC VARIANT SWATCHES */}
            {variants.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-slate-500 font-medium">
                      {isFashionCategory
                        ? "Select Size & Edition: "
                        : isBeautyCategory
                        ? "Select Bottle & Volume: "
                        : "Select Edition / Style: "}
                    </span>
                    <span className="font-bold text-slate-900">{selectedVariant?.name}</span>
                  </div>

                  {isFashionCategory && (
                    <button
                      type="button"
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs text-blue-600 hover:text-blue-800 font-bold inline-flex items-center gap-1 hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Size Guide
                    </button>
                  )}
                </div>

                {/* Main Variant Cards */}
                <div className="flex flex-wrap gap-2.5">
                  {variants.map((variant) => {
                    const isSelected = selectedVariant?.id === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleSelectVariant(variant)}
                        className={`p-1.5 rounded-xl border text-left flex items-center gap-2.5 transition-all bg-white cursor-pointer ${
                          isSelected
                            ? "border-[#E77600] ring-2 ring-[#E77600]/40 shadow-md bg-amber-50/20"
                            : "border-slate-200 hover:border-slate-400 hover:shadow-sm"
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                          <Image src={variant.image} alt={variant.name} fill sizes="48px" className="object-contain p-1" />
                        </div>
                        <div className="pr-2">
                          <span className="text-xs font-bold text-slate-800 block leading-tight">{variant.name}</span>
                          <span className="text-xs font-bold text-[#B12704]">{formatCurrency(variant.price)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Size Pill Quick-Selector for Fashion */}
                {isFashionCategory && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                      <span>Available Sizes (Standard Fit):</span>
                      <span className="text-emerald-600 lowercase font-medium">in stock</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["S", "M", "L", "XL", "XXL"].map((size) => {
                        const isMatch = selectedVariant?.name.toLowerCase().includes(`size ${size.toLowerCase()}`) || (size === "M" && !selectedVariant?.name.toLowerCase().includes("size"));
                        return (
                          <button
                            key={size}
                            type="button"
                            onClick={() => {
                              const found = variants.find((v) => v.name.toLowerCase().includes(`size ${size.toLowerCase()}`));
                              if (found) handleSelectVariant(found);
                            }}
                            className={`min-w-10 h-9 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center ${
                              isMatch
                                ? "bg-slate-900 text-white shadow-md ring-2 ring-slate-900/30"
                                : "bg-white border border-slate-200 text-slate-700 hover:border-slate-400"
                            }`}
                          >
                            {size}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Skin Type selector for Beauty & Skincare */}
                {isBeautyCategory && (
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                      Target Skin Type Match:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {["All Skin Types", "Dry / Dehydrated", "Combination / Normal", "Sensitive / Acne-Prone"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setSelectedSkinType(type)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            selectedSkinType === type
                              ? "bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold shadow-xs"
                              : "bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100"
                          }`}
                        >
                          ✓ {type}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clean Beauty Trust Badges */}
                {isBeautyCategory && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    <div className="p-2 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-800">
                      <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Vegan</span>
                    </div>
                    <div className="p-2 rounded-xl bg-purple-50/60 border border-purple-200/70 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-purple-800">
                      <Award className="w-3.5 h-3.5 text-purple-600" />
                      <span>Cruelty-Free</span>
                    </div>
                    <div className="p-2 rounded-xl bg-blue-50/60 border border-blue-200/70 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-blue-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                      <span>Derma-Tested</span>
                    </div>
                    <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/70 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-amber-800">
                      <Droplet className="w-3.5 h-3.5 text-amber-600" />
                      <span>Clean Formula</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Offers Carousel / Cards Deck */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                  <Percent className="w-4 h-4 text-rose-600" />
                  Bank & Cashback Offers
                </div>
                <span className="text-[11px] text-slate-400">Click offer for details ›</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {/* Cashback */}
                <div
                  onClick={() => setActiveOfferModal("cashback")}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-[#E77600] hover:shadow-sm cursor-pointer transition-all space-y-1"
                >
                  <span className="text-[11px] font-bold text-slate-900 block">Cashback</span>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    Flat ₹50 cashback on UPI payment with my choise Pay.
                  </p>
                  <span className="text-[10px] text-[#007185] font-bold block pt-1">2 offers ›</span>
                </div>

                {/* Bank Offer */}
                <div
                  onClick={() => setActiveOfferModal("bank")}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-[#E77600] hover:shadow-sm cursor-pointer transition-all space-y-1"
                >
                  <span className="text-[11px] font-bold text-slate-900 block">Bank Offer</span>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    Up to ₹1,500 discount on select Credit & Debit Cards.
                  </p>
                  <span className="text-[10px] text-[#007185] font-bold block pt-1">5 offers ›</span>
                </div>

                {/* No Cost EMI */}
                <div
                  onClick={() => setActiveOfferModal("emi")}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-[#E77600] hover:shadow-sm cursor-pointer transition-all space-y-1"
                >
                  <span className="text-[11px] font-bold text-slate-900 block">No Cost EMI</span>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    Avail 3 & 6 months No Cost EMI on leading bank cards.
                  </p>
                  <span className="text-[10px] text-[#007185] font-bold block pt-1">1 offer ›</span>
                </div>

                {/* Partner Offers */}
                <div
                  onClick={() => setActiveOfferModal("partner")}
                  className="p-3 rounded-xl border border-slate-200 bg-white hover:border-[#E77600] hover:shadow-sm cursor-pointer transition-all space-y-1"
                >
                  <span className="text-[11px] font-bold text-slate-900 block">Partner Offers</span>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    Get GST invoice and save up to 28% on business purchases.
                  </p>
                  <span className="text-[10px] text-[#007185] font-bold block pt-1">1 offer ›</span>
                </div>
              </div>
            </div>

            {/* Service / Trust Icons Row */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-4 pb-4 border-y border-slate-200 text-center">
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Truck className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">Pay on Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <RotateCcw className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">7 days Replacement</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">Top Brand</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Box className="w-5 h-5 text-[#E77600]" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 leading-tight">my choise Delivered</span>
              </div>
            </div>

            {/* Fragrance Olfactory Notes Architecture (If Fragrance) */}
            {isFragrance && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-stone-50 to-orange-50/50 border border-amber-200/90 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-xs">
                    ✦
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-950">
                      Olfactory Notes Architecture
                    </h4>
                    <span className="text-[10px] text-amber-800 font-medium">French Niche Master Perfumer Sillage Profile</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider block">
                      1. Top Notes (First 30m)
                    </span>
                    <p className="font-bold text-slate-800">Italian Bergamot, Sunlit Saffron & Pink Pepper</p>
                    <span className="text-[10px] text-slate-400 block">Sparkling, vibrant opening</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-rose-600 tracking-wider block">
                      2. Heart Notes (2-6 Hours)
                    </span>
                    <p className="font-bold text-slate-800">Smoked Royal Oud & Damascus Rose</p>
                    <span className="text-[10px] text-slate-400 block">Warm, intoxicating signature</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-amber-100 shadow-2xs space-y-1">
                    <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider block">
                      3. Base Notes (14+ Hours)
                    </span>
                    <p className="font-bold text-slate-800">Golden Ambergris, Bourbon Vanilla & Benzoin</p>
                    <span className="text-[10px] text-slate-400 block">Sensual lingering trail (Sillage)</span>
                  </div>
                </div>
              </div>
            )}

            {/* Key Specifications Table (Spans full width of column - NO empty space!) */}
            <div className="space-y-2 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Product Details
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs shadow-sm">
                {Object.entries(specsMap).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 px-4 py-2.5 bg-white hover:bg-slate-50/50">
                    <span className="font-semibold text-slate-500">{key}</span>
                    <span className="text-slate-900 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* "About this item" Section with Bold Leads (Spans full width!) */}
            <div className="space-y-3 pt-3 border-t border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                About this item
              </h3>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {(showAllBullets ? aboutBullets : aboutBullets.slice(0, 5)).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-slate-400 font-bold shrink-0 mt-0.5">•</span>
                    <div>
                      <strong className="text-slate-900 font-bold">{bullet.title}: </strong>
                      <span>{bullet.description}</span>
                    </div>
                  </li>
                ))}
              </ul>

              {aboutBullets.length > 5 && (
                <button
                  onClick={() => setShowAllBullets(!showAllBullets)}
                  className="text-xs text-[#007185] hover:text-[#C7511F] hover:underline font-bold inline-flex items-center gap-1 pt-1"
                >
                  › {showAllBullets ? "Show less" : "See more product details"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 3. FREQUENTLY BOUGHT TOGETHER SECTION */}
        {bundleCompanion && (
          <div className="mt-14 pt-8 border-t border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Frequently bought together
            </h2>

            <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Product Visual Combo */}
              <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 md:pb-0">
                {/* Main Product Box */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl border border-slate-200 bg-white p-2 shrink-0 flex items-center justify-center">
                  <Image src={currentMainImage} alt="Primary product" fill sizes="112px" className="object-contain p-2" />
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold shrink-0">
                  <Plus className="w-4 h-4" />
                </div>

                {/* Companion Product Box */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl border border-slate-200 bg-white p-2 shrink-0 flex items-center justify-center">
                  <Image src={bundleCompanion.image} alt={bundleCompanion.title} fill sizes="112px" className="object-contain p-2" />
                </div>
              </div>

              {/* Checkboxes List */}
              <div className="flex-1 space-y-2 text-xs text-slate-700">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isPrimaryChecked}
                    onChange={(e) =>
                      setBundleItemsChecked((prev) => ({ ...prev, primary: e.target.checked }))
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <span>
                    <strong>This item:</strong> {product.title.slice(0, 70)}...{" "}
                    <span className="font-bold text-[#B12704]">{formatCurrency(currentPrice)}</span>
                  </span>
                </label>

                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCompanionChecked}
                    onChange={(e) =>
                      setBundleItemsChecked((prev) => ({ ...prev, companion: e.target.checked }))
                    }
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                  />
                  <span>
                    {bundleCompanion.title}{" "}
                    <span className="font-bold text-[#B12704]">{formatCurrency(bundleCompanion.price)}</span>
                  </span>
                </label>
              </div>

              {/* Total & Action Button */}
              <div className="md:border-l md:border-slate-200 md:pl-6 space-y-2 shrink-0 text-center md:text-left">
                <div className="text-xs text-slate-600">
                  Total price:{" "}
                  <span className="text-xl font-black text-slate-900 block sm:inline">
                    {formatCurrency(bundleTotal)}
                  </span>
                </div>
                <button
                  onClick={handleAddBundleToCart}
                  disabled={!isPrimaryChecked && !isCompanionChecked}
                  className="px-6 py-2.5 rounded-full bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 font-bold text-xs border border-[#FCD200] shadow-sm active:scale-[0.99] transition-all disabled:opacity-50"
                >
                  Add both to Cart
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. RELEVANT ITEMS CUSTOMERS ARE LIKELY TO BUY (CAROUSEL) */}
        {relatedProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Relevant items customers are likely to buy
              </h2>
              <span className="text-xs text-slate-400">Page 1 of 2</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedProducts.map((p, idx) => (
                <div key={p.id} className="group flex flex-col justify-between">
                  <ProductCard product={p} index={idx} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. RELATED ITEMS BOUGHT BY CUSTOMERS (CAROUSEL) */}
        {trendingComplementary.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Related items bought by customers
              </h2>
              <span className="text-xs text-slate-400">Sponsored</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {trendingComplementary.map((p, idx) => (
                <div key={p.id} className="group flex flex-col justify-between">
                  <ProductCard product={p} index={idx} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. CUSTOMER RATINGS & DETAILED REVIEWS SECTION */}
        <div id="customer-reviews" className="mt-14 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-black text-slate-900 mb-6">
            Customer reviews & ratings
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Breakdown Column (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Average score and stars */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-slate-900">{product.rating}</span>
                  <span className="text-base text-slate-500 font-semibold">out of 5</span>
                </div>
                <div className="flex items-center text-amber-500 gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 fill-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-slate-500 ml-2">{product.numReviews} global ratings</span>
                </div>
              </div>

              {/* Star Rating Breakdown Bars */}
              <div className="space-y-2 text-xs">
                {[
                  { star: 5, pct: 72 },
                  { star: 4, pct: 18 },
                  { star: 3, pct: 6 },
                  { star: 2, pct: 2 },
                  { star: 1, pct: 2 },
                ].map(({ star, pct }) => (
                  <button
                    key={star}
                    onClick={() => setFilterStar(filterStar === star ? null : star)}
                    className="w-full flex items-center gap-3 text-left hover:text-[#007185] group"
                  >
                    <span className="w-12 font-medium text-slate-600 group-hover:underline">
                      {star} star
                    </span>
                    <div className="flex-1 h-4 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        style={{ width: `${pct}%` }}
                        className="h-full bg-amber-400 rounded-full group-hover:bg-[#E77600] transition-colors"
                      />
                    </div>
                    <span className="w-10 text-right font-medium text-slate-500">{pct}%</span>
                  </button>
                ))}
              </div>

              {/* By Feature Ratings */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">By feature</span>
                <div className="space-y-1.5 text-slate-700">
                  <div className="flex items-center justify-between">
                    <span>Sturdiness</span>
                    <span className="font-bold">4.6 ★</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Value for money</span>
                    <span className="font-bold">4.5 ★</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Easy to assemble</span>
                    <span className="font-bold">4.8 ★</span>
                  </div>
                </div>
              </div>

              {/* Review this product callout */}
              <div className="p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900">Review this product</h4>
                <p className="text-slate-600">Share your thoughts with other customers</p>
                <a
                  href="#write-review-form"
                  className="block w-full py-2 text-center rounded-xl border border-slate-300 font-bold hover:bg-slate-50 transition-colors"
                >
                  Write a product review
                </a>
              </div>
            </div>

            {/* Right Reviews List Column (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Filter Notice */}
              {filterStar && (
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
                  <span>Showing reviews with <strong>{filterStar} stars</strong></span>
                  <button onClick={() => setFilterStar(null)} className="font-bold hover:underline">
                    Clear filter
                  </button>
                </div>
              )}

              {/* Verified Customer Review Cards */}
              <div className="space-y-6 divide-y divide-slate-100">
                {/* Review 1 */}
                <div className="space-y-2 pt-4 first:pt-0">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                      RP
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Rohit Pathak</span>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Purchase</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      Super sturdy & looks very premium!
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400">Reviewed in India on 14 August 2026</div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    Exceeded my expectations! The build quality is top-notch and the powder coating finish has a very clean matte feel. Assembled it in less than 8 minutes with the included Allen key. Holds heavy ceramic pots without any wobbling. Highly recommend!
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-xs text-slate-500">
                    <button
                      onClick={() =>
                        setHelpfulReviews((prev) => ({ ...prev, r1: prev.r1 + 1 }))
                      }
                      className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({helpfulReviews.r1})
                    </button>
                    <span className="cursor-pointer hover:underline">Report</span>
                  </div>
                </div>

                {/* Review 2 */}
                <div className="space-y-2 pt-6">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                      AM
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Ananya Mukherji</span>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Verified Purchase</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center text-amber-400">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">
                      Perfect addition to my balcony garden
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400">Reviewed in India on 28 July 2026</div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    Transformed my small balcony completely. Gives plants ample sunlight due to the tiered stepped design. Even during heavy monsoon rain, no rust marks or color peeling. 10/10 purchase.
                  </p>

                  <div className="flex items-center gap-4 pt-1 text-xs text-slate-500">
                    <button
                      onClick={() =>
                        setHelpfulReviews((prev) => ({ ...prev, r2: prev.r2 + 1 }))
                      }
                      className="px-3 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({helpfulReviews.r2})
                    </button>
                    <span className="cursor-pointer hover:underline">Report</span>
                  </div>
                </div>
              </div>

              {/* Review Submission Form */}
              <div id="write-review-form" className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-4">
                <h4 className="text-sm font-bold text-slate-900">Write a customer review</h4>

                {reviewStatus && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-semibold">
                    {reviewStatus}
                  </div>
                )}

                <form onSubmit={handleReviewSubmit} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Manasvi"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Overall Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setReviewRating(star)}
                          className="p-1 text-slate-400 hover:text-amber-400"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= reviewRating ? "fill-amber-400 text-amber-400" : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Write your review</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="What did you like or dislike? How did you use this product?"
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" /> Submit Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Offer Details Popover */}
      {activeOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Percent className="w-4 h-4 text-rose-600" />
                {activeOfferModal === "cashback" && "Cashback Offers"}
                {activeOfferModal === "bank" && "Bank Discount Offers"}
                {activeOfferModal === "emi" && "No Cost EMI Details"}
                {activeOfferModal === "partner" && "Partner & Business Discounts"}
              </h3>
              <button
                onClick={() => setActiveOfferModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              {activeOfferModal === "cashback" && (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">Offer 1: Flat ₹50 Cashback</strong>
                    <p>Pay using my choise UPI on minimum transaction value of ₹500. Cashback credited within 24 hours.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">Offer 2: 5% Unlimited Cashback</strong>
                    <p>Use my choise Pay ICICI Bank Credit Card to earn 5% reward points on every order.</p>
                  </div>
                </>
              )}

              {activeOfferModal === "bank" && (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">HDFC Bank Credit Cards</strong>
                    <p>Flat ₹1,000 instant discount on orders above ₹5,000. Apply coupon at checkout.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">SBI & Axis Bank Cards</strong>
                    <p>10% Instant discount up to ₹1,500 on full swipe and EMI transactions.</p>
                  </div>
                </>
              )}

              {activeOfferModal === "emi" && (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">3 Months No Cost EMI</strong>
                    <p>₹{Math.round(currentPrice / 3).toLocaleString("en-IN")}/mo. Interest paid as instant discount.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">6 Months No Cost EMI</strong>
                    <p>₹{Math.round(currentPrice / 6).toLocaleString("en-IN")}/mo on all major credit cards.</p>
                  </div>
                </>
              )}

              {activeOfferModal === "partner" && (
                <>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">Business GST Invoice</strong>
                    <p>Enter your GSTIN during checkout to claim up to 28% input tax credit for your enterprise.</p>
                  </div>
                </>
              )}
            </div>

            <button
              onClick={() => setActiveOfferModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* MODAL: Sizing Guide for Fashion & Footwear */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Ruler className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-900">Standard Sizing & Measurement Guide</h3>
                  <span className="text-[11px] text-slate-500">True-to-size standard international dimensions</span>
                </div>
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Measurements reflect garment dimensions in inches (&quot;). For oversized fits, order your regular size. For a tailored slim fit, consider sizing one step down.
            </p>

            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chest / Bust</th>
                    <th className="p-2.5">Length</th>
                    <th className="p-2.5">Shoulder</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">S</td>
                    <td className="p-2.5">38 - 40&quot;</td>
                    <td className="p-2.5">28&quot;</td>
                    <td className="p-2.5">18.5&quot;</td>
                  </tr>
                  <tr className="bg-slate-50/40">
                    <td className="p-2.5 font-bold text-slate-900">M</td>
                    <td className="p-2.5">41 - 43&quot;</td>
                    <td className="p-2.5">29&quot;</td>
                    <td className="p-2.5">19.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">L</td>
                    <td className="p-2.5">44 - 46&quot;</td>
                    <td className="p-2.5">30&quot;</td>
                    <td className="p-2.5">20.5&quot;</td>
                  </tr>
                  <tr className="bg-slate-50/40">
                    <td className="p-2.5 font-bold text-slate-900">XL</td>
                    <td className="p-2.5">47 - 49&quot;</td>
                    <td className="p-2.5">31&quot;</td>
                    <td className="p-2.5">21.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-slate-900">XXL</td>
                    <td className="p-2.5">50 - 52&quot;</td>
                    <td className="p-2.5">32&quot;</td>
                    <td className="p-2.5">22.5&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200/80 text-[11px] text-blue-900 space-y-1">
              <strong className="block font-bold">100% Fit Guarantee & Doorstep Exchange:</strong>
              <p>Try it on at home. If the size or silhouette isn&apos;t flawless, request an instant free doorstep size exchange within 7 days.</p>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

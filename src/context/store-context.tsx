"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  CATEGORIES as DEFAULT_CATEGORIES,
  INITIAL_ORDERS as DEFAULT_ORDERS,
  COUPONS as DEFAULT_COUPONS,
  DEFAULT_FESTIVAL_SETTINGS,
  ProductItem,
  CategoryItem,
  InitialOrder,
  CouponItem,
  FestivalSettings,
} from "@/lib/data";

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currency: string;
  currencySymbol: string;
  taxRate: number;
  freeShippingThreshold: number;
  supportEmail: string;
  supportPhone: string;
}

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: "my choise",
  tagline: "Curated Marketplace & Next-Gen Deals",
  currency: "INR (₹)",
  currencySymbol: "₹",
  taxRate: 18,
  freeShippingThreshold: 499,
  supportEmail: "support@mychoise.in",
  supportPhone: "+91 1800 200 4567",
};

interface StoreContextType {
  products: ProductItem[];
  categories: CategoryItem[];
  orders: InitialOrder[];
  coupons: CouponItem[];
  settings: StoreSettings;
  festivalSettings: FestivalSettings;
  isLoaded: boolean;

  // Product CRUD
  addProduct: (productData: Partial<ProductItem> & { title: string; price: number }) => ProductItem;
  updateProduct: (id: string, updates: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, amount: number, isDelta?: boolean) => void;
  toggleFeatured: (id: string) => void;

  // Category CRUD
  addCategory: (catData: Partial<CategoryItem> & { name: string }) => CategoryItem;
  updateCategory: (id: string, updates: Partial<CategoryItem>) => void;
  deleteCategory: (id: string) => void;

  // Order Operations
  updateOrderStatus: (orderId: string, status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED") => void;

  // Coupon Operations
  addCoupon: (couponData: Partial<CouponItem> & { code: string; discountPercent: number }) => CouponItem;
  deleteCoupon: (id: string) => void;

  // Settings
  updateSettings: (updates: Partial<StoreSettings>) => void;
  updateFestivalSettings: (updates: Partial<FestivalSettings>) => void;

  // Factory Reset
  resetToDefaults: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "mychoise_live_products_v3",
  CATEGORIES: "mychoise_live_categories_v2",
  ORDERS: "mychoise_live_orders_v2",
  COUPONS: "mychoise_live_coupons_v2",
  SETTINGS: "mychoise_live_settings_v2",
  FESTIVAL: "mychoise_live_festival_settings_v1",
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(DEFAULT_CATEGORIES);
  const [orders, setOrders] = useState<InitialOrder[]>(DEFAULT_ORDERS);
  const [coupons, setCoupons] = useState<CouponItem[]>(DEFAULT_COUPONS);
  const [settings, setSettings] = useState<StoreSettings>(DEFAULT_SETTINGS);
  const [festivalSettings, setFestivalSettings] = useState<FestivalSettings>(DEFAULT_FESTIVAL_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS) || localStorage.getItem("mychoise_live_products_v2");
      const savedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      const savedCoupons = localStorage.getItem(STORAGE_KEYS.COUPONS);
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

      if (savedProducts) {
        try {
          const parsed = JSON.parse(savedProducts);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const fixedIds = ["prod-16", "prod-17", "prod-19", "prod-21", "prod-25"];
            const healed = parsed.map((p: ProductItem) => {
              if (fixedIds.includes(p.id)) {
                const fresh = DEFAULT_PRODUCTS.find((dp) => dp.id === p.id);
                if (fresh) {
                  return { ...p, images: fresh.images, variants: fresh.variants };
                }
              }
              return p;
            });
            setProducts(healed);
          }
        } catch (e) {}
      }

      if (savedCategories) {
        try {
          const parsed = JSON.parse(savedCategories);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCategories(parsed);
          }
        } catch (e) {}
      }

      if (savedOrders) {
        try {
          const parsed = JSON.parse(savedOrders);
          if (Array.isArray(parsed)) {
            setOrders(parsed);
          }
        } catch (e) {}
      }

      if (savedCoupons) {
        try {
          const parsed = JSON.parse(savedCoupons);
          if (Array.isArray(parsed)) {
            setCoupons(parsed);
          }
        } catch (e) {}
      }

      if (savedSettings) {
        try {
          const parsed = JSON.parse(savedSettings);
          setSettings((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }

      const savedFestival = localStorage.getItem(STORAGE_KEYS.FESTIVAL);
      if (savedFestival) {
        try {
          const parsed = JSON.parse(savedFestival);
          setFestivalSettings((prev) => ({ ...prev, ...parsed }));
        } catch (e) {}
      }
    } catch (err) {
      console.error("Failed to load store data from localStorage:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Broadcast sync events to other components / tabs
  const broadcastSync = useCallback((type: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("mychoise_store_update", { detail: { type } }));
    }
  }, []);

  // Product CRUD
  const addProduct = useCallback(
    (productData: Partial<ProductItem> & { title: string; price: number }) => {
      const newId = `prod-${Date.now()}`;
      const slug = productData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const newProduct: ProductItem = {
        id: productData.id || newId,
        title: productData.title,
        slug: productData.slug || slug,
        category: productData.category || "Electronics",
        categoryId: productData.categoryId || "cat-electronics",
        subCategory: productData.subCategory,
        subCategoryId: productData.subCategoryId,
        brand: productData.brand || "my choise",
        price: Number(productData.price),
        discountPrice: productData.discountPrice ? Number(productData.discountPrice) : undefined,
        mrp: productData.mrp ? Number(productData.mrp) : Number(productData.price) * 1.3,
        stock: productData.stock !== undefined ? Number(productData.stock) : 15,
        rating: productData.rating || 4.8,
        numReviews: productData.numReviews || 12,
        featured: productData.featured !== undefined ? productData.featured : true,
        isNew: true,
        description: productData.description || "Premium product curated exclusively for my choise.",
        details: productData.details || ["Official brand warranty included", "Tested and verified for premium quality"],
        images: productData.images && productData.images.length > 0 ? productData.images : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"],
        specs: productData.specs || { "Quality": "Brand New Certified", "Warranty": "1 Year" },
        variants: productData.variants,
      };

      setProducts((prev) => {
        const updated = [newProduct, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });

      broadcastSync("product_added");
      return newProduct;
    },
    [broadcastSync]
  );

  const updateProduct = useCallback(
    (id: string, updates: Partial<ProductItem>) => {
      setProducts((prev) => {
        const updated = prev.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              ...updates,
              price: updates.price !== undefined ? Number(updates.price) : p.price,
              discountPrice: updates.discountPrice !== undefined ? Number(updates.discountPrice) : p.discountPrice,
              stock: updates.stock !== undefined ? Number(updates.stock) : p.stock,
            };
          }
          return p;
        });
        try {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("product_updated");
    },
    [broadcastSync]
  );

  const deleteProduct = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const updated = prev.filter((p) => p.id !== id);
        try {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("product_deleted");
    },
    [broadcastSync]
  );

  const updateStock = useCallback(
    (id: string, amount: number, isDelta = false) => {
      setProducts((prev) => {
        const updated = prev.map((p) => {
          if (p.id === id) {
            const nextStock = isDelta ? Math.max(0, p.stock + amount) : Math.max(0, amount);
            return { ...p, stock: nextStock };
          }
          return p;
        });
        try {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("stock_updated");
    },
    [broadcastSync]
  );

  const toggleFeatured = useCallback(
    (id: string) => {
      setProducts((prev) => {
        const updated = prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p));
        try {
          localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("featured_toggled");
    },
    [broadcastSync]
  );

  // Category CRUD
  const addCategory = useCallback(
    (catData: Partial<CategoryItem> & { name: string }) => {
      const newId = `cat-${Date.now()}`;
      const slug = catData.slug || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const newCat: CategoryItem = {
        id: catData.id || newId,
        name: catData.name,
        slug,
        description: catData.description || `Browse modern ${catData.name} collection.`,
        image: catData.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
        productCount: 0,
        subCategories: catData.subCategories || [],
      };

      setCategories((prev) => {
        const updated = [...prev, newCat];
        try {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("category_added");
      return newCat;
    },
    [broadcastSync]
  );

  const updateCategory = useCallback(
    (id: string, updates: Partial<CategoryItem>) => {
      setCategories((prev) => {
        const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
        try {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("category_updated");
    },
    [broadcastSync]
  );

  const deleteCategory = useCallback(
    (id: string) => {
      setCategories((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        try {
          localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("category_deleted");
    },
    [broadcastSync]
  );

  // Orders
  const updateOrderStatus = useCallback(
    (orderId: string, status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED") => {
      setOrders((prev) => {
        const updated = prev.map((o) => (o.id === orderId ? { ...o, status } : o));
        try {
          localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("order_updated");
    },
    [broadcastSync]
  );

  // Coupons
  const addCoupon = useCallback(
    (couponData: Partial<CouponItem> & { code: string; discountPercent: number }) => {
      const newCoupon: CouponItem = {
        id: `c-${Date.now()}`,
        code: couponData.code.toUpperCase(),
        discountPercent: Number(couponData.discountPercent),
        validUntil: couponData.validUntil || "2026-12-31",
        status: "ACTIVE",
        usageCount: 0,
      };

      setCoupons((prev) => {
        const updated = [newCoupon, ...prev];
        try {
          localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("coupon_added");
      return newCoupon;
    },
    [broadcastSync]
  );

  const deleteCoupon = useCallback(
    (id: string) => {
      setCoupons((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        try {
          localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("coupon_deleted");
    },
    [broadcastSync]
  );

  // Settings
  const updateSettings = useCallback(
    (updates: Partial<StoreSettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...updates };
        try {
          localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("settings_updated");
    },
    [broadcastSync]
  );

  // Update Festival Special Campaign Settings
  const updateFestivalSettings = useCallback(
    (updates: Partial<FestivalSettings>) => {
      setFestivalSettings((prev) => {
        const updated = { ...prev, ...updates };
        try {
          localStorage.setItem(STORAGE_KEYS.FESTIVAL, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      broadcastSync("festival_settings_updated");
    },
    [broadcastSync]
  );

  // Reset to default factory dataset
  const resetToDefaults = useCallback(() => {
    setProducts(DEFAULT_PRODUCTS);
    setCategories(DEFAULT_CATEGORIES);
    setOrders(DEFAULT_ORDERS);
    setCoupons(DEFAULT_COUPONS);
    setSettings(DEFAULT_SETTINGS);
    setFestivalSettings(DEFAULT_FESTIVAL_SETTINGS);

    try {
      localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      localStorage.removeItem(STORAGE_KEYS.ORDERS);
      localStorage.removeItem(STORAGE_KEYS.COUPONS);
      localStorage.removeItem(STORAGE_KEYS.SETTINGS);
      localStorage.removeItem(STORAGE_KEYS.FESTIVAL);
    } catch (e) {}

    broadcastSync("store_reset");
  }, [broadcastSync]);

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        orders,
        coupons,
        settings,
        festivalSettings,
        isLoaded,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        toggleFeatured,
        addCategory,
        updateCategory,
        deleteCategory,
        updateOrderStatus,
        addCoupon,
        deleteCoupon,
        updateSettings,
        updateFestivalSettings,
        resetToDefaults,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}

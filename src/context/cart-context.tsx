"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { ProductItem } from "@/lib/data";

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: ProductItem, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  subtotal: number;
  discount: number;
  couponCode: string;
  applyCoupon: (code: string) => boolean;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  // Load cart and wishlist from LocalStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("zenvia_cart");
      const savedWishlist = localStorage.getItem("zenvia_wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (error) {
      console.error("Error loading local storage:", error);
    }
  }, []);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem("zenvia_cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Save wishlist changes
  useEffect(() => {
    try {
      localStorage.setItem("zenvia_wishlist", JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const addToCart = (product: ProductItem, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setDiscountPercent(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "ZENVIA10") {
      setCouponCode("ZENVIA10");
      setDiscountPercent(10);
      return true;
    } else if (cleanCode === "VIP20") {
      setCouponCode("VIP20");
      setDiscountPercent(20);
      return true;
    }
    return false;
  };

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (item.product.discountPrice || item.product.price) * item.quantity,
    0
  );

  const discount = Math.round(subtotal * (discountPercent / 100));
  const totalAmount = Math.max(0, subtotal - discount);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        subtotal,
        discount,
        couponCode,
        applyCoupon,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

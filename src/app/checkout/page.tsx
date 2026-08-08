"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, CreditCard, CheckCircle2, Lock, ArrowRight, Truck, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");

  // Form State
  const [name, setName] = useState("Lady Eleanor Vance");
  const [email, setEmail] = useState("eleanor.vance@luxury.co");
  const [address, setAddress] = useState("740 Park Avenue, Apt 14B");
  const [city, setCity] = useState("New York");
  const [postalCode, setPostalCode] = useState("10021");
  const [country, setCountry] = useState("United States");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "wire" | "crypto">("card");
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 8842");

  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-serif text-white">No Items in Bag for Checkout</h2>
        <p className="text-xs text-zinc-400">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-full bg-luxury-gold text-black font-bold text-xs">
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          customerEmail: email,
          shippingAddress: address,
          city,
          postalCode,
          country,
          items: cart,
          totalAmount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPlacedOrder(data.order);
        clearCart();
        setStep("success");
      }
    } catch (error) {
      console.error("Order submission failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-8">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-2xl">
          <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-luxury-gold">Order Confirmed</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">Thank You for Your Order</h1>
          <p className="text-xs text-zinc-400">
            Order Reference ID: <span className="font-mono text-luxury-gold font-bold">{placedOrder?.id || "ORD-98234"}</span>
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 text-left space-y-4 max-w-lg mx-auto">
          <h4 className="text-xs uppercase font-bold text-white border-b border-white/10 pb-2">Delivery Summary</h4>
          <div className="text-xs text-zinc-300 space-y-1">
            <p className="font-semibold text-white">{name}</p>
            <p>{address}, {city}, {postalCode}</p>
            <p>{country}</p>
            <p className="text-luxury-gold pt-2 font-medium">Estimated Delivery: 48 Hours via Courier Express</p>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/account"
            className="px-6 py-3 rounded-full bg-luxury-gold text-black font-bold text-xs hover:bg-luxury-gold-dark transition-colors"
          >
            Track Order Status
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold text-xs hover:bg-white/10 transition-colors"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-white/10 pb-6">
        <span className="text-xs uppercase tracking-widest font-semibold text-luxury-gold">Secure Order Completion</span>
        <h1 className="text-3xl font-serif font-bold text-white mt-1">White-Glove Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step Indicator */}
          <div className="flex items-center gap-4 text-xs font-semibold">
            <button
              onClick={() => setStep("details")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                step === "details"
                  ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold"
                  : "bg-white/5 border-white/10 text-zinc-400"
              }`}
            >
              <Truck className="w-4 h-4" /> 1. Shipping Address
            </button>
            <span className="text-zinc-600">→</span>
            <button
              onClick={() => setStep("payment")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors ${
                step === "payment"
                  ? "bg-luxury-gold/10 border-luxury-gold text-luxury-gold"
                  : "bg-white/5 border-white/10 text-zinc-400"
              }`}
            >
              <CreditCard className="w-4 h-4" /> 2. Payment Method
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {step === "details" ? (
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recipient Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">Client Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-zinc-300 font-semibold mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-luxury-gold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-zinc-300 font-semibold mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("payment")}
                  className="w-full py-3.5 rounded-xl bg-luxury-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-luxury-gold-dark transition-colors mt-2"
                >
                  Continue to Payment Method
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Select Payment Instrument</h3>

                {/* Payment Options */}
                <div className="space-y-3">
                  <label
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "card"
                        ? "bg-luxury-gold/10 border-luxury-gold text-white"
                        : "bg-white/5 border-white/10 text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-luxury-gold" />
                      <span className="text-xs font-semibold">Credit Card / Black Card</span>
                    </div>
                    <span className="text-xs text-emerald-400 font-medium">Instant Clearance</span>
                  </label>

                  <label
                    onClick={() => setPaymentMethod("wire")}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      paymentMethod === "wire"
                        ? "bg-luxury-gold/10 border-luxury-gold text-white"
                        : "bg-white/5 border-white/10 text-zinc-400"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-luxury-gold" />
                      <span className="text-xs font-semibold">Swiss Bank Wire Transfer</span>
                    </div>
                    <span className="text-xs text-zinc-400">Escrow Transfer</span>
                  </label>
                </div>

                {paymentMethod === "card" && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs text-zinc-300 font-semibold mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold text-center"
                      />
                      <input
                        type="password"
                        placeholder="CVC"
                        defaultValue="888"
                        className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-luxury-gold text-center"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-luxury-gold-dark via-luxury-gold to-luxury-gold-light hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-luxury-gold/20 transition-all flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  {loading ? "Authorizing Payment..." : `Authorize Payment (${formatCurrency(totalAmount)})`}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider pb-3 border-b border-white/10">
              Selected Atelier Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 text-xs">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white line-clamp-1">{product.title}</h4>
                    <span className="text-zinc-400">Qty: {quantity}</span>
                  </div>
                  <span className="font-bold text-white">
                    {formatCurrency((product.discountPrice || product.price) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-medium">
                <span>Express Insured Delivery</span>
                <span>Complimentary</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                <span>Total Due</span>
                <span className="gold-text-gradient">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

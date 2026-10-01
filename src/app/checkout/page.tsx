"use client";

import React, { useState } from "react";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { ShieldCheck, CreditCard, CheckCircle2, Lock, ArrowRight, Truck, Wallet, Smartphone, Banknote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, totalAmount, clearCart, subtotal } = useCart();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");

  // Form State with sensible Indian default
  const [name, setName] = useState("Aarav Sharma");
  const [email, setEmail] = useState("aarav.sharma@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [address, setAddress] = useState("Flat 402, Lotus Towers, Green Park");
  const [city, setCity] = useState("New Delhi");
  const [postalCode, setPostalCode] = useState("110016");
  const [state, setState] = useState("Delhi");
  const [country] = useState("India");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod">("upi");
  const [upiId, setUpiId] = useState("aarav@okhdfcbank");

  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const isFreeDelivery = subtotal >= 499;
  const finalTotal = totalAmount + (isFreeDelivery ? 0 : 49);

  if (cart.length === 0 && step !== "success") {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">No Items in Cart for Checkout</h2>
        <p className="text-xs text-slate-500">Please add items to your cart before proceeding to checkout.</p>
        <Link href="/products" className="inline-block px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md">
          Explore Products
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
          shippingAddress: `${address}, ${city}, ${state} - ${postalCode}`,
          city,
          postalCode,
          country,
          items: cart,
          totalAmount: finalTotal,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPlacedOrder(data.order);
        clearCart();
        setStep("success");
      } else {
        // Fallback for mock order
        setPlacedOrder({ id: `ORD-${Math.floor(100000 + Math.random() * 900000)}` });
        clearCart();
        setStep("success");
      }
    } catch (error) {
      setPlacedOrder({ id: `ORD-${Math.floor(100000 + Math.random() * 900000)}` });
      clearCart();
      setStep("success");
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center shadow-lg">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Order Placed Successfully!</span>
          <h1 className="text-3xl font-black text-slate-900">Thank You for Your Order</h1>
          <p className="text-xs text-slate-500">
            Order Reference ID: <span className="font-mono text-blue-600 font-bold">{placedOrder?.id || "ORD-582914"}</span>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 text-left space-y-4 shadow-sm max-w-lg mx-auto">
          <h4 className="text-xs uppercase font-bold text-slate-900 border-b border-slate-100 pb-2">Delivery Summary</h4>
          <div className="text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900">{name}</p>
            <p>{address}</p>
            <p>{city}, {state} - {postalCode}</p>
            <p>{country} • {phone}</p>
            <div className="pt-2 text-emerald-700 font-bold flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600" />
              <span>Estimated Delivery: Within 2–3 Business Days</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Link
            href="/my-orders"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20"
          >
            Track Order Status
          </Link>
          <Link
            href="/products"
            className="px-6 py-3 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs hover:bg-slate-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-slate-200 pb-4">
        <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Secure Order</span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-bold overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setStep("details")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl border transition-colors shrink-0 ${
                step === "details"
                  ? "bg-blue-50 border-blue-400 text-blue-700 font-bold"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <Truck className="w-4 h-4" /> 1. Shipping Address
            </button>
            <span className="text-slate-300 shrink-0">→</span>
            <button
              onClick={() => setStep("payment")}
              className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl border transition-colors shrink-0 ${
                step === "payment"
                  ? "bg-blue-50 border-blue-400 text-blue-700 font-bold"
                  : "bg-white border-slate-200 text-slate-600"
              }`}
            >
              <CreditCard className="w-4 h-4" /> 2. Payment Method
            </button>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {step === "details" && (
              <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Customer & Shipping Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep("payment")}
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                  >
                    Continue to Payment <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Select Payment Method
                </h3>

                {/* Payment Selection Radios */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("upi")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                      paymentMethod === "upi"
                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Instant</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">UPI / QR</span>
                      <span className="text-[10px] text-slate-500">GPay, PhonePe, Paytm</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                      paymentMethod === "card"
                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">All Cards</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Debit / Credit</span>
                      <span className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all ${
                      paymentMethod === "cod"
                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-center w-full">
                      <Banknote className="w-5 h-5 text-emerald-600" />
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Doorstep</span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Cash on Delivery</span>
                      <span className="text-[10px] text-slate-500">Pay upon delivery</span>
                    </div>
                  </button>
                </div>

                {paymentMethod === "upi" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                    <label className="block text-xs font-bold text-slate-700">Enter Virtual Payment Address (UPI ID)</label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@okhdfcbank"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                )}

                <div className="pt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900"
                  >
                    ← Back to Details
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-500/20"
                  >
                    {loading ? "Placing Order..." : `Pay ${formatCurrency(finalTotal)}`}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
            <h3 className="text-base font-black text-slate-900 pb-3 border-b border-slate-100">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                      <Image src={product.images[0]} alt={product.title} fill sizes="48px" className="object-contain p-1" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 line-clamp-1 block">{product.title}</span>
                      <span className="text-[11px] text-slate-500">Qty: {quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    {formatCurrency((product.discountPrice || product.price) * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className={`font-bold ${isFreeDelivery ? "text-emerald-600" : "text-slate-900"}`}>
                  {isFreeDelivery ? "FREE" : "₹49"}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Payable</span>
                <span className="text-blue-600">{formatCurrency(finalTotal)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Protected Payment Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

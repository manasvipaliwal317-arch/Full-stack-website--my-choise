import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/store-context";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/components/toast";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "my choise | Smart Online Shopping, Top Brands & Daily Deals",
  description:
    "Shop the latest in electronics, fashion, footwear, smart watches, and home essentials on my choise. Free delivery on orders above ₹499!",
  keywords: ["my choise", "Online Shopping", "Electronics", "Deals of the Day", "Smart Watches", "Fashion", "Free Delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col justify-between bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
        <StoreProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              <CartDrawer />
              <main className="flex-1">{children}</main>
              <Footer />
            </CartProvider>
          </ToastProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

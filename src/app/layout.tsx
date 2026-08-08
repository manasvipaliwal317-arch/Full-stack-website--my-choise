import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { ToastProvider } from "@/components/toast";
import { Navbar } from "@/components/navbar";
import { CartDrawer } from "@/components/cart-drawer";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Zenvia Atelier | Luxury E-Commerce & Haute Horlogerie",
  description:
    "Curating rare tourbillons, 18k solid gold fine jewelry, and Italian leathercraft for discerning collectors worldwide.",
  keywords: ["Luxury E-Commerce", "Haute Horlogerie", "Fine Jewelry", "Tourbillon Watch", "Leather Goods"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col justify-between selection:bg-luxury-gold selection:text-black">
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

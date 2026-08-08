import { MetadataRoute } from "next";
import { PRODUCTS, CATEGORIES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://zenvia-atelier.com";

  const staticRoutes = [
    "",
    "/products",
    "/categories",
    "/search",
    "/wishlist",
    "/cart",
    "/checkout",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/login",
    "/register",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const productRoutes = PRODUCTS.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const categoryRoutes = CATEGORIES.map((category) => ({
    url: `${baseUrl}/products?category=${category.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...categoryRoutes];
}

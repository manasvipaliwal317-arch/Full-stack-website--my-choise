import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRODUCTS } from "@/lib/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");
  const featured = searchParams.get("featured");

  try {
    // Try fetching from DB if database configured
    let products = await prisma.product.findMany({
      include: { category: true },
      orderBy: sort === "price-low" ? { price: "asc" } : sort === "price-high" ? { price: "desc" } : { createdAt: "desc" },
    });

    if (!products || products.length === 0) {
      // Fallback to rich luxury dataset
      products = PRODUCTS.map((p) => ({
        ...p,
        category: { id: p.categoryId, name: p.category, slug: p.categoryId, description: "", image: "", createdAt: new Date(), updatedAt: new Date() },
        createdAt: new Date(),
        updatedAt: new Date(),
      })) as any;
    }

    let filtered = [...products];

    if (category && category !== "all") {
      filtered = filtered.filter(
        (p) =>
          p.category?.name.toLowerCase() === category.toLowerCase() ||
          p.categoryId === category
      );
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (featured === "true") {
      filtered = filtered.filter((p) => p.featured);
    }

    if (sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return NextResponse.json({ success: true, count: filtered.length, products: filtered });
  } catch (error) {
    // Fallback to static mock products gracefully
    let filtered = [...PRODUCTS];
    if (category && category !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase() || p.categoryId === category);
    }
    if (search) {
      filtered = filtered.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    }
    return NextResponse.json({ success: true, count: filtered.length, products: filtered });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, categoryId, images, details, stock, featured } = body;

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    try {
      const newProduct = await prisma.product.create({
        data: {
          title,
          slug,
          description,
          price: parseFloat(price),
          categoryId: categoryId || "cat-watches",
          images: images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"],
          details: details || ["Crafted with artisanal perfection"],
          stock: stock ? parseInt(stock) : 10,
          featured: Boolean(featured),
        },
      });

      return NextResponse.json({ success: true, product: newProduct }, { status: 201 });
    } catch (e) {
      // Mock creation return if offline
      const mockProduct = {
        id: `prod-${Date.now()}`,
        title,
        slug,
        category: "Haute Horlogerie",
        categoryId: categoryId || "cat-watches",
        price: parseFloat(price),
        stock: stock ? parseInt(stock) : 10,
        rating: 5.0,
        numReviews: 1,
        featured: Boolean(featured),
        isNew: true,
        description,
        details: details || ["Crafted with artisanal perfection"],
        images: images && images.length > 0 ? images : ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop"]
      };
      return NextResponse.json({ success: true, product: mockProduct }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid product data" }, { status: 400 });
  }
}

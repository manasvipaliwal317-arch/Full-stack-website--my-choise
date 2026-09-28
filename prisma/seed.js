const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CATEGORIES = [
  {
    id: "cat-watches",
    name: "Haute Horlogerie",
    slug: "horlogerie",
    description: "Swiss-crafted tourbillons, perpetual calendars, and titanium chronographs.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cat-jewelry",
    name: "Fine Jewelry",
    slug: "jewelry",
    description: "18k Solid Gold, Rare Diamonds, and Artisan Sculpted Rings.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cat-leather",
    name: "Leather Goods",
    slug: "leather-goods",
    description: "Handcrafted Italian calfskin weekenders, wallets, and briefcases.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cat-audio",
    name: "Audiophile Sound",
    slug: "audio",
    description: "Planar magnetic acoustic headphones and handcrafted brass amplifiers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "cat-fragrance",
    name: "Niche Fragrances",
    slug: "fragrance",
    description: "Rare Oud, Ambergris, and Artisanal Botanical Extracts.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
  },
];

const PRODUCTS = [
  {
    id: "prod-1",
    title: "Zenvia Celestial Tourbillon Titanium",
    slug: "zenvia-celestial-tourbillon",
    categoryId: "cat-watches",
    price: 14500,
    discountPrice: 12900,
    stock: 5,
    rating: 4.95,
    numReviews: 28,
    featured: true,
    isNew: true,
    description: "An extraordinary masterwork featuring a flying tourbillon movement encased in Grade 5 mirror-polished titanium with a sapphire crystal back.",
    details: [
      "Grade 5 Titanium Case (42mm)",
      "Manual Winding Caliber A-900 (72-hour power reserve)",
      "Hand-stitched Alligator Leather Strap",
      "Water Resistant to 100 meters",
      "Limited Edition #12 of 50 Pieces"
    ],
    images: [
      "/products/smartwatch-black.jpg",
      "/products/smartwatch-gold.jpg"
    ]
  },
  {
    id: "prod-2",
    title: "Verve Obsidian 18K Gold Solitaire Ring",
    slug: "verve-obsidian-18k-ring",
    categoryId: "cat-jewelry",
    price: 4800,
    stock: 8,
    rating: 4.90,
    numReviews: 19,
    featured: true,
    isNew: true,
    description: "Cast in 18k solid yellow gold with a high-luster, ethically sourced 2.5 carat emerald-cut black diamond.",
    details: [
      "18K Solid Recycled Yellow Gold",
      "2.5ct Natural Emerald-Cut Black Diamond",
      "VS1 Clarity Accent Pavé Diamonds",
      "Official Atelier Hallmark"
    ],
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "prod-3",
    title: "Milanese Full-Grain Leather Weekender",
    slug: "milanese-leather-weekender",
    categoryId: "cat-leather",
    price: 1850,
    discountPrice: 1600,
    stock: 12,
    rating: 4.88,
    numReviews: 34,
    featured: true,
    isNew: false,
    description: "Crafted in Florence from vegetable-tanned Italian calfskin leather with brushed brass hardware.",
    details: [
      "100% Italian Vegetable-Tanned Calfskin",
      "Solid Antique Brushed Brass Hardware",
      "Internal Padded Laptop Sleeve",
      "Dimensions: 52cm x 30cm x 26cm"
    ],
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "prod-4",
    title: "Elysium Open-Back Planar Headphones",
    slug: "elysium-planar-headphones",
    categoryId: "cat-audio",
    price: 3200,
    stock: 6,
    rating: 4.98,
    numReviews: 42,
    featured: true,
    isNew: true,
    description: "Ultra-wide acoustic soundstage powered by 100mm ultra-thin planar drivers and aerospace-grade aluminum.",
    details: [
      "100mm Nanometer-Scale Planar Magnetic Transducers",
      "Frequency Response: 5Hz - 55,000Hz",
      "Custom Detachable OCC 8-Core Silver Cable",
      "Machined Aluminum Flight Case Included"
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "prod-5",
    title: "Soleil Noir Extrait de Parfum 100ml",
    slug: "soleil-noir-parfum",
    categoryId: "cat-fragrance",
    price: 520,
    stock: 20,
    rating: 4.92,
    numReviews: 57,
    featured: true,
    isNew: false,
    description: "A sensual olfactory journey blending smoky Cambodian Oud, Damask Rose, Gold Amber, and Tahitian Vanilla.",
    details: [
      "Extrait de Parfum (35% High Oil Concentration)",
      "Top Notes: Cardamom, Bergamot, Pink Pepper",
      "Heart Notes: Damask Rose, Smoked Cedar, Saffron",
      "Base Notes: Cambodian Oud, Black Amber, Vanilla"
    ],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

async function main() {
  console.log("Seeding Neon PostgreSQL database...");

  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
  }

  for (const prod of PRODUCTS) {
    await prisma.product.upsert({
      where: { id: prod.id },
      update: prod,
      create: prod,
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Database seed skipped (Offline/Mock mode active):", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

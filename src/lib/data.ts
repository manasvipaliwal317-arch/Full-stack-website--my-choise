export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryId: string;
  brand?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  rating: number;
  numReviews: number;
  featured: boolean;
  isNew: boolean;
  description: string;
  details: string[];
  images: string[];
  specs?: Record<string, string>;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface BrandItem {
  id: string;
  name: string;
  country: string;
  logo: string;
  productCount: number;
}

export interface CouponItem {
  id: string;
  code: string;
  discountPercent: number;
  validUntil: string;
  status: "ACTIVE" | "EXPIRED";
  usageCount: number;
}

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  active: boolean;
}

export interface CustomerItem {
  id: string;
  name: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  tier: "VIP Collector" | "Gold Client" | "Silver Client";
  joinedDate: string;
}

export interface ActivityLogItem {
  id: string;
  action: string;
  adminName: string;
  timestamp: string;
  type: "CREATE" | "UPDATE" | "DELETE" | "AUTH";
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-watches",
    name: "Haute Horlogerie",
    slug: "horlogerie",
    description: "Swiss-crafted tourbillons, perpetual calendars, and titanium chronographs.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    productCount: 4,
  },
  {
    id: "cat-jewelry",
    name: "Fine Jewelry",
    slug: "jewelry",
    description: "18k Solid Gold, Rare Diamonds, and Artisan Sculpted Rings.",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    productCount: 3,
  },
  {
    id: "cat-leather",
    name: "Leather Goods",
    slug: "leather-goods",
    description: "Handcrafted Italian calfskin weekenders, wallets, and briefcases.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
    productCount: 3,
  },
  {
    id: "cat-audio",
    name: "Audiophile Sound",
    slug: "audio",
    description: "Planar magnetic acoustic headphones and handcrafted brass amplifiers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    productCount: 3,
  },
  {
    id: "cat-fragrance",
    name: "Niche Fragrances",
    slug: "fragrance",
    description: "Rare Oud, Ambergris, and Artisanal Botanical Extracts.",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
    productCount: 3,
  },
];

export const BRANDS: BrandItem[] = [
  { id: "b1", name: "Zenvia Geneva", country: "Switzerland", logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop", productCount: 6 },
  { id: "b2", name: "Verve Fine Atelier", country: "France", logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=300&auto=format&fit=crop", productCount: 4 },
  { id: "b3", name: "Milanese Leathercraft", country: "Italy", logo: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=300&auto=format&fit=crop", productCount: 3 },
  { id: "b4", name: "Elysium Acoustics", country: "Germany", logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop", productCount: 3 },
];

export const COUPONS: CouponItem[] = [
  { id: "c1", code: "ZENVIA10", discountPercent: 10, validUntil: "2026-12-31", status: "ACTIVE", usageCount: 142 },
  { id: "c2", code: "VIP20", discountPercent: 20, validUntil: "2026-10-15", status: "ACTIVE", usageCount: 89 },
  { id: "c3", code: "HERITAGE30", discountPercent: 30, validUntil: "2026-05-01", status: "EXPIRED", usageCount: 45 },
];

export const BANNERS: BannerItem[] = [
  {
    id: "ban-1",
    title: "Haute Horlogerie Vault 2026",
    subtitle: "Swiss flying tourbillons forged in grade 5 titanium",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    ctaText: "Explore Chronographs",
    ctaLink: "/products?category=horlogerie",
    active: true,
  },
  {
    id: "ban-2",
    title: "18K Solitaire Fine Jewelry",
    subtitle: "Ethically cut emerald black diamonds & rose gold bangles",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
    ctaText: "Discover Jewelry",
    ctaLink: "/products?category=jewelry",
    active: true,
  },
];

export const CUSTOMERS: CustomerItem[] = [
  { id: "cust-1", name: "Lady Eleanor Vance", email: "eleanor.vance@luxury.co", ordersCount: 14, totalSpent: 48900, tier: "VIP Collector", joinedDate: "2025-01-12" },
  { id: "cust-2", name: "Julian Sterling", email: "j.sterling@heritage.com", ordersCount: 8, totalSpent: 24500, tier: "Gold Client", joinedDate: "2025-03-20" },
  { id: "cust-3", name: "Alexander Wright", email: "wright.alex@monaco.mc", ordersCount: 5, totalSpent: 18200, tier: "Silver Client", joinedDate: "2025-06-15" },
  { id: "cust-4", name: "Sophia Montgomery", email: "s.montgomery@mayfair.co.uk", ordersCount: 11, totalSpent: 38400, tier: "VIP Collector", joinedDate: "2025-02-04" },
];

export const ACTIVITY_LOGS: ActivityLogItem[] = [
  { id: "act-1", action: "Updated stock for Zenvia Celestial Tourbillon to 5 units", adminName: "Executive Admin", timestamp: "2026-08-07 22:15", type: "UPDATE" },
  { id: "act-2", action: "Approved coupon code VIP20 (20% Off)", adminName: "Executive Admin", timestamp: "2026-08-07 19:40", type: "CREATE" },
  { id: "act-3", action: "Dispatched Order #ORD-98232 via Courier Express", adminName: "Executive Admin", timestamp: "2026-08-06 14:10", type: "UPDATE" },
  { id: "act-4", action: "Authenticated Admin Sign-In from Paris IP", adminName: "Executive Admin", timestamp: "2026-08-06 09:00", type: "AUTH" },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "prod-1",
    title: "Zenvia Celestial Tourbillon Titanium",
    slug: "zenvia-celestial-tourbillon",
    category: "Haute Horlogerie",
    categoryId: "cat-watches",
    brand: "Zenvia Geneva",
    price: 14500,
    discountPrice: 12900,
    stock: 3, // Low Stock Alert
    rating: 4.95,
    numReviews: 28,
    featured: true,
    isNew: true,
    description: "An extraordinary masterwork featuring a flying tourbillon movement encased in Grade 5 mirror-polished titanium with a sapphire crystal back.",
    details: [
      "Grade 5 Titanium Case (42mm)",
      "Manual Winding Caliber A-900 (72-hour power reserve)",
      "Hand-stitched Alligator Leather Strap with Titanium Deployment Buckle",
      "Water Resistant to 100 meters (10 ATM)",
      "Limited Edition #12 of 50 Pieces Worldwide"
    ],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "prod-2",
    title: "Verve Obsidian 18K Gold Solitaire Ring",
    slug: "verve-obsidian-18k-ring",
    category: "Fine Jewelry",
    categoryId: "cat-jewelry",
    brand: "Verve Fine Atelier",
    price: 4800,
    stock: 2, // Low Stock Alert
    rating: 4.90,
    numReviews: 19,
    featured: true,
    isNew: true,
    description: "Cast in 18k solid yellow gold with a high-luster, ethically sourced 2.5 carat emerald-cut black diamond, flanked by pavé brilliant-cut stones.",
    details: [
      "18K Solid Recycled Yellow Gold",
      "2.5ct Natural Emerald-Cut Black Diamond",
      "VS1 Clarity Accent Pavé Diamonds (0.45 tcw)",
      "Stamped with Official Atelier Hallmark",
      "Includes Certificate of Authenticity"
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
    category: "Leather Goods",
    categoryId: "cat-leather",
    brand: "Milanese Leathercraft",
    price: 1850,
    discountPrice: 1600,
    stock: 12,
    rating: 4.88,
    numReviews: 34,
    featured: true,
    isNew: false,
    description: "Crafted in Florence from vegetable-tanned Italian calfskin leather with brushed brass hardware and a soft Alcantara interior lining.",
    details: [
      "100% Italian Vegetable-Tanned Calfskin",
      "Solid Antique Brushed Brass Hardware",
      "Reinforced Base with Protective Brass Studs",
      "Internal Padded Laptop Sleeve & Dual Zip Pockets",
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
    category: "Audiophile Sound",
    categoryId: "cat-audio",
    brand: "Elysium Acoustics",
    price: 3200,
    stock: 4, // Low Stock Alert
    rating: 4.98,
    numReviews: 42,
    featured: true,
    isNew: true,
    description: "Ultra-wide acoustic soundstage powered by 100mm ultra-thin planar drivers, aerospace-grade aluminum ear cups, and genuine lambskin leather pads.",
    details: [
      "100mm Nanometer-Scale Planar Magnetic Transducers",
      "Frequency Response: 5Hz - 55,000Hz",
      "Impedance: 32 Ohms (High Sensitivity)",
      "Custom Detachable OCC 8-Core Silver-Plated Cable",
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
    category: "Niche Fragrances",
    categoryId: "cat-fragrance",
    brand: "Verve Fine Atelier",
    price: 520,
    stock: 20,
    rating: 4.92,
    numReviews: 57,
    featured: true,
    isNew: false,
    description: "A sensual olfactory journey blending smoky Cambodian Oud, Damask Rose, Gold Amber, and hints of Tahitian Vanilla.",
    details: [
      "Extrait de Parfum (35% High Oil Concentration)",
      "Top Notes: Cardamom, Bergamot, Pink Pepper",
      "Heart Notes: Damask Rose, Smoked Cedar, Saffron",
      "Base Notes: Cambodian Oud, Black Amber, Bourbon Vanilla",
      "Hand-blown Crystal Bottle with Magnetized Gold Cap"
    ],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop"
    ]
  },
  {
    id: "prod-6",
    title: "Lumina Sapphire Minimalist Chronograph",
    slug: "lumina-sapphire-chronograph",
    category: "Haute Horlogerie",
    categoryId: "cat-watches",
    brand: "Zenvia Geneva",
    price: 6400,
    discountPrice: 5800,
    stock: 9,
    rating: 4.85,
    numReviews: 14,
    featured: false,
    isNew: false,
    description: "Clean architectural geometry meets Swiss precision. Features a midnight blue sunray dial and anti-reflective sapphire crystal.",
    details: [
      "316L Surgical Stainless Steel Case",
      "Swiss Automatic Chronograph Movement",
      "Double Anti-Reflective Curved Sapphire Crystal",
      "Custom Milanese Mesh Steel Band",
      "50m Water Resistance"
    ],
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=1200&auto=format&fit=crop"
    ]
  }
];

export interface InitialOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: string;
  createdAt: string;
  items: {
    title: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

export const INITIAL_ORDERS: InitialOrder[] = [
  {
    id: "ORD-98231",
    customerName: "Eleanor Vance",
    customerEmail: "eleanor.vance@luxury.co",
    shippingAddress: "740 Park Avenue, Apt 14B, New York, NY 10021",
    totalAmount: 14500,
    status: "PROCESSING",
    paymentStatus: "PAID",
    createdAt: "2026-08-06T14:30:00.000Z",
    items: [
      {
        title: "Zenvia Celestial Tourbillon Titanium",
        price: 14500,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ORD-98232",
    customerName: "Julian Sterling",
    customerEmail: "j.sterling@heritage.com",
    shippingAddress: "42 Sloane Street, Belgravia, London SW1X 9LU",
    totalAmount: 5320,
    status: "SHIPPED",
    paymentStatus: "PAID",
    createdAt: "2026-08-05T09:15:00.000Z",
    items: [
      {
        title: "Verve Obsidian 18K Gold Solitaire Ring",
        price: 4800,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
      },
      {
        title: "Soleil Noir Extrait de Parfum 100ml",
        price: 520,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600&auto=format&fit=crop"
      }
    ]
  },
  {
    id: "ORD-98233",
    customerName: "Alexander Wright",
    customerEmail: "wright.alex@monaco.mc",
    shippingAddress: "Avenue Princesse Grace, 98000 Monaco",
    totalAmount: 3200,
    status: "DELIVERED",
    paymentStatus: "PAID",
    createdAt: "2026-08-03T18:40:00.000Z",
    items: [
      {
        title: "Elysium Open-Back Planar Headphones",
        price: 3200,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop"
      }
    ]
  }
];

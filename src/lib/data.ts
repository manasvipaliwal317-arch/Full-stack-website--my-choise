export interface AboutBullet {
  title: string;
  description: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  mrp?: number;
  image: string;
  inStock?: boolean;
}

export interface ProductQA {
  question: string;
  answer: string;
}

export interface FrequentlyBoughtItem {
  id: string;
  title: string;
  price: number;
  mrp?: number;
  image: string;
  rating: number;
}

export interface ProductItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  categoryId: string;
  subCategory?: string;
  subCategoryId?: string;
  brand?: string;
  price: number;
  discountPrice?: number;
  mrp?: number;
  stock: number;
  rating: number;
  numReviews: number;
  featured: boolean;
  isNew: boolean;
  description: string;
  details: string[];
  images: string[];
  specs?: Record<string, string>;
  aboutThisItem?: (AboutBullet | string)[];
  variants?: ProductVariant[];
  qa?: ProductQA[];
  frequentlyBoughtTogether?: FrequentlyBoughtItem[];
}

export interface SubCategoryItem {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  subCategories?: SubCategoryItem[];
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

export interface FestivalSettings {
  announcementEnabled: boolean;
  announcementText: string;
  announcementBadge: string;
  announcementLink: string;

  heroBannerEnabled: boolean;
  festivalTag: string;
  title: string;
  subtitle: string;
  discountText: string;
  categoryHighlight: string;
  valueProps: string;
  couponCode: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  bankOfferText: string;
  bankOfferSubtext: string;

  countdownEnabled: boolean;
  countdownTargetDate: string;
  countdownLabel: string;

  theme: "diwali-gold" | "festive-crimson" | "midnight-sparkle";
}

export const DEFAULT_FESTIVAL_SETTINGS: FestivalSettings = {
  announcementEnabled: true,
  announcementText: "🪔 Diwali Special — Extra 10% OFF on selected gadgets",
  announcementBadge: "DIWALI SPECIAL",
  announcementLink: "/products?deals=diwali",

  heroBannerEnabled: true,
  festivalTag: "Diwali Special",
  title: "Great Indian Festival",
  subtitle: "Massive festive discounts on laptops, smartwatches, sound systems & accessories.",
  discountText: "Up to 80% off*",
  categoryHighlight: "Electronics & accessories",
  valueProps: "Great Prices   |   Exchange Offer   |   No Cost EMI",
  couponCode: "DIWALI10",
  ctaText: "Shop Now",
  ctaLink: "/products?deals=diwali",
  secondaryCtaText: "Claim DIWALI10",
  secondaryCtaLink: "/products?coupon=DIWALI10",
  bankOfferText: "10% Instant Discount*",
  bankOfferSubtext: "*T&C apply",

  countdownEnabled: true,
  countdownTargetDate: new Date(Date.now() + (4 * 24 * 3600 + 18 * 3600 + 36 * 60 + 52) * 1000).toISOString(),
  countdownLabel: "OFFER ENDS IN",

  theme: "festive-crimson",
};

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
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    description: "Smartphones, tablets, gadgets, and next-gen smart tech.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    productCount: 18,
    subCategories: [
      { id: "sub-chargers", name: "Fast GaN Chargers & Power", slug: "fast-chargers" },
      { id: "sub-projectors", name: "Smart Home Projectors", slug: "projectors" },
      { id: "sub-smart-gadgets", name: "Next-Gen Tech Gadgets", slug: "gadgets" },
    ],
  },
  {
    id: "cat-laptops",
    name: "Laptops & PCs",
    slug: "laptops",
    description: "Ultrabooks, gaming rigs, and high-performance machines.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    productCount: 12,
    subCategories: [
      { id: "sub-ultrabooks", name: "Ultrabooks & Thin Laptops", slug: "ultrabooks" },
      { id: "sub-gaming-pcs", name: "Gaming Rigs & PCs", slug: "gaming-laptops" },
      { id: "sub-laptop-acc", name: "Laptop Sleeves & Stands", slug: "laptop-accessories" },
    ],
  },
  {
    id: "cat-watches",
    name: "Smart Watches",
    slug: "smart-watches",
    description: "AMOLED displays, fitness tracking, and premium wearable tech.",
    image: "/products/smartwatch-black.jpg",
    productCount: 14,
    subCategories: [
      { id: "sub-smartwatches", name: "AMOLED Calling Smartwatches", slug: "amoled-smartwatches" },
      { id: "sub-fitness-trackers", name: "Fitness & Health Trackers", slug: "fitness-trackers" },
      { id: "sub-watch-straps", name: "Replacement Bands & Straps", slug: "watch-bands" },
    ],
  },
  {
    id: "cat-audio",
    name: "Headphones & Audio",
    slug: "audio",
    description: "Noise cancelling earbuds, studio monitors, and bass speakers.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    productCount: 16,
    subCategories: [
      { id: "sub-earbuds", name: "True Wireless Earbuds", slug: "earbuds" },
      { id: "sub-speakers", name: "Portable Bluetooth Speakers", slug: "bluetooth-speakers" },
      { id: "sub-headphones", name: "Studio & Over-Ear Headphones", slug: "over-ear-headphones" },
    ],
  },
  {
    id: "cat-fashion",
    name: "Fashion & Apparel",
    slug: "fashion",
    description: "Trending streetwear, luxury casuals, and seasonal fits.",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
    productCount: 24,
    subCategories: [
      { id: "sub-mens-tees", name: "Men's Streetwear & Tops", slug: "mens-streetwear" },
      { id: "sub-womens-fashion", name: "Women's Trending Apparel", slug: "womens-fashion" },
      { id: "sub-fashion-acc", name: "Polarized Eyewear & Accessories", slug: "eyewear-accessories" },
    ],
  },
  {
    id: "cat-footwear",
    name: "Footwear & Kicks",
    slug: "footwear",
    description: "Performance running shoes, sneakers, and lifestyle footwear.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    productCount: 15,
    subCategories: [
      { id: "sub-running-shoes", name: "Athletic & Running Shoes", slug: "running-shoes" },
      { id: "sub-casual-kicks", name: "Urban Lifestyle Sneakers", slug: "casual-sneakers" },
    ],
  },
  {
    id: "cat-home",
    name: "Home & Living",
    slug: "home",
    description: "Smart home appliances, modern decor, and kitchen essentials.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    productCount: 20,
    subCategories: [
      { id: "sub-plant-stands", name: "Multi-Tier Plant Stands", slug: "plant-stands" },
      { id: "sub-garden-trellis", name: "Trellises & Wall Racks", slug: "garden-racks" },
      { id: "sub-home-decor", name: "Planters & Modern Decor", slug: "home-decor" },
    ],
  },
  {
    id: "cat-beauty",
    name: "Beauty & Grooming",
    slug: "beauty",
    description: "Skin wellness, luxury fragrances, and professional grooming.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop",
    productCount: 14,
    subCategories: [
      { id: "sub-skincare", name: "Clean Facial Skincare & Serums", slug: "skincare-serums" },
      { id: "sub-fragrance", name: "Luxury Niche Fragrances", slug: "perfumes-fragrances" },
      { id: "sub-mens-grooming", name: "Men's Grooming & Beard Care", slug: "mens-grooming" },
      { id: "sub-haircare", name: "Hair Nourishment & Oils", slug: "hair-care" },
    ],
  },
];

export const BRANDS: BrandItem[] = [
  { id: "b1", name: "Apple", country: "USA", logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=300&auto=format&fit=crop", productCount: 15 },
  { id: "b2", name: "Samsung", country: "South Korea", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=300&auto=format&fit=crop", productCount: 18 },
  { id: "b3", name: "Sony", country: "Japan", logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop", productCount: 12 },
  { id: "b4", name: "Nike", country: "USA", logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=300&auto=format&fit=crop", productCount: 20 },
  { id: "b5", name: "Bose", country: "USA", logo: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=300&auto=format&fit=crop", productCount: 8 },
  { id: "b6", name: "boAt", country: "India", logo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=300&auto=format&fit=crop", productCount: 14 },
  { id: "b7", name: "ecofynd", country: "India", logo: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=300&auto=format&fit=crop", productCount: 12 },
  { id: "b8", name: "LumiGlow", country: "France", logo: "/products/serum-30ml.jpg", productCount: 8 },
  { id: "b9", name: "Zenvia Paris", country: "France", logo: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&auto=format&fit=crop", productCount: 6 },
];

export const COUPONS: CouponItem[] = [
  { id: "c-diwali", code: "DIWALI10", discountPercent: 10, validUntil: "2026-11-30", status: "ACTIVE", usageCount: 420 },
  { id: "c1", code: "CHOISE10", discountPercent: 10, validUntil: "2026-12-31", status: "ACTIVE", usageCount: 230 },
  { id: "c2", code: "SAVE20", discountPercent: 20, validUntil: "2026-10-15", status: "ACTIVE", usageCount: 145 },
  { id: "c3", code: "MEGA50", discountPercent: 50, validUntil: "2026-05-01", status: "ACTIVE", usageCount: 88 },
  { id: "c4", code: "ZENVIA10", discountPercent: 10, validUntil: "2026-12-31", status: "ACTIVE", usageCount: 95 },
  { id: "c5", code: "VIP20", discountPercent: 20, validUntil: "2026-10-15", status: "ACTIVE", usageCount: 60 },
];

export const BANNERS: BannerItem[] = [
  {
    id: "ban-1",
    title: "Electronics Sale Live Now – 24 Hours to Save",
    subtitle: "Your next gadget is waiting – up to 60% off during our flash sale.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop",
    ctaText: "Shop Now",
    ctaLink: "/products?category=electronics",
    active: true,
  },
  {
    id: "ban-2",
    title: "BIG SALE — UP TO 70% OFF",
    subtitle: "Discover premium smartphones, ultra laptops, and luxury home essentials.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop",
    ctaText: "Explore Offers",
    ctaLink: "/products",
    active: true,
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "prod-9",
    title: "ecofynd Ryder Plant Stands for Outdoor Balcony, Flower Pot Stand for Indoor Plants, Metal Planter Stand for Living Room, Home Decor, Indoor & Outdoor plants, 3 Tier, (Black)",
    slug: "ecofynd-ryder-plant-stand-3-tier",
    category: "Home & Living",
    categoryId: "cat-home",
    subCategory: "Multi-Tier Plant Stands",
    subCategoryId: "sub-plant-stands",
    brand: "ecofynd",
    price: 7599,
    discountPrice: 3199,
    mrp: 7599,
    stock: 1,
    rating: 4.4,
    numReviews: 597,
    featured: true,
    isNew: true,
    description: "Heavy-duty 3-tier stepped black metal plant stand designed for outdoor balconies, living rooms, and indoor gardens. Anti-rust powder-coated frame holding up to 50 kg total weight.",
    details: [
      "Heavy-duty Carbon Steel with Rust-proof Electrostatic Powder Coating",
      "3-Tier Stepped Wire Mesh Design for Maximum Sunlight Exposure",
      "Reinforced Crossbars Supporting up to 50 kg Total Load",
      "Quick Tool-Free Assembly in Under 10 Minutes with Included Hardware"
    ],
    images: [
      "/products/ecofynd-stand-1.jpg",
      "/products/ecofynd-stand-2.jpg",
      "/products/ecofynd-stand-white.jpg"
    ],
    specs: {
      "Colour": "Black (3-tier)",
      "Material": "Metal (Carbon Steel)",
      "Brand": "ecofynd",
      "Item Weight": "4 Kg 920 g",
      "Item Dimensions L x W x H": "52 x 25 x 35 Centimetres",
      "Style": "3 Tier",
      "Finish Type": "Powder Coated Rust Proof",
      "Mounting Type": "Floor Standing",
      "Assembly Required": "Yes (Hardware Included)"
    },
    aboutThisItem: [
      {
        title: "Premium Material",
        description: "Our plant stand is made of exemplary powder-coated, anti-corrosive and rust-proof metal. The broad base plant stands is more stable and reliable for maximum load endurance."
      },
      {
        title: "Multi-useful Plant Stand",
        description: "Spacious step 3-tier sturdy shelves that can be used to store and display a variety of decorative items, potted plants, toys, shoes, books and other living room accessories."
      },
      {
        title: "Easy to assemble and Use",
        description: "The plant stand for flower pots has a steady structure. The assembly of the indoor plant stand does not require special tools or complicated skills. Comes with screws and an Allen key for effortless setup in under 10 minutes."
      },
      {
        title: "Suitable places",
        description: "Seamless in your corner balcony, sunroom, living room, patio deck, entryway, plant flower shop, and bedroom corner. Enhances any space with modern vertical greenery."
      },
      {
        title: "Maintenance",
        description: "Protected with an anti-rust powder coating. Simply wipe clean with a soft dry or damp cloth. Sturdy tubular frame supports up to 50 kg total weight."
      }
    ],
    variants: [
      { id: "v1", name: "Black (3-tier)", price: 3199, mrp: 7599, image: "/products/ecofynd-stand-1.jpg", inStock: true },
      { id: "v2", name: "White (3-tier)", price: 3299, mrp: 7699, image: "/products/ecofynd-stand-white.jpg", inStock: true },
      { id: "v3", name: "Balcony Step Angle", price: 3199, mrp: 7599, image: "/products/ecofynd-stand-2.jpg", inStock: true },
      { id: "v4", name: "Rustic Bronze (3-tier)", price: 3399, mrp: 7899, image: "/products/ecofynd-stand-1.jpg", inStock: true },
      { id: "v5", name: "Compact (2-tier)", price: 2199, mrp: 5299, image: "/products/ecofynd-stand-1.jpg", inStock: true },
    ],
    qa: [
      { question: "Can it hold huge plants?", answer: "Yes! Each heavy-duty mesh shelf is engineered with reinforced cross-bars capable of supporting pots up to 15 kg each (50 kg total weight across all 3 tiers)." },
      { question: "Does it come with pots?", answer: "No, this listing is for the multi-tier metal plant stand frame only. The decorative pots and plants shown are for illustrative styling ideas." },
      { question: "Is it weatherproof?", answer: "Yes! The stand features a multi-layer electrostatic powder coating that is water-resistant, rust-proof, and UV-stabilized for outdoor balconies and gardens." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "ecofynd-trellis-tall",
        title: "ecofynd 4-Tier Metal Trellis Garden Plant Stand for Outdoor Balcony, Flower Pot Rack",
        price: 2199,
        mrp: 4999,
        image: "/products/ecofynd-tall-stand.jpg",
        rating: 4.6
      }
    ]
  },
  {
    id: "prod-1",
    title: "StreamAir Pro Active Noise Cancelling Earbuds with 40dB Hybrid ANC, 36H Playtime, Fast Charge",
    slug: "streamair-pro-earbuds",
    category: "Headphones & Audio",
    categoryId: "cat-audio",
    subCategory: "True Wireless Earbuds",
    subCategoryId: "sub-earbuds",
    brand: "Sony",
    price: 2499,
    discountPrice: 799,
    mrp: 2499,
    stock: 24,
    rating: 4.5,
    numReviews: 128,
    featured: true,
    isNew: true,
    description: "Pure sonic precision with 40dB Hybrid Active Noise Cancellation, Bluetooth 5.4, and 36-hour total playback battery in a compact wireless charging case.",
    details: [
      "40dB Hybrid Active Noise Cancellation with Transparency Mode",
      "Bluetooth 5.4 with Low Latency Gaming Mode",
      "IPX5 Sweat & Water Resistance for Gym and Outdoors",
      "Wireless Fast Charging Support (10 min charge = 3 hours playback)"
    ],
    images: [
      "/products/earbuds-white-1.jpg",
      "/products/earbuds-white-2.jpg",
      "/products/earbuds-white-3.jpg",
      "/products/earbuds-black-1.jpg"
    ],
    specs: {
      "Colour": "Pearl White",
      "Brand": "Sony",
      "Model Name": "StreamAir Pro TWS Earbuds",
      "Form Factor": "True Wireless In-Ear EarPods",
      "Ear Tip Sizes": "S, M, L Soft Silicone Tips Included",
      "Noise Control": "40dB Hybrid Active Noise Cancellation",
      "Battery Life": "36 Hours Total (8h Buds + 28h Case)",
      "Charging Interface": "USB-C Fast Charging & Qi Wireless",
      "Water Resistance": "IPX5 Sweat & Splash Proof",
      "Item Weight": "42 Grams (Case + Earbuds)"
    },
    aboutThisItem: [
      {
        title: "True Wireless In-Ear Design",
        description: "Featherlight 4.2g per earbud ergonomically contoured with pressure-relief acoustic vents and 3 sizes of medical-grade silicone ear tips for comfortable all-day listening."
      },
      {
        title: "40dB Hybrid Active Noise Cancellation",
        description: "Dual feedforward and feedback microphones actively neutralize up to 40dB of ambient traffic, airplane drone, and gym noise. Switch to Transparency Mode with a quick tap."
      },
      {
        title: "Hi-Res Audio with Punchy Bass",
        description: "Custom-tuned 11mm titanium diaphragm dynamic drivers deliver expansive soundstage, crisp treble, and rich, sub-bass resonance."
      },
      {
        title: "Extended 36-Hour Playtime",
        description: "Enjoy up to 8 continuous hours on a single charge and 28 additional hours with the pocket-friendly USB-C fast charging case. 10 minutes of charging gives 3 hours playback."
      },
      {
        title: "Dual-Device Smart Pairing & IPX5",
        description: "Seamlessly switch between your laptop meeting and smartphone calls without reconnecting Bluetooth. Certified IPX5 sweat-resistant for workouts and rainy commutes."
      }
    ],
    variants: [
      { id: "v1", name: "Pearl White", price: 799, mrp: 2499, image: "/products/earbuds-white-1.jpg", inStock: true },
      { id: "v2", name: "Matte Black", price: 849, mrp: 2499, image: "/products/earbuds-black-1.jpg", inStock: true }
    ],
    qa: [
      { question: "How is the bass quality?", answer: "The 11mm titanium drivers provide deep, punchy bass without muddying the vocal mids or highs." },
      { question: "Does it support iPhone and Android?", answer: "Yes, fully compatible with iOS, Android, macOS, and Windows via Bluetooth 5.4." },
      { question: "Is it suitable for gym workouts?", answer: "Yes, rated IPX5 sweat and splash resistant with snug ergonomic fit." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "silicone-earbuds-case",
        title: "Shockproof Silicone Protective Case Cover with Carabiner Clip for StreamAir Pro",
        price: 249,
        mrp: 699,
        image: "/products/earbuds-white-2.jpg",
        rating: 4.7
      }
    ]
  },
  {
    id: "prod-2",
    title: "Trackline Sport Edition AMOLED Smart Watch with Bluetooth Calling, SpO2, 100+ Sports Modes",
    slug: "trackline-sport-smart-watch",
    category: "Smart Watches",
    categoryId: "cat-watches",
    subCategory: "AMOLED Smart Watches",
    subCategoryId: "sub-smartwatches",
    brand: "Apple",
    price: 4999,
    discountPrice: 1299,
    mrp: 4999,
    stock: 18,
    rating: 4.3,
    numReviews: 94,
    featured: true,
    isNew: true,
    description: "Vivid 1.96-inch Always-on AMOLED display, Bluetooth calling with AI noise reduction, SpO2 sensor, and 100+ sports modes.",
    details: [
      "1.96-inch High-Brightness HD AMOLED Display (60Hz)",
      "Built-in Microphone & Speaker for Crystal HD Calling",
      "Continuous Heart Rate, Blood Oxygen & Sleep Tracking",
      "Long-lasting 10-day battery life on single charge"
    ],
    images: [
      "/products/smartwatch-black.jpg",
      "/products/smartwatch-gold.jpg"
    ],
    specs: {
      "Colour": "Space Gray",
      "Brand": "Apple",
      "Screen Size": "1.96 Inches AMOLED",
      "Battery Life": "Up to 10 Days",
      "Water Resistance": "IP68 Dust & Water Resistant",
      "Compatible OS": "Android 6.0+ & iOS 11.0+",
      "Special Feature": "Bluetooth Calling & AI Voice Assistant"
    },
    aboutThisItem: [
      {
        title: "1.96\" Ultra HD AMOLED Display",
        description: "Enjoy vivid colors and 600 nits peak sunlight readability with Always-On display mode and scratch-resistant 2.5D curved glass."
      },
      {
        title: "Hands-Free Bluetooth Calling",
        description: "Make and answer crystal clear calls right from your wrist with the built-in speaker and AI noise cancellation microphone."
      },
      {
        title: "Comprehensive Health Tracking",
        description: "24/7 continuous monitoring of Heart Rate, SpO2 Blood Oxygen levels, Deep/Light Sleep phases, and Stress levels with real-time abnormal alerts."
      },
      {
        title: "100+ Professional Sports Modes",
        description: "Accurately record outdoor runs, cycling, swimming, yoga, and HIIT workouts with automatic exercise recognition."
      },
      {
        title: "Long 10-Day Battery Life",
        description: "Optimized power architecture gives you 7-10 days of typical daily use and up to 25 days on standby mode."
      }
    ],
    variants: [
      { id: "v1", name: "Space Gray", price: 1299, mrp: 4999, image: "/products/smartwatch-black.jpg", inStock: true },
      { id: "v2", name: "Starlight Gold", price: 1399, mrp: 5299, image: "/products/smartwatch-gold.jpg", inStock: true }
    ],
    qa: [
      { question: "Can I receive and answer phone calls?", answer: "Yes, you can dial contacts and speak directly through the watch using Bluetooth calling." },
      { question: "Is it waterproof for swimming?", answer: "It is IP68 water resistant, suitable for sweat, rain, and hand washing." },
      { question: "Does it have Always-On Display?", answer: "Yes, the AMOLED panel supports multiple customizable Always-On watch faces." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "smartwatch-strap-pack",
        title: "Magnetic Milanese Loop Stainless Steel Replacement Band (22mm)",
        price: 399,
        mrp: 999,
        image: "/products/smartwatch-gold.jpg",
        rating: 4.5
      }
    ]
  },
  {
    id: "prod-3",
    title: "MagVolt 30W Magnetic GaN Fast Charger with Dual USB-C PD 3.0 & Smart Temperature Protection",
    slug: "magvolt-30w-magnetic-charger",
    category: "Electronics",
    categoryId: "cat-electronics",
    subCategory: "Fast GaN Chargers & Power",
    subCategoryId: "sub-chargers",
    brand: "Samsung",
    price: 1499,
    discountPrice: 499,
    mrp: 1499,
    stock: 45,
    rating: 4.7,
    numReviews: 215,
    featured: true,
    isNew: false,
    description: "Pocket-sized ultra-fast Gallium Nitride (GaN) magnetic charger compatible with all iPhone, Samsung, and Qi-enabled gadgets.",
    details: [
      "Next-Gen GaN III Semiconductor Technology",
      "Strong Snap Magnetic Alignment",
      "Dual USB-C Power Delivery 3.0",
      "Multi-Protect Smart Temperature Control"
    ],
    images: [
      "/products/charger-white.jpg",
      "/products/charger-black.jpg"
    ],
    specs: {
      "Colour": "Glacier White",
      "Brand": "Samsung",
      "Wattage": "30 Watts Fast Charging",
      "Ports": "Dual USB-C Power Delivery",
      "Dimensions": "3.5 x 3.5 x 4.0 Centimetres",
      "Item Weight": "58 Grams"
    },
    aboutThisItem: [
      {
        title: "Next-Gen GaN III Technology",
        description: "Utilizes advanced Gallium Nitride semiconductors for 3x faster charging in a body 50% smaller than traditional chargers."
      },
      {
        title: "Snap Magnetic Alignment",
        description: "Strong N52 neodymium magnets snap perfectly to MagSafe-compatible phones and Qi2 wireless devices."
      },
      {
        title: "Dual USB-C Power Delivery",
        description: "Simultaneously fast-charge your phone and earbuds with intelligent dynamic power allocation."
      },
      {
        title: "Comprehensive Device Safety",
        description: "Built-in dynamic temperature sensors check heat over 3 million times per day to prevent overcharging and surges."
      }
    ],
    variants: [
      { id: "v1", name: "Glacier White", price: 499, mrp: 1499, image: "/products/charger-white.jpg", inStock: true },
      { id: "v2", name: "Carbon Black", price: 499, mrp: 1499, image: "/products/charger-black.jpg", inStock: true }
    ],
    qa: [
      { question: "Does it heat up while fast charging?", answer: "No, the GaN III architecture and smart thermal sensor keep operating temperatures exceptionally low." },
      { question: "Can it charge iPhone 15/16 at full speed?", answer: "Yes, delivers up to 30W Power Delivery, charging your device to 50% in under 25 minutes." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "usbc-braided-cable",
        title: "Braided 60W USB-C to USB-C Fast Charging Cable (1.5 Meter)",
        price: 199,
        mrp: 599,
        image: "/products/charger-white.jpg",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-4",
    title: "BassPulse 360 Portable Waterproof Speaker with 24W Deep Bass, 16H Battery & RGB Beat Sync",
    slug: "basspulse-360-speaker",
    category: "Headphones & Audio",
    categoryId: "cat-audio",
    subCategory: "Portable Bluetooth Speakers",
    subCategoryId: "sub-speakers",
    brand: "Bose",
    price: 3499,
    discountPrice: 999,
    mrp: 3499,
    stock: 12,
    rating: 4.4,
    numReviews: 76,
    featured: true,
    isNew: true,
    description: "Punchy 360-degree surround sound with dual passive radiators, IPX7 waterproof rating, and dynamic beat-synced RGB ring.",
    details: [
      "24W Deep Bass RMS Audio Output",
      "Full IPX7 Waterproof & Floating Design",
      "Up to 16 Hours Continuous Playtime",
      "TWS Mode: Pair 2 Speakers for True Stereo"
    ],
    images: [
      "/products/speaker-teal.jpg",
      "/products/speaker-black.jpg"
    ],
    specs: {
      "Colour": "Ocean Teal",
      "Brand": "Bose",
      "Speaker Maximum Output Power": "24 Watts",
      "Connectivity Technology": "Bluetooth 5.3, AUX, TF Card",
      "Waterproof Level": "IPX7 Waterproof",
      "Battery Life": "16 Hours",
      "Item Weight": "480 Grams"
    },
    aboutThisItem: [
      {
        title: "360° Omnidirectional Room-Filling Sound",
        description: "Equipped with dual neodymium drivers and dual passive bass radiators pumping 24W peak punchy stereo sound in all directions."
      },
      {
        title: "Full IPX7 Waterproof & Rugged",
        description: "Engineered to withstand complete submersion in up to 1 meter of water for 30 minutes. It even floats, making it ideal for pool parties and beach days."
      },
      {
        title: "Dynamic Beat-Driven RGB Light Show",
        description: "Multi-color halo rings pulse, phase, and flash in sync with the rhythm of your music with 6 selectable lighting presets."
      },
      {
        title: "True Wireless Stereo (TWS) Pairing",
        description: "Wirelessly pair two BassPulse 360 units for doubled volume and expansive left/right acoustic channel separation."
      }
    ],
    variants: [
      { id: "v1", name: "Ocean Teal", price: 999, mrp: 3499, image: "/products/speaker-teal.jpg", inStock: true },
      { id: "v2", name: "Midnight Black", price: 999, mrp: 3499, image: "/products/speaker-black.jpg", inStock: true }
    ],
    qa: [
      { question: "Is it genuinely waterproof?", answer: "Yes, certified IPX7 waterproof. Can be submerged in water without any damage." },
      { question: "How long does the battery last with RGB on?", answer: "Approximately 12 to 14 hours with RGB lights enabled, and 16 hours with lights off." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "speaker-travel-case",
        title: "Hard EVA Shockproof Travel Carry Case for Portable Cylindrical Bluetooth Speaker",
        price: 299,
        mrp: 799,
        image: "/products/speaker-teal.jpg",
        rating: 4.6
      }
    ]
  },
  {
    id: "prod-5",
    title: "AuraFrame Polarized UV400 Sunglasses with 9-Layer TAC Lenses & Ultralight Matte Frame",
    slug: "auraframe-polarized-sunglasses",
    category: "Fashion & Apparel",
    categoryId: "cat-fashion",
    subCategory: "Polarized Eyewear & Accessories",
    subCategoryId: "sub-fashion-acc",
    brand: "Nike",
    price: 2499,
    discountPrice: 699,
    mrp: 2499,
    stock: 30,
    rating: 4.6,
    numReviews: 189,
    featured: true,
    isNew: false,
    description: "Lightweight matte acetate frames featuring 9-layer TAC polarized lenses providing 100% UV400 protection.",
    details: [
      "9-Layer Polarized HD Triacetate Cellulose Lenses",
      "100% UVA/UVB/UVC Ray Filtering",
      "Ultralight Flexible Matte Frame (18 grams)",
      "Includes Hard Case & Microfiber Cleaning Cloth"
    ],
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Colour": "Matte Black / Smoke Gray",
      "Brand": "Nike",
      "Frame Material": "Swiss TR90 Memory Polymer",
      "Lens Material": "9-Layer TAC Polarized",
      "UV Protection": "100% UV400",
      "Weight": "18 Grams"
    },
    aboutThisItem: [
      {
        title: "9-Layer Polarized Clarity",
        description: "Eliminates 99% of reflected road glare and water glare while preserving accurate color perception and depth clarity."
      },
      {
        title: "100% UV400 Eye Defense",
        description: "Certified to block 100% of harmful UVA, UVB, and UVC ultraviolet rays up to 400 nanometers."
      },
      {
        title: "Ultralight TR90 Flexible Frame",
        description: "Weighs only 18 grams. Bendable and shape-retaining memory frame rests softly on your nose bridge without fatigue."
      }
    ],
    variants: [
      { id: "v1", name: "Matte Black", price: 699, mrp: 2499, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "Tortoise Shell", price: 749, mrp: 2699, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Are these suitable for driving?", answer: "Yes, polarized lenses significantly cut windshield reflection and sunlight glare off wet roads." },
      { question: "Does it come with a protective case?", answer: "Yes, includes a reinforced zippered hard case and microfiber pouch." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "sunglasses-car-clip",
        title: "Sun Visor Sunglasses Clip Holder for Car with Magnetic Leather Buckle",
        price: 199,
        mrp: 499,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop",
        rating: 4.6
      }
    ]
  },
  {
    id: "prod-6",
    title: "StreamBook Air Ultra 14-inch Laptop (Octa-Core, 16GB LPDDR5, 512GB NVMe SSD, 2.8K OLED Display)",
    slug: "streambook-air-ultra-laptop",
    category: "Laptops & PCs",
    categoryId: "cat-laptops",
    subCategory: "Ultrabooks & Thin Laptops",
    subCategoryId: "sub-ultrabooks",
    brand: "Apple",
    price: 79999,
    discountPrice: 54999,
    mrp: 79999,
    stock: 8,
    rating: 4.9,
    numReviews: 45,
    featured: true,
    isNew: true,
    description: "Featherlight 1.2kg unibody aluminum design powered by an 8-Core processor, 16GB unified RAM, and 512GB NVMe SSD.",
    details: [
      "14.1-inch 2.8K OLED Display (100% DCI-P3)",
      "High-Efficiency Octa-Core Processor",
      "16GB LPDDR5 RAM + 512GB PCIe 4.0 SSD",
      "Backlit Keyboard and Fingerprint Sensor"
    ],
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Colour": "Space Gray Unibody",
      "Brand": "Apple",
      "Screen Size": "14.1 Inches OLED 2.8K (2880 x 1800)",
      "CPU Model": "Next-Gen 8-Core High Efficiency",
      "RAM": "16 GB LPDDR5 6400MHz",
      "Hard Disk": "512 GB PCIe 4.0 NVMe SSD",
      "Operating System": "macOS Ventura / Windows 11 Pro",
      "Item Weight": "1.24 Kilograms"
    },
    aboutThisItem: [
      {
        title: "Breathtaking 2.8K OLED Display",
        description: "Features 1,000,000:1 contrast ratio, 100% DCI-P3 cinema color gamut, and 90Hz refresh rate for stunning visuals and color-critical creative work."
      },
      {
        title: "Flagship Performance & 16GB RAM",
        description: "Equipped with high-performance 8-Core processor and 16GB LPDDR5 RAM for lag-free multitasking, 4K video rendering, and programming."
      },
      {
        title: "All-Day 14-Hour Battery Life",
        description: "Work anywhere without anxiety with rapid 65W GaN USB-C fast charging that refuels 60% battery in 35 minutes."
      },
      {
        title: "Precision CNC Aluminum Chassis",
        description: "Razor-thin 13.9mm profile weighing only 1.2kg with edge-to-edge backlit keyboard and precision glass trackpad."
      }
    ],
    variants: [
      { id: "v1", name: "Space Gray (16GB/512GB)", price: 54999, mrp: 79999, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "Silver Metal (16GB/1TB)", price: 62999, mrp: 89999, image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Is the keyboard backlit?", answer: "Yes, 3-level adjustable white LED backlighting with ambient light sensor." },
      { question: "What is the warranty period?", answer: "Comes with 1 Year On-Site Comprehensive Brand Warranty." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "laptop-sleeve-stand",
        title: "Water-Repellent 14-inch Laptop Sleeve with Foldable Ergonomic Stand",
        price: 899,
        mrp: 1999,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
        rating: 4.9
      }
    ]
  },
  {
    id: "prod-7",
    title: "NeoCinema 4K Smart HDR Mini Projector with Auto Focus, 500 ANSI Lumens, Dual Hi-Fi Speakers",
    slug: "neocinema-4k-smart-projector",
    category: "Electronics",
    categoryId: "cat-electronics",
    subCategory: "Smart Home Projectors",
    subCategoryId: "sub-projectors",
    brand: "Samsung",
    price: 24999,
    discountPrice: 12499,
    mrp: 24999,
    stock: 10,
    rating: 4.7,
    numReviews: 63,
    featured: true,
    isNew: true,
    description: "Compact home theater projector with Auto Keystone, autofocus, built-in Netflix, YouTube, and 500 ANSI lumen brightness.",
    details: [
      "Native 1080p with 4K HDR10 Decoding",
      "Auto Focus & Auto Omnidirectional Keystone",
      "Built-in Dual Hi-Fi Speakers with Dolby Audio",
      "HDMI, USB, Screen Mirroring & Wi-Fi 6"
    ],
    images: [
      "/products/projector-main.jpg"
    ],
    specs: {
      "Colour": "Star White",
      "Brand": "Samsung",
      "Display Resolution": "Native 1080p (4K Supported)",
      "Brightness": "500 ANSI Lumens",
      "Max Screen Size": "200 Inches",
      "Connectivity": "Wi-Fi 6, Bluetooth 5.2, HDMI, USB"
    },
    aboutThisItem: [
      {
        title: "Intelligent Auto Focus & Keystone",
        description: "Zero manual adjustment needed. Auto keystone and laser autofocus ensure rectangular, razor-sharp picture in 3 seconds from any angle."
      },
      {
        title: "500 ANSI Bright Lumens",
        description: "Delivers vibrant cinema projection up to 200 inches with vivid contrast and authentic color accuracy even with ambient room lights."
      },
      {
        title: "Built-In Dual Hi-Fi Dolby Speakers",
        description: "Integrated acoustic chamber with Dolby Audio delivers rich room-filling audio without requiring external speakers."
      }
    ],
    variants: [
      { id: "v1", name: "Star White", price: 12499, mrp: 24999, image: "/products/projector-main.jpg", inStock: true }
    ],
    qa: [
      { question: "Can I cast Netflix from phone?", answer: "Yes, supports certified Netflix, Prime Video, YouTube, and iOS/Android wireless screen mirroring." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "projector-tripod-stand",
        title: "Universal 360° Rotatable Aluminium Projector Tripod Floor Stand",
        price: 999,
        mrp: 2499,
        image: "/products/projector-main.jpg",
        rating: 4.7
      }
    ]
  },
  {
    id: "prod-8",
    title: "AirStride Cloudfoam Performance Running Sneakers with Breathable Engineered Knit & High Traction",
    slug: "airstride-cloudfoam-sneakers",
    category: "Footwear & Kicks",
    categoryId: "cat-footwear",
    subCategory: "Athletic & Running Shoes",
    subCategoryId: "sub-running-shoes",
    brand: "Nike",
    price: 5999,
    discountPrice: 2899,
    mrp: 5999,
    stock: 22,
    rating: 4.8,
    numReviews: 142,
    featured: true,
    isNew: false,
    description: "High-rebound responsive cushioning with breathable engineered mesh uppers for all-day comfort and athletic performance.",
    details: [
      "Cloudfoam High-Rebound Midsole Cushioning",
      "Breathable Multi-Zone Knit Mesh Upper",
      "Durable Non-Marking High-Traction Rubber Sole",
      "Ortholite Antimicrobial Moisture-Wicking Sockliner"
    ],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Colour": "Varsity Red / White",
      "Brand": "Nike",
      "Closure": "Lace-Up",
      "Sole Material": "High Traction Rubber",
      "Outer Material": "Breathable Engineered Knit",
      "Style": "Athletic Running / Lifestyle"
    },
    aboutThisItem: [
      {
        title: "Responsive Cloudfoam Midsole",
        description: "Absorbs ground impact and returns energy into your stride, reducing joint stress during runs, walks, and long standing shifts."
      },
      {
        title: "Breathable Knit Upper",
        description: "Multi-zone engineered mesh airflow channels keep your feet cool and dry in any weather."
      },
      {
        title: "High-Grip Rubber Outsole",
        description: "Precision tread patterns provide maximum traction and durability on pavement, gym floors, and wet tiles."
      }
    ],
    variants: [
      { id: "v1", name: "Varsity Red / White", price: 2899, mrp: 5999, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "Stealth Black", price: 2999, mrp: 5999, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Is it true to size?", answer: "Yes, fits true to standard UK/India shoe sizing. For wider feet, consider going up half a size." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "cushioned-running-socks",
        title: "Pack of 3 Breathable Anti-Blister Cushion Running Ankle Socks",
        price: 299,
        mrp: 699,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-10",
    title: "LumiGlow 15% Vitamin C + Hyaluronic Acid Radiance Face Serum with Ferulic Acid & Vitamin E",
    slug: "lumiglow-vitamin-c-radiance-serum",
    category: "Beauty & Grooming",
    categoryId: "cat-beauty",
    subCategory: "Clean Facial Skincare & Serums",
    subCategoryId: "sub-skincare",
    brand: "LumiGlow",
    price: 1499,
    discountPrice: 699,
    mrp: 1499,
    stock: 35,
    rating: 4.8,
    numReviews: 218,
    featured: true,
    isNew: true,
    description: "Clinical-grade 15% Ethyl Ascorbic Acid formulated with multi-molecular Hyaluronic Acid and Ferulic Acid to fade hyperpigmentation, brighten dull complexion, and boost collagen production.",
    details: [
      "15% Stable Ethyl Ascorbic Acid (Vitamin C) for Visible Glow in 14 Days",
      "Multi-Molecular Hyaluronic Acid for 72-Hour Deep Epidermal Hydration",
      "Ferulic Acid & Vitamin E Triple Antioxidant Environmental Shield",
      "Non-Comedogenic, Fragrance-Free, 100% Vegan & Dermatologically Tested"
    ],
    images: [
      "/products/serum-30ml.jpg",
      "/products/serum-dropper.jpg"
    ],
    specs: {
      "Skin Type": "All Skin Types (Acne-Prone & Sensitive Safe)",
      "Key Actives": "15% Vitamin C, 1% Hyaluronic Acid, 0.5% Ferulic Acid",
      "Volume": "30ml / 1.0 fl oz",
      "Item Form": "Lightweight Water-Gel Serum",
      "Formulation": "Paraben-Free, Sulfate-Free, Cruelty-Free",
      "Scent": "Unscented / 100% Fragrance-Free",
      "Country of Origin": "France"
    },
    aboutThisItem: [
      {
        title: "Advanced 15% Triple-Antioxidant Synergy",
        description: "Formulated with 15% ultra-stable Ethyl Ascorbic Acid, Ferulic Acid, and Vitamin E to neutralize UV-induced free radicals and visibly fade stubborn dark spots, sun blemishes, and post-acne marks."
      },
      {
        title: "Intense Multi-Depth Plumping",
        description: "Contains three molecular weights of Hyaluronic Acid that penetrate deeply into dermis layers, locking in moisture for a bouncy, youthful glass-skin finish without stickiness."
      },
      {
        title: "Fast-Absorbing Micro-Emulsion",
        description: "Absorbs into skin in under 15 seconds without leaving greasy or tacky residue. Perfect as a protective radiant base under daily sunscreen or makeup."
      },
      {
        title: "Clean Dermatological Standards",
        description: "Free from synthetic perfumes, essential oils, parabens, silicones, and mineral oils. Certified non-comedogenic and hypoallergenic by clinical dermatologists."
      }
    ],
    variants: [
      { id: "v1", name: "30ml Dropper Bottle", price: 699, mrp: 1499, image: "/products/serum-30ml.jpg", inStock: true },
      { id: "v2", name: "50ml Value Pack", price: 999, mrp: 2199, image: "/products/serum-dropper.jpg", inStock: true }
    ],
    qa: [
      { question: "Can this serum be used daily in morning and night?", answer: "Yes! Apply 3-4 drops every morning on cleansed skin followed by moisturizer and SPF 50 sunscreen. Can also be applied before nighttime sleeping cream." },
      { question: "Will it oxidize or turn dark brown quickly?", answer: "No, we use 3-O-Ethyl Ascorbic Acid, the most photostable next-gen Vitamin C derivative, packaged in amber UV-filtering glass to preserve potency for 24 months." },
      { question: "Is it suitable for oily or acne-prone skin?", answer: "Absolutely. It is water-light, non-greasy, and non-comedogenic so it will not clog pores or cause breakouts." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "ceramide-barrier-cream",
        title: "LumiGlow Deep Ceramide Barrier Repair Hydrating Face Cream (50g)",
        price: 549,
        mrp: 1199,
        image: "/products/serum-dropper.jpg",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-11",
    title: "Velvet Oud & Smoked Amber Artisanal Eau De Parfum (100ml Luxury Vaporisateur)",
    slug: "velvet-oud-smoked-amber-perfume",
    category: "Beauty & Grooming",
    categoryId: "cat-beauty",
    subCategory: "Luxury Niche Fragrances",
    subCategoryId: "sub-fragrance",
    brand: "Zenvia Paris",
    price: 4500,
    discountPrice: 1799,
    mrp: 4500,
    stock: 16,
    rating: 4.9,
    numReviews: 184,
    featured: true,
    isNew: true,
    description: "An intoxicating masterwork of rare Cambodian Oud, warm smoked Amber, velvety Turkish Damask Rose, and aged Bourbon Vanilla crafted by French master perfumers.",
    details: [
      "25% Extrait De Parfum High Concentration for 14+ Hours Longevity",
      "Top Notes: Italian Bergamot, Pink Peppercorn, Cardamom",
      "Heart Notes: Smoked Turkish Damask Rose, Saffron, Frankincense",
      "Base Notes: Rare Cambodian Oud, Ambergris, Bourbon Vanilla, Cedarwood"
    ],
    images: [
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Fragrance Family": "Warm Oriental Woody / Smoked Amber",
      "Concentration": "25% Extrait De Parfum (Longest Lasting)",
      "Volume": "100ml / 3.4 fl oz",
      "Bottle Type": "Faceted Heavy Crystal with Magnetic Gold Cap",
      "Longevity": "12 to 16 Hours on Skin & Garments",
      "Gender": "Unisex (Sophisticated & Seductive)",
      "Country of Origin": "France"
    },
    aboutThisItem: [
      {
        title: "Artisanal Haute Parfumerie Formulation",
        description: "Blended in Grasse, France with certified sustainable wild-harvested resins, hand-distilled Cambodian Agarwood oud, and aged Madagascar vanilla beans."
      },
      {
        title: "Magnetic All-Day Projection & Sillage",
        description: "Engineered with 25% pure perfume oils that mature on your skin, projecting an intoxicating and warm scent trail that lingers effortlessly through day and evening."
      },
      {
        title: "Collector's Luxury Crystal Flacon",
        description: "Encased in an architectural 400g weighted glass bottle with a satisfying magnetic click cap and gold calligraphy atomiser emitting an ultra-fine micro-mist."
      }
    ],
    variants: [
      { id: "v1", name: "100ml Luxury Vaporisateur", price: 1799, mrp: 4500, image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "50ml Travel Flacon", price: 1299, mrp: 3200, image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "How long does the scent last?", answer: "Due to the 25% Extrait concentration, expect 12 to 14 hours of persistent projection on skin and up to 48 hours on coats and garments." },
      { question: "Is this perfume suitable for both men and women?", answer: "Yes, Velvet Oud is an artisanal unisex fragrance balancing delicate rose with rich smoked woods and warm vanilla." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "travel-atomizer-gold",
        title: "Pocket Refillable Aluminum Gold Travel Perfume Atomizer (5ml)",
        price: 299,
        mrp: 699,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600&auto=format&fit=crop",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-12",
    title: "AeroKnit 280 GSM Heavyweight Combed Cotton Oversized Streetwear T-Shirt",
    slug: "aeroknit-heavyweight-oversized-tee",
    category: "Fashion & Apparel",
    categoryId: "cat-fashion",
    subCategory: "Men's Streetwear & Tops",
    subCategoryId: "sub-mens-tees",
    brand: "Nike",
    price: 2299,
    discountPrice: 899,
    mrp: 2299,
    stock: 28,
    rating: 4.7,
    numReviews: 167,
    featured: true,
    isNew: true,
    description: "Architectural boxy-cut oversized streetwear t-shirt crafted from 280 GSM ultra-heavy combed cotton with a structured drop-shoulder drape and reinforced 1.25-inch crewneck collar.",
    details: [
      "280 GSM 100% Combed Compact Ring-Spun Cotton Fabric",
      "Structured Drop-Shoulder Relaxed Boxy Silhouette",
      "Heavy-Duty 1.25\" Ribbed Lycra-Spun Anti-Sag Crewneck",
      "Bio-Washed & Silicon-Softened for Zero Color Bleed or Shrinkage"
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Fabric Weight": "280 GSM Ultra-Heavyweight",
      "Material": "100% Combed Compact Ring-Spun Cotton",
      "Fit Type": "Boxy Oversized Drop-Shoulder",
      "Neckline": "Reinforced 1.25\" Anti-Sag Ribbed Crewneck",
      "Care Instructions": "Machine Wash Cold, Gentle Cycle, Dry in Shade",
      "Country of Origin": "India"
    },
    aboutThisItem: [
      {
        title: "280 GSM Heavy Architectural Drape",
        description: "Substantially weightier than standard t-shirts. The dense 280 GSM knit holds its crisp boxy silhouette on your body without clinging or creasing throughout the day."
      },
      {
        title: "Reinforced Zero-Sag Collar",
        description: "Engineered with high-recovery Lycra-infused ribbed collar that maintains its sharp circular shape through 50+ washes without bacon-neck wrinkling."
      },
      {
        title: "Bio-Washed Peach Finish",
        description: "Double enzyme washed and pre-shrunk for an ultra-soft vintage handfeel that will not shrink or lose its deep pigment in the laundry."
      }
    ],
    variants: [
      { id: "v1", name: "Raw Bone / Off-White", price: 899, mrp: 2299, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "Washed Vintage Black", price: 899, mrp: 2299, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v3", name: "Sage Earth Green", price: 949, mrp: 2399, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Is this an oversized fit or standard fit?", answer: "This is a true streetwear oversized boxy fit with dropped shoulders. Order your regular size for the relaxed look, or size down if you prefer a regular tailored fit." },
      { question: "Does the fabric shrink after washing?", answer: "No, all AeroKnit t-shirts undergo pre-shrunk steam treatment and will retain their exact dimensions." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "streetwear-cargo-pants",
        title: "AeroKnit 6-Pocket Tactical Relaxed Streetwear Cargo Pants (Black)",
        price: 1499,
        mrp: 3299,
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
        rating: 4.7
      }
    ]
  },
  {
    id: "prod-13",
    title: "AuraStudio Relaxed French Linen 2-Piece Co-ord Set (Breathable Crop Top & High-Rise Wide Leg Pant)",
    slug: "aurastudio-french-linen-2-piece-coord-set",
    category: "Fashion & Apparel",
    categoryId: "cat-fashion",
    subCategory: "Women's Trending Apparel",
    subCategoryId: "sub-womens-fashion",
    brand: "Zenvia Paris",
    price: 3999,
    discountPrice: 1899,
    mrp: 3999,
    stock: 14,
    rating: 4.8,
    numReviews: 89,
    featured: true,
    isNew: true,
    description: "Effortlessly elegant resort-wear co-ord crafted from 100% pure certified French flax linen. Features a relaxed camp-collar buttoned crop top paired with pleated high-waisted wide-leg trousers.",
    details: [
      "100% Certified Pure French Flax Linen (Pre-Washed)",
      "Breathable Thermoregulating Natural Weave for All Seasons",
      "Pleated High-Waisted Wide-Leg Fit with Elasticated Back",
      "Corozo Nut Natural Biodegradable Buttons"
    ],
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Fabric Material": "100% Pure French Flax Linen",
      "Pattern": "Solid Natural Organic Weave",
      "Fit Type": "Relaxed Resort Fit",
      "Closure Type": "Buttoned Top + Drawstring Elasticated Waistband",
      "Care Instructions": "Hand Wash or Gentle Machine Wash Cold",
      "Origin": "Crafted in Portugal"
    },
    aboutThisItem: [
      {
        title: "100% French Flax Natural Breathability",
        description: "Woven from premium long-staple Normandy flax that softens with every wash, delivering superior air circulation and cooling in warm climates."
      },
      {
        title: "Versatile Day-to-Evening Silhouette",
        description: "Wear together as a cohesive luxury resort ensemble, or style the cropped linen shirt separately with tailored denim or silk skirts."
      },
      {
        title: "Comfort Tailored Trousers",
        description: "Deep front pockets, elegant front pleats, and an elasticated rear waistband ensure a flattering, contouring fit without tightness."
      }
    ],
    variants: [
      { id: "v1", name: "Natural Flax Sand (Size S)", price: 1899, mrp: 3999, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "Natural Flax Sand (Size M)", price: 1899, mrp: 3999, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v3", name: "Sunlit Terracotta (Size M)", price: 1999, mrp: 4199, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v4", name: "Sunlit Terracotta (Size L)", price: 1999, mrp: 4199, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Is the linen fabric see-through?", answer: "No, this set uses a medium-weight 180 GSM high-density linen weave that is fully opaque while remaining breezy and breathable." },
      { question: "What is the return or exchange policy for sizing?", answer: "We offer 7-day hassle-free doorstep size exchanges on all apparel items." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "sunglasses-coord",
        title: "AuraFrame Classic Polarized Sunglasses (Tortoise Shell)",
        price: 749,
        mrp: 2699,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-14",
    title: "BeardForge Organic Cedarwood & Cold-Pressed Argan Beard Growth & Conditioning Elixir (50ml)",
    slug: "beardforge-organic-cedarwood-beard-growth-oil",
    category: "Beauty & Grooming",
    categoryId: "cat-beauty",
    subCategory: "Men's Grooming & Beard Care",
    subCategoryId: "sub-mens-grooming",
    brand: "LumiGlow",
    price: 1499,
    discountPrice: 649,
    mrp: 1499,
    stock: 22,
    rating: 4.9,
    numReviews: 142,
    featured: true,
    isNew: true,
    description: "100% natural cold-pressed beard conditioning oil infused with Atlas Cedarwood, Moroccan Argan, Golden Jojoba, and Vitamin E. Softens coarse facial hair, relieves itchiness, and stimulates dense folicular growth.",
    details: [
      "Pure Atlas Cedarwood, Jojoba & Moroccan Argan Oils",
      "Non-Greasy Fast-Absorbing Conditioning Formula",
      "Eliminates Beard Dandruff & Soothes Dry Under-Skin",
      "100% Organic, Vegan, Paraben & Silicone-Free"
    ],
    images: [
      "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Scent": "Smoky Atlas Cedarwood & Sweet Bergamot",
      "Volume": "50 Millilitres / 100 Millilitres",
      "Skin & Hair Type": "All Skin Types, Coarse Beard & Stubble",
      "Item Form": "Ultralight Non-Greasy Botanical Oil",
      "Certifications": "Cruelty-Free, 100% Vegan, ECOCERT Certified Organic",
      "Manufactured In": "Provence, France"
    },
    aboutThisItem: [
      {
        title: "Cold-Pressed Nutrient Density",
        description: "Packed with essential fatty acids (Omega 6 & 9) from Moroccan Argan and Golden Jojoba to deeply nourish hair follicles from root to tip."
      },
      {
        title: "Subtle Masculine Woody Fragrance",
        description: "Naturally scented with real cedarwood, sandalwood, and zesty bergamot essential oils without artificial synthetic perfumes."
      },
      {
        title: "Zero Beard Itch & Dandruff",
        description: "Moisturizes the sensitive skin underneath your facial hair to eradicate flaking, dryness, and scratchy stubble within 3 days of daily use."
      }
    ],
    variants: [
      { id: "v1", name: "50ml Amber Dropper Flacon", price: 649, mrp: 1499, image: "https://images.unsplash.com/photo-1621607512214-68297480165e?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "100ml Barber Reserve Edition", price: 999, mrp: 2199, image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "How many drops should I apply each day?", answer: "Dispense 3-5 drops into the palm of your hand, rub hands together, and massage evenly through your beard into the underlying skin." },
      { question: "Will it make my face look oily or greasy?", answer: "No, Golden Jojoba closely matches your skin's natural sebum, absorbing quickly in under 60 seconds with a clean satin sheen." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "beard-comb-set",
        title: "Antistatic Sandalwood Dual-Action Beard Comb & Boar Bristle Brush",
        price: 349,
        mrp: 799,
        image: "https://images.unsplash.com/photo-1621607512022-6aecc4fed814?q=80&w=600&auto=format&fit=crop",
        rating: 4.7
      }
    ]
  },
  {
    id: "prod-15",
    title: "SonicPro Studio Wireless ANC Over-Ear Headphones (40mm Graphene Drivers, 50h Playtime, Spatial Audio)",
    slug: "sonicpro-studio-wireless-anc-over-ear-headphones",
    category: "Headphones & Audio",
    categoryId: "cat-audio",
    subCategory: "Studio & Over-Ear Headphones",
    subCategoryId: "sub-headphones",
    brand: "Sony",
    price: 14999,
    discountPrice: 7999,
    mrp: 14999,
    stock: 12,
    rating: 4.9,
    numReviews: 214,
    featured: true,
    isNew: true,
    description: "Flagship audiophile closed-back wireless headphones engineered with 40mm DLC graphene drivers, hybrid 45dB Active Noise Cancellation, LDAC Hi-Res Wireless certification, and plush memory foam ear cushions.",
    details: [
      "40mm Diamond-Like Carbon (DLC) Graphene Drivers",
      "Hybrid 45dB Active Noise Cancellation with Transparency Mode",
      "Hi-Res Audio Certified & LDAC 990kbps Lossless Support",
      "50-Hour Battery Life with USB-C 10-Minute Rapid Charge for 5 Hours"
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop"
    ],
    specs: {
      "Colour": "Midnight Onyx Black",
      "Brand": "Sony",
      "Driver Size": "40mm DLC Graphene Diaphragm",
      "Frequency Response": "10Hz - 40,000Hz (Hi-Res Certified)",
      "ANC Level": "Up to -45dB Dual Hybrid Active Noise Cancellation",
      "Bluetooth Version": "Bluetooth 5.3 + Multipoint Dual Connection",
      "Battery Life": "50 Hours (ANC Off) / 38 Hours (ANC On)",
      "Weight": "248 Grams"
    },
    aboutThisItem: [
      {
        title: "Hi-Res Studio Acoustic Tuning",
        description: "Custom-tuned acoustic chambers deliver sub-bass punch, transparent mids, and crystal-clear highs up to 40kHz for an authentic soundstage experience."
      },
      {
        title: "Adaptive Hybrid ANC",
        description: "Four outward-facing beamforming microphones sample ambient noise 40,000 times per second, dynamically countering low-frequency drone on flights and commutes."
      },
      {
        title: "All-Day Cloud Comfort",
        description: "Weighs only 248g with ergonomic pressure-relieving protein leather ear cushions and a titanium alloy reinforced adjustable headband."
      }
    ],
    variants: [
      { id: "v1", name: "Midnight Onyx Black", price: 7999, mrp: 14999, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v2", name: "Platinum Lunar Silver", price: 8499, mrp: 15999, image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Can I connect to both my laptop and phone simultaneously?", answer: "Yes! Bluetooth 5.3 Multipoint lets you seamlessly switch between your laptop audio and incoming mobile calls without disconnecting." },
      { question: "Does it work in wired mode when battery is depleted?", answer: "Yes, includes a gold-plated 3.5mm auxiliary audio cable for unpowered zero-latency studio monitoring." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "headphone-stand-aluminum",
        title: "Solid CNC Aluminum Desktop Headphone Stand with Cable Organizer",
        price: 699,
        mrp: 1499,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-16",
    title: "MagVolt Ultra 10000mAh Magnetic Qi2 Wireless Fast Power Bank (15W MagSafe, 20W USB-C PD, LED Display)",
    slug: "magvolt-ultra-10000mah-magnetic-wireless-power-bank",
    category: "Electronics",
    categoryId: "cat-electronics",
    subCategory: "Next-Gen Tech Gadgets",
    subCategoryId: "sub-smart-gadgets",
    brand: "Samsung",
    price: 3499,
    discountPrice: 1799,
    mrp: 3499,
    stock: 19,
    rating: 4.7,
    numReviews: 98,
    featured: true,
    isNew: true,
    description: "Slimline 10,000mAh portable external battery pack featuring 15W Qi2 fast magnetic wireless charging, 20W bidirectional USB-C Power Delivery, and smart digital LED battery percentage readout.",
    details: [
      "10,000mAh High-Density Li-Polymer Cell (2 Full Phone Recharges)",
      "Strong N52 Neodymium Magnetic Snap (12N Holding Force)",
      "15W Qi2 Certified Fast Wireless + 20W USB-C PD Bidirectional Output",
      "Smart Digital Precision LED Display & Foldable Kickstand"
    ],
    images: [
      "/products/powerbank-magsafe.jpg",
      "/products/charger-black.jpg"
    ],
    specs: {
      "Battery Capacity": "10,000 Milliamp Hours (38.5Wh)",
      "Connector Type": "USB Type-C Bidirectional (20W PD)",
      "Wireless Output": "15W Qi2 / MagSafe Compatible",
      "Special Feature": "Integrated Foldable Kickstand & Precision Digital LED Indicator",
      "Colour": "Graphite Matte Black",
      "Weight": "185 Grams"
    },
    aboutThisItem: [
      {
        title: "Snaps Firmly with N52 Magnets",
        description: "Equipped with powerful aerospace-grade N52 neodymium magnetic array that locks securely onto iPhone 12/13/14/15/16 and Qi2 Android phones without slipping."
      },
      {
        title: "Foldable Hands-Free Zinc Kickstand",
        description: "Built-in sturdy zinc alloy fold-out kickstand props your phone upright in portrait or landscape orientation for FaceTiming and watching videos while charging."
      },
      {
        title: "Certified Safe Battery Protections",
        description: "Active multi-protect circuitry provides temperature monitoring, overcharge protection, foreign object detection (FOD), and short-circuit prevention."
      }
    ],
    variants: [
      { id: "v1", name: "Graphite Matte Black", price: 1799, mrp: 3499, image: "/products/powerbank-magsafe.jpg", inStock: true },
      { id: "v2", name: "Nordic Alpine White", price: 1899, mrp: 3599, image: "/products/charger-white.jpg", inStock: true }
    ],
    qa: [
      { question: "Will it charge through a phone case?", answer: "Yes, it works through any MagSafe or magnetic-compatible case up to 3mm thick." },
      { question: "Can I charge two devices simultaneously?", answer: "Yes! You can charge one phone wirelessly on the magnetic pad while charging another device via the 20W USB-C port." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "magvolt-60w-cable",
        title: "MagVolt 60W Braided USB-C Fast Charging Cable (1.2m)",
        price: 249,
        mrp: 699,
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=600&auto=format&fit=crop",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-17",
    title: "AuraWatch Ultra 2 GPS + Cellular AMOLED Smartwatch (49mm Titanium Case, ECG, Always-On Display)",
    slug: "aurawatch-ultra-2-smartwatch",
    category: "Smart Watches",
    categoryId: "cat-watches",
    subCategory: "AMOLED Calling Smartwatches",
    subCategoryId: "sub-smartwatches",
    brand: "Apple",
    price: 8999,
    discountPrice: 2899,
    mrp: 8999,
    stock: 25,
    rating: 4.9,
    numReviews: 156,
    featured: true,
    isNew: true,
    description: "Rugged aerospace-grade 49mm titanium smartwatch featuring dual-frequency precision GPS, Always-On 2000-nit sapphire crystal AMOLED screen, Bluetooth HD calling, 100m water resistance, and 72-hour extended battery.",
    details: [
      "Aerospace-Grade 49mm Titanium Case with Sapphire Crystal Glass",
      "2.02-inch Ultra-Bright 2000-Nit Always-On AMOLED Display",
      "Real-time Heart Rate, SpO2, Sleep Stages & Blood Oxygen Tracking",
      "Bluetooth Calling with Dual Microphones & Action Button Customization"
    ],
    images: [
      "/products/smartwatch-ultra-titanium.jpg",
      "/products/smartwatch-gold.jpg"
    ],
    specs: {
      "Case Material": "Aerospace Titanium with Ceramic Back",
      "Display": "2.02\" LTPO AMOLED (410 x 502 Pixels, 2000 Nits)",
      "Battery Life": "Up to 72 Hours in Low Power Mode",
      "Water Resistance": "100m Water & Dust Resistant (IP68)",
      "Sensors": "Optical Heart Rate, SpO2, Gyroscope, Barometric Altimeter",
      "Connectivity": "Bluetooth 5.3 + GPS GLONASS"
    },
    aboutThisItem: [
      {
        title: "Aerospace Titanium Durability",
        description: "Built for extreme adventure with a raised bezel edge that protects the flat sapphire front crystal from direct impacts."
      },
      {
        title: "2000 Nits Direct Sunlight Visibility",
        description: "Our brightest display ever ensures crystal-clear outdoor legibility under direct sunlight on hikes, runs, and open water."
      },
      {
        title: "Precision Dual-Frequency GPS",
        description: "Integrates L1 and L5 GPS frequencies plus custom antenna algorithms for pinpoint distance, pace, and route maps in dense cities."
      }
    ],
    variants: [
      { id: "v1", name: "Titanium Space Black (Alpine Loop)", price: 2899, mrp: 8999, image: "/products/smartwatch-ultra-titanium.jpg", inStock: true },
      { id: "v2", name: "Starlight Gold Edition (Ocean Band)", price: 2999, mrp: 9499, image: "/products/smartwatch-gold.jpg", inStock: true }
    ],
    qa: [
      { question: "Can I receive and answer phone calls from the watch?", answer: "Yes, built-in dual microphone with wind noise suppression and loud speaker lets you take calls directly from your wrist." },
      { question: "Is this watch compatible with Android and iOS?", answer: "Yes, it pairs seamlessly with both Android (8.0+) and iOS (13.0+) via the companion sync app." }
    ],
    frequentlyBoughtTogether: [
      {
        id: "smartwatch-replacement-strap",
        title: "Titanium Magnetic Milanese Loop Replacement Strap for 49mm Smartwatch",
        price: 399,
        mrp: 999,
        image: "/products/smartwatch-gold.jpg",
        rating: 4.8
      }
    ]
  },
  {
    id: "prod-18",
    title: "Predator Helios 16 Neo Gaming Laptop (16\" 165Hz WQXGA, Intel Core i7-14700HX, NVIDIA RTX 4070 8GB, 16GB DDR5, 1TB NVMe SSD, RGB Backlit Keyboard)",
    slug: "predator-helios-16-neo-gaming-laptop",
    category: "Laptops & PCs",
    categoryId: "cat-laptops",
    subCategory: "Gaming Rigs & PCs",
    subCategoryId: "sub-gaming-pcs",
    brand: "Predator",
    price: 189990,
    discountPrice: 144990,
    mrp: 189990,
    stock: 8,
    rating: 4.8,
    numReviews: 342,
    featured: true,
    isNew: true,
    description: "High-octane gaming beast powered by 14th Gen Intel Core i7-14700HX and NVIDIA GeForce RTX 4070 8GB GPU. Features a breathtaking 16-inch 165Hz WQXGA 100% sRGB display with 5th Gen AeroBlade 3D fan cooling technology.",
    details: [
      "14th Gen Intel Core i7-14700HX processor with 20 cores and 28 threads",
      "NVIDIA GeForce RTX 4070 with 8GB dedicated GDDR6 VRAM & DLSS 3.5 support",
      "16-inch WQXGA (2560 x 1600) IPS panel, 165Hz refresh rate, 3ms overdrive, G-SYNC",
      "Custom 4-zone RGB backlit keyboard with PredatorSense utility control"
    ],
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      "Processor": "Intel Core i7-14700HX (Up to 5.5 GHz)",
      "Graphics": "NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP)",
      "Display": "16-inch WQXGA IPS (2560x1600), 165Hz, 100% sRGB",
      "Memory & Storage": "16GB DDR5 5600MHz RAM + 1TB PCIe Gen4 NVMe SSD",
      "Operating System": "Windows 11 Home 64-bit",
      "Cooling": "Dual 5th Gen AeroBlade 3D Metal Fans + Liquid Metal Thermal Grease"
    },
    aboutThisItem: [
      {
        title: "Next-Gen Intel Hybrid Architecture",
        description: "Experience hyper-efficient multi-threaded performance whether streaming, recording, or dominating AAA games."
      },
      {
        title: "NVIDIA Ada Lovelace GPU with AI DLSS 3.5",
        description: "Harness ray-tracing realism and AI-generated frame rates for unprecedented visual immersion and latency-free esports gameplay."
      },
      {
        title: "Pro-Grade Liquid Metal Cooling",
        description: "State-of-the-art dual metal fans and vector heat pipes ensure sustained peak clock speeds without thermal throttling."
      }
    ],
    variants: [
      { id: "v-18-1", name: "Helios 16 Neo - RTX 4060 (16GB RAM / 1TB SSD)", price: 124990, mrp: 159990, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-18-2", name: "Helios 16 Neo - RTX 4070 (16GB RAM / 1TB SSD)", price: 144990, mrp: 189990, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-18-3", name: "Helios 16 Neo - RTX 4080 (32GB RAM / 2TB SSD)", price: 189990, mrp: 239990, image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Is the RAM and SSD expandable?", answer: "Yes, it has two DDR5 SO-DIMM slots supporting up to 64GB RAM and an additional M.2 NVMe PCIe Gen4 slot for storage expansion." },
      { question: "Does it come with official brand warranty?", answer: "Yes, it comes with 1 Year Onsite Manufacturer Warranty + 1 Year International Travelers Warranty." }
    ]
  },
  {
    id: "prod-19",
    title: "ErgoStand Pro 360° Rotating Aluminum Ergonomic Laptop Riser & Cooling Stand (Dual-Axis Height & Angle Adjustable, Anti-Slip Silicone, Fits 10\" to 17.3\" MacBooks & Laptops)",
    slug: "ergostand-pro-360-aluminum-laptop-riser",
    category: "Laptops & PCs",
    categoryId: "cat-laptops",
    subCategory: "Laptop Sleeves & Stands",
    subCategoryId: "sub-laptop-acc",
    brand: "ErgoStand",
    price: 3499,
    discountPrice: 1499,
    mrp: 3499,
    stock: 45,
    rating: 4.7,
    numReviews: 819,
    featured: false,
    isNew: true,
    description: "Premium CNC-machined aerospace aluminum laptop riser featuring a smooth 360-degree silent swivel turntable base. Dual-hinge stepless angle adjustment elevates your screen to perfect eye level to eliminate neck fatigue.",
    details: [
      "Precision CNC anodized aluminum alloy construction holding up to 10 kg weight",
      "360-degree rotating turntable base with tactile click mechanism for seamless collaboration",
      "Open hollow ventilation cutout allows rapid laptop heat dissipation and airflow",
      "Full coverage anti-scratch silicone padding protects your laptop and workspace surface"
    ],
    images: [
      "/products/laptop-stand-riser.jpg",
      "/products/laptop-stand-angle.jpg"
    ],
    specs: {
      "Material": "Aerospace CNC Anodized Aluminum Alloy",
      "Adjustability": "360° Rotation + Stepless Dual-Axis Height (Up to 30cm)",
      "Compatibility": "All Laptops from 10 to 17.3 inches (MacBook Pro/Air, Dell, HP, Lenovo)",
      "Max Load Capacity": "10 kg (22 lbs)",
      "Product Weight": "890 Grams"
    },
    aboutThisItem: [
      {
        title: "360° Swivel Turntable Base",
        description: "Effortlessly turn and share your display with team members in meetings without shifting the stand from your desk."
      },
      {
        title: "Relieve Spine & Neck Pressure",
        description: "Elevate your laptop screen to natural ergonomic eye-level posture to prevent chronic neck, shoulder, and back strain."
      },
      {
        title: "Superior Heat Dissipation",
        description: "Hollow carved aluminum plate maximizes airflow directly beneath laptop cooling fans for optimal thermal performance."
      }
    ],
    variants: [
      { id: "v-19-1", name: "Space Grey (Anodized Matte)", price: 1499, mrp: 3499, image: "/products/laptop-stand-riser.jpg", inStock: true },
      { id: "v-19-2", name: "Silver Chrome (Brushed Aluminum)", price: 1499, mrp: 3499, image: "/products/laptop-stand-angle.jpg", inStock: true },
      { id: "v-19-3", name: "Obsidian Black (Stealth Finish)", price: 1699, mrp: 3799, image: "/products/laptop-stand-riser.jpg", inStock: true }
    ],
    qa: [
      { question: "Can I type directly on the laptop while mounted?", answer: "While the dual hinges are heavy-duty, using an external keyboard and mouse is ergonomically recommended for long work sessions." },
      { question: "Does it fold completely flat for travel?", answer: "Yes, it folds down compactly into a slim profile that fits inside any standard laptop backpack." }
    ]
  },
  {
    id: "prod-20",
    title: "PulseBand Pro Health & Fitness Tracker Band (1.47\" Vivid AMOLED Curved Screen, 24/7 Continuous Heart Rate & SpO2 Blood Oxygen, 14-Day Battery, 5ATM Waterproof, 120 Sports Modes)",
    slug: "pulseband-pro-amoled-fitness-tracker",
    category: "Smart Watches",
    categoryId: "cat-watches",
    subCategory: "Fitness & Health Trackers",
    subCategoryId: "sub-fitness-trackers",
    brand: "Trackline",
    price: 5499,
    discountPrice: 2199,
    mrp: 5499,
    stock: 32,
    rating: 4.6,
    numReviews: 1420,
    featured: true,
    isNew: true,
    description: "Sleek and featherlight smart health tracker featuring an edge-to-edge 1.47-inch curved AMOLED display. Packed with 24/7 PPG biological sensors for heart rate, SpO2 blood oxygen, stress levels, REM sleep analysis, and 5ATM water resistance.",
    details: [
      "1.47-inch Curved AMOLED Full-Touch Color Screen with 2.5D curved glass",
      "Real-time 24/7 PPG Bio-Tracker for continuous Heart Rate and SpO2 monitoring",
      "Ultra-long 14-day battery life on a single 45-minute magnetic fast charge",
      "5ATM (50 meters) water resistance for swimming, surfing, and high-intensity workouts"
    ],
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      "Display": "1.47-inch HD AMOLED (194 x 368 Pixels, 282 PPI)",
      "Battery Life": "Up to 14 Days Typical Use, 9 Days Heavy Use",
      "Water Resistance": "5ATM (Up to 50 Meters)",
      "Sensors": "6-Axis IMU (Accelerometer & Gyroscope), Optical Heart Rate Sensor",
      "Weight": "16 Grams (Without Strap)"
    },
    aboutThisItem: [
      {
        title: "All-Day Proactive Health Metrics",
        description: "Get smart vibration alerts if your heart rate spikes or drops unexpectedly, or if your blood oxygen saturation dips below safe levels."
      },
      {
        title: "Precision Scientific Sleep Tracker",
        description: "Accurately monitors deep sleep, light sleep, REM stages, and wakeful intervals, offering personalized tips to optimize sleep hygiene."
      },
      {
        title: "120+ Dedicated Sport Modes",
        description: "From indoor running and cycling to swimming and HIIT workouts, tracks calories burned, active duration, and heart rate zones."
      }
    ],
    variants: [
      { id: "v-20-1", name: "Midnight Black Band", price: 2199, mrp: 5499, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-20-2", name: "Navy Blue Sport Band", price: 2199, mrp: 5499, image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-20-3", name: "Coral Sunrise Silicon Band", price: 2299, mrp: 5699, image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Can I swim wearing this tracker?", answer: "Yes! With 5ATM waterproof certification, it is fully safe for swimming in pools and open water." },
      { question: "Does it show smartphone notifications?", answer: "Yes, it displays incoming call alerts, WhatsApp messages, SMS, and app notifications directly on the screen." }
    ]
  },
  {
    id: "prod-21",
    title: "AuraStrap Premium Milanese Magnetic Mesh Loop & Rugged Alpine Weave Straps (Twin Pack, 316L Stainless Steel & Breathable Nylon, Universal Quick Release 20mm/22mm)",
    slug: "aurastrap-milanese-magnetic-alpine-strap-set",
    category: "Smart Watches",
    categoryId: "cat-watches",
    subCategory: "Replacement Bands & Straps",
    subCategoryId: "sub-watch-straps",
    brand: "Trackline",
    price: 2499,
    discountPrice: 899,
    mrp: 2499,
    stock: 60,
    rating: 4.7,
    numReviews: 488,
    featured: false,
    isNew: true,
    description: "Versatile twin-pack smart watch bands including an elegant 316L stainless steel magnetic Milanese loop for formal wear and an ultra-tough double-layer nylon Alpine loop with corrosion-resistant titanium G-hook for outdoor workouts.",
    details: [
      "Twin Pack Value: 1x Milanese Stainless Steel Loop + 1x Rugged Nylon Alpine Loop",
      "Infinitely adjustable strong magnetic buckle clasp provides a snug and customized fit",
      "Breathable, sweat-resistant, and skin-friendly woven nylon fabric prevents chafing",
      "Standard tool-free quick-release spring pins compatible with 20mm & 22mm smartwatches"
    ],
    images: [
      "/products/watch-straps-milanese.jpg",
      "/products/smartwatch-ultra-titanium.jpg"
    ],
    specs: {
      "Materials": "316L Surgical Stainless Steel + High-Tenacity Dual-Woven Nylon",
      "Compatibility": "Universal 20mm / 22mm Quick-Release Lug Smartwatches",
      "Clasp Type": "N52 Neodymium Magnetic Clasp & Titanium G-Hook",
      "Wrist Size Fit": "140mm to 220mm (5.5\" to 8.7\" Wrist Width)"
    },
    aboutThisItem: [
      {
        title: "Two Styles for Every Occasion",
        description: "Switch seamlessly from business elegance with the polished stainless steel Milanese loop to rugged mountain workouts with the Alpine loop."
      },
      {
        title: "Infinitely Adjustable Secure Fit",
        description: "Micro-adjust without tool pins: strong magnetic closure snaps shut securely and stays locked throughout daily activity."
      },
      {
        title: "Tool-Free 5-Second Installation",
        description: "Integrated quick-release spring bars let you swap bands in seconds without any special screwdrivers or tools."
      }
    ],
    variants: [
      { id: "v-21-1", name: "Space Grey Milanese + Orange Alpine (22mm)", price: 899, mrp: 2499, image: "/products/watch-straps-milanese.jpg", inStock: true },
      { id: "v-21-2", name: "Silver Stainless Milanese + Starlight Nylon (20mm)", price: 899, mrp: 2499, image: "/products/watch-straps-milanese.jpg", inStock: true },
      { id: "v-21-3", name: "Matte Black Magnetic + Army Olive Loop (22mm)", price: 999, mrp: 2699, image: "/products/watch-straps-milanese.jpg", inStock: true }
    ],
    qa: [
      { question: "Will this fit Samsung Galaxy Watch, Noise, or Fire-Boltt?", answer: "Yes, it fits any smartwatch with standard 20mm or 22mm lug width quick-release pin mounts." }
    ]
  },
  {
    id: "prod-22",
    title: "UrbanGlide Retro Low-Top Leather Casual Sneakers (Cushioned Cloud EVA Insole, Supple Vegan Nappa Leather, Durable Gum Rubber Grip Sole, Everyday Classic Street Edition)",
    slug: "urbanglide-retro-leather-casual-sneakers",
    category: "Footwear & Kicks",
    categoryId: "cat-footwear",
    subCategory: "Urban Lifestyle Sneakers",
    subCategoryId: "sub-casual-kicks",
    brand: "Nike",
    price: 5999,
    discountPrice: 2499,
    mrp: 5999,
    stock: 28,
    rating: 4.7,
    numReviews: 760,
    featured: true,
    isNew: true,
    description: "Timeless court-inspired low-top sneakers tailored for modern urban streetwear. Crafted from supple micro-textured vegan Nappa leather with a supportive dual-density Cloud EVA memory insole and vintage gum rubber vulcanized outsole.",
    details: [
      "Premium water-resistant vegan Nappa leather upper with perforated toe box ventilation",
      "Ergonomic Cloud EVA memory foam arch-support insole for all-day walking comfort",
      "High-grip non-marking vulcanized gum rubber sole with retro herringbone tread",
      "Reinforced double-stitched eyelets with premium waxed flat cotton laces"
    ],
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      "Upper Material": "Hydrophobic Premium Vegan Nappa Leather",
      "Insole": "Removable CloudFoam High-Rebound Memory Foam",
      "Outsole": "Vulcanized Anti-Skid Gum Rubber",
      "Closure": "Waxed Cotton Lace-up",
      "Toe Style": "Reinforced Round Perforated Toe"
    },
    aboutThisItem: [
      {
        title: "All-Day Cloud Comfort",
        description: "Engineered memory foam footbed cushions each stride, preventing foot fatigue during long commute days and city walks."
      },
      {
        title: "Effortless Versatile Styling",
        description: "Clean minimalist silhouette pairs seamlessly with cropped chinos, relaxed denims, shorts, and casual blazers."
      },
      {
        title: "Easy Wipe-Clean Maintenance",
        description: "Stain-resistant smooth leather surface repels splashes and can be cleaned effortlessly with a damp cloth."
      }
    ],
    variants: [
      { id: "v-22-1", name: "Vintage Chalk White & Gum (UK 8)", price: 2499, mrp: 5999, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-22-2", name: "Monochrome Triple Black (UK 9)", price: 2499, mrp: 5999, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-22-3", name: "Retro Navy & Off-White (UK 10)", price: 2699, mrp: 6299, image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Is the sizing true to standard Indian/UK sizes?", answer: "Yes, it follows standard UK/India sizing. If you have broad feet, we recommend ordering one size up." }
    ]
  },
  {
    id: "prod-23",
    title: "ecofynd Heavy-Duty Metal Wall Trellis & Hanging Planter Rack (Rust-Resistant Galvanized Steel Lattice Grid for Climbing Vines, Flowers & Balcony Herb Walls, 4-Pack with Mounting Kit)",
    slug: "ecofynd-metal-wall-trellis-planter-rack",
    category: "Home & Living",
    categoryId: "cat-home",
    subCategory: "Trellises & Wall Racks",
    subCategoryId: "sub-garden-trellis",
    brand: "ecofynd",
    price: 2999,
    discountPrice: 1299,
    mrp: 2999,
    stock: 18,
    rating: 4.6,
    numReviews: 310,
    featured: false,
    isNew: true,
    description: "Architectural vertical garden solution featuring four sturdy metal wall trellis panels. Crafted with heavy-gauge galvanized iron wire coated in weather-resistant electrostatic epoxy finish to support climbing rose, ivy, pothos, and flowering vines.",
    details: [
      "Pack of 4 interlocking heavy-gauge galvanized steel trellis panels (50cm x 30cm each)",
      "Multi-layer rust-proof matte powder coating designed for harsh outdoor rain and sunlight",
      "Includes complete wall mounting hardware kit (screws, wall plugs, and S-hooks)",
      "Supports climbing plants, vertical hanging herb pots, and decorative fairy string lights"
    ],
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      "Material": "Heavy-Duty Galvanized Iron with Anti-Rust Epoxy Powder Coat",
      "Panel Dimensions": "50 cm Height x 30 cm Width (Each Panel)",
      "Total Coverage": "Approx. 1.2 sq. meters when mounted together",
      "Included Accessories": "8x Heavy-Duty Wall Anchors & 8x S-Hooks for Hanging Pots",
      "Colour": "Matte Satin Black"
    },
    aboutThisItem: [
      {
        title: "Maximize Vertical Balcony Space",
        description: "Transform plain concrete balcony walls into lush vertical green sanctuaries without sacrificing floor space."
      },
      {
        title: "Heavy-Duty Vine Support",
        description: "Rigid welded wire lattice holds the full weight of mature flowering vines, vegetables, and hanging ceramic pots."
      },
      {
        title: "Weatherproof 10-Year Anti-Rust Coating",
        description: "Electrostatic baked coating repels moisture, oxidation, and direct UV discoloration year after year."
      }
    ],
    variants: [
      { id: "v-23-1", name: "Powder Coated Matte Black (Set of 4)", price: 1299, mrp: 2999, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-23-2", name: "Rustic Cream White (Set of 4)", price: 1299, mrp: 2999, image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Can it be installed on brick and drywall?", answer: "Yes, the included universal rawl plugs and stainless screws easily install into concrete, brick, tile, and wood walls." }
    ]
  },
  {
    id: "prod-24",
    title: "Nordic Minimalist Geometric Ceramic Planter Pots with Natural Bamboo Drainage Trays (Handcrafted Matte Glaze Indoor Succulent & Foliage Planters, Set of 3)",
    slug: "nordic-geometric-ceramic-planter-pots-set-of-3",
    category: "Home & Living",
    categoryId: "cat-home",
    subCategory: "Planters & Modern Decor",
    subCategoryId: "sub-home-decor",
    brand: "ecofynd",
    price: 2699,
    discountPrice: 1199,
    mrp: 2699,
    stock: 24,
    rating: 4.8,
    numReviews: 524,
    featured: true,
    isNew: true,
    description: "Contemporary Scandinavian ceramic planter trio crafted from high-temperature porcelain clay with subtle geometric facets. Features integrated bottom drainage holes and natural oiled bamboo catchment saucers to protect tabletops.",
    details: [
      "Set of 3 graduating size ceramic pots (Small 3.5\", Medium 5\", Large 6.5\")",
      "Premium high-fired porcelain clay with durable non-porous silky matte glaze",
      "Bottom drainage hole on each planter prevents overwatering and root rot",
      "Eco-friendly natural oiled bamboo water catchment saucers included"
    ],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop"
    ],
    specs: {
      "Material": "High-Fired Porcelain Ceramic & Natural Bamboo",
      "Finish": "Silky Matte Glaze",
      "Sizes Included": "Small (9cm dia), Medium (12.5cm dia), Large (16.5cm dia)",
      "Drainage": "Center Bottom Hole with Mesh Screen & Bamboo Tray",
      "Ideal Plants": "Snake Plants, Monsteras, Succulents, Herbs, Peace Lilies"
    },
    aboutThisItem: [
      {
        title: "Scandinavian Aesthetic Elegance",
        description: "Clean geometric lines and subtle earthy tones elevate living room coffee tables, office desks, and windowsill aesthetics."
      },
      {
        title: "Promotes Healthy Root Growth",
        description: "Breathable stoneware clay and efficient bottom drainage prevent waterlogging and fungal root decay."
      },
      {
        title: "Stain-Free Furniture Protection",
        description: "Natural bamboo saucers catch excess water runoff, keeping polished wooden and marble tables pristine."
      }
    ],
    variants: [
      { id: "v-24-1", name: "Nordic White Glaze (3-Piece Trio)", price: 1199, mrp: 2699, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-24-2", name: "Terracotta Warm Clay (3-Piece Trio)", price: 1199, mrp: 2699, image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&auto=format&fit=crop", inStock: true },
      { id: "v-24-3", name: "Charcoal Slate Matte (3-Piece Trio)", price: 1299, mrp: 2899, image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop", inStock: true }
    ],
    qa: [
      { question: "Are plants included with the pots?", answer: "No, this set includes the 3 handcrafted ceramic pots and 3 matching bamboo trays. Plants are shown for styling inspiration." }
    ]
  },
  {
    id: "prod-25",
    title: "AuraBotanics 100% Pure Moroccan Cold-Pressed Argan & Rosemary Scalp Revitalizing Oil (Organic Hair Strengthening, Frizz-Control & Root Stimulation Elixir with Dropper, 100ml)",
    slug: "aurabotanics-pure-argan-rosemary-hair-oil-100ml",
    category: "Beauty & Grooming",
    categoryId: "cat-beauty",
    subCategory: "Hair Nourishment & Oils",
    subCategoryId: "sub-haircare",
    brand: "LumiGlow",
    price: 1599,
    discountPrice: 699,
    mrp: 1599,
    stock: 40,
    rating: 4.9,
    numReviews: 680,
    featured: true,
    isNew: true,
    description: "Therapeutic cold-pressed elixir blending 100% pure organic Moroccan Argan Oil, Rosemary essential extract, Golden Jojoba, and Vitamin E. Formulated to stimulate scalp micro-circulation, strengthen hair follicles, seal split ends, and impart glossy mirror shine.",
    details: [
      "100% USDA Organic certified cold-pressed Moroccan Argan and Rosemary leaf extract",
      "Stimulates dormant hair follicles and boosts root micro-circulation for thicker hair",
      "Tames unruly frizz and repairs environmental heat damage without greasy heaviness",
      "Free of mineral oils, parabens, silicones, sulfates, and synthetic fragrances"
    ],
    images: [
      "/products/hair-oil-dropper.jpg",
      "/products/serum-30ml.jpg"
    ],
    specs: {
      "Key Ingredients": "Cold-Pressed Moroccan Argan Kernel Oil, Rosemary Leaf Oil, Jojoba Seed Oil, Vitamin E",
      "Volume": "100 ml (3.4 fl oz)",
      "Formulation": "Lightweight Fast-Absorbing Botanical Elixir",
      "Suitable Hair Types": "All Hair Types (Dry, Damaged, Curly, Chemically Treated, Frizzy)",
      "Packaging": "UV-Protective Amber Glass Bottle with Precision Glass Dropper"
    },
    aboutThisItem: [
      {
        title: "Clinically Proven Scalp Stimulation",
        description: "Rosmarinic acid stimulates micro-capillaries at the hair root to nourish follicles and reduce excess shedding."
      },
      {
        title: "Weightless Silk & Frizz Control",
        description: "Rich in essential Omega-6 and Omega-9 fatty acids that seal cuticles, leaving strands silky smooth with radiant shine."
      },
      {
        title: "Multi-Use Nourishing Ritual",
        description: "Use as an overnight deep conditioning scalp treatment, a pre-wash hair bath, or a leave-in finishing serum for split ends."
      }
    ],
    variants: [
      { id: "v-25-1", name: "Standard Dropper Bottle (100ml)", price: 699, mrp: 1599, image: "/products/hair-oil-dropper.jpg", inStock: true },
      { id: "v-25-2", name: "Family Value Twin Pack (2 x 100ml)", price: 1199, mrp: 2999, image: "/products/hair-oil-dropper.jpg", inStock: true }
    ],
    qa: [
      { question: "How often should I apply this oil?", answer: "For best results, massage 4-6 drops into the scalp 2 to 3 times a week, leaving on for at least 1 hour or overnight before washing." },
      { question: "Can men use it for beard nourishment?", answer: "Yes! The lightweight Argan and Rosemary blend works wonders for softening beard hair and calming itchy dry skin underneath." }
    ]
  }
];

export const CUSTOMERS: CustomerItem[] = [
  { id: "cust-1", name: "Manasvi Paliwal", email: "manasvi@example.com", ordersCount: 5, totalSpent: 18450, tier: "VIP Collector", joinedDate: "2024-01-15" },
  { id: "cust-2", name: "Aarav Sharma", email: "aarav@example.com", ordersCount: 3, totalSpent: 9200, tier: "Gold Client", joinedDate: "2024-03-22" },
  { id: "cust-3", name: "Pooja Verma", email: "pooja@example.com", ordersCount: 2, totalSpent: 4500, tier: "Silver Client", joinedDate: "2024-05-10" },
  { id: "cust-4", name: "Rohan Gupta", email: "rohan@example.com", ordersCount: 7, totalSpent: 28900, tier: "VIP Collector", joinedDate: "2023-11-04" },
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
        title: "Trackline Sport Edition AMOLED Smart Watch",
        price: 1299,
        quantity: 1,
        image: "/products/smartwatch-black.jpg"
      }
    ]
  },
  {
    id: "ORD-98232",
    customerName: "Julian Sterling",
    customerEmail: "j.sterling@heritage.com",
    shippingAddress: "42 Sloane Street, Belgravia, London SW1X 9LU",
    totalAmount: 3199,
    status: "SHIPPED",
    paymentStatus: "PAID",
    createdAt: "2026-08-05T09:15:00.000Z",
    items: [
      {
        title: "ecofynd Ryder Plant Stands 3 Tier (Black)",
        price: 3199,
        quantity: 1,
        image: "/products/ecofynd-stand-1.jpg"
      }
    ]
  }
];

export const ACTIVITY_LOGS: ActivityLogItem[] = [
  { id: "log-1", action: "Catalog: Added ecofynd Ryder Plant Stand 3-Tier", adminName: "Admin", timestamp: "2026-09-26 12:45:00", type: "CREATE" },
  { id: "log-2", action: "Inventory: Updated stock levels for StreamAir Pro", adminName: "Admin", timestamp: "2026-09-26 11:20:14", type: "UPDATE" },
  { id: "log-3", action: "Order #ORD-98232 marked as SHIPPED", adminName: "System", timestamp: "2026-09-26 09:30:22", type: "UPDATE" },
  { id: "log-4", action: "Admin authenticated via secure token", adminName: "SecurityBot", timestamp: "2026-09-26 08:00:00", type: "AUTH" },
];

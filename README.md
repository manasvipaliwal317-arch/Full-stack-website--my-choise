# 🛍️ MY CHOISE — Full-Stack Luxury E-Commerce Website

A production-ready, full-stack luxury E-Commerce application built using **Next.js 15 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Prisma ORM**, and **Neon PostgreSQL**.

Designed with modern glassmorphism aesthetics, dark mode hues, gold text gradients, and white-glove concierge features for high-end boutique e-commerce.

---

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React
- **Database & ORM**: Prisma ORM, Neon PostgreSQL (`@neondatabase/serverless`)
- **Backend Logic**: Next.js 15 Route Handlers & Server Actions (Zero Express.js)
- **Authentication**: JWT tokens with HTTP-only cookies (`jose`, `bcryptjs`)
- **SEO & Performance**: Dynamic `sitemap.xml`, `robots.txt`, Next.js `Image` optimization, Glassmorphism Toast notifications
- **Deployment Target**: Netlify (`@netlify/plugin-nextjs`)

---

## 📁 Repository Structure

```text
├── prisma/
│   ├── schema.prisma       # 13 Complete models (User, Product, Order, Category, etc.)
│   └── seed.js             # Database seeding script
├── src/
│   ├── app/
│   │   ├── (Storefront)    # /, /shop, /products/[id], /categories, /search, /cart, /checkout...
│   │   ├── admin/          # Executive Admin Suite (/admin, /admin/products, /admin/orders...)
│   │   ├── api/            # Next.js 15 Route Handlers (/api/products, /api/orders, /api/auth)
│   │   ├── actions/        # Server Actions (ecommerce.ts)
│   │   ├── sitemap.ts      # Dynamic XML Sitemap generator
│   │   └── robots.ts       # Crawler instructions
│   ├── components/         # Reusable luxury UI components (Navbar, CartDrawer, InvoiceModal...)
│   ├── context/            # Shopping Cart & Toast notifications context
│   └── lib/                # Prisma client singleton, JWT auth helpers, data fallbacks
├── netlify.toml            # Netlify deployment configuration
├── package.json
└── README.md
```

---

## 🔑 Environment Variables Setup

Create a `.env` or `.env.local` file in the root directory:

```env
# Neon PostgreSQL Connection URL
DATABASE_URL="postgresql://user:password@ep-sample-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT Secret for Session Authentication
JWT_SECRET="my_choise_super_secret_jwt_key_2026_production"

# Canonical Public Web URL
NEXT_PUBLIC_APP_URL="https://my-choise.netlify.app"
```

---

## 💻 Local Development Guide

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

3. **Push Schema to Neon Database**:
   ```bash
   npx prisma db push
   ```

4. **Seed Database**:
   ```bash
   npm run prisma:seed
   ```

5. **Start Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Netlify Deployment Steps

1. Push your code to your GitHub/GitLab repository.
2. Log into **Netlify** and click **Import from Git**.
3. Netlify will automatically detect `netlify.toml` settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
   - **Plugin**: `@netlify/plugin-nextjs`
4. Add environment variables (`DATABASE_URL`, `JWT_SECRET`) in Netlify **Site Configuration → Environment Variables**.
5. Click **Deploy Site**. Netlify will automatically build the Next.js 15 App Router application with full Server Actions & Route Handlers support.

---

## 🛡️ License

Crafted for full-stack luxury e-commerce excellence.

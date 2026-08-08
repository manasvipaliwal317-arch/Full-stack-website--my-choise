"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  ShoppingBag,
  Users,
  Ticket,
  Image as ImageIcon,
  Star,
  Boxes,
  Settings,
  ShieldAlert,
  UserCheck,
  KeyRound,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Bell
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on admin login page, omit sidebar wrapper
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Executive Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products CRUD", href: "/admin/products", icon: Package },
    { name: "Categories CRUD", href: "/admin/categories", icon: FolderTree },
    { name: "Brands CRUD", href: "/admin/brands", icon: Tag },
    { name: "Orders Management", href: "/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Coupons Engine", href: "/admin/coupons", icon: Ticket },
    { name: "Promotional Banners", href: "/admin/banners", icon: ImageIcon },
    { name: "Reviews Moderation", href: "/admin/reviews", icon: Star },
    { name: "Inventory Stock", href: "/admin/inventory", icon: Boxes },
    { name: "Store Settings", href: "/admin/settings", icon: Settings },
    { name: "System Activity Logs", href: "/admin/activity-logs", icon: ShieldAlert },
    { name: "Executive Profile", href: "/admin/profile", icon: UserCheck },
    { name: "Change Password", href: "/admin/change-password", icon: KeyRound },
  ];

  return (
    <div className="min-h-screen bg-[#07080C] text-zinc-100 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0D0F17] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-luxury-gold text-black font-serif font-bold flex items-center justify-center text-sm">
            A
          </div>
          <span className="font-serif font-bold text-white tracking-widest text-sm">ADMIN SUITE</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-zinc-400">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden md:block"
        } w-full md:w-64 bg-[#0A0B10] border-r border-white/10 p-5 shrink-0 flex flex-col justify-between space-y-6 z-30`}
      >
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-luxury-gold-dark via-luxury-gold to-luxury-gold-light text-black font-serif font-bold flex items-center justify-center text-base shadow-lg shadow-luxury-gold/20">
              Z
            </div>
            <div>
              <h2 className="font-serif font-bold text-white tracking-widest text-sm">ZENVIA EXECUTIVE</h2>
              <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-bold block -mt-0.5">
                Master Control Suite
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 overflow-y-auto max-h-[70vh] pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30 shadow-md"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-luxury-gold" : "text-zinc-400"}`} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-luxury-gold" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-luxury-gold/20 border border-luxury-gold/40 text-luxury-gold font-bold flex items-center justify-center text-xs">
              EA
            </div>
            <div className="flex-1 overflow-hidden">
              <h4 className="text-xs font-bold text-white truncate">Executive Admin</h4>
              <span className="text-[10px] text-emerald-400 block truncate">Root Access Active</span>
            </div>
          </div>

          <Link
            href="/"
            className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" /> Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {children}
      </main>
    </div>
  );
}

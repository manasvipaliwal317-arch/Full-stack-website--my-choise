"use client";

import React from "react";

export function SkeletonProductCard() {
  return (
    <div className="rounded-2xl glass-card border border-white/10 p-5 space-y-4 animate-pulse">
      <div className="w-full aspect-[4/5] rounded-xl bg-zinc-800/60" />
      <div className="space-y-2">
        <div className="w-1/3 h-3 bg-zinc-800 rounded" />
        <div className="w-3/4 h-5 bg-zinc-800 rounded" />
        <div className="w-full h-3 bg-zinc-800 rounded" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="w-1/3 h-6 bg-zinc-800 rounded" />
        <div className="w-9 h-9 bg-zinc-800 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(count)].map((_, i) => (
        <SkeletonProductCard key={i} />
      ))}
    </div>
  );
}

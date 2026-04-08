"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "../../lib/products";
import ProductCard from "../../components/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") || "all";

  const filtered =
    activeSlug === "all"
      ? PRODUCTS
      : PRODUCTS.filter(
        (p) => p.category.toLowerCase() === activeSlug.toLowerCase()
      );

  const activeCategory = CATEGORIES.find((c) => c.slug === activeSlug);

  return (
    <main className="bg-white min-h-screen pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-dm text-[0.72rem] text-[#aaa] tracking-wide mb-10">
          <Link href="/" className="hover:text-[#555] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#555]">
            {activeCategory ? activeCategory.name : "All Products"}
          </span>
        </nav>

        {/* Heading */}
        <p className="font-dm text-[10px] text-center tracking-[1em] font-bold text-black uppercase mb-6">
          {activeCategory ? "Category" : "Shop"}
        </p>
        <h1 className="font-playfair text-[2.2rem] md:text-[3rem] font-semibold text-[#1a1a1a] text-center leading-tight mb-4 tracking-tight">
          {activeCategory ? activeCategory.name : "All Products"}
        </h1>
        {activeCategory && (
          <p className="font-dm text-[0.82rem] text-[#999] text-center max-w-[400px] mx-auto leading-relaxed mb-6">
            {activeCategory.tagline}
          </p>
        )}

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          <Link
            href="/products"
            className={`px-5 py-2 rounded-full font-dm text-[0.78rem] font-medium tracking-wide border transition-all duration-200
              ${activeSlug === "all"
                ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                : "bg-white text-[#666] border-[#e8e4de] hover:border-[#1a1a1a]"
              }`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`px-5 py-2 rounded-full font-dm text-[0.78rem] font-medium tracking-wide border transition-all duration-200
                ${activeSlug === cat.slug
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-white text-[#666] border-[#e8e4de] hover:border-[#1a1a1a]"
                }`}
            >
              {cat.name}
              <span className="ml-1.5 text-[0.65rem] opacity-60">
                {cat.count}
              </span>
            </Link>
          ))}
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-playfair text-[1.2rem] text-[#999]">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-dm text-[#999]">Loading...</p>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

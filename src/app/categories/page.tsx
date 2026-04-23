"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchCategories,
  type Product,
  type Category,
} from "../../utils/supabase/supabase-queries";
import ProductCard from "../../components/card/ProductCard";

function ProductSkeleton() {
  return (
    <div
      className="w-full bg-white rounded-2xl overflow-hidden animate-pulse"
      style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}
    >
      <div className="h-[300px] md:h-[320px] bg-[#f0ede8]" />
      <div className="px-4 py-4 flex items-end justify-between gap-3">
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-[#e8e4de] rounded w-3/4" />
          <div className="h-2.5 bg-[#e8e4de] rounded w-1/2" />
          <div className="h-3 bg-[#e8e4de] rounded w-1/3 mt-2" />
        </div>
        <div className="w-9 h-9 rounded-full bg-[#e8e4de] shrink-0" />
      </div>
    </div>
  );
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories once
  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  // Re-fetch products when category filter changes
  useEffect(() => {
    setLoading(true);
    const fetcher =
      activeSlug === "all"
        ? fetchProducts()
        : fetchProductsByCategory(activeSlug);
    fetcher.then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [activeSlug]);

  const activeCategory = categories.find((c) => c.slug === activeSlug);

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
            href="/categories"
            className={`px-5 py-2 rounded-full font-dm text-[0.78rem] font-medium tracking-wide border transition-all duration-200
              ${activeSlug === "all"
                ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                : "bg-white text-[#666] border-[#e8e4de] hover:border-[#1a1a1a]"
              }`}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories?category=${cat.slug}`}
              className={`px-5 py-2 rounded-full font-dm text-[0.78rem] font-medium tracking-wide border transition-all duration-200
                ${activeSlug === cat.slug
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-white text-[#666] border-[#e8e4de] hover:border-[#1a1a1a]"
                }`}
            >
              {cat.name}
              {cat.count !== undefined && (
                <span className="ml-1.5 text-[0.65rem] opacity-60">{cat.count}</span>
              )}
            </Link>
          ))}
        </div>

        {/* Product grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((product) => (
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
          <p className="font-dm text-[#999]">Loading…</p>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

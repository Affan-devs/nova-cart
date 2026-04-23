"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/src/components/cart/cartStore";
import {
  fetchProductById,
  fetchRelatedProducts,
  type Product,
} from "@/src/utils/supabase/supabase-queries";
import ProductCard from "@/src/components/card/ProductCard";

/* ── Skeleton loaders ── */
function DetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start animate-pulse">
      {/* Left */}
      <div className="flex flex-col gap-4">
        <div className="aspect-[4/5] rounded-2xl bg-[#f0ede8]" />
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex-1 aspect-square rounded-xl bg-[#e8e4de]" />
          ))}
        </div>
      </div>
      {/* Right */}
      <div className="md:pt-6 space-y-4">
        <div className="h-3 bg-[#e8e4de] rounded w-1/4" />
        <div className="h-8 bg-[#e8e4de] rounded w-3/4" />
        <div className="h-4 bg-[#e8e4de] rounded w-1/2" />
        <div className="h-10 bg-[#e8e4de] rounded w-1/3 mt-4" />
        <div className="h-px bg-[#f0ede8] my-6" />
        <div className="space-y-2">
          <div className="h-3 bg-[#e8e4de] rounded w-full" />
          <div className="h-3 bg-[#e8e4de] rounded w-5/6" />
          <div className="h-3 bg-[#e8e4de] rounded w-4/6" />
        </div>
        <div className="h-14 bg-[#e8e4de] rounded-full mt-8" />
        <div className="h-14 bg-[#e8e4de] rounded-full" />
      </div>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  // Fetch product by id from Supabase
  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    fetchProductById(id).then((p) => {
      setProduct(p);
      setLoading(false);
      if (p) {
        fetchRelatedProducts(p.id, p.category, 4).then(setRelated);
      }
    });
  }, [id]);

  // Auto-cycle images every 3 s
  useEffect(() => {
    if (!product?.images?.length) return;
    const interval = setInterval(
      () => setActiveImg((prev) => (prev + 1) % product.images.length),
      3000
    );
    return () => clearInterval(interval);
  }, [product]);

  const handleAdd = () => {
    if (!product) return;
    addToCart({
      id: product.id as unknown as number, // cart store uses number; cast for compat
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!loading && !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-playfair text-[1.3rem] text-[#999]">
          Product not found.
        </p>
        <Link
          href="/shop"
          className="font-dm text-[0.8rem] text-[#7eb89a] hover:underline"
        >
          ← Back to shop
        </Link>
      </div>
    );
  }

  const images: string[] = product?.images ?? [];

  return (
    <main className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 pt-28 pb-4">
        <nav className="flex items-center gap-2 font-dm text-[0.72rem] text-[#aaa] tracking-wide">
          <Link href="/" className="hover:text-[#555] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#555] transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#555]">
            {loading ? "…" : product?.title}
          </span>
        </nav>
      </div>

      {/* Product main */}
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-6 md:py-12">
        {loading ? (
          <DetailSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* LEFT — Image gallery */}
            <div className="flex flex-col gap-4">
              {/* Main image */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#f5f3f0]">
                {images.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${product!.title} view ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activeImg === i ? "opacity-100" : "opacity-0"
                      }`}
                  />
                ))}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200
                      ${activeImg === i ? "border-[#1a1a1a]" : "border-transparent opacity-60 hover:opacity-80"}`}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT — Product details */}
            <div className="md:pt-6 flex flex-col">
              <p className="font-dm text-[0.7rem] tracking-[0.18em] uppercase text-[#aaa] mb-3">
                {product!.category}
              </p>
              <h1 className="font-playfair text-[2.2rem] md:text-[2.8rem] font-semibold text-[#1a1a1a] leading-tight">
                {product!.title}
              </h1>
              <p className="font-dm text-[0.82rem] text-[#888] tracking-wide mt-1">
                {product!.subtitle}
              </p>

              <p className="font-playfair text-[2rem] font-bold text-[#1a1a1a] mt-5">
                Rs {Number(product!.price).toLocaleString()}
              </p>

              <div className="h-px bg-[#f0ede8] my-6" />

              <p className="font-dm text-[0.85rem] text-[#666] leading-relaxed">
                {product!.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {["Lifetime guarantee", "Free delivery", "Handcrafted", "Sustainable"].map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#7eb89a]" />
                    <span className="font-dm text-[0.75rem] text-[#666] tracking-wide">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-[#f0ede8] my-6" />

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                className={`w-full h-[54px] font-dm text-[0.82rem] font-semibold tracking-[0.14em] uppercase rounded-full active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3
                  ${added
                    ? "bg-[#7eb89a] text-white"
                    : "bg-[#1a1a1a] text-white hover:bg-[#3a3a3a]"
                  }`}
              >
                {added ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>

              <button className="w-full h-[54px] border border-[#e0ddd8] text-[#1a1a1a] font-dm text-[0.82rem] font-semibold tracking-[0.14em] uppercase rounded-full hover:border-[#1a1a1a] active:scale-[0.98] transition-all duration-200 mt-3">
                Save to Wishlist
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Related products */}
      {!loading && related.length > 0 && (
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-16 md:py-24 border-t border-[#f0ede8] mt-8">
          <p className="font-dm text-[10px] text-center tracking-[1em] font-bold text-black uppercase mb-8">
            You May Also Like
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

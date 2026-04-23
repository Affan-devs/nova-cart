"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "../card/ProductCard";
import { fetchProducts, type Product } from "../../utils/supabase/supabase-queries";

// Skeleton loader for product cards
function ProductSkeleton() {
  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden flex-shrink-0 animate-pulse"
      style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}>
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

export default function FeaturedSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [products]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">

        {/* Tag */}
        <p className="font-dm text-[10px] text-center tracking-[1em] font-bold text-black uppercase mb-10">
          New Collection
        </p>

        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-[480px]">
            <h2 className="font-playfair text-[2.4rem] md:text-[3rem] font-semibold text-[#1a1a1a] leading-[1.1] tracking-tight">
              Crafted for how<br />
              <em className="font-light italic">you live today.</em>
            </h2>
            <p className="font-dm text-[0.82rem] text-[#888] leading-relaxed mt-4 max-w-[380px]">
              Each piece in our new collection is made to last decades — chosen for material integrity, quiet beauty, and the way it sits in a room without asking for attention.
            </p>
          </div>

          <Link href="/shop" className="group flex items-center gap-3 self-start md:self-auto shrink-0">
            <span className="font-dm text-[0.8rem] font-semibold text-[#1a1a1a] tracking-wide">More products</span>
            <span className="w-8 h-8 rounded-full border border-[#1a1a1a]/20 flex items-center justify-center group-hover:bg-[#1a1a1a] group-hover:border-[#1a1a1a] transition-all duration-200">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                className="text-[#1a1a1a] group-hover:text-white transition-colors duration-200">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={`hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#e8e4de] shadow-md items-center justify-center hover:shadow-lg hover:border-[#ccc] transition-all duration-200
              ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* RIGHT ARROW */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className={`hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-[#e8e4de] shadow-md items-center justify-center hover:shadow-lg hover:border-[#ccc] transition-all duration-200
              ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-3 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" }}
          >
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-[72vw] max-w-[260px] min-w-[200px] md:w-[280px] md:max-w-none flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
                  <ProductSkeleton />
                </div>
              ))
              : products.map((product) => (
                <div key={product.id} className="w-[72vw] max-w-[260px] min-w-[200px] md:w-[280px] md:max-w-none flex-shrink-0" style={{ scrollSnapAlign: "start" }}>
                  <ProductCard product={product} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

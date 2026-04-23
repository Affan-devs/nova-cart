"use client";

import { useRef, useState, useEffect } from "react";
import { fetchCategories, type Category } from "../../utils/supabase/supabase-queries";
import CategoryCard from "../card/CategoryCard";

function CategorySkeleton() {
  return (
    <div className="w-full h-[420px] rounded-2xl overflow-hidden bg-[#f0ede8] animate-pulse" />
  );
}

export default function CategoriesSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Supabase
  useEffect(() => {
    fetchCategories().then((data) => {
      setCategories(data);
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
  }, [categories]);

  const scroll = (dir: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 340 : -340, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-dm text-[0.88rem] text-[#888] leading-relaxed max-w-[360px]">
            Explore our thoughtful and
            <br />
            planet-first{" "}
            <span className="font-playfair text-[1.1rem] font-semibold text-[#1a1a1a] italic">
              ✦ Categories
            </span>
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* LEFT ARROW */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={`hidden md:flex absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-[#e8e4de] shadow-md items-center justify-center hover:shadow-lg hover:border-[#ccc] transition-all duration-200
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
            className={`hidden md:flex absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-[#e8e4de] shadow-md items-center justify-center hover:shadow-lg hover:border-[#ccc] transition-all duration-200
              ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Scroll track */}
          <div
            ref={trackRef}
            className="flex gap-4 md:gap-5 overflow-x-auto pb-3 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="shrink-0 w-[280px] md:w-[300px]">
                  <CategorySkeleton />
                </div>
              ))
              : categories.map((cat) => (
                <div key={cat.slug} className="shrink-0 w-[280px] md:w-[300px]">
                  <CategoryCard category={cat} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
}

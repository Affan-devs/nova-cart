"use client";

import { useState, useEffect } from "react";
import { fetchProducts, type Product } from "@/src/utils/supabase/supabase-queries";
import ProductCard from "@/src/components/card/ProductCard";

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

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <main className="bg-white min-h-screen pt-28 pb-24">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <p className="font-dm text-[10px] text-center tracking-[1em] font-bold text-black uppercase mb-6">
          All Products
        </p>
        <h1 className="font-playfair text-[2.2rem] md:text-[3rem] font-semibold text-[#1a1a1a] text-center leading-tight mb-14">
          The Full Collection
        </h1>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-playfair text-[1.2rem] text-[#999]">
              No products found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

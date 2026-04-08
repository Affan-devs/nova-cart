"use client";

import Link from "next/link";
import { useCart } from "./cartStore";
import { Product } from "../lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="group w-full bg-white rounded-2xl overflow-hidden flex-shrink-0 md:w-[280px]"
      style={{ boxShadow: "0 2px 16px 0 rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)" }}>

      {/* Image */}
      <Link href={`/product/${product.id}`} className="block overflow-hidden">
        <div className=" h-[300px] md:h-[320px] overflow-hidden bg-[#f5f3f0]">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        </div>
      </Link>

      {/* Info row */}
      <div className="px-4 py-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="font-playfair text-[0.95rem] font-semibold text-[#1a1a1a] leading-tight truncate">{product.title}</p>
          <p className="font-dm text-[0.72rem] text-[#888] tracking-wide mt-0.5 truncate">{product.subtitle}</p>
          <p className="font-dm text-[0.88rem] font-bold text-[#1a1a1a] mt-2">${product.price.toLocaleString()}</p>
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          className="shrink-0 w-9 h-9 rounded-full bg-[#1a1a1a] flex items-center justify-center hover:bg-[#3a3a3a] active:scale-95 transition-all duration-200"
          aria-label="Add to cart"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}



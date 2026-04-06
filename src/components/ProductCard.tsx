"use client";

import Link from "next/link";
import { Product } from "../lib/product";
import { useCart } from "../lib/Cartcontext";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div className="group relative flex flex-col bg-[#111a13] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40">
            {/* Badge */}
            {product.badge && (
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-[#7eb89a] text-[#0c120e] font-dm text-[0.65rem] font-bold tracking-wider uppercase">
                    {product.badge}
                </span>
            )}

            {/* Image — click goes to detail */}
            <Link href={`/shop/${product.id}`} className="block relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c120e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Quick view hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-dm text-white text-xs font-semibold tracking-widest uppercase bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full">
                        View Details
                    </span>
                </div>
            </Link>

            {/* Info */}
            <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex flex-col gap-1">
                    <span className="font-dm text-[#7eb89a] text-[0.65rem] font-semibold tracking-widest uppercase">{product.category}</span>
                    <Link href={`/shop/${product.id}`}>
                        <h3 className="font-playfair text-white text-[1rem] font-normal leading-snug hover:text-[#c8dfd0] transition-colors duration-200">
                            {product.name}
                        </h3>
                    </Link>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} width="10" height="10" viewBox="0 0 24 24"
                                fill={s <= Math.round(product.rating) ? "#7eb89a" : "none"}
                                stroke="#7eb89a" strokeWidth="2">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                        ))}
                    </div>
                    <span className="font-dm text-white/40 text-[0.7rem]">({product.reviews})</span>
                </div>

                {/* Price + Add to cart */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-baseline gap-1.5">
                        <span className="font-dm text-white font-semibold text-base">${product.price}</span>
                        {product.originalPrice && (
                            <span className="font-dm text-white/30 text-xs line-through">${product.originalPrice}</span>
                        )}
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.72rem] font-dm font-semibold tracking-wide transition-all duration-300
              ${added
                                ? "bg-[#7eb89a] text-[#0c120e] scale-95"
                                : "bg-white/[0.08] border border-white/10 text-white/80 hover:bg-[#7eb89a] hover:text-[#0c120e] hover:border-transparent"
                            }`}
                    >
                        {added ? (
                            <>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                                Added
                            </>
                        ) : (
                            <>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                                Add
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
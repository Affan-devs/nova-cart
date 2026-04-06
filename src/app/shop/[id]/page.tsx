"use client";

import { useParams, notFound } from "next/navigation";
import { products } from "@/src/lib/product";
import { useCart } from "@/src/lib/Cartcontext";
import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/src/components/ProductCard";

export default function ProductDetailPage() {
    const { id } = useParams();
    const product = products.find((p) => p.id === Number(id));
    const { addToCart } = useCart();
    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) return notFound();

    const related = products.filter((p) => p.id !== product.id).slice(0, 4);

    const handleAdd = () => {
        for (let i = 0; i < qty; i++) addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <main className="min-h-screen bg-[#0f1712] pt-[80px] pb-24 px-5 md:px-10 lg:px-16">
            <div className="max-w-6xl mx-auto">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/shop" className="font-dm text-white/40 text-xs hover:text-white/70 transition-colors">Shop</Link>
                    <span className="text-white/20 text-xs">›</span>
                    <span className="font-dm text-white/60 text-xs">{product.name}</span>
                </div>

                {/* Product section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">

                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden aspect-square bg-[#111a13]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        {product.badge && (
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#7eb89a] text-[#0c120e] font-dm text-xs font-bold tracking-wider uppercase">
                                {product.badge}
                            </span>
                        )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center gap-6 py-2">
                        <div>
                            <span className="font-dm text-[#7eb89a] text-xs font-semibold tracking-[0.25em] uppercase">{product.category}</span>
                            <h1 className="font-playfair italic text-3xl md:text-4xl text-white mt-2 leading-tight">{product.name}</h1>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <svg key={s} width="13" height="13" viewBox="0 0 24 24"
                                        fill={s <= Math.round(product.rating) ? "#7eb89a" : "none"}
                                        stroke="#7eb89a" strokeWidth="2">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </div>
                            <span className="font-dm text-white/50 text-sm">{product.rating} · {product.reviews} reviews</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="font-playfair text-3xl text-white font-bold">${product.price}</span>
                            {product.originalPrice && (
                                <span className="font-dm text-white/30 text-lg line-through">${product.originalPrice}</span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="font-dm text-white/60 text-sm leading-relaxed border-t border-white/[0.07] pt-5">
                            {product.description}
                        </p>

                        {/* Details list */}
                        <ul className="flex flex-col gap-2">
                            {product.details.map((d) => (
                                <li key={d} className="flex items-center gap-2 font-dm text-white/50 text-sm">
                                    <span className="w-1 h-1 rounded-full bg-[#7eb89a] shrink-0" />
                                    {d}
                                </li>
                            ))}
                        </ul>

                        {/* Qty + Add to cart */}
                        <div className="flex items-center gap-3 pt-2">
                            {/* Qty stepper */}
                            <div className="flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-1 h-11">
                                <button onClick={() => setQty((q) => Math.max(1, q - 1))}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                </button>
                                <span className="font-dm text-white font-semibold text-sm w-5 text-center">{qty}</span>
                                <button onClick={() => setQty((q) => q + 1)}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                                </button>
                            </div>

                            {/* Add to cart */}
                            <button onClick={handleAdd}
                                className={`flex-1 h-11 rounded-full font-dm font-semibold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2
                  ${added
                                        ? "bg-white/10 text-[#7eb89a] border border-[#7eb89a]/40"
                                        : "bg-[#7eb89a] text-[#0c120e] hover:bg-[#91c9aa]"
                                    }`}>
                                {added ? (
                                    <>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Added to Cart
                                    </>
                                ) : "Add to Cart"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* More products */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="font-playfair italic text-2xl text-white">You may also like</h2>
                        <Link href="/shop" className="font-dm text-[#7eb89a] text-xs tracking-wide hover:underline">View all</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {related.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>

            </div>
        </main>
    );
}
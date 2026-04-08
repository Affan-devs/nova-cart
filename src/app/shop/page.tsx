// app/shop/page.tsx
import { PRODUCTS } from "@/src/lib/products";
import ProductCard from "@/src/components/ProductCard";

export default function ShopPage() {
    return (
        <main className="bg-white min-h-screen pt-28 pb-24">
            <div className="max-w-[1280px] mx-auto px-5 md:px-10">
                <p className="font-dm text-[10px] text-center tracking-[1em] font-bold text-black uppercase mb-6">
                    All Products
                </p>
                <h1 className="font-playfair text-[2.2rem] md:text-[3rem] font-semibold text-[#1a1a1a] text-center leading-tight mb-14">
                    The Full Collection
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </main>
    );
}

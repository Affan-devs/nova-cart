import { products } from "@/src/lib/product";
import ProductCard from "../../components/ProductCard";

export default function ShopPage() {
    const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

    return (
        <main className="min-h-screen bg-[#0f1712] pt-[80px] pb-20 px-5 md:px-10 lg:px-16">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <p className="font-dm text-[#7eb89a] text-xs tracking-[0.3em] uppercase mb-2">Our Collection</p>
                <h1 className="font-playfair italic text-4xl md:text-5xl text-white">Shop</h1>
            </div>

            {/* Category filters */}
            <div className="max-w-7xl mx-auto mb-8 flex gap-2 flex-wrap">
                {categories.map((cat) => (
                    <button key={cat}
                        className="font-dm text-xs font-semibold tracking-wide px-4 py-2 rounded-full border border-white/10 text-white/60 hover:border-[#7eb89a] hover:text-[#7eb89a] transition-all duration-200 first:border-[#7eb89a] first:text-[#7eb89a]">
                        {cat}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}
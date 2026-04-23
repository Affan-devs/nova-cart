"use client";

import { useRouter } from "next/navigation";
import type { Category } from "@/src/utils/supabase/supabase-queries";

type Props = {
    category: Category;
};

export default function CategoryCard({ category }: Props) {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/categories?category=${category.slug}`)}
            className="group relative w-full h-[420px] rounded-2xl overflow-hidden cursor-pointer"
        >
            {/* Background Image */}
            <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition duration-500" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-6">
                {/* Top Text */}
                <div>
                    <p className="text-white/80 text-sm tracking-wide">Explore</p>
                    <h2 className="text-white text-3xl font-semibold tracking-tight">
                        {category.name}
                    </h2>
                    {category.tagline && (
                        <p className="text-white/60 text-sm mt-1 leading-snug max-w-[200px]">
                            {category.tagline}
                        </p>
                    )}
                </div>

                {/* Button */}
                <div>
                    <button className="bg-white text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-neutral-200 transition">
                        Shop →
                    </button>
                </div>
            </div>
        </div>
    );
}
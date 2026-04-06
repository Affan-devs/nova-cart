import { HeroSection } from "../components/Hero-banner"
import ProductCard from "../components/ProductCard";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="flex flex-col items-start justify-center gap-5 px-6 md:px-12 pt-[100px] text-left max-w-4xl">
        {/* Smaller, more elegant subheader */}
        <p className="font-dm text-[10px] tracking-[0.4em] text-[#7eb89a] uppercase">
          New Collection
        </p>

        {/* Refined heading size */}
        <h1 className="font-playfair italic text-4xl md:text-5xl text-white leading-[1.1] max-w-lg">
          Designed for the<br />
          <span className="not-italic font-bold">slow table</span>
        </h1>

        {/* Smaller description text */}
        <p className="font-dm text-white/50 text-sm max-w-sm leading-relaxed">
          Handcrafted homewares for those who believe the table is where life happens.
        </p>

        {/* Refined, smaller button */}
        <Link href="/shop"
          className="mt-4  px-6 py-2.5 rounded-full bg-[#7eb89a] text-[#0c120e] font-dm font-medium text-xs tracking-widest hover:bg-[#91c9aa] transition-all duration-300 ease-in-out shadow-sm hover:shadow-md">
          Shop Collection
        </Link>
      </div>

    </main >
  );
}

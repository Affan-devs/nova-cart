"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../cart/cartStore";
// import { searchProducts, type Product } from "../../lib/supabase-queries";

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  // Search state
  const [query, setQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  // const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const debouncedQuery = useDebounce(query, 300);
  const debouncedMobileQuery = useDebounce(mobileQuery, 300);

  const mobileSearchRef = useRef<HTMLInputElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { count, setIsOpen } = useCart();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("#mobile-menu") && !t.closest("#hamburger-btn"))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Focus mobile search input when opened
  useEffect(() => {
    if (mobileSearchOpen) mobileSearchRef.current?.focus();
  }, [mobileSearchOpen]);

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!desktopSearchRef.current?.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Desktop search: Supabase FTS
  // const runSearch = useCallback(async (q: string) => {
  //   if (!q.trim()) {
  //     setResults([]);
  //     setShowDropdown(false);
  //     return;
  //   }
  //   setSearching(true);
  //   const hits = await searchProducts(q);
  //   setResults(hits);
  //   setShowDropdown(true);
  //   setSearching(false);
  // }, []);

  // useEffect(() => {
  //   runSearch(debouncedQuery);
  // }, [debouncedQuery, runSearch]);

  // useEffect(() => {
  //   runSearch(debouncedMobileQuery);
  //   setShowMobileDropdown(!!debouncedMobileQuery.trim());
  // }, [debouncedMobileQuery, runSearch]);

  // const handleResultClick = (id: string) => {
  //   setShowDropdown(false);
  //   setShowMobileDropdown(false);
  //   setQuery("");
  //   setMobileQuery("");
  //   router.push(`/shop/product/${id}`);
  // };

  const navLinks = ["Shop", "Categories", "Contact", "About"];

  // const SearchDropdown = ({
  //   items,
  //   isLoading,
  //   onSelect,
  // }: {
  //   items: Product[];
  //   isLoading: boolean;
  //   onSelect: (id: string) => void;
  // }) => (
  //   <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#f0ede8] overflow-hidden z-50 min-w-[280px]">
  //     {isLoading ? (
  //       <div className="px-4 py-3 flex items-center gap-2">
  //         <div className="w-3 h-3 rounded-full bg-[#7eb89a] animate-pulse" />
  //         <span className="font-dm text-[0.75rem] text-[#aaa]">Searching…</span>
  //       </div>
  //     ) : items.length === 0 ? (
  //       <div className="px-4 py-3">
  //         <span className="font-dm text-[0.75rem] text-[#aaa]">No results found.</span>
  //       </div>
  //     ) : (
  //       <ul>
  //         {items.map((p) => (
  //           <li key={p.id}>
  //             <button
  //               onClick={() => onSelect(p.id)}
  //               className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#f9f7f5] transition-colors duration-150 text-left"
  //             >
  //               <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#f5f3f0] shrink-0">
  //                 <img
  //                   src={p.image}
  //                   alt={p.title}
  //                   className="w-full h-full object-cover"
  //                 />
  //               </div>
  //               <div className="min-w-0">
  //                 <p className="font-dm text-[0.8rem] font-semibold text-[#1a1a1a] truncate">
  //                   {p.title}
  //                 </p>
  //                 <p className="font-dm text-[0.68rem] text-[#aaa] truncate">
  //                   {p.category} · Rs {Number(p.price).toLocaleString()}
  //                 </p>
  //               </div>
  //             </button>
  //           </li>
  //         ))}
  //         <li className="border-t border-[#f0ede8]">
  //           <button
  //             onClick={() => {
  //               setShowDropdown(false);
  //               setShowMobileDropdown(false);
  //               router.push(`/shop`);
  //             }}
  //             className="w-full px-4 py-2.5 font-dm text-[0.72rem] text-[#7eb89a] font-semibold hover:bg-[#f9f7f5] transition-colors text-left"
  //           >
  //             View all products →
  //           </button>
  //         </li>
  //       </ul>
  //     )}
  //   </div>
  // );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg
          ${scrolled
            ? "bg-[#0c120e]/90 border-b border-white/[0.06]"
            : "bg-[#0c120e]/60 border-b border-transparent"
          }`}
      >
        <div className="h-[60px] flex items-center justify-between px-5 md:px-8 gap-4">
          {/* MOBILE hamburger */}
          <button
            id="hamburger-btn"
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-full bg-white/[0.08] border border-white/10 hover:bg-white/[0.15] transition-colors duration-200 shrink-0"
          >
            <span className={`block w-4 h-[1.5px] bg-white/80 transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-white/80 transition-all duration-200 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-4 h-[1.5px] bg-white/80 transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
          </button>

          {/* DESKTOP links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={
                  item === "Shop"
                    ? "/shop"
                    : item === "Categories"
                      ? "/categories"
                      : item === "Contact"
                        ? "/contact"
                        : item === "About"
                          ? "/about"
                          : "/"
                }
                className="font-dm text-[0.8rem] font-semibold tracking-wide text-white/75 hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* CENTER wordmark */}
          <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none">
            <Link href="/" className="pointer-events-auto">
              <span className="font-playfair italic text-[1.4rem] md:text-[1.55rem] font-normal text-white tracking-tight whitespace-nowrap">
                Nova<span className="font-bold">Cart</span>
              </span>
            </Link>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Desktop search with FTS dropdown */}
            <div
              ref={desktopSearchRef}
              className="hidden md:block relative"
            >
              <div
                className={`flex items-center gap-2 rounded-full px-4 h-9 border transition-all duration-300
                  ${searchFocused
                    ? "bg-white/[0.12] border-white/[0.22] w-56"
                    : "bg-white/[0.08] border-white/10 w-44"
                  }`}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                {/* <input
                  type="text"
                  placeholder="Search Product..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => {
                    setSearchFocused(true);
                    if (results.length > 0) setShowDropdown(true);
                  }}
                  onBlur={() => setSearchFocused(false)}
                  className="font-dm bg-transparent border-none outline-none text-white text-[0.78rem] tracking-wide w-full caret-[#7eb89a]"
                /> */}
                {query && (
                  <button
                    onMouseDown={(e) => { e.preventDefault(); setQuery(""); setShowDropdown(false); }}
                    className="text-white/40 hover:text-white/80 transition-colors shrink-0"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Desktop Search Dropdown
              {showDropdown && (
                <SearchDropdown
                  items={results}
                  isLoading={searching}
                  onSelect={handleResultClick}
                />
              )} */}
            </div>

            {/* Mobile search toggle */}
            <button
              onClick={() => setMobileSearchOpen((v) => !v)}
              className="md:hidden w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center hover:bg-white/[0.15] transition-colors duration-200 shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center hover:bg-white/[0.15] transition-colors duration-200 shrink-0 cursor-pointer"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#7eb89a] rounded-full flex items-center justify-center font-dm text-[0.55rem] font-bold text-white leading-none">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </button>

            {/* Account */}
            <button className="w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center hover:bg-white/[0.15] transition-colors duration-200 shrink-0 cursor-pointer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileSearchOpen ? "max-h-28 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-5 pb-3" ref={mobileDropdownRef}>
            <div className="flex items-center gap-2 rounded-full px-4 h-10 bg-white/[0.08] border border-white/10 w-full">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={mobileSearchRef}
                type="text"
                placeholder="Search Product..."
                value={mobileQuery}
                onChange={(e) => setMobileQuery(e.target.value)}
                className="font-dm bg-transparent border-none outline-none text-white text-[0.82rem] tracking-wide w-full caret-[#7eb89a]"
              />
              {mobileQuery && (
                <button
                  onClick={() => { setMobileQuery(""); setShowMobileDropdown(false); }}
                  className="text-white/40 hover:text-white/80 transition-colors shrink-0"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mobile search dropdown
            {showMobileDropdown && (
              <div className="mt-1">
                <SearchDropdown
                  items={results}
                  isLoading={searching}
                  onSelect={handleResultClick}
                />
              </div> */}

          </div>
        </div>

        {/* Mobile dropdown nav */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <div className="px-5 pb-4 pt-1 flex flex-col gap-1 border-t border-white/[0.06]">
            {navLinks.map((item) => (
              <Link
                key={item}
                href={
                  item === "Shop"
                    ? "/shop"
                    : item === "Categories"
                      ? "/categories"
                      : item === "Contact"
                        ? "/contact"
                        : item === "About"
                          ? "/about"
                          : "/"
                }
                onClick={() => setMenuOpen(false)}
                className="font-dm text-[0.88rem] font-semibold tracking-wide text-white/70 hover:text-white hover:bg-white/[0.06] transition-all duration-150 px-3 py-2.5 rounded-lg"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

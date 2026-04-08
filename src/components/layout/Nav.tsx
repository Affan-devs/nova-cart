"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "../cartStore";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const mobileSearchRef = useRef<HTMLInputElement>(null);
    const { count, setIsOpen } = useCart();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const handler = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            if (!t.closest("#mobile-menu") && !t.closest("#hamburger-btn")) setMenuOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [menuOpen]);

    useEffect(() => {
        if (mobileSearchOpen) mobileSearchRef.current?.focus();
    }, [mobileSearchOpen]);

    const navLinks = ["Shop", "Categories", "Gallery", "About"];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg
          ${scrolled ? "bg-[#0c120e]/90 border-b border-white/[0.06]" : "bg-[#0c120e]/60 border-b border-transparent"}`}
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
                            <Link key={item} href={item === "Shop" ? "/shop" : "#"}
                                className="font-dm text-[0.8rem] font-semibold tracking-wide text-white/75 hover:text-white transition-colors duration-200 whitespace-nowrap">
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
                        {/* Desktop search */}
                        <div className={`hidden md:flex items-center gap-2 rounded-full px-4 h-9 border transition-all duration-300
              ${searchFocused ? "bg-white/[0.12] border-white/[0.22] w-56" : "bg-white/[0.08] border-white/10 w-44"}`}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input type="text" placeholder="Search Product..."
                                onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
                                className="font-dm bg-transparent border-none outline-none text-white text-[0.78rem] tracking-wide w-full caret-[#7eb89a]" />
                        </div>

                        {/* Mobile search toggle */}
                        <button onClick={() => setMobileSearchOpen((v) => !v)}
                            className="md:hidden w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center hover:bg-white/[0.15] transition-colors duration-200 shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </button>

                        {/* Cart — now opens drawer and shows badge */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="relative w-9 h-9 rounded-full bg-white/[0.08] border border-white/10 flex items-center justify-center hover:bg-white/[0.15] transition-colors duration-200 shrink-0 cursor-pointer">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
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
                                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile search bar */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileSearchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-5 pb-3">
                        <div className="flex items-center gap-2 rounded-full px-4 h-10 bg-white/[0.08] border border-white/10 w-full">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input ref={mobileSearchRef} type="text" placeholder="Search Product..."
                                className="font-dm bg-transparent border-none outline-none text-white text-[0.82rem] tracking-wide w-full caret-[#7eb89a]" />
                        </div>
                    </div>
                </div>

                {/* Mobile dropdown */}
                <div id="mobile-menu" className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="px-5 pb-4 pt-1 flex flex-col gap-1 border-t border-white/[0.06]">
                        {navLinks.map((item) => (
                            <Link key={item} href={item === "Shop" ? "/shop" : "#"}
                                onClick={() => setMenuOpen(false)}
                                className="font-dm text-[0.88rem] font-semibold tracking-wide text-white/70 hover:text-white hover:bg-white/[0.06] transition-all duration-150 px-3 py-2.5 rounded-lg">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
}

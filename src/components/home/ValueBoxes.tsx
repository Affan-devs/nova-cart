"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const leftCards = [
  {
    title: "Handcrafted With Soul",
    description:
      "Every joint, curve, and finish is shaped by artisans who've spent decades perfecting their craft.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Hand / craft icon */}
        <path d="M20 8c0-1.1.9-2 2-2s2 .9 2 2v6" />
        <path d="M17 6c0-1.1.9-2 2-2s2 .9 2 2v2" />
        <path d="M14 8c0-1.1.9-2 2-2s2 .9 2 2v2" />
        <path d="M11 10c0-1.1.9-2 2-2s2 .9 2 2v2" />
        <path d="M11 10v4c0 5 3 8 8 8h1c3 0 4-1 4-4v-4" />
        <path d="M8 26h16" />
      </svg>
    ),
  },
  {
    title: "Sustainable Materials",
    description:
      "Responsibly sourced wood, organic fabrics, and low-impact finishes — better for your home and the planet.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Leaf icon */}
        <path d="M6 28C6 28 6 16 16 8c10-8 12-4 12-4S30 16 20 24c-5 4-8 4-10 4" />
        <path d="M6 28c4-4 8-8 14-14" />
        <path d="M14 20c-2 0-4-1-5-3" />
      </svg>
    ),
  },
];

const rightCards = [
  {
    title: "Timeless Design",
    description:
      "We design beyond trends — pieces that look as relevant in twenty years as they do today.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Diamond / gem icon */}
        <polygon points="16 4 26 14 16 28 6 14" />
        <line x1="6" y1="14" x2="26" y2="14" />
        <polyline points="11 4 16 14 21 4" />
      </svg>
    ),
  },
  {
    title: "Lifetime Guarantee",
    description:
      "Built to last decades, backed by our promise. If it breaks, we fix it — no questions, no expiry.",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Shield check icon */}
        <path d="M16 4L6 9v7c0 7 4 12 10 14 6-2 10-7 10-14V9l-10-5z" />
        <polyline points="11 16 14.5 20 21 13" />
      </svg>
    ),
  },
];

function Card({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative rounded-2xl border border-[#eae7e1] bg-white p-7 md:p-8 flex flex-col gap-4 hover:border-[#d5d0c8] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
    >
      {/* Icon circle */}
      <div className="w-12 h-12 rounded-xl bg-[#f7f5f2] flex items-center justify-center text-[#1a1a1a] group-hover:bg-[#f0ede8] transition-colors duration-300">
        {icon}
      </div>

      <h3 className="font-playfair text-[1.1rem] font-semibold text-[#1a1a1a] leading-snug">
        {title}
      </h3>
      <p className="font-dm text-[0.8rem] text-[#999] leading-relaxed">
        {description}
      </p>

      {/* Decorative corner line */}
      <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#eae7e1]/60 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default function ValueBoxes() {
  const centerRef = useRef<HTMLDivElement>(null);
  const centerInView = useInView(centerRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#faf9f7] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Section tag */}
        <p className="font-dm text-[10px] text-center tracking-[1em] font-bold text-black uppercase mb-10">
          Why Homedine
        </p>

        {/* Heading */}
        <h2 className="font-playfair text-[2.2rem] md:text-[3rem] font-semibold text-[#1a1a1a] text-center leading-tight mb-4 tracking-tight">
          Values that never<br />
          <em className="font-light italic">go out of style.</em>
        </h2>
        <p className="font-dm text-[0.82rem] text-[#999] text-center max-w-[420px] mx-auto leading-relaxed mb-14 md:mb-20">
          We don&apos;t just make furniture — we craft heirlooms. Here&apos;s what sets every piece apart.
        </p>

        {/* 5-box grid: 2 left | 1 center | 2 right */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-center">
          {/* LEFT — 2 boxes */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {leftCards.map((card, i) => (
              <Card key={card.title} {...card} index={i} />
            ))}
          </div>

          {/* CENTER — Hero stat */}
          <motion.div
            ref={centerRef}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={centerInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="md:col-span-1 flex items-center justify-center py-10 md:py-0"
          >
            <div className="relative w-full max-w-[220px] aspect-square mx-auto flex flex-col items-center justify-center text-center">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-[#d5d0c8]/70 animate-[spin_30s_linear_infinite]" />
              {/* Inner ring */}
              <div className="absolute inset-3 rounded-full border border-[#eae7e1]" />

              {/* Content */}
              <span className="font-playfair text-[3.2rem] md:text-[3.8rem] font-bold text-[#1a1a1a] leading-none">
                25
              </span>
              <span className="font-dm text-[0.7rem] tracking-[0.2em] uppercase text-[#aaa] mt-1">
                Years of Craft
              </span>

              {/* Accent dot */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#7eb89a]" />
            </div>
          </motion.div>

          {/* RIGHT — 2 boxes */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {rightCards.map((card, i) => (
              <Card key={card.title} {...card} index={i + 2} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

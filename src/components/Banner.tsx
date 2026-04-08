"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "./ui/reval"
import { cn } from "../lib/utils"
const materials = [
    {
        id: 14,
        name: "Stove",
        description: "Premium built-in stove with sleek design and precision cooking control",
        image: "/material-oak-macro.png",
        backgroundImage: "/stove-banner.png",
        tint: "bg-orange-50",
    },
    {
        id: 16,
        name: "Blender",
        description: "High-performance blender engineered for smooth, effortless blending",
        image: "/material-walnut-macro.png",
        backgroundImage: "/blander.png",
        tint: "bg-gray-100",
    },
    {
        id: 15,
        name: "Lamp",
        description: "Elegant ambient lamp with warm lighting and modern minimalist design",
        image: "/material-steel-macro.png",
        backgroundImage: "/lamp.jpg",
        tint: "bg-amber-50",
    },
]

export function MaterialsSection() {
    const [activeMaterial, setActiveMaterial] = useState(14)
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const index = Math.min(
            materials.length - 1,
            Math.floor(latest * materials.length * 0.99)
        )
        const newMaterial = materials[index].id
        if (newMaterial !== activeMaterial) {
            setActiveMaterial(newMaterial)
        }
    })

    const activeMaterialData = materials.find((m) => m.id === activeMaterial) || materials[0]

    const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
        return (
            <span>
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.5,
                            delay: delay + index * 0.03,
                            ease: [0.21, 0.47, 0.32, 0.98],
                        }}
                        style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </span>
        )
    }

    return (
        <div ref={containerRef} className="h-[300vh] relative w-full">
            <section className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" id="materials">
                <div className="absolute inset-0 z-0">
                    {materials.map((material) => (
                        <motion.div
                            key={material.id}
                            className="absolute inset-0"
                            initial={{ opacity: material.id === activeMaterial ? 1 : 0 }}
                            animate={{ opacity: material.id === activeMaterial ? 1 : 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <Image
                                src={material.backgroundImage}
                                alt={`${material.name} interior scene`}
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    ))}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                <div className="absolute top-[120px] left-0 right-0 z-10">
                    <div className="container-custom text-white">
                        <Reveal>
                            <div>
                                <AnimatePresence mode="wait">
                                    <motion.h2
                                        key={activeMaterial}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.8, ease: "easeInOut" }}
                                        className="font-bold mb-6 text-7xl"
                                    >
                                        <AnimatedText text={activeMaterialData.name} delay={0.2} />
                                    </motion.h2>
                                </AnimatePresence>
                                <p className="text-lg text-white/90 leading-relaxed max-w-2xl mb-8">
                                    Every appliance is crafted with precision engineering and premium materials, designed to elevate
                                    your kitchen and living spaces with style and performance.
                                </p>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`btn-${activeMaterial}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link href={`/product/${activeMaterialData.id}`} className="px-8 py-3 bg-white text-neutral-900 font-semibold rounded-full hover:bg-neutral-100 transition-colors inline-block text-center">
                                            Add {activeMaterialData.name} to the Cart
                                        </Link>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </Reveal>
                    </div>
                </div>

                <div className="absolute bottom-8 left-8 z-10 max-w-md hidden">
                    <Reveal delay={0.3}>
                        <blockquote className="pl-0 py-4">
                            <p className="text-xl text-white leading-relaxed italic lg:text-base font-medium">
                                "We believe in creating appliances that blend seamlessly into your home—products built to perform
                                beautifully, day after day."
                            </p>
                            <footer className="mt-4 text-sm text-white/70">— Nova Cart</footer>
                        </blockquote>
                    </Reveal>
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-10">
                    <div className="container-custom">
                        <Reveal delay={0.1}>
                            <div className="flex flex-wrap justify-center gap-3">
                                {materials.map((material) => (
                                    <motion.button
                                        key={material.id}
                                        className={cn(
                                            "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md",
                                            activeMaterial === material.id
                                                ? "bg-white text-neutral-900"
                                                : "bg-white/20 text-white hover:bg-white/30",
                                        )}
                                        onClick={() => setActiveMaterial(material.id)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {material.name}
                                    </motion.button>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>

            </section>
        </div>
    )
}

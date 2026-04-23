"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/src/utils/supabase/client";

interface OrderItem {
    id: string;
    product_title: string;
    product_subtitle: string | null;
    product_image: string | null;
    unit_price: number;
    quantity: number;
    line_total: number;
}

interface Order {
    id: string;
    status: string;
    subtotal: number;
    discount_amount: number;
    discount_code: string | null;
    shipping_amount: number;
    total: number;
    payment_method: string;
    placed_at: string;
    ship_first_name: string | null;
    ship_last_name: string | null;
    ship_email: string | null;
    ship_phone: string | null;
    ship_address: string | null;
    ship_city: string | null;
    ship_postal_code: string | null;
    items: OrderItem[];
}

export default function OrderConfirmationPage() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");

    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!orderId) { setError(true); setLoading(false); return; }

        const supabase = createClient();

        async function load() {
            const { data: o, error: oErr } = await supabase
                .from("orders").select("*").eq("id", orderId as string).single();
            if (oErr || !o) { setError(true); setLoading(false); return; }

            const { data: items } = await supabase
                .from("order_items").select("*").eq("order_id", orderId as string);
            setOrder({ ...o, items: items ?? [] } as unknown as Order);
            setLoading(false);
        }
        load();
    }, [orderId]);

    // ── Download as plain-text receipt ──────────────────────
    const handleDownload = () => {
        if (!order) return;

        const date = new Date(order.placed_at).toLocaleDateString("en-PK", {
            day: "numeric", month: "long", year: "numeric",
        });

        const lines: string[] = [
            "ORDER CONFIRMATION",
            "==================",
            "",
            `Order ID   : #${order.id.slice(0, 8).toUpperCase()}`,
            `Date       : ${date}`,
            `Status     : ${order.status}`,
            `Payment    : Cash on Delivery`,
            "",
            "SHIP TO",
            "-------",
            `${order.ship_first_name ?? ""} ${order.ship_last_name ?? ""}`.trim(),
            order.ship_address ?? "",
            [order.ship_city, order.ship_postal_code].filter(Boolean).join(", "),
            "Pakistan",
            order.ship_phone ? `+92${order.ship_phone}` : "",
            order.ship_email ?? "",
            "",
            "ITEMS",
            "-----",
            ...order.items.map(
                (i) =>
                    `${i.product_title}${i.product_subtitle ? ` — ${i.product_subtitle}` : ""}` +
                    `\n  Qty ${i.quantity}  ×  Rs ${i.unit_price.toLocaleString()}  =  Rs ${i.line_total.toLocaleString()}`
            ),
            "",
            "TOTALS",
            "------",
            `Subtotal   : Rs ${order.subtotal.toLocaleString()}`,
            ...(order.discount_amount > 0
                ? [`Discount   : − Rs ${order.discount_amount.toLocaleString()}${order.discount_code ? ` (${order.discount_code})` : ""}`]
                : []),
            `Shipping   : Free`,
            `Total      : Rs ${order.total.toLocaleString()}`,
            "",
            "Thank you for shopping with us.",
        ];

        const blob = new Blob([lines.join("\n")], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `order-${order.id.slice(0, 8).toUpperCase()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // ── Loading ──────────────────────────────────────────────
    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-sm text-gray-400 tracking-wide">Loading order…</p>
            </div>
        );
    }

    // ── Error ────────────────────────────────────────────────
    if (error || !order) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="text-base text-gray-700">Order not found.</p>
                <Link href="/shop" className="text-sm text-gray-400 underline underline-offset-4 hover:text-gray-600">
                    Back to shop
                </Link>
            </div>
        );
    }

    const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
    const placedDate = new Date(order.placed_at).toLocaleDateString("en-PK", {
        day: "numeric", month: "long", year: "numeric",
    });

    return (
        <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: "Inter, system-ui, sans-serif" }}>

            {/* ── Nav ── */}
            <div className="border-b border-gray-100">
                <div className="max-w-2xl mx-auto px-6 h-12 flex items-center justify-between">
                    <Link href="/shop" className="text-xs text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1.5">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                        Shop
                    </Link>
                    <span className="text-sm font-medium text-gray-700">Order Confirmation</span>
                    <button
                        onClick={handleDownload}
                        className="text-xs text-gray-400 hover:text-gray-700 transition-colors flex items-center gap-1.5"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download
                    </button>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-14">

                {/* ── Header ── */}
                <div className="mb-12">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>

                    <span className="text-xs text-green-600 font-medium tracking-wide">Order placed</span>

                    <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                        Thank you, {order.ship_first_name}.
                    </h1>
                    <p className="text-sm text-gray-400">
                        We'll reach you at{" "}
                        <span className="text-gray-600">
                            {order.ship_phone ? `+92 ${order.ship_phone}` : order.ship_email}
                        </span>{" "}
                        once confirmed.
                    </p>
                </div>

                {/* ── Meta row ── */}
                <div className="grid grid-cols-3 gap-px bg-gray-100 rounded-xl overflow-hidden mb-10">
                    {[
                        { label: "Order", value: `#${order.id.slice(0, 8).toUpperCase()}` },
                        { label: "Date", value: placedDate },
                        { label: "Payment", value: "Cash on Delivery" },
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-white px-4 py-3">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                            <p className="text-sm text-gray-800 font-medium">{value}</p>
                        </div>
                    ))}
                </div>

                {/* ── Items ── */}
                <section className="mb-10">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">
                        {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </p>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4">
                                {/* Thumbnail */}
                                <div className="w-12 h-12 rounded-lg bg-gray-50 overflow-hidden shrink-0">
                                    {item.product_image
                                        ? <img src={item.product_image} alt={item.product_title} className="w-full h-full object-cover" />
                                        : <div className="w-full h-full bg-gray-100" />
                                    }
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-800 font-medium leading-tight truncate">{item.product_title}</p>
                                    {item.product_subtitle && (
                                        <p className="text-xs text-gray-400 mt-0.5 truncate">{item.product_subtitle}</p>
                                    )}
                                </div>
                                {/* Qty + price */}
                                <div className="text-right shrink-0">
                                    <p className="text-sm text-gray-800 font-medium">Rs {item.line_total.toLocaleString()}</p>
                                    <p className="text-xs text-gray-400">× {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── Divider ── */}
                <div className="border-t border-gray-100 mb-10" />

                {/* ── Totals + Address side by side on md ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">

                    {/* Totals */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Summary</p>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Subtotal</span>
                                <span className="text-gray-700">Rs {order.subtotal.toLocaleString()}</span>
                            </div>
                            {order.discount_amount > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">
                                        Discount{order.discount_code ? ` (${order.discount_code})` : ""}
                                    </span>
                                    <span className="text-green-600">− Rs {order.discount_amount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-400">Shipping</span>
                                <span className="text-gray-400">Free</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-100">
                                <span className="font-semibold text-gray-800">Total</span>
                                <span className="font-semibold text-gray-900">Rs {order.total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">Shipping to</p>
                        <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
                            <p className="text-gray-800 font-medium">
                                {order.ship_first_name} {order.ship_last_name}
                            </p>
                            {order.ship_address && <p>{order.ship_address}</p>}
                            {order.ship_city && (
                                <p>{order.ship_city}{order.ship_postal_code ? `, ${order.ship_postal_code}` : ""}</p>
                            )}
                            <p>Pakistan</p>
                            {order.ship_phone && <p className="text-gray-400">+92 {order.ship_phone}</p>}
                            {order.ship_email && <p className="text-gray-400">{order.ship_email}</p>}
                        </div>
                    </div>
                </div>

                {/* ── Footer actions ── */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-8">
                    <Link
                        href="/shop"
                        className="text-sm text-gray-400 hover:text-gray-700 transition-colors"
                    >
                        ← Continue shopping
                    </Link>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 text-sm text-gray-700 border border-gray-200 rounded-full px-4 py-2 hover:border-gray-400 transition-colors"
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Download receipt
                    </button>
                </div>

            </div>
        </div>
    );
}
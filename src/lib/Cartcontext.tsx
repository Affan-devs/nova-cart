"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./product";

type CartItem = Product & { qty: number };

type CartCtx = {
    items: CartItem[];
    addToCart: (p: Product) => void;
    removeFromCart: (id: number) => void;
    total: number;
    count: number;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (p: Product) => {
        setItems((prev) => {
            const exists = prev.find((i) => i.id === p.id);
            if (exists) return prev.map((i) => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...p, qty: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setItems((prev) => prev.filter((i) => i.id !== id));
    };

    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, total, count }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
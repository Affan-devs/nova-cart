"use client";

import { useEffect } from "react";
import { useCart } from "./cartStore";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeFromCart, total } = useCart();

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] z-[70] bg-white flex flex-col transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#f0ede8]">
          <div>
            <h2 className="font-playfair text-[1.2rem] font-semibold text-[#1a1a1a]">Your Cart</h2>
            <p className="font-dm text-[0.72rem] text-[#999] tracking-wide mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setIsOpen(false)}
            className="w-9 h-9 rounded-full bg-[#f5f3f0] flex items-center justify-center hover:bg-[#ece9e4] transition-colors duration-200">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-5">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <p className="font-playfair text-[1rem] text-[#999]">Your cart is empty</p>
              <p className="font-dm text-[0.75rem] text-[#bbb] mt-1">Add something beautiful</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#f5f3f0] shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-[0.88rem] font-semibold text-[#1a1a1a] leading-tight">{item.title}</p>
                  <p className="font-dm text-[0.7rem] text-[#999] tracking-wide mt-0.5">{item.subtitle}</p>
                  <p className="font-dm text-[0.82rem] font-bold text-[#1a1a1a] mt-1">${item.price.toLocaleString()}</p>

                  {/* Qty controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-[#f5f3f0] rounded-full px-1 py-1">
                      <button onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-150 text-[#1a1a1a]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                      <span className="font-dm text-[0.78rem] font-bold text-[#1a1a1a] w-5 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, 1)}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-white transition-colors duration-150 text-[#1a1a1a]">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)}
                      className="font-dm text-[0.68rem] text-[#bbb] hover:text-[#e05] transition-colors duration-150 tracking-wide">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-6 border-t border-[#f0ede8]">
            <div className="flex items-center justify-between mb-5">
              <span className="font-dm text-[0.8rem] text-[#888] tracking-wide uppercase">Total</span>
              <span className="font-playfair text-[1.4rem] font-bold text-[#1a1a1a]">${total.toLocaleString()}</span>
            </div>
            <button className="w-full h-[52px] bg-[#1a1a1a] text-white font-dm text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-full hover:bg-[#3a3a3a] active:scale-[0.98] transition-all duration-200">
              Proceed to Checkout
            </button>
            <button onClick={() => setIsOpen(false)}
              className="w-full mt-3 font-dm text-[0.75rem] text-[#aaa] hover:text-[#555] transition-colors duration-150 text-center tracking-wide">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}

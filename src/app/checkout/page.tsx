"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/src/components/cart/cartStore";
import Link from "next/link";
import {
  submitCheckout,
  validateDiscountCode,
  type CheckoutFormData,
  type DiscountResult,
} from "@/src/utils/supabase/supabase-queries";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total } = useCart();

  const [form, setForm] = useState<CheckoutFormData>({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [discountInput, setDiscountInput] = useState("");
  const [discount, setDiscount] = useState<DiscountResult | null>(null);
  const [discountLoading, setDiscountLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── derived totals ──────────────────────────────────────
  const shipping = 0; // free shipping

  const discountAmount = (() => {
    if (!discount?.valid) return 0;
    if (discount.type === "percent") return Math.round((total * discount.value) / 100);
    return Math.min(discount.value, total); // fixed — can't exceed cart total
  })();

  const grandTotal = total - discountAmount + shipping;
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  // ── handlers ─────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) return;
    setDiscountLoading(true);
    const result = await validateDiscountCode(discountInput.trim(), total);
    setDiscount(result);
    setDiscountLoading(false);
  };

  const handlePlaceOrder = async () => {
    // Basic validation
    if (!form.email || !form.firstName || !form.lastName || !form.address || !form.city || !form.phone) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    if (items.length === 0) {
      setSubmitError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const result = await submitCheckout({
      form,
      items: items.map((i) => ({
        id: String(i.id),
        title: i.title,
        subtitle: i.subtitle,
        price: i.price,
        image: i.image,
        quantity: i.quantity,
      })),
      subtotal: total,
      discountCodeId: discount?.valid ? discount.id : null,
      discountCode: discount?.valid ? discount.code : null,
      discountAmount,
      shippingAmount: shipping,
    });

    setSubmitting(false);

    if (result.success) {
      router.push(`/order-confirmation?id=${result.orderId}`);
    } else {
      setSubmitError(result.errorMessage ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fffafa]" style={{ fontFamily: "var(--font-dm), sans-serif" }}>
      {/* Top bar */}
      <div className="border-b border-[#f0ede8] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#1a1a1a] text-[0.8rem] tracking-wide hover:text-[#555] transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to shop
          </Link>
          <span className="text-[1rem] font-semibold text-[#1a1a1a] tracking-wide" style={{ fontFamily: "var(--font-playfair), serif" }}>
            Checkout
          </span>
          <span className="text-[0.75rem] text-[#aaa] tracking-wide">
            {itemCount} item{itemCount !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Form ── */}
          <div>
            {/* Contact */}
            <section className="mb-8">
              <h2 className="text-[1.15rem] font-semibold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Contact
              </h2>
              <InputField
                id="email" name="email" type="email" placeholder="Email address"
                value={form.email} onChange={handleChange}
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                }
              />
            </section>

            {/* Delivery */}
            <section className="mb-8">
              <h2 className="text-[1.15rem] font-semibold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Delivery
              </h2>

              {/* Country */}
              <div className="mb-3">
                <div className="relative">
                  <label className="absolute left-4 top-2.5 text-[0.62rem] text-[#aaa] tracking-wide uppercase pointer-events-none">
                    Country / Region
                  </label>
                  <select
                    id="country" disabled
                    className="w-full pt-6 pb-2.5 px-4 pr-10 border border-[#e8e4e0] rounded-xl bg-[#f9f7f5] text-[0.85rem] text-[#1a1a1a] appearance-none cursor-not-allowed focus:outline-none"
                  >
                    <option value="PK">Pakistan</option>
                  </select>
                </div>
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField id="firstName" name="firstName" placeholder="First name" value={form.firstName} onChange={handleChange} />
                <InputField id="lastName" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} />
              </div>

              <div className="mb-3">
                <InputField
                  id="address" name="address" placeholder="Address" value={form.address} onChange={handleChange}
                  icon={
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <InputField id="city" name="city" placeholder="City" value={form.city} onChange={handleChange} />
                <InputField id="postalCode" name="postalCode" placeholder="Postal code (optional)" value={form.postalCode ?? ""} onChange={handleChange} required={false} />
              </div>

              <InputField
                id="phone" name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange}
                prefix="+92"
                icon={
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.5 16z" />
                  </svg>
                }
              />
            </section>

            {/* Discount code */}
            <section className="mb-8">
              <h2 className="text-[1.15rem] font-semibold text-[#1a1a1a] mb-4" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Discount Code
              </h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter code (e.g. NOVA20)"
                  value={discountInput}
                  onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                  className="flex-1 h-[50px] border border-[#e8e4e0] rounded-xl px-4 text-[0.85rem] text-[#1a1a1a] placeholder:text-[#bbb] focus:outline-none focus:border-[#1a1a1a] uppercase"
                />
                <button
                  onClick={handleApplyDiscount}
                  disabled={discountLoading || !discountInput.trim()}
                  className="px-5 h-[50px] bg-[#1a1a1a] text-white rounded-xl text-[0.8rem] font-semibold tracking-wide hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  {discountLoading ? "…" : "Apply"}
                </button>
              </div>
              {discount && (
                <p className={`mt-2 text-[0.75rem] ${discount.valid ? "text-[#7eb89a]" : "text-red-400"}`}>
                  {discount.valid
                    ? `✓ ${discount.type === "percent" ? `${discount.value}% off` : `Rs ${discount.value} off`} applied!`
                    : `✗ ${discount.errorMessage}`}
                </p>
              )}
            </section>

            {/* Payment */}
            <section className="mb-8">
              <h2 className="text-[1.15rem] font-semibold text-[#1a1a1a] mb-1" style={{ fontFamily: "var(--font-playfair), serif" }}>
                Payment
              </h2>
              <p className="text-[0.72rem] text-[#aaa] mb-3 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                All transactions are secure and encrypted.
              </p>
              <div className="border border-[#1a1a1a] rounded-xl px-5 py-4 bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f5f3f0] flex items-center justify-center">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" />
                    </svg>
                  </div>
                  <span className="text-[0.85rem] text-[#1a1a1a] font-medium">Cash on Delivery (COD)</span>
                </div>
                <span className="text-[0.7rem] text-[#888] bg-[#f5f3f0] px-3 py-1 rounded-full">Only option</span>
              </div>
            </section>

            {/* Error */}
            {submitError && (
              <p className="mb-4 text-[0.8rem] text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                {submitError}
              </p>
            )}

            {/* Submit */}
            <button
              type="button"
              onClick={handlePlaceOrder}
              disabled={items.length === 0 || submitting}
              className="w-full h-[54px] bg-[#1a1a1a] text-white text-[0.82rem] font-semibold tracking-[0.12em] uppercase rounded-full hover:bg-[#333] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Placing Order…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  Place Order
                </>
              )}
            </button>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-[#f0ede8] rounded-2xl overflow-hidden shadow-sm">
              <div className="px-6 py-4 border-b border-[#f0ede8] flex items-center justify-between">
                <h2 className="text-[1rem] font-semibold text-[#1a1a1a]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  Order Summary
                </h2>
                <span className="text-[0.72rem] text-[#aaa] bg-[#f5f3f0] px-2.5 py-1 rounded-full">
                  {itemCount} item{itemCount !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="px-6 py-4 flex flex-col gap-4 max-h-[340px] overflow-y-auto">
                {items.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-[0.8rem] text-[#bbb]">Your cart is empty</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start">
                      <div className="relative shrink-0">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#f5f3f0]">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#1a1a1a] text-white text-[0.6rem] font-bold flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[0.83rem] font-semibold text-[#1a1a1a] leading-tight truncate" style={{ fontFamily: "var(--font-playfair), serif" }}>
                          {item.title}
                        </p>
                        <p className="text-[0.7rem] text-[#aaa] mt-0.5 truncate">{item.subtitle}</p>
                      </div>
                      <p className="text-[0.83rem] font-bold text-[#1a1a1a] shrink-0">
                        Rs {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="px-6 py-5 border-t border-[#f0ede8] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[0.78rem] text-[#888]">Subtotal</span>
                  <span className="text-[0.82rem] font-semibold text-[#1a1a1a]">Rs {total.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="text-[0.78rem] text-[#7eb89a]">Discount ({discount?.code})</span>
                    <span className="text-[0.82rem] font-semibold text-[#7eb89a]">− Rs {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[0.78rem] text-[#888]">Shipping</span>
                  <span className="text-[0.82rem] font-semibold text-[#7eb89a]">Free</span>
                </div>
                <div className="border-t border-[#f0ede8] pt-3 flex items-center justify-between">
                  <span className="text-[0.9rem] font-semibold text-[#1a1a1a]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                    Total
                  </span>
                  <div className="text-right">
                    <span className="text-[0.65rem] text-[#aaa] mr-1">PKR</span>
                    <span className="text-[1.3rem] font-bold text-[#1a1a1a]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                      Rs {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 text-[0.7rem] text-[#aaa] bg-[#f9f7f5] rounded-xl px-4 py-2.5">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  Secure checkout · Cash on Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable input ── */
interface InputFieldProps {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  prefix?: string;
  required?: boolean;
}

function InputField({ id, name, type = "text", placeholder, value, onChange, icon, prefix, required = true }: InputFieldProps) {
  return (
    <div className="relative group">
      {prefix && (
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[0.8rem] text-[#888] font-medium select-none z-10">
          {prefix}
        </span>
      )}
      <input
        id={id} name={name} type={type} placeholder={placeholder}
        value={value} onChange={onChange} required={required} autoComplete="off"
        className={`
          w-full h-[50px] border border-[#e8e4e0] rounded-xl bg-white text-[0.85rem] text-[#1a1a1a] placeholder:text-[#bbb]
          transition-all duration-200 focus:outline-none focus:border-[#1a1a1a] focus:ring-2 focus:ring-[#1a1a1a]/8 hover:border-[#ccc]
          ${prefix ? "pl-12" : icon ? "pl-10" : "pl-4"}
          ${icon ? "pr-10" : "pr-4"}
        `}
        style={{ fontFamily: "var(--font-dm), sans-serif" }}
      />
      {icon && !prefix && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
      )}
      {icon && prefix && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
      )}
    </div>
  );
}
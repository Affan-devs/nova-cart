// src/lib/supabase-queries.ts

import { createClient } from "./client";
import type { CategoryRow, CustomerUpdate, ProductRow, UUID } from "@/src/lib/type";

type SupabaseClient = ReturnType<typeof createClient>;

// ============================================================
// UI TYPES  (camelCase, consumed by components)
// ============================================================

export interface Product {
  id: UUID;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  effectivePrice: number;
  discountPct: number | null;
  image: string;
  images: string[];
  inStock: boolean;
  stockQty: number;
  category: string; // slug
  categoryId: UUID | null;
}

export interface Category {
  id: UUID;
  slug: string;
  name: string;
  tagline: string;
  image: string;
  sortOrder: number;
}

export interface DiscountResult {
  valid: boolean;
  type: "percent" | "fixed" | null;
  value: number;
  id: UUID | null;
  code: string;
  errorMessage?: string;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode?: string;
  phone: string;
}

export interface CheckoutCartItem {
  id: string; // always string UUID for DB
  title: string;
  subtitle?: string;
  price: number;
  image?: string;
  quantity: number;
  originalPrice?: number;
}

export interface CheckoutPayload {
  form: CheckoutFormData;
  items: CheckoutCartItem[];
  subtotal: number;
  discountCodeId?: UUID | null;
  discountCode?: string | null;
  discountAmount?: number;
  shippingAmount?: number;
  notes?: string;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: UUID;
  errorMessage?: string;
}

// ============================================================
// MAPPERS
// ============================================================

function mapProduct(
  row: ProductRow & { categories?: Pick<CategoryRow, "slug"> | null }
): Product {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle ?? "",
    description: row.description ?? "",
    price: Number(row.price),
    effectivePrice: Number(row.effective_price ?? row.price),
    discountPct: row.discount_pct != null ? Number(row.discount_pct) : null,
    image: row.image_url ?? "",
    images:
      Array.isArray(row.images) && row.images.length > 0
        ? row.images
        : row.image_url
          ? [row.image_url]
          : [],
    inStock: row.in_stock,
    stockQty: row.stock_qty,
    category: row.categories?.slug ?? "",
    categoryId: row.category_id,
  };
}

function mapCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline ?? "",
    image: row.image_url ?? "",
    sortOrder: row.sort_order,
  };
}

// ============================================================
// PRODUCT QUERIES
// ============================================================

export async function fetchProducts(
  supabase: SupabaseClient = createClient()
): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(slug)")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchProducts]", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    mapProduct(row as ProductRow & { categories: Pick<CategoryRow, "slug"> | null })
  );
}

export async function fetchProductById(
  id: string,
  supabase: SupabaseClient = createClient()
): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(slug)")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[fetchProductById]", error.message);
    return null;
  }

  return data
    ? mapProduct(data as ProductRow & { categories: Pick<CategoryRow, "slug"> | null })
    : null;
}

export async function fetchRelatedProducts(
  currentProductId: string,
  categorySlug: string,
  limit = 4,
  supabase: SupabaseClient = createClient()
): Promise<Product[]> {
  const { data: catData } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (!catData) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(slug)")
    .eq("category_id", catData.id)
    .neq("id", currentProductId)
    .eq("in_stock", true)
    .limit(limit);

  if (error) {
    console.error("[fetchRelatedProducts]", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    mapProduct(row as ProductRow & { categories: Pick<CategoryRow, "slug"> | null })
  );
}

export async function fetchProductsByCategory(
  categorySlug: string,
  supabase: SupabaseClient = createClient()
): Promise<Product[]> {
  const { data: catData } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", categorySlug)
    .single();

  if (!catData) return [];

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(slug)")
    .eq("category_id", catData.id)
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[fetchProductsByCategory]", error.message);
    return [];
  }

  return (data ?? []).map((row) =>
    mapProduct(row as ProductRow & { categories: Pick<CategoryRow, "slug"> | null })
  );
}

// ============================================================
// CATEGORY QUERIES
// ============================================================

export async function fetchCategories(
  supabase: SupabaseClient = createClient()
): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[fetchCategories]", error.message);
    return [];
  }

  return (data ?? []).map(mapCategory);
}

export async function fetchCategoryBySlug(
  slug: string,
  supabase: SupabaseClient = createClient()
): Promise<Category | null> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("[fetchCategoryBySlug]", error.message);
    return null;
  }

  return data ? mapCategory(data) : null;
}

// ============================================================
// DISCOUNT CODE
// ============================================================

export async function validateDiscountCode(
  code: string,
  cartTotal: number,
  supabase: SupabaseClient = createClient()
): Promise<DiscountResult> {
  const { data, error } = await supabase
    .from("discount_codes")
    .select("*")
    .eq("code", code.toUpperCase().trim())
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return { valid: false, type: null, value: 0, id: null, code, errorMessage: "Invalid or expired code." };
  }

  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { valid: false, type: null, value: 0, id: null, code, errorMessage: "This code has expired." };
  }

  if (data.max_uses !== null && data.used_count >= data.max_uses) {
    return { valid: false, type: null, value: 0, id: null, code, errorMessage: "This code has reached its usage limit." };
  }

  if (cartTotal < Number(data.min_order_value)) {
    return {
      valid: false,
      type: null,
      value: 0,
      id: null,
      code,
      errorMessage: `Minimum order of Rs ${Number(data.min_order_value).toLocaleString()} required.`,
    };
  }

  return {
    valid: true,
    type: data.discount_type as "percent" | "fixed",
    value: Number(data.discount_value),
    id: data.id,
    code: data.code,
  };
}

// ============================================================
// CHECKOUT
// ============================================================

export async function submitCheckout(
  payload: CheckoutPayload,
  supabase: SupabaseClient = createClient()
): Promise<CheckoutResult> {
  const {
    form,
    items,
    subtotal,
    discountCodeId = null,
    discountCode = null,
    discountAmount = 0,
    shippingAmount = 0,
    notes,
  } = payload;

  const email = form.email.trim().toLowerCase();
  const phone = form.phone.replace(/^\+92/, "").trim() || null;

  // ── 1. Find or create customer ───────────────────────────
  console.log("Before customer");
  const { data: existing } = await supabase
    .from("customers")
    .select("id")
    .eq("email", email)
    .maybeSingle(); // maybeSingle won't error on 0 rows

  let customerId: UUID;

  if (existing) {
    // Update to latest shipping details
    const updatePayload: CustomerUpdate = {
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      address: form.address.trim() || null,
      city: form.city.trim() || null,
      postal_code: form.postalCode?.trim() || null,
      phone,
    };

    const { error: updateError } = await supabase
      .from("customers")
      .update(updatePayload)
      .eq("id", existing.id);

    if (updateError) {
      console.error("[submitCheckout] customer update:", updateError.message);
    }

    customerId = existing.id;
  } else {
    const { data: newCustomer, error: insertError } = await supabase
      .from("customers")
      .insert({
        email,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        address: form.address.trim() || null,
        city: form.city.trim() || null,
        postal_code: form.postalCode?.trim() || null,
        phone,
        country: "PK",
      })
      .select("id")
      .maybeSingle();

    if (insertError || !newCustomer) {
      console.error("[submitCheckout] customer insert:", insertError?.message);
      return { success: false, errorMessage: "Failed to save your details. Please try again." };
    }

    customerId = newCustomer.id;
  }
  console.log("After customer");
  // ── 2. Create order ──────────────────────────────────────
  const total = subtotal - discountAmount + shippingAmount;

  const { data: newOrder, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_id: customerId,
      discount_code_id: discountCodeId,
      discount_code: discountCode,
      discount_amount: discountAmount,
      subtotal,
      shipping_amount: shippingAmount,
      total,
      status: "pending" as const,
      payment_method: "cod" as const,
      ship_first_name: form.firstName.trim(),
      ship_last_name: form.lastName.trim(),
      ship_email: email,
      ship_phone: phone,
      ship_address: form.address.trim(),
      ship_city: form.city.trim(),
      ship_postal_code: form.postalCode?.trim() || null,
      ship_country: "PK",
      notes: notes?.trim() || null,
    })
    .select("id")
    .maybeSingle();

  if (orderError || !newOrder) {
    console.error("[submitCheckout] order insert:", orderError?.message);
    return { success: false, errorMessage: "Failed to place your order. Please try again." };
  }

  const orderId: UUID = newOrder.id;

  // ── 3. Insert order items ────────────────────────────────
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(
      items.map((item) => ({
        order_id: orderId,
        product_id: item.id || null,
        product_title: item.title,
        product_subtitle: item.subtitle ?? null,
        product_image: item.image ?? null,
        unit_price: item.price,
        original_price: item.originalPrice ?? null,
        quantity: item.quantity,
        line_total: item.price * item.quantity,
      }))
    );

  if (itemsError) {
    console.error("[submitCheckout] order_items insert:", itemsError.message);
    // Order is placed — don't block the user, just log
  }

  // ── 4. Increment discount code usage ────────────────────
  if (discountCodeId) {
    // Fetch current count then increment (RPC not required)
    const { data: codeRow } = await supabase
      .from("discount_codes")
      .select("used_count")
      .eq("id", discountCodeId)
      .maybeSingle();

    if (codeRow) {
      await supabase
        .from("discount_codes")
        .update({ used_count: (codeRow.used_count ?? 0) + 1 })
        .eq("id", discountCodeId);
    }
  }

  return { success: true, orderId };
}
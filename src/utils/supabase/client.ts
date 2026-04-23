import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../../lib/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Browser / client-component Supabase client.
 * Typed against the full Database schema so all .from() calls
 * are fully type-checked.
 *
 * Usage in client components:
 *   import { createClient } from "@/src/utils/supabase/client";
 *   const supabase = createClient();
 */
export const createClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseKey);
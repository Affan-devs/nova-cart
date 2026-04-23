import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../../lib/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

/**
 * Server-component / Route-handler Supabase client.
 * Pass the awaited cookie store from next/headers.
 *
 * Usage in Server Components or Route Handlers:
 *   import { cookies } from "next/headers";
 *   import { createClient } from "@/src/utils/supabase/server";
 *   const supabase = createClient(await cookies());
 */
export const createClient = (
    cookieStore: Awaited<ReturnType<typeof cookies>>
) => {
    return createServerClient<Database>(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch {
                    // Called from a Server Component — safe to ignore.
                    // Middleware handles session refresh.
                }
            },
        },
    });
};
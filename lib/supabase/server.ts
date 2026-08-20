import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase client for use on the server: Server Components, Route
 * Handlers, and Server Actions. Handles auth cookies so the user's
 * session is available server-side.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options as CookieOptions);
            });
          } catch {
            // setAll can be called from a Server Component where
            // cookies can't be set. Safe to ignore if middleware
            // is refreshing sessions (added in a later step).
          }
        },
      },
    }
  );
}

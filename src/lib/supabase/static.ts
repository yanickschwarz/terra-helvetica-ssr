import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

/**
 * Plain Supabase client for use during build-time generation
 * (e.g., generateStaticParams, generateMetadata) where the cookies()
 * API is not available.
 *
 * Do NOT use this client for authenticated requests in Server Components
 * - use createClient from server.ts for that.
 */
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

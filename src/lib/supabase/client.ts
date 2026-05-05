"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/integrations/supabase/types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

// Singleton browser client for backward compatibility
export const supabase = createClient();

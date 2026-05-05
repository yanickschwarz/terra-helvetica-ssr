// Backward-compat shim. Re-exports the browser Supabase client.
// New code should use @/lib/supabase/client (browser) or @/lib/supabase/server (server).
export { supabase } from "@/lib/supabase/client";

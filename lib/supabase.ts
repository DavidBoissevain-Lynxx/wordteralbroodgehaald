import { createClient } from "@supabase/supabase-js";

// Used on the server and in the browser. The publishable key is safe to share:
// the rules in supabase/schema.sql decide what it is allowed to do.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

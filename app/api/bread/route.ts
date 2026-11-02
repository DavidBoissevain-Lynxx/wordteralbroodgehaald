import { supabase } from "@/lib/supabase";

// Runs on the server: saves the new status in the database.
export async function POST(request: Request) {
  const { isGettingBread } = await request.json();

  await supabase.from("bread").update({ is_getting_bread: isGettingBread }).eq("id", 1);

  return Response.json({ ok: true });
}

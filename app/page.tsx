import { connection } from "next/server";

import { BreadButton } from "@/components/bread-button";
import { supabase } from "@/lib/supabase";

// A Server Component: this runs on the server, every time someone opens the page.
export default async function Home() {
  await connection();

  const { data } = await supabase.from("bread").select("is_getting_bread").single();

  return (
    // bg-checkered
    <main className="bg-checkered flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-4 py-8 text-center text-white sm:gap-12">
      <h1 className="w-full border-y border-white/30 py-4 text-3xl font-black italic text-shadow-lg sm:text-5xl">
        Wordt er al brood gehaald?
      </h1>

      <BreadButton initialValue={data?.is_getting_bread} />
    </main>
  );
}

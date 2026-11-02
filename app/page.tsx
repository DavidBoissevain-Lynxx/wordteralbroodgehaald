import Link from "next/link";
import { connection } from "next/server";

import { BreadCard } from "@/components/home/bread-card";
import { supabase } from "@/lib/supabase";

// A Server Component: this runs on the server, every time someone opens the page.
export default async function Home() {
  await connection();

  const { data } = await supabase.from("bread").select("is_getting_bread").single();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted p-4">
      <BreadCard initialValue={data?.is_getting_bread} />
      <Link
        href="/info"
        className="fixed right-4 bottom-3 text-xs text-muted-foreground hover:underline"
      >
        Info en privacy
      </Link>
    </main>
  );
}

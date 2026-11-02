import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

// The logic both pages share: remember the status, listen for changes, save clicks.
export function useBread(initialValue: boolean) {
  const [isGettingBread, setIsGettingBread] = useState(initialValue);

  // When a colleague clicks, the database tells us and we update the button.
  useEffect(() => {
    const channel = supabase
      .channel("bread")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bread" },
        (change) => setIsGettingBread(change.new.is_getting_bread),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // When you click, the button changes right away and the database is updated.
  async function toggle() {
    setIsGettingBread(!isGettingBread);
    await supabase.from("bread").update({ is_getting_bread: !isGettingBread }).eq("id", 1);
  }

  return { isGettingBread, toggle };
}

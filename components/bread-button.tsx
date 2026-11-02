"use client";

import { useEffect, useState } from "react";

import { FancyButton } from "@/components/fancy-button";
import { supabase } from "@/lib/supabase";

// A Client Component: this runs in the browser, so it can react to clicks.
export function BreadButton({ initialValue }: { initialValue: boolean }) {
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
  async function handleClick() {
    setIsGettingBread(!isGettingBread);
    await supabase.from("bread").update({ is_getting_bread: !isGettingBread }).eq("id", 1);
  }

  return <FancyButton isOn={isGettingBread} onClick={handleClick} />;
}

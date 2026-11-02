"use client";

import confetti from "canvas-confetti";
import { Sandwich } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

// A Client Component: this runs in the browser, so it can react to clicks.
export function BreadCard({ initialValue }:
  {
    initialValue: boolean
  }
) {

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

  // When you click, the button changes right away and the API saves the new status.
  async function toggle() {
    // Confetti when you offer to get bread, not when you cancel.
    if (!isGettingBread) confetti();

    setIsGettingBread(!isGettingBread);
    await fetch("/api/bread", {
      method: "POST",
      body: JSON.stringify({ isGettingBread: !isGettingBread }),
    });
  }

  return (
    <Card className="w-full max-w-sm gap-6 px-2 py-6 text-center shadow-sm">
      <CardHeader className="justify-items-center gap-2">
        <div
          className={`mb-2 flex size-16 items-center justify-center rounded-full ${isGettingBread
            ? "bg-green-100 text-green-600"
            : "bg-muted text-muted-foreground"
            }`}
        >
          <Sandwich className="size-8" />
        </div>

        <CardTitle className="text-2xl font-semibold">
          Wordt er al brood gehaald?
        </CardTitle>
        <CardDescription
          className={isGettingBread ? "text-base text-green-600" : "text-base"}
        >
          {isGettingBread ? "Ja, iemand is onderweg!" : "Nee, nog niet :("}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          variant={isGettingBread ? "outline" : "default"}
          size="lg"
          className="w-full cursor-pointer"
          onClick={toggle}
        >
          {isGettingBread ? "Toch niet" : "Ik haal brood!"}
        </Button>
      </CardContent>
    </Card>
  );
}

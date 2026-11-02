"use client";

import confetti from "canvas-confetti";
import { Sandwich } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBread } from "@/hooks/use-bread";
import { cn } from "@/lib/utils";

// A Client Component: this runs in the browser, so it can react to clicks.
export function BreadCard({ initialValue }: { initialValue: boolean }) {
  const { isGettingBread, toggle } = useBread(initialValue);

  // Confetti when you offer to get bread, not when you cancel.
  function handleClick() {
    if (!isGettingBread) confetti();
    toggle();
  }

  return (
    <Card className="w-full max-w-sm gap-6 px-2 py-6 text-center shadow-sm">
      <CardHeader className="justify-items-center gap-2">
        <div
          className={cn(
            "mb-2 flex size-16 items-center justify-center rounded-full",
            isGettingBread
              ? "bg-green-100 text-green-600"
              : "bg-muted text-muted-foreground",
          )}
        >
          <Sandwich className="size-8" />
        </div>

        <CardTitle className="text-2xl font-semibold">
          Wordt er al brood gehaald?
        </CardTitle>
        <CardDescription
          className={cn("text-base", isGettingBread && "text-green-600")}
        >
          {isGettingBread ? "Ja, iemand is onderweg" : "Nee, nog niet"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Button
          variant={isGettingBread ? "outline" : "default"}
          size="lg"
          className="w-full cursor-pointer"
          onClick={handleClick}
        >
          {isGettingBread ? "Toch niet" : "Ik haal brood!"}
        </Button>
      </CardContent>
    </Card>
  );
}

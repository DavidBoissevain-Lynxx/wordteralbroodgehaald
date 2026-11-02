"use client";

import { FancyButton } from "@/components/mariokart/fancy-button";
import { useBread } from "@/hooks/use-bread";

export function BreadButton({ initialValue }: { initialValue: boolean }) {
  const { isGettingBread, toggle } = useBread(initialValue);

  return <FancyButton isOn={isGettingBread} onClick={toggle} />;
}

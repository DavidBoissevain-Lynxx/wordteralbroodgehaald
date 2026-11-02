import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Only the looks live here and in fancy-button.css: no state and no database.
export function FancyButton({
  isOn,
  onClick,
}: {
  isOn: boolean;
  onClick: () => void;
}) {
  const chevronClass = isOn ? "animate-chevron-out opacity-0" : "";

  return (
    <>
      <div className={cn("relative", isOn && "animate-activate motion-reduce:animate-none")}>
        {isOn && <EnergyWaves />}

        <div className="relative flex items-center gap-1 drop-shadow-xl sm:gap-3">
          <Chevron className={chevronClass} />

          <Button
            variant="ghost"
            onClick={onClick}
            className="hexagon h-auto cursor-pointer rounded-none border-0 bg-zinc-900 p-1 hover:bg-zinc-900 hover:brightness-110 focus-visible:bg-yellow-300"
          >
            <span className="hexagon block bg-linear-to-b from-white via-zinc-200 to-zinc-400 p-2 sm:p-3">
              <span
                className={cn(
                  "hexagon flex h-28 w-[min(68vw,36rem)] items-center justify-center bg-linear-to-b text-7xl font-black text-zinc-900 italic sm:h-48 sm:text-9xl",
                  isOn ? "from-lime-300 to-green-500" : "from-red-400 to-red-700",
                )}
              >
                {isOn ? <span className="text-shine animate-shine pr-3">JA!</span> : "NEE"}
              </span>
            </span>
          </Button>

          <Chevron className={cn("-scale-x-100", chevronClass)} />
        </div>

        {isOn && <Sparks />}
      </div>

      <p className="min-h-8 text-xl font-medium text-shadow-md sm:text-2xl" aria-live="polite">
        {isOn ? "Een collega haalt het brood" : "Nog niemand onderweg. Ga jij?"}
      </p>
    </>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 100"
      className={cn("h-24 w-6 fill-yellow-300 stroke-zinc-900 stroke-2 sm:h-40 sm:w-10", className)}
      aria-hidden
    >
      <polygon points="30,0 40,6 12,47 0,47" />
      <polygon points="0,53 12,53 40,94 30,100" />
    </svg>
  );
}

// How far the pale >>> trails stay from the edges of the drawing.
const TRAILS = [140, 108, 76];

// Soft light behind the button, so it seems to come from under it.
function EnergyWaves() {
  return (
    <div
      className="pointer-events-none absolute -inset-x-[7%] -inset-y-[38%] motion-reduce:hidden"
      aria-hidden
    >
      <div className="absolute inset-x-[12%] inset-y-[22%] animate-energy blur-lg">
        <div className="hexagon size-full bg-linear-to-b from-yellow-200 to-lime-300" />
      </div>

      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="none"
        className="absolute top-[-9%] -left-[2.6%] h-[118%] w-[105.2%] fill-none stroke-white/20 stroke-[4] blur-[1px]"
      >
        {TRAILS.map((distance, index) => (
          <g
            key={distance}
            className="animate-trail"
            style={{ animationDelay: `${250 + index * 50}ms` }}
          >
            <polyline points={`${1132 - distance},150 ${1200 - distance},300 ${1132 - distance},450`} />
            <polyline points={`${distance + 68},150 ${distance},300 ${distance + 68},450`} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Spreads the sparks around without any randomness, so the server and the
// browser draw exactly the same thing.
const SPARKS = Array.from({ length: 14 }, (_, index) => ({
  left: (index * 38) % 100,
  top: (index * 61) % 100,
  delay: 60 + (index * 37) % 260,
}));

// Tiny gold specks that twinkle around and on top of the button.
function Sparks() {
  return (
    <div
      className="pointer-events-none absolute -inset-x-[8%] -inset-y-[35%] motion-reduce:hidden"
      aria-hidden
    >
      {SPARKS.map(({ left, top, delay }) => (
        <span
          key={`${left}-${top}`}
          className="absolute size-[2px] animate-twinkle rounded-full bg-yellow-200"
          style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}

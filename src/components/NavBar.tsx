import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fireRainbow, fireFireworks } from "@/lib/confetti";

const links = [
  { to: "/", label: "Prank" },
  { to: "/reveal", label: "Reveal" },
  { to: "/reel", label: "Reel" },
  { to: "/gallery", label: "Gallery" },
  { to: "/certificate", label: "License" },
  { to: "/roast", label: "Roast" },
  { to: "/special", label: "Why" },
  { to: "/video", label: "Video" },
  { to: "/final", label: "Finale" },
] as const;

export function NavBar() {
  const [clicks, setClicks] = useState(0);
  const [vip, setVip] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (clicks >= 5 && !vip) {
      setVip(true);
      fireRainbow();
      fireFireworks(2500);
      setTimeout(() => router.navigate({ to: "/secret" }), 600);
    }
  }, [clicks, vip, router]);

  return (
    <nav className="sticky top-0 z-40 px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="glass mx-auto flex max-w-5xl items-center justify-between gap-2 rounded-2xl px-2 py-2 sm:px-3">
        <button
          onClick={() => setClicks((c) => c + 1)}
          className="flex shrink-0 items-center gap-1 rounded-xl px-2 py-1 text-sm font-bold sm:gap-2"
          aria-label="logo"
        >
          <span className="text-lg sm:text-xl">🎂</span>
          <span className="gradient-text hidden sm:inline">Mediuu.fest</span>
        </button>
        <div className="flex flex-1 gap-0.5 overflow-x-auto no-scrollbar text-[10px] sm:gap-1 sm:text-xs">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="shrink-0 rounded-full px-2 py-1 text-foreground/70 transition hover:bg-white/10 hover:text-foreground sm:px-3 sm:py-1.5"
              activeProps={{ className: "bg-white/15 text-foreground !text-foreground" }}
              activeOptions={{ exact: true }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
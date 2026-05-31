import { useMemo } from "react";

const BALLOONS = ["🎈", "🎈", "🎀", "🎂", "🎁", "🌟", "✨", "💖", "🎉"];

export function FloatingDecor({ density = 14 }: { density?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: density }).map((_, i) => ({
        emoji: BALLOONS[i % BALLOONS.length],
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 10 + Math.random() * 12,
        size: 18 + Math.random() * 28,
      })),
    [density]
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: `${it.left}%`,
            bottom: "-10vh",
            fontSize: `${it.size}px`,
            animation: `float-up ${it.duration}s linear ${it.delay}s infinite`,
            filter: "drop-shadow(0 4px 12px rgba(255,79,163,0.4))",
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}

export function Sparkles({ count = 20 }: { count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        size: 4 + Math.random() * 8,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {items.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px white`,
            animation: `sparkle 2.4s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
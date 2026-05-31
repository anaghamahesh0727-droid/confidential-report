import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";

export const Route = createFileRoute("/special")({
  head: () => ({ meta: [{ title: "❤️ Why You're Special" }] }),
  component: Special,
});

const REASONS = [
  "You make boring days fun.",
  "You always support me.",
  "You make every memory memorable.",
  "You are annoying but important.",
  "You are family-level friend.",
  "Life is better with you around.",
  "You always bring laughter.",
  "You make ordinary days special.",
  "You never judge, you just listen.",
  "You're always there when I need you.",
  "You make me laugh even on bad days.",
  "You understand me without words.",
  "You're genuine and real, no fake vibes.",
  "You celebrate my wins like your own.",
  "You're loyal beyond measure.",
  "You make every moment unforgettable.",
  "You're the kind of friend everyone wishes for.",
  "You bring positive energy everywhere.",
  "You're honest even when it's hard.",
  "You accept me exactly as I am.",
];

function Special() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-20">
      <NavBar />
      {/* floating hearts */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="absolute text-2xl" style={{
            left: `${Math.random()*100}%`, bottom: `-10vh`,
            animation: `float-up ${10 + Math.random()*10}s linear ${Math.random()*8}s infinite`,
            filter: "drop-shadow(0 4px 14px rgba(255,79,163,0.6))",
          }}>❤️</span>
        ))}
      </div>
      <div className="relative mx-auto mt-6 max-w-4xl px-4">
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-black gradient-warm-text text-glow">Why You're Special</h1>
          <p className="mt-2 text-sm text-muted-foreground">Receipts, attached.</p>
        </header>
        <div className="grid gap-3 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <motion.div
              key={r}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-strong flex items-start gap-3 rounded-2xl p-5"
            >
              <span className="text-3xl">❤️</span>
              <p className="text-lg font-semibold">{r}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
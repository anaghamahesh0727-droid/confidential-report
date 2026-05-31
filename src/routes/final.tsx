import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Sparkles } from "@/components/FloatingDecor";
import { fireConfetti, fireFireworks, fireHearts } from "@/lib/confetti";

export const Route = createFileRoute("/final")({
  head: () => ({ meta: [{ title: "🎂 Happy Birthday Hemanth Kumar K R" }] }),
  component: Final,
});

const LINES = [
  "Happy Birthday Hemanth Kumar K R ❤️",
  "Thank you for being my Media, my Mediuu, my VIP, my Stress Booster, my Headache Person and one of my favorite humans.",
  "Life would be much less entertaining without your nonsense.",
  "Thank you for every laugh, every memory, every random reel, every unnecessary argument and every unforgettable moment.",
  "May this year bring you happiness, success, adventures, good health, laughter and everything you wish for.",
  "Stay crazy. Stay happy. Stay legendary.",
  "Never change the amazing person you are.",
  "Happy Birthday Mediaaa 🎉❤️",
];

function Final() {
  useEffect(() => {
    fireConfetti(); fireFireworks(5000); fireHearts();
    const t = setInterval(fireHearts, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <Sparkles count={40} />
      <div className="relative mx-auto mt-8 max-w-3xl px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180 }} className="text-7xl">🎂</motion.div>
        <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black gradient-text text-glow">
          Happy Birthday<br />Hemanth Kumar K R ❤️
        </h1>

        <div className="glass-strong mt-8 space-y-4 rounded-3xl p-6 text-left sm:p-8">
          {LINES.slice(1).map((l, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`text-base sm:text-lg leading-relaxed ${i === LINES.length - 2 ? "text-center font-bold gradient-warm-text text-glow text-2xl" : "text-foreground/90"}`}
            >
              {l}
            </motion.p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <button onClick={() => { fireConfetti(); fireFireworks(2500); fireHearts(); }} className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg neon-glow">
            🎊 One More Time
          </button>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">Made with too much ❤️ for Mediaaa.</p>
      </div>
    </div>
  );
}
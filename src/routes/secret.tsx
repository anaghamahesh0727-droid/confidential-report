import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { fireRainbow, fireFireworks, fireHearts } from "@/lib/confetti";

export const Route = createFileRoute("/secret")({
  head: () => ({ meta: [{ title: "🎁 VIP MODE ACTIVATED" }] }),
  component: Secret,
});

function Secret() {
  useEffect(() => {
    fireRainbow(); fireFireworks(3000); fireHearts();
  }, []);
  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <div className="mx-auto mt-10 max-w-2xl px-4 text-center">
        <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="text-7xl">🌈</motion.div>
        <h1 className="mt-4 text-3xl sm:text-5xl font-black gradient-text text-glow">VIP MODE ACTIVATED 😂</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Congratulations. You have unlocked the <b className="text-foreground">secret level of nonsense</b>.
        </p>
        <div className="glass-strong mt-6 rounded-3xl p-6 text-left">
          <p className="text-sm font-semibold text-muted-foreground">VIP Perks Unlocked</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li>🎟️ Lifetime access to Mediaaa's reels at 3 AM</li>
            <li>🎟️ Free unlimited headaches, on the house</li>
            <li>🎟️ Backstage pass to the Drama King concert</li>
            <li>🎟️ Bragging rights in every group chat</li>
          </ul>
        </div>
        <Link to="/final" className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg">
          Continue to Finale →
        </Link>
      </div>
    </div>
  );
}
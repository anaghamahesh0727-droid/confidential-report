import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { Sparkles } from "@/components/FloatingDecor";
import { fireConfetti, fireFireworks } from "@/lib/confetti";

export const Route = createFileRoute("/reveal")({
  head: () => ({ meta: [{ title: "🎉 Happy Birthday Mediaaa" }] }),
  component: Reveal,
});

const TITLE = "HAPPY BIRTHDAY MEDIAAA 🎂";


function Reveal() {
  const [typed, setTyped] = useState("");
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    fireConfetti();
    fireFireworks(4000);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(TITLE.slice(0, i));
      if (i >= TITLE.length) clearInterval(id);
    }, 70);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <Sparkles count={30} />
      <div className="relative mx-auto mt-10 max-w-3xl px-4 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 12 }} className="mx-auto text-[88px] leading-none">
          🎂
        </motion.div>
        <h1 className="mt-4 text-3xl sm:text-5xl md:text-6xl font-black gradient-text text-glow min-h-[1.2em]">
          {typed}<span className="animate-pulse">|</span>
        </h1>


        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3 }} className="glass mt-10 rounded-3xl p-6 text-left">
          <p className="text-sm text-muted-foreground">A whole surprise experience awaits you, Mediaaa. Buckle up — there are 9 more stops on this ride.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/reel" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg">▶ Start the Cinematic Reel</Link>
            <button onClick={() => { fireConfetti(); fireFireworks(1500); }} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">🎊 More Confetti</button>
            <button onClick={() => setMuted((m) => !m)} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold">
              {muted ? "🔇 Music Off" : "🔊 Music On"}
            </button>
          </div>
        </motion.div>

        {!muted && (
          <audio autoPlay loop>
            <source src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_d1718beff5.mp3?filename=birthday-party-150929.mp3" />
          </audio>
        )}
      </div>
    </div>
  );
}
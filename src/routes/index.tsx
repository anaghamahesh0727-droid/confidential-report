import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti, fireFireworks } from "@/lib/confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "⚠️ Official Notice for Hemanth Kumar" },
      { name: "description", content: "Suspicious nonsense activity detected." },
    ],
  }),
  component: Index,
});

const REPORTS = [
  "Sending reels at 3 AM",
  "Creating headaches professionally",
  "Excessive VIP behavior detected",
  "Media activity beyond acceptable limits",
  "Drama King certification verified",
  "Stress Booster level: Maximum",
];

function beep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = "square"; o.frequency.value = 180;
    g.gain.value = 0.15;
    o.start();
    o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    o.stop(ctx.currentTime + 0.6);
  } catch {}
}

function Index() {
  const [scanned, setScanned] = useState(0);
  const [shake, setShake] = useState(false);
  const [popup, setPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (scanned >= REPORTS.length) return;
    const t = setTimeout(() => setScanned((s) => s + 1), 550);
    return () => clearTimeout(t);
  }, [scanned]);

  const trigger = () => {
    beep();
    setShake(true);
    setTimeout(() => setShake(false), 600);
    setTimeout(() => {
      setPopup(true);
      fireConfetti();
      fireFireworks(1500);
    }, 400);
    setTimeout(() => navigate({ to: "/reveal" }), 2800);
  };

  return (
    <div className={`relative min-h-screen flex items-center justify-center px-4 py-10 ${shake ? "animate-shake" : ""}`}>
      <div className={`glass-strong relative w-full max-w-lg rounded-3xl p-6 sm:p-8 ${popup ? "animate-glitch" : ""}`}>
        <div className="mb-2 flex items-center justify-center gap-2 text-xs text-destructive">
          <span className="h-2 w-2 animate-pulse rounded-full bg-destructive" />
          OFFICIAL SYSTEM NOTICE
        </div>
        <h1 className="text-center text-2xl sm:text-3xl font-black tracking-tight">
          ⚠️ IMPORTANT NOTICE FOR <br />
          <span className="gradient-warm-text">HEMANTH KUMAR</span> ⚠️
        </h1>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          We have detected suspicious levels of <b className="text-foreground">nonsense activities</b> associated with this user.
          A full forensic scan is in progress.
        </p>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 font-mono text-xs">
          <div className="mb-2 flex justify-between text-muted-foreground">
            <span>scan_nonsense.exe</span>
            <span>{Math.min(100, Math.round((scanned / REPORTS.length) * 100))}%</span>
          </div>
          <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-fuchsia-400 to-amber-300"
              animate={{ width: `${(scanned / REPORTS.length) * 100}%` }}
            />
          </div>
          <ul className="space-y-1.5">
            {REPORTS.map((r, i) => (
              <li key={r} className={i < scanned ? "text-emerald-300" : "text-muted-foreground/50"}>
                {i < scanned ? "✅" : "⏳"} {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 grid gap-2">
          <button onClick={trigger} className="rounded-xl bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground shadow-lg hover:opacity-90">
            Delete My Account
          </button>
          <button onClick={trigger} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15">
            I Accept My Crimes
          </button>
          <button onClick={trigger} className="rounded-xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 text-sm font-semibold text-amber-200 hover:bg-amber-300/20">
            Do Not Click 🚫
          </button>
        </div>

        <p className="mt-4 text-center text-[10px] uppercase tracking-widest text-muted-foreground">
          Friendship Department · Case #VIP-{new Date().getFullYear()}
        </p>
      </div>

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 14 }}
            className="absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto"
          >
            <div className="glass-strong neon-glow rounded-3xl px-6 py-8 text-center">
              <div className="text-6xl">😂</div>
              <h2 className="mt-2 text-3xl font-black gradient-text">GOTCHA MEDIAAA!</h2>
              <p className="mt-2 text-sm text-muted-foreground">Hold tight, the real surprise is loading…</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

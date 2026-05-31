import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { getPhotoSources, FUNNY_CAPTIONS, EMOTIONAL_CAPTIONS } from "@/lib/photos";
import { fireConfetti, fireFireworks, fireHearts } from "@/lib/confetti";

export const Route = createFileRoute("/reel")({
  head: () => ({ meta: [{ title: "🎬 Cinematic Reel — Hemanth Kumar" }] }),
  component: Reel,
});

const LOADING_LINES = [
  "📺 Loading Hemanth Kumar's Secret Files...",
  "⚠️ VIP Activity Detected",
  "⚠️ Excessive Media Behavior Found",
  "⚠️ Headache Level: Critical",
  "⚠️ Drama King System Activated",
];

const SLIDE_DURATION = 2400; // ms per photo

const ANIMS = ["zoom", "pan", "flip", "polaroid", "flash", "blur", "tilt"] as const;
type Anim = typeof ANIMS[number];

function variantFor(a: Anim) {
  switch (a) {
    case "zoom":     return { initial: { scale: 1.35, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 0.85, opacity: 0 } };
    case "pan":      return { initial: { x: 220, opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: -220, opacity: 0 } };
    case "flip":     return { initial: { rotateY: 90, opacity: 0 }, animate: { rotateY: 0, opacity: 1 }, exit: { rotateY: -90, opacity: 0 } };
    case "polaroid": return { initial: { rotate: -18, y: 80, opacity: 0 }, animate: { rotate: 0, y: 0, opacity: 1 }, exit: { rotate: 18, opacity: 0 } };
    case "flash":    return { initial: { opacity: 0, filter: "brightness(8)" }, animate: { opacity: 1, filter: "brightness(1)" }, exit: { opacity: 0 } };
    case "blur":     return { initial: { filter: "blur(22px)", opacity: 0 }, animate: { filter: "blur(0px)", opacity: 1 }, exit: { filter: "blur(22px)", opacity: 0 } };
    case "tilt":     return { initial: { rotate: 14, scale: 0.72, opacity: 0 }, animate: { rotate: 0, scale: 1, opacity: 1 }, exit: { rotate: -14, opacity: 0 } };
  }
}

function Reel() {
  const photos = getPhotoSources();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"loading" | "reel" | "emotional">("loading");
  const [loadIdx, setLoadIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [captionIdx, setCaptionIdx] = useState(0);
  const [emoIdx, setEmoIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ── loading phase ──────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "loading") return;
    const id = setInterval(() => {
      setLoadIdx((i) => {
        if (i + 1 >= LOADING_LINES.length) {
          clearInterval(id);
          setTimeout(() => setPhase("reel"), 900);
        }
        return i + 1;
      });
    }, 900);
    return () => clearInterval(id);
  }, [phase]);

  // ── reel phase: slide timer ────────────────────────────────────
  const startSlideTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const TICK = 50;
    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(p + (TICK / SLIDE_DURATION) * 100, 100));
    }, TICK);

    intervalRef.current = setInterval(() => {
      setPhotoIdx((i) => {
        const next = i + 1;
        if (next >= photos.length) {
          clearInterval(intervalRef.current!);
          clearInterval(progressRef.current!);
          setTimeout(() => setPhase("emotional"), 1400);
          return i;
        }
        setCaptionIdx((c) => (c + 1) % FUNNY_CAPTIONS.length);
        setProgress(0);
        return next;
      });
    }, SLIDE_DURATION);
  }, [photos.length]);

  useEffect(() => {
    if (phase !== "reel") return;
    startSlideTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [phase, startSlideTimer]);

  // pause / resume
  useEffect(() => {
    if (phase !== "reel") return;
    if (paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    } else {
      startSlideTimer();
    }
  }, [paused, phase, startSlideTimer]);

  // ── emotional phase ────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "emotional") return;
    const id = setInterval(() => {
      setEmoIdx((i) => {
        if (i + 1 >= EMOTIONAL_CAPTIONS.length) {
          clearInterval(id);
          setTimeout(() => {
            fireConfetti();
            fireFireworks(2000);
            fireHearts();
            // Navigate to gallery after emotional messages
            setTimeout(() => navigate({ to: "/gallery" }), 2000);
          }, 1800);
        }
        return i + 1;
      });
    }, 1800);
    return () => clearInterval(id);
  }, [phase, navigate]);

  const goNext = () => {
    if (photoIdx + 1 >= photos.length) return;
    setPhotoIdx((i) => i + 1);
    setCaptionIdx((c) => (c + 1) % FUNNY_CAPTIONS.length);
    startSlideTimer();
  };

  const goPrev = () => {
    if (photoIdx === 0) return;
    setPhotoIdx((i) => i - 1);
    setCaptionIdx((c) => (c - 1 + FUNNY_CAPTIONS.length) % FUNNY_CAPTIONS.length);
    startSlideTimer();
  };

  const current = photos[photoIdx] ?? photos[0];
  const anim = ANIMS[photoIdx % ANIMS.length];

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <div className="mx-auto mt-6 max-w-2xl px-4">

        {/* ── LOADING ── */}
        {phase === "loading" && (
          <div className="glass-strong rounded-3xl p-6 font-mono">
            <div className="mb-3 flex justify-between text-xs text-muted-foreground">
              <span>secret_files.exe</span>
              <span>{Math.round(((loadIdx + 1) / LOADING_LINES.length) * 100)}%</span>
            </div>
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-amber-300"
                animate={{ width: `${((loadIdx + 1) / LOADING_LINES.length) * 100}%` }}
              />
            </div>
            <ul className="space-y-2 text-sm">
              {LOADING_LINES.slice(0, loadIdx + 1).map((l) => (
                <motion.li key={l} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className={l.startsWith("⚠️") ? "text-amber-300" : "text-emerald-300"}>
                  {l}
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* ── REEL ── */}
        {phase === "reel" && (
          <div className="relative select-none">
            {/* phone-style frame - more compact */}
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[380px] overflow-hidden rounded-[2.5rem] bg-black shadow-2xl neon-glow">

              {/* photo slide */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`photo-${photoIdx}`}
                  {...variantFor(anim)}
                  transition={{ duration: 0.65, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {current?.src ? (
                    <img
                      src={current.src}
                      alt={`Photo ${photoIdx + 1}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        // Hide broken image, show gradient background
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 -z-10"
                    style={{
                      background: current?.gradient ?? "linear-gradient(135deg,#ff4fa3,#c084fc)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* cinematic overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

              {/* top bar */}
              <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 pt-4">
                <div className="flex items-center gap-1.5 rounded-full bg-red-500/90 px-2.5 py-1 text-[10px] font-bold text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  REC
                </div>
                <div className="rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
                  {photoIdx + 1} / {photos.length}
                </div>
              </div>

              {/* slide progress strips */}
              <div className="absolute inset-x-3 top-12 flex gap-1">
                {photos.map((_, i) => (
                  <div key={i} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
                    <motion.div
                      className="h-full bg-white"
                      animate={{
                        width: i < photoIdx ? "100%" : i === photoIdx ? `${progress}%` : "0%",
                      }}
                      transition={{ duration: 0.05 }}
                    />
                  </div>
                ))}
              </div>

              {/* caption */}
              <div className="absolute inset-x-0 bottom-20 px-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={captionIdx}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -16, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-lg font-bold text-white text-glow drop-shadow-lg"
                  >
                    {FUNNY_CAPTIONS[captionIdx]}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* tap zones for prev/next */}
              <button onClick={goPrev} className="absolute inset-y-0 left-0 w-1/3" aria-label="Previous" />
              <button onClick={goNext} className="absolute inset-y-0 right-0 w-1/3" aria-label="Next" />
            </div>

            {/* controls below frame */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={goPrev}
                disabled={photoIdx === 0}
                className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold disabled:opacity-30 hover:bg-white/20 transition sm:px-4 sm:text-sm"
              >
                ◀ Prev
              </button>
              <button
                onClick={() => setPaused((p) => !p)}
                className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground shadow-lg neon-glow sm:px-5 sm:text-sm"
              >
                {paused ? "▶ Play" : "⏸ Pause"}
              </button>
              <button
                onClick={goNext}
                disabled={photoIdx + 1 >= photos.length}
                className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold disabled:opacity-30 hover:bg-white/20 transition sm:px-4 sm:text-sm"
              >
                Next ▶
              </button>
              <button
                onClick={() => {
                  setMusicOn((m) => !m);
                  if (audioRef.current) {
                    if (musicOn) audioRef.current.pause();
                    else audioRef.current.play();
                  }
                }}
                className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold hover:bg-white/20 transition sm:px-4 sm:text-sm"
              >
                {musicOn ? "🔊" : "🔇"}
              </button>
            </div>

            {/* thumbnail strip */}
            <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
              {photos.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setPhotoIdx(i);
                    setCaptionIdx(i % FUNNY_CAPTIONS.length);
                    startSlideTimer();
                  }}
                  className={`shrink-0 h-14 w-10 overflow-hidden rounded-lg border-2 transition ${
                    i === photoIdx ? "border-primary scale-110" : "border-white/20 opacity-60 hover:opacity-100"
                  }`}
                  style={{
                    backgroundImage: p.src ? `url(${p.src})` : p.gradient,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    background: p.gradient ?? "#000",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── EMOTIONAL ── */}
        {phase === "emotional" && (
          <div className="relative flex min-h-[60vh] items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={emoIdx}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="px-6 text-center text-2xl sm:text-4xl font-bold gradient-warm-text text-glow"
              >
                {EMOTIONAL_CAPTIONS[emoIdx]}
              </motion.p>
            </AnimatePresence>
          </div>
        )}

        {/* Background Music */}
        {phase === "reel" && (
          <audio ref={audioRef} loop>
            <source src="/audio/1.mpeg" type="audio/mpeg" />
          </audio>
        )}

      </div>
    </div>
  );
}

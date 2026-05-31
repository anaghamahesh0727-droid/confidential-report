import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";
import { getPhotoSources } from "@/lib/photos";

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "📸 Memories Gallery" }] }),
  component: Gallery,
});

const KANNADA_QUOTES = [
  "Lowda spotted 😂",
  "Ohh my goduu moment 🤦",
  "Yen media ಇದು? 😅",
  "VIP without pass 👑",
  "ಮಸ್ತ್ ಮಗ 🔥",
  "Drama King ಆಗಿದ್ದಾನೆ 🎭",
  "Headache ಕೊಡುವ ಹುಡುಗ 😤",
  "ಸುಮ್ನೆ ಇರಲಿಕ್ಕೆ ಆಗಲ್ಲ 🤪",
  "Stress Booster Pro Max 📈",
  "ಏನ್ರಿ ಇದು? 🙄",
  "ಹುಚ್ಚು ಹಿಡಿದಿದೆ ಇವನಿಗೆ 🤪",
  "ಮೀಡಿಯಾ ಮಾಡ್ತಾ ಇದ್ದಾನೆ 📱",
  "Nonsense level: ಅಪಾರ 💯",
  "ಏನ್ ಮಾಡ್ತಾ ಇದ್ದೀಯಾ? 😆",
  "Professional ಗೊಂದಲ 🌀",
  "ಮಸ್ತ್ ಕಾಮಿಡಿ ಪೀಸ್ 🎪",
  "Rare species found 🦄",
  "ಮಸ್ತ್ ಮೆಮೊರಿ ❤️",
  "Legend ಆಗಿದ್ದಾನೆ 🌟",
];

function Gallery() {
  const photos = getPhotoSources();
  const [open, setOpen] = useState<number | null>(null);
  const rotations = ["-rotate-3","rotate-2","-rotate-1","rotate-3","-rotate-2","rotate-1"];

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <div className="mx-auto mt-6 max-w-5xl px-4">
        <header className="mb-6 text-center">
          <h1 className="text-3xl sm:text-5xl font-black gradient-text text-glow">📸 Memory Wall</h1>
          <p className="mt-2 text-sm text-muted-foreground">Tap any polaroid to enlarge. Each one comes with court-admissible evidence.</p>
        </header>

        <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [column-fill:_balance]">
          {photos.map((p, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(i)}
              className={`mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl bg-white p-2 pb-6 shadow-lg ${rotations[i % rotations.length]}`}
            >
              <div
                className="aspect-[3/4] w-full rounded-md"
                style={{
                  background: p.gradient,
                  backgroundImage: p.src ? `url(${p.src})` : p.gradient,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
              <p className="mt-2 text-center text-xs font-bold text-neutral-700">
                {KANNADA_QUOTES[i % KANNADA_QUOTES.length]}
              </p>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {open !== null && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
              onClick={() => setOpen(null)}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                className="glass-strong w-full max-w-lg rounded-3xl p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="aspect-square w-full rounded-2xl"
                  style={{
                    background: photos[open].gradient,
                    backgroundImage: photos[open].src ? `url(${photos[open].src})` : photos[open].gradient,
                    backgroundSize: "cover", backgroundPosition: "center",
                  }}
                />
                <button onClick={() => setOpen(null)} className="mt-4 w-full rounded-xl bg-white/10 py-2 text-sm font-semibold">Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
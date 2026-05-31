import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavBar } from "@/components/NavBar";

export const Route = createFileRoute("/roast")({
  head: () => ({ meta: [{ title: "🔥 Roast Mediaaa" }] }),
  component: Roast,
});

const ROASTS = [
  "Bro has 99 problems and creates 100 more.",
  "Google searches Media for confusion.",
  "WiFi disconnects after hearing his stories.",
  "Professional overthinker.",
  "Human version of unexpected updates.",
  "Walking notification.",
  "Premium headache subscription.",
  "CEO of unnecessary drama.",
  "Comes with terms, conditions and 47 disclaimers.",
  "Auto-plays nonsense on full volume.",
  "Even autocorrect gives up on him.",
  "Mediuu: now available in 12 unsolicited opinions.",
  "His vibe has a 'skip ad' button.",
  "Lives rent-free in everyone's group chat.",
  "Customer support: 'we don't handle this case.'",
  "Drama King — coronation pending forever.",
  "Tech support's most reported user.",
  "Says 'Lowda' more than his own name.",
  "'Ohh my goduu' is his official catchphrase.",
  "Starts every sentence with 'Yen media...'",
  "His vocabulary: 50% Lowda, 30% Ohh my goduu, 20% complaints.",
  "Lowda counter: ∞ | Productivity: 0",
  "'Yen media' is his way of announcing chaos.",
  "Ohh my goduu — the soundtrack of his life.",
  "Uses 'Lowda' as punctuation.",
  "His phone autocorrects everything to 'Ohh my goduu'.",
  "Yen media, why are you like this? — Everyone, always.",
  "Lowda is not a word, it's his personality.",
  "Ohh my goduu — his reaction to literally everything.",
  "Lowda, Lowda everywhere but not a single solution.",
  "Yen media, can you go 5 minutes without drama? — No.",
  "Ohh my goduu, he did it again.",
  "Lowda level: Expert. Common sense level: Loading...",
  "Yen media, what's the plan? — Chaos, obviously.",
  "Ohh my goduu, this guy never learns.",
  "Lowda first, think later — his life motto.",
  "Yen media, stop! — Media: Never.",
  "Ohh my goduu, he's at it again.",
  "Lowda + Yen media + Ohh my goduu = Complete package.",
  "His catchphrases have their own fan club.",
];

const COLORS = [
  "from-rose-500/40 to-amber-400/30",
  "from-fuchsia-500/40 to-cyan-400/30",
  "from-amber-400/40 to-pink-500/30",
  "from-violet-500/40 to-emerald-400/30",
];

function Roast() {
  const [cards, setCards] = useState<{ id: number; text: string; color: string }[]>(
    ROASTS.slice(0, 6).map((t, i) => ({ id: i, text: t, color: COLORS[i % COLORS.length] }))
  );
  const [seed, setSeed] = useState(6);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRoast, setNewRoast] = useState("");

  const generate = () => {
    const t = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    setCards((c) => [{ id: seed, text: t, color: COLORS[seed % COLORS.length] }, ...c].slice(0, 18));
    setSeed((s) => s + 1);
  };

  const deleteCard = (id: number) => {
    setCards((c) => c.filter((card) => card.id !== id));
  };

  const addCustomRoast = () => {
    if (newRoast.trim()) {
      setCards((c) => [
        { id: seed, text: newRoast.trim(), color: COLORS[seed % COLORS.length] },
        ...c,
      ].slice(0, 18));
      setSeed((s) => s + 1);
      setNewRoast("");
      setShowAddForm(false);
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <div className="mx-auto mt-6 max-w-4xl px-4">
        <header className="mb-4 text-center">
          <h1 className="text-3xl sm:text-5xl font-black gradient-text text-glow">
            🔥 Roast Department
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Court-certified, lovingly cruel.
          </p>
        </header>

        {/* Control Buttons */}
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={generate}
            className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-lg neon-glow"
          >
            🎲 Generate Random Roast
          </button>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="rounded-xl bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg hover:bg-emerald-600"
          >
            ➕ Add Custom Roast
          </button>
        </div>

        {/* Add Custom Roast Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-strong mb-6 rounded-2xl p-4"
            >
              <h3 className="mb-3 text-lg font-bold">Add Your Own Roast</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newRoast}
                  onChange={(e) => setNewRoast(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addCustomRoast()}
                  placeholder="Type your roast here..."
                  className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-sm outline-none ring-2 ring-white/20 focus:ring-primary"
                  maxLength={150}
                />
                <button
                  onClick={addCustomRoast}
                  disabled={!newRoast.trim()}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground disabled:opacity-50"
                >
                  Add
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setNewRoast("");
                  }}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold"
                >
                  Cancel
                </button>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {newRoast.length}/150 characters
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roast Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {cards.map((c) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className={`glass relative rounded-2xl bg-gradient-to-br p-5 ${c.color}`}
              >
                {/* Delete Button */}
                <button
                  onClick={() => deleteCard(c.id)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500/80 text-white transition hover:bg-red-600 hover:scale-110"
                  aria-label="Delete roast"
                >
                  ✕
                </button>

                <div className="text-2xl">🔥</div>
                <p className="mt-2 pr-6 text-base font-bold">{c.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {cards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-strong mt-8 rounded-3xl p-8 text-center"
          >
            <div className="text-6xl">😅</div>
            <p className="mt-4 text-lg font-semibold">No roasts yet!</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Click "Generate Random Roast" or "Add Custom Roast" to get started.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

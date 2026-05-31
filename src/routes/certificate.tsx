import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { NavBar } from "@/components/NavBar";

export const Route = createFileRoute("/certificate")({
  head: () => ({ meta: [{ title: "📜 Certified Best Friend License" }] }),
  component: Certificate,
});

const ACHIEVEMENTS = [
  "🏆 Making everyone laugh",
  "🏆 Sending unlimited reels",
  "🏆 Professional headache creation",
  "🏆 Being VIP without permission",
  "🏆 Surviving friendship challenges",
  "🏆 Creating unforgettable memories",
];

function Certificate() {
  const ref = useRef<HTMLDivElement>(null);

  const download = async () => {
    if (!ref.current) return;
    const canvas = await html2canvas(ref.current, { backgroundColor: null, scale: 2 });
    const link = document.createElement("a");
    link.download = "Hemanth-Best-Friend-License.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="relative min-h-screen pb-20">
      <NavBar />
      <div className="mx-auto mt-6 max-w-3xl px-4">
        <div ref={ref} className="relative overflow-hidden rounded-3xl border-4 border-amber-300/60 bg-gradient-to-br from-amber-50 to-rose-50 p-6 text-neutral-800 shadow-2xl sm:p-10">
          <div className="pointer-events-none absolute inset-4 rounded-2xl border-2 border-dashed border-amber-400/60" />
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.3em] text-amber-700">— OFFICIAL —</p>
            <h1 className="mt-2 text-2xl sm:text-4xl font-black text-rose-700">CERTIFIED BEST FRIEND LICENSE</h1>
            <p className="mt-1 text-xs text-neutral-500">Issued by the Friendship Department · Reg. #VIP-{new Date().getFullYear()}</p>

            <p className="mt-6 text-sm text-neutral-600">This license is proudly granted to</p>
            <p className="mt-2 text-3xl sm:text-4xl font-black text-neutral-900">Hemanth Kumar K R</p>
            <p className="mt-1 text-sm italic text-rose-700">AKA Mediuu · VIP · Stress Booster · Drama King</p>

            <p className="mt-6 text-sm text-neutral-600">For outstanding achievements in:</p>
            <ul className="mx-auto mt-3 grid max-w-md gap-2 text-left text-sm font-semibold text-neutral-800 sm:grid-cols-2">
              {ACHIEVEMENTS.map((a) => (
                <li key={a} className="rounded-lg bg-white/60 px-3 py-2 shadow-sm">{a}</li>
              ))}
            </ul>

            <div className="mt-8 flex items-end justify-between gap-4">
              <div className="text-left">
                <div className="h-10 w-40 border-b-2 border-neutral-800" />
                <p className="mt-1 text-xs font-bold">Friendship Department</p>
                <p className="text-[10px] text-neutral-500">Authorised Signatory</p>
              </div>
              <div className="relative">
                <div className="flex h-24 w-24 rotate-12 items-center justify-center rounded-full border-4 border-emerald-600 text-center text-xs font-black uppercase tracking-wider text-emerald-700">
                  <span>Approved<br/>★ Official ★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button onClick={download} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg neon-glow">
            ⬇ Download Certificate
          </button>
        </div>
      </div>
    </div>
  );
}
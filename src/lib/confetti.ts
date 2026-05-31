import confetti from "canvas-confetti";

export function fireConfetti() {
  confetti({ particleCount: 120, spread: 90, origin: { y: 0.7 }, colors: ["#ff4fa3", "#ffb84f", "#7afcff", "#c084fc", "#ffe066"] });
}

export function fireFireworks(duration = 3000) {
  const end = Date.now() + duration;
  const colors = ["#ff4fa3", "#ffb84f", "#7afcff", "#c084fc", "#ffe066"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

export function fireHearts() {
  const scalar = 2;
  const heart = confetti.shapeFromText({ text: "❤️", scalar });
  confetti({ shapes: [heart], scalar, particleCount: 40, spread: 100, origin: { y: 0.6 }, ticks: 200 });
}

export function fireRainbow() {
  const colors = ["#ff0040", "#ff8000", "#ffd700", "#00ff80", "#00bfff", "#8000ff"];
  confetti({ particleCount: 200, spread: 160, origin: { y: 0.6 }, colors });
}
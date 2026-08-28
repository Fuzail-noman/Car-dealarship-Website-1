import React from "react";

const specs = [
  "0–100 KM/H IN 1.9S",
  "1,020 HP AVAILABLE",
  "333 KM/H TOP SPEED",
  "24 CARS IN THE FLEET",
  "DELIVERED IN 48 HOURS",
  "BUY OR RENT, YOUR CALL",
];

export default function SpecTicker() {
  const loop = [...specs, ...specs];
  return (
    <div className="relative overflow-hidden border-y border-gold-800/25 bg-ink-900/60 py-3">
      <div className="flex gap-10 w-max animate-marquee">
        {loop.map((s, i) => (
          <span
            key={i}
            className="font-mono text-[11px] tracking-widest2 text-gold-500/80 uppercase flex items-center gap-10"
          >
            {s}
            <span className="text-bone-700">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";

// A radial dashboard-style gauge — the site's signature element.
// value/max define the sweep; rendered as an animated arc + needle.
export default function SpecDial({ value, max, label, unit, size = 140 }) {
  const pct = Math.min(1, value / max);
  const startAngle = -120;
  const endAngle = 120;
  const angle = startAngle + pct * (endAngle - startAngle);
  const r = size / 2 - 14;
  const cx = size / 2;
  const cy = size / 2;

  const polar = (deg, radius) => {
    const rad = (deg - 90) * (Math.PI / 180);
    return [cx + radius * Math.cos(rad), cy + radius * Math.sin(rad)];
  };

  const [sx, sy] = polar(startAngle, r);
  const [ex, ey] = polar(endAngle, r);
  const [vx, vy] = polar(angle, r);

  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <path
          d={`M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`}
          fill="none"
          stroke="#1C1A15"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${vx} ${vy}`}
          fill="none"
          stroke="#C9A227"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <text
          x={cx}
          y={cy - 2}
          textAnchor="middle"
          className="fill-bone-100"
          style={{ fontFamily: "Fraunces, serif", fontSize: size * 0.16 }}
        >
          {value}
        </text>
        <text
          x={cx}
          y={cy + size * 0.14}
          textAnchor="middle"
          className="fill-bone-500"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: size * 0.075 }}
        >
          {unit}
        </text>
      </svg>
      <span className="eyebrow mt-1">{label}</span>
    </div>
  );
}

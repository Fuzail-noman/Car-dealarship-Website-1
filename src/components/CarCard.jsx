import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPKR } from "../data/cars";

export default function CarCard({ car, mode = "buy" }) {
  const price = mode === "rent" ? car.rentPricePKR : car.pricePKR;
  const priceLabel = mode === "rent" ? `${formatPKR(price)} / day` : formatPKR(price);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="group card overflow-hidden"
    >
      <Link to={`/car/${car.id}?mode=${mode}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={car.image}
            alt={car.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
          <span className="absolute top-3 left-3 eyebrow bg-ink-950/70 px-2.5 py-1 rounded-sm backdrop-blur-sm">
            {car.category}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg text-bone-100 leading-tight">{car.name}</h3>
            <span className="text-xs text-bone-500 font-mono">{car.year}</span>
          </div>
          <p className="text-xs text-bone-500 mt-0.5">{car.brand}</p>

          <div className="flex items-center gap-4 mt-4 text-[11px] text-bone-500 font-mono">
            <span>{car.horsepower} HP</span>
            <span className="w-1 h-1 rounded-full bg-gold-800" />
            <span>0–100: {car.zeroToHundred}s</span>
          </div>

          <div className="hairline my-4" />

          <div className="flex items-center justify-between">
            <span className="font-display text-gold-300 text-lg">{priceLabel}</span>
            <span className="text-xs tracking-widest2 uppercase text-bone-500 group-hover:text-gold-500 transition-colors">
              View →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

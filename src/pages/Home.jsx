import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import SpecTicker from "../components/SpecTicker";
import SpecDial from "../components/SpecDial";
import CarCard from "../components/CarCard";
import { cars } from "../data/cars";

export default function Home() {
  const featured = cars.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center pt-20 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2000&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/40" />

        <div className="max-w-7xl mx-auto px-5 md:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <span className="eyebrow">Buy · Rent · Drive</span>
            <h1 className="font-display text-5xl md:text-7xl leading-[1.05] mt-5 text-bone-100">
              Own the moment.
              <br />
              <span className="gold-text">Not the maintenance.</span>
            </h1>
            <p className="text-bone-500 text-base md:text-lg mt-6 max-w-lg leading-relaxed">
              A private fleet of exceptional cars — buy one outright, or
              rent one for the weekend. Every vehicle inspected,
              delivered, and driven the way it was engineered to be.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link to="/cars/buy" className="btn-primary">
                Browse to buy
              </Link>
              <Link to="/cars/rent" className="btn-ghost">
                Browse to rent
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-bone-700"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="10" cy="9" r="2" fill="currentColor" />
          </svg>
        </motion.div>
      </section>

      <SpecTicker />

      {/* SIGNATURE SPEC STRIP */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="eyebrow">The instrument cluster</span>
              <h2 className="font-display text-3xl md:text-4xl mt-3 text-bone-100">
                What the fleet is capable of
              </h2>
            </div>
            <p className="text-bone-500 text-sm max-w-xs">
              A snapshot pulled from the top of the range — every figure
              belongs to a car you can drive this week.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
            <SpecDial value={1020} max={1200} label="Peak Horsepower" unit="HP" />
            <SpecDial value={333} max={350} label="Top Speed" unit="KM/H" />
            <SpecDial value={2} max={6} label="0–100 KM/H" unit="SECONDS" />
            <SpecDial value={24} max={30} label="Cars in Fleet" unit="MODELS" />
          </div>
        </Reveal>
      </section>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-10 pb-24">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="eyebrow">Featured</span>
              <h2 className="font-display text-3xl md:text-4xl mt-3 text-bone-100">
                Currently turning heads
              </h2>
            </div>
            <Link to="/cars/buy" className="hidden md:block text-sm text-gold-500 hover:text-gold-300">
              View full fleet →
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((car, i) => (
            <Reveal key={car.id} delay={i * 0.1}>
              <CarCard car={car} mode="buy" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="border-t border-gold-800/20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20 text-center">
          <Reveal>
            <span className="eyebrow">Rent, if you're not ready to commit</span>
            <h2 className="font-display text-3xl md:text-5xl mt-4 text-bone-100 max-w-2xl mx-auto">
              Try before the driveway.
            </h2>
            <p className="text-bone-500 mt-5 max-w-lg mx-auto">
              Daily and weekend rentals on the same fleet we sell — full
              insurance, doorstep delivery, no negotiation required.
            </p>
            <Link to="/cars/rent" className="btn-primary mt-8 inline-flex">
              See rental fleet
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

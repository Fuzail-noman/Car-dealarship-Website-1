import React from "react";
import Reveal from "../components/Reveal";
import SpecTicker from "../components/SpecTicker";

const pillars = [
  {
    title: "Inspected, not just listed",
    body: "Every car goes through a 120-point mechanical and cosmetic check before it's allowed on the site — buy or rent.",
  },
  {
    title: "Delivered to your door",
    body: "No showroom trip required. We bring the car to you, walk you through it, and handle the paperwork on the spot.",
  },
  {
    title: "Rent first, buy later",
    body: "Every model in the buy catalog is also available to rent, so you can live with it before you commit.",
  },
];

export default function About() {
  return (
    <div className="pt-28">
      <section className="max-w-4xl mx-auto px-5 md:px-8 pt-16 pb-10 text-center">
        <Reveal>
          <span className="eyebrow">About Galaxy</span>
          <h1 className="font-display text-4xl md:text-6xl mt-4 text-bone-100">
            We sell fewer cars,
            <br />
            <span className="gold-text">on purpose.</span>
          </h1>
          <p className="text-bone-500 mt-6 max-w-xl mx-auto leading-relaxed">
            Galaxy Motors keeps a small, curated fleet instead of a large
            uneven one. Every car we list — for sale or for rent — is one
            we'd be comfortable putting a family member into.
          </p>
        </Reveal>
      </section>

      <SpecTicker />

      <section className="max-w-6xl mx-auto px-5 md:px-8 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1}>
            <div className="card p-8 h-full">
              <span className="font-mono text-gold-500 text-xs">0{i + 1}</span>
              <h3 className="font-display text-xl text-bone-100 mt-4">{p.title}</h3>
              <p className="text-bone-500 text-sm mt-3 leading-relaxed">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </section>
    </div>
  );
}

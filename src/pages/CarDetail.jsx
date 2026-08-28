import React, { useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import SpecDial from "../components/SpecDial";
import { getCarById, formatPKR } from "../data/cars";
import { useCart } from "../context/CartContext";

export default function CarDetail() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const car = getCarById(id);

  const initialMode = params.get("mode") === "rent" ? "rent" : "buy";
  const [mode, setMode] = useState(initialMode);
  const [activeImg, setActiveImg] = useState(0);
  const [added, setAdded] = useState(false);

  if (!car) {
    return (
      <div className="pt-40 pb-24 text-center">
        <p className="text-bone-300">That car isn't in the fleet.</p>
        <Link to="/cars/buy" className="text-gold-500 mt-4 inline-block">← Back to listings</Link>
      </div>
    );
  }

  const price = mode === "rent" ? car.rentPricePKR : car.pricePKR;
  const priceLabel = mode === "rent" ? `${formatPKR(price)} / day` : formatPKR(price);

  function handleAdd() {
    addItem(car, mode);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-5 md:px-8">
      <button onClick={() => navigate(-1)} className="text-sm text-bone-500 hover:text-gold-300 mb-8">
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12">
        {/* Gallery */}
        <div>
          <Reveal>
            <div className="aspect-[16/10] overflow-hidden rounded-sm card">
              <motion.img
                key={activeImg}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={car.gallery[activeImg]}
                alt={car.name}
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
          <div className="flex gap-3 mt-4">
            {car.gallery.map((img, i) => (
              <button
                key={img}
                onClick={() => setActiveImg(i)}
                className={`w-20 h-14 rounded-sm overflow-hidden border transition-colors ${
                  activeImg === i ? "border-gold-500" : "border-transparent opacity-60"
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-14">
            <span className="eyebrow">Under the hood</span>
            <div className="card p-8 mt-4 grid grid-cols-3 gap-6 justify-items-center">
              <SpecDial value={car.horsepower} max={1200} label="Horsepower" unit="HP" />
              <SpecDial value={car.topSpeedKmh} max={350} label="Top Speed" unit="KM/H" />
              <SpecDial value={car.zeroToHundred} max={6} label="0–100 KM/H" unit="SECONDS" />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <span className="eyebrow">Description</span>
            <p className="text-bone-300 leading-relaxed mt-4 max-w-2xl">{car.description}</p>
          </Reveal>
        </div>

        {/* Buy box */}
        <div>
          <Reveal>
            <span className="eyebrow">{car.brand} · {car.year}</span>
            <h1 className="font-display text-3xl md:text-4xl mt-3 text-bone-100">{car.name}</h1>

            <div className="flex gap-2 mt-6">
              {car.availableToBuy && (
                <button
                  onClick={() => setMode("buy")}
                  className={`px-4 py-2 text-sm rounded-sm border transition-colors ${
                    mode === "buy" ? "bg-gold-500 text-ink-950 border-gold-500" : "border-bone-700/40 text-bone-300"
                  }`}
                >
                  Buy
                </button>
              )}
              {car.availableToRent && (
                <button
                  onClick={() => setMode("rent")}
                  className={`px-4 py-2 text-sm rounded-sm border transition-colors ${
                    mode === "rent" ? "bg-gold-500 text-ink-950 border-gold-500" : "border-bone-700/40 text-bone-300"
                  }`}
                >
                  Rent
                </button>
              )}
            </div>

            <div className="card p-6 mt-6">
              <div className="flex items-baseline justify-between">
                <span className="text-bone-500 text-sm">{mode === "rent" ? "Daily rate" : "Price"}</span>
                <span className="font-display text-2xl text-gold-300">{priceLabel}</span>
              </div>

              <div className="hairline my-5" />

              <dl className="grid grid-cols-2 gap-y-3 text-sm">
                <Spec label="Transmission" value={car.transmission} />
                <Spec label="Fuel" value={car.fuel} />
                <Spec label="Seats" value={car.seats} />
                <Spec label="Color" value={car.color} />
              </dl>

              <button onClick={handleAdd} className="btn-primary w-full mt-7">
                {added ? "Added to cart ✓" : mode === "rent" ? "Add rental to cart" : "Add to cart"}
              </button>
              <Link to="/cart" className="block text-center text-sm text-bone-500 hover:text-gold-300 mt-4">
                View cart →
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <>
      <dt className="text-bone-500">{label}</dt>
      <dd className="text-bone-100 text-right">{value}</dd>
    </>
  );
}

import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import CarCard from "../components/CarCard";
import { cars, categories, brands } from "../data/cars";

export default function CarListing() {
  const { mode: rawMode } = useParams();
  const mode = rawMode === "rent" ? "rent" : "buy";
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    let list = cars.filter((c) =>
      mode === "rent" ? c.availableToRent : c.availableToBuy
    );
    if (category !== "All") list = list.filter((c) => c.category === category);
    if (brand !== "All") list = list.filter((c) => c.brand === brand);

    const priceOf = (c) => (mode === "rent" ? c.rentPricePKR : c.pricePKR);
    if (sort === "price-asc") list = [...list].sort((a, b) => priceOf(a) - priceOf(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => priceOf(b) - priceOf(a));
    if (sort === "power") list = [...list].sort((a, b) => b.horsepower - a.horsepower);

    return list;
  }, [mode, category, brand, sort]);

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-5 md:px-8">
      <Reveal>
        <span className="eyebrow">{mode === "rent" ? "Rental fleet" : "Cars for sale"}</span>
        <h1 className="font-display text-4xl md:text-5xl mt-3 text-bone-100">
          {mode === "rent" ? "Rent something extraordinary" : "Own something extraordinary"}
        </h1>
        <p className="text-bone-500 mt-4 max-w-xl">
          {mode === "rent"
            ? "Daily rates, full insurance, doorstep delivery. Same fleet, none of the paperwork."
            : "Every car inspected and history-verified before it's listed. Financing available on request."}
        </p>
      </Reveal>

      {/* Mode toggle */}
      <div className="flex gap-2 mt-8 mb-10">
        <button
          onClick={() => navigate("/cars/buy")}
          className={`px-5 py-2.5 text-sm tracking-wide rounded-sm border transition-colors ${
            mode === "buy"
              ? "bg-gold-500 text-ink-950 border-gold-500"
              : "border-bone-700/40 text-bone-300 hover:border-gold-500/50"
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => navigate("/cars/rent")}
          className={`px-5 py-2.5 text-sm tracking-wide rounded-sm border transition-colors ${
            mode === "rent"
              ? "bg-gold-500 text-ink-950 border-gold-500"
              : "border-bone-700/40 text-bone-300 hover:border-gold-500/50"
          }`}
        >
          Rent
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-10">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-field !w-auto text-sm py-2.5"
        >
          <option value="All">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="input-field !w-auto text-sm py-2.5"
        >
          <option value="All">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="input-field !w-auto text-sm py-2.5"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="power">Horsepower</option>
        </select>

        <span className="ml-auto self-center text-xs text-bone-500 font-mono">
          {filtered.length} {filtered.length === 1 ? "CAR" : "CARS"}
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-24 text-bone-500">
          No cars match those filters yet — try widening your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((car, i) => (
            <Reveal key={car.id} delay={(i % 3) * 0.08}>
              <CarCard car={car} mode={mode} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

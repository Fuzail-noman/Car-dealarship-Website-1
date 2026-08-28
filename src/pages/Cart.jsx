import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../data/cars";

export default function Cart() {
  const { items, removeItem, updateQuantity, subtotalPKR } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-3xl mx-auto px-5 text-center">
        <Reveal>
          <span className="eyebrow">Your cart</span>
          <h1 className="font-display text-4xl mt-3 text-bone-100">Empty, for now.</h1>
          <p className="text-bone-500 mt-4">
            Nothing added yet — browse the fleet and pick something worth driving.
          </p>
          <Link to="/cars/buy" className="btn-primary mt-8 inline-flex">
            Browse the fleet
          </Link>
        </Reveal>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-5 md:px-8">
      <Reveal>
        <span className="eyebrow">Your cart</span>
        <h1 className="font-display text-4xl mt-3 text-bone-100">Review your order</h1>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 mt-10">
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.key}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="card p-4 flex gap-4 items-center"
              >
                <img src={item.image} alt={item.name} className="w-24 h-20 object-cover rounded-sm" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg text-bone-100 truncate">{item.name}</h3>
                  <p className="text-xs text-bone-500 mt-1 uppercase tracking-wide font-mono">
                    {item.mode === "rent" ? "Rental · per day" : "Purchase"}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-bone-700/40 rounded-sm">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-8 h-8 text-bone-300 hover:text-gold-500"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-8 h-8 text-bone-300 hover:text-gold-500"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-xs text-bone-500 hover:text-red-400 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className="font-display text-gold-300 whitespace-nowrap">
                  {formatPKR(item.price * item.quantity)}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1}>
          <div className="card p-6 sticky top-28">
            <h2 className="font-display text-xl text-bone-100 mb-5">Order summary</h2>
            <div className="flex justify-between text-sm text-bone-300 mb-2">
              <span>Subtotal</span>
              <span>{formatPKR(subtotalPKR)}</span>
            </div>
            <p className="text-xs text-bone-500">Delivery fee is calculated at checkout based on your country.</p>
            <div className="hairline my-5" />
            <button onClick={() => navigate("/checkout")} className="btn-primary w-full">
              Proceed to checkout
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

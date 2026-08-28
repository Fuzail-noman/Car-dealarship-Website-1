import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Reveal from "../components/Reveal";
import { api } from "../api/client";
import { formatPKR } from "../data/cars";

const statusColor = {
  pending: "text-gold-500 border-gold-500/40",
  confirmed: "text-blue-400 border-blue-400/40",
  shipped: "text-purple-400 border-purple-400/40",
  delivered: "text-green-400 border-green-400/40",
  cancelled: "text-red-400 border-red-400/40",
};

export default function MyOrders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      const res = await api.myOrders();
      if (res.success) setOrders(res.orders);
      else setError(res.message || "Could not load your orders.");
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-5 md:px-8">
      <Reveal>
        <span className="eyebrow">Your account</span>
        <h1 className="font-display text-4xl mt-3 text-bone-100">Orders</h1>
        {location.state?.justPlaced && (
          <p className="text-sm text-gold-500 mt-3">
            Order placed — we'll confirm it shortly.
          </p>
        )}
      </Reveal>

      <div className="mt-10 space-y-4">
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
          </div>
        )}

        {!loading && error && <p className="text-bone-500">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-16">
            <p className="text-bone-500">No orders yet.</p>
            <Link to="/cars/buy" className="btn-primary mt-6 inline-flex">
              Browse the fleet
            </Link>
          </div>
        )}

        {orders.map((order, i) => (
          <Reveal key={order._id} delay={i * 0.05}>
            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono text-bone-500">
                  ORDER #{order._id.slice(-8).toUpperCase()}
                </span>
                <span
                  className={`text-xs px-3 py-1 rounded-full border uppercase tracking-wide ${
                    statusColor[order.status] || "text-bone-300 border-bone-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="space-y-1.5 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm text-bone-300">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPKR(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="hairline my-4" />

              <div className="flex justify-between text-sm">
                <span className="text-bone-500">
                  {order.shipping?.city}, {order.shipping?.country}
                </span>
                <span className="font-display text-gold-300">{formatPKR(order.totalPKR)}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

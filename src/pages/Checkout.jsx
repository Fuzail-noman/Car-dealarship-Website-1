import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { formatPKR } from "../data/cars";
import { api } from "../api/client";

const PAKISTAN_FEE = 4000;
const INTL_FEE = 11000;

export default function Checkout() {
  const { items, subtotalPKR, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", phone: "", country: "Pakistan", city: "" });
  const [receipt, setReceipt] = useState(null);
  const [receiptPreview, setReceiptPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isPakistan = form.country.trim().toLowerCase() === "pakistan";
  const deliveryFee = isPakistan ? PAKISTAN_FEE : INTL_FEE;
  const total = subtotalPKR + deliveryFee;

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setReceipt(file);
    setReceiptPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!form.name || !form.phone || !form.country || !form.city) {
      setError("Please fill in every shipping field.");
      return;
    }
    if (!receipt) {
      setError("Please upload your advance payment screenshot.");
      return;
    }

    setSubmitting(true);

    const orderItems = items.map((i) => ({
      productId: i.productId,
      name: `${i.name}${i.mode === "rent" ? " (Rental)" : ""}`,
      price: i.price,
      quantity: i.quantity,
      image: i.image,
    }));

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("phone", form.phone);
    formData.append("country", form.country);
    formData.append("city", form.city);
    formData.append("items", JSON.stringify(orderItems));
    formData.append("subtotalPKR", String(subtotalPKR));
    formData.append("receipt", receipt);

    const res = await api.createOrder(formData);
    setSubmitting(false);

    if (res.success) {
      clearCart();
      navigate("/orders", { state: { justPlaced: true } });
    } else {
      setError(res.message || "Something went wrong placing your order.");
    }
  }

  return (
    <div className="pt-32 pb-24 max-w-6xl mx-auto px-5 md:px-8">
      <Reveal>
        <span className="eyebrow">Checkout</span>
        <h1 className="font-display text-4xl mt-3 text-bone-100">Shipping &amp; payment</h1>
        <p className="text-bone-500 mt-3 max-w-lg">
          Transfer the advance amount, upload the screenshot below, and
          we'll confirm your order within a few hours.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 mt-10">
        <Reveal delay={0.05}>
          <form onSubmit={handleSubmit} className="card p-6 md:p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full name">
                <input name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="Ahmed Khan" />
              </Field>
              <Field label="Phone">
                <input name="phone" value={form.phone} onChange={handleChange} className="input-field" placeholder="+92 300 1234567" />
              </Field>
              <Field label="Country">
                <input name="country" value={form.country} onChange={handleChange} className="input-field" placeholder="Pakistan" />
              </Field>
              <Field label="City">
                <input name="city" value={form.city} onChange={handleChange} className="input-field" placeholder="Karachi" />
              </Field>
            </div>

            <div className="hairline !my-2" />

            <div>
              <span className="eyebrow">Advance payment</span>
              <p className="text-sm text-bone-500 mt-2 mb-4">
                Transfer {formatPKR(Math.min(500, total))} — {form.country ? `${formatPKR(deliveryFee)} delivery` : "delivery"} applies for {isPakistan ? "domestic" : "international"} shipping. Upload the transfer screenshot to confirm.
              </p>
              <label className="flex flex-col items-center justify-center border border-dashed border-gold-800/40 rounded-sm py-8 cursor-pointer hover:border-gold-500/60 transition-colors">
                {receiptPreview ? (
                  <img src={receiptPreview} alt="Receipt preview" className="h-28 object-contain rounded-sm mb-2" />
                ) : (
                  <UploadIcon />
                )}
                <span className="text-sm text-bone-300 mt-2">
                  {receipt ? receipt.name : "Click to upload payment screenshot"}
                </span>
                <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
              </label>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
              {submitting ? "Placing order…" : "Place order"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-6 sticky top-28">
            <h2 className="font-display text-xl text-bone-100 mb-5">Order summary</h2>
            <div className="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
              {items.map((i) => (
                <div key={i.key} className="flex justify-between text-sm text-bone-300">
                  <span className="truncate pr-3">{i.name} × {i.quantity}</span>
                  <span className="whitespace-nowrap">{formatPKR(i.price * i.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="hairline my-4" />
            <div className="flex justify-between text-sm text-bone-300 mb-2">
              <span>Subtotal</span>
              <span>{formatPKR(subtotalPKR)}</span>
            </div>
            <div className="flex justify-between text-sm text-bone-300 mb-4">
              <span>Delivery ({isPakistan ? "Pakistan" : "International"})</span>
              <span>{formatPKR(deliveryFee)}</span>
            </div>
            <div className="hairline my-4" />
            <div className="flex justify-between font-display text-lg text-gold-300">
              <span>Total</span>
              <span>{formatPKR(total)}</span>
            </div>
            <Link to="/cart" className="block text-center text-sm text-bone-500 hover:text-gold-300 mt-6">
              ← Edit cart
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-xs text-bone-500 mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

function UploadIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C9A227" strokeWidth="1.4">
      <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

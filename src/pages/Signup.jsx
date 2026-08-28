import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    country: "",
    city: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await signup(form);
    setSubmitting(false);
    if (res.success) {
      navigate("/");
    } else {
      setError(res.message || "Signup failed.");
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-5">
      <Reveal className="w-full max-w-lg">
        <div className="text-center mb-8">
          <span className="eyebrow">Join Galaxy</span>
          <h1 className="font-display text-4xl mt-3 text-bone-100">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <label className="block">
            <span className="text-xs text-bone-500 mb-1.5 block">Full name</span>
            <input name="fullName" required value={form.fullName} onChange={handleChange} className="input-field" placeholder="Ahmed Khan" />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="text-xs text-bone-500 mb-1.5 block">Phone</span>
              <input name="phone" required value={form.phone} onChange={handleChange} className="input-field" placeholder="+92 300 1234567" />
            </label>
            <label className="block">
              <span className="text-xs text-bone-500 mb-1.5 block">Country</span>
              <input name="country" required value={form.country} onChange={handleChange} className="input-field" placeholder="Pakistan" />
            </label>
          </div>

          <label className="block">
            <span className="text-xs text-bone-500 mb-1.5 block">City</span>
            <input name="city" required value={form.city} onChange={handleChange} className="input-field" placeholder="Karachi" />
          </label>

          <label className="block">
            <span className="text-xs text-bone-500 mb-1.5 block">Email</span>
            <input type="email" name="email" required value={form.email} onChange={handleChange} className="input-field" placeholder="you@example.com" />
          </label>

          <label className="block">
            <span className="text-xs text-bone-500 mb-1.5 block">Password</span>
            <input type="password" name="password" required value={form.password} onChange={handleChange} className="input-field" placeholder="••••••••" />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="text-center text-sm text-bone-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-gold-500 hover:text-gold-300">
            Sign in
          </Link>
        </p>
      </Reveal>
    </div>
  );
}

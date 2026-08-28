import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const res = await login(form.email, form.password);
    setSubmitting(false);
    if (res.success) {
      navigate(location.state?.from?.pathname || "/");
    } else {
      setError(res.message || "Login failed.");
    }
  }

  return (
    <div className="pt-32 pb-24 min-h-screen flex items-center justify-center px-5">
      <Reveal className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="eyebrow">Welcome back</span>
          <h1 className="font-display text-4xl mt-3 text-bone-100">Sign in</h1>
        </div>

        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <label className="block">
            <span className="text-xs text-bone-500 mb-1.5 block">Email</span>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="input-field"
              placeholder="you@example.com"
            />
          </label>
          <label className="block">
            <span className="text-xs text-bone-500 mb-1.5 block">Password</span>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="input-field"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-50">
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-bone-500 mt-6">
          New to Galaxy?{" "}
          <Link to="/signup" className="text-gold-500 hover:text-gold-300">
            Create an account
          </Link>
        </p>
      </Reveal>
    </div>
  );
}

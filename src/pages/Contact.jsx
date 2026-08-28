import React, { useState } from "react";
import Reveal from "../components/Reveal";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-5 md:px-8">
      <Reveal>
        <span className="eyebrow">Get in touch</span>
        <h1 className="font-display text-4xl md:text-5xl mt-3 text-bone-100">
          Talk to the concierge team
        </h1>
        <p className="text-bone-500 mt-4 max-w-lg">
          Questions about a specific car, financing, or a rental for an
          event — a real person replies within the day.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
        <Reveal delay={0.05}>
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <label className="block">
              <span className="text-xs text-bone-500 mb-1.5 block">Name</span>
              <input required className="input-field" placeholder="Your name" />
            </label>
            <label className="block">
              <span className="text-xs text-bone-500 mb-1.5 block">Email</span>
              <input type="email" required className="input-field" placeholder="you@example.com" />
            </label>
            <label className="block">
              <span className="text-xs text-bone-500 mb-1.5 block">Message</span>
              <textarea required rows={5} className="input-field resize-none" placeholder="Tell us what you're after…" />
            </label>
            <button type="submit" className="btn-primary w-full">
              {sent ? "Message sent ✓" : "Send message"}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card p-8 h-full flex flex-col justify-center gap-6">
            <div>
              <span className="eyebrow">Email</span>
              <p className="text-bone-100 mt-2">concierge@galaxymotors.pk</p>
            </div>
            <div className="hairline" />
            <div>
              <span className="eyebrow">Phone</span>
              <p className="text-bone-100 mt-2">+92 300 000 0000</p>
            </div>
            <div className="hairline" />
            <div>
              <span className="eyebrow">Showrooms</span>
              <p className="text-bone-100 mt-2">Karachi · Lahore · Islamabad</p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-gold-800/20 mt-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="text-2xl font-display gold-text mb-3">GALAXY</div>
          <p className="text-sm text-bone-500 leading-relaxed max-w-xs">
            A curated fleet, bought or borrowed. Every car inspected, every
            delivery handled by hand.
          </p>
        </div>

        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-2.5 text-sm text-bone-300">
            <li><Link to="/cars/buy" className="hover:text-gold-300 transition-colors">Buy a car</Link></li>
            <li><Link to="/cars/rent" className="hover:text-gold-300 transition-colors">Rent a car</Link></li>
            <li><Link to="/about" className="hover:text-gold-300 transition-colors">About Galaxy</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Account</div>
          <ul className="space-y-2.5 text-sm text-bone-300">
            <li><Link to="/login" className="hover:text-gold-300 transition-colors">Sign in</Link></li>
            <li><Link to="/signup" className="hover:text-gold-300 transition-colors">Create account</Link></li>
            <li><Link to="/orders" className="hover:text-gold-300 transition-colors">My orders</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Contact</div>
          <ul className="space-y-2.5 text-sm text-bone-300">
            <li>concierge@galaxymotors.pk</li>
            <li>+92 300 000 0000</li>
            <li>Karachi · Lahore · Islamabad</li>
          </ul>
        </div>
      </div>
      <div className="hairline" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-bone-700 font-mono tracking-wide">
        <span>© {new Date().getFullYear()} GALAXY MOTORS. ALL RIGHTS RESERVED.</span>
        <span>DESIGNED FOR THE DRIVE, NOT JUST THE DESTINATION.</span>
      </div>
    </footer>
  );
}

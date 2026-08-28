import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const links = [
  { to: "/cars/buy", label: "Buy" },
  { to: "/cars/rent", label: "Rent" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink-950/90 backdrop-blur-md border-b border-gold-800/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="text-2xl font-display tracking-wide gold-text">GALAXY</span>
          <span className="text-[10px] tracking-widest2 uppercase text-bone-500 font-mono mt-1">
            Motors
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? "text-gold-500" : "text-bone-300 hover:text-gold-300"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <Link to="/cart" className="relative text-bone-300 hover:text-gold-300 transition-colors">
            <CartIcon />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold-500 text-ink-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/orders" className="text-sm text-bone-300 hover:text-gold-300 transition-colors">
                {user?.fullName?.split(" ")[0] || "My Orders"}
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-xs tracking-widest2 uppercase text-bone-500 hover:text-gold-500 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary !py-2.5 !px-6 text-sm">
              Sign in
            </Link>
          )}
        </div>

        <button
          className="md:hidden text-bone-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-ink-950/98 backdrop-blur-md border-b border-gold-800/20"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="text-base text-bone-200 hover:text-gold-300"
                >
                  {l.label}
                </NavLink>
              ))}
              <Link to="/cart" onClick={() => setOpen(false)} className="text-base text-bone-200">
                Cart {count > 0 && `(${count})`}
              </Link>
              <div className="hairline my-1" />
              {isAuthenticated ? (
                <>
                  <Link to="/orders" onClick={() => setOpen(false)} className="text-base text-bone-200">
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setOpen(false);
                      navigate("/");
                    }}
                    className="text-left text-base text-gold-500"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setOpen(false)} className="btn-primary w-full">
                  Sign in
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 3h2l.4 2M7 13h10l3-7H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="21.5" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="17" cy="21.5" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
      )}
    </svg>
  );
}

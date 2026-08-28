import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-5">
      <span className="font-display text-7xl gold-text">404</span>
      <p className="text-bone-500 mt-4 max-w-sm">
        This road doesn't lead anywhere. Let's get you back on route.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </div>
  );
}

import React from "react";

export default function Navbar() {
  return (
    <div className="relative flex items-center border-b border-black px-4 md:px-8 py-2 md:py-4">
      {/* Site name: absolutely positioned on desktop, normal on mobile */}
      <span className="font-bold text-black text-lg md:text-xl flex-shrink-0 md:absolute md:left-8">
        Alacrity Education
      </span>
      <nav className="flex w-full justify-center space-x-6 md:space-x-10">
        <button className="text-black font-semibold hover:underline focus:outline-none">
          Badges
        </button>
        <button className="text-black font-semibold hover:underline focus:outline-none">
          Awardees
        </button>
      </nav>
    </div>
  );
}
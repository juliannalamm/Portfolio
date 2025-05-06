import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" }
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-grenadine/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand / logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-lightblue select-none"
        >
          Julianna<span className="text-lightblue">.</span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `border-b-2 pb-0.5 transition-colors duration-200
                     ${isActive
                       ? "border-white text-lightblue"
                       : "border-transparent text-gray-100 hover:text-darlington hover:border-darlington"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <nav className="md:hidden bg-grenadine/95 backdrop-blur pb-4">
          <ul className="flex flex-col space-y-4 px-6">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg transition-colors duration-200
                     ${isActive
                       ? "text-white"
                       : "text-gray-100 hover:text-gray-300"}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;

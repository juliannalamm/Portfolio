import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/", label: "Home" },
  {
    label: "Projects",
    dropdown: [
      { to: "https://juliannalamm-spermapp-streamlit-app-0avwqu.streamlit.app/", label: "SpermClass: Motility Classifier App", external: true },
      { to: "https://gouger-git-main-juliannalamms-projects.vercel.app", label: "Gouger: Rent Gouging Detection Tool", external: true },
      { to: "/sperm-track", label: "Object Detection and Tracking" },
      { to: "/projects/sperm-classification", label: "Fertility Data Visualization" },
     
    ],
  },
  { to: "/resume", label: "Resume" },
  // {to: "/AboutMe", label: "About Me"},
  { to: "https://github.com/juliannalamm", label: "GitHub", external: true },
  {to: "/contact", label: "Contact"}
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-grenadine/80 backdrop-blur-md relative z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link to="/" className="text-2xl font-bold tracking-tight text-lightblue select-none">
          Julianna<span className="text-lightblue">.</span>
        </Link>

        {/* Desktop */}
        <nav className="hidden md:block">
          <ul className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <li key={index} className="relative group">
                {item.dropdown ? (
                  <>
                    <span className="cursor-pointer text-gray-100 hover:text-darlington">
                      {item.label}
                    </span>
                    <ul className="absolute left-0 top-full bg-white text-burgundy rounded shadow-lg mt-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transform translate-y-2 transition-all duration-200 z-50">
                      {item.dropdown.map((sub, i) => (
                        <li key={i}>
                          {sub.external ? (
                            <a
                              href={sub.to}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-2 hover:bg-orange-100 whitespace-nowrap"
                            >
                              {sub.label}
                            </a>
                          ) : (
                            <NavLink
                              to={sub.to}
                              className="block px-4 py-2 hover:bg-orange-100 whitespace-nowrap"
                            >
                              {sub.label}
                            </NavLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `border-b-2 pb-0.5 transition-colors duration-200 ${
                        isActive
                          ? "border-white text-lightblue"
                          : "border-transparent text-gray-100 hover:text-darlington hover:border-darlington"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav className="md:hidden bg-grenadine/95 backdrop-blur pb-4">
          <ul className="flex flex-col space-y-4 px-6">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.dropdown ? (
                  <>
                    <span className="block font-semibold text-white mb-2">{item.label}</span>
                    {item.dropdown.map((sub, i) => (
                      <div key={i}>
                        {sub.external ? (
                          <a
                            href={sub.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-white/90 hover:text-white ml-4"
                          >
                            {sub.label}
                          </a>
                        ) : (
                          <NavLink
                            to={sub.to}
                            onClick={() => setOpen(false)}
                            className="block text-sm text-white/90 hover:text-white ml-4"
                          >
                            {sub.label}
                          </NavLink>
                        )}
                      </div>
                    ))}
                  </>
                ) : (
                  <NavLink
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block text-lg transition-colors duration-200 ${
                        isActive ? "text-white" : "text-gray-100 hover:text-gray-300"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
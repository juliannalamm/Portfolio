import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-200 py-4 pl-4 md:pl-6">
      <ul className="flex space-x-6 text-lg font-medium">
        <li><Link to="/" className="hover:text-gray-500 transition">Home</Link></li>
        <li><Link to="/resume" className="hover:text-gray-500 transition">Resume</Link></li>
        <li><Link to="/contact" className="hover:text-gray-500 transition">Contact Me</Link></li>
      </ul>
    </nav>
  );
};
// Compare this snippet from src/components/Footer.jsx:

export default Navbar;
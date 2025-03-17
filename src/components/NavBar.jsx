import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-200 py-4 pl-4 md:pl-6">
      <ul className="flex space-x-6 text-lg font-medium">
        <li><a href="#" className="hover:text-gray-500 transition">Home</a></li>
        <li><a href="/resume" className="hover:text-gray-500 transition">Resume</a></li>
        <li><a href="/contact" className="hover:text-gray-500 transition">Contact Me</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
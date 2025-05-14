// src/pages/ContactMe.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function ContactMe() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-burgundy mb-4">
        Contact&nbsp;Me
      </h1>

      <p className="text-lg text-gray-700 mb-8 max-w-prose text-center">
        I’m putting the finishing touches on a brand‑new contact experience.
        In the meantime, feel free to reach me on&nbsp;
        <a
          href="mailto:juliannalamm@gmail.com"
          className="text-blue-600 underline"
        >
          email
        </a>
        &nbsp;or connect with me on&nbsp;
        <a
          href="https://www.linkedin.com/in/julianna-lamm-3269ba159/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          LinkedIn
        </a>
        &nbsp;or &nbsp;
        <a
          href="https://github.com/juliannalamm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          GitHub.
        </a>

      </p>

     

      <Link to="/" className="mt-10 text-blue-500 underline">
        ← Back to Home
      </Link>
    </div>
  );
}

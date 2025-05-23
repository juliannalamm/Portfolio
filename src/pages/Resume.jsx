// src/pages/Resume.jsx   (or wherever your pages live)
import React from "react";
import MyResume from "../assets/resume.pdf";      // relative path to the PDF
import CurvedLineScroll from "../components/CurvedLineScroll";

export default function Resume() {
  return (
    
    <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
      
      <h1 className="text-2xl font-bold text-burgundy mb-4">My Resume</h1>
      <div className="w-[80%] mx-auto">
        <CurvedLineScroll />
      </div>

      {/* embedded viewer */}
      <object
        data={MyResume}
        type="application/pdf"
        className="w-full max-w-4xl h-[90vh] border shadow"
      >
        {/* fallback for browsers that can’t embed PDFs */}
        <p className="p-4">
          Sorry — your browser can’t display PDFs. You can{" "}
          <a
            href={MyResume}
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            download the resume&nbsp;here
          </a>
          .
        </p>
      </object>
    </div>
  );
}

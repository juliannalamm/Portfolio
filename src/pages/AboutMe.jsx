// src/pages/Resume.jsx   (or wherever your pages live)
import React from "react";
import CurvedLineScroll from "../components/CurvedLineScroll";

export default function Resume() {
    return (

        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">

            <h1 className="text-2xl font-bold text-burgundy mb-10">About Me</h1>
            
            <p className="text-lg text-gray-700 mb-8 max-w-prose text-center">
            Under Construction! Please check back later.
            </p>
            
            <div className="w-[80%] mx-auto">
                <CurvedLineScroll />

            </div>


        </div>
    );
}

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurvedLineScroll() {
    const pathRef = useRef(null);

    useEffect(() => {
        const path = pathRef.current;
        const length = path.getTotalLength();

        // Set initial state
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length
        });

        // Animate the path on scroll
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: path,
                start: "top center",
                end: "bottom center",
                scrub: true
            }
        });
    }, []);

    return (
        <div style={{ height: "200vh", background: "#f0f0f0", paddingTop: "10vh" }}>
            <svg
                viewBox="0 0 600 1200"
                preserveAspectRatio="xMidYMin slice"
                style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }}
            >
                <path
                    ref={pathRef}
                    d="M -5,0
           Q 450 230 300 450 
           T 130 750
           Q 100 850 300 1000
           T 150 1200"


                    stroke="#fe4939"
                    strokeWidth="4"
                    fill="none"
                />
            </svg>
        </div>
    );
}

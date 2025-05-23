import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurvedLineScroll() {
    const pathRef = useRef(null);
    const ballRefs = useRef([]);
    const ballPositions = [0.2, 0.4, 0.6, 0.8];


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
                start: "top 80%",
                end: "bottom top",
                scrub: true,
            }
        });
        

        ballPositions.forEach((pct, index) => {
            const point = path.getPointAtLength(length * pct);
            const ball = ballRefs.current[index];

            //get starting position 
            gsap.set(ball, {
                x: point.x,
                y: point.y,
                scale: 0,
                autoAlpha: 0,
                transformOrigin: "center center"
            });

            gsap.to(ball, {
                autoAlpha: 1,
                scale: 1.5,
                ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: path,
                    start: () => `top+=${pct * 1000}px top`,
                    end: () => `top+=${(pct * 1000 + 100)}px top`,
                    scrub: true
                }
            });
        });

    }, []);

    return (
        <div style={{ height: "300vh", background: "#f0f0f0", paddingTop: "10vh" }}>
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
                {ballPositions.map((_, i) => (
                    <circle
                        key={i} 
                        ref={(el) => (ballRefs.current[i] = el)}
                        r="10"
                        fill="#fe4939"
                        className={`ball ball0${i + 1}`}
                    />
                ))}
            </svg>
        </div>
    );
}

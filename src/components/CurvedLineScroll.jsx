import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CurvedLineScroll() {
  /* refs --------------------------------------------------------------- */
  const pathRef   = useRef(null);            // main red path
  const ballRefs  = useRef([]);              // one <circle> per milestone
  const guideRefs = useRef([]);              // one <line>  per milestone

  /* milestones along the path ----------------------------------------- */
  const milestones = [
    { pct: 0.30, label: "30 %" },
    { pct: 0.40, label: "40 %" },
    { pct: 0.60, label: "60 %" },
    { pct: 0.80, label: "80 %" }
  ];

  /* GSAP setup --------------------------------------------------------- */
  useEffect(() => {
    const path   = pathRef.current;
    const length = path.getTotalLength();
  
    /* 1 – start with the stroke hidden (dash + equal‑size gap) */
    gsap.set(path, {
      attr: {
        "stroke-dasharray": `${length} ${length}`,
        "stroke-dashoffset": length
      }
    });
  
    /* 2 – master timeline driven by scroll */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: path,
        start: "top 80%",
        end:   "bottom top",
        scrub: true
      }
    });
  
    /* 2a – draw the path for the full timeline (0 → 1) */
    tl.to(path, {
      duration: 1,
      attr: { "stroke-dashoffset": 0 },
      ease: "none"
    });
  
    /* 3 – ball settings */
    const BALL_DURATION = 0.15;          // ← quick pop‑in
  
    milestones.forEach(({ pct }, i) => {
      const point = path.getPointAtLength(length * pct);
      const ball  = ballRefs.current[i];
      const guide = guideRefs.current[i];
  
      /* guide (optional dashed grey line) */
      gsap.set(guide, {
        attr: { x1: 0, x2: 600, y1: point.y, y2: point.y }
      });
  
      /* place the ball invisible at its path point */
      gsap.set(ball, {
        x: point.x,
        y: point.y,
        scale: 0,
        autoAlpha: 0,
        transformOrigin: "center center"
      });
  
      /* pop the ball exactly when the stroke reaches this pct */
      tl.fromTo(
        ball,
        { autoAlpha: 0, scale: 0 },
        {
          autoAlpha: 1,
          scale: 1.5,
          ease: "elastic.out(1,0.3)",
          duration: BALL_DURATION
        },
        pct                               // timeline position = pct of scroll
      );
    });
  
    /* cleanup when component unmounts */
    return () => tl.scrollTrigger?.kill(true);
  }, []);   // run once
  
  

  /* render ------------------------------------------------------------- */
  return (
    <div style={{ height: "300vh", background: "#f0f0f0", paddingTop: "10vh" }}>
      <svg
        viewBox="0 0 600 1200"
        preserveAspectRatio="xMidYMin slice"
        style={{ width: "100%", height: "auto", display: "block", margin: "0 auto" }}
      >
        {/* main curved path */}
        <path
          ref={pathRef}
          d="
            M 0,0
            Q 450 230 300 450
            T 130 750
            Q 100 850 300 1000
            T 150 1200"
          stroke="#fe4939"
          strokeWidth="4"
          fill="none"
        />

        {/* guides + balls */}
        {milestones.map(({ label }, i) => (
          <g key={i}>
            {/* guide line (delete <line> if you don’t want guides) */}
            <line
              ref={(el) => (guideRefs.current[i] = el)}
              stroke="#bbbbbb"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            {/* optional text label anchored to the guide’s y‑pos */}
            {label && (
              <text
                x="610"
                y="0"
                ref={(el) => {
                  if (el && guideRefs.current[i]) {
                    el.setAttribute("y", guideRefs.current[i].getAttribute("y1"));
                  }
                }}
                fontSize="12"
                fill="#666"
              >
                {label}
              </text>
            )}
            {/* ball */}
            <circle
              ref={(el) => (ballRefs.current[i] = el)}
              r="10"
              fill="#fe4939"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

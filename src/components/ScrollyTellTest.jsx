import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";

// Example images
import JohnImage from "../assets/John.svg";
import JohnSad from "../assets/JohnSad.svg";
// Example chart
import SpermMotilityAge from "../components/Charts/SpermMotilityChart";
import MotilityOnly from "./Charts/MotilityOnly";
import CountOnly from "./Charts/CountOnly";



// Our custom CSS with the .scroll__graphic, .scroll-container, etc.
import "../simplifiedScrollamaStyles.css";

function MinimalScrollamaDemo() {
  // main scrollytelling container
  const containerRef = useRef(null);
  // text steps container
  const textRef = useRef(null);

  // We'll collect each .step into an array
  const stepRefs = useRef([]);
  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  // active step index
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const scroller = scrollama();

    // We'll resize each .step to 75% viewport
    const handleResize = () => {
      const stepHeight = Math.floor(window.innerHeight * 0.75);
      stepRefs.current.forEach((step) => {
        step.style.height = `${stepHeight}px`;
      });
      scroller.resize();
    };

    // On step enter, we set the active step
    const handleStepEnter = ({ index }) => {
      setActiveStep(index);
      // highlight the active step visually
      stepRefs.current.forEach((step, i) => {
        step.classList.toggle("is-active", i === index);
      });
    };

    // Initialize scrollama
    scroller
      .setup({
        container: containerRef.current, // main scrolly container
        text: textRef.current,          // the container with .step
        step: ".step",                  // each step class
        offset: 0.5,                    // trigger in the middle of the viewport
        debug: true,                    // show debug lines
      })
      .onStepEnter(handleStepEnter);

    // run once on load
    handleResize();
    window.addEventListener("resize", handleResize);

    // cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      scroller.destroy();
    };
  }, []);

  // We'll switch out the visual based on the activeStep
  const renderVisual = () => {
    if (activeStep === 0) {
      return (
        
        <div style={{ position: "relative" }}>
        <img
          src={JohnImage}
          alt="John sad"
          style={{ width: "80%", height: "auto", objectFit: "contain" }}
        />
        </div>
      );
    } else if (activeStep === 1) {
      // John Sad + Chart
      return (
        <div style={{ position: "relative" }}>
          <img
            src={JohnSad}
            alt="John sad"
            style={{ width: "80%", height: "auto", objectFit: "contain" }}
          />
          {/* Absolutely positioned chart overlay – ensure it's sized to fit */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              left: "30%",
              width: "40%", // a fraction of the parent's width
              height: "40%", 
            }}
          >
            <SpermMotilityAge />
          </div>
        </div>
      );
    } else if (activeStep === 2) {
        // John Sad + Chart
        return (
          <div style={{ position: "relative" }}>
            <MotilityOnly />
          </div>
        );
    } else if (activeStep === 3) {
        // John Sad + Chart
        return (
          <div style={{ position: "relative" }}>
                <CountOnly />
          </div>
        );
    } else {
      // Step 2 and beyond
      return (
        <p style={{ textAlign: "center" }}>
          No more visuals.  
        </p>
      );
    }
  };

  return (
    <section id="scroll" ref={containerRef}>
      <div className="scroll-container">

        {/* LEFT: sticky graphic panel */}
        <div className="scroll__graphic">
          <div className="chart">
            {renderVisual()}
          </div>
        </div>

        {/* RIGHT: scrolly text steps */}
        <div className="scroll__text" ref={textRef}>
          {/* Step 0 */}
          <div className="step" ref={addToStepRefs}>
            <h1>Step 0: John’s Intro</h1>
            <p>
              Scroll down to see the next step!
            </p>
          </div>

          {/* Step 1 */}
          <div className="step" ref={addToStepRefs}>
            <h2>Step 1: John Sad + Chart</h2>
            <p>
              We show the Sperm Motility Age chart overlay on JohnSad image.
            </p>
          </div>

            {/* Step 2 */}
            <div className="step" ref={addToStepRefs}>
            <h2>Step 2: Motility!</h2>
            <p>
              Motility
            </p>
          </div>

          {/* Step 3 */}
          <div className="step" ref={addToStepRefs}>
            <h2>Step 2: No more visuals!</h2>
            <p>
              The left side returns "No more visuals."
            </p>
          </div>

         


          {/* Extra space so Step 2 can actually become active */}
          <div style={{ height: "100vh" }} />
        </div>
      </div>
    </section>
  );
}

export default MinimalScrollamaDemo;

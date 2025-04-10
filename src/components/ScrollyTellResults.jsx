import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import { motion, AnimatePresence } from "framer-motion";

// Import the new CSS file with your updated class names
import "../ScrollamastylesResults.css";

function ScrollamaResults() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
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

    // Resize each step to 75% of the viewport
    const handleResize = () => {
      const stepHeight = Math.floor(window.innerHeight * 0.75);
      stepRefs.current.forEach((step) => {
        step.style.height = `${stepHeight}px`;
      });
      scroller.resize();
    };

    // Handle step enter events
    const handleStepEnter = ({ index }) => {
      console.log("Entering step index:", index, "Total steps:", stepRefs.current.length);
      setActiveStep(index);
      // Toggle the active class on each step
      stepRefs.current.forEach((step, i) => {
        step.classList.toggle("is-active", i === index);
      });
      window.dispatchEvent(new Event('resize'));
    };

    // Initialize scrollama
    scroller
      .setup({
        container: containerRef.current, // main scrolly container
        text: textRef.current,           // container holding the steps
        step: ".results-step",           // step elements (new class name)
        offset: 0.5,                     // trigger at 50% of the viewport
        debug: false,
      })
      .onStepEnter(handleStepEnter);

    // Run initial resize
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      scroller.destroy();
    };
  }, []);

  // Optionally disable animation on certain steps
  const shouldAnimate = [2, 3].includes(activeStep);

  const renderVisual = () => {
    if (activeStep === 0) {
      return (
        <div style={{ position: "relative" }}>
          {/* Visuals for step 0 */}
        </div>
      );
    } else if (activeStep === 1) {
      return (
        <div style={{ position: "relative" }}>
          {/* Visuals for step 1 */}
          <div>{/* Chart overlay */}</div>
        </div>
      );
    } else if (activeStep === 2) {
      return <div style={{ width: '80%', height: '400px' }}>{/* Visual for step 2 */}</div>;
    } else if (activeStep === 3) {
      return <div style={{ width: '80%', height: '400px' }}>{/* Visual for step 3 */}</div>;
    } else if (activeStep === 4) {
      return <div style={{ width: '80%', height: '400px' }}>{/* Visual for step 4 */}</div>;
    } else if (activeStep === 5) {
      return <div style={{ width: '80%', height: '400px' }}>{/* Visual for step 5 */}</div>;
    } else if (activeStep === 6) {
      return <div style={{ width: '90%', height: '1000px' }}>{/* Visual for step 6 */}</div>;
    } else if (activeStep === 7) {
      return <div style={{ width: '80%', height: '400px' }}>{/* Visual for step 7 */}</div>;
    }
  };

  return (
    <section id="scroll" ref={containerRef}>
      <div className="scroll-results-container">
        {/* LEFT: sticky graphic panel */}
        <div className="scroll-results__graphic">
          <AnimatePresence mode="wait">
            {shouldAnimate ? (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="results-chart"
              >
                {renderVisual()}
              </motion.div>
            ) : (
              <div className="results-chart" key={activeStep}>
                {renderVisual()}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT: scrolly text steps */}
        <div className="results-scroll__text" ref={textRef}>
          <div className="results-step" ref={addToStepRefs}>
            <h1>Step 0: John’s Intro</h1>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 1: John Sad + Chart</h2>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 2: Motility!</h2>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 3: Count!</h2>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 4: TTP!</h2>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 5: Wafflechart!</h2>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 6: Tableau!</h2>
          </div>
          <div className="results-step" ref={addToStepRefs}>
            <h2>Step 7: Track Video!</h2>
          </div>
          {/* Extra space if needed */}
          <div style={{ height: "0vh" }} />
        </div>
      </div>
    </section>
  );
}

export default ScrollamaResults;

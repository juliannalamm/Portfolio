import React, { useEffect, useRef } from "react";
import scrollama from "scrollama";
import Plot from "react-plotly.js";
import "../scrollamaStyles.css";

export const ScrollamaDemo = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const stepRefs = useRef([]);
  // No ref for graphic is needed for sticky behavior since CSS handles it

  // Helper function to gather step references
  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  useEffect(() => {
    const scroller = scrollama();

    const handleResize = () => {
      const stepHeight = Math.floor(window.innerHeight * 0.75);
      stepRefs.current.forEach((step) => {
        step.style.height = `${stepHeight}px`;
      });
      scroller.resize();
    };

    const handleStepEnter = ({ index }) => {
      stepRefs.current.forEach((step, i) => {
        if (i === index) {
          step.classList.add("is-active");
        } else {
          step.classList.remove("is-active");
        }
      });
      // Optionally update the graphic (e.g. update Plotly chart) based on active step
    };

    scroller
      .setup({
        container: containerRef.current,
        text: textRef.current,
        step: ".step",
        offset: 0.5,
        debug: false,
      })
      .onStepEnter(handleStepEnter);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      scroller.destroy();
    };
  }, []);

  return (
    <section id="scroll" ref={containerRef}>
      <div className="scroll-container">
        {/* Sticky graphic container on the left */}
        <div className="scroll__graphic">
          <div className="chart">
            <Plot
              data={[
                {
                  x: [1, 2, 3, 4],
                  y: [2, 6, 3, 5],
                  type: "scatter",
                  mode: "lines+markers",
                },
              ]}
              layout={{ title: "Plotly Chart" }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
            />
          </div>
        </div>

        {/* Text container with steps on the right */}
        <div className="scroll__text" ref={textRef}>
          <div className="step" data-step="1" ref={addToStepRefs}>
            <p>STEP 1</p>
          </div>
          <div className="step" data-step="2" ref={addToStepRefs}>
            <p>STEP 2</p>
          </div>
          <div className="step" data-step="3" ref={addToStepRefs}>
            <p>STEP 3</p>
          </div>
          <div className="step" data-step="4" ref={addToStepRefs}>
            <p>STEP 4</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollamaDemo;

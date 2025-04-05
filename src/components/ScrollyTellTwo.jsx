import React, { useEffect, useRef } from "react";
import scrollama from "scrollama";
import Plot from "react-plotly.js";
import "../scrollamaStyles.css";

export const ScrollamaDemoTwo = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const stepRefs = useRef([]);

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
        step.classList.toggle("is-active", i === index);
      });

      // Here you can switch the graph content based on the step index if you want
    };

    scroller
      .setup({
        container: containerRef.current,
        text: textRef.current,
        step: ".step",
        offset: 0.5,
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
    <section id="scroll-2" ref={containerRef}>
      <div className="scroll-container">
        {/* Sticky graphic container on the left */}
        <div className="scroll__graphic">
          <div className="chart">
            <Plot
              data={[
                {
                  x: [10, 20, 30, 40],
                  y: [5, 15, 8, 20],
                  type: "bar",
                },
              ]}
              layout={{ title: "Second Graph - Bar Chart" }}
              style={{ width: "100%", height: "100%" }}
              useResizeHandler={true}
            />
          </div>
        </div>

        {/* Text container with steps on the right */}
        <div className="scroll__text" ref={textRef}>
          <div className="step" data-step="1" ref={addToStepRefs}>
            <p>SECTION TWO — STEP 1</p>
          </div>
          <div className="step" data-step="2" ref={addToStepRefs}>
            <p>SECTION TWO — STEP 2</p>
          </div>
          <div className="step" data-step="3" ref={addToStepRefs}>
            <p>SECTION TWO — STEP 3</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollamaDemoTwo;

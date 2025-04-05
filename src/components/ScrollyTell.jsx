import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import Plot from "react-plotly.js";
import "../scrollamaStyles.css";
import JohnImage from "../assets/John.svg";



export const ScrollamaDemo = () => {
  const containerRef = useRef(null); //reference to the main <section> that wraps scrollytelling. lets us refer to specific part of webpage
  const textRef = useRef(null); //points to the container of the steps
  const stepRefs = useRef([]); // is an array of individual step elements

  const [activeStep, setActiveStep] = useState(0); // state to keep track of the active step

  // as each step of a <div> selement is rendered the function collects them into stepRefs array
  const addToStepRefs = (el) => {
    if (el && !stepRefs.current.includes(el)) {
      stepRefs.current.push(el);
    }
  };

  //instantiate a scrollama instance  
  useEffect(() => {
    const scroller = scrollama(); // scrollama instance. UseEffect hook  to allow us to runcode after the component is shown on the screen. "do something to this"

    // when browser resizes, tell scrollama to make each step taller 
    const handleResize = () => {
      const stepHeight = Math.floor(window.innerHeight * 0.75);
      stepRefs.current.forEach((step) => {
        step.style.height = `${stepHeight}px`;
      });
      scroller.resize();
    };

    // when you scroll to a step, scrollama gives us an index. we loop through every step, if its the current step we highlight it by adding a class
    const handleStepEnter = ({ index }) => {
      setActiveStep(index); // update the active step state
      stepRefs.current.forEach((step, i) => {
        step.classList.toggle("is-active", i === index); // add class to the active step
      });
    };

    //hook everything up to scrollama, tells scrollama where everything is

    scroller
      .setup({
        container: containerRef.current,
        text: textRef.current,
        step: ".step", // track every element that has class "step"
        offset: 0.5,
        debug: false,
      })
      .onStepEnter(handleStepEnter); // when a new step is entered, run the function above 

    handleResize(); // run the resize function to set the height of each step
    window.addEventListener("resize", handleResize); //update when window changes 
    return () => {
      window.removeEventListener("resize", handleResize); // cleanup when component removed
      scroller.destroy(); // tell scrollama to shut down 
    };
  }, []);

  const chartForStep = (step) => {
    if (step === 0 || step === 1) {
      return [
        {
          data: [
            { x: [1, 2, 3], y: [10, 15, 13], type: "scatter", mode: "lines+markers" },
          ],
          layout: { title: "Line Chart (Steps 1 & 2)" },
        },
      ];
    } else if (step === 2 || step === 3 || step === 4) {
      return [
        {
          data: [
            { x: ["A", "B", "C"], y: [5, 7, 3], type: "bar" },
          ],
          layout: { title: "Bar Chart (Steps 3–5)" },
        },
      ];
    } else {
      return [
        {
          data: [],
          layout: { title: "Fallback or empty chart" },
        },
      ];
    }
  };


  const { data, layout } = chartForStep(activeStep)[0];


  return (
    // useRef to point to the main section of the page
    <section id="scroll" ref={containerRef}>
      {/* our div container holding graphic area on left and text/step area on right, display: flex is defined in CSS to lay the two columns side by side*/}
      <div className="scroll-container bg-lightblue">
        {/* Sticky graphic container on the left*/}
        <div className="scroll__graphic">
          <div className="chart">
            {activeStep >= 0 && activeStep <= 2 ? (
              <img
                src={JohnImage}
                alt="John illustration"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            ) : activeStep === 3 ? (
              <Plot
                data={[{ x: [1, 2, 3], y: [4, 5, 6], type: "scatter" }]}
                layout={{ title: "Line Chart for Step 1" }}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
              />
            ) : activeStep === 4 ? (
              <Plot
                data={[{ x: ["A", "B", "C"], y: [10, 8, 6], type: "bar" }]}
                layout={{ title: "Bar Chart for Step 2" }}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
              />
            ) : (
              <div style={{ textAlign: "center", padding: "2rem" }}>
                <p>No visualization for this step.</p>
              </div>
            )}
          </div>

        </div>

        {/* Text container with steps on the right, defined in css classes
         1. Scrollama looks for .step elements className = step to track
         2. data-step is used to identify the step number
         3. ref={addToStepRefs} is used to collect each step into the stepRefs array
        
        */}
        <div className="scroll__text" ref={textRef}>
          <div className="step" ref={addToStepRefs}>
            <h1 className="text-4xl font-extrabold text-burgundy mt-8 text-center">
              Meet John
            </h1>
            <p>This is Step 1 — shows Line Chart</p>
          </div>
          <div className="step" ref={addToStepRefs}>
            <p>This is Step 2 — also shows Line Chart</p>
          </div>
          <div className="step" ref={addToStepRefs}>
            <p>This is Step 3 — now shows Bar Chart</p>
          </div>
          <div className="step" ref={addToStepRefs}>
            <p>This is Step 4 — still shows Bar Chart</p>
          </div>
          <div className="step" ref={addToStepRefs}>
            <p>This is Step 5 — still shows Bar Chart</p>
          </div>
          {/* end of scroll__text */}
        </div>
        {/* end of scroll-container */}
      </div>
      {/* end of whole section */}
    </section>
  );
};

export default ScrollamaDemo;

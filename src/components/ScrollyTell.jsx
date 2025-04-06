import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import Plot from "react-plotly.js";
import "../scrollamaStyles.css";
import JohnImage from "../assets/John.svg";
import SpermAgePlot from "../components/Charts/SpermAgeChart";
import SpermMotilityAge from "../components/Charts/SpermMotilityChart";
import JohnSad from "../assets/JohnSad.svg";




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
            {activeStep === 0 ? (
              <div className=" mx-auto mt-60">
                <img
                  src={JohnImage}
                  alt="John illustration"
                  style={{ width: "70%", height: "100%", objectFit: "contain" }}
                />
              </div>
            ) : activeStep === 1 ? (

              <div className=" mx-auto mt-60">
                <img
                  src={JohnImage}
                  alt="John illustration"
                  style={{ width: "70%", height: "100%", objectFit: "contain" }}
                />
              </div>
            ) : activeStep === 2 ? (
              <div className=" mx-auto mt-60" style={{ position: "relative" }}>
                <img
                  src={JohnSad}
                  alt="John illustration"
                  style={{ width: "70%", height: "100%", objectFit: "contain" }}
                />

                {/* Chart container positioned absolutely */}
                <div style={{
                  position: "absolute",
                  top: "-170px",    // Adjust this value as needed
                  right: "0",
                  left: "230px",    // Some padding from the right edge
                  width: "600px",   // Fixed width instead of percentage
                  height: "320px",  // Fixed height to maintain aspect ratio
                  aspectRatio: "4/3",
                  backgroundColor: "rgba(255,255,255,0.0)"  // Transparent background
                }}>
                  <SpermMotilityAge />
                </div>
              </div>

            ) : activeStep === 3 ? (
              <div className=" mx-auto mt-60" style={{ position: "relative" }}>
                <img
                  src={JohnSad}
                  alt="John illustration"
                  style={{ width: "70%", height: "100%", objectFit: "contain" }}
                />


                
                {/* Chart container positioned absolutely */}
                <div style={{
                  position: "absolute",
                  top: "-170px",    // Adjust this value as needed
                  right: "0",
                  left: "230px",    // Some padding from the right edge
                  width: "600px",   // Fixed width instead of percentage
                  height: "320px",  // Fixed height to maintain aspect ratio
                  aspectRatio: "4/3",
                  backgroundColor: "rgba(255,255,255,0.0)"  // Transparent background
                }}>
                  <SpermMotilityAge />
                </div>
              </div>
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
          {/* Step 0 */}
          <div className="step flex flex-col" ref={addToStepRefs}>
            <h1 className="text-6xl font-extrabold text-burgundy mt-20 mb-20 text-center">
              Meet John!
            </h1>
            <p className="text-[1.175rem] text-burgundy max-w-3xl text-left mx-auto mb-10">
              John is a 35-year-old male. He is a healthy individual with no known medical conditions.
            </p>
          </div>

          {/* Step 1 */}
          <div className="step" ref={addToStepRefs}>
            <p className="text-[1.175rem] text-burgundy max-w-3xl text-left mx-auto mb-10">
            Recently, John and his partner have been trying to conceive, but they have not been successful.

            </p>
          </div>

          {/* Step 2 */}
          <div className="step" ref={addToStepRefs}>
            <p className="text-[1.175rem] text-burgundy max-w-3xl text-left mb-20 mx-auto">
            As it turns out, this isn't super uncommon, and he is certainly not alone. 
            </p>
            <p className="text-[1.175rem] text-burgundy max-w-3xl text-left mb-20 mx-auto"> 
            Data from multiple studies show that sperm quality begins to decline in men around the age of 35.
            
            <br /> <br></br>
            We calculated the percent change across three metrics from age 20-50 <br></br>

            <ul className="list-disc list-inside">
              <li>Sperm Motility</li>
              <li>Sperm Morphology</li>
              <li>Sperm Concentration</li>
            </ul>
            </p>
          </div>

          {/* Step 3 */}
          <div className="step" ref={addToStepRefs}>
            <p>This is Step 4 — still shows Bar Chart</p>
          </div>

          {/* Step 4 */}
          <div className="step" ref={addToStepRefs}>
            <p>This is Step 5 — still shows Bar Chart</p>
          </div>
        </div>
        {/* end of scroll-container */}
      </div>
      {/* end of whole section */}
    </section>
  );
};

export default ScrollamaDemo;

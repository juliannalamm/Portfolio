import React, { useEffect, useRef } from "react";
import scrollama from "scrollama";
import Plot from "react-plotly.js";
import "../scrollamaStyles.css";


export const ScrollamaDemo = () => {
  const containerRef = useRef(null); //reference to the main <section> that wraps scrollytelling. lets us refer to specific part of webpage
  const textRef = useRef(null); //points to the container of the steps
  const stepRefs = useRef([]); // is an array of individual step elements 

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
      stepRefs.current.forEach((step, i) => {
        if (i === index) {
          step.classList.add("is-active");
        } else {
          step.classList.remove("is-active");
        }
      });
      // Optionally update the graphic (e.g. update Plotly chart) based on active step
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

  return (
    // useRef to point to the main section of the page
    <section id="scroll" ref={containerRef}>
      {/* our div container holding graphic area on left and text/step area on right, display: flex is defined in CSS to lay the two columns side by side*/}
      <div className="scroll-container"> 
        {/* Sticky graphic container on the left*/}
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
              style={{ width: "100%", height: "100%" }} // stretches to fill the container
              useResizeHandler={true}
            />
          </div>
        </div>

        {/* Text container with steps on the right, defined in css classes
         1. Scrollama looks for .step elements className = step to track
         2. data-step is used to identify the step number
         3. ref={addToStepRefs} is used to collect each step into the stepRefs array
        
        */}
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
          {/* end of scroll__text */}
        </div> 
        {/* end of scroll-container */}
      </div>
      {/* end of whole section */}
    </section>
  );
};

export default ScrollamaDemo;

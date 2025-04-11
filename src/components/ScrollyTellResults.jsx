
import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import { motion, AnimatePresence } from "framer-motion";




// Our custom CSS with the .scroll__graphic, .scroll-container, etc.
import "../ScrollamastylesResults.css";
import FertilityClusterChart from "./Charts/FertilityClusterChart"; // change toggle to fertility cluster chart if issue with rendering 
import FertilityChartToggle from './Charts/FertilityChartToggle';


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
    const [activeStep, setActiveStep] = useState(0); //active step is the current value of the state variable (initialized to zero) and will store the active step. setActive step is the function used to update the state





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
            console.log("Entering step index:", index, "Total steps:", stepRefs.current.length);
            setActiveStep(index);
            // highlight the active step visually
            stepRefs.current.forEach((step, i) => {
                step.classList.toggle("is-active", i === index);
            });
            window.dispatchEvent(new Event('resize'));

        };

        // Initialize scrollama
        scroller
            .setup({
                container: containerRef.current, // main scrolly container
                text: textRef.current,          // the container with .step
                step: ".results-step",                  // each step class
                offset: 0.5,                    // trigger in the middle of the viewport
                debug: false,                    // show debug lines
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

    // keep johnhappy to johnsad as unanimated. 
    const shouldAnimate = [2, 3].includes(activeStep);




    const renderVisual = () => {
        if (activeStep === 0) {
            return (

                <div style={{ position: "relative" }}>
                    <div style={{ position: "relative", width: '100%', height: '100%' }}>
                        <FertilityChartToggle />
                    </div>

                </div>
            );
        } else if (activeStep === 1) {
            // John Sad + Chart
            return (
                <div style={{ position: "relative" }}>

                </div>
            );
        } else if (activeStep === 2) {

            return (
                <div style={{ width: '80%', height: '400px' }}>

                </div>
            );
        } else if (activeStep === 3) {

            return (
                <div style={{ width: '80%', height: '400px' }}>

                </div>
            );
        } else if (activeStep === 4) {
            return (
                <div style={{ width: '80%', height: '400px' }}>

                </div>
            );

        } else if (activeStep === 5) {
            return (
                <div style={{ width: '80%', height: '400px' }}>

                </div>
            );
        } else if (activeStep === 6) {
            return (
                // attach ref to the wrapper div so that we can measure the width 
                <div
                    style={{ width: '90%', height: '1000px' }}>

                </div>
            );
        } else if (activeStep === 7) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                </div>
            );
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
                                className="chart"
                            >
                                {renderVisual()}
                            </motion.div>
                        ) : (
                            <div className="chart" key={activeStep}>
                                {renderVisual()}
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT: scrolly text steps */}
                <div className="results-scroll__text" ref={textRef}>
                    {/* Step 0 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h1>Step 0: John’s Intro</h1>

                    </div>

                    {/* Step 1 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 1: John Sad + Chart</h2>

                    </div>

                    {/* Step 2 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 2: Motility!</h2>

                    </div>
                    {/* Step 3 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 3: Count!</h2>

                    </div>

                    {/* Step 4 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 4: TTP!</h2>

                    </div>
                    {/* Step 5 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 5: wafflechart!</h2>

                    </div>

                    {/* Step 6 */}
                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 6: tableau!</h2>

                    </div>
                    {/* Step 7 */}

                    <div className="results-step" ref={addToStepRefs}>
                        <h2>Step 7: track video !</h2>

                    </div>


                    {/* Extra space so Step 2 can actually become active */}
                    <div style={{ height: "0vh" }} />
                </div>
            </div>
        </section>
    );
}

export default ScrollamaResults;

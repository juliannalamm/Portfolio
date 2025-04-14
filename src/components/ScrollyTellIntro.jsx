/* REMINDER TO SELF, IF THE LAST STEP IS NOT GETTING ACTIVATED AND YOU HAVE
CHECKED THAT THERE IS NO MISMATCH IN THE STEPS AND GRAPHIC LOGIC, THEN REFRESH THE 
DAMN PAGE
*/


import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import TableauReport from "tableau-react";
import { motion, AnimatePresence } from "framer-motion";



// images
import JohnImage from "../assets/John.svg";
import JohnSad from "../assets/JohnSad.svg";
// chart
import SpermMotilityAge from "./Charts/SpermMotilityChart";
import MotilityOnly from "./Charts/MotilityOnly";
import CountOnly from "./Charts/CountOnly";
import TTPOnly from "./Charts/TTPOnly";
import FertilityWaffleChart from "./Charts/FertilityWaffleChart";
import TrackVideoGrid from "./Charts/TrackVideoGrid";




// Our custom CSS with the .scroll__graphic, .scroll-container, etc.
import "../simplifiedScrollamaStyles.css";

function ScrollamaIntro() {
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
    const tableauWrapperRef = useRef(null); //access tableau element, once the component renders we will point to the element its attached to 
    const [tableauWidth, setTableauWidth] = useState(900);

    const tableauUrl =
        "https://public.tableau.com/views/Tracks_17439916171590/Dashboard1?:language=en-US&publish=yes&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link";

    const tableauOptions = {
        height: 800,
        width: tableauWidth,
        hideTabs: false,
    };


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
        // checks if the ref is pointing to the actual element, gets width of the element (offsetWidth) stores the width in the state variable
        const updateTableauWidth = () => {
            if (tableauWrapperRef.current) {
                const containerWidth = tableauWrapperRef.current.offsetWidth;
                setTableauWidth(containerWidth);
            }
        };

        // On step enter, we set the active step
        const handleStepEnter = ({ index }) => {
            // console.log("Entering step index:", index); // debug
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
                step: ".step",                  // each step class
                offset: 0.5,                    // trigger in the middle of the viewport
                debug: false,                    // show debug lines
            })
            .onStepEnter(handleStepEnter);

        // run once on load
        handleResize();
        updateTableauWidth()
        window.addEventListener("resize", handleResize);
        window.addEventListener("resize", updateTableauWidth); // Update on resize


        // cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("resize", updateTableauWidth); // Update on resize
            scroller.destroy();
        };
    }, []);

    // keep johnhappy to johnsad as unanimated. 
    const shouldAnimate = [2, 3].includes(activeStep);




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
                            top: "-40%",
                            left: "30%",
                            width: "70%", // a fraction of the parent's width
                            height: "90%",
                        }}
                    >
                        <SpermMotilityAge />
                    </div>
                </div>
            );
        } else if (activeStep === 2) {
            // John Sad + Chart
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <MotilityOnly />
                </div>
            );
        } else if (activeStep === 3) {
            // John Sad + Chart
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <CountOnly />
                </div>
            );
        } else if (activeStep === 4) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <TTPOnly />
                </div>
            );

        } else if (activeStep === 5) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <FertilityWaffleChart />
                </div>
            );
        } else if (activeStep === 6) {
            return (
                // attach ref to the wrapper div so that we can measure the width 
                <div
                    ref={tableauWrapperRef}
                    style={{ width: '80%', height: '1000px' }}>
                    <TableauReport
                        url={tableauUrl}
                        options={tableauOptions}
                        query="?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes"
                    />
                </div>
            );
        } else if (activeStep === 7) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <TrackVideoGrid />
                </div>
            );
        }
    };

    return (
        <section id="scroll" ref={containerRef}>
            <div className="scroll-container">

                {/* LEFT: sticky graphic panel */}
                <div className="scroll__graphic">

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
                        <h2 className="text-center mt-10">Step 1: John Sad + Chart</h2>
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
                        <h2>Step 3: Count!</h2>
                        <p>
                            Count
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 4: TTP!</h2>
                        <p>
                            TTP
                        </p>
                    </div>
                    {/* Step 5 */}
                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 5: wafflechart!</h2>
                        <p>
                            TTP
                        </p>
                    </div>

                    {/* Step 6 */}
                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 6: tableau!</h2>
                        <p>
                            Tableau will go here
                        </p>
                    </div>
                    {/* Step 7 */}

                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 7: track video !</h2>
                        <p>
                            track video
                        </p>
                    </div>


                    {/* Extra space so Step 2 can actually become active */}
                    <div style={{ height: "0vh" }} />
                </div>
            </div>
        </section>
    );
}

export default ScrollamaIntro;

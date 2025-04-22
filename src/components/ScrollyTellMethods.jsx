/* REMINDER TO SELF, IF THE LAST STEP IS NOT GETTING ACTIVATED AND YOU HAVE
CHECKED THAT THERE IS NO MISMATCH IN THE STEPS AND GRAPHIC LOGIC, THEN REFRESH THE 
DAMN PAGE
*/

///NEED TO CHANGE RESULTS.STEP TO METHODS.STEP (SAME WITH JUST STEPS)
import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import TableauReport from "tableau-react";
import { motion, AnimatePresence } from "framer-motion";



//images



// chart
import FertilityWaffleChart from "./Charts/FertilityWaffleChart";
import TrackVideoGrid from "./Charts/TrackVideoGrid";




// Our custom CSS with the .scroll__graphic, .scroll-container, etc.
import "../ScrollamaStylesMethods.css";


function ScrollamaMethods() {
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
        "https://public.tableau.com/views/Tracks2_17448553603710/Dashboard13?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link"
    const tableauOptions = {
        height: 900,
        width: tableauWidth,
        hideTabs: true,
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
            console.log("Entering step index:", index); // debug
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
            step: ".methods-step",                  // each step class
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
    const shouldAnimate = [2, 3, 4, 5, 6].includes(activeStep);




    const renderVisual = () => {
        if (activeStep === 0) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                <FertilityWaffleChart />
            </div>
            );
        } else if (activeStep === 1) {
            return (
                <div
                ref={tableauWrapperRef}
                style={{ width: '90%', height: '800px' }}>
                <TableauReport
                    url={tableauUrl}
                    options={tableauOptions}
                    query="?:embed=yes&:comments=no&:toolbar=yes&:refresh=yes"
                />
            </div>
        );
        } else if (activeStep === 2) {

            return (
                <div style={{ width: '80%', height: '400px' }}>
                <TrackVideoGrid />
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
        }     
     
    };

    return (
        <section id="scroll" ref={containerRef}>
            <div className="scroll-methods-container">

                {/* LEFT: sticky graphic panel */}
                <div className="scroll-methods__graphic">

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
                <div className="methods-scroll__text" ref={textRef}>
                    {/* Step 0 */}
                    <div className="methods-step" ref={addToStepRefs}>
                        <div className="pt-10">
                            <h2 className="text-center text-xl mb-10"> </h2>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">&nbsp;</p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6"></p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6"> &nbsp; </p>
                        </div>


                    </div>

                    {/* Step 1 */}
                    <div className="methods-step" ref={addToStepRefs}>
                        <div>
                            <p className="text-left mb-20 pl-6"> </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                               
                            </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>

                    </div>
                    {/* Step 2 */}
                    <div className="methods-step" ref={addToStepRefs}>
                        <div>
                            <p className="text-left mb-20 pl-6"> </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                               
                            </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>

                    </div>

                    {/* Step 3 */}
                    <div className="methods-step" ref={addToStepRefs}>
                        <div>
                            <p className="text-left mb-20 pl-6"> </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                               
                            </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>

                    </div>

                    {/* Step 4 */}
                    <div className="methods-step" ref={addToStepRefs}>
                        <div>
                            <p className="text-left mb-20 pl-6"> </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                               
                            </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>

                    </div>
                    {/* Step 5 */}
                    <div className="methods-step" ref={addToStepRefs}>
                        <div>
                            <p className="text-left mb-20 pl-6"> </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                               
                            </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;
                            </p>

                        </div>

                    </div>



                    {/* Extra space so Step 2 can actually become active */}
                    <div style={{ height: "0vh" }} />
                </div>
            </div>
        </section >
    );
}

export default ScrollamaMethods;

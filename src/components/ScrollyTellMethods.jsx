/* REMINDER TO SELF, IF THE LAST STEP IS NOT GETTING ACTIVATED AND YOU HAVE
CHECKED THAT THERE IS NO MISMATCH IN THE STEPS AND GRAPHIC LOGIC, THEN REFRESH THE 
DAMN PAGE
*/

///NEED TO CHANGE RESULTS.STEP TO METHODS.STEP (SAME WITH JUST STEPS)
import React, { useEffect, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import scrollama from "scrollama";
import { motion, AnimatePresence } from "framer-motion";



//images
import labeledSperm from "/images/detectionresults/YOLOv8s/labels.jpg"
import predictedSperm from "/images/detectionresults/YOLOv8s/prediction.jpg"
import flowChart from "/images/EntireFrame.png"
import trackingResults from "/videos/12custom_botsort_compressed.mp4"
import SpermTrajectories from "/videos/SpermTrajectories.mp4"
// chart
import FertilityWaffleChart from "./Charts/FertilityWaffleChart";
import TrackVideoGrid from "./Charts/TrackVideoGrid";
import KinematicMetricsDef from "./KinematicMetricsDef";



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
        window.addEventListener("resize", handleResize);


        // cleanup on unmount
        return () => {
            window.removeEventListener("resize", handleResize);
            scroller.destroy();
        };
    }, []);

    // keep johnhappy to johnsad as unanimated. 
    const shouldAnimate = [0, 3, 4, 5, 6].includes(activeStep);




    const renderVisual = () => {
        if (activeStep === 0) {
            return (
                <div style={{ width: '80%', height: '700px' }}>
                    <h2 className="text-2xl font-bold text-burgundy mb-8 text-center">
                        Overview of Model Training, Feature Engineering, and Classification</h2>
                    <img
                        src={flowChart}
                        alt="Flow Chart"
                        style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                    />
                </div>
            );

        } else if (activeStep === 1) {
            return (

                <div className="w-4/5 flex justify-between items-start gap-2">
                    <div className="w-[48%] text-center">
                        <img
                            src={labeledSperm}
                            alt="Labeled Sperm"
                            className="w-full h-auto object-contain"
                        />
                        <p className="mt-2 text-sm text-burgundy">
                            Ground truth bounding boxes from the annotated dataset.
                        </p>
                    </div>
                    <div className="w-[48%] text-center">
                        <img
                            src={predictedSperm}
                            alt="Predicted Labels for Sperm"
                            className="w-full h-auto object-contain"
                        />
                        <p className="mt-2 text-sm text-burgundy">
                            Model-predicted bounding boxes after training.
                        </p>
                    </div>
                </div>

            );

        } else if (activeStep === 2) {
            return (
                <div className={{ width: '80%', height: '400px' }}>
                    <video
                        className="w-full h-full object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src={trackingResults} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            );
        } else if (activeStep === 3) {
            return (
                <div style={{ width: '80%', height: '500px' }}>
                    <video
                        className="object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                    >
                        <source src={SpermTrajectories} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            );
        } else if (activeStep === 4) {
            return (
                <div style={{ width: '80%', height: '800px' }}>
                    <KinematicMetricsDef />
                </div>

            );



        } else if (activeStep === 5) {
            return (
                <div>
                </div>
            );
        } else if (activeStep === 6) {

            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <TrackVideoGrid />
                </div>
            );
        } else if (activeStep === 7) {
            return (
                <div style={{ width: '80%', height: '400px' }}>

                </div>
            );
        } else if (activeStep === 8) {

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
                    <div
                        className="methods-step flex flex-col justify-evenly items-center text-left pl-6 h-full"
                        ref={addToStepRefs}
                    >
                        <h2 className="text-xl font-semibold">Dataset and Methods</h2>

                        <p className="max-w-2xl">
                            This project leverages the
                            <a
                                href="https://zenodo.org/records/7293726"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                {" "}VISEM-Tracking dataset
                            </a>, containing manually annotated sperm tracking data including video recordings of 30 seconds, comprising 29,196 frames from 20 participants.
                        </p>

                        <p className="max-w-2xl">
                            These videos were used to train a deep learning model capable of detecting and tracking individual sperm cells across frames. Learn more
                            <Link to="/sperm-track" className="text-blue-600 hover:underline"> here</Link>.
                        </p>

                        <p className="max-w-2xl">
                            Using the resulting trajectories, we classified distinct patterns of sperm movement, enabling a more nuanced understanding of motility beyond traditional CASA metrics.
                        </p>
                    </div>




                {/* Step 1 */}
                <div
                    className="methods-step flex flex-col justify-evenly items-start text-left h-full"
                    ref={addToStepRefs}
                >
                    <p className="max-w-2xl">
                        Results from model detection training are shown to the left. The blue boxes are known as "bounding boxes" and identify the positions of
                        sperm objects in the image.
                    </p>
                    <p className="max-w-2xl">
                        The model successfully identifies and localizes individual sperm cells with high accuracy.

                    </p>
                </div>
                {/* Step 2 */}
                <div
                    className="methods-step flex flex-col justify-evenly items-start text-left h-full"
                    ref={addToStepRefs}
                >
                    <p className="max-w-2xl">
                        After object-detection training, each frame was passed through
                        a Kalman-filter based tracking model called BoT-SORT.
                    </p>
                    <p className="max-w-2xl">
                        Custom modifications were made to improve performance in high-occlusion environments, ensuring better identity preservation over time.
                    </p>
                    <p className="max-w-2xl">
                       The bounding box coordinates identifying individual sperm across frames from the tracking algorithm can then be used to visualize trajectories!
                    </p>
                </div>

                {/* Step 3 */}
                <div
                    className="methods-step flex flex-col justify-evenly items-start text-left h-full"
                    ref={addToStepRefs}
                >
                    <p className="max-w-2xl">
                        The coordinates for a portion of the sperm identified are plotted and animated. 
                    </p>
                    <p className="max-w-2xl">
                        Each line is colored by the type of sperm movement the sperm exhibits. Note the straight movement of the red lines, erratic movement of the yellow, and jagged movement of the blue. 
                    </p>
                    <p className="max-w-2xl">
                        Wait, but how did we classify these sperm movements?
                    </p>
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

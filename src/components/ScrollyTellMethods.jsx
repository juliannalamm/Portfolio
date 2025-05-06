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

    //active step index
    const [activeStep, setActiveStep] = useState(0); //active step is the current value of the state variable (initialized to zero) and will store the active step. setActive step is the function used to update the state





    useEffect(() => {
        const scroller = scrollama();
        const isMobile = () => window.innerWidth <= 768;

        // Resize each .step to a fraction of the viewport
        const handleResize = () => {
            const ratio = isMobile() ? 0.5 : 1.25;
            const stepHeight = Math.floor(window.innerHeight * ratio);
            stepRefs.current.forEach((step) => {
                step.style.height = `${stepHeight}px`;
            });
            scroller.resize();
        };

        // Update activeStep on enter
        const handleStepEnter = ({ index }) => {
            setActiveStep(index);
            stepRefs.current.forEach((step, i) => {
                step.classList.toggle("is-active", i === index);
            });
            // force a resize in case graphic panel needs adjustment
            window.dispatchEvent(new Event("resize"));
        };

        scroller
            .setup({
                container: containerRef.current,
                text: textRef.current,
                step: ".methods-step",
                offset: isMobile() ? 0.5 : 0.6,
                debug: false,
            })
            .onStepEnter(handleStepEnter);

        // initial sizing & listeners
        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            scroller.destroy();
        };
    }, []);

    // keep johnhappy to johnsad as unanimated. 
    const shouldAnimate = [0, 1, 2, 3, 4, 5, 6].includes(activeStep);




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

                <div className="w-4/5 mx-auto flex flex-col items-center">
                    <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
                        Model Detection Results
                    </h2>

                    <div className="w-full flex justify-between items-start gap-2">
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
                </div>


            );

        } else if (activeStep === 2) {
            return (


                <div style={{ width: '80%', height: '400px' }}>
                    <h2 className="text-xl font-semibold text-center text-burgundy mb-4">
                        Object Tracking Results
                    </h2>
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
                <div style={{ width: '80%', height: '600px' }}>
                    <video
                        className="w-full h-full object-contain"
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
                <div className="chart-content">
                    <KinematicMetricsDef />
                </div>

            );

        } else if (activeStep === 5) {
            return (
                <div className= "chart-content" style={{ width: '80%', height: '400px' }}>
                    <TrackVideoGrid />
                </div>
            );
        } else if (activeStep === 6) {

            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <TrackVideoGrid />
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
                <div className="methods-scroll__text text-burgundy" ref={textRef}>
                    {/* Step 0 */}
                    <div
                        className="methods-step flex flex-col justify-evenly items-center text-left h-full"
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
                        In total, the dataset contains 656,334 bounding box coordinates corresponding to 1,121 uniquely identified sperm, each with a persistent tracking ID. 
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
                            The bounding box coordinates identifying individual sperm across frames from the tracking algorithm can then be used to visualize trajectories.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div
                        className="methods-step flex flex-col justify-evenly items-start text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl">
                            Here, we visualize the trajectories of individual sperm by plotting their coordinates over time. Each path is animated to reflect the motion captured in the original video.
                        </p>
                        <p className="max-w-2xl">
                            The lines are color-coded based on the type of movement each sperm exhibits: red indicates fast and straight progression, yellow reflects highly erratic or zigzag motion, and blue represents slower, jagged paths.
                        </p>
                        <p className="max-w-2xl">
                            But how do we know which sperm moves in which way? Let’s unpack how we classified these motion patterns.
                        </p>
                    </div>

                    {/* Step 4 */}
                    <div
                        className="methods-step flex flex-col justify-evenly items-start text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl">
                            In traditional clinical settings, sperm motility is typically assessed using kinematic metrics calculated by Computer-Assisted Sperm Analysis (CASA).
                        </p>
                        <p className="max-w-2xl">
                            These metrics are extracted from each sperm’s trajectory and quantify characteristics such as velocity, linearity, and the curvature of its path.
                        </p>
                        <p className="max-w-2xl">
                            Use the panel on the left to explore definitions of these terms and see how clinicians interpret sperm movement in practice.
                        </p>

                    </div>

                    {/* Step 5 */}
                    <div
                        className="methods-step flex flex-col justify-evenly items-start text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl">
                            As it turns out, we can feed each of these metrics: VSL, VCL, VAP, LIN, WOB,STR, and ALH into an unsupervised machine learning algorithm called K-means clustering.
                        </p>
                        <p className="max-w-2xl">
                            This algorithm allows us to automatically detect three distinct types of sperm movement that might otherwise just be described as "moving" but, in reality, have different
                            impacts on fertility.
                        </p>
                        <p className="max-w-2xl">
                            Hover over each of the videos to learn more about the types of movement and how they relate to fertility.
                        </p>
                        <p className="max-w-2xl">
                            Next, we will explore the outcome of this clustering process and evaluate the ability for the model to automatically classify different types of movement and the clinical implications for evaluating John's sample!
                        </p>


                    </div>



                    {/* Extra space so Step 2 can actually become active */}
                    <div style={{ height: "0vh" }} />
                </div>
            </div>
        </section >
    );
}

export default ScrollamaMethods;

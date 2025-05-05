
import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import { motion, AnimatePresence } from "framer-motion";




// custom CSS with the .scroll__graphic, .scroll-container, etc.
import "../ScrollamaStylesResults.css";

//charts
import FertilityChartToggle from './Charts/FertilityChartToggle';
import SpermWaffle from './Charts/SpermWaffle';
import CASAComparisonTable from "./Charts/CASAComparisonTable";
import SyntheticClusterChartPanel from './Charts/SyntheticClusterChartPanel';
import Sankey from "./Charts/Sankey";

//images
import cluster0 from "/images/cluster_bbs/cluster_0.png";
import cluster1 from "/images/cluster_bbs/cluster_1.png";
import cluster2 from "/images/cluster_bbs/cluster_2.png";
import JohnImage from "../assets/John.svg";
import electrolyte from "../assets/electrolyte.svg";
import { HelpCircle } from 'lucide-react';
import baby from "../assets/baby.svg";






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
            const stepHeight = Math.floor(window.innerHeight * 1.25);
            stepRefs.current.forEach((step) => {
                step.style.height = `${stepHeight}px`;
            });
            scroller.resize();
        };


        // On step enter, we set the active step
        const handleStepEnter = ({ index }) => {
            // console.log("Entering step index:", index, "Total steps:", stepRefs.current.length);
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
    const shouldAnimate = [0,1,2,3,4,5,6,7,8,9].includes(activeStep);




    const renderVisual = () => {

        if (activeStep === 0) {
            return (
                <div className="w-full px-4">
                    <h2 className="text-xl font-semibold text-center text-burgundy mb-6">
                        All Sperm Trajectories by Cluster
                    </h2>
                    <div className="w-full flex justify-between items-start gap-2 px-4">

                        {/* Cluster 0 */}
                        <div className="w-[32%] text-center">
                            <img
                                src={cluster0}
                                alt="Cluster 0"
                                className="w-full h-auto object-contain"
                            />
                            <p className="mt-2 text-sm text-burgundy">
                                Cluster 0 - Intermediate Motility
                            </p>
                        </div>

                        {/* Cluster 1 */}
                        <div className="w-[32%] text-center">
                            <img
                                src={cluster1}
                                alt="Cluster 1"
                                className="w-full h-auto object-contain"
                            />
                            <p className="mt-2 text-sm text-burgundy">
                                Cluster 1 - Hyperactivated Motility
                            </p>
                        </div>

                        {/* Cluster 2 */}
                        <div className="w-[32%] text-center">
                            <img
                                src={cluster2}
                                alt="Cluster 2"
                                className="w-full h-auto object-contain"
                            />
                            <p className="mt-2 text-sm text-burgundy">
                                Cluster 2 - Straight Line Progressive Motility
                            </p>
                        </div>
                    </div>
                </div>
            );


        } else if (activeStep === 1) {
            return (

                <div className="relative w-screen max-w-screen -mt-50">
                    <FertilityChartToggle />
                </div>
            );
        } else if (activeStep === 2) {
            // John Sad + Chart
            return (
                <div style={{ width: '100%', minHeight: '600px' }}>
                    <SpermWaffle />
                </div>
            );
        } else if (activeStep === 3) {
            // John Sad + Chart
            return (
                <div style={{ position: "relative", width: "80%", margin: "0 auto" }}>
                    <img
                        src={JohnImage}
                        alt="John sad"
                        style={{ width: "80%", height: "auto", objectFit: "contain" }}
                    />
                </div>
            );
        } else if (activeStep === 4) {
            // John Sad + Chart
            return (
                <div style={{ width: '80%', minHeight: '300px' }}>
                    <CASAComparisonTable />
                </div>
            );
        } else if (activeStep === 5) {
            // change the active chart in chart panel component for animation 
            return (
                <div style={{ width: '100%', minHeight: '600px' }}>
                    <SyntheticClusterChartPanel activeStep={activeStep} />
                </div>
            );

        } else if (activeStep === 6) {
            return (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <Sankey />

                </div>
            );

        } else if (activeStep === 7) {
            return (
                <div style={{ width: '80%', height: '400px' }} className="flex justify-center items-center">
                    <HelpCircle size={200} strokeWidth={1.5} />
                </div>
            );

        } else if (activeStep === 8) {
            return (
                <div style={{ position: "relative", width: "100%", margin: "0 auto" }}>
                    <img
                        src={electrolyte}
                        alt="electrolyte sperm image"
                        style={{ width: "80%", height: "auto", objectFit: "contain" }}
                    />
                </div>
            );
        } else if (activeStep === 9) {
            return (
                <div style={{ width: '100%', height: '400px' }}>
                    <img
                        src={baby}
                        alt="John with Baby"
                        style={{ width: "80%", height: "auto", objectFit: "contain" }}
                    />
                </div>
            );
        }
    };

    return (
        <section id="scroll" ref={containerRef}>
            <div className="scroll-results-container">

                {/* LEFT: sticky graphic panel */}
                <div className="scroll-results__graphic">
                    {shouldAnimate ? (
                        <AnimatePresence mode="wait">
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
                        </AnimatePresence>
                    ) : (
                        <div className="chart" key={activeStep}>
                            {renderVisual()}
                        </div>
                    )}
                </div>

                {/* RIGHT: scrolly text steps */}
                <div className="results-scroll__text text-burgundy" ref={textRef}>
                    {/* Step 0 */}
                    <div
                        className="results-step flex flex-col justify-evenly  text-left h-full"
                        ref={addToStepRefs}
                    >
                        <h2 className="text-xl font-semibold">Results and Discussion</h2>

                        <p className="max-w-2xl">
                            When visualizing sperm trajectories by cluster, distinct movement patterns emerge, corresponding to three motility types:                         </p>

                        <p className="max-w-2xl">
                            Straight-Line Progressive, Intermediate, and Hyperactivated.
                        </p>

                        <p className="max-w-2xl">
                            Although Clusters 0 and 1 may appear visually similar at first glance, their kinematic profiles tell a different story...
                        </p>
                        <p className="max-w-2xl">
                            Cluster 0 sperm move more slowly and often in circles, while Cluster 1 sperm exhibit high-energy, erratic motion characteristic of hyperactivation.
                        </p>


                    </div>


                    {/* Step 1 */}
                    <div
                        className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl">
                            Cluster 1 consistently shows higher scores in metrics associated with positive fertility, and lower scores in those linked to infertility.
                        </p>
                        <p className="max-w-2xl">
                            Across all normalized metrics, we observe that cluster 1 exhibits the highest values in categories corresponding to positive fertility and lowest values in those corresponding to negative fertility.
                        </p>
                        <p className="max-w-2xl">
                            Z-scores are calculated to standardize the motility traits, allowing us to clearly highlight positive and negative associations between specific motility patterns and fertility indicators.
                        </p>

                    </div>

                    {/* Step 2 */}
                    <div className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            By applying  <a
                                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8706130/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >  WHO cut-off values </a> to classify fertility status, we can observe how sperm from fertile and subfertile participants distribute differently across motility clusters.
                        </p>
                        <p className="max-w-2xl">
                            Sperm with intermediate motility (Cluster 0) are more common among subfertile individuals, while hyperactivated and progressive sperm (Cluster 1) are enriched among fertile individuals.
                        </p>
                        <p className="max-w-2xl">
                            This matches our expectations: fertile participants tend to have a higher proportion of hyperactivated and progressive sperm, while subfertile participants show a greater proportion of sperm with intermediate motility.
                        </p>

                    </div>
                    {/* Step 3 */}
                    <div className="results-step flex flex-col justify-evenly text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            So, what does this mean for John?
                        </p>


                    </div>

                    {/* Step 4 */}
                    <div className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            John was previously told his sperm was "normal" and motile. Yet, he and his partner struggled to conceive.
                        </p>
                        <p className="max-w-2xl">
                            Meanwhile, Steve—who received similar results—was able to conceive without difficulty.
                        </p>
                        <p className="max-w-2xl">
                            Suppose instead of stopping at traditional CASA analysis, we ran John and Steve’s data through our clustering algorithm. By doing so, we could uncover subtle but important differences between them—differences that standard metrics might miss.
                        </p>
                    </div>
                    {/* Step 5 */}
                    <div className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            To put this into practice, we could analyze videos of their sperm under a microscope, extract motility features, and map them into our clustering framework.
                        </p>
                        <p className="max-w-2xl">
                            At first glance, both men have motile sperm. But the clustering reveals something striking: Steve’s sperm shows a much higher proportion in the hyperactivated cluster, while John’s sperm is concentrated in the progressive and intermediate clusters.
                        </p>



                    </div>

                    {/* Step 6 */}
                    <div className="results-step flex flex-col justify-evenly  text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            When we quantify the results, Steve has nearly 20% more sperm in the hyperactivated cluster, while John has almost 30% more in the intermediate cluster.
                        </p>
                        <p className="max-w-2xl">
                            This has major implications...
                        </p>
                        <p className="max-w-2xl">
                            although traditional analysis made their profiles seem similar, John’s sperm lack the ability to reach the hyperactivated state critical for fertilizing an egg.
                        </p>



                    </div>
                    {/* Step 7 */}

                    <div className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            The solution?
                        </p>
                    </div>

                    {/* Step 8 */}
                    <div className="results-step flex flex-col justify-evenly text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            Electrolytes! (But not the kind you find in a sports drink.)

                        </p>
                        <p className="max-w-2xl">
                            Rather, We can expose John’s sperm to capacitation media—a solution containing electrolytes and other nutrients that induce hyperactivation.
                        </p>
                        <p className="max-w-2xl">
                            If successful...


                        </p>

                    </div>

                    {/* Step 9 */}
                    <div className="results-step flex flex-col justify-evenly text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                        John and his partner may soon have their wish fulfilled.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScrollamaResults;

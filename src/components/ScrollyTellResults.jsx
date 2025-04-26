
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
    const shouldAnimate = [2].includes(activeStep);




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
                <Sankey/>

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
                        className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}
                    >
                        <h2 className="text-xl font-semibold">Results and Discussion</h2>

                        <p className="max-w-2xl">
                            When visualizing the trajectories of the three clusters, we observe distinct movement patterns that align with the motility types identified earlier:
                        </p>

                        <p className="max-w-2xl">
                            Straight-Line Progressive, Intermediate, and Hyperactivated movement.
                        </p>

                        <p className="max-w-2xl">
                            While Clusters 0 and 1 may appear visually similar in static plots, our previously computed kinematic metrics reveal important differences—Cluster 0 exhibits slower, sometimes circular motion, whereas Cluster 1 shows more erratic, high-energy movement characteristic of hyperactivation.
                        </p>


                    </div>


                    {/* Step 1 */}
                    <div
                        className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl">
                            Now, we take this analysis a step further: by integrating metadata on fertility outcomes and sperm health, we aim to determine whether these movement-based clusters correlate with biological indicators of fertility. This allows us to move beyond descriptive tracking and assess how distinct motility patterns may be predictive of reproductive potential.
                        </p>
                        <p className="max-w-2xl">
                            Across all normalized metrics, we observe that cluster 1 exhibits the highest values in categories corresponding to positive fertility and lowest values in those corresponding to negative fertility.
                        </p>
                        <p className="max-w-2xl">
                            Z-Scores are also provided to highlight this positive and negative correlation with metrics.
                        </p>

                    </div>

                    {/* Step 2 */}
                    <div className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            Using the fertility status of the participants in the study, generated using WHO cut-off values, we can then see the distribution of sperm belonging to fertile and subfertile participants in each cluster.
                        </p>
                        <p className="max-w-2xl">
                            Sperm exhibiting intermediate motility (Cluster 0) are more likely to be associated with subfertile participants, while hyperactivated and progressive sperm (Cluster 1) are more likely to be associated with fertile participants.
                        </p>
                        <p className="max-w-2xl">
                            This aligns with our expectations: healthy participants should have a higher proportion of hyperactivated and progressive sperm, while subfertile participants should have a higher proportion of intermediate motility sperm!
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
                          John was previously told his sperm was "normal" and motile. However, him and his partner were still struggling to conceive.
                        </p>
                        <p className="max-w-2xl">
                            Meanwhile, Steve, recieved similar results, but was able to conceive with his partner.
                        </p>
                        <p className="max-w-2xl">
                            Suppose we took their data, and instead of running it through traditional CASA analysis, we ran it through our clustering algorithm to see if we could identify where John and Steve differ.
                        </p>

                    </div>
                    {/* Step 5 */}
                    <div className="results-step flex flex-col justify-evenly items-center text-left h-full"
                        ref={addToStepRefs}>
                        <p className="max-w-2xl">
                            We take a video of John and Steve's Sperm under a microscope, calculate their metrics, and run it through our clustering algorithm as previously described.
                        </p>
                        <p className="max-w-2xl">
                            Briefly looking at our scatter plot, we notice something striking, while both John and Steve have motile sperm, Steve has a higher proportion of sperm in the hyperactivated cluster, while John is mainly localized to Progressive and Intermediate motility. 
                        </p>
                        
                        

                    </div>

                    {/* Step 6 */}
                    <div className="results-step flex flex-col justify-evenly  text-left h-full"
                        ref={addToStepRefs}>
                         <p className="max-w-2xl">
                            Recontextualizing what we said above, when we sort out John vs. Steve's Sperm, we notice that Steve has nearly 20% more sperm in the hyperactivated cluster, while John has nearly 30% more sperm in the intermediate motility cluster.
                        </p>
                        <p className="max-w-2xl">
                            This has incredibly important implications for John's fertility. 
                        </p>
                        <p className="max-w-2xl">
                            While traditional CASA analysis may have indicated that John and Steve have nearly identical profiles, Johns lack of hyperactivated sperm means that his 
                            sperm will never reach the high energy state required to fertilize an egg! 
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
                            Electrolytes! (but not that kind)
                        </p>
                        <p className="max-w-2xl">
                            Rather, we can expose John's Sperm to "capacitation media", which is a solution that contains electrolytes and other nutrients that are known to induce hyperactivation in sperm.
                        </p>
                        <p className="max-w-2xl">
                            And.. if all goes to plan... 
                        </p>

                    </div>
                
                {/* Step 9 */}
                <div className="results-step flex flex-col justify-evenly text-left h-full"
                        ref={addToStepRefs}>
                          <p className="max-w-2xl">
                            John and his partner may soon have their wish!
                        </p>                
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ScrollamaResults;

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
import SatiricalFundingChart from "./Charts/SatiricalFundingChart";
import StackedChart from "./Charts/StackedChart";

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
    const shouldAnimate = [2, 3, 4].includes(activeStep);




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
                    <SpermMotilityAge />
                </div>
            );
        } else if (activeStep === 3) {
            // John Sad + Chart
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <MotilityOnly />
                </div>
            );
        } else if (activeStep === 4) {
            // John Sad + Chart
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <CountOnly />
                </div>
            );
        } else if (activeStep === 5) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <TTPOnly />
                </div>
            );
        } else if (activeStep === 6) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <StackedChart />
                </div>
            );

        } else if (activeStep === 7) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <SatiricalFundingChart />
                </div>
            );

        } else if (activeStep === 8) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <FertilityWaffleChart />
                </div>
            );
        } else if (activeStep === 9) {
            return (
                // attach ref to the wrapper div so that we can measure the width 
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
        } else if (activeStep === 10) {
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
                        <div className="pt-10">
                            <h2 className="text-center text-xl mb-10">An Introduction to Male Fertility: The Hidden Male Biological Clock </h2>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">&nbsp;</p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6"> Meet John. John is a 35 year old male and has no known medical complications. Recently, John and his partner embarked on their journey to start a family.  However, they have been struggling to get pregnant.</p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6"> &nbsp; </p>
                        </div>


                    </div>

                    {/* Step 1 */}
                    <div className="step" ref={addToStepRefs}>
                        <div>
                            <p className="text-left mb-20 pl-6"> </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                As it turns out, John and his partner are not alone. In fact, 17.5% of individuals of reproductive age are affected by infertility in their lifetime. Around age 35, men's fertility begins to decline across many key metrics.
                                <a href="https://www.who.int/news/item/04-04-2023-1-in-6-people-globally-affected-by-infertility" className="text-blue-600 hover:underline"> [1]</a>
                            </p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left pl-6">
                                &nbsp;

                            </p>

                        </div>
                        <div className="mb-20">
                        <p className="text-center pl-6">
                                
                                In other words... 
                                </p>
    
                            
                        </div>

                    </div>
                    {/* Step 2 */}
                    <div className="step" ref={addToStepRefs}>
                        <h2 className="text-center text-xl mb-10">Men have a biological clock too.</h2>
                    </div>

                    {/* Step 3 */}
                    <div className="step" ref={addToStepRefs}>
                        <div className="pt-10"> </div>
                        <div className="mb-20">
                            <p className="text-left pl-6"></p>
                        </div>
                        <div className="mb-20">
                            <p className="text-left mb-20 pl-6"> Average Sperm motility peaks at age 35 and
                                declines at a rate of 2.9% thereafter
                                <a href="https://rbej.biomedcentral.com/articles/10.1186/s12958-015-0028-x"
                                    className="text-blue-600 hover:underline"> [2]</a>.
                            </p>
                        </div>
                        <div className="mb-20">
                        </div>

                    </div>

                    {/* Step 4 */}
                    <div className="step" ref={addToStepRefs}>
                        {/* div 1 */}
                        <div className="pt-10">
                            <p className="text-left mb-20 pl-6"> Similarly, average sperm count declines at a rate of 1.1% per year relative to age 20.
                                <a href="https://rbej.biomedcentral.com/articles/10.1186/s12958-015-0028-x"
                                    className="text-blue-600 hover:underline"> [2]</a>.
                            </p>
                        </div>
                        {/* div 2 */}
                        <div className="mb-20">&nbsp; </div>
                        {/* div 3 */}
                        <div className="mb-15">&nbsp; </div>
                        {/* div 4 */}
                        <div className="mb-20">
                            <p className="text-left pl-6"> The rate of decline increases sharply after age 35.</p>
                        </div>

                    </div>
                    {/* Step 5 */}
                    <div className="step" ref={addToStepRefs}>
                        {/* div 1 */}
                        <div className="pt-10">
                            <p className="text-left mb-30 pl-6"> &nbsp;
                            </p>
                        </div>
                        {/* div 2 */}
                        <div className="mb-20">
                            <p className="text-left mb-20 pl-6"> A study on 1,976 couples reported that the amount of time it takes to achieve pregnancy (TTP), became accelerated when the men’s age was 45 years or older. Normalized data relative to age 20 is shown in the chart to the left  <a href="https://www.sciencedirect.com/science/article/pii/S0015028203003662"
                                className="text-blue-600 hover:underline"> [3]</a>.
                            </p>

                        </div>
                        {/* div 3 */}
                        <div className="mb-15">
                            <p className="text-left pl-6">&nbsp;</p>
                        </div>
                        {/* div 4 */}
                        <div className="mb-20">
                            <p className="text-left pl-6">    The effect of male age on how long it takes to get pregnant remained significant even after accounting for factors like the woman’s age and how often the couple had sex. 
                            This means that as men get older, it can become harder for their partner to conceive regardless of their partners' age.</p>
                        </div>

                    </div>
                     
                     {/* Step 6 */}
                     <div className="step" ref={addToStepRefs}>
                        {/* div 1 */}
                        <div className="pt-10">
                            <p className="text-left mb-30 pl-6"> &nbsp;
                            </p>
                        </div>
                        {/* div 2 */}
                        <div className="mb-20">
                            <p className="text-left mb-20 pl-6"> 
                            </p>

                        </div>
                        {/* div 3 */}
                        <div className="mb-15">
                            <p className="text-left pl-6">&nbsp;</p>
                        </div>
                        {/* div 4 */}
                        <div className="mb-20">
                            <p className="text-left pl-6">  </p>
                        </div>

                    </div>
                    {/* step 7 */}
                    <div className="step" ref={addToStepRefs}>
                        {/* div 1 */}
                        <div className="pt-10">
                            <p className="text-left mb-30 pl-6"> &nbsp;
                            </p>
                        </div>
                        {/* div 2 */}
                        <div className="mb-20">
                            <p className="text-left mb-20 pl-6"> 
                            This leads us to a misunderstood and often overlooked reality: men contribute to infertility in equal proportion—but receive a fraction of the funding and carry none of the clinical burden.
                            </p>

                        </div>
                        {/* div 3 */}
                        <div className="mb-15">
                            <p className="text-left pl-6">&nbsp;</p>
                        </div>
                        {/* div 4 */}
                        <div className="mb-20">
                            <p className="text-left pl-6"> 
                            The effect of male age on how long it takes to get pregnant remained significant even after accounting for factors like the woman’s age and how often the couple had sex. 
                            This means that as men get older, it can become harder for their partner to conceive regardless of their partners' age.
                             </p>
                        </div>
                    </div>

                    {/* Step 8 */}
                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 6: tableau!</h2>
                        <p>
                            Tableau will go here
                        </p>
                    </div>
                    
                    {/* Step 9 */}
                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 7: track video !</h2>
                        <p>
                            track video
                        </p>
                    </div>
                    <div className="step" ref={addToStepRefs}>
                        <h2>Step 10: track video !</h2>
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

/* REMINDER TO SELF, IF THE LAST STEP IS NOT GETTING ACTIVATED AND YOU HAVE
CHECKED THAT THERE IS NO MISMATCH IN THE STEPS AND GRAPHIC LOGIC, THEN REFRESH THE 
DAMN PAGE
*/


import React, { useEffect, useRef, useState } from "react";
import scrollama from "scrollama";
import { motion, AnimatePresence } from "framer-motion";



// images
import JohnSad from "../assets/JohnSad.svg";
import LegacyReport from "/images/legacy_report.png";
import StandardReport from "/images/standard_report.png";

// chart
import SpermMotilityAge from "./Charts/SpermMotilityChart";
import SpermAgeChart from "./Charts/SpermAgeChart";




// Our custom CSS with the .scroll__graphic, .scroll-container, etc.
import "../simplifiedScrollamaStyles.css";
import StackedChart from "./Charts/StackedChart";
import InfertilityFundingChart from "./Charts/InfertilityFunding";


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
    const [activeStep, setActiveStep] = useState(0);
     //active step is the current value of the state variable (initialized to zero) and will store the active step. setActive step is the function used to update the state

    useEffect(() => {
        const scroller = scrollama();
        const isMobile = () => window.innerWidth <= 768;

        // Resize each .step to a fraction of the viewport
        const handleResize = () => {
            const ratio = isMobile() ? 0.5 : 0.75;
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
                step: ".step",
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
    const shouldAnimate = [].includes(activeStep);
    const STEP_TO_METRIC = {
        3: 'Motility',
        4: 'Total Sperm',
        5: 'TTP',
    };




    const renderVisual = () => {
        const isMobile = window.innerWidth <= 768;
        // STEP 0 & 1: mobile only show motility chart
        if (isMobile && (activeStep === 0 || activeStep === 1)) {
            const metric = STEP_TO_METRIC[activeStep];
            return (

                <div style={{ position: "relative", width: "80%", margin: "0 auto" }}>
                <img
                    src={JohnSad}
                    alt="John sad"
                    style={{ width: "80%", height: "auto", objectFit: "contain" }}
                />
                </div>
            );
        }
        // STEP 0 & 1: desktop show John + overlay


        if (activeStep === 0 || activeStep === 1) {
            return (
                <div style={{ position: "relative", width: "80%", margin: "0 auto" }}>
                    <img
                        src={JohnSad}
                        alt="John sad"
                        style={{ width: "80%", height: "auto", objectFit: "contain" }}
                    />
                    {activeStep === 1 && (
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
                    )}
                </div>
            );
        } else if (activeStep === 2) {
            // John Sad + Chart
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <SpermMotilityAge />
                </div>
            );
        } else if (activeStep >= 3 && activeStep <= 5) {
            const metric = STEP_TO_METRIC[activeStep];
            return (

                <div
                    key="morph"                    // ← static across steps 3–5
                    style={{ width: '80%', height: '400px' }}
                >
                    <SpermAgeChart selectedMetric={metric} />
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
                    <InfertilityFundingChart disableAnimation={false} />
                </div>
            );
        } else if (activeStep === 8) {
            return (
                <div style={{ width: '80%', height: '400px' }}>
                    <InfertilityFundingChart disableAnimation={true} />
                </div>
            );
        } else if (activeStep === 9 || activeStep === 10) {
            return (

                <div style={{ width: '80%', height: '400px' }}>
                    <h2 className="text-2xl font-bold text-burgundy mb-6 text-center">
                        Example Computer Assisted Analysis (CASA) Results
                    </h2>
                    <div style={{ width: '80%', height: '400px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2%' }}>
                        <img
                            src={LegacyReport}
                            alt="Left"
                            style={{ width: '55%', height: 'auto', objectFit: 'contain' }}
                        />
                        <img
                            src={StandardReport}
                            alt="Right"
                            style={{ width: '48%', height: 'auto', objectFit: 'contain' }}
                        />
                    </div>
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
                            // plain div, but use a fixed key for morph steps
                            <div
                                className="chart"
                                key={activeStep >= 3 && activeStep <= 5 ? 'morph' : activeStep}
                            > {renderVisual()}
                            </div>
                        )}
                    </AnimatePresence>
                </div>


                {/* RIGHT: scrolly text steps */}
                <div className="scroll__text" ref={textRef}>
                    {/* Step 0 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy  text-left h-full"
                        ref={addToStepRefs}
                    >
                        {/* Header stays near top */}
                        <h2 className="text-xl text-center  font-semibold">
                            An Introduction to Male Fertility: The Hidden Male Biological Clock
                        </h2>


                        {/* Remaining content spaced vertically and centered horizontally */}
                        <p className="max-w-2xl">
                            Meet John. John is a 35-year-old male and has no known medical complications.
                        </p>
                        <p className="max-w-2xl">
                            Recently, John and his partner embarked on their journey to start a family.
                        </p>
                        <p className="max-w-2xl">
                            However, they have been struggling to conceive.
                        </p>
                    </div>


                    {/* Step 1 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy items-center text-left h-full"
                        ref={addToStepRefs}
                    >

                        <p className="max-w-2xl">
                            As it turns out, John and his partner are not alone. In fact, 17.5% of individuals of reproductive age are affected by infertility in their lifetime. Around age 35, men's fertility begins to decline across many key metrics.
                            <a href="https://www.who.int/news/item/04-04-2023-1-in-6-people-globally-affected-by-infertility"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"> [1]</a>
                        </p>

                        <p className="max-w-2xl">

                            In other words...
                        </p>


                    </div>


                    {/* Step 2 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy  text-left h-full"
                        ref={addToStepRefs}
                    >
                        <h2 className="text-center text-xl mb-10">Men have a biological clock too.</h2>
                    </div>

                    {/* Step 3 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy  text-left h-full"
                        ref={addToStepRefs}
                    >

                        <p className="max-w-2xl"> Average Sperm motility peaks at age 35 and
                            declines at a rate of 2.9% thereafter
                            <a href="https://www.fertstert.org/article/S0015-0282(13)00687-0/fulltext"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"> [2]</a>.
                        </p>

                    </div>

                    {/* Step 4 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >
                        {/* div 1 */}

                        <p className="text-left mb-20"> Similarly, average sperm count declines at a rate of 1.1% per year relative to age 20.
                            <a href="https://www.fertstert.org/article/S0015-0282(13)00687-0/fulltext"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"> [2]</a>.
                        </p>

                        <p className="max-w-2xl"> The rate of decline increases sharply after age 35.</p>

                    </div>
                    {/* Step 5 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl"> A study on 1,976 couples reported that the amount of time it takes to achieve pregnancy (TTP), became accelerated when the men’s age was 45 years or older. Normalized data relative to age 20 is shown in the chart to the left  <a href="https://www.sciencedirect.com/science/article/pii/S0015028203003662"
                            className="text-blue-600 hover:underline"> [3]</a>.
                        </p>

                        <p className="max-w-2xl">    The effect of male age on how long it takes to get pregnant remained significant even after accounting for factors like the woman’s age and how often the couple had sex.
                            This means that as men get older, it can become harder for their partner to conceive regardless of their partners' age.</p>

                    </div>

                    {/* Step 6 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >
                        <p className="max-w-2xl">
                            Overall, one-third of infertility cases are caused by male reproductive issues, one-third by female reproductive issues,
                            and one-third by both or by unknown factors
                            <a href="https://www.nichd.nih.gov/health/topics/menshealth/conditioninfo/infertility#f4"
                                rel="noopener noreferrer"
                                target="_blank"
                                className="text-blue-600 hover:underline"> [4]</a>.
                        </p>

                    </div>
                    {/* step 7 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >

                        <p className="max-w-2xl">
                            Despite contributing to nearly half of all infertility cases with known cause,
                            male fertility research receives just $15.5M in NIH funding — a fraction of what we spend on almost any other gendered health issue.
                        </p>

                        <p className="max-w-2xl">
                            When it comes to women's health, it’s about making babies. When it comes to men’s health, we fund survival.
                            Prostate cancer receives $305M, while ovarian cancer receives only $171M — over 2x less, despite both being deadly, gender-specific cancers.
                        </p>

                        <p className="max-w-2xl">
                            Endometriosis, a painful chronic condition affecting ~10% of reproductive-age women, receives only $29M — nearly 7x less than funding for female fertility and IVF-related research ($200.3M)
                        </p>



                    </div>

                    {/* Step 8 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >

                        <p className="max-w-2xl">
                            This isn't just a funding gap. It's a systemic blind spot.
                            We have normalized the idea that infertility is a woman’s burden to diagnose, treat, and carry.
                            But if half the issue is male, why is less than 8% of infertility funding dedicated to understanding it?
                        </p>

                        <p className="max-w-2xl"> Male fertility deserves research and real science. So what can John do if he wants to take control of his fertility?
                        </p>


                    </div>

                    {/* Step 9 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >

                        <p className="max-w-2xl">
                            John can decide to go to the doctor, typically an andrologist or a fertility clinic, where he will be given a standard semen analysis report, shown here.
                        </p>


                        {/* div 2 */}

                        <p className="max-w-2xl">
                            These types of analyses are helpful in providing a general snapshot of sperm health, but they examine only general properties and it is widely
                            accepted that the use of these parameters cannot precisely and accurately predict the fertility of a man presenting to a clinician
                            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4254491/#R34"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"> [5]</a>.
                        </p>
                    </div>

                    {/* Step 10 */}
                    <div
                        className="step flex flex-col justify-evenly text-burgundy text-left h-full"
                        ref={addToStepRefs}
                    >

                        <p className="max-w-2xl">
                            Multiple studies dating back to 1988 have found that relying just on the defined normal values of isolated parameters such as sperm density and motility as defined by the WHO were not very predictive of that couple’s chances of naturally establishing a pregnancy
                            <a href="https://www.maleinfertilityguide.com/density-motility-and-total-motile-count"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"> [6]</a>.
                        </p>

                        <h2 className="max-w-2xl"
                            style={{ fontFamily: 'TiemposTextBold, serif' }}
                        >
                            What if there was a more descriptive way of analyzing sperm motility that
                            picks up nuances otherwise obscured by existing analyses?
                            We will attempt to show a novel method for analyzing the motility of analyzing and classifying the motility of
                            sperm that leads to a more accurate prediction of fertility.
                        </h2>

                    </div>


                </div>
            </div>
        </section >
    );
}

export default ScrollamaIntro;

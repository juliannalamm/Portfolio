import React from "react";

const SpermTrackIntro = () => {
    return (
        <section id="sperm-track-card" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* adjust size of card here*/}
            <div className="max-w-7xl w-full bg-lightblue rounded-sm overflow-hidden p-10 md:p-14">
            <h2 className="text-4xl font-extrabold text-burgundy leading-tight text-center">
                    Sperm Tracking & Detection Using YOLO
                </h2>


                {/* Section Line */}
                <div className="border-b border-burgundy my-6"></div>
                {/* Motivation Section */}
                <div>
                    <p className="text-lg text-burgundy leading-relaxed">
                        Approximately 17.5% of individuals of reproductive age are affected by infertility — a figure expected to rise in coming years. 
                        Despite over <strong>2.5 million assisted reproductive technology (ART)</strong> cycles performed annually, success rates remain at around <strong>33%</strong>. 
                        While ART techniques such as In Vitro Fertilization (IVF) and Intracytoplasmic Sperm Injection (ICSI) are widely used, 
                        the fertility industry has experienced a notable shift twoards ICSI during which an <strong>individual sperm</strong> is carefully
                        selected and subsequently injected directly into the oocyte. 
                    </p>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                        However, the safety of ICSI is increasingly scrutinized, as the technique, by circumventing motility and sperm-quality barriers, permits the fertilization of the egg by potentially 
                        low-quality sperm. Quality sperm selection remains a critical challenge: current methods based on morphology, motility, and DNA integrity are subjective and rely on proprietary, 
                        “black-box” CASA systems that provide limited, sample-level data with low predictive accuracy. 
                        This underscores an urgent need for more descriptive and objective metrics in fertility assessment.
                        In this context, advances in machine learning - especially in computer vision — offer promising avenues 
                        for improving sperm selection by leveraging the utility of <strong>Convolutional Neural Networks (CNN) in sperm object detection</strong>.
                    </p>
                   
                {/* Dataset Section */}
            
                <div className="border-b border-burgundy my-8"></div>
                <div>
                    <h3 className="text-xl font-semibold text-burgundy mb-3">Dataset</h3>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                    This project utilizes <strong className="text-burgundy">YOLO (You Only Look Once)</strong> by <a href="https://www.ultralytics.com/" className = "text-blue-600 hover:underline">Ultralytics</a>,
                    a deep learning-based object detection model, to track sperm cells in microscopic videos.
                    Traditional sperm motility analysis methods are often manual and subjective.
                </p>
                <p className="text-lg text-burgundy leading-relaxed mt-4">
                    By integrating <strong className="text-burgundy">real-time computer vision techniques</strong>,
                    this system provides an automated and highly efficient approach to sperm detection, classification,
                    and motility tracking for more precise fertility analysis.
                </p>
                    <p className="text-lg text-burgundy leading-relaxed">
                        This project leverages the <a href="https://zenodo.org/records/7293726"
                            target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            VISEM-Tracking dataset</a>, containing manually annotated sperm tracking data.
                    </p>
                    <ul className="list-disc list-inside text-lg text-burgundy leading-relaxed mt-4 space-y-2">
                        <li>Video recordings of 30 seconds (comprising 29,196 frames from 20 participants).</li>
                        <li>Wet semen preparations with manually annotated bounding-box coordinates.</li>
                        <li>Includes sperm characteristics analyzed by domain experts.</li>
                        <li>Provides unlabeled video clips for easy access to self- or unsupervised learning methods.</li>
                    </ul>
                </div>
                
                
                </div>
            </div>

        </section>
    );
};

export default SpermTrackIntro;
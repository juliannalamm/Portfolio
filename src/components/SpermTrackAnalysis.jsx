import React from "react";

const SpermTrackAnalysis = () => {
    return (
        <section id="sperm-track-results" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* White and Blue Split Column */}
            <div className="max-w-7xl w-full bg-lightblue-100 rounded-sm overflow-hidden  p-10 md:p-14">
                
                {/* Section Title */}
                <h2 className="text-3xl font-extrabold text-burgundy leading-tight text-center">
                    Results & Analysis
                </h2>

                {/* Analysis Section */}
                <div className="mt-6">
                    <h3 className="text-2xl font-semibold text-burgundy mb-3">Detection Analysis</h3>
                    <p className="text-lg text-burgundy leading-relaxed">
                        The addition of the <strong>P2 layer</strong> was hypothesized to improve small object detection by reducing the stride and creating a finer-grained feature map. However, further investigation revealed that the majority of bounding box sizes for sperm in the dataset were around <strong>16x16 pixels</strong>, which already falls within the <strong>P3 convolutional layer</strong> of YOLOv8’s feature pyramid. As a result, P2 did not provide significant improvements.
                    </p>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                        Additionally, evaluation of validation and training losses suggests <strong>overfitting</strong> limited performance improvements. The <strong>Focus layer</strong>, designed to preserve spatial detail, showed marginal precision gains. Future improvements should explore:
                    </p>
                    <ul className="list-disc list-inside text-lg text-burgundy leading-relaxed mt-4 space-y-2">
                        <li>Refining the Feature Pyramid Network (FPN) for small object detection.</li>
                        <li>Experimenting with self-supervised pretraining for better generalization.</li>
                        <li>Applying data augmentation techniques such as synthetic sperm trajectories.</li>
                        <li>Optimizing hyperparameters to mitigate overfitting and improve recall.</li>
                    </ul>
                </div>

                {/* Tracker Performance Analysis */}
                <div className="mt-10">
                    <h3 className="text-2xl font-semibold text-burgundy mb-3">Tracker Performance</h3>
                    <p className="text-lg text-burgundy leading-relaxed">
                        <strong>BoT-SORT</strong> outperformed ByteTrack due to its use of <strong>appearance-based Re-Identification (ReID)</strong> and <strong>Global Motion Compensation (GMC)</strong>, which allowed it to maintain consistent sperm identities over time. In contrast, ByteTrack’s confidence-based tracking struggled with high-speed movement and frequent occlusions.
                    </p>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                        Our custom BoT-SORT modifications significantly improved performance by:
                    </p>
                    <ul className="list-disc list-inside text-lg text-burgundy leading-relaxed mt-4 space-y-2">
                        <li>Increasing <strong>track buffer</strong> from 30 to 200, improving identity persistence.</li>
                        <li>Enabling <strong>ReID with a lower appearance threshold</strong> to reduce ID switching.</li>
                        <li>Tuning <strong>matching thresholds</strong> to improve detection of overlapping objects.</li>
                    </ul>
                    <p className="text-lg text-burgundy leading-relaxed mt-4">
                        These adjustments led to <strong>fewer identity switches</strong> and <strong>greater object retention</strong>, making BoT-SORT the superior choice for sperm tracking.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SpermTrackAnalysis;
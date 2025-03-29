import React from "react";
import { BarChart, Network, CheckCircle, Shapes } from "lucide-react"; 

const Clustering = () => {
    return (
        <section id="clustering" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* Main Container */}
            <div className="max-w-7xl w-full bg-skyblue rounded-sm overflow-hidden p-10 md:p-14">
                
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-burgundy leading-tight text-center">
                    Clustering Process for Sperm Motility Patterns
                </h2>

                {/* Section Line */}
                <div className="border-b border-burgundy my-8"></div>

                {/* Clustering Steps - 4 Cards with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    {/* Step 1 - Feature Extraction */}
                    <div className="bg-lightblue p-6 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <BarChart className="text-orangebright w-10 h-10" />
                            <h3 className="text-xl font-semibold text-burgundy">Feature Extraction</h3>
                        </div>
                        <p className="text-burgundy mt-3">
                            Extract key motion parameters like **VCL, VSL, ALH, and LIN** from the tracking data.
                        </p>
                    </div>

                    {/* Step 2 - Dimensionality Reduction */}
                    <div className="bg-lightblue p-6 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Network className="text-orangebright w-10 h-10" />
                            <h3 className="text-xl font-semibold text-burgundy">Dimensionality Reduction</h3>
                        </div>
                        <p className="text-burgundy mt-3">
                            Apply **Principal Component Analysis (PCA)** to reduce feature space while maintaining variance.
                        </p>
                    </div>

                    {/* Step 3 - Clustering Algorithms */}
                    <div className="bg-lightblue p-6 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Shapes className="text-orangebright w-10 h-10" />
                            <h3 className="text-xl font-semibold text-burgundy">Unsupervised Clustering</h3>
                        </div>
                        <p className="text-burgundy mt-3">
                            Use **Hierarchical Clustering and K-Means** to classify motility types.
                        </p>
                    </div>

                    {/* Step 4 - Track Classification */}
                    <div className="bg-lightblue p-6 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="text-orangebright w-10 h-10" />
                            <h3 className="text-xl font-semibold text-burgundy">Final Track Patterns</h3>
                        </div>
                        <p className="text-burgundy mt-3">
                            Identify **Progressive, Linear, Hyperactivated, and Weakly Motile** sperm types.
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    );
};

export default Clustering;
import React from "react";
import { BarChart, Network, CheckCircle, RadicalIcon, Shapes } from "lucide-react"; // Importing icons

const KeyHighlights = () => {
    return (
        <section id="key-highlights" className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
            {/* Main Container */}
            <div className="max-w-7xl w-full bg-blue-100 rounded-sm overflow-hidden p-10 md:p-14">
                
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-burgundy leading-tight text-center">
                    Key Highlights
                </h2>

                {/* Section Line */}
                <div className="border-b border-burgundy my-8"></div>

                {/* Highlight Grid - 3 Cards with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Feature Engineering */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <RadicalIcon className="text-violet-900 w-8 h-8" />
                            <h3 className="text-xl font-semibold text-burgundy">Feature Engineering & CASA Metrics</h3>
                        </div>
                        <ul className="list-disc list-inside text-burgundy mt-3 pl-2">
                        <p className="text-burgundy mt-4">
                            Extracts precise sperm positions from tracking models and 
                            computes key kinematic metrics used in Computer-Assisted Sperm Analysis (CASA).
                        </p>
                        <p className="text-burgundy mt-2 font-semibold">
                            Metrics include:
                        </p>
                                <ul className=" list-disc pl-6 text-burgundy mt-1">
                                    <li><b>VCL</b> (Curvilinear Velocity)</li>
                                    <li><b>VSL</b> (Straight-Line Velocity)</li>
                                    <li><b>ALH</b> (Amplitude of Lateral Head Displacement)</li>
                                </ul>
                            
                        </ul>
                    </div>

                    {/* Clustering for Sperm Motility */}
                    <div className="bg-blue-50 p-6 rounded-lg ">
                        <div className="flex items-center space-x-3">
                            <Shapes className="text-violet-900 w-8 h-8" />
                            <h3 className="text-xl font-semibold text-burgundy">Classification through Unsupervised Learning</h3>
                        </div>
                        <p className="text-burgundy mt-3">
                            <b>KMeans and hierarchical clustering</b> is applied to categorize sperm movement into four groups:
                        </p>
                        <ul className="list-disc list-inside text-burgundy mt-2 pl-2">
                            
                                <ul className="list-disc text-burgundy pl-6 mt-1">
                                    <li><b>Hyperactivated</b> – High-energy erratic movement</li>
                                    <li><b>Progressive</b> – Forward, controlled motion</li>
                                    <li><b>Progressive Linear</b> – Consistent straight path</li>
                                    <li><b>Weakly Motile</b> – Minimal movement</li>
                                </ul>
                        
                        </ul>
                    </div>

                    {/* Automated Fertility Assessment */}
                    <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <CheckCircle className="text-violet-900 w-8 h-8" />
                            <h3 className="text-xl font-semibold text-burgundy">Automating Fertility Sample Analysis</h3>
                        </div>
                        <p className="text-burgundy mt-3">
                            This project improves fertility diagnostics by:
                        </p>
                        <ul className="list-disc list-inside text-burgundy mt-2 pl-2">
                            <li>Using <b>bounding box tracking</b> for precise motion extraction</li>
                            <li>Leveraging <b>machine learning</b> for objective sperm classification</li>
                            <li>Reducing <b>human bias</b> and increasing efficiency in fertility assessment</li>
                        </ul>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default KeyHighlights;
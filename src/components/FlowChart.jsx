const FlowChart = () => (
  <section className="flex justify-center px-4 md:px-8 lg:px-12 mt-16">
    <div className="flex w-full max-w-7xl">
      {/* Left Explanation Section */}
      <div className="w-1/5 bg-skyblue p-6 flex items-start">
        <div>
          <div className="border-b border-burgundy my-2"></div>
          <p className="text-burgundy">
            An end-to-end sperm classification pipeline for fertility assessment
          </p>
        </div>
      </div>
      {/* Right Image Section */}
      <div className="w-4/5">
        <img
          src="/images/EntireFrame.png"
          alt="Flowchart"
          className="w-full h-auto"
        />
      </div>
    </div>
  </section>
);

export default FlowChart;

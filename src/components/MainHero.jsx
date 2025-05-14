import { motion } from "framer-motion";

const fromLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };
  
  const fromRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

const MainHero = () => {
  return (
    <section className="min-h-screen w-full flex items-start bg-lightblue overflow-hidden relative md:pt-30">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-y-12 md:gap-y-10 gap-x-6 py-12 md:py-0">

        {/* Greeting */}
        <motion.div {...fromLeft} className="order-1 md:order-none md:col-start-1 md:row-start-1 self-start">
          <h1 className="text-3xl md:text-4xl text-burgundy leading-none mb-2">Hey there, I’m</h1>
          <h2 className="text-5xl md:text-6xl font-extrabold text-burgundy leading-tight">Julianna&nbsp;Lamm</h2>
        </motion.div>

        {/* Photo */}
        <motion.div {...fromLeft} className="order-2 md:order-none md:col-start-2 md:row-span-2 flex justify-center items-center">
          <div className="w-[34rem] md:-mb-100 aspect-square rounded-full overflow-hidden bg-gray-100 shadow-lg">
            <img src="/images/Julianna.jpg" alt="Julianna Lamm" className="w-full h-full object-cover object-top" />
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div {...fromRight} className="order-3 md:order-none md:col-start-3 md:row-start-1 text-justify md:text-right self-start">
          <p className="text-md md:text-sm text-neutral-700 leading-relaxed max-w-xl md:ml-auto">
            An interdisciplinary developer with a B.S. in Biochemistry (UC Berkeley) and an M.S. in Computer Science (Fordham).
            I develop tools at the intersection of data, design, and technology—from machine learning models to full-stack web apps.
            Across all projects, I focus on data-driven solutions to socially impactful challenges.
          </p>
        </motion.div>

        {/* Status */}
        <motion.div {...fromRight} className="order-4 md:order-none md:col-start-1 md:row-start-2 text-justify md:text-left self-start">
          <p className="text-md text-neutral-600">Currently available full-time or for creative&nbsp;+ technical projects</p>
        </motion.div>

        {/* CTA */}
        <motion.div {...fromRight} className="order-5 md:order-none md:col-start-3 md:row-start-2 flex justify-center md:justify-end items-center">
          <a href="#contact" className="w-40 h-40 rounded-full bg-orangebright text-white font-semibold text-l flex items-center justify-center text-center hover:bg-burgundy transition">
            LET'S CONNECT
          </a>
        </motion.div>
      </div>

      {/* Background Title */}
      
      <h3 className="hidden md:block absolute bottom-0 left-1/2 transform -translate-x-1/2 text-[8vw] font-extrabold tracking-tight leading-none text-skyblue opacity-80 pointer-events-none text-center">
        CREATIVE&nbsp;ENGINEER
      </h3>
    </section>
  );
};

export default MainHero;

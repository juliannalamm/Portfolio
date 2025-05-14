// components/RevealSection.jsx
import { motion } from "framer-motion";

const RevealSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="mb-10"
  >
    {children}
  </motion.div>
);

export default RevealSection;

"use client";

import { motion, Variants } from "framer-motion";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6 },
  }),
};

export function DaoRationale() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={5}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-semibold mb-4">Why We Do It This Way</h2>
      <p className="mb-4">
        Because we don’t believe in top-down change. We believe in root-up
        revolution.
      </p>
      <p>
        The only way to build something for the people – is to let the people
        build it themselves.
      </p>
    </motion.section>
  );
}

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

export function DaoProcess() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={4}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
      <p className="mb-4">
        You explore a project inside the Metaverse. You walk through it. You
        feel it. And then you vote:
      </p>
      <ul className="list-disc list-inside mb-4 space-y-2">
        <li>Should this become real?</li>
        <li>Should this receive funding?</li>
        <li>Do we believe in this?</li>
      </ul>
      <p>
        If the community says yes – we build. If the community says no – we
        evolve.
      </p>
    </motion.section>
  );
}

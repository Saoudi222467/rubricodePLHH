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

export function DaoDefinition() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={3}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-semibold mb-4">What Is a DAO?</h2>
      <p className="mb-4">
        Every person, in every country, in every time zone – has the same voice.
        The same vote. The same power.
      </p>
      <p>
        No project can move forward unless the community says yes. Not by a
        founder. Not by a council. Not by a whale. Only by us – the collective.
      </p>
    </motion.section>
  );
}

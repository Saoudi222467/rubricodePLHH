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

export function DaoHero() {
  return (
    <motion.section
      className="text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={1}
      variants={sectionVariants}
    >
      <h1 className="text-5xl font-bold mb-2">DAO – The Soul of Our System</h1>
      <p className="text-xl text-gray-600">No one rules. Everyone decides.</p>
    </motion.section>
  );
}

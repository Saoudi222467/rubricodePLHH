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

export function DaoPhilosophy() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={2}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-semibold mb-4">Our Philosophy</h2>
      <p className="mb-4">
        We don’t believe in central power. We believe in collective
        responsibility. That’s why we didn’t build this as a corporation. We
        built it as a DAO – a Decentralized Autonomous Organization.
      </p>
      <p>DAO means: no one rules. DAO means: everyone decides.</p>
    </motion.section>
  );
}

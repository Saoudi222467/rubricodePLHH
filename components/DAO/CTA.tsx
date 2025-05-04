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

export function DaoCTA() {
  return (
    <motion.section
      className="text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={7}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-semibold mb-4">Join the Revolution</h2>
      <p className="mb-4">
        We don’t sell you a dream. We ask you to shape it with us. And when it
        works – it’s not because of one mind. It’s because of the many who
        showed up, spoke up, and stood together.
      </p>
      <p className="italic">
        Peace, Love & Harmony lives because together is the only way.
      </p>
    </motion.section>
  );
}

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

export function DaoParticipation() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={6}
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-semibold mb-4">Participation & Ownership</h2>
      <p className="mb-4">
        This is participation without borders. Ownership without permission.
        Democracy without dilution.
      </p>
      <p className="mb-4">
        You don’t just invest money. You invest your vote. You invest your
        energy. You invest your presence.
      </p>
      <p>
        Our Metaverse is the space. The DAO is the engine. And the token is the
        voice.
      </p>
    </motion.section>
  );
}

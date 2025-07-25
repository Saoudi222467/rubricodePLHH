"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function CircleContributors() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const contributors = [
    {
      name: "Alice Smith",
      role: "Lead Designer",
      location: "New York, USA",
      contribution: "Crafted the UI mockups and visual identity.",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "Ravi Patel",
      role: "Frontend Developer",
      location: "London, UK",
      contribution: "Built the React components and Framer Motion animations.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Mei Chen",
      role: "Content Strategist",
      location: "Sydney, Australia",
      contribution: "Authored the site copy and messaging framework.",
      image: "https://i.pravatar.cc/150?img=3",
    },
  ];

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      <AnimatePresence>
        {isInView && (
          <>
            {/* Gradient Background */}
            <motion.div
              className="
                fixed inset-0 -z-10
                bg-gradient-to-br
                  from-[#4E2A1E]/50
                  via-[#3A1F0B]/30
                  to-[#D4AF37]/40
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Content Container */}
            <motion.div
              className="
                fixed inset-0 z-50
                flex flex-col items-center justify-center
                px-6 text-center
                bg-black bg-opacity-30 backdrop-blur-sm
              "
              variants={containerVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              {/* Updated Heading */}
              <motion.h2
                variants={headerVariants}
                className="mt-30
                  text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase
                  bg-clip-text text-transparent
                  bg-gradient-to-r from-[#FFE066] via-[#FFE060] to-[#7B245A]
                  drop-shadow-lg
                "
              >
                Join the Circle
              </motion.h2>

              {/* Updated Call-to-Action Quote */}
              <motion.blockquote
                variants={textVariants}
                className="
                  mt-6 max-w-2xl
                  pl-6 border-l-4 border-[#FFE066]
                  italic text-xl sm:text-2xl
                  text-white/80
                  drop-shadow-lg
                "
              >
                “We’d love for you and your international team to be part of this.”
                Bring your ideas, your energy, your story — and your photo!
              </motion.blockquote>

              {/* Contributor Cards */}
              <motion.div
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
              >
                {contributors.map((c, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    whileHover={{ scale: 1.03 }}
                    className="
                      border-2 border-[#FFE066]
                      rounded-2xl
                      p-6
                      bg-white bg-opacity-10
                      shadow-lg
                      backdrop-blur-sm
                      flex flex-col items-center text-center
                    "
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white mb-4"
                    />
                    <h5 className="font-medium text-white text-xl">
                      {c.name}
                    </h5>
                    <p className="text-white/70 text-sm">{c.role}</p>
                    <p className="text-white/60 text-xs italic mb-2">
                      {c.location}
                    </p>
                    <p className="text-white/80 text-sm">{c.contribution}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

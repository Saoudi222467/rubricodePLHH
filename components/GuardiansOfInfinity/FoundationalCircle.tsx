"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";

export default function FoundationalCircle() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3, when: "beforeChildren" } },
    exit: { transition: { staggerChildren: 0.1, when: "afterChildren" } },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -30, scale: 0.8 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 280, damping: 24 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", ease: "easeOut", duration: 0.6 },
    },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.85 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 22 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  // Updated avatar data – placeholders for image links
  const avatars = [
    { id: 1, name: "Mathias", link: "#", src: "https://via.placeholder.com/150?text=Mathias" },
    { id: 2, name: "Sonja", link: "#", src: "https://via.placeholder.com/150?text=Sonja" },
    { id: 3, name: "Volker", link: "#", src: "https://via.placeholder.com/150?text=Volker" },
    { id: 4, name: "Monika", link: "#", src: "https://via.placeholder.com/150?text=Monika" },
    { id: 5, name: "Lisa", link: "#", src: "https://via.placeholder.com/150?text=Lisa" },
    { id: 6, name: "Stephan", link: "#", src: "https://via.placeholder.com/150?text=Stephan" },
    { id: 7, name: "Andrea", link: "#", src: "https://via.placeholder.com/150?text=Andrea" },
    { id: 8, name: "Nico", link: "#", src: "https://via.placeholder.com/150?text=Nico" },
  ];

  return (
    <section ref={ref} className="w-full h-screen relative overflow-hidden">
      {/* Subtle Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      <AnimatePresence>
        {isInView && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-6 text-center"
          >
            {/* Header + Description */}
            <div className="relative max-w-2xl w-full mb-12">
              <motion.h4
                variants={headerVariants}
                className="relative text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-red-400 drop-shadow-lg mb-4"
              >
                THE FOUNDATIONAL CIRCLE
              </motion.h4>
              <motion.p
                variants={textVariants}
                className="relative text-gray-200 mb-8 before:block before:absolute before:-inset-1 before:-skew-y-2 before:bg-yellow-600/30 before:z-[-1] p-4 rounded-lg"
              >
                “The ones who lit the first fire.” These are the original vision holders. The initiators. The builders. The seed-planters. They didn’t create this to be seen – they created this so others could belong.
              </motion.p>
            </div>

            {/* Avatar Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {avatars.map(({ id, name, link, src }) => (
                <motion.a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
                  className="flex flex-col items-center"
                >
                  <img
                    src={src}
                    alt={name}
                    className="w-20 h-20 rounded-full bg-gray-100 object-cover shadow-2xl ring-2 ring-white"
                  />
                  <span className="mt-2 text-sm text-gray-300 uppercase tracking-wide">
                    {name}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

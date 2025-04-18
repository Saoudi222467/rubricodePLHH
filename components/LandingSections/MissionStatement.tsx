"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const MissionStatement = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  // Animation setup
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* <div className="h-[100vh]" /> */}

      <section
        ref={ref}
        className="w-full h-[100vh] relative flex items-center justify-center"
      >
        <motion.div
          className="overflow-hidden flex flex-col text-4xl font-bold gap-6 text-center transition-all duration-500 fixed inset-0 justify-center items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ duration: 1 }}
        >
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Remember.
            </h2>
          </motion.div>
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Connect.
            </h2>
          </motion.div>
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Heal.
            </h2>
          </motion.div>
          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <h2 className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
              Create.
            </h2>
          </motion.div>
        </motion.div>
      </section>

      <div className="h-[100vh]" />
    </>
  );
};

export default MissionStatement;

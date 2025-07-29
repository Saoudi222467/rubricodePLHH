"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const HarmonySpectrum = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });

  return (
    <>
      <section
        ref={ref}
        className="relative w-full h-[100vh] bg-black overflow-hidden"
      >
        {/* Background Image */}
        <motion.img
          src="/harmony-spectrum-line.png"
          alt="Harmony Spectrum Line"
          className="fixed inset-0 w-full h-full object-contain z-0 hidden lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Technology with Soul */}
        <motion.div
          className="fixed z-10 flex flex-col items-center gap-4 top-[20%] left-[5%] sm:top-[28%] sm:left-[10%] md:top-[40%] md:left-[12%] lg:top-[40%] lg:left-[10%]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: inView ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="w-28 h-28 rounded-full"
            style={{
              background: "radial-gradient(circle, #001B1B 0%, #024242 100%)",
              filter: "blur(1px)",
            }}
            animate={{
              boxShadow: [
                "0 0 0px 0px rgba(0, 0, 0, 0)",
                "0 0 120px 60px #00ffff88",
                "0 0 0px 0px rgba(0, 0, 0, 0)",
              ],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: inView ? 0 : 60, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-white font-semibold leading-tight text-[1.1rem] text-center"
          >
            <p>
              Technology with <span className="text-cyan-400">Soul.</span>
            </p>
          </motion.div>
        </motion.div>

        {/* Nature with Purpose */}
        <motion.div
          className="fixed z-10 flex flex-col items-center gap-4 bottom-[20%] left-[42%] sm:bottom-[10%] md:bottom-[10%] lg:bottom-[12%]"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: inView ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: inView ? 0 : -60, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-white font-semibold leading-tight text-[1.1rem] text-center"
          >
            <p>
              Nature with <span className="text-green-400">Purpose.</span>
            </p>

            
          </motion.div>

          <motion.div
            className="w-28 h-28 rounded-full"
            style={{
              background: "radial-gradient(circle, #00210e 0%, #027d40 100%)",
              filter: "blur(1px)",
            }}
            animate={{
              boxShadow: [
                "0 0 0px 0px rgba(0, 0, 0, 0)",
                "0 0 120px 60px #00ff8888",
                "0 0 0px 0px rgba(0, 0, 0, 0)",
              ],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Humanity with Vision */}
        <motion.div
          className="fixed z-10 flex flex-col items-center gap-4 top-[20%] right-[5%] sm:top-[28%] sm:right-[10%] md:top-[42%] md:right-[12%] lg:top-[40%] lg:right-[10%]"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: inView ? 1 : 0, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            className="w-28 h-28 rounded-full"
            style={{
              background: "radial-gradient(circle, #331b00 0%, #a04200 100%)",
              filter: "blur(1px)",
            }}
            animate={{
              boxShadow: [
                "0 0 0px 0px rgba(0, 0, 0, 0)",
                "0 0 120px 60px #ffa50088",
                "0 0 0px 0px rgba(0, 0, 0, 0)",
              ],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: inView ? 0 : 60, opacity: inView ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-white font-semibold leading-tight text-[1.1rem] text-center"
          >
            <p>
              Humanity with <span className="text-orange-400">Vision.</span>
            </p>

          </motion.div>
           
        </motion.div>
         
      </section>
                
      <div className="h-[100vh]" />
         
    </>
  );
};

export default HarmonySpectrum;

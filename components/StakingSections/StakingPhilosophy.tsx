"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const StakingPhilosophy = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.5,
    once: false,
  });

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(inView);
    console.log("got in view:", inView);
  }, [inView]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden text-white flex pt-20"
      >
        <div className="text-2xl font-semibold w-full h-full flex flex-col justify-between">
          {/* 🖥️ Top Fixed Row (Desktop) */}
          <div className="hidden md:flex justify-between fixed w-full px-10 pt-10 top-12">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: isInView ? 0 : -100, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <h2>
                Staking in this system isn't passive – <br />
                it's powerful.
              </h2>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: isInView ? 0 : 100, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <h2>
                It's a commitment. <br /> A contribution. <br /> A conversation
                between <br /> time and truth.
              </h2>
            </motion.div>
          </div>

          {/* 📱 Top Row (Mobile) */}
          <div className="flex md:hidden flex-col fixed w-full px-6 pt-28 top-0 gap-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2>
                Staking in this system isn't passive – <br />
                it's powerful.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2>
                It's a commitment. <br /> A contribution. <br /> A conversation
                between <br /> time and truth.
              </h2>
            </motion.div>
          </div>

          {/* 🖥️ Bottom Fixed Row (Desktop) */}
          <div className="hidden md:flex justify-between fixed bottom-0 w-full px-10 pb-10">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: isInView ? 0 : -100, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2>
                We don't freeze your tokens. <br /> We plant them.
              </h2>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: isInView ? 0 : 100, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <h2>
                And what grows from your trust... <br /> returns in frequency.
              </h2>
            </motion.div>
          </div>

          {/* 📱 Bottom Row (Mobile) */}
          <div className="flex md:hidden flex-col fixed bottom-0 w-full px-6 pb-10 gap-y-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2>
                We don't freeze your tokens. <br /> We plant them.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2>
                And what grows from your trust... <br /> returns in frequency.
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scroll out */}
      <div className="h-[100vh]"></div>
    </>
  );
};

export default StakingPhilosophy;

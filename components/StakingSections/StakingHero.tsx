"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const StakingHero = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, {
    amount: 0.5,
    once: false,
  });

  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(inView);
    console.log("StakingHero in view:", inView);
  }, [inView]);

  return (
    <>
      {/* <div className="h-[50vh]"></div> */}

      <section
        ref={sectionRef}
        className="relative w-full h-screen overflow-hidden text-white flex pt-20"
      >
        <div className="text-4xl font-semibold w-full h-full flex flex-col justify-between">
          {/* Top Fixed Row */}
          <div className="flex justify-between fixed w-full px-40 pt-10 top-40">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: isInView ? 0 : -100, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <h2>
                You don't stake to earn. <br /> You stake to anchor.
              </h2>
            </motion.div>
          </div>

          {/* Bottom Fixed Row */}
          <div className="flex justify-end fixed bottom-0 w-full px-40 pb-20 ">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: isInView ? 0 : 100, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className=""
            >
              <h2 className="text-right">
                You don't lock your tokens. <br /> You plant them.
              </h2>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scroll out */}
      {/* <div className="h-[50vh] "></div> */}
    </>
  );
};

export default StakingHero;

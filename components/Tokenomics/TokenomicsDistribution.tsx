// components/TokenomicsDistribution.tsx
"use client";

import React, { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// All six allocations, in display order
const distribution = [
  {
    pct: "44%",
    title: "Pre-Sale & Staking Rewards",
    keyLine: "Master Number 44 | The Generator",
    desc: "The foundation. The pulse. The movement—where energy begins and belief is staked.",
  },
  {
    pct: "22%",
    title: "Ecosystem Development",
    keyLine: "Master Number 22 | The Builder of Worlds",
    desc: "The scaffolding, the rails, the roads—tools, tech, and infrastructure that let PL&H grow at scale.",
  },
  {
    pct: "11%",
    title: "Liquidity Pool",
    keyLine: "Master Number 11 | The Gateway",
    desc: "For freedom, flow, and access—ensuring energy moves, new folks can enter, and the system stays alive.",
  },
  {
    pct: "11%",
    title: "Community Projects",
    keyLine: "Master Number 11 again | The Mirror",
    desc: "The heartbeats of the people—DAO-voted, community-funded, making collective dreams real.",
  },
  {
    pct: "11%",
    title: "Team Address / Completion Reserve",
    keyLine: "Completion Reserve",
    desc: "Not for profit but for protection—a transparent buffer that makes sure every garden gets fully grown.",
  },
  {
    pct: "1%",
    title: "The Gift",
    keyLine: "The One Percent | The Lightbringer",
    desc: "For those who move mountains by a single act—innovators who give before they ask, lifting the whole field.",
  },
];

export default function TokenomicsDistribution() {
  // refs & inView for 3 sections
  const refs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];
  const inViews = refs.map((ref) => useInView(ref, { amount: 0.5 }));

  // split into 3 sections of 2 items each
  const sections = [
    distribution.slice(0, 2),
    distribution.slice(2, 4),
    distribution.slice(4, 6),
  ];

  return (
    <>
      {sections.map((items, sectionIdx) => {
        const inView = inViews[sectionIdx];
        const ref = refs[sectionIdx];
        return (
          <section
            key={sectionIdx}
            ref={ref}
            className="mt-20 w-full h-screen relative bg-black overflow-hidden"
          >
            <AnimatePresence>
              {inView && (
                <motion.div
                  className="fixed inset-0 z-50 px-6 flex justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{}}
                >
                  {/* timeline line */}
                  <motion.div
                    className="absolute left-1/2 top-0 h-full w-px bg-gray-700"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* items */}
                  <div className="relative w-full max-w-4xl h-full flex flex-col justify-center">
                    {items.map((item, idx) => {
                      const globalIdx = sectionIdx * 2 + idx;
                      const isLeft = globalIdx % 2 === 0;
                      const delayIn = 0.8 + idx * 0.6;
                      const delayOut = idx * 0.2;
                      return (
                        <motion.div
                          key={globalIdx}
                          className="relative flex w-full py-16"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{
                            opacity: 0,
                            y: 30,
                            transition: {
                              duration: 0.4,
                              ease: "easeIn",
                              delay: delayOut,
                            },
                          }}
                          transition={{
                            duration: 0.6,
                            ease: "easeOut",
                            delay: delayIn,
                          }}
                        >
                          {/* marker */}
                          <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-gradient-to-r from-[#F9CD13] to-[#A67C00] rounded-full animate-pulse" />

                          {/* content */}
                          <div
                            className={
                              isLeft
                                ? "w-[45%] pr-8 text-right ml-[5%]"
                                : "w-[45%] pl-8 text-left ml-[50%]"
                            }
                          >
                            <h3 className="inline-flex items-center text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#F9CD13] to-[#539241]">
                              {item.pct}&nbsp;{item.title}
                            </h3>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {item.keyLine}
                            </p>
                            <p className="mt-1 text-base sm:text-lg text-gray-400 italic leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        );
      })}
    </>
  );
}

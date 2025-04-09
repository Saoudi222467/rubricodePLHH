"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import InfinityLoop from "../InfinityLoop";

export default function PhasePrices() {
  const ref = useRef(null);

  // Track scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth out scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Fade out all content at the end of the scroll
  const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);

  // (Optional shape animations remain for reference)
  const leftHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5]);
  const leftDiagTopScale = useTransform(smoothScrollYProgress, [0.2, 0.4], [0, 1]);
  const leftDiagBottomScale = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1]);

  const rightHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5]);
  const rightDiagTopScale = useTransform(smoothScrollYProgress, [0.2, 0.4], [0, 1]);
  const rightDiagBottomScale = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1]);

  const lineOpacity = useTransform(smoothScrollYProgress, [0.4, 0.6], [1, 0]);

  const blobScale = useTransform(smoothScrollYProgress, [0, 0.4], [0, 3]);
  const blobOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5], [0.8, 0]);

  // Optional InfinityLoop animation
  const loopOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [0, 1]);
  const loopScale = useTransform(smoothScrollYProgress, [0.45, 0.55], [0.8, 1]);

  // Staggered text animations for table rows
  const textAnimStart = 0.55;
  const step = 0.04;
  const initialY = 50;
  const finalY = 0;

  // Header row animation
  const headerOpacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart, textAnimStart + step],
    [0, 1]
  );
  const headerY = useTransform(
    smoothScrollYProgress,
    [textAnimStart, textAnimStart + step],
    [initialY, finalY]
  );

  // Row 1 (Phase 1)
  const row1Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step, textAnimStart + step * 2],
    [0, 1]
  );
  const row1Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step, textAnimStart + step * 2],
    [initialY, finalY]
  );

  // Row 2 (Phase 2)
  const row2Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 2, textAnimStart + step * 3],
    [0, 1]
  );
  const row2Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 2, textAnimStart + step * 3],
    [initialY, finalY]
  );

  // Row 3 (Phase 3)
  const row3Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 3, textAnimStart + step * 4],
    [0, 1]
  );
  const row3Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 3, textAnimStart + step * 4],
    [initialY, finalY]
  );

  // Row 4 (Phase 4)
  const row4Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 4, textAnimStart + step * 5],
    [0, 1]
  );
  const row4Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 4, textAnimStart + step * 5],
    [initialY, finalY]
  );

  // Row 5 (Phase 5)
  const row5Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 5, textAnimStart + step * 6],
    [0, 1]
  );
  const row5Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 5, textAnimStart + step * 6],
    [initialY, finalY]
  );

  // Row 6 (Phase 6)
  const row6Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 6, textAnimStart + step * 7],
    [0, 1]
  );
  const row6Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 6, textAnimStart + step * 7],
    [initialY, finalY]
  );

  // Row 7 (Phase 7)
  const row7Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 7, textAnimStart + step * 8],
    [0, 1]
  );
  const row7Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 7, textAnimStart + step * 8],
    [initialY, finalY]
  );

  // Row 8 (Phase 8)
  const row8Opacity = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 8, textAnimStart + step * 9],
    [0, 1]
  );
  const row8Y = useTransform(
    smoothScrollYProgress,
    [textAnimStart + step * 8, textAnimStart + step * 9],
    [initialY, finalY]
  );

  return (
    <section ref={ref} className="relative w-full h-[200vh] bg-black font-montserrat snap-start">
      {/* Fixed Container */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative h-full w-full flex flex-col items-center justify-center"
        >
          <motion.table className="table-auto border-separate border-spacing-x-8 border-spacing-y-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            <thead>
              <motion.tr style={{ opacity: headerOpacity, y: headerY }}>
                <th className="text-yellow-500 px-4 py-2">Phase</th>
                <th className="text-yellow-500 px-4 py-2">Price</th>
                <th className="text-yellow-500 px-4 py-2">Discount</th>
                <th className="text-yellow-500 px-4 py-2">Tokens</th>
              </motion.tr>
            </thead>
            <tbody>
              <motion.tr style={{ opacity: row1Opacity, y: row1Y }}>
                <td className="text-white px-4 py-2 text-center">1</td>
                <td className="text-white px-4 py-2 text-center">0.08</td>
                <td className="text-white px-4 py-2 text-center">80%</td>
                <td className="text-white px-4 py-2 text-center">11,111,100</td>
              </motion.tr>
              <motion.tr style={{ opacity: row2Opacity, y: row2Y }}>
                <td className="text-white px-4 py-2 text-center">2</td>
                <td className="text-white px-4 py-2 text-center">0.12</td>
                <td className="text-white px-4 py-2 text-center">70%</td>
                <td className="text-white px-4 py-2 text-center">22,222,220</td>
              </motion.tr>
              <motion.tr style={{ opacity: row3Opacity, y: row3Y }}>
                <td className="text-white px-4 py-2 text-center">3</td>
                <td className="text-white px-4 py-2 text-center">0.16</td>
                <td className="text-white px-4 py-2 text-center">60%</td>
                <td className="text-white px-4 py-2 text-center">25,000,000</td>
              </motion.tr>
              <motion.tr style={{ opacity: row4Opacity, y: row4Y }}>
                <td className="text-white px-4 py-2 text-center">4</td>
                <td className="text-white px-4 py-2 text-center">0.20</td>
                <td className="text-white px-4 py-2 text-center">50%</td>
                <td className="text-white px-4 py-2 text-center">33,333,333</td>
              </motion.tr>
              <motion.tr style={{ opacity: row5Opacity, y: row5Y }}>
                <td className="text-white px-4 py-2 text-center">5</td>
                <td className="text-white px-4 py-2 text-center">0.24</td>
                <td className="text-white px-4 py-2 text-center">40%</td>
                <td className="text-white px-4 py-2 text-center">35,555,555</td>
              </motion.tr>
              <motion.tr style={{ opacity: row6Opacity, y: row6Y }}>
                <td className="text-white px-4 py-2 text-center">6</td>
                <td className="text-white px-4 py-2 text-center">0.28</td>
                <td className="text-white px-4 py-2 text-center">30%</td>
                <td className="text-white px-4 py-2 text-center">44,444,444</td>
              </motion.tr>
              <motion.tr style={{ opacity: row7Opacity, y: row7Y }}>
                <td className="text-white px-4 py-2 text-center">7</td>
                <td className="text-white px-4 py-2 text-center">0.32</td>
                <td className="text-white px-4 py-2 text-center">20%</td>
                <td className="text-white px-4 py-2 text-center">45,678,901</td>
              </motion.tr>
              <motion.tr style={{ opacity: row8Opacity, y: row8Y }}>
                <td className="text-white px-4 py-2 text-center">8</td>
                <td className="text-white px-4 py-2 text-center">0.36</td>
                <td className="text-white px-4 py-2 text-center">10%</td>
                <td className="text-white px-4 py-2 text-center">46,654,434</td>
              </motion.tr>
            </tbody>
          </motion.table>
          <motion.div
            className="mt-8 transform scale-50 md:scale-60 absolute"
            style={{ opacity: loopOpacity, scale: loopScale }}
          >
            <InfinityLoop />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

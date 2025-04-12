import React, { useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const COLOR_ONE = "#D9D9D980";
const COLOR_TWO = "#CB6D5180";
const COLOR_THREE = "#539241A1";
const COLOR_FOUR = "#A67C0080";

const gradientVariants = {
  initial: {
    "--stop-start": "45%",
    "--stop-end": "55%",
    margin: "0 -2rem",
  },
  hovered: {
    "--stop-start": "40%",
    "--stop-end": "60%",
    margin: "0 -5rem",
  },
};

const CoinSection: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  // Set up scroll tracking on this section.
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Create a multi-step opacity mapping:
  // - From 0% to 5% of the section scroll: opacity is 0 (hidden).
  // - From 5% to 95%: opacity is 1 (visible).
  // - From 95% to 100%: opacity fades to 0 (unpinning).
  const contentOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      ref={ref}
      className="relative w-full h-[200vh] overflow-hidden select-none"
    >
      {/* Fixed container pins the content only during this section's active scroll */}
      <div className="fixed inset-0">
        <motion.div style={{ opacity: contentOpacity }} className="relative h-full w-full">
          {/* Background gradients container */}
          <div className="absolute inset-0 flex items-stretch">
            {/* Gradient 1 */}
            <motion.div
              className="flex-1"
              variants={gradientVariants}
              animate={hovered ? "hovered" : "initial"}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${COLOR_ONE} var(--stop-start), ${COLOR_ONE} var(--stop-end), transparent 100%)`,
              }}
            />
            {/* Gradient 2 */}
            <motion.div
              className="flex-1"
              variants={gradientVariants}
              animate={hovered ? "hovered" : "initial"}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${COLOR_TWO} var(--stop-start), ${COLOR_TWO} var(--stop-end), transparent 100%)`,
              }}
            />
            {/* Gradient 3 */}
            <motion.div
              className="flex-1"
              variants={gradientVariants}
              animate={hovered ? "hovered" : "initial"}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${COLOR_THREE} var(--stop-start), ${COLOR_THREE} var(--stop-end), transparent 100%)`,
              }}
            />
            {/* Gradient 4 */}
            <motion.div
              className="flex-1"
              variants={gradientVariants}
              animate={hovered ? "hovered" : "initial"}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${COLOR_FOUR} var(--stop-start), ${COLOR_FOUR} var(--stop-end), transparent 100%)`,
              }}
            />
          </div>

          {/* Background overlay with adjustable darkness */}
          <motion.div
            className="absolute inset-0 bg-black backdrop-blur-lg"
            animate={{ opacity: hovered ? 0.1 : 0.6 }}
            transition={{ duration: 0.5 }}
            style={{ zIndex: 10 }}
          />

          {/* Centered content container */}
          <div
            className={`relative flex flex-col items-center justify-center h-full font-montserrat font-bold text-5xl ${
              hovered ? "glowing-text" : ""
            }`}
            style={{ zIndex: 20 }}
          >
            {/* New text above image */}
            <h1 className="text-white mb-12 transition-all shadow-sm">
              Foundation is not{" "}
              <span className="text-landing-bright glowing-text">
                Control.
              </span>
            </h1>

            {/* Centered image container with brightness filter animation */}
            <motion.div
              onHoverStart={() => setHovered(true)}
              onHoverEnd={() => setHovered(false)}
              whileHover={{ scale: 1.1 }}
              className="w-80 h-80 flex items-center justify-center relative cursor-pointer overflow-hidden"
            >
              <motion.div
                animate={{ filter: hovered ? "brightness(1)" : "brightness(0.5)" }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image
                  src="/assets/images/landing/coin.png"
                  width={200}
                  height={200}
                  alt="coin"
                  layout="intrinsic"
                  className="w-full"
                />
              </motion.div>
            </motion.div>

            {/* New text below image */}
            <h1 className="text-white mt-12 transition-all">
              Foundation is{" "}
              <span className="text-landing-bright glowing-text">
                flow.
              </span>
            </h1>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoinSection;

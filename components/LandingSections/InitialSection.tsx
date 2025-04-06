  "use client";
  import { motion, useScroll, useTransform, useSpring } from "framer-motion";
  import { useRef } from "react";

  export default function LandingSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end end"],
    });
    const smoothScrollYProgress = useSpring(scrollYProgress, {
      stiffness: 100,
      damping: 30,
    });

    // Content and shape animations remain unchanged:
    const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);

    const leftHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5]);
    const leftDiagTopScale = useTransform(smoothScrollYProgress, [0.2, 0.4], [0, 1]);
    const leftDiagBottomScale = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1]);

    const rightHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5]);
    const rightDiagTopScale = useTransform(smoothScrollYProgress, [0.2, 0.4], [0, 1]);
    const rightDiagBottomScale = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1]);

    const lineOpacity = useTransform(smoothScrollYProgress, [0.4, 0.6], [1, 0]);

    const blobScale = useTransform(smoothScrollYProgress, [0, 0.4], [0, 3]);
    const blobOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5], [0.8, 0]);

    // Define a common timing and transform range for all text elements:
    const textAnimStart = 0.65;
    const initialY = 50;
    const finalY = 0;

    // Apply the same transforms to each text element:
    const text1Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 1], [0, 1]);
    const text1Y = useTransform(
      smoothScrollYProgress,
      [textAnimStart, textAnimStart + 0.05 * 1],
      [initialY, finalY]
    );

    const text2Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 2], [0, 1]);
    const text2Y = useTransform(
      smoothScrollYProgress,
      [textAnimStart, textAnimStart + 0.05 * 2],
      [initialY, finalY]
    );

    const text3Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 3], [0, 1]);
    const text3Y = useTransform(
      smoothScrollYProgress,
      [textAnimStart, textAnimStart + 0.05 * 3],
      [initialY, finalY]
    );

    const text4Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 4], [0, 1]);
    const text4Y = useTransform(
      smoothScrollYProgress,
      [textAnimStart, textAnimStart + 0.05 * 4],
      [initialY, finalY]
    );

    return (
      <section ref={ref} className="relative w-full h-[400vh] bg-black font-montserrat">
        {/* Fixed container: background elements remain fixed while scrolling */}
        <div className="fixed inset-0 overflow-hidden">
          <motion.div style={{ opacity: contentOpacity }} className="relative h-full w-full">
            {/* --- Left Side Lines --- */}
            <motion.div
              className="absolute bg-landing h-[2px] w-[50vw]"
              style={{
                top: "15%",
                left: 0,
                scaleX: leftHorizScale,
                transformOrigin: "left center",
                opacity: lineOpacity,
              }}
            />
            <motion.div
              className="absolute bg-landing h-[2px] w-[50vw]"
              style={{
                top: "95%",
                left: 0,
                scaleX: leftHorizScale,
                transformOrigin: "left center",
                opacity: lineOpacity,
              }}
            />
            {/* <motion.div
              className="absolute bg-landing h-[2px] w-[70vw]"
              style={{
                top: 0,
                left: 0,
                scaleX: leftDiagTopScale,
                transformOrigin: "top left",
                rotate: "45deg",
                opacity: lineOpacity,
              }}
            /> */}
            {/* <motion.div
              className="absolute bg-landing h-[2px] w-[70vw]"
              style={{
                bottom: 0,
                left: 0,
                scaleX: leftDiagBottomScale,
                transformOrigin: "bottom left",
                rotate: "-45deg",
                opacity: lineOpacity,
              }}
            /> */}
            {/* --- Right Side Lines --- */}
            <motion.div
              className="absolute bg-landing h-[2px] w-[50vw]"
              style={{
                top: "15%",
                right: 0,
                scaleX: rightHorizScale,
                transformOrigin: "right center",
                opacity: lineOpacity,
              }}
            />
            <motion.div
              className="absolute bg-landing h-[2px] w-[50vw]"
              style={{
                top: "95%",
                right: 0,
                scaleX: rightHorizScale,
                transformOrigin: "right center",
                opacity: lineOpacity,
              }}
            />
            {/* <motion.div
              className="absolute bg-landing h-[2px] w-[70vw]"
              style={{
                top: 0,
                right: 0,
                scaleX: rightDiagTopScale,
                transformOrigin: "top right",
                rotate: "-45deg",
                opacity: lineOpacity,
              }}
            /> */}
            {/* <motion.div
              className="absolute bg-landing h-[2px] w-[70vw]"
              style={{
                bottom: 0,
                right: 0,
                scaleX: rightDiagBottomScale,
                transformOrigin: "bottom right",
                rotate: "45deg",
                opacity: lineOpacity,
              }}
            /> */}
            {/* --- Center Glowing Blob with Breathing Effect --- */}
            <motion.div
              className="absolute w-64 h-64 rounded-full mix-blend-screen"
              style={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
                scale: blobScale,
                opacity: blobOpacity,
                background: "radial-gradient(circle, var(--landing) 0%, transparent 70%)",
              }}
            >
              {/* Nested breathing glow element */}
              <motion.div
                className="w-full h-full rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  filter: ["blur(25px)", "blur(24px)", "blur(2px)"],
                  boxShadow: [
                    "0px 0px 0px 0px var(--landing)",
                    "0px 0px 20px 10px var(--landing)",
                    "0px 0px 0px 0px var(--landing)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* --- Text Overlay with increased vertical spacing --- */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center space-y-12">
              <motion.h2
                style={{ opacity: text1Opacity, y: text1Y }}
                className="glowing-text text-white text-5xl font-bold"
              >
                Remember.
              </motion.h2>
              <motion.h2
                style={{ opacity: text2Opacity, y: text2Y }}
                className="glowing-text text-white text-5xl font-bold"
              >
                Connect.
              </motion.h2>
              <motion.h2
                style={{ opacity: text3Opacity, y: text3Y }}
                className="glowing-text text-white text-5xl font-bold"
              >
                Heal.
              </motion.h2>
              <motion.h2
                style={{ opacity: text4Opacity, y: text4Y }}
                className="glowing-text text-white text-5xl font-bold"
              >
                Create.
              </motion.h2>
            </div>

            {/* --- Scroll Prompt --- */}
            <motion.div className="glowing-text absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xl">
              Scroll for an immersive Experience
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

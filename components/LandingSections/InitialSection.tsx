"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function LandingSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const animated = (val: any, fallback: any) => (isMobile ? fallback : val);

  const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);
  const leftHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5]);
  const rightHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5]);
  const lineOpacity = useTransform(smoothScrollYProgress, [0.4, 0.6], [1, 0]);
  const blobScale = useTransform(smoothScrollYProgress, [0, 0.4], [0, 3]);
  const blobOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5], [0.8, 0]);

  const textAnimStart = 0.65;
  const initialY = 50;
  const finalY = 0;

  const text1Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 1], [0, 1]);
  const text1Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 1], [initialY, finalY]);

  const text2Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 2], [0, 1]);
  const text2Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 2], [initialY, finalY]);

  const text3Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 3], [0, 1]);
  const text3Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 3], [initialY, finalY]);

  const text4Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 4], [0, 1]);
  const text4Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 4], [initialY, finalY]);

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "h-screen" : "h-[400vh] snap-start relative "} bg-black font-montserrat`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden"}`}>
        <motion.div style={{ opacity: animated(contentOpacity, 1) }} className="relative h-full w-full">
          {/* Horizontal Lines - only on desktop */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute bg-landing h-[2px] w-[50vw]"
                style={{
                  top: "15%",
                  left: 0,
                  scaleX: animated(leftHorizScale, 1),
                  transformOrigin: "left center",
                  opacity: animated(lineOpacity, 1),
                }}
              />
              <motion.div
                className="absolute bg-landing h-[2px] w-[50vw]"
                style={{
                  top: "95%",
                  left: 0,
                  scaleX: animated(leftHorizScale, 1),
                  transformOrigin: "left center",
                  opacity: animated(lineOpacity, 1),
                }}
              />
              <motion.div
                className="absolute bg-landing h-[2px] w-[50vw]"
                style={{
                  top: "15%",
                  right: 0,
                  scaleX: animated(rightHorizScale, 1),
                  transformOrigin: "right center",
                  opacity: animated(lineOpacity, 1),
                }}
              />
              <motion.div
                className="absolute bg-landing h-[2px] w-[50vw]"
                style={{
                  top: "95%",
                  right: 0,
                  scaleX: animated(rightHorizScale, 1),
                  transformOrigin: "right center",
                  opacity: animated(lineOpacity, 1),
                }}
              />
            </>
          )}

          {/* Radial breathing background behind text on mobile */}
          {isMobile && (
            <motion.div
              className="absolute top-[50px] left-[20%] -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full z-0"
              style={{
                background: "radial-gradient(circle, var(--landing) 0%, transparent 70%)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                filter: ["blur(20px)", "blur(40px)", "blur(20px)"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}

          {/* Glowing Blob - behind text on mobile or centered on desktop */}
          <motion.div
            className={`rounded-full mix-blend-screen  ${
              isMobile
                ? "absolute w-48 h-48 left-1/3 top-[50%] -translate-x-1/2 z-0 hidden"
                : "absolute w-64 h-64 inset-0 m-auto z-0"


            }`}
            style={{
              scale: animated(blobScale, 1),
              opacity: animated(blobOpacity, 1),
              background: "radial-gradient(circle, var(--landing) 0%, transparent 70%)",
            }}
          >
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

          {/* Text Overlay */}
          <div
            className={`absolute inset-0 z-10 flex flex-col items-center space-y-12 px-4 ${
              isMobile ? "justify-start pt-24" : "justify-center"
            }`}
          >
            <motion.h2
              style={{ opacity: animated(text1Opacity, 1), y: animated(text1Y, 0) }}
              className="glowing-text text-white text-5xl font-bold text-center"
            >
              Remember.
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text2Opacity, 1), y: animated(text2Y, 0) }}
              className="glowing-text text-white text-5xl font-bold text-center"
            >
              Connect.
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text3Opacity, 1), y: animated(text3Y, 0) }}
              className="glowing-text text-white text-5xl font-bold text-center"
            >
              Heal.
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text4Opacity, 1), y: animated(text4Y, 0) }}
              className="glowing-text text-white text-5xl font-bold text-center"
            >
              Create.
            </motion.h2>
          </div>

          {/* Scroll Prompt */}
          {!isMobile && (
            <motion.div className="glowing-text absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-xl z-10">
              Scroll for an immersive Experience
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

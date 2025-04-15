"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function CoCreateSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const animated = (val: any, fallback: any) => (isMobile ? fallback : val);

  const contentOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const bgOpacity = useTransform(smoothScrollYProgress, [0.05, 0.15], [0, 1]);

  const leftTextOpacity = useTransform(smoothScrollYProgress, [0.2, 0.3], [0, 1]);
  const leftTextX = useTransform(smoothScrollYProgress, [0.2, 0.3], [-200, 0]);

  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1]);
  const rightTextX = useTransform(smoothScrollYProgress, [0.3, 0.4], [300, 0]);

  return (
    <section
      ref={ref}
      id="co-create-section"
      className={`w-full ${
        isMobile ? "py-24 min-h-[600px]" : "h-[200vh] snap-start"
      } overflow-hidden font-montserrat bg-cover bg-center`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0"}`}>
        <motion.div
          style={{ opacity: animated(contentOpacity, 1) }}
          className={`relative w-full ${isMobile ? "min-h-[600px]" : "h-full"}`}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/assets/images/landing/CoCreate.jpg')",
              opacity: animated(bgOpacity, 1),
            }}
          />
          <div className="absolute inset-0 bg-black/40 z-0" />

          <div
            className={`relative z-10 w-full h-full ${
              isMobile
                ? "flex flex-col justify-center items-center gap-10 px-4 pt-24 pb-32"
                : "flex flex-col justify-center"
            }`}
          >
            {/* Left Text */}
            <motion.div
              style={{
                opacity: animated(leftTextOpacity, 1),
                x: animated(leftTextX, 0),
              }}
              className={`text-5xl font-bold text-white glowing-text ${
                isMobile ? "text-center w-full" : "absolute top-40 left-10 w-72 text-left"
              }`}
            >
              You are not here to{" "}
              <span className="text-landing-bright glowing-text">Follow.</span>
            </motion.div>

            {/* Right Text */}
            <motion.div
              style={{
                opacity: animated(rightTextOpacity, 1),
                x: animated(rightTextX, 0),
              }}
              className={`text-5xl font-bold text-white glowing-text ${
                isMobile ? "text-center w-full" : "absolute top-40 right-10 w-96 text-right"
              }`}
            >
              You are here to{" "}
              <span className="text-landing-bright glowing-text">co-create.</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

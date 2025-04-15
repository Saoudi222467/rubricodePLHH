"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ReadySection({ isMobile }: { isMobile: boolean }) {
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

  const contentOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 1, 1], [0, 1, 1, 1]);
  const blobScale = useTransform(smoothScrollYProgress, [0, 0.4], [0, 3]);
  const blobOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5], [0.8, 0]);

  const textAnimStart = 0.65;
  const initialY = 50;
  const finalY = 0;

  const text1Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05], [0, 1]);
  const text1Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05], [initialY, finalY]);

  const text2Opacity = useTransform(smoothScrollYProgress, [textAnimStart + 0.05, textAnimStart + 0.1], [0, 1]);
  const text2Y = useTransform(smoothScrollYProgress, [textAnimStart + 0.05, textAnimStart + 0.1], [initialY, finalY]);

  const text3Opacity = useTransform(smoothScrollYProgress, [textAnimStart + 0.1, textAnimStart + 0.15], [0, 1]);
  const text3Y = useTransform(smoothScrollYProgress, [textAnimStart + 0.1, textAnimStart + 0.15], [initialY, finalY]);

  const text4Opacity = useTransform(smoothScrollYProgress, [textAnimStart + 0.15, textAnimStart + 0.2], [0, 1]);
  const text4Y = useTransform(smoothScrollYProgress, [textAnimStart + 0.15, textAnimStart + 0.2], [initialY, finalY]);

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "py-96" : "h-[400vh] snap-start"} bg-black font-montserrat overflow-hidden`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden pt-20"}`}>
        <motion.div style={{ opacity: animated(contentOpacity, 1) }} className="relative h-full w-full">
          
          {/* Desktop Blob */}
          {!isMobile && (
            <motion.div
              className="absolute w-64 h-64 rounded-full mix-blend-screen"
              style={{
                top: "50%",
                left: "50%",
                x: "-50%",
                y: "-50%",
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
          )}

          {/* Breathing Radial Gradient Behind Text */}
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center"
            aria-hidden
          >
            <motion.div
              className="w-96 h-96 rounded-full"
              style={{
                background: "radial-gradient(circle, var(--landing) 0%, transparent 70%)",
                mixBlendMode: "screen",
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.35, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Text and Button */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center space-y-10 px-4 text-center">
            <motion.h2
              style={{ opacity: animated(text1Opacity, 1), y: animated(text1Y, 0) }}
              className="text-white text-3xl md:text-5xl font-bold"
            >
              You have seen the <span className="text-[#A67C00]">Earth.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text2Opacity, 1), y: animated(text2Y, 0) }}
              className="text-white text-3xl md:text-5xl font-bold"
            >
              You felt the <span className="text-[#5FB9C3]">Flow</span>, the{" "}
              <span className="text-[#539241]">Vision</span>, the{" "}
              <span className="text-[#892D06]">Balance.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text3Opacity, 1), y: animated(text3Y, 0) }}
              className="text-white text-3xl md:text-5xl font-bold"
            >
              You are not joining a <span className="text-[#A67C00]">project.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: animated(text4Opacity, 1), y: animated(text4Y, 0) }}
              className="text-white text-3xl md:text-5xl font-bold"
            >
              You are remembering your <span className="text-[#A67C00]">role.</span>
            </motion.h2>

            {/* Buttons */}
            <motion.div style={{ opacity: animated(text4Opacity, 1), y: animated(text4Y, 0) }}>
              <Button
                className="hidden md:flex bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 
                  text-amber-950 font-bold border-none rounded-md px-6 py-6 h-11
                  shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] 
                  hover:shadow-[0_0_30px_rgba(255,215,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)] 
                  transition-all duration-300 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                I'm Ready
              </Button>

              {/* Mobile Button */}
              <Button className="md:hidden mt-4 bg-yellow-500 text-black font-bold px-6 py-4 rounded-md">
                I'm Ready
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

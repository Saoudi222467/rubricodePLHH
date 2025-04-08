"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export default function ReadySection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Remove the fade-out at the end by keeping opacity at 1
  // Changed from: const contentOpacity = useTransform(smoothScrollYProgress, [0.95, 1], [1, 0]);
  const contentOpacity = useTransform(smoothScrollYProgress, [0, 1], [1, 1])

  const leftHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5])
  const leftDiagTopScale = useTransform(smoothScrollYProgress, [0.2, 0.4], [0, 1])
  const leftDiagBottomScale = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1])

  const rightHorizScale = useTransform(smoothScrollYProgress, [0, 0.2], [0, 0.5])
  const rightDiagTopScale = useTransform(smoothScrollYProgress, [0.2, 0.4], [0, 1])
  const rightDiagBottomScale = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1])

  const lineOpacity = useTransform(smoothScrollYProgress, [0.4, 0.6], [1, 0])

  const blobScale = useTransform(smoothScrollYProgress, [0, 0.4], [0, 3])
  const blobOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5], [0.8, 0])

  // Define a common timing and transform range for all text elements:
  const textAnimStart = 0.65
  const initialY = 50
  const finalY = 0

  // Apply the same transforms to each text element:
  const text1Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 1], [0, 1])
  const text1Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 1], [initialY, finalY])

  const text2Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 2], [0, 1])
  const text2Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 2], [initialY, finalY])

  const text3Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 3], [0, 1])
  const text3Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 3], [initialY, finalY])

  const text4Opacity = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 4], [0, 1])
  const text4Y = useTransform(smoothScrollYProgress, [textAnimStart, textAnimStart + 0.05 * 4], [initialY, finalY])

  return (
    <section ref={ref} className="relative w-full h-[400vh] bg-black font-montserrat">
      {/* Fixed container: background elements remain fixed while scrolling */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div style={{ opacity: contentOpacity }} className="relative h-full w-full">
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
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* --- Text Overlay with increased vertical spacing --- */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center space-y-12">
            <motion.h2
              style={{ opacity: text1Opacity, y: text1Y }}
              className="text-white text-5xl font-bold text-center"
            >
              You have seen the <span className="text-[#A67C00]">Earth.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: text2Opacity, y: text2Y }}
              className="text-white text-5xl font-bold text-center"
            >
              You felt the <span className="text-[#5FB9C3]">Flow</span>, the{" "}
              <span className="text-[#539241]">Vision</span>, the <span className="text-[#892D06]">Balance.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: text3Opacity, y: text3Y }}
              className="text-white text-5xl font-bold text-center"
            >
              You are not joining a <span className="text-[#A67C00]">project.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: text4Opacity, y: text4Y }}
              className="text-white text-5xl font-bold text-center"
            >
              You are remembering your <span className="text-[#A67C00]">role.</span>
            </motion.h2>
            <motion.h2
              style={{ opacity: text4Opacity, y: text4Y }}
              className="text-white text-5xl font-bold"
            >
              <Button
                className="hidden md:flex bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 
            text-amber-950 font-bold border-none rounded-md px-6 py-6 h-11
            shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] 
            hover:shadow-[0_0_30px_rgba(255,215,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)] 
            transition-all duration-300 relative overflow-hidden group"
              >
                {/* Animated shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                I'm Ready
              </Button>
            </motion.h2>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

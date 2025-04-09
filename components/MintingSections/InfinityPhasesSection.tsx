"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import InfinityLoopVertical from "@/components/InfinityLoopVertical"

export default function InfinityPhasesSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Smooth out the scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Fade in/out the section
  const sectionOpacity = useTransform(
    smoothScrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  )

  const initialY = 50
  const finalY = 0

  // Infinity loop animation
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.3], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.3], [0.8, 1])

  // "Phases" text animation
  const phasesTextOpacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1])
  const phasesTextY = useTransform(smoothScrollYProgress, [0.3, 0.4], [initialY, finalY])

  // Right side text animation
  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5], [0, 1])
  const rightTextY = useTransform(smoothScrollYProgress, [0.4, 0.5], [initialY, finalY])

  return (
    <section ref={ref} className="bg-black text-white h-[100vh] snap-start">
      {/* Fixed container with proper header spacing */}
      <motion.div
        className="h-screen fixed top-0 w-full flex justify-center items-center px-4 md:px-8 pt-[100px]"
        style={{ opacity: sectionOpacity }}
      >
        <div className="w-full max-w-7xl flex justify-between items-center">
          {/* Left side with infinity loop and "Phases" text */}
          <div className="flex flex-row items-center ml-0 md:-ml-16 lg:-ml-24">
            <motion.div
              className="transform scale-50 md:scale-75"
              style={{
                opacity: loopOpacity,
                scale: loopScale,
              }}
            >
              <InfinityLoopVertical />
            </motion.div>
            <motion.h2
              className="text-6xl sm:text-7xl md:text-8xl font-bold text-[#A67C00] -ml-4 md:-ml-44"
              style={{
                opacity: phasesTextOpacity,
                y: phasesTextY,
              }}
            >
              Phases
            </motion.h2>
          </div>

          {/* Right side text */}
          <motion.div
            className="text-right text-2xl sm:text-3xl md:text-4xl font-bold mr-0 md:-mr-8 lg:-mr-16"
            style={{
              opacity: rightTextOpacity,
              y: rightTextY,
            }}
          >
            <p className="text-white text-4xl md:text-5xl">Each Phase Lasts</p>
            <p className="text-white text-4xl md:text-5xl">
              <span className="text-[#A67C00] text-8xl md:text-9xl my-4">17</span>days
            </p>
            <div className="mt-6">
              <p className="text-white text-3xl md:text-4xl">
                A <span className="text-[#A67C00]">cycle</span> within a{" "}
                <span className="text-[#A67C00]">cycle</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

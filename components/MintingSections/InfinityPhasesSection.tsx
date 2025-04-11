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
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  const initialY = 50
  const finalY = 0

  // First, the infinity loop animation
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.3], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.3], [0.8, 1])

  // Then, the "Phases" text animation
  const phasesTextOpacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1])
  const phasesTextY = useTransform(smoothScrollYProgress, [0.3, 0.4], [initialY, finalY])

  // Finally, the right side text animation
  // This will transition to the top of the next section
  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.9, 1], [0, 1, 1, 0])
  const rightTextY = useTransform(smoothScrollYProgress, [0.4, 0.5], [initialY, finalY])

  // When scrolling to the end, move text to the top-left to prepare for next section
  // Moving from middle-right to top-center
  const rightTextX = useTransform(smoothScrollYProgress, [0.85, 1], [0, -300])
  const rightTextYEnd = useTransform(smoothScrollYProgress, [0.85, 1], [0, -200])

  return (
    <section ref={ref} className="relative w-full h-[200vh] bg-black text-white snap-start">
      {/* Fixed container with proper header spacing */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          className="h-screen w-full flex justify-center items-center px-4 md:px-8 pt-[120px]"
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

            {/* Right side text - this will transition to the next section */}
            <motion.div
              className="text-right text-2xl sm:text-3xl md:text-4xl font-bold mr-0 md:-mr-8 lg:-mr-16"
              style={{
                opacity: rightTextOpacity,
                y: rightTextY,
                x: rightTextX,
                translateY: rightTextYEnd,
              }}
            >
              <p className="text-white text-4xl md:text-5xl">Each Phase Lasts</p>
              <p className="text-white text-4xl md:text-5xl">
                <span className="text-[#A67C00] text-8xl md:text-9xl my-4">17</span>days
              </p>
              <div className="mt-6">
                <p className="text-white text-3xl md:text-4xl">
                  A <span className="text-[#A67C00]">cycle</span> within a <span className="text-[#A67C00]">cycle</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

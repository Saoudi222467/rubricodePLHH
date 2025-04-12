"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import InfinityLoop from "@/components/InfinityLoop"

export default function MotionSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Adjust opacity transition to be more gradual and overlap with adjacent sections
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0])

  const initialY = 50
  const finalY = 0

  // First, the top text appears (transitioning from the right side of the previous section)
  // This creates a visual connection with the InfinityPhasesSection
  const topText1Opacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1])
  // Start from bottom right (300px right, 200px down)
  const topText1X = useTransform(smoothScrollYProgress, [0.1, 0.2], [300, 0])
  const topText1Y = useTransform(smoothScrollYProgress, [0.1, 0.2], [200, 0])

  // Then the second top text
  const topText2Opacity = useTransform(smoothScrollYProgress, [0.25, 0.35], [0, 1])
  const topText2Y = useTransform(smoothScrollYProgress, [0.25, 0.35], [initialY, finalY])

  // Then the infinity loop
  const loopOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.45, 0.55], [0.8, 1])

  // Finally the bottom text
  const bottomTextOpacity = useTransform(smoothScrollYProgress, [0.55, 0.65], [0, 1])
  const bottomTextY = useTransform(smoothScrollYProgress, [0.55, 0.65], [initialY, finalY])

  return (
    <section ref={ref} className="relative w-full h-[200vh] bg-black text-white snap-start">
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          className="h-screen w-full flex flex-col md:flex-row justify-center items-center px-4 md:px-8 pt-[300px] bg-black"
          style={{ opacity: sectionOpacity }}
        >
          <div className="flex justify-center items-center flex-col max-w-2xl">
            <div className="text-center mb-2">
              <motion.div
                className="text-center"
                style={{
                  opacity: topText1Opacity,
                  x: topText1X, // Horizontal movement from right
                  y: topText1Y, // Vertical movement from bottom
                }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Each Phase Lasts</h2>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
                  <span className="text-yellow-500 drop-shadow-lg text-7xl">17 </span>
                  days
                </h2>
                <p className="text-white text-xl sm:text-2xl md:text-3xl">
                  A <span className="text-yellow-500 drop-shadow-lg mt-4">cycle</span> within a{" "}
                  <span className="text-yellow-500 drop-shadow-lg">cycle</span>
                </p>
              </motion.div>

              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mt-8"
                style={{
                  opacity: topText2Opacity,
                  y: topText2Y,
                }}
              >
                <span className="text-white">Infinity in Motion</span>
              </motion.h2>
            </div>
            <motion.div
              className="transform scale-50 md:scale-60 my-0"
              style={{
                opacity: loopOpacity,
                scale: loopScale,
              }}
            >
              <InfinityLoop />
            </motion.div>
            <motion.div
              className="absolute bottom-20 md:bottom-24 lg:bottom-32"
              style={{
                opacity: bottomTextOpacity,
                y: bottomTextY,
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                <span className="text-yellow-500">Infinity in Motion.</span>
              </h2>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

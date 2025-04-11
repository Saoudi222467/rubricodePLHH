"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import InfinityLoop from "@/components/InfinityLoop"

export default function MintLanding() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Adjust opacity transition to be more gradual and overlap with next section
  // Start at full opacity (1) and maintain it longer before fading out
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0])

  const initialY = 50
  const finalY = 0

  // First, the infinity loop appears
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.2], [0.8, 1])

  // At the end of the section, rotate and move the loop to prepare for next section
  const loopRotate = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, 90]) // Rotate 90 degrees
  const loopX = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, -300]) // Move left
  const loopY = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, 0]) // Keep vertical position

  // Then the top texts
  const topText1Opacity = useTransform(smoothScrollYProgress, [0.25, 0.35], [0, 1])
  const topText1Y = useTransform(smoothScrollYProgress, [0.25, 0.35], [initialY, finalY])

  const topText2Opacity = useTransform(smoothScrollYProgress, [0.35, 0.45], [0, 1])
  const topText2Y = useTransform(smoothScrollYProgress, [0.35, 0.45], [initialY, finalY])

  // Then the left text
  const leftTextOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [0, 1])
  const leftTextY = useTransform(smoothScrollYProgress, [0.45, 0.55], [initialY, finalY])

  // Then the right text
  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.55, 0.65], [0, 1])
  const rightTextY = useTransform(smoothScrollYProgress, [0.55, 0.65], [initialY, finalY])

  // Finally the bottom text
  const bottomTextOpacity = useTransform(smoothScrollYProgress, [0.65, 0.75], [0, 1])
  const bottomTextY = useTransform(smoothScrollYProgress, [0.65, 0.75], [initialY, finalY])

  return (
    <section ref={ref} className="relative w-full h-[200vh] bg-black text-white snap-start">
      {/* Fixed Container */}
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="h-screen w-full flex flex-col md:flex-row justify-center items-center px-4 md:px-8 pt-[150px] bg-black"
        >
          {/* Left Text */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-nowrap mb-6 md:mb-0 md:mr-8"
            style={{
              opacity: leftTextOpacity,
              y: leftTextY,
            }}
          >
            Rooted in <span style={{ color: "#D48A61" }}>Numerology</span>
          </motion.h2>

          <div className="flex justify-center items-center flex-col max-w-2xl">
            {/* Top Texts */}
            <div className="text-center mb-2">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold"
                style={{
                  opacity: topText1Opacity,
                  y: topText1Y,
                }}
              >
                This is not just a <span className="text-yellow-500">Minting Model</span>.
              </motion.h2>
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2"
                style={{
                  opacity: topText2Opacity,
                  y: topText2Y,
                }}
              >
                This is an <span className="text-yellow-500 drop-shadow-lg">energetic</span>{" "}
                <span className="text-white">sequence.</span>
              </motion.h2>
            </div>

            {/* Infinity Loop with rotation and movement */}
            <motion.div
              className="transform scale-50 md:scale-60 my-0"
              style={{
                opacity: loopOpacity,
                scale: loopScale,
                rotate: loopRotate, // Add rotation
                x: loopX, // Add horizontal movement
                y: loopY, // Add vertical movement
              }}
            >
              <InfinityLoop />
            </motion.div>

            {/* Bottom Text */}
            <motion.div
              className="absolute bottom-20 md:bottom-24 lg:bottom-32"
              style={{
                opacity: bottomTextOpacity,
                y: bottomTextY,
              }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                Aligned with the <span className="text-yellow-500">infinity</span>
              </h2>
            </motion.div>
          </div>

          {/* Right Text */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-nowrap mt-6 md:mt-0 md:ml-8"
            style={{
              opacity: rightTextOpacity,
              y: rightTextY,
            }}
          >
            Guided by <span style={{ color: "#892D06" }}>harmony</span>
          </motion.h2>
        </motion.div>
      </div>
    </section>
  )
}

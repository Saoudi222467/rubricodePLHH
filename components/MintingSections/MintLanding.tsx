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

  // Smooth out the scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Define scroll-based animations for text elements
  // Each text appears at different scroll positions
  const initialY = 50
  const finalY = 0

  // Left text animation (appears first)
  const leftTextOpacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1])
  const leftTextY = useTransform(smoothScrollYProgress, [0.1, 0.2], [initialY, finalY])

  // Top text animations (appear second and third)
  const topText1Opacity = useTransform(smoothScrollYProgress, [0.25, 0.35], [0, 1])
  const topText1Y = useTransform(smoothScrollYProgress, [0.25, 0.35], [initialY, finalY])

  const topText2Opacity = useTransform(smoothScrollYProgress, [0.35, 0.45], [0, 1])
  const topText2Y = useTransform(smoothScrollYProgress, [0.35, 0.45], [initialY, finalY])

  // Infinity loop animation (appears fourth)
  const loopOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.45, 0.55], [0.8, 1])

  // Bottom text animation (appears fifth)
  const bottomTextOpacity = useTransform(smoothScrollYProgress, [0.55, 0.65], [0, 1])
  const bottomTextY = useTransform(smoothScrollYProgress, [0.55, 0.65], [initialY, finalY])

  // Right text animation (appears last)
  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.65, 0.75], [0, 1])
  const rightTextY = useTransform(smoothScrollYProgress, [0.65, 0.75], [initialY, finalY])

  return (
    <section ref={ref} className="bg-black text-white h-[200vh]">
      {/* Fixed the header overlap by adjusting top value to account for header height */}
      <div className="h-screen fixed top-[80px] w-full flex flex-col md:flex-row justify-center items-center px-4 md:px-8">
        {/* Left Text - Appears as you scroll */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-nowrap mb-6 md:mb-0 md:mr-8"
          style={{
            opacity: leftTextOpacity,
            y: leftTextY,
          }}
        >
          Rooted in <span style={{ color: "#D48A61" }}>Numerology</span>
        </motion.h2>

        <div className="flex justify-center items-center flex-col">
          {/* Top Text - Appears as you scroll */}
          <div className="text-center mb-6">
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{
                opacity: topText1Opacity,
                y: topText1Y,
              }}
            >
              This is not just a <span className="text-yellow-500">Minting Model</span>.
            </motion.h2>
            <br />
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{
                opacity: topText2Opacity,
                y: topText2Y,
              }}
            >
              This is an <span className="text-yellow-500 drop-shadow-lg">energetic</span>{" "}
              <span className="text-white">sequence.</span>
            </motion.h2>
          </div>

          {/* Infinity Loop - Appears as you scroll */}
          <motion.div
            className="p-6 md:p-10"
            style={{
              opacity: loopOpacity,
              scale: loopScale,
            }}
          >
            <InfinityLoop />
          </motion.div>

          {/* Bottom Text - Appears as you scroll */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
            style={{
              opacity: bottomTextOpacity,
              y: bottomTextY,
            }}
          >
            Aligned with the <span className="text-yellow-500">infinity</span>
          </motion.h2>
        </div>

        {/* Right Text - Appears as you scroll */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-nowrap mt-6 md:mt-0 md:ml-8"
          style={{
            opacity: rightTextOpacity,
            y: rightTextY,
          }}
        >
          Guided by <span style={{ color: "#892D06" }}>harmony</span>
        </motion.h2>
      </div>
    </section>
  )
}

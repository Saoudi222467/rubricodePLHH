"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import InfinityLoop from "@/components/InfinityLoop"

export default function MintLanding({ isMobile }: { isMobile: boolean }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const initialY = 50
  const finalY = 0

  // Always call hooks
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.85, 0.95], [1, 1, 0])
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [1, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.2], [1, 1])
  const loopRotate = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, 90])
  const loopX = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, -300])
  const loopY = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, 0])

  const topText1Opacity = useTransform(smoothScrollYProgress, [0.25, 0.35], [1, 1])
  const topText1Y = useTransform(smoothScrollYProgress, [0.25, 0.35], [initialY, finalY])

  const topText2Opacity = useTransform(smoothScrollYProgress, [0.35, 0.45], [1, 1])
  const topText2Y = useTransform(smoothScrollYProgress, [0.35, 0.45], [initialY, finalY])

  const leftTextOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [1, 1])
  const leftTextY = useTransform(smoothScrollYProgress, [0.45, 0.55], [initialY, finalY])

  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.55, 0.65], [1, 1])
  const rightTextY = useTransform(smoothScrollYProgress, [0.55, 0.65], [initialY, finalY])

  const bottomTextOpacity = useTransform(smoothScrollYProgress, [0.65, 0.75], [1, 1])
  const bottomTextY = useTransform(smoothScrollYProgress, [0.65, 0.75], [initialY, finalY])

  // Helpers to provide fallback values on mobile
  const animated = (val: any, fallback: any) => (isMobile ? fallback : val)

  return (
    <section
      ref={ref}
      className={`w-full ${
        isMobile ? "py-24" : "h-[200vh] snap-start relative"
      } bg-black text-white no-scrollbar`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden pt-[80px]"} w-full h-full`}> 
        <motion.div
          style={{ opacity: animated(sectionOpacity, 1) }}
          className="w-full h-full max-w-screen-xl mx-auto grid grid-rows-3 grid-cols-3 gap-x-16 md:gap-x-32 lg:gap-x-48 relative"
        >
          {/* Top Centered Text */}
          <div className="row-start-1 row-end-2 col-start-1 col-end-4 flex flex-col items-center justify-center">
            <motion.h2
              className="text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl font-bold font-[Montserrat]"
              style={{
                opacity: animated(topText1Opacity, 1),
                y: animated(topText1Y, 0),
              }}
            >
              This is not just a <span className="text-yellow-500">Minting Model</span>.
            </motion.h2>
            <motion.h2
              className="text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl font-bold mt-2 font-[Montserrat]"
              style={{
                opacity: animated(topText2Opacity, 1),
                y: animated(topText2Y, 0),
              }}
            >
              This is an <span className="text-yellow-500 drop-shadow-lg">energetic</span>{" "}
              <span className="text-white">sequence.</span>
            </motion.h2>
          </div>

          {/* Left Centered Text */}
          <motion.div
            className="row-start-2 row-end-3 col-start-1 col-end-2 flex items-center justify-center h-full text-left"
            style={{
              opacity: animated(leftTextOpacity, 1),
              y: animated(leftTextY, 0),
            }}
          >
            <div>
              <div className="text-base md:text-lg lg:text-xl font-[Montserrat] text-white">
                Rooted in
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-[Montserrat] text-[#D48A61] leading-tight">
                Numerology
              </div>
            </div>
          </motion.div>

          {/* Center Infinity Loop */}
          <motion.div
            className="row-start-2 row-end-3 col-start-2 col-end-3 flex flex-col items-center justify-center z-20 p-8 sm:p-12 md:p-16 lg:p-20 px-10"
            style={{
              opacity: animated(loopOpacity, 1),
              scale: animated(loopScale, 1),
              rotate: animated(loopRotate, 0),
              x: animated(loopX, 0),
              y: animated(loopY, 0),
            }}
          >
            <InfinityLoop />
          </motion.div>

          {/* Right Centered Text */}
          <motion.div
            className="row-start-2 row-end-3 col-start-3 col-end-4 flex items-center justify-center h-full text-right"
            style={{
              opacity: animated(rightTextOpacity, 1),
              y: animated(rightTextY, 0),
            }}
          >
            <div>
              <div className="text-base md:text-lg lg:text-xl font-[Montserrat] text-white">
                Guided by
              </div>
              <div className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold font-[Montserrat] text-[#892D06] leading-tight">
                harmony
              </div>
            </div>
          </motion.div>

          {/* Bottom Centered Text */}
          <motion.div
            className="row-start-3 row-end-4 col-start-1 col-end-4 flex items-center justify-center z-10 px-2"
            style={{
              opacity: animated(bottomTextOpacity, 1),
              y: animated(bottomTextY, 0),
            }}
          >
            <h2 className="text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl font-bold text-center font-[Montserrat]">
              Aligned with the <span className="text-yellow-500">infinity</span>
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

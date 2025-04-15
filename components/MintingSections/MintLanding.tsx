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
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0])
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.2], [0.8, 1])
  const loopRotate = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, 90])
  const loopX = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, -300])
  const loopY = useTransform(smoothScrollYProgress, [0.8, 0.95], [0, 0])

  const topText1Opacity = useTransform(smoothScrollYProgress, [0.25, 0.35], [0, 1])
  const topText1Y = useTransform(smoothScrollYProgress, [0.25, 0.35], [initialY, finalY])

  const topText2Opacity = useTransform(smoothScrollYProgress, [0.35, 0.45], [0, 1])
  const topText2Y = useTransform(smoothScrollYProgress, [0.35, 0.45], [initialY, finalY])

  const leftTextOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [0, 1])
  const leftTextY = useTransform(smoothScrollYProgress, [0.45, 0.55], [initialY, finalY])

  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.55, 0.65], [0, 1])
  const rightTextY = useTransform(smoothScrollYProgress, [0.55, 0.65], [initialY, finalY])

  const bottomTextOpacity = useTransform(smoothScrollYProgress, [0.65, 0.75], [0, 1])
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
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden pt-[80px]"}`}>
        <motion.div
          style={{ opacity: animated(sectionOpacity, 1) }}
          className={`${
            isMobile ? "relative pt-[80px]" : "h-screen"
          } w-full flex flex-col lg:flex-row justify-center items-center px-4 sm:px-6 md:px-10 lg:pt-[150px] bg-black text-center lg:text-left max-w-screen-xl mx-auto`}
        >
          {/* Left Text */}
          <motion.h2
            className="text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl font-bold font-[Montserrat] mb-4 lg:mb-0 lg:mr-8 max-w-xs sm:max-w-md break-words"
            style={{
              opacity: animated(leftTextOpacity, 1),
              y: animated(leftTextY, 0),
            }}
          >
            Rooted in <span className="text-[#D48A61]">Numerology</span>
          </motion.h2>

          {/* Center Block */}
          <div className="flex justify-center items-center flex-col max-w-2xl w-full px-4 sm:px-0">
            {/* Top Texts */}
            <div className="text-center mb-4">
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

            {/* Infinity Loop */}
            <motion.div
              className="transform scale-75 sm:scale-90 md:scale-100 my-2 sm:my-4"
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

            {/* Bottom Text */}
            <motion.div
              className={`${
                isMobile
                  ? "relative mt-8"
                  : "absolute bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-32"
              } px-2`}
              style={{
                opacity: animated(bottomTextOpacity, 1),
                y: animated(bottomTextY, 0),
              }}
            >
              <h2 className="text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl font-bold text-center font-[Montserrat]">
                Aligned with the <span className="text-yellow-500">infinity</span>
              </h2>
            </motion.div>
          </div>

          {/* Right Text */}
          <motion.h2
            className="text-base sm:text-lg md:text-lg lg:text-2xl xl:text-3xl font-bold font-[Montserrat] mt-4 lg:mt-0 lg:ml-8 max-w-xs sm:max-w-md break-words"
            style={{
              opacity: animated(rightTextOpacity, 1),
              y: animated(rightTextY, 0),
            }}
          >
            Guided by <span className="text-[#892D06]">harmony</span>
          </motion.h2>
        </motion.div>
      </div>
    </section>
  )
}

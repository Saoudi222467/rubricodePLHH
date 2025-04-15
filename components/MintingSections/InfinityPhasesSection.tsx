"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import InfinityLoopVertical from "@/components/InfinityLoopVertical"

export default function InfinityPhasesSection({ isMobile }: { isMobile: boolean }) {
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
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.3], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.3], [0.8, 1])

  const phasesTextOpacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1])
  const phasesTextY = useTransform(smoothScrollYProgress, [0.3, 0.4], [initialY, finalY])

  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.9, 1], [0, 1, 1, 0])
  const rightTextY = useTransform(smoothScrollYProgress, [0.4, 0.5], [initialY, finalY])
  const rightTextX = useTransform(smoothScrollYProgress, [0.85, 1], [0, -300])
  const rightTextYEnd = useTransform(smoothScrollYProgress, [0.85, 1], [0, -200])

  const animated = (val: any, fallback: any) => (isMobile ? fallback : val)

  const [loopScaleValue, setLoopScaleValue] = useState(0.6)
  const [textSize, setTextSize] = useState({
    heading: "text-6xl",
    subHeading: "text-4xl",
    number: "text-7xl",
    body: "text-xl",
    rowGap: "gap-10",
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 1024) {
        setLoopScaleValue(0.5)
        setTextSize({
          heading: "text-3xl",
          subHeading: "text-xl",
          number: "text-5xl",
          body: "text-sm",
          rowGap: "gap-4",
        })
      } else {
        setLoopScaleValue(0.6)
        setTextSize({
          heading: "text-6xl",
          subHeading: "text-4xl",
          number: "text-8xl",
          body: "text-xl",
          rowGap: "gap-10",
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section
      ref={ref}
      className={`w-full ${
        isMobile ? "py-24" : "h-[200vh] snap-start relative"
      } bg-black text-white font-[Montserrat] overflow-hidden`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden"}`}>
        <motion.div
          className={`${
            isMobile ? "relative pt-20" : "h-screen"
          } w-full flex justify-center items-center px-4 md:px-8 bg-black`}
          style={{ opacity: animated(sectionOpacity, 1) }}
        >
          <div
            className={`w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center ${textSize.rowGap} text-center lg:text-left`}
          >
            {/* PHASES + LOOP */}
            <div
              className={`flex flex-col items-center lg:items-start lg:flex-row ${textSize.rowGap}`}
            >
              <motion.h2
                className={`${textSize.heading} font-bold text-[#A67C00]`}
                style={{
                  opacity: animated(phasesTextOpacity, 1),
                  y: animated(phasesTextY, 0),
                }}
              >
                Phases
              </motion.h2>

              <motion.div
                style={{
                  opacity: animated(loopOpacity, 1),
                  scale: animated(loopScale, 1),
                }}
              >
                <InfinityLoopVertical scale={loopScaleValue} />
              </motion.div>
            </div>

            {/* RIGHT TEXT */}
            <motion.div
              className="font-bold text-center lg:text-right px-2 sm:px-4 md:px-6"
              style={{
                opacity: animated(rightTextOpacity, 1),
                y: animated(rightTextY, 0),
                x: animated(rightTextX, 0),
                translateY: animated(rightTextYEnd, 0),
              }}
            >
              <p className={`${textSize.subHeading} mb-2`}>Each Phase Lasts</p>
              <p className={`${textSize.subHeading}`}>
                <span className={`text-[#A67C00] ${textSize.number} my-4 inline-block`}>
                  17
                </span>{" "}
                days
              </p>
              <div className="mt-4">
                <p className={textSize.body}>
                  A <span className="text-[#A67C00]">cycle</span> within a{" "}
                  <span className="text-[#A67C00]">cycle</span>
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import InfinityLoopVertical from "@/components/InfinityLoopVertical"

export default function InfinityPhasesSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0])
  const initialY = 50
  const finalY = 0

  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.3], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.3], [0.8, 1])

  const phasesTextOpacity = useTransform(smoothScrollYProgress, [0.3, 0.4], [0, 1])
  const phasesTextY = useTransform(smoothScrollYProgress, [0.3, 0.4], [initialY, finalY])

  const rightTextOpacity = useTransform(smoothScrollYProgress, [0.4, 0.5, 0.9, 1], [0, 1, 1, 0])
  const rightTextY = useTransform(smoothScrollYProgress, [0.4, 0.5], [initialY, finalY])
  const rightTextX = useTransform(smoothScrollYProgress, [0.85, 1], [0, -300])
  const rightTextYEnd = useTransform(smoothScrollYProgress, [0.85, 1], [0, -200])

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
      if (width < 640) {
        setLoopScaleValue(0.5)
        setTextSize({
          heading: "text-3xl",
          subHeading: "text-xl",
          number: "text-5xl",
          body: "text-sm",
          rowGap: "gap-4",
        })
      } else if (width < 768) {
        setLoopScaleValue(0.5)
        setTextSize({
          heading: "text-3xl",
          subHeading: "text-xl",
          number: "text-5xl",
          body: "text-sm",
          rowGap: "gap-4",
        })
      } else if (width < 1024) {
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
      className="relative w-full h-[200vh] bg-black text-white snap-start font-[Montserrat] overflow-hidden "
    >
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          className="h-screen w-full flex justify-center items-center px-4 md:px-8 pt-[120px] bg-black"
          style={{ opacity: sectionOpacity }}
        >
          <div
            className={`w-full max-w-7xl flex flex-col lg:flex-row justify-center items-center ${textSize.rowGap} text-center lg:text-left`}
          >
            {/* PHASES + INFINITY LOOP GROUP */}
            <div className={`flex flex-col items-center lg:items-start lg:flex-row ${textSize.rowGap}`}>
              {/* Phases Text */}
              <motion.h2
                className={`${textSize.heading} font-bold text-[#A67C00]`}
                style={{
                  opacity: phasesTextOpacity,
                  y: phasesTextY,
                }}
              >
                Phases
              </motion.h2>

              {/* Infinity Loop (scaled dynamically) */}
              <motion.div style={{ opacity: loopOpacity, scale: loopScale }}>
                <InfinityLoopVertical scale={loopScaleValue} />
              </motion.div>
            </div>

            {/* Right Side Text */}
            <motion.div
              className="font-bold text-center lg:text-right px-2 sm:px-4 md:px-6"
              style={{
                opacity: rightTextOpacity,
                y: rightTextY,
                x: rightTextX,
                translateY: rightTextYEnd,
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

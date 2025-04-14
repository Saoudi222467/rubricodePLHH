"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import InfinityLoop from "../InfinityLoop"

export default function PhasePrices() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const contentOpacity = useTransform(smoothScrollYProgress, [0, 0.05, 0.85, 0.95], [0, 1, 1, 0])
  const loopOpacity = useTransform(smoothScrollYProgress, [0.45, 0.55], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [0.45, 0.55], [0.8, 1])

  const textAnimStart = 0.55
  const step = 0.04
  const initialY = 50
  const finalY = 0

  const generateRowAnim = (i: number) => {
    const start = textAnimStart + step * i
    const end = start + step
    return {
      opacity: useTransform(smoothScrollYProgress, [start, end], [0, 1]),
      y: useTransform(smoothScrollYProgress, [start, end], [initialY, finalY]),
    }
  }

  const headerAnim = generateRowAnim(0)
  const rowAnims = Array.from({ length: 8 }, (_, i) => generateRowAnim(i + 1))

  return (
    <section ref={ref} className="relative w-full h-[200vh] bg-black font-montserrat snap-start">
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative h-full w-full flex flex-col items-center justify-center pt-[150px] bg-black px-4"
        >
          <motion.table className="table-auto border-separate border-spacing-x-4 border-spacing-y-2 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold w-full max-w-6xl">
            <thead>
              <motion.tr style={{ opacity: headerAnim.opacity, y: headerAnim.y }}>
                <th className="text-yellow-500 px-2 sm:px-3 md:px-4 py-1 sm:py-2">Phase</th>
                <th className="text-yellow-500 px-2 sm:px-3 md:px-4 py-1 sm:py-2">Price</th>
                <th className="text-yellow-500 px-2 sm:px-3 md:px-4 py-1 sm:py-2">Discount</th>
                <th className="text-yellow-500 px-2 sm:px-3 md:px-4 py-1 sm:py-2">Tokens</th>
              </motion.tr>
            </thead>
            <tbody>
              {[
                { phase: 1, price: "0.08", discount: "80%", tokens: "11,111,100" },
                { phase: 2, price: "0.12", discount: "70%", tokens: "22,222,220" },
                { phase: 3, price: "0.16", discount: "60%", tokens: "25,000,000" },
                { phase: 4, price: "0.20", discount: "50%", tokens: "33,333,333" },
                { phase: 5, price: "0.24", discount: "40%", tokens: "35,555,555" },
                { phase: 6, price: "0.28", discount: "30%", tokens: "44,444,444" },
                { phase: 7, price: "0.32", discount: "20%", tokens: "45,678,901" },
                { phase: 8, price: "0.36", discount: "10%", tokens: "46,654,434" },
              ].map((row, i) => (
                <motion.tr key={i} style={{ opacity: rowAnims[i].opacity, y: rowAnims[i].y }}>
                  <td className="text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-center">{row.phase}</td>
                  <td className="text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-center">{row.price}</td>
                  <td className="text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-center">{row.discount}</td>
                  <td className="text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 text-center">{row.tokens}</td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>

          {/* Animated Loop Below Table */}
          <motion.div
            className="mt-8 transform scale-50 md:scale-60 absolute"
            style={{ opacity: loopOpacity, scale: loopScale }}
          >
            <InfinityLoop />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

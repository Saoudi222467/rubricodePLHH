"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import InfinityLoop from "../InfinityLoop"

export default function MintingSection() {
  const ref = useRef(null)

  // Track scroll progress for the section
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  // Smooth out scroll progress
  const smoothScrollYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Fade in the section but don't fade out since it's the last section
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.1], [0, 1])

  // Sequential animation timing
  const sequenceStart = 0.1
  const sequenceStep = 0.15

  // First, the infinity loop appears
  const loopOpacity = useTransform(smoothScrollYProgress, [sequenceStart, sequenceStart + 0.1], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [sequenceStart, sequenceStart + 0.1], [0.7, 1])

  // Then the headings
  const headingStart = sequenceStart + sequenceStep
  const headingOpacity = useTransform(smoothScrollYProgress, [headingStart, headingStart + 0.1], [0, 1])
  const headingY = useTransform(smoothScrollYProgress, [headingStart, headingStart + 0.1], [50, 0])

  // Then the payment options
  const paymentStart = headingStart + sequenceStep
  const paymentOpacity = useTransform(smoothScrollYProgress, [paymentStart, paymentStart + 0.1], [0, 1])
  const paymentY = useTransform(smoothScrollYProgress, [paymentStart, paymentStart + 0.1], [50, 0])

  // Then the amount input
  const amountStart = paymentStart + sequenceStep
  const amountOpacity = useTransform(smoothScrollYProgress, [amountStart, amountStart + 0.1], [0, 1])
  const amountY = useTransform(smoothScrollYProgress, [amountStart, amountStart + 0.1], [50, 0])

  // Finally the bottom section
  const bottomStart = amountStart + sequenceStep
  const bottomOpacity = useTransform(smoothScrollYProgress, [bottomStart, bottomStart + 0.1], [0, 1])
  const bottomY = useTransform(smoothScrollYProgress, [bottomStart, bottomStart + 0.1], [50, 0])

  return (
    <section ref={ref} className="relative w-full h-[200vh] bg-black text-white snap-start">
      <div className="fixed inset-0 overflow-hidden">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="h-screen w-full flex items-center justify-center pt-[180px]" // Increased top padding
        >
          <div className="max-w-lg w-full px-4 py-8 flex flex-col items-center space-y-6 relative">
            {/* Infinity loop positioned at the top */}
            <motion.div
              className="flex justify-center absolute top-[-200px]" // Moved up a bit
              style={{
                opacity: loopOpacity,
                scale: loopScale,
              }}
            >
              <InfinityLoop />
            </motion.div>

            {/* Headings */}
            <motion.div
              className="text-center"
              style={{
                opacity: headingOpacity,
                y: headingY,
              }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-12">Purchase PLHH</h1>
              <h2 className="text-lg md:text-xl text-yellow-500 tracking-wider">PLHH PRESALE</h2>
            </motion.div>

            {/* Payment Method Options */}
            <motion.div
              className="w-full border border-gray-700 p-4 rounded-lg"
              style={{
                opacity: paymentOpacity,
                y: paymentY,
              }}
            >
              <p className="text-xl md:text-2xl font-semibold mb-3">Select Payment Method</p>
              <div className="flex items-center space-x-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2 rounded-lg">
                  Cryptocurrency
                </button>
                <button className="border border-yellow-500 text-yellow-500 font-bold px-4 py-2 rounded-lg hover:bg-yellow-600/20">
                  Fiat Currency
                </button>
              </div>
            </motion.div>

            {/* PLHH Amount Input */}
            <motion.div
              className="w-full border border-gray-700 p-4 rounded-lg"
              style={{
                opacity: amountOpacity,
                y: amountY,
              }}
            >
              <p className="text-xl md:text-2xl font-semibold mb-3">Amount of PLHH</p>
              <input
                type="number"
                placeholder="Enter PLHH amount"
                className="w-full bg-black border border-gray-600 rounded-md p-3 focus:outline-none"
              />
            </motion.div>

            {/* Bottom Section: Rate & Wallet Connect */}
            <motion.div
              className="w-full flex items-center justify-between border border-gray-700 p-4 rounded-lg"
              style={{
                opacity: bottomOpacity,
                y: bottomY,
              }}
            >
              <p className="text-sm md:text-base text-gray-300">
                1 PLHH = <span className="text-white">$0.006</span>
              </p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg">
                Connect Wallet
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

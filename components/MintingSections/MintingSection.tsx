"use client"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, useState } from "react"
import InfinityLoop from "../InfinityLoop"
import PurchaseTokensButton from "@/components/PurchaseTokenButtons"
// Import Tabs components from code 2 – they will be restyled to match code1.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const presalePhases = [
  { id: "phase1", name: "Phase 1", price: 0.08, discount: "80%", status: "active" },
  { id: "phase2", name: "Phase 2", price: 0.12, discount: "70%", status: "upcoming" },
  { id: "phase3", name: "Phase 3", price: 0.16, discount: "60%", status: "upcoming" },
  { id: "phase4", name: "Phase 4", price: 0.2, discount: "50%", status: "upcoming" },
  { id: "phase5", name: "Phase 5", price: 0.24, discount: "40%", status: "upcoming" },
  { id: "phase6", name: "Phase 6", price: 0.28, discount: "30%", status: "upcoming" },
  { id: "phase7", name: "Phase 7", price: 0.32, discount: "20%", status: "upcoming" },
  { id: "phase8", name: "Phase 8", price: 0.36, discount: "10%", status: "upcoming" },
];

const phaseProgress = {
  phase1: { sold: 0, supply: 11111111 },
  phase2: { sold: 0, supply: 22222222 },
  phase3: { sold: 0, supply: 25000000 },
  phase4: { sold: 0, supply: 33333333 },
  phase5: { sold: 0, supply: 35555555 },
  phase6: { sold: 0, supply: 44444444 },
  phase7: { sold: 0, supply: 45678901 },
  phase8: { sold: 0, supply: 46654434 },
};

export default function MintingSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef(null)
  const [selectedPhase, setSelectedPhase] = useState(presalePhases[0]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })

  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  // Helper to conditionally use animation values on non-mobile devices
  const animated = (val: any, fallback: any) => (isMobile ? fallback : val)

  // Define motion values for the various sections
  const sectionOpacity = useTransform(smoothScrollYProgress, [0, 0.05], [0, 1])
  const sequenceStart = 0.1
  const sequenceStep = 0.15

  const loopOpacity = useTransform(smoothScrollYProgress, [sequenceStart, sequenceStart + 0.1], [0, 1])
  const loopScale = useTransform(smoothScrollYProgress, [sequenceStart, sequenceStart + 0.1], [0.7, 1])

  const headingStart = sequenceStart + sequenceStep
  const headingOpacity = useTransform(smoothScrollYProgress, [headingStart, headingStart + 0.1], [0, 1])
  const headingY = useTransform(smoothScrollYProgress, [headingStart, headingStart + 0.1], [50, 0])

  const amountStart = headingStart + sequenceStep * 2
  const amountOpacity = useTransform(smoothScrollYProgress, [amountStart, amountStart + 0.1], [0, 1])
  const amountY = useTransform(smoothScrollYProgress, [amountStart, amountStart + 0.1], [50, 0])

  const bottomStart = amountStart + sequenceStep
  const bottomOpacity = useTransform(smoothScrollYProgress, [bottomStart, bottomStart + 0.1], [0, 1])
  const bottomY = useTransform(smoothScrollYProgress, [bottomStart, bottomStart + 0.1], [50, 0])

  // State and calculation functions for token purchasing
  const [amount, setAmount] = useState("")
  const calculateTotal = () => amount ? Number(amount) * selectedPhase.price : 0
  const calculateBonus = () => {
    if (!amount) return 0
    const discountPercentage = Number.parseInt(selectedPhase.discount.replace("%", ""))
    return (Number(amount) * discountPercentage) / 100
  }

  // Define a common tab trigger class string for consistent styling
  const tabTriggerClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium bg-black text-yellow-500 " +
    "ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
    "focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 " +
    "data-[state=active]:bg-yellow-500 data-[state=active]:text-black data-[state=active]:shadow-sm"

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "py-24 overflow-x-hidden" : "h-[200vh] snap-start relative"} bg-black text-white`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden"}`}>
        <motion.div
          style={{ opacity: animated(sectionOpacity, 1) }}
          className={`${isMobile ? "relative pt-[100px] overflow-x-hidden" : "h-screen"} w-full flex items-center justify-center bg-black`}
        >
          <div className={`max-w-lg w-full px-4 py-8 flex flex-col items-center space-y-6 relative ${isMobile ? "overflow-x-hidden" : ""}`}>
            {/* Infinity Loop background and heading */}
            {isMobile ? (
              <div className="relative w-full flex justify-center items-center">
                <div className="absolute z-0 scale-75 opacity-70">
                  <InfinityLoop />
                </div>
                <motion.div className="text-center z-10" style={{ opacity: 1, y: 0 }}>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-12">Purchase PLHH</h1>
                  <h2 className="text-lg md:text-xl text-yellow-500 tracking-wider">PLHH PRESALE</h2>
                </motion.div>
              </div>
            ) : (
              <>
                <motion.div className="flex justify-center absolute top-[-200px] z-0" style={{ opacity: loopOpacity, scale: loopScale }}>
                  <InfinityLoop />
                </motion.div>
                <motion.div className="text-center z-10" style={{ opacity: headingOpacity, y: headingY }}>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 mt-12">Purchase PLHH</h1>
                  <h2 className="text-lg md:text-xl text-yellow-500 tracking-wider">PLHH PRESALE</h2>
                </motion.div>
              </>
            )}

            {/* Payment Method Tabs */}
            <motion.div className="w-full mt-4" style={{ opacity: animated(bottomOpacity, 1), y: animated(bottomY, 0) }}>
              <Tabs defaultValue="crypto" className="w-full">
                <TabsList className="flex w-full justify-evenly border border-gray-700 p-2 rounded-lg bg-black/70 backdrop-blur-md">
                  <TabsTrigger value="crypto" className={tabTriggerClasses}>
                    Cryptocurrency
                  </TabsTrigger>
                  <TabsTrigger value="fiat" className={tabTriggerClasses}>
                    Fiat Currency
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="crypto" className="mt-4">
                  {/* PLHH Amount Input */}
                  <motion.div
                    className="w-full border border-gray-700 p-4 rounded-lg bg-black/70 backdrop-blur-md"
                    style={{ opacity: animated(amountOpacity, 1), y: animated(amountY, 0) }}
                  >
                    <p className="text-xl md:text-2xl font-semibold mb-3">Amount of PLHH</p>
                    <input
                      type="number"
                      placeholder="Enter PLHH amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-black border border-gray-600 rounded-md p-3 focus:outline-none"
                    />
                  </motion.div>
                  {/* PurchaseTokensButton & Calculations */}
                  <motion.div
                    className="w-full flex flex-col items-center space-y-2 border border-gray-700 p-4 rounded-lg bg-black/70 backdrop-blur-md mt-4"
                    style={{ opacity: animated(bottomOpacity, 1), y: animated(bottomY, 0) }}
                  >
                    <PurchaseTokensButton
                      amount={amount}
                      setAmount={setAmount}
                      onPurchaseComplete={() => {}}
                    />
                  </motion.div>
                </TabsContent>
                <TabsContent value="fiat" className="mt-4">
                  <motion.div
                    className="w-full flex flex-col items-center space-y-4 border border-gray-700 p-4 rounded-lg bg-black/70 backdrop-blur-md"
                    style={{ opacity: animated(bottomOpacity, 1), y: animated(bottomY, 0) }}
                  >
                    <div className="rounded-lg w-full border border-gray-700 p-4 bg-black/70 backdrop-blur-md flex items-center justify-center">
                      <span className="text-xl md:text-2xl font-semibold text-white">
                        COMING SOON !!
                      </span>
                    </div>
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg">
                      Complete KYC
                    </button>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import InfinityLoop from "../InfinityLoop";
import PurchaseTokensButton from "@/components/PurchaseTokenButtons";
import { DollarSign } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function MintingSection({ isMobile }: { isMobile: boolean }) {
  const ref = useRef(null);
  const [amount, setAmount] = useState("");
  const [selectedPhase, setSelectedPhase] = useState(presalePhases[0]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const animated = (val: any, fallback: any) => (isMobile ? fallback : val);

  // Animations
  const sectionOpacity = useTransform(smoothScrollYProgress, [0.05, 0.95], [0, 1]);
  const loopOpacity = useTransform(smoothScrollYProgress, [0.1, 0.2], [0, 1]);
  const loopScale = useTransform(smoothScrollYProgress, [0.1, 0.2], [0.6, 1]);

  const tabTriggerClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-2 text-lg font-semibold " +
    "bg-transparent text-white transition-all ring-offset-background border-b-2 border-transparent " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "data-[state=active]:text-[#a67c00] data-[state=active]:border-[#a67c00] data-[state=active]:shadow-none";

  return (
    <section
      ref={ref}
      className={`w-full ${isMobile ? "py-24 overflow-x-hidden" : "h-[200vh] snap-start relative"} bg-black text-white`}
    >
      <div className={`${isMobile ? "" : "fixed inset-0 overflow-hidden"}`}>
        <motion.div
          style={{ opacity: animated(sectionOpacity, 1) }}
          className={`w-full flex justify-center bg-black ${isMobile ? "relative pt-[100px]" : "h-screen"}`}
        >
          <div className="max-w-lg w-full px-4 flex flex-col items-center text-center">
            {/* Animated Infinity Loop */}
            <motion.div
              className=" z-0"
              style={{
                opacity: animated(loopOpacity, 1),
                scale: animated(loopScale, 1),
              }}
            >
              <InfinityLoop />
            </motion.div>

            <div className="mt-[-200px] z-10">
              <h1 className="text-3xl md:text-4xl font-bold">Purchase PLHH</h1>
            </div>

            {/* Divider with Label */}
            <div className="flex items-center justify-center gap-4 w-full mt-2">
              <hr className="flex-grow border-t border-yellow-500" />
              <span className="text-lg md:text-xl text-yellow-500 tracking-wider whitespace-nowrap">PLHH PRESALE</span>
              <hr className="flex-grow border-t border-yellow-500" />
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="crypto" className="w-full mt-4">
              <TabsList className="flex w-full justify-evenly p-2 rounded-lg bg-black/70 backdrop-blur-md">
                <TabsTrigger value="crypto" className={tabTriggerClasses}>Cryptocurrency</TabsTrigger>
                <TabsTrigger value="fiat" className={tabTriggerClasses}>Fiat Currency</TabsTrigger>
              </TabsList>

              <TabsContent value="crypto" className="mt-4 space-y-4">
                <div className="w-full p-4 rounded-lg bg-black/70 backdrop-blur-md">
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="Amount of PLHH"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full text-lg px-4 py-3 bg-transparent text-white placeholder-[#a67c00]/50 focus:placeholder-[#a67c00] 
                               focus:outline-none border-0 border-b-2 border-b-[#a67c00]/30 focus:border-b-[#a67c00] 
                               transition-all duration-300 appearance-none 
                               [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>

                <div className="w-full p-4 rounded-lg bg-black/70 backdrop-blur-md flex flex-row items-center justify-between">
                  <p className="text-white text-lg md:text-xl font-semibold">
                    1 PLHH = <span className="text-[#a67c00]">$0.006</span>
                  </p>

                  <PurchaseTokensButton
                    amount={amount}
                    setAmount={setAmount}
                    onPurchaseComplete={() => {}}
                    label="Buy PLHH"
                    icon={<DollarSign className="h-5 w-5" />}
                  />
                </div>
              </TabsContent>

              <TabsContent value="fiat" className="mt-4">
                <div className="w-full flex flex-col items-center space-y-4  p-4 rounded-lg bg-black/70 backdrop-blur-md">
                  <div className="rounded-lg w-full p-4 bg-black/70 backdrop-blur-md flex items-center justify-center">
                    <span className="text-xl md:text-2xl font-semibold text-white">COMING SOON !!</span>
                  </div>
                  <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg">
                    Complete KYC
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

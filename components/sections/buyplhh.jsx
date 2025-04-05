"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Bitcoin, ArrowRight, Info, CheckCircle2 } from "lucide-react";

// Import the PurchaseTokensButton component which handles the token purchase transaction
import PurchaseTokensButton from "@/components/PurchaseTokenButtons";

const presalePhases = [
  {
    id: "phase1",
    name: "Phase 1",
    price: 0.08,
    discount: "80%",
    status: "active",
  },
  {
    id: "phase2",
    name: "Phase 2",
    price: 0.12,
    discount: "70%",
    status: "upcoming",
  },
  {
    id: "phase3",
    name: "Phase 3",
    price: 0.16,
    discount: "60%",
    status: "upcoming",
  },
  {
    id: "phase4",
    name: "Phase 4",
    price: 0.2,
    discount: "50%",
    status: "upcoming",
  },
  {
    id: "phase5",
    name: "Phase 5",
    price: 0.24,
    discount: "40%",
    status: "upcoming",
  },
  {
    id: "phase6",
    name: "Phase 6",
    price: 0.28,
    discount: "30%",
    status: "upcoming",
  },
  {
    id: "phase7",
    name: "Phase 7",
    price: 0.32,
    discount: "20%",
    status: "upcoming",
  },
  {
    id: "phase8",
    name: "Phase 8",
    price: 0.36,
    discount: "10%",
    status: "upcoming",
  },
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

export function BuyPLHHSection() {
  const [selectedPhase, setSelectedPhase] = useState(presalePhases[0]);
  const [amount, setAmount] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedTab, setSelectedTab] = useState("presale");

  // Calculate total cost for display
  const calculateTotal = () => {
    return amount ? Number(amount) * selectedPhase.price : 0;
  };

  // Bonus calculation if needed
  const calculateBonus = () => {
    if (!amount) return 0;
    const discountPercentage = Number.parseInt(
      selectedPhase.discount.replace("%", "")
    );
    return (Number(amount) * discountPercentage) / 100;
  };

  return (
    <section className="relative bg-mint-white">
      {/* Hero Section with Background */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-forest-green/80 to-aqua-blue/80 z-10" />
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(/mintonw.jpeg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <Container className="relative z-20 flex items-center justify-center min-h-screen px-6 md:px-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-lg w-full"
          >
            <Card className="border-2 border-[#a67c00] bg-mint-white/50 backdrop-blur-lg shadow-lg rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_10px_#F28E8E]">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl text-black">
                  Purchase PLHH
                </CardTitle>
                <CardDescription className="text-base text-gray-800">
                  Enter the amount and select a payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Tabs Section */}
                <Tabs defaultValue="crypto" className="w-full">
                  <TabsList className="flex w-full justify-between rounded-lg border-2 border-[#a67c00] bg-mint-white/60 p-1 transition-all duration-300">
                    <TabsTrigger
                      value="crypto"
                      className="flex-1 px-4 py-3 rounded-lg transition-all duration-300 text-black font-semibold text-center 
                      data-[state=active]:bg-[#F28E8E] data-[state=active]:text-forest-green data-[state=active]:border-b-2 data-[state=active]:border-forest-green
                      hover:bg-[#F28E8E]/20 hover:text-forest-green"
                    >
                      Cryptocurrency
                    </TabsTrigger>
                    <TabsTrigger
                      value="fiat"
                      className="flex-1 px-4 py-3 rounded-lg transition-all duration-300 text-black font-semibold text-center 
                      data-[state=active]:bg-[#F28E8E] data-[state=active]:text-forest-green data-[state=active]:border-b-2 data-[state=active]:border-forest-green
                      hover:bg-[#F28E8E]/20 hover:text-forest-green"
                    >
                      Fiat Currency
                    </TabsTrigger>
                  </TabsList>
                  <div className="mt-4">
                    <TabsContent
                      value="crypto"
                      className="transition-opacity duration-300 opacity-100 min-h-[180px]"
                    >
                      
                      <div className="space-y-6">
                        <PurchaseTokensButton
                          amount={amount}
                          setAmount={setAmount}
                          selectedPhase={selectedPhase}
                          onPurchaseComplete={() => setShowConfirmation(true)}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent
                      value="fiat"
                      className="transition-opacity duration-300 opacity-100 min-h-[180px]"
                    >
                      <div className="space-y-4">
                        <div className="rounded-lg border-2 border-[#a67c00] p-4 bg-mint-white/70 flex items-center gap-3 transition-all duration-300 hover:bg-[#F28E8E]/10">
                          <Info className="h-6 w-6 text-black" />
                          <span className="text-base text-gray-800">
                            COMING SOON !!
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-[#a67c00] text-black font-medium py-3 transition-all duration-300 hover:bg-[#F28E8E]/10"
                        >
                          Complete KYC
                        </Button>
                      </div>
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </Container>
      </div>

      {/* Presale Phases Section */}
      <section className="py-20 bg-mint-white relative">
  
  <Container className="relative z-10">
    <div className="mb-8 text-center">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-black text-forest-green"
      >
        Buy PLHH Tokens
      </motion.h2>
      <motion.p
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-base text-gray-800 text-black"
      >
        Join the revolution - Secure your PLHH tokens now
      </motion.p>
    </div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {presalePhases.map((phase) => (
        <Card
          key={phase.id}
          className={`border-2 border-[#a67c00] bg-mint-white/40 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_10px_#F28E8E] hover:border-[#d4af37]/80 ${
            selectedPhase.id === phase.id ? "border-[#d4af37] shadow-[0_0_12px_#F28E8E]" : ""
          }`}
          
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-lg font-bold text-black">
                {phase.name}
              </span>
              <span
                className={`rounded-full px-2 py-1 text-xs font-medium ${
                  phase.status === "active"
                    ? "bg-[#F28E8E]/20 text-[#F28E8E] text-black"
                    : "bg-gray-200 text-gray-700 text-forest-green"
                }`}
              >
                {phase.status === "active" ? "Active" : "Upcoming"}
              </span>
            </CardTitle>
            <CardDescription>
              <div className="mt-2 space-y-2 text-sm text-black">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>${phase.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>{phase.discount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Launch Price</span>
                  <span>$0.40</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Progress</span>
                    <span>
                      {((phaseProgress[phase.id].sold / phaseProgress[phase.id].supply) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={(phaseProgress[phase.id].sold / phaseProgress[phase.id].supply) * 100}
                    className="h-2 bg-[#F28E8E]/20"
                    indicatorClassName="bg-[#F28E8E]"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span>{phaseProgress[phase.id].sold.toLocaleString()} sold</span>
                    <span>{phaseProgress[phase.id].supply.toLocaleString()} total</span>
                  </div>
                </div>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full border-2 border-[#a67c00] text-forest-green font-medium py-3 transition-all duration-300 hover:bg-[#F28E8E]/10"
              onClick={() => setSelectedPhase(phase)}
              disabled={phase.status !== "active"}
            >
              Select Phase
            </Button>
          </CardContent>
        </Card>
      ))}
    </motion.div>

    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-8"
    >
      <Card className="border-2 border-[#a67c00] bg-mint-white/40 backdrop-blur-sm mb-8 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-black">
            Trading Options
          </CardTitle>
          <CardDescription className="text-base text-gray-800 text-forest-green">
            Trade PLHH tokens on our supported exchanges
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border-2 border-[#a67c00] p-4 transition-all duration-300">
            <h3 className="mb-2 font-semibold text-black">
              Integrated Exchanges
            </h3>
            <ul className="space-y-2 text-sm text-gray-800 text-forest-green">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#F28E8E] text-forest-green" />
                PancakeSwap
              </li>
              <li className="flex items-center gap-2 text-forest-green">
                <CheckCircle2 className="h-4 w-4 text-[#F28E8E] text-forest-green" />
                Uniswap
              </li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-[#a67c00] p-4 transition-all duration-300">
            <h3 className="mb-2 font-semibold text-black">
              Peer-to-Peer Trading
            </h3>
            <p className="text-sm text-gray-800 text-forest-green">
              Trade directly with other users on our secure P2P platform
            </p>
            <Button
              variant="outline"
              className="mt-4 w-full border-2 border-[#a67c00] text-black transition-all duration-300 hover:bg-[#F28E8E]/10"
            >
              View P2P Market
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  </Container>
</section>


      
    </section>
  );
}

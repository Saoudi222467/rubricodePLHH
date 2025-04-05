"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import { AlertTriangle, Clock } from "lucide-react"

const stakingTiers = [
  { years: 1, apy: 11 },
  { years: 2, apy: 22 },
  { years: 3, apy: 33 },
  { years: 4, apy: 44 },
  { years: 5, apy: 55 },
  { years: 6, apy: 66 },
  { years: 7, apy: 77 },
  { years: 8, apy: 88 },
]

// Nature elements for animation
const natureElements = [
  { type: "butterfly", colors: ["#F39C12", "#8E44AD", "#3498DB", "#E74C3C"] },
  { type: "leaf", colors: ["#D35400", "#F39C12", "#C0392B", "#E74C3C"] },
  { type: "flower", colors: ["#9B59B6", "#F1C40F", "#E74C3C", "#3498DB"] },
]

// Animation component for falling elements
const FallingElement = ({ elementType, color, index }) => {
  // Random position and animation properties
  const startPosition = Math.random() * 100;
  const duration = 7 + Math.random() * 15;
  const delay = Math.random() * 10;
  const size = 15 + Math.random() * 20;
  const rotate = Math.random() * 360;
  const swayAmount = 50 + Math.random() * 50;

  // SVG paths for different element types
  const getSvgPath = () => {
    switch (elementType) {
      case "butterfly":
        return (
          <g transform={`rotate(${rotate})`}>
            <path d="M0,0 C5,-10 10,-5 0,0 C-10,-5 -5,-10 0,0" fill={color} />
            <path d="M0,0 C5,10 10,5 0,0 C-10,5 -5,10 0,0" fill={color} />
            <path d="M-1,0 L1,0" stroke="#333" strokeWidth="0.5" />
          </g>
        );
      case "leaf":
        return (
          <g transform={`rotate(${rotate})`}>
            <path d="M0,0 C2,-5 -5,-10 -2,-2 C-5,-2 -10,2 -2,2 C-5,5 0,10 2,2 C5,5 10,0 2,0 Z" fill={color} />
            <path d="M-2,-2 L2,2" stroke="#654321" strokeWidth="0.5" />
          </g>
        );
      case "flower":
        return (
          <g transform={`rotate(${rotate})`}>
            <circle cx="0" cy="0" r="2" fill="#FFDE00" />
            <circle cx="0" cy="-4" r="2" fill={color} />
            <circle cx="4" cy="0" r="2" fill={color} />
            <circle cx="0" cy="4" r="2" fill={color} />
            <circle cx="-4" cy="0" r="2" fill={color} />
          </g>
        );
      default:
        return <circle cx="0" cy="0" r="3" fill={color} />;
    }
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${startPosition}%`,
        top: "-50px",
        width: `${size}px`,
        height: `${size}px`,
      }}
      initial={{ y: -100 }}
      animate={{
        y: "110vh",
        x: [0, swayAmount, -swayAmount, 0],
        rotate: [rotate, rotate + 180, rotate + 360],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: "linear",
        x: {
          repeat: Infinity,
          duration: duration / 2,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      }}
    >
      <svg width="100%" height="100%" viewBox="-10 -10 20 20">
        {getSvgPath()}
      </svg>
    </motion.div>
  );
};

export function StakingSection() {
  const [selectedYears, setSelectedYears] = useState(1)
  const [amount, setAmount] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [natureItems, setNatureItems] = useState([])

  // Generate nature elements for animation
  useEffect(() => {
    const items = [];
    for (let i = 0; i < 30; i++) {
      const elementIndex = Math.floor(Math.random() * natureElements.length);
      const element = natureElements[elementIndex];
      const colorIndex = Math.floor(Math.random() * element.colors.length);
      
      items.push({
        id: i,
        type: element.type,
        color: element.colors[colorIndex],
      });
    }
    setNatureItems(items);
  }, []);

  const calculateRewards = (amount, years) => {
    const principal = Number.parseFloat(amount) || 0
    const apy = stakingTiers.find((tier) => tier.years === years)?.apy || 0
    return (principal * apy * years) / 100
  }

  const calculateEarlyWithdrawalPenalty = (amount) => {
    const principal = Number.parseFloat(amount) || 0
    return (principal * 20) / 100 // 20% penalty
  }

  return (
    <section className="relative min-h-screen pt-24 bg-white overflow-hidden" id="staking">
      {/* Nature elements animation overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {natureItems.map((item) => (
          <FallingElement
            key={item.id}
            elementType={item.type}
            color={item.color}
            index={item.id}
          />
        ))}
        <img
          src="/butterfly.gif"
          alt="Flying Butterfly"
          className="absolute top-10 left-[35%] w-20 h-20"
        />
      </div>

      <Container className="relative z-10">
        
        {/* Section Header */}
        <div className="mb-8 text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl font-bold text-forest-green"
          >
            Stake PLHH Tokens
          </motion.h2>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-dark-text"
          >
            Earn rewards by staking your PLHH tokens
          </motion.p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Staking Form */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm border-2 border-[#a67c00] shadow-lg">
              <CardHeader>
                <CardTitle className="text-forest-green">Stake Your Tokens</CardTitle>
                <CardDescription>Choose duration and amount to start earning rewards</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Duration Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-forest-green">Staking Duration</Label>
                    <span className="text-sm text-forest-green">
                      {selectedYears} {selectedYears === 1 ? "Year" : "Years"}
                    </span>
                  </div>
                  <Slider
                    min={1}
                    max={8}
                    step={1}
                    value={[selectedYears]}
                    onValueChange={(value) => setSelectedYears(value[0])}
                    className="py-4"
                  />
                  <div className="flex items-center justify-between text-xs text-dark-text">
                    <span>1 Year</span>
                    <span>8 Years</span>
                  </div>
                </div>

                {/* Amount Input */}
                <div className="space-y-2 text-forest-green">
                  <Label htmlFor="amount">Amount to Stake</Label>
                  <div className="relative">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-warm-gold/20 bg-mint-white/40 pr-16 text-forest-green"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-dark-text">PLHH</span>
                  </div>
                </div>

                {/* Staking Info */}
                {amount && (
                  <div className="rounded-lg border border-warm-gold/20 p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-dark-text">APY</span>
                        <span className="text-sm text-forest-green">
                          {stakingTiers.find((tier) => tier.years === selectedYears)?.apy}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-dark-text">Total Rewards</span>
                        <span className="text-sm text-sage-green">
                          +{calculateRewards(amount, selectedYears).toFixed(2)} PLHH
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-dark-text">Lock Period</span>
                        <span className="text-sm text-forest-green">
                          {selectedYears} {selectedYears === 1 ? "Year" : "Years"}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-warm-gold/20 pt-3">
                        <span className="text-sm text-dark-text">Early Withdrawal Penalty</span>
                        <span className="text-sm text-brick-red">
                          {calculateEarlyWithdrawalPenalty(amount).toFixed(2)} PLHH
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  {!isApproved ? (
                    <Button
                      className="w-full bg-warm-gold text-dark-text hover:bg-warm-gold/90"
                      onClick={() => setIsApproved(true)}
                    >
                      Approve Contract
                    </Button>
                  ) : (
                    <Button
                      className="w-full bg-warm-gold text-dark-text hover:bg-warm-gold/90"
                      onClick={() => setShowConfirmation(true)}
                    >
                      Stake Tokens
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Staking Stats */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Current Stakes */}
            <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm border-2 border-[#a67c00] shadow-lg">
              <CardHeader>
                <CardTitle className="text-forest-green">Your Stakes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-text">Total Staked</span>
                    <span className="text-lg font-bold text-forest-green">1,234 PLHH</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-dark-text">Total Rewards</span>
                    <span className="text-lg font-bold text-sage-green">+123.45 PLHH</span>
                  </div>
                  <div className="rounded-lg border border-warm-gold/20 p-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-dark-text">Next Reward</span>
                      <div className="flex items-center text-xs text-forest-green">
                        <Clock className="mr-1 h-3 w-3" />
                        12h 34m
                      </div>
                    </div>
                    <Progress value={65} className="h-2 bg-warm-gold/20" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* APY Tiers */}
            <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm border-2 border-[#a67c00] shadow-lg">
              <CardHeader>
                <CardTitle className="text-forest-green">APY Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {stakingTiers.map((tier) => (
                    <div
                      key={tier.years}
                      className="flex items-center justify-between rounded-lg border border-warm-gold/20 p-2"
                    >
                      <span className="text-sm text-dark-text">
                        {tier.years} {tier.years === 1 ? "Year" : "Years"}
                      </span>
                      <span className="text-sm text-forest-green">{tier.apy}% APY</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>

      {/* Staking Confirmation Dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="border-warm-gold/20 bg-mint-white/90 backdrop-blur-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-forest-green">Confirm Staking</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <p>
                You are about to stake {amount} PLHH tokens for {selectedYears} {selectedYears === 1 ? "year" : "years"}
                .
              </p>
              <div className="rounded-lg border border-warm-gold/20 p-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-dark-text">APY Rate</span>
                  <span className="text-forest-green">
                    {stakingTiers.find((tier) => tier.years === selectedYears)?.apy}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-dark-text">Expected Rewards</span>
                  <span className="text-sage-green">+{calculateRewards(amount, selectedYears).toFixed(2)} PLHH</span>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-brick-red/10 p-3 text-sm text-brick-red">
                <AlertTriangle className="h-4 w-4" />
                <span>Early withdrawal will result in a 20% penalty on staked amount.</span>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-warm-gold/20 text-forest-green hover:bg-warm-gold/10">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-warm-gold text-dark-text hover:bg-warm-gold/90">
              Confirm Staking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}
"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

const StakingInterface = () => {
  const sectionRef = useRef(null)
  const treeRef = useRef(null)
  const contentRef = useRef(null)
  const [stakingDuration, setStakingDuration] = useState(2)
  const [stakingAmount, setStakingAmount] = useState(0.88)
  const [showConfirmation, setShowConfirmation] = useState(false)

  // Mock data for active stakes
  const activeStakes = [
    { id: 1, amount: 0.88, pool: "30 Days", startDate: "3/8/2025", time: "12:36:00 AM" },
    { id: 2, amount: 0.88, pool: "30 Days", startDate: "3/8/2025", time: "12:36:00 AM" },
    { id: 3, amount: 0.88, pool: "30 Days", startDate: "3/8/2025", time: "12:36:00 AM" },
    { id: 4, amount: 0.88, pool: "30 Days", startDate: "3/8/2025", time: "12:36:00 AM" },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Pin the section and handle fade in/out with instant transitions
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true, // Makes scrolling faster at the end of the animation
        onEnter: () => {
          // Fade in when entering
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
          // Animate tree brightness
          gsap.to(treeRef.current, {
            filter: "brightness(30%)",
            duration: 0.5,
            ease: "power1.inOut",
          })
        },
        onLeave: () => {
          // Immediately hide content when leaving
          gsap.set(contentRef.current, {
            opacity: 0,
            y: -50,
          })
          // Immediately hide tree
          gsap.set(treeRef.current, {
            filter: "brightness(0%)",
          })
        },
        onEnterBack: () => {
          // Fade in when scrolling back up
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
          // Animate tree brightness
          gsap.to(treeRef.current, {
            filter: "brightness(30%)",
            duration: 0.5,
            ease: "power1.inOut",
          })
        },
        onLeaveBack: () => {
          // Immediately hide when scrolling back up past this section
          gsap.set(contentRef.current, {
            opacity: 0,
            y: 50,
          })
          // Immediately hide tree
          gsap.set(treeRef.current, {
            filter: "brightness(0%)",
          })
        },
      })

      // Set initial state
      gsap.set(contentRef.current, { opacity: 0, y: 50 })
      gsap.set(treeRef.current, { filter: "brightness(0%)" })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleApproveContract = () => {
    setShowConfirmation(true)
  }

  const handleConfirmStaking = () => {
    // Here you would handle the actual staking logic
    setShowConfirmation(false)
    // Add the new stake to the active stakes list
    // This is just a mock implementation
    console.log(`Staked ${stakingAmount} PLHH for ${stakingDuration} years`)
  }

  const handleCancelStaking = () => {
    setShowConfirmation(false)
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden py-20"
    >
      {/* Tree background image */}
      <div
        ref={treeRef}
        className="absolute inset-0 w-full h-full z-0 filter brightness-0"
        style={{
          backgroundImage: "url('/tree.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Content overlay */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4"
      >
        {/* Left column - Staking Form */}
        <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-amber-800/30">
          <h2 className="text-3xl font-bold mb-2 text-amber-400">Stake your Tokens</h2>
          <p className="text-amber-200/70 mb-8">Choose duration and amount to start earning rewards</p>

          {/* Staking Duration Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-medium text-amber-300">Staking Duration</h3>
              <span className="text-amber-400 font-bold">{stakingDuration} Years</span>
            </div>
            <div className="px-2">
              <Slider
                defaultValue={[2]}
                max={8}
                min={1}
                step={1}
                onValueChange={(value) => setStakingDuration(value[0])}
                className="my-4 [&>.relative>.absolute]:bg-yellow-600 [&>.relative>.absolute]:hover:bg-yellow-500 [&>span>span]:bg-yellow-500 [&>span]:bg-yellow-100"
              />
              <div className="flex justify-between text-xs text-amber-200/60">
                <span>1 Year</span>
                <span>8 Years</span>
              </div>
            </div>
          </div>

          {/* Amount to Stake */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-medium text-amber-300">Amount to Stake</h3>
              <div className="bg-amber-400/20 rounded-full w-12 h-12 flex items-center justify-center text-amber-300 font-bold">
                T
              </div>
            </div>
            <div className="px-2">
              <Slider
                defaultValue={[0.88]}
                max={10}
                min={0.1}
                step={0.01}
                onValueChange={(value) => setStakingAmount(value[0])}
                className="my-4 [&>.relative>.absolute]:bg-yellow-600 [&>.relative>.absolute]:hover:bg-yellow-500 [&>span>span]:bg-yellow-500 [&>span]:bg-yellow-100"
              />
            </div>
          </div>

          {/* Staking Info */}
          <div className="space-y-3 mb-8">
            <div className="flex justify-between">
              <span className="text-white font-medium">APY</span>
              <span className="text-amber-400 font-bold">22%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white font-medium">Total Rewards</span>
              <span className="text-amber-400 font-bold">+{stakingAmount.toFixed(2)} PLHH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white font-medium">Lock Period</span>
              <span className="text-amber-400 font-bold">{stakingDuration} Years</span>
            </div>
          </div>

          <Button
            onClick={handleApproveContract}
            className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-amber-950 font-bold border-none rounded-md py-6 h-12 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5)] transition-all duration-300"
          >
            Approve Contract
          </Button>
        </div>

        {/* Right column - Active Stakes */}
        <div className="bg-black/60 backdrop-blur-sm p-8 rounded-lg border border-amber-800/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-amber-400">Active Stakes</h2>
            <div className="bg-amber-500 rounded-full w-10 h-10 flex items-center justify-center text-amber-950 font-bold">
              A
            </div>
          </div>
          <p className="text-amber-200/70 mb-6">Manage your active staking positions</p>

          {/* Stakes Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-amber-300 text-sm border-b border-amber-800/30">
                  <th className="text-left py-2 px-2">#</th>
                  <th className="text-left py-2 px-2">Amount</th>
                  <th className="text-left py-2 px-2">Pool</th>
                  <th className="text-left py-2 px-2">Start Date</th>
                  <th className="text-left py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeStakes.map((stake) => (
                  <tr key={stake.id} className="border-b border-amber-800/20 last:border-0">
                    <td className="py-3 px-2 text-white">{stake.id}</td>
                    <td className="py-3 px-2 text-white">{stake.amount} PLHH</td>
                    <td className="py-3 px-2 text-white">{stake.pool}</td>
                    <td className="py-3 px-2">
                      <div className="text-white">{stake.startDate}</div>
                      <div className="text-amber-200/50 text-xs">{stake.time}</div>
                    </td>
                    <td className="py-3 px-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-amber-400 border-amber-500/50 hover:bg-amber-500/20 hover:text-amber-300"
                      >
                        Withdraw
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="animate-in fade-in zoom-in duration-300 max-w-md w-full mx-4">
            <div className="bg-gradient-to-b from-black to-black to-yellow-600 border-2 border-yellow-500 rounded-lg shadow-[0_0_30px_rgba(255,215,0,0.2)] overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white text-center mb-3">Confirm Staking</h3>
                <p className="text-center text-amber-100 mb-6">
                  You are about to stake {stakingAmount.toFixed(2)} PLHH tokens for {stakingDuration} years
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">APY Rate</span>
                    <span className="text-amber-400 font-bold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-medium">Expected Withdrawals</span>
                    <span className="text-amber-400 font-bold">+{stakingAmount.toFixed(2)} PLHH</span>
                  </div>
                </div>

                <div className="bg-red-200/90 text-red-800 p-3 rounded-md flex items-start mb-6">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">Early Withdrawal will result in 20% penalty on stake amount.</p>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleCancelStaking}
                    variant="outline"
                    className="flex-1 bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmStaking}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-amber-950 font-bold border-none"
                  >
                    Confirm Staking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default StakingInterface

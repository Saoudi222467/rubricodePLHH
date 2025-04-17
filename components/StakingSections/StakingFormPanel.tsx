"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const StakingInterface = () => {
  const sectionRef = useRef(null);
  const isInViewport = useInView(sectionRef, { amount: 0.5, once: false });
  const [isInView, setIsInView] = useState(false);
  const [stakingDuration, setStakingDuration] = useState(2);
  const [stakingAmount, setStakingAmount] = useState(0.88);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsInView(isInViewport);
  }, [isInViewport]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleApproveContract = () => setShowConfirmation(true);
  const handleConfirmStaking = () => {
    setShowConfirmation(false);
    console.log(`Staked ${stakingAmount} PLHH for ${stakingDuration} years`);
  };
  const handleCancelStaking = () => setShowConfirmation(false);

  const activeStakes = [
    {
      id: 1,
      amount: 0.88,
      pool: "30 Days",
      startDate: "3/8/2025",
      time: "12:36:00 AM",
    },
    {
      id: 2,
      amount: 0.88,
      pool: "30 Days",
      startDate: "3/8/2025",
      time: "12:36:00 AM",
    },
    {
      id: 3,
      amount: 0.88,
      pool: "30 Days",
      startDate: "3/8/2025",
      time: "12:36:00 AM",
    },
    {
      id: 4,
      amount: 0.88,
      pool: "30 Days",
      startDate: "3/8/2025",
      time: "12:36:00 AM",
    },
  ];

  const SectionWrapper = isMobile ? "section" : motion.section;
  const sectionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: 0.8 },
      };

  return (
    <>
      <div ref={sectionRef} className="h-[150vh] w-full relative z-10" />

      {isMobile ? (
        <SectionWrapper className="relative top-0 left-0 z-30 w-full min-h-screen overflow-y-auto py-10 flex items-center justify-center">
          <StakingContent
            stakingDuration={stakingDuration}
            setStakingDuration={setStakingDuration}
            stakingAmount={stakingAmount}
            setStakingAmount={setStakingAmount}
            activeStakes={activeStakes}
            handleApproveContract={handleApproveContract}
          />
        </SectionWrapper>
      ) : (
        <AnimatePresence>
          {isInView && (
            <SectionWrapper
              {...sectionProps}
              className="fixed top-0 left-0 z-30 w-full min-h-screen overflow-y-auto py-10 flex items-center justify-center"
            >
              <StakingContent
                stakingDuration={stakingDuration}
                setStakingDuration={setStakingDuration}
                stakingAmount={stakingAmount}
                setStakingAmount={setStakingAmount}
                activeStakes={activeStakes}
                handleApproveContract={handleApproveContract}
              />
            </SectionWrapper>
          )}
        </AnimatePresence>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="max-w-md w-full mx-4">
            <div className="bg-gradient-to-b border-2 border-yellow-500 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  Confirm Staking
                </h3>
                <p className="text-center text-amber-100 mb-6">
                  You are about to stake {stakingAmount.toFixed(2)} PLHH tokens
                  for {stakingDuration} years
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-white font-medium">APY Rate</span>
                    <span className="text-amber-400 font-bold">22%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white font-medium">
                      Expected Withdrawals
                    </span>
                    <span className="text-amber-400 font-bold">
                      +{stakingAmount.toFixed(2)} PLHH
                    </span>
                  </div>
                </div>
                <div className="bg-red-200/90 text-red-800 p-3 rounded-md flex items-start mb-6">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Early Withdrawal will result in 20% penalty on stake amount.
                  </p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleCancelStaking}
                    variant="outline"
                    className="flex-1 bg-amber-100 text-amber-950 border-amber-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmStaking}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-950 font-bold"
                  >
                    Confirm Staking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const StakingContent = ({
  stakingDuration,
  setStakingDuration,
  stakingAmount,
  setStakingAmount,
  activeStakes,
  handleApproveContract,
}) => (
  <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
    {/* Left column - Form */}
    <div className="backdrop-blur-sm p-6 rounded-lg bg-black/40">
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-400">
        Stake your Tokens
      </h2>
      <p className="text-amber-200/70 mb-6">
        Choose duration and amount to start earning rewards
      </p>

      {/* Duration Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg md:text-xl font-medium text-amber-300">
            Staking Duration
          </h3>
          <span className="text-amber-400 font-bold">
            {stakingDuration} Years
          </span>
        </div>
        <div className="px-2">
          <Slider
            defaultValue={[stakingDuration]}
            max={8}
            min={1}
            step={1}
            onValueChange={(v) => setStakingDuration(v[0])}
          />
          <div className="flex justify-between text-xs text-amber-200/60">
            <span>1 Year</span>
            <span>8 Years</span>
          </div>
        </div>
      </div>

      {/* Amount Slider */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg md:text-xl font-medium text-amber-300">
            Amount to Stake
          </h3>
        </div>
        <div className="px-2">
          <Slider
            defaultValue={[stakingAmount]}
            max={10}
            min={0.1}
            step={0.01}
            onValueChange={(v) => setStakingAmount(v[0])}
          />
        </div>
      </div>

      {/* Summary Info */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-white font-medium">APY</span>
          <span className="text-amber-400 font-bold">22%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-medium">Total Rewards</span>
          <span className="text-amber-400 font-bold">
            +{stakingAmount.toFixed(2)} PLHH
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-white font-medium">Lock Period</span>
          <span className="text-amber-400 font-bold">
            {stakingDuration} Years
          </span>
        </div>
      </div>

      <Button
        onClick={handleApproveContract}
        className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-950 font-bold py-6 h-12"
      >
        Approve Contract
      </Button>
    </div>

    {/* Right column - Active Stakes */}
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #000000, #a67d0064)",
      }}
      className="backdrop-blur-sm p-6 rounded-lg border border-[#A67C00]"
    >
      <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4">
        Active Stakes
      </h2>
      <p className="text-amber-200/70 mb-4 text-sm md:text-base">
        Manage your active staking positions
      </p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-amber-300 text-xs border-b border-amber-800/30">
              <th className="text-left py-2 px-2">#</th>
              <th className="text-left py-2 px-2">Amount</th>
              <th className="text-left py-2 px-2">Pool</th>
              <th className="text-left py-2 px-2">Start Date</th>
              <th className="text-left py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeStakes.map((stake) => (
              <tr
                key={stake.id}
                className="border-b border-amber-800/20 last:border-0"
              >
                <td className="py-2 px-2 text-white">{stake.id}</td>
                <td className="py-2 px-2 text-white">{stake.amount} PLHH</td>
                <td className="py-2 px-2 text-white">{stake.pool}</td>
                <td className="py-2 px-2">
                  <div className="text-white">{stake.startDate}</div>
                  <div className="text-amber-200/50 text-xs">{stake.time}</div>
                </td>
                <td className="py-2 px-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-black border-amber-500/50 bg-amber-500 hover:bg-yellow-100"
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
);

export default StakingInterface;

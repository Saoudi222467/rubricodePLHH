"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";
import { useWallet } from "@suiet/wallet-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!;
const STAKE_POOL_ID = process.env.NEXT_PUBLIC_STAKE_POOL_ID!;

interface WalletType {
  connected: boolean;
  address?: string;
  getClient?: () => SuiClient;
  signAndExecuteTransactionBlock: (params: {
    transactionBlock: TransactionBlock;
    options?: { showEffects?: boolean; showEvents?: boolean };
  }) => Promise<any>;
}

const StakingInterface: React.FC = () => {
  const wallet = useWallet() as unknown as WalletType;
  const sectionRef = useRef(null);
  const isViewport = useInView(sectionRef, { amount: 0.5, once: false });

  const [isInView, setIsInView] = useState(false);
  const [stakingDuration, setStakingDuration] = useState(1);
  const [stakingAmount, setStakingAmount] = useState(0.88);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStakes, setActiveStakes] = useState<{ amount: string; duration: number }[]>([]);
  const [plhhBalance, setPlhhBalance] = useState("0");
  const [isLoadingStakes, setIsLoadingStakes] = useState(false);

  // APY = 11% * years, capped at 77%
  const apyPercent = Math.min(stakingDuration, 7) * 11;
  const expectedReward = (stakingAmount * apyPercent) / 100;

  useEffect(() => {
    setIsInView(isViewport);
  }, [isViewport]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (wallet.connected && wallet.address) {
      loadUserData();
    }
  }, [wallet.connected, wallet.address]);

  const loadUserData = async () => {
    if (!wallet.connected || !wallet.address) return;
    setIsLoadingStakes(true);

    try {
      const provider = wallet.getClient
        ? wallet.getClient()
        : new SuiClient({ url: getFullnodeUrl("mainnet") });

      // Get PLHH balance
      const coinType = `${PACKAGE_ID}::plhh::PLHH`;
      const coinsResponse = await provider.getCoins({ owner: wallet.address, coinType });
      let total = 0n;
      for (const c of coinsResponse.data || []) total += BigInt(c.balance);
      setPlhhBalance((Number(total) / 1e9).toFixed(4));

      // Optional: retrieve on-chain stakes via devInspect + BCS decode
      // const tx = new TransactionBlock();
      // const [raw] = tx.moveCall({ target: `${PACKAGE_ID}::plhh::get_stakes`, arguments: [tx.object(STAKE_POOL_ID), tx.pure(wallet.address)] });
      // const result = await provider.devInspectTransactionBlock({ transactionBlock: tx, sender: wallet.address });
      // Decode with @mysten/bcs if needed

    } catch (e) {
      console.error(e);
      toast.error("Failed to load your staking data");
    } finally {
      setIsLoadingStakes(false);
    }
  };

  const handleApproveContract = () => {
    if (!wallet.connected) {
      toast.error("Please connect your wallet first");
      return;
    }
    if (stakingAmount <= 0) {
      toast.error("Please enter an amount to stake");
      return;
    }
    if (Number(plhhBalance) < stakingAmount) {
      toast.error(`Insufficient PLHH balance. You have ${plhhBalance} PLHH`);
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmStaking = async () => {
    if (!wallet.connected || !wallet.address) {
      toast.error("Please connect your wallet first");
      return;
    }
    setIsProcessing(true);

    try {
      const provider = wallet.getClient
        ? wallet.getClient()
        : new SuiClient({ url: getFullnodeUrl("mainnet") });

      // Convert to atomic units
      const amountAtomic = BigInt(Math.floor(stakingAmount * 1e9));

      // Fetch PLHH coins
      const coinType = `${PACKAGE_ID}::plhh::PLHH`;
      const { data: coins } = await provider.getCoins({ owner: wallet.address, coinType });
      if (!coins.length) throw new Error("No PLHH tokens in your wallet");

      const coin = coins.find(c => BigInt(c.balance) >= amountAtomic);
      if (!coin) throw new Error("Merge your PLHH coins or reduce the amount");

      // Build transaction
      const tx = new TransactionBlock();
      tx.setSender(wallet.address);
      tx.setGasBudget(1_000_000);

      const coinArg = tx.object(coin.coinObjectId);
      const [toStake] = tx.splitCoins(coinArg, [tx.pure(amountAtomic)]);

      tx.moveCall({
        target: `${PACKAGE_ID}::plhh::stake`,
        arguments: [
          tx.object(STAKE_POOL_ID),
          tx.pure(amountAtomic),
          tx.pure(stakingDuration),
          toStake,
        ],
      });

      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: { showEffects: true, showEvents: true },
      });

      if (result.effects?.status.status === "success") {
        toast.success("Staking successful!");
        setActiveStakes([
          ...activeStakes,
          { amount: stakingAmount.toFixed(2), duration: stakingDuration },
        ]);
      } else {
        throw new Error(result.effects?.status.error || "Unknown error");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(`Staking failed: ${e.message || e}`);
    } finally {
      setIsProcessing(false);
      setShowConfirmation(false);
    }
  };

  const handleCancelStaking = () => {
    setShowConfirmation(false);
  };

  const SectionWrapper = isMobile ? "section" : motion.section;
  const sectionProps = isMobile
    ? {}
    : {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 50 },
        transition: { duration: 0.8 },
      };

  const content = (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
      {/* Left: Form */}
      <div className="backdrop-blur-sm p-6 rounded-lg bg-black/40">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-amber-400">Stake your Tokens</h2>
        <p className="text-amber-200/70 mb-6">Choose duration and amount to start earning rewards</p>

        <div className="mb-4 p-2 bg-amber-900/20 rounded-md">
          <p className="text-amber-300">Your PLHH Balance: <span className="font-bold">{plhhBalance} PLHH</span></p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg md:text-xl font-medium text-amber-300">Staking Duration</h3>
            <span className="text-amber-400 font-bold">{stakingDuration} {stakingDuration === 1 ? 'Year' : 'Years'} ({apyPercent}% APY)</span>
          </div>
          <Slider defaultValue={[stakingDuration]} min={1} max={8} step={1} onValueChange={v => setStakingDuration(v[0])} />
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg md:text-xl font-medium text-amber-300">Amount to Stake</h3>
            <span className="text-amber-400 font-bold">{stakingAmount.toFixed(2)} PLHH</span>
          </div>
          <Slider defaultValue={[stakingAmount]} min={0.1} max={10} step={0.01} onValueChange={v => setStakingAmount(v[0])} />
          <div className="mt-2 flex justify-end">
            <button onClick={() => setStakingAmount(Number(plhhBalance))} className="text-xs text-amber-400 hover:text-amber-300">Max</button>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between"><span className="text-white font-medium">APY</span><span className="text-amber-400 font-bold">{apyPercent}%</span></div>
          <div className="flex justify-between"><span className="text-white font-medium">Total Rewards</span><span className="text-amber-400 font-bold">+{expectedReward.toFixed(2)} PLHH</span></div>
          <div className="flex justify-between"><span className="text-white font-medium">Lock Period</span><span className="text-amber-400 font-bold">{stakingDuration} {stakingDuration===1?'Year':'Years'}</span></div>
        </div>

        <Button onClick={handleApproveContract} disabled={!wallet.connected} className="w-full bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-950 font-bold py-6 h-12">
          {wallet.connected ? 'Stake Now' : 'Connect Wallet to Stake'}
        </Button>
      </div>

      {/* Right: Active Stakes */}
      <div className="backdrop-blur-sm p-6 rounded-lg border border-[#A67C00]" style={{ backgroundImage: "linear-gradient(to bottom, #000000, #a67d0064)" }}>
        <h2 className="text-xl md:text-2xl font-bold text-amber-400 mb-4">Active Stakes</h2>
        {isLoadingStakes ? (
          <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-amber-400" /></div>
        ) : activeStakes.length ? (
          <div className="space-y-4">{activeStakes.map((s,i)=>(<div key={i} className="p-3 bg-amber-900/20 rounded-md"><div className="flex justify-between mb-1"><span className="text-amber-200">Amount</span><span className="text-white font-medium">{s.amount} PLHH</span></div><div className="flex justify-between mb-1"><span className="text-amber-200">Duration</span><span className="text-white font-medium">{s.duration} Years</span></div><div className="flex justify-between"><span className="text-amber-200">Status</span><span className="text-green-400">Active</span></div></div>))}</div>
        ) : (
          <div className="text-center py-10"><p className="text-amber-200/70 mb-2">No active stakes found</p><p className="text-sm text-amber-200/50">Start staking to earn rewards on your PLHH tokens</p></div>
        )}
        {wallet.connected && <Button onClick={loadUserData} variant="outline" className="mt-4 w-full border-amber-500/50 text-amber-400 hover:bg-amber-500/10">Refresh Stakes</Button>}
      </div>
    </div>
  );

  return (
    <>
      <ToastContainer position="top-right" />
      <div ref={sectionRef} className="h-[150vh] w-full relative z-10" />
      <AnimatePresence>
        {isMobile ? (
          <SectionWrapper className="relative top-0 left-0 z-30 w-full min-h-screen overflow-y-auto py-10 flex items-center justify-center">{content}</SectionWrapper>
        ) : (
          isInView && <SectionWrapper {...sectionProps} className="fixed top-0 left-0 z-30 w-full min-h-screen overflow-y-auto py-10 flex items-center justify-center">{content}</SectionWrapper>
        )}
      </AnimatePresence>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="max-w-md w-full mx-4">
            <div className="bg-gradient-to-b from-black to-amber-950/50 border-2 border-yellow-500 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white text-center mb-3">Confirm Staking</h3>
                <p className="text-center text-amber-100 mb-6">You are about to stake {stakingAmount.toFixed(2)} PLHH tokens for {stakingDuration} {stakingDuration===1?'year':'years'}</p>
                <div className="space-y-3 mb-6"><div className="flex justify-between"><span className="text-white font-medium">APY Rate</span><span className="text-amber-400 font-bold">{apyPercent}%</span></div><div className="flex justify-between"><span className="text-white font-medium">Expected Rewards</span><span className="text-amber-400 font-bold">+{expectedReward.toFixed(2)} PLHH</span></div></div>
                <div className="bg-red-900/20 border border-red-500/30 text-red-300 p-3 rounded-md flex items-start mb-6"><AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0"/><p className="text-sm">Early withdrawal will incur penalties ranging from 20-40% of rewards depending on how early you withdraw.</p></div>
                <div className="flex gap-3 justify-center"><Button onClick={handleCancelStaking} variant="outline" className="flex-1 bg-transparent text-amber-300 border-amber-500/50 hover:bg-amber-950/30">Cancel</Button><Button onClick={handleConfirmStaking} disabled={isProcessing} className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-500 text-amber-950 font-bold flex items-center justify-center">{isProcessing?(<><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Processing...</>):"Confirm Staking"}</Button></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StakingInterface;

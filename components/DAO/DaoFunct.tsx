"use client";

import React, { useRef, useState, useEffect } from "react";
import { AnimatePresence, motion, Variants, useInView } from "framer-motion";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useWallet, ConnectButton } from "@suiet/wallet-kit";
import { SuiClient } from "@mysten/sui.js/client";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Check } from "lucide-react";
import { 
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport 
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, duration: 0.6 },
  }),
};

interface WalletType {
  connected: boolean
  address?: string
  getClient?: () => SuiClient
  signAndExecuteTransactionBlock: (params: {
    transactionBlock: TransactionBlock
  }) => Promise<any>
}

export function DaoComponent() {
  // scroll trigger
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { amount: 0.5 });
  const { toast } = useToast();

  
  // wallet & provider
  const wallet = useWallet()  as unknown as WalletType;
  const provider = wallet.getClient
    ? wallet.getClient()
    : new SuiClient({ url: process.env.NEXT_PUBLIC_SUI_RPC_URL! });

  // on-chain IDs
  const PACKAGE_ID = process.env.NEXT_PUBLIC_PLHH_DAO_PACKAGE_ID!;
  const DAO_CONFIG_ID = process.env.NEXT_PUBLIC_DAO_CONFIG_ID!;
  const DAO_STORAGE_ID = process.env.NEXT_PUBLIC_DAO_STORAGE_ID!;
  const PLHH_COIN_TYPE = process.env.NEXT_PUBLIC_PLHH_COIN_TYPE!;
  const ENV_CLOCK_ID = process.env.NEXT_PUBLIC_CLOCK_ID;

  const [clockId, setClockId] = useState<string>(ENV_CLOCK_ID || "");
  const [proposals, setProposals] = useState<any[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newActionType, setNewActionType] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (wallet.connected && !ENV_CLOCK_ID) {
      (async () => {
        try {
          const fields = await provider.getDynamicFields({ parentId: "0x2::clock::Clock" });
          if (fields.data.length > 0) setClockId(fields.data[0].objectId);
        } catch (err) {
          console.error("Error fetching clock:", err);
        }
      })();
    }
  }, [wallet.connected, provider, ENV_CLOCK_ID]);

  useEffect(() => {
    if (wallet.connected && clockId) fetchProposals();
  }, [wallet.connected, clockId]);

  async function fetchProposals() {
    try {
      setLoading(true);
      setError(null);
      const fields = await provider.getDynamicFields({ parentId: DAO_STORAGE_ID });
      const items = await Promise.all(
        fields.data.map(async (f) => {
          const obj = await provider.getDynamicFieldObject({
            parentId: DAO_STORAGE_ID,
            name: f.name,
            //options: { showContent: true },
          });
          const v = (obj.data as any).content.fields.value.fields;
          const decoder = new TextDecoder();
          return {
            id: Number((f.name as any).value),
            title: decoder.decode(new Uint8Array(v.title.fields)),
            description: decoder.decode(new Uint8Array(v.description.fields)),
            votesFor: Number(v.status.fields.votes_for),
            votesAgainst: Number(v.status.fields.votes_against),
            totalVoters: Number(v.status.fields.total_voters),
            isActive: v.status.fields.is_active,
            isExecuted: v.status.fields.is_executed,
            isCanceled: v.status.fields.is_canceled,
          };
        })
      );
      setProposals(items);
    } catch (e: any) {
      console.error("Error fetching proposals:", e);
      setError("Failed to fetch proposals");
    } finally {
      setLoading(false);
    }
  }

  async function pickPlhhCoin() {
    try {
      const { data } = await provider.getCoins({ owner: wallet.address!, coinType: PLHH_COIN_TYPE });
      if (data.length === 0) throw new Error("No PLHH tokens in wallet");
      return data[0].coinObjectId;
    } catch (e) {
      throw new Error(`Failed to find PLHH tokens: ${(e as Error).message}`);
    }
  }

  async function moveCall(fn: string, args: ((txb: TransactionBlock) => any)[]) {
    setLoading(true);
    setError(null);
    try {
      if (!clockId) throw new Error("Clock not set");
      const tx = new TransactionBlock();
      tx.moveCall({ target: `${PACKAGE_ID}::plhh_dao::${fn}`, arguments: args.map((a) => a(tx)) });
      const result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
      console.log("Transaction result:", result);
      return result;
    } catch (e: any) {
      console.error(`Error in ${fn}:`, e);
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }

  const handleCreate = async () => {
    if (!newTitle || !newDesc) {
      setError("Title and description are required");
      return;
    }
    
    setSuccessMessage(null);
    
    try {
      const coin = await pickPlhhCoin();
      const result = await moveCall("create_proposal", [
        (tx) => tx.object(DAO_CONFIG_ID),
        (tx) => tx.object(DAO_STORAGE_ID),
        (tx) => tx.pure(Array.from(new TextEncoder().encode(newTitle))),
        (tx) => tx.pure(Array.from(new TextEncoder().encode(newDesc))),
        (tx) => tx.pure(newActionType),
        (tx) => tx.object(clockId),
        (tx) => tx.object(coin),
      ]);
      
      // Show success message/toast
      setSuccessMessage(`Proposal "${newTitle}" created successfully!`);
      toast({
        title: "Success!",
        description: `Proposal "${newTitle}" has been created.`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      
      // Reset form
      setNewTitle(""); 
      setNewDesc("");
      
      // Refetch updated proposals list
      fetchProposals();
    } catch (e: any) {
      // Error is already set in moveCall
      toast({
        variant: "destructive",
        title: "Error",
        description: e.message || "Failed to create proposal",
      });
    }
  };

  const handleVote = async (proposalId: number, voteFor: boolean) => {
    try {
      const coin = await pickPlhhCoin();
      await moveCall("cast_vote", [
        (tx) => tx.object(DAO_STORAGE_ID), 
        (tx) => tx.pure(proposalId), 
        (tx) => tx.pure(voteFor), 
        (tx) => tx.object(clockId), 
        (tx) => tx.object(coin)
      ]);
      
      toast({
        title: "Vote Cast",
        description: `You voted ${voteFor ? "for" : "against"} proposal #${proposalId}.`,
      });
      
      fetchProposals();
    } catch (e: any) {
      // Error is already set in moveCall
      toast({
        variant: "destructive",
        title: "Vote Failed",
        description: e.message || "Failed to cast vote",
      });
    }
  };

  const handleCancel = async (proposalId: number) => {
    try {
      await moveCall("cancel_proposal", [
        (tx) => tx.object(DAO_CONFIG_ID), 
        (tx) => tx.object(DAO_STORAGE_ID), 
        (tx) => tx.pure(proposalId), 
        (tx) => tx.object(clockId)
      ]);
      
      toast({
        title: "Proposal Canceled",
        description: `Proposal #${proposalId} has been canceled.`,
      });
      
      fetchProposals();
    } catch (e: any) {
      // Error is already set in moveCall
      toast({
        variant: "destructive",
        title: "Cancel Failed",
        description: e.message || "Failed to cancel proposal",
      });
    }
  };

  const handleExecute = async (proposalId: number) => {
    try {
      await moveCall("execute_proposal", [
        (tx) => tx.object(DAO_STORAGE_ID), 
        (tx) => tx.pure(proposalId), 
        (tx) => tx.object(clockId)
      ]);
      
      toast({
        title: "Proposal Executed",
        description: `Proposal #${proposalId} has been executed successfully.`,
      });
      
      fetchProposals();
    } catch (e: any) {
      // Error is already set in moveCall
      toast({
        variant: "destructive",
        title: "Execution Failed",
        description: e.message || "Failed to execute proposal",
      });
    }
  };

  // Function to clear success message after delay
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // Hide success message after 5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      <ToastProvider>
        {/* trigger scroll */}
        <div ref={sentinelRef} className="w-full h-screen" />

      <AnimatePresence>
        {isInView && (
          <motion.div
            key="dao-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-screen z-50"
          >
            {/* overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#4E2A1E]/50 via-[#3A1F0B]/30 to-[#D4AF37]/40 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />

            {/* content */}
            <motion.section
              className="relative z-20 h-screen overflow-auto flex flex-col items-center justify-center px-6 text-white text-center space-y-8 max-w-3xl mx-auto py-16"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={8}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold">
                DAO Dashboard
              </h2>

              <ConnectButton />

              {error && (
                <div className="w-full p-4 bg-red-900/70 rounded flex items-center space-x-2">
                  <AlertCircle size={20} />
                  <p>{error}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="w-full p-4 bg-green-700/70 rounded flex items-center space-x-2">
                  <Check size={20} />
                  <p>{successMessage}</p>
                </div>
              )}

              {loading && (
                <div className="w-full p-4 flex justify-center">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              )}

              {wallet.connected && proposals.length === 0 && !loading && (
                <div className="w-full p-4 bg-gray-800 rounded">
                  <p>No proposals found. Create one below!</p>
                </div>
              )}

              {wallet.connected && proposals.map((p) => (
                <div key={p.id} className="w-full p-4 bg-gray-800 rounded">
                  <h3 className="font-semibold">#{p.id}: {p.title}</h3>
                  <p className="text-sm mb-1">{p.description}</p>
                  <p className="text-xs">
                    👍 {p.votesFor} · 👎 {p.votesAgainst} · Voters: {p.totalVoters}
                  </p>
                  <div className="mt-2 space-x-2">
                    <Button 
                      onClick={() => handleVote(p.id, true)} 
                      disabled={!p.isActive || loading}
                      variant={p.isActive ? "default" : "ghost"}
                      size="sm"
                    >
                      Vote For
                    </Button>
                    <Button 
                      onClick={() => handleVote(p.id, false)} 
                      disabled={!p.isActive || loading}
                      variant={p.isActive ? "default" : "ghost"}
                      size="sm"
                    >
                      Vote Against
                    </Button>
                    {p.isActive && (
                      <Button 
                        onClick={() => handleCancel(p.id)}
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                      >
                        Cancel
                      </Button>
                    )}
                    {!p.isActive && !p.isExecuted && !p.isCanceled && (
                      <Button 
                        onClick={() => handleExecute(p.id)}
                        disabled={loading}
                        variant="secondary"
                        size="sm"
                      >
                        Execute
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {wallet.connected && (
                <div className="w-full space-y-2">
                  <h3 className="font-bold text-xl">Create Proposal</h3>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Title"
                    className="w-full px-4 py-2 rounded bg-gray-700"
                  />
                  <textarea
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Description"
                    className="w-full px-4 py-2 rounded bg-gray-700"
                    rows={3}
                  />
                  <div className="flex items-center space-x-2 w-full">
                    <label className="text-sm">Action Type:</label>
                    <input
                      type="number"
                      value={newActionType}
                      onChange={(e) => setNewActionType(Number(e.target.value))}
                      className="w-20 px-2 py-1 rounded bg-gray-700"
                      min={1}
                    />
                    <Button 
                      onClick={handleCreate} 
                      className="bg-amber-400 text-gray-900 hover:bg-amber-500 flex-1"
                      disabled={loading || !newTitle || !newDesc}
                    >
                      {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                      Create Proposal
                    </Button>
                  </div>
                </div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
        <ToastViewport />
      </ToastProvider>
    </>
  );
}
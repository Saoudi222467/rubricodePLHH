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
  const DEFAULT_ACTION_TYPE = 1;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Debug log to check the token type
  console.log("Using PLHH token type:", PLHH_COIN_TYPE);

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

  // Add a diagnostic function to check all available tokens
  async function checkAvailableTokens() {
    try {
      // Only run if wallet is connected
      if (!wallet.connected) return;
      
      console.log("Checking available tokens for user:", wallet.address);
      
      // Get all coins for the user
      const allCoins = await provider.getAllCoins({
        owner: wallet.address!
      });
      
      // Log the coin types
      console.log("Available coin types:", allCoins.data.map(coin => ({
        type: coin.coinType,
        balance: coin.balance,
        objectId: coin.coinObjectId
      })));
      
      // Check specifically for PLHH tokens from env variable
      const plhhFromEnv = await provider.getCoins({
        owner: wallet.address!,
        coinType: PLHH_COIN_TYPE
      });
      console.log(`PLHH tokens from environment (${PLHH_COIN_TYPE}):`, plhhFromEnv.data);
      
      // Check for the PLHH tokens from the contract import
      const plhhFromContract = await provider.getCoins({
        owner: wallet.address!,
        coinType: "0x4baa9e1a7f3cfd74a7d3e42ff54ab1b0e376df20b6d7ff090455c9043dda18fc::plhh::PLHH"
      });
      console.log("PLHH tokens from contract (0x4baa...::plhh::PLHH):", plhhFromContract.data);
      
      // Get the package details to see what token type the contract expects
      const packageObj = await provider.getObject({
        id: PACKAGE_ID,
        options: { showContent: true }
      });
      console.log("DAO Package details:", packageObj.data);
      
      // Directly get the config object to inspect
      const configObj = await provider.getObject({
        id: DAO_CONFIG_ID,
        options: { showContent: true, showOwner: true }
      });
      console.log("DAO Config details:", configObj.data);
      
      // Check the DAO storage object too
      const storageObj = await provider.getObject({
        id: DAO_STORAGE_ID,
        options: { showContent: true, showOwner: true }
      });
      console.log("DAO Storage details:", storageObj.data);
      
      return {
        allCoins: allCoins.data,
        plhhFromEnv: plhhFromEnv.data,
        plhhFromContract: plhhFromContract.data
      };
    } catch (e) {
      console.error("Error checking tokens:", e);
      return null;
    }
  }

  useEffect(() => {
    if (wallet.connected) {
      // Run diagnostics when wallet connects
      checkAvailableTokens();
    }
  }, [wallet.connected]);

  async function fetchProposalsFromEvents() {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching proposals from events for package:", PACKAGE_ID);
      
      // Fetch ProposalCreated events
      const events = await provider.queryEvents({
        query: {
          MoveEventType: `${PACKAGE_ID}::plhh_dao::ProposalCreated`
        },
        limit: 50 // Increase if needed
      });
      
      console.log("ProposalCreated events:", events);
      
      if (!events || !events.data || events.data.length === 0) {
        console.log("No proposal events found");
        setProposals([]);
        setLoading(false);
        return;
      }
      
      const proposalEvents = events.data.map(event => {
        const eventData = (event as any).parsedJson;
        return {
          id: Number(eventData.proposal_id),
          title: eventData.title,
          description: eventData.description,
          creator: eventData.creator,
          createdAt: eventData.created_at,
          votingEndTime: eventData.voting_end_time,
          // Default values until we get vote data
          votesFor: 0,
          votesAgainst: 0,
          totalVoters: 0,
          isActive: true,
          isExecuted: false,
          isCanceled: false
        };
      });
      
      console.log("Parsed proposal events:", proposalEvents);
      
      // Now fetch vote events to update the proposal status
      const voteEvents = await provider.queryEvents({
        query: {
          MoveEventType: `${PACKAGE_ID}::plhh_dao::VoteCast`
        },
        limit: 100
      });
      
      console.log("VoteCast events:", voteEvents);
      
      // Update proposals with vote counts from events
      if (voteEvents && voteEvents.data && voteEvents.data.length > 0) {
        voteEvents.data.forEach(event => {
          const voteData = (event as any).parsedJson;
          const proposalId = Number(voteData.proposal_id);
          const proposal = proposalEvents.find(p => p.id === proposalId);
          
          if (proposal) {
            proposal.votesFor = Number(voteData.votes_for);
            proposal.votesAgainst = Number(voteData.votes_against);
            // Approximate total voters from the sum
            proposal.totalVoters = proposal.votesFor + proposal.votesAgainst;
          }
        });
      }
      
      // Fetch executed and canceled events to update status
      const executedEvents = await provider.queryEvents({
        query: {
          MoveEventType: `${PACKAGE_ID}::plhh_dao::ProposalExecuted`
        },
        limit: 50
      });
      
      const canceledEvents = await provider.queryEvents({
        query: {
          MoveEventType: `${PACKAGE_ID}::plhh_dao::ProposalCanceled`
        },
        limit: 50
      });
      
      console.log("Executed events:", executedEvents);
      console.log("Canceled events:", canceledEvents);
      
      // Update proposal status based on executed/canceled events
      if (executedEvents && executedEvents.data) {
        executedEvents.data.forEach(event => {
          const execData = (event as any).parsedJson;
          const proposalId = Number(execData.proposal_id);
          const proposal = proposalEvents.find(p => p.id === proposalId);
          
          if (proposal) {
            proposal.isActive = false;
            proposal.isExecuted = true;
          }
        });
      }
      
      if (canceledEvents && canceledEvents.data) {
        canceledEvents.data.forEach(event => {
          const cancelData = (event as any).parsedJson;
          const proposalId = Number(cancelData.proposal_id);
          const proposal = proposalEvents.find(p => p.id === proposalId);
          
          if (proposal) {
            proposal.isActive = false;
            proposal.isCanceled = true;
          }
        });
      }
      
      // Check if voting period has ended for active proposals
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      proposalEvents.forEach(proposal => {
        if (proposal.isActive && currentTime > proposal.votingEndTime) {
          proposal.isActive = false;
        }
      });
      
      // Sort by proposal ID, descending (newest first)
      proposalEvents.sort((a, b) => b.id - a.id);
      
      console.log("Final processed proposals:", proposalEvents);
      setProposals(proposalEvents);
    } catch (e: any) {
      console.error("Error fetching proposal events:", e);
      setError("Failed to fetch proposals: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (wallet.connected && clockId) {
      // Use the event-based fetching instead
      fetchProposalsFromEvents();
      // Also check DAO storage structure for debugging
      checkDaoStorage();
    }
  }, [wallet.connected, clockId]);

  // Add a diagnostic function to check DAO storage structure
  async function checkDaoStorage() {
    try {
      console.log("Checking DAO storage structure...");
      console.log("DAO_STORAGE_ID:", DAO_STORAGE_ID);
      
      // Get the storage object itself
      const storageObj = await provider.getObject({
        id: DAO_STORAGE_ID,
        options: { showContent: true, showOwner: true }
      });
      
      console.log("DAO Storage object:", storageObj);
      
      // Check dynamic fields
      const fields = await provider.getDynamicFields({ parentId: DAO_STORAGE_ID });
      console.log("DAO Storage dynamic fields:", fields);
      
      if (fields.data.length > 0) {
        // Check the first field
        const firstField = await provider.getDynamicFieldObject({
          parentId: DAO_STORAGE_ID,
          name: fields.data[0].name
        });
        console.log("First dynamic field content:", firstField);
      }
      
      return storageObj;
    } catch (e) {
      console.error("Error checking DAO storage:", e);
      return null;
    }
  }

  async function fetchProposals() {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching proposals from DAO_STORAGE_ID:", DAO_STORAGE_ID);
      
      // For Sui Tables, we need to look for the table field first, which has a special name
      const tableFields = await provider.getDynamicFields({
        parentId: DAO_STORAGE_ID,
        // Table fields are usually stored with 'table' as part of their name
      });
      console.log("DAO Storage fields:", tableFields.data);
      
      // For each field in the storage, check if it has proposals
      for (const field of tableFields.data) {
        console.log("Checking field:", field);
        
        // Now get the actual table entries
        const tableEntries = await provider.getDynamicFields({
          parentId: field.objectId
        });
        console.log(`Found ${tableEntries.data.length} entries in table:`, tableEntries.data);
        
        if (tableEntries.data.length > 0) {
          // Process the proposal entries
          const items = await Promise.all(
            tableEntries.data.map(async (entry) => {
              try {
                // Get the full object data
                const proposalObj = await provider.getObject({
                  id: entry.objectId,
                  options: { showContent: true }
                });
                console.log("Proposal data:", proposalObj.data);
                
                // Extract proposal data from the object
                const content = (proposalObj.data as any).content;
                if (!content || !content.fields) {
                  console.error("Invalid proposal format:", proposalObj.data);
                  return null;
                }
                
                // Try different field structures based on how Sui represents Table entries
                let proposalData;
                
                // Log the entire structure for debugging
                console.log("Full proposal object structure:", content);
                
                // Extract the proposal ID from the name field or directly from content
                let id = 0;
                try {
                  id = Number(entry.name.value || 0);
                } catch (e) {
                  console.log("Could not extract ID from name:", entry.name);
                }
                
                // Try to extract fields from different possible structures
                if (content.fields.value && content.fields.value.fields) {
                  proposalData = content.fields.value.fields;
                } else if (content.fields) {
                  proposalData = content.fields;
                } else {
                  console.error("Cannot determine proposal structure");
                  return null;
                }
                
                // Extract text fields (title, description) using TextDecoder
                const decoder = new TextDecoder();
                let title = "Unknown";
                let description = "Unknown";
                
                // Try different paths to find the title and description
                if (proposalData.title && proposalData.title.fields) {
                  title = decoder.decode(new Uint8Array(proposalData.title.fields));
                } else if (proposalData.title) {
                  title = proposalData.title.toString();
                }
                
                if (proposalData.description && proposalData.description.fields) {
                  description = decoder.decode(new Uint8Array(proposalData.description.fields));
                } else if (proposalData.description) {
                  description = proposalData.description.toString();
                }
                
                // Extract voting status
                const status = proposalData.status && proposalData.status.fields 
                  ? proposalData.status.fields 
                  : proposalData.status || {};
                
                return {
                  id: id,
                  title,
                  description,
                  votesFor: Number(status.votes_for || 0),
                  votesAgainst: Number(status.votes_against || 0),
                  totalVoters: Number(status.total_voters || 0),
                  isActive: status.is_active || false,
                  isExecuted: status.is_executed || false,
                  isCanceled: status.is_canceled || false
                };
              } catch (fieldError) {
                console.error("Error processing proposal entry:", entry, fieldError);
                return null;
              }
            })
          );
          
          // Filter out null entries and update state
          const validItems = items.filter(item => item !== null);
          console.log("Valid proposals found:", validItems);
          
          if (validItems.length > 0) {
            setProposals(validItems);
            setLoading(false);
            return;
          }
        }
      }
      
      // If we've checked all fields and found no proposals
      console.log("No valid proposals found after scanning all fields");
      setProposals([]);
    } catch (e: any) {
      console.error("Error fetching proposals:", e);
      setError("Failed to fetch proposals: " + (e.message || e));
    } finally {
      setLoading(false);
    }
  }

  async function pickPlhhCoin() {
    try {
      console.log("Using PLHH type:", PLHH_COIN_TYPE);
      
      const { data } = await provider.getCoins({ 
        owner: wallet.address!, 
        coinType: PLHH_COIN_TYPE 
      });
      
      if (data.length === 0) {
        throw new Error("No PLHH tokens found in wallet. You need PLHH tokens to interact with the DAO.");
      }
      
      console.log("Found PLHH coin:", data[0].coinObjectId);
      return data[0].coinObjectId;
    } catch (e) {
      console.error("Error finding PLHH coins:", e);
      throw new Error(`Failed to find PLHH tokens: ${(e as Error).message}`);
    }
  }

  const handleCreate = async () => {
    if (!newTitle || !newDesc) {
      setError("Title and description are required");
      return;
    }
    
    if (!wallet.connected) {
      setError("Please connect your wallet first");
      return;
    }
    
    setSuccessMessage(null);
    setLoading(true);
    
    try {
      // Get a PLHH coin
      const coin = await pickPlhhCoin();
      console.log("Using PLHH coin:", coin);
      
      // Log all parameters for debugging
      console.log("Transaction parameters:", {
        DAO_CONFIG_ID,
        DAO_STORAGE_ID,
        title: newTitle,
        description: newDesc,
        actionType: DEFAULT_ACTION_TYPE,
        clockId,
        coin,
        PLHH_COIN_TYPE
      });
      
      // Create transaction with explicit type annotationsc
      const tx = new TransactionBlock();
      
      // Add PLHH coin to transaction and get a reference
      console.log("Creating transaction and adding coin...");
      
      // Create proposal with simpler structure
      console.log("Adding create_proposal call...");
      tx.moveCall({
        target: `${PACKAGE_ID}::plhh_dao::create_proposal`,
        arguments: [
          tx.object(DAO_CONFIG_ID),
          tx.object(DAO_STORAGE_ID),
          tx.pure(Array.from(new TextEncoder().encode(newTitle))),
          tx.pure(Array.from(new TextEncoder().encode(newDesc))),
          tx.pure(DEFAULT_ACTION_TYPE),
          tx.object(clockId),
          tx.object(coin)
        ],
        typeArguments: []
      });
      
      console.log("Transaction block:", tx);
      console.log("Executing create_proposal...");
      
      // Execute with full options and capture detailed response
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx
      });
      
      console.log("Proposal created successfully:", result);
      
      // Verify that the proposal was created by fetching immediately
      console.log("Verifying proposal creation...");
      setTimeout(async () => {
        await fetchProposalsFromEvents();
      }, 2000); // Wait 2 seconds for the blockchain to process
      
      // Show success message
      setSuccessMessage(`Proposal "${newTitle}" created successfully!`);
      toast({
        title: "Success!",
        description: `Proposal "${newTitle}" has been created.`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      
      // Reset form and refresh
      setNewTitle(""); 
      setNewDesc("");
    } catch (e: any) {
      console.error("Transaction error details:", e);
      
      // Try to extract a more user-friendly error message
      let errorMsg = e.message || "Failed to create proposal";
      
      // Check for specific error patterns
      if (errorMsg.includes("Failed to get a quorum")) {
        errorMsg = "Transaction validation failed. This may be due to a token type mismatch with the contract.";
      }
      
      setError(errorMsg);
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  // Add localStorage persistence
  useEffect(() => {
    // Load proposals from localStorage on initial render
    const savedProposals = localStorage.getItem('daoProposals');
    if (savedProposals) {
      try {
        const parsed = JSON.parse(savedProposals);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log("Loaded proposals from localStorage:", parsed);
          setProposals(parsed);
        }
      } catch (e) {
        console.error("Error parsing saved proposals:", e);
      }
    }
  }, []);

  // Save proposals to localStorage whenever they change
  useEffect(() => {
    if (proposals.length > 0) {
      console.log("Saving proposals to localStorage:", proposals);
      localStorage.setItem('daoProposals', JSON.stringify(proposals));
    }
  }, [proposals]);

  // Modified voting function to ensure state is properly updated
  const handleVote = async (proposalId: number, voteFor: boolean) => {
    try {
      setLoading(true);
      const coin = await pickPlhhCoin();
      console.log("Voting on proposal", proposalId);
      
      // Simple transaction
      const tx = new TransactionBlock();
      
      tx.moveCall({
        target: `${PACKAGE_ID}::plhh_dao::cast_vote`,
        arguments: [
          tx.object(DAO_STORAGE_ID), 
          tx.pure(proposalId), 
          tx.pure(voteFor), 
          tx.object(clockId), 
          tx.object(coin)
        ]
      });
      
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx
      });
      
      console.log("Vote cast successfully:", result);
      
      toast({
        title: "Vote Cast",
        description: `You voted ${voteFor ? "for" : "against"} proposal #${proposalId}.`,
      });
      
      // Update the local state immediately before fetching from blockchain
      setProposals(prevProposals => 
        prevProposals.map(p => {
          if (p.id === proposalId) {
            // Update the local state to reflect the vote
            return {
              ...p,
              votesFor: voteFor ? p.votesFor + 1 : p.votesFor,
              votesAgainst: !voteFor ? p.votesAgainst + 1 : p.votesAgainst,
              totalVoters: p.totalVoters + 1
            };
          }
          return p;
        })
      );
      
      // Refresh proposals from blockchain after a delay
      setTimeout(() => {
        fetchProposalsFromEvents();
      }, 2000);
    } catch (e: any) {
      console.error("Error casting vote:", e);
      setError(e.message || "Failed to cast vote");
      toast({
        variant: "destructive",
        title: "Vote Failed",
        description: e.message || "Failed to cast vote",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (proposalId: number) => {
    try {
      setLoading(true);
      console.log("Canceling proposal", proposalId);
      
      // Simple transaction
      const tx = new TransactionBlock();
      
      tx.moveCall({
        target: `${PACKAGE_ID}::plhh_dao::cancel_proposal`,
        arguments: [
          tx.object(DAO_CONFIG_ID), 
          tx.object(DAO_STORAGE_ID), 
          tx.pure(proposalId), 
          tx.object(clockId)
        ]
      });
      
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx
      });
      
      console.log("Proposal canceled successfully");
      
      toast({
        title: "Proposal Canceled",
        description: `Proposal #${proposalId} has been canceled.`,
      });
      
      // Update the local state immediately
      setProposals(prevProposals => 
        prevProposals.map(p => {
          if (p.id === proposalId) {
            return {
              ...p,
              isActive: false,
              isCanceled: true
            };
          }
          return p;
        })
      );
      
      // Refresh proposals from blockchain after a delay
      setTimeout(() => {
        fetchProposalsFromEvents();
      }, 2000);
    } catch (e: any) {
      console.error("Error canceling proposal:", e);
      setError(e.message || "Failed to cancel proposal");
      toast({
        variant: "destructive",
        title: "Cancel Failed",
        description: e.message || "Failed to cancel proposal",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExecute = async (proposalId: number) => {
    try {
      setLoading(true);
      console.log("Executing proposal", proposalId);
      
      // Simple transaction
      const tx = new TransactionBlock();
      
      tx.moveCall({
        target: `${PACKAGE_ID}::plhh_dao::execute_proposal`,
        arguments: [
          tx.object(DAO_STORAGE_ID), 
          tx.pure(proposalId), 
          tx.object(clockId)
        ]
      });
      
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx
      });
      
      console.log("Proposal executed successfully");
      
      toast({
        title: "Proposal Executed",
        description: `Proposal #${proposalId} has been executed successfully.`,
      });
      
      // Update the local state immediately
      setProposals(prevProposals => 
        prevProposals.map(p => {
          if (p.id === proposalId) {
            return {
              ...p,
              isActive: false,
              isExecuted: true
            };
          }
          return p;
        })
      );
      
      // Refresh proposals from blockchain after a delay
      setTimeout(() => {
        fetchProposalsFromEvents();
      }, 2000);
    } catch (e: any) {
      console.error("Error executing proposal:", e);
      setError(e.message || "Failed to execute proposal");
      toast({
        variant: "destructive",
        title: "Execution Failed",
        description: e.message || "Failed to execute proposal",
      });
    } finally {
      setLoading(false);
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
              className="relative z-20 h-screen overflow-auto flex flex-col items-center justify-center px-6 text-white text-center space-y-8 max-w-5xl mx-auto py-16"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              custom={8}
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#D4AF37] via-[#FFE066] to-[#D4AF37] bg-clip-text text-transparent">
                DAO Dashboard
              </h2>

              <ConnectButton 
                className="bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500 text-white font-bold rounded-lg px-6 py-2 shadow-md border border-yellow-600/60 hover:from-yellow-600 hover:to-yellow-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />

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

              {/* Two-column layout */}
              {wallet.connected && (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left column - Create proposals */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold text-xl text-white pb-6 text-left ">Create Proposal</h3>
                      <div className="border-b border-gray-700 w-full"></div>
                    </div>
                    <div className="w-full space-y-3">
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full px-4 py-2 rounded bg-white/10 backdrop-blur-sm border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                        style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.3)" }}
                      />
                      <textarea
                        value={newDesc}
                        onChange={(e) => setNewDesc(e.target.value)}
                        placeholder="Description"
                        className="w-full px-4 py-2 rounded bg-white/10 backdrop-blur-sm border border-[#D4AF37]/30 focus:border-[#D4AF37] focus:outline-none transition-all"
                        style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.3)" }}
                        rows={5}
                      />
                      <Button 
                        onClick={handleCreate} 
                        className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white hover:opacity-90 w-full"
                        style={{ boxShadow: "0 0 0 2px #D4AF37" }}
                        disabled={loading || !newTitle || !newDesc}
                      >
                        {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                        Create Proposal
                      </Button>
                    </div>
                  </div>
                  
                  {/* Right column - Proposals list */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl text-white pb-2">Proposals</h3>
                      <Button 
                        onClick={() => {
                          setLoading(true);
                          fetchProposalsFromEvents().finally(() => setLoading(false));
                        }}
                        className="bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600   hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500   text-amber-950 font-bold rounded-md"
                        size="sm"
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
                        <span>Refresh</span>
                      </Button>
                    </div>
                    <div className="border-b border-gray-700 w-full"></div>
                    
                    {proposals.length === 0 && !loading && (
                      <div className="w-full p-4 bg-white/10 backdrop-blur-sm rounded text-left" style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.3)" }}>
                        <p>Click "Refresh" to fetch the latest proposals from the blockchain.</p>
                        <p className="text-sm mt-2 text-gray-400">If you've just created a proposal, please wait a few seconds before refreshing.</p>
                      </div>
                    )}
                    
                    <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                      {proposals.map((p) => (
                        <div 
                          key={p.id} 
                          className="w-full p-4 bg-white/10 backdrop-blur-sm rounded text-left transition-all hover:bg-[#FFE066]/10"
                          style={{ boxShadow: "0 0 0 1px rgba(212,175,55,0.3)" }}
                        >
                          <h3 className="font-semibold text-[#FFE066]">#{p.id}: {p.title}</h3>
                          <p className="text-sm mb-2 text-white/80">{p.description}</p>
                          <div className="flex justify-between items-center text-xs text-gray-400 mb-3">
                            <div>
                              <span className="text-[#F59E0B]">👍 {p.votesFor}</span> · 
                              <span className="text-[#F7786B]"> 👎 {p.votesAgainst}</span> · 
                              <span> Voters: {p.totalVoters}</span>
                            </div>
                            <div>
                              {p.isActive ? (
                                <span className="bg-[#F59E0B]/20 text-[#F59E0B] px-2 py-1 rounded-full text-xs">Active</span>
                              ) : p.isExecuted ? (
                                <span className="bg-[#3B82F6]/20 text-[#3B82F6] px-2 py-1 rounded-full text-xs">Executed</span>
                              ) : p.isCanceled ? (
                                <span className="bg-[#F7786B]/20 text-[#F7786B] px-2 py-1 rounded-full text-xs">Canceled</span>
                              ) : (
                                <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs">Closed</span>
                              )}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Button 
                              onClick={() => handleVote(p.id, true)} 
                              disabled={!p.isActive || loading}
                              className={p.isActive ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white hover:opacity-90" : "bg-white/10 text-white/60"}
                              style={p.isActive ? { boxShadow: "0 0 0 1px #D4AF37" } : {}}
                              size="sm"
                            >
                              Vote For
                            </Button>
                            <Button 
                              onClick={() => handleVote(p.id, false)} 
                              disabled={!p.isActive || loading}
                              className={p.isActive ? "bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white hover:opacity-90" : "bg-white/10 text-white/60"}
                              style={p.isActive ? { boxShadow: "0 0 0 1px #D4AF37" } : {}}
                              size="sm"
                            >
                              Vote Against
                            </Button>
                            {p.isActive && (
                              <Button 
                                onClick={() => handleCancel(p.id)}
                                disabled={loading}
                                className="bg-[#F7786B]/20 text-[#F7786B] hover:bg-[#F7786B]/30"
                                style={{ boxShadow: "0 0 0 1px rgba(247,120,107,0.3)" }}
                                size="sm"
                              >
                                Cancel
                              </Button>
                            )}
                            {!p.isActive && !p.isExecuted && !p.isCanceled && (
                              <Button 
                                onClick={() => handleExecute(p.id)}
                                disabled={loading}
                                className="bg-[#3B82F6]/20 text-[#3B82F6] hover:bg-[#3B82F6]/30"
                                style={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.3)" }}
                                size="sm"
                              >
                                Execute
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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
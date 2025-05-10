import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient } from "@mysten/sui.js/client";

export const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!;
export const STAKE_POOL_ID = process.env.NEXT_PUBLIC_STAKE_POOL_ID!;
export const PLHH_TYPE = `${PACKAGE_ID}::plhh::PLHH`;

// Helper function to stake PLHH tokens
export async function createStakeTransaction({
  provider,
  walletAddress,
  stakingAmount, // in atomic units (already multiplied by 10^9)
  stakingDuration // in years (1-8)
}: {
  provider: SuiClient;
  walletAddress: string;
  stakingAmount: bigint;
  stakingDuration: number;
}) {
  // Fetch PLHH coins
  const { data: coins } = await provider.getCoins({
    owner: walletAddress,
    coinType: PLHH_TYPE
  });
  
  if (!coins.length) {
    throw new Error("No PLHH tokens found in wallet");
  }

  // Build transaction
  const tx = new TransactionBlock();
  
  // Set a higher gas budget for complex operations
  tx.setGasBudget(10_000_000);
  
  // Select and merge coins if needed to cover the stake amount
  const selectedCoins = [];
  let runningTotal = BigInt(0);
  
  for (const coin of coins) {
    const balance = BigInt(coin.balance);
    selectedCoins.push(coin.coinObjectId);
    runningTotal += balance;
    
    if (runningTotal >= stakingAmount) {
      break;
    }
  }
  
  if (runningTotal < stakingAmount) {
    throw new Error(`Insufficient PLHH balance. Have ${Number(runningTotal)/1e9}, need ${Number(stakingAmount)/1e9}`);
  }
  
  // Handle coin merging if needed
  let primaryCoin;
  
  if (selectedCoins.length === 1) {
    primaryCoin = tx.object(selectedCoins[0]);
  } else {
    // Merge all selected coins into the first one
    primaryCoin = tx.object(selectedCoins[0]);
    
    for (let i = 1; i < selectedCoins.length; i++) {
      tx.mergeCoins(primaryCoin, [tx.object(selectedCoins[i])]);
    }
  }
  
  // Split the exact amount needed for staking
  const [stakeCoin] = tx.splitCoins(primaryCoin, [tx.pure(stakingAmount)]);
  
  // Make the stake call with proper parameters
  tx.moveCall({
    target: `${PACKAGE_ID}::plhh::stake`,
    arguments: [
      tx.object(STAKE_POOL_ID),    // stake_pool
      tx.pure(stakingAmount),      // stake_amount
      tx.pure(stakingDuration),    // staking_duration
      stakeCoin                    // staker_tokens
    ]
  });
  
  return tx;
}

// Helper to claim staking rewards
export function createClaimRewardsTransaction({
  presaleConfigId
}: {
  presaleConfigId: string;
}) {
  const tx = new TransactionBlock();
  tx.setGasBudget(5_000_000);
  
  tx.moveCall({
    target: `${PACKAGE_ID}::plhh::claim_rewards`,
    arguments: [
      tx.object(STAKE_POOL_ID),      // stake_pool
      tx.object(presaleConfigId)      // config
    ]
  });
  
  return tx;
}

// Helper to unstake tokens
export function createUnstakeTransaction({
  stakeIndex
}: {
  stakeIndex: number;
}) {
  const tx = new TransactionBlock();
  tx.setGasBudget(5_000_000);
  
  tx.moveCall({
    target: `${PACKAGE_ID}::plhh::unstake`,
    arguments: [
      tx.object(STAKE_POOL_ID),  // stake_pool
      tx.pure(stakeIndex)        // stake_index
    ]
  });
  
  return tx;
}

// Helper to get estimated rewards (view function)
export async function getEstimatedRewards({
  provider,
  walletAddress
}: {
  provider: SuiClient;
  walletAddress: string;
}) {
  const tx = new TransactionBlock();
  
  tx.moveCall({
    target: `${PACKAGE_ID}::plhh::get_estimated_rewards`,
    arguments: [
      tx.object(STAKE_POOL_ID),
      tx.pure(walletAddress)
    ]
  });
  
  const result = await provider.devInspectTransactionBlock({
    transactionBlock: tx,
    sender: walletAddress
  });
  
  // Process and extract reward information from events
  const events = result.events || [];
  const rewardEvents = events.filter(e => e.type.includes("InfoEvent"));
  
  return {
    events: rewardEvents,
    // You'll need to extract the actual rewards from the events
    rewards: rewardEvents.length > 0 ? parseInt(rewardEvents[0].parsedJson?.value || '0') : 0
  };
}
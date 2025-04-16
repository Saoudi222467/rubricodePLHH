"use client"

import React, { useState } from "react"
import { TransactionBlock } from "@mysten/sui.js/transactions"
import { useWallet } from "@suiet/wallet-kit"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2 } from "lucide-react"
import { ConnectButton } from "@suiet/wallet-kit"
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID!
const PRESALE_CONFIG_ID = process.env.NEXT_PUBLIC_PRESALE_CONFIG_ID!
const CLOCK_OBJECT_ID = process.env.NEXT_PUBLIC_CLOCK_OBJECT_ID!
const HARD_CODED_PRICE_INFO_OBJECT_ID = process.env.NEXT_PUBLIC_PRICE_INFO_OBJECT_ID!

interface WalletType {
  connected: boolean
  address?: string
  getClient?: () => SuiClient
  signAndExecuteTransactionBlock: (params: {
    transactionBlock: TransactionBlock
  }) => Promise<any>
}

interface PurchaseTokensButtonProps {
  amount: string
  setAmount: (value: string) => void
  onPurchaseComplete?: () => void
  label?: string
  icon?: React.ReactNode
}

const PurchaseTokensButton: React.FC<PurchaseTokensButtonProps> = ({
  amount,
  setAmount,
  onPurchaseComplete,
  label = "Buy PLHH Tokens",
  icon,
}) => {
  const wallet = useWallet() as unknown as WalletType
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const purchaseTokens = async () => {
    if (!wallet.connected || !wallet.address) {
      setError("Please connect your wallet first")
      toast.error("Please connect your wallet first")
      return
    }
    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount")
      toast.error("Please enter a valid amount")
      return
    }

    setIsPurchasing(true)
    setError(null)

    try {
      const provider = wallet.getClient
        ? wallet.getClient()
        : new SuiClient({ url: getFullnodeUrl("mainnet") })

      const tx = new TransactionBlock()
      tx.setSender(wallet.address!)
      tx.setGasBudget(10000000)

      tx.moveCall({
        target: `${PACKAGE_ID}::plhh::purchase_tokens`,
        arguments: [
          tx.object(PRESALE_CONFIG_ID),
          tx.object(CLOCK_OBJECT_ID),
          tx.gas,
          tx.pure(Number(amount) * 1e9),
          tx.object(HARD_CODED_PRICE_INFO_OBJECT_ID),
        ],
      })

      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
      })

      console.log("Purchase successful:", result)
      toast.success("Purchase successful!")

      if (onPurchaseComplete) onPurchaseComplete()
      setAmount("")
    } catch (error) {
      console.error("Purchase failed:", error)
      const errMsg =
        error instanceof Error ? error.message : "Transaction failed"
      toast.error(`Purchase failed: ${errMsg}`)
      setError(errMsg)
    } finally {
      setIsPurchasing(false)
    }
  }

  return (
    <>
      <ToastContainer position="top-right" />
      <div className="space-y-4">
        {error && (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

<Button
  onClick={purchaseTokens}
  // disabled={
  //   isPurchasing ||
  //   !wallet.connected ||
  //   !amount.trim() ||
  //   isNaN(Number(amount)) ||
  //   Number(amount) <= 0
  // }
  className={
    `w-full flex items-center justify-center bg-[#db9207] hover:bg-[#db9207] text-black font-bold py-2 px-4 rounded-lg transition-opacity ` +
    (isPurchasing || !wallet.connected || !amount.trim() || isNaN(Number(amount)) || Number(amount) <= 0
      ? "opacity-100 cursor-not-allowed"
      : "opacity-100")
  }
>
  {isPurchasing ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Processing...
    </>
  ) : (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </>
  )}
</Button>

      </div>
    </>
  )
}

export default PurchaseTokensButton

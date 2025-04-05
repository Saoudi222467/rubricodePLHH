"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/lib/wallet-providers"
import { Wallet, LogOut } from "lucide-react"
import { useState, useEffect } from "react"

export function WalletStatus() {
  const wallet = useWallet()
  const [walletState, setWalletState] = useState({
    connected: false,
    walletAddress: null as string | null,
  })

  // Update local state when wallet context changes
  useEffect(() => {
    if (wallet) {
      setWalletState({
        connected: wallet.connected,
        walletAddress: wallet.walletAddress,
      })
    }
  }, [wallet])

  if (!walletState.connected) {
    return null
  }

  // Format wallet address for display (0x1234...5678)
  const formattedAddress = walletState.walletAddress
    ? `${walletState.walletAddress.substring(0, 6)}...${walletState.walletAddress.substring(
        (walletState.walletAddress as string).length - 4,
      )}`
    : ""

  return (
    <div className="flex items-center gap-2">
      <div className="rounded-lg border border-warm-gold/20 bg-mint-white/40 px-3 py-2 text-sm text-forest-green">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span>{formattedAddress}</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="border-warm-gold/20 text-forest-green hover:bg-warm-gold/10"
        onClick={() => wallet?.disconnectWallet()}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Disconnect
      </Button>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { WalletProvider, useWallet, walletProviders } from "@/lib/wallet-providers"
import { useRouter } from "next/navigation"

interface WalletDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function WalletDialog({ isOpen, onClose }: WalletDialogProps) {
  const [connecting, setConnecting] = useState(false)
  const [connectingProvider, setConnectingProvider] = useState<WalletProvider>(null)
  const router = useRouter()
  const wallet = useWallet()

  // Connect to wallet
  const handleConnectWallet = async (providerId: WalletProvider) => {
    setConnecting(true)
    setConnectingProvider(providerId)

    try {
      const success = await wallet.connectWallet(providerId) as unknown as boolean
      
      if (success) {
        onClose()
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Connection error:", error)
    } finally {
      setConnecting(false)
      setConnectingProvider(null)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-dark-text/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative mx-4 max-w-md overflow-hidden rounded-2xl border border-warm-gold/20 bg-mint-white/90 p-6 shadow-2xl shadow-warm-gold/10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-1 text-dark-text transition-colors hover:bg-silver/20 hover:text-dark-text"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-2xl font-bold text-transparent">
                Connect Wallet
              </h2>
              <p className="mt-2 text-sm text-dark-text">Choose a wallet provider to connect to PLHH Coin</p>
            </div>

            {/* Wallet options */}
            <div className="space-y-3">
              {walletProviders.map((provider) => (
                <motion.button
                  key={provider.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full rounded-xl border border-warm-gold/10 bg-mint-white p-4 text-left transition-colors hover:border-warm-gold/30 hover:bg-warm-gold/10"
                  onClick={() => handleConnectWallet(provider.id as WalletProvider)}
                  disabled={connecting}
                >
                  <div className="flex items-center">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-mint-white/80">
                      <Image src={provider.icon || "/placeholder.svg"} alt={provider.name} width={24} height={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-dark-text">{provider.name}</h3>
                      <p className="text-xs text-dark-text/70">{provider.description}</p>
                    </div>

                    {/* Loading indicator */}
                    {connecting && connectingProvider === provider.id && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-warm-gold border-t-transparent" />
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-xs text-dark-text/70">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
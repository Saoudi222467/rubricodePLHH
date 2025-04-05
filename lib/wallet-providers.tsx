"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { toast } from "sonner"

// Define wallet provider types
export type WalletProvider = "sui" | "suiet" | "ethos" | null

export interface WalletInfo {
  connected: boolean
  walletAddress: string | null
  provider: WalletProvider
  connectWallet: (provider: WalletProvider) => Promise<boolean>
  disconnectWallet: () => void
}

// Context for wallet providers
const WalletContext = createContext<WalletInfo>({
  connected: false,
  walletAddress: null,
  provider: null,
  connectWallet: async () => false,
  disconnectWallet: () => {},
})

export const useWallet = () => useContext(WalletContext)

export function WalletProviderContext({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [provider, setProvider] = useState<WalletProvider>(null)

  // Check if wallet is already connected on client-side
  useEffect(() => {
    const savedWallet = localStorage.getItem("walletConnection")
    if (savedWallet) {
      try {
        const walletData = JSON.parse(savedWallet)
        setConnected(walletData.connected)
        setWalletAddress(walletData.walletAddress)
        setProvider(walletData.provider)
      } catch (error) {
        console.error("Failed to parse saved wallet data:", error)
        localStorage.removeItem("walletConnection")
      }
    }
  }, [])

  // Save wallet connection state
  useEffect(() => {
    if (connected && walletAddress && provider) {
      localStorage.setItem(
        "walletConnection",
        JSON.stringify({
          connected,
          walletAddress,
          provider,
        })
      )
    }
  }, [connected, walletAddress, provider])

  // Connect to wallet
  const connectWallet = async (selectedProvider: WalletProvider): Promise<boolean> => {
    try {
      // Ensure secure connection in production
      if (process.env.NODE_ENV === "production" && window.location.protocol !== "https:") {
        toast.error("Wallet connection requires a secure HTTPS connection")
        return false
      }

      // Wait for the document to be fully loaded
      if (document.readyState !== "complete") {
        console.log("Waiting for document load event...")
        await new Promise(resolve => window.addEventListener("load", resolve))
      } else {
        console.log("Document already loaded")
      }

      // Check if the wallet extension is available (using event listener for Sui)
      const hasWallet = await checkWalletExtension(selectedProvider)
      if (!hasWallet) {
        toast.error(`${getProviderName(selectedProvider)} extension not detected`)
        return false
      }

      // Connect using wallet-specific functions
      let address = ""
      switch (selectedProvider) {
        case "sui":
          address = await connectSuiWallet()
          break
        case "suiet":
          address = await connectSuietWallet()
          break
        case "ethos":
          address = await connectEthosWallet()
          break
        default:
          throw new Error("Unknown wallet provider")
      }

      if (address) {
        setConnected(true)
        setWalletAddress(address)
        setProvider(selectedProvider)
        toast.success(`Connected to ${getProviderName(selectedProvider)}`)
        return true
      } else {
        throw new Error("Failed to get wallet address")
      }
    } catch (error) {
      console.error("Wallet connection error:", error)
      toast.error("Connection failed. Please try again.")
      return false
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    setConnected(false)
    setWalletAddress(null)
    setProvider(null)
    localStorage.removeItem("walletConnection")
    toast.info("Wallet disconnected")
  }

  // Helper to wait for a custom event (for Sui wallet initialization)
  const waitForSuiWalletEvent = (): Promise<boolean> => {
    return new Promise(resolve => {
      // Listen for the custom initialization event that Sui wallets might dispatch
      const onInitialized = () => {
        console.log("suiWallet:initialized event received")
        resolve(true)
      }
      window.addEventListener("suiWallet:initialized", onInitialized)
      // Fallback timeout in case event never fires
      setTimeout(() => {
        window.removeEventListener("suiWallet:initialized", onInitialized)
        resolve(false)
      }, 3000)
    })
  }

  // Improved wallet extension detection using polling, event listener, and debug logging
  const checkWalletExtension = async (provider: WalletProvider): Promise<boolean> => {
    if (typeof window === "undefined") return false

    // Initial delay to allow extensions to load
    await new Promise(resolve => setTimeout(resolve, 200))
    
    let isAvailable = false
    let retries = 5

    // For Sui wallet, try to catch the initialization event first
    if (provider === "sui") {
      isAvailable = await waitForSuiWalletEvent()
      console.log("Waited for suiWallet:initialized event:", isAvailable)
    }
    
    while (!isAvailable && retries > 0) {
      if (provider === "sui") {
        console.log("Checking for Sui Wallet - window.sui:", (window as any).sui)
        console.log("Checking for Sui Wallet - window.suiWallet:", (window as any).suiWallet)
        console.log("data-sui-wallet-available attribute:", document.documentElement.getAttribute("data-sui-wallet-available"))
        isAvailable = !!(
          (window as any).suiWallet ||
          (window as any).sui ||
          document.documentElement.getAttribute("data-sui-wallet-available") === "true"
        )
      } else if (provider === "suiet") {
        console.log("Checking for Suiet - window.suiet:", (window as any).suiet)
        isAvailable = !!((window as any).suiet)
      } else if (provider === "ethos") {
        console.log("Checking for Ethos - window.ethos:", (window as any).ethos)
        isAvailable = !!((window as any).ethos)
      }
      if (isAvailable) break
      console.log(`Wallet not detected yet. Retrying... (${retries} left)`)
      await new Promise(resolve => setTimeout(resolve, 500))
      retries--
    }
    return isAvailable
  }

  // Helper function to get a friendly provider name
  const getProviderName = (provider: WalletProvider): string => {
    switch (provider) {
      case "sui":
        return "Sui Wallet"
      case "suiet":
        return "Suiet"
      case "ethos":
        return "Ethos"
      default:
        return "Unknown"
    }
  }

  // Wallet-specific connection functions
  // Updated per the Sui Wallet Standard: use the unified connect() method.
  const connectSuiWallet = async (): Promise<string> => {
    try {
      // The standard specifies that the global object should be available as window.sui
      const suiWallet = (window as any).sui
      if (!suiWallet) {
        throw new Error("Sui wallet not found")
      }
      
      // Use the unified connect() method
      const response = await suiWallet.connect()
      console.log("Sui wallet connect response:", response)
      return response.accounts[0] || ""
    } catch (e) {
      console.error("Error connecting to Sui wallet:", e)
      throw e
    }
  }

  const connectSuietWallet = async (): Promise<string> => {
    try {
      const suiet = (window as any).suiet
      if (!suiet) {
        throw new Error("Suiet wallet not found")
      }
      
      const response = await suiet.connect()
      console.log("Suiet wallet connect response:", response)
      return response.accounts[0].address || ""
    } catch (e) {
      console.error("Error connecting to Suiet wallet:", e)
      throw e
    }
  }

  const connectEthosWallet = async (): Promise<string> => {
    try {
      const ethos = (window as any).ethos
      if (!ethos) {
        throw new Error("Ethos wallet not found")
      }
      
      const response = await ethos.connect()
      console.log("Ethos wallet connect response:", response)
      return response.address || ""
    } catch (e) {
      console.error("Error connecting to Ethos wallet:", e)
      throw e
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        walletAddress,
        provider,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Wallet provider data for UI
export const walletProviders = [
  {
    id: "sui",
    name: "Sui Wallet",
    icon: "/suiwallet.png",
    description: "Connect to Sui Wallet",
  },
  {
    id: "suiet",
    name: "Suiet",
    icon: "/suiet.avif",
    description: "Connect to Suiet Wallet",
  },
  {
    id: "ethos",
    name: "Ethos",
    icon: "/ethos.jpeg",
    description: "Connect to Ethos Wallet",
  },
]

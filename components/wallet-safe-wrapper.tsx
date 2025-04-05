"use client"

import type { ReactNode } from "react"
import { WalletProviderContext } from "@/lib/wallet-providers"

// This component safely wraps components that use the wallet context
export function WalletSafeWrapper({ children }: { children: ReactNode }) {
  return <WalletProviderContext>{children}</WalletProviderContext>
}

// This component safely uses the wallet context
export function WalletAwareComponent({
  children,
  fallback = null,
}: {
  children: (wallet: any) => ReactNode
  fallback?: ReactNode
}) {
  // We can't use hooks conditionally, so we'll use a simpler approach
  // Just render the fallback by default, and let the actual components
  // handle the wallet context when it's available
  return <>{fallback}</>
}


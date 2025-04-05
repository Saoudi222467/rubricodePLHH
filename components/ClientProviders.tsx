"use client";

import React, { StrictMode } from "react";
import { WalletProvider } from "@suiet/wallet-kit";

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <StrictMode>
      <WalletProvider>
        {children}
      </WalletProvider>
    </StrictMode>
  );
}

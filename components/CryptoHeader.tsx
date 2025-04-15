"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Wallet, Menu, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { useWallet } from "@/lib/wallet-providers";

export default function CryptoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [animateHeader, setAnimateHeader] = useState(false);
  const wallet = useWallet();
  const [walletState, setWalletState] = useState({
    connected: wallet.connected,
    walletAddress: wallet.walletAddress,
  });

  // Update wallet state when wallet context changes
  useEffect(() => {
    setWalletState({
      connected: wallet.connected,
      walletAddress: wallet.walletAddress,
    });
  }, [wallet?.connected, wallet?.walletAddress, wallet]);

  // Listen to scroll events to update header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    setAnimateHeader(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper to shorten wallet address (example: "0xa412b....08a7")
  const shortenAddress = (address: string | undefined) => {
    if (!address) return "";
    return address.slice(0, 6) + "...." + address.slice(-4);
  };

  // Render the wallet button differently based on connection status.
  // When disconnected, it shows the standard ConnectButton.
  // When connected, the balance and address text are shown above a smaller connected button.
  const renderWalletButton = (): React.ReactNode => {
    const status = walletState.connected ? "connected" : "disconnected";

    if (status === "disconnected") {
      return (
        <ConnectButton
          className="hidden md:flex bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 text-amber-950 font-bold border-none rounded-md px-6 py-6 h-11 shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)] transition-all duration-300 flex justify-center items-center border border-white shadow-sm whitespace-nowrap"
          style={{
            "--wkit-button-width": "auto",
            "--wkit-border-radius": "8px",
            height: "44px",
            minWidth: "120px",
          } as React.CSSProperties}
        >
          <Wallet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </ConnectButton>
      );
    } else {
      return (
        <div className="hidden md:flex flex-col items-center">
          {/* Text container with balance and wallet address */}
         
          {/* Connected button container */}
          <div
            className="wkit-connected-container bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 
              hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 text-amber-950 font-bold border-none rounded-md 
              px-6 py-6 h-11 shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] 
              hover:shadow-[0_0_30px_rgba(255,215,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)] transition-all duration-300 
              text-xs sm:text-sm flex justify-center items-center border border-white shadow-sm whitespace-nowrap"
          >
            <button className="wkit-connected-button flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-700 ${
        isScrolled
          ? "bg-gradient-to-r from-amber-950/95 via-yellow-900/95 to-amber-950/95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "bg-gradient-to-r from-amber-950 via-yellow-900 to-amber-950"
      } ${animateHeader ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
    >
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-700/30 via-yellow-300 to-amber-700/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/80 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
      </div>

      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4 group">
          <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.7)]">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-transparent to-yellow-300/20 rounded-full animate-[spin_8s_linear_infinite]"></div>
            <Image
              src="/images/plhh-logo.png"
              alt="PLHH Coin Logo"
              width={64}
              height={64}
              className="object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 text-3xl font-bold tracking-wide transition-all duration-500 group-hover:from-yellow-200 group-hover:via-amber-100 group-hover:to-yellow-300">
              PLHH Coin
            </div>
            <div className="text-amber-400/70 text-xs font-medium tracking-widest">PEACE LOVE &amp; HARMONY</div>
          </div>
        </div>

        <nav className="hidden xl:block">
          <ul className="flex space-x-1">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Tokenomics", href: "/tokenomics" },
              { name: "Roadmap", href: "/roadmap" },
              { name: "Community", href: "/community" },
            ].map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-5 py-3 text-amber-100 transition-all duration-300 rounded-md font-medium tracking-wide flex items-center hover:text-yellow-300 hover:bg-gradient-to-b hover:from-amber-800/30 hover:to-amber-900/30"
                >
                  {item.name}
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></div>
              </li>
            ))}
            <li className="relative group">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-5 py-3 text-amber-100 transition-all duration-300 rounded-md font-medium tracking-wide flex items-center hover:text-yellow-300 hover:bg-gradient-to-b hover:from-amber-800/30 hover:to-amber-900/30">
                    Utility
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gradient-to-b from-amber-900 to-amber-950 border border-yellow-600/30 text-amber-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_0_15px_rgba(255,215,0,0.3)] rounded-md overflow-hidden">
                  {[
                    { name: "Mint", href: "/mint" },
                    { name: "Staking", href: "/staking" },
                    { name: "NFT Marketplace", href: "/nft-marketplace" },
                    { name: "Governance", href: "/governance" },
                    { name: "Analytics", href: "/analytics" },
                  ].map((item) => (
                    <DropdownMenuItem
                      key={item.name}
                      className="hover:bg-gradient-to-r hover:from-amber-800/40 hover:to-amber-900/40 hover:text-yellow-300 cursor-pointer focus:bg-amber-800/40 focus:text-yellow-300 px-4 py-3 flex items-center justify-between border-b border-amber-800/30 last:border-0"
                    >
                      <Link href={item.href} className="w-full flex justify-between items-center">
                        <span>{item.name}</span>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300"></div>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href="/whitepaper.pdf"
            className="hidden lg:flex items-center text-amber-300 hover:text-yellow-300 transition-colors text-sm font-medium"
            target="_blank"
          >
            <ExternalLink className="mr-1 h-3.5 w-3.5" />
            Whitepaper
          </Link>

          <div className="flex items-center shrink-0">
            {/* Wallet Button - desktop */}
            <div className="hidden min-[851px]:block">{renderWalletButton()}</div>
          </div>

          <button
            className="xl:hidden text-amber-100 hover:text-yellow-300 bg-amber-800/20 hover:bg-amber-800/30 p-2 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="xl:hidden bg-gradient-to-b from-amber-900 to-amber-950 border-t border-yellow-700/30 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto py-5 px-4">
            <ul className="space-y-1">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Tokenomics", href: "/tokenomics" },
                { name: "Roadmap", href: "/roadmap" },
                { name: "Community", href: "/community" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 text-amber-100 hover:text-yellow-300 transition-colors rounded-md hover:bg-amber-800/30 font-medium"
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <div className="pl-4 mt-1 border-l-2 border-amber-700/50 ml-4 space-y-1">
                  {[
                    { name: "Mint", href: "/mint" },
                    { name: "Staking", href: "/staking" },
                    { name: "NFT Marketplace", href: "/nft-marketplace" },
                    { name: "Governance", href: "/governance" },
                    { name: "Analytics", href: "/analytics" },
                  ].map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between px-4 py-2 text-amber-200/70 hover:text-yellow-300 transition-colors rounded-md hover:bg-amber-800/20 text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </li>
              <li className="pt-4">
                <div className="pt-2">{renderWalletButton()}</div>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

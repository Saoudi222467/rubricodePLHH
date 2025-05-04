"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Wallet,
  Menu,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  useEffect(() => {
    setWalletState({
      connected: wallet.connected,
      walletAddress: wallet.walletAddress,
    });
  }, [wallet?.connected, wallet?.walletAddress]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    setAnimateHeader(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderWalletButton = () => {
    if (!walletState.connected) {
      return (
        <ConnectButton
          className="hidden md:flex bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 text-amber-950 font-bold border-none rounded-md px-6 py-6 h-11 shadow-[0_0_20px_rgba(255,215,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)] transition-all duration-300"
          style={
            {
              "--wkit-button-width": "auto",
              "--wkit-border-radius": "8px",
              height: "44px",
              minWidth: "120px",
            } as React.CSSProperties
          }
        >
          <Wallet className="mr-1 h-4 w-4" />
          <span>Connect Wallet</span>
        </ConnectButton>
      );
    }

    return (
      <div className="hidden md:flex flex-col items-center">
        <div className="wkit-connected-container bg-gradient-to-r from-yellow-600 via-amber-500 to-yellow-600 hover:from-yellow-500 hover:via-amber-400 hover:to-yellow-500 text-amber-950 font-bold border-none rounded-md px-6 py-6 h-11 hover:shadow-[0_0_30px_rgba(255,215,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.6)] transition-all duration-300 text-xs sm:text-sm border border-white shadow-sm whitespace-nowrap">
          <button className="wkit-connected-button flex items-center">
            <Wallet className="mr-2 h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Tokenomics", href: "/tokenomics" },
    // { name: "Roadmap", href: "/roadmap" },
    // { name: "Community", href: "/community" },
    { name: "Guardians of Infinity", href: "/guardians-of-infinity" },
  ];

  return (
    <header
      className={`sticky top-0 z-[100] w-full transition-all duration-700 ${
        isScrolled
          ? "bg-gradient-to-r from-amber-950/95 via-yellow-900/95 to-amber-950/95 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md"
          : "bg-gradient-to-r from-amber-950 via-yellow-900 to-amber-950"
      } ${
        animateHeader
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0"
      }`}
    >
      {/* Top accent bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-amber-700/30 via-yellow-300 to-amber-700/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/80 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
      </div>

      {/* Main header: NO horizontal padding */}
      <div className="container mx-auto flex h-20 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4 group">
          <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-[0_0_20px_rgba(255,215,0,0.5)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.7)]">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/20 via-transparent to-yellow-300/20 rounded-full animate-[spin_8s_linear_infinite]" />
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
            <div className="text-amber-400/70 text-xs font-medium tracking-widest">
              PEACE LOVE &amp; HARMONY
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:block">
          <ul className="flex space-x-1">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-5 py-3 text-amber-100 transition-all duration-300 rounded-md font-medium tracking-wide whitespace-nowrap flex items-center hover:text-yellow-300 hover:bg-gradient-to-b hover:from-amber-800/30 hover:to-amber-900/30"
                >
                  {item.name}
                </Link>
                <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300" />
              </li>
            ))}
            {/* Utility Dropdown */}
            <li className="relative group">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-5 py-3 text-amber-100 transition-all duration-300 rounded-md font-medium tracking-wide flex items-center hover:text-yellow-300 hover:bg-gradient-to-b hover:from-amber-800/30 hover:to-amber-900/30">
                    Utility
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-gradient-to-b from-amber-900 to-amber-950 border border-yellow-600/30 text-amber-100 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3),0_0_15px_rgba(255,215,0,0.3)] rounded-md overflow-hidden"
                >
                  {[
                    { name: "Mint", href: "/mint" },
                    { name: "Staking", href: "/staking" },
                    { name: "DAO", href: "/dao" },
                    // { name: "NFT Marketplace", href: "/nft-marketplace" },
                    { name: "Governance", href: "/governance" },
                    // { name: "Analytics", href: "/analytics" },
                  ].map((item) => (
                    <DropdownMenuItem key={item.name}>
                      <Link
                        href={item.href}
                        className="w-full px-4 py-3 flex items-center justify-between hover:bg-amber-800/40 hover:text-yellow-300 text-sm font-medium border-b border-amber-800/30 last:border-0"
                      >
                        <span>{item.name}</span>
                        <ChevronRight className="h-4 w-4 opacity-50" />
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-yellow-300/0 via-yellow-300 to-yellow-300/0 group-hover:w-4/5 group-hover:left-[10%] transition-all duration-300" />
            </li>
          </ul>
        </nav>

        {/* Wallet & Mobile Toggle */}
        <div className="flex items-center gap-5">
          <Link
            href="/whitepaper.pdf"
            className="hidden lg:flex items-center text-amber-300 hover:text-yellow-300 transition-colors text-sm font-medium whitespace-nowrap"
            target="_blank"
          >
            <ExternalLink className="mr-1 h-4 w-4" />
            Whitepaper
          </Link>
          {renderWalletButton()}
          <button
            className="xl:hidden text-amber-100 hover:text-yellow-300 bg-amber-800/20 hover:bg-amber-800/30 p-2 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown — no horizontal padding */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-gradient-to-b from-amber-900 to-amber-950 border-t border-yellow-700/30 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5)]">
          <div className="container mx-auto py-5">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex justify-between items-center px-4 py-3 text-amber-100 whitespace-nowrap hover:text-yellow-300 transition-colors rounded-md hover:bg-amber-800/30 font-medium"
                  >
                    {item.name}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                </li>
              ))}
              <li className="pt-4">{renderWalletButton()}</li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Wallet } from "lucide-react" // or your custom wallet icon if available
import { WalletDialog } from "@/components/sections/wallet-dialog"
import { useWallet } from "@/lib/wallet-providers"

// Import Suiet Wallet Kit's ConnectButton and its stylesheet
import { ConnectButton } from "@suiet/wallet-kit"
import "@suiet/wallet-kit/style.css"
import "@/styles/globals.css"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Tokenomics", href: "/#tokenomics" },
  { name: "Roadmap", href: "/#roadmap" },
  { name: "Community", href: "/#community" },
  {
    name: "Utility",
    href: "",
    hasDropdown: true,
    items: [
      { name: "Minting", href: "/dashboard" },
      { name: "Staking", href: "/dashboard#staking" },
      { name: "Governance", href: "/governance#proposals" },
    ],
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const wallet = useWallet()
  const [walletState, setWalletState] = useState({
    connected: wallet.connected,
    walletAddress: wallet.walletAddress,
  })

  // Assume wallet context is available
  const walletContextAvailable = true

  // Update local state when wallet context changes
  useEffect(() => {
    setWalletState({
      connected: wallet.connected,
      walletAddress: wallet.walletAddress,
    })
  }, [wallet?.connected, wallet?.walletAddress, wallet])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDropdown = (name: string | null) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  // Use Suiet Wallet Kit's ConnectButton with custom styling.
  // This button renders the default connection functionality but with your custom classes.
  const renderWalletButton = (): React.ReactNode => {
    return (
      <ConnectButton
        className="bg-gradient-to-r from-forest-green to-aqua-blue text-mint-white transition-all hover:from-forest-green hover:to-aqua-blue/90 text-xs sm:text-sm px-2 sm:px-4 rounded flex justify-center align-center border border-white shadow-lg whitespace-nowrap"
        style={
          {
            "--wkit-button-width": "auto",
            "--wkit-border-radius": "8px",
            height: "44px",
            minWidth: "120px",
            "@media (min-width: 640px)": {
              height: "44px",
              minWidth: "180px",
            },
          } as React.CSSProperties
        }
      >
        <Wallet className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
        {status === "connected" ? (
          <span className="hidden sm:inline">Wallet Connected</span>
        ) : (
          <span className="hidden sm:inline">Connect Wallet</span>
        )}
        {status === "connected" ? (
          <span className="sm:hidden">Connected</span>
        ) : (
          <span className="sm:hidden">Connect</span>
        )}
      </ConnectButton>
    )
  }

  return (
    <>
      <header
        className={`fixed z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-mint-white/60 backdrop-blur-md top-[0px] duration-0"
            : "bg-mint-white/60 backdrop-blur-md top-[40px] duration-0"
        }`}
      >
        <Container>
          <div className="flex h-14 sm:h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-1 sm:space-x-2 shrink-0">
              <Image
                src="/logo-main.png"
                alt="PLHH Coin"
                width={40}
                height={40}
                className="h-8 w-8 sm:h-10 md:h-12 sm:w-10 md:w-12"
              />
              <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text font-montserrat text-lg sm:text-xl md:text-2xl font-bold text-transparent">
                PLHH Coin
              </span>
            </Link>

            {/* Desktop Navigation - only this part can wrap */}
            <div className="max-[850px]:hidden flex-1 mx-2 sm:mx-4 items-center justify-center">
              <nav className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                {navItems.map((item) => (
                  <div key={item.name} className="relative group">
                    {item.hasDropdown ? (
                      <>
                        <button
                          className="flex items-center space-x-1 text-sm sm:text-base md:text-lg text-dark-text transition-colors hover:text-white"
                          onClick={() => toggleDropdown(item.name)}
                        >
                          {item.name}
                          <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute left-0 mt-2 w-40 bg-mint-white/90 rounded-md shadow-lg"
                            >
                              <div className="flex flex-col space-y-2 p-2">
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className="block rounded-md px-4 py-2 text-sm text-dark-text transition-colors hover:bg-warm-gold hover:text-dark-text"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-sm sm:text-base md:text-lg text-dark-text transition-colors hover:text-white"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Right side with wallet button and mobile menu */}
            <div className="flex items-center shrink-0">
              {/* Wallet Button - desktop */}
              <div className="hidden min-[851px]:block">{renderWalletButton()}</div>

              {/* Mobile Menu Button */}
              <button className="min-[851px]:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-dark-text" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-dark-text" />
                )}
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute left-0 right-0 bg-mint-white/95 px-4 py-2 backdrop-blur-md min-[851px]:hidden"
            >
              <nav className="flex flex-col space-y-4 py-4">
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.hasDropdown ? (
                      <>
                        <button
                          className="flex w-full justify-between items-center text-dark-text transition-colors hover:text-forest-green"
                          onClick={() => toggleDropdown(item.name)}
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${openDropdown === item.name ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 space-y-2 pl-4"
                            >
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-sm text-dark-text transition-colors hover:bg-warm-gold hover:text-dark-text"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-dark-text transition-colors hover:text-forest-green"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile Wallet Button */}
                <div className="pt-2">{renderWalletButton()}</div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Wallet Connection Dialog */}
      <WalletDialog isOpen={isWalletDialogOpen} onClose={() => setIsWalletDialogOpen(false)} />
    </>
  )
}


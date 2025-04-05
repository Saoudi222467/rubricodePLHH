"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/ui/container"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    items: [
      { name: "Overview", href: "/overview" },
      { name: "Purchase and Trading", href: "/analytics" },
      { name: "Staking and Rewards", href: "/reports" },
    ],
  },
  {
    name: "Lands",
    href: "#about",
    items: [
      { name: "Explore", href: "/lands/explore" },
      { name: "Marketplace", href: "/lands/marketplace" },
    ],
  },
  {
    name: "Governance",
    href: "/governance",
    items: [
      { name: "Proposals", href: "/governance#proposals" },
      { name: "Voting", href: "/governance#proposals" },
    ],
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleDropdownToggle = (navItem: string) => {
    setActiveDropdown(activeDropdown === navItem ? null : navItem)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-mint-white/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="logo-main.png" alt="PLHH Coin" width={40} height={40} className="h-8 w-8" />
            <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text font-montserrat text-xl font-bold text-transparent">
              PLHH Coin
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <button
                  onClick={() => handleDropdownToggle(item.name)}
                  className="flex items-center space-x-1 text-sm text-dark-text transition-colors hover:text-forest-green"
                >
                  <span>{item.name}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                  />
                </button>
                <DropdownMenu items={item.items} isOpen={activeDropdown === item.name} setActiveDropdown={setActiveDropdown} />

              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6 text-dark-text" /> : <Menu className="h-6 w-6 text-dark-text" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 right-0 bg-mint-white/95 px-4 py-2 backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col space-y-4 py-4">
              {navItems.map((item) => (
                <div key={item.name} className="space-y-2">
                  <button
                    onClick={() => handleDropdownToggle(item.name)}
                    className="flex w-full items-center justify-between text-dark-text transition-colors hover:text-forest-green"
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="ml-4 space-y-2"
                      >
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-dark-text transition-colors hover:text-forest-green"
                            onClick={() => {
                              setActiveDropdown(null)
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const DropdownMenu = ({
  items,
  isOpen,
  setActiveDropdown, // <-- Accept as a prop
}: {
  items: (typeof navItems)[0]["items"];
  isOpen: boolean;
  setActiveDropdown: React.Dispatch<React.SetStateAction<string | null>>; // <-- Type for setActiveDropdown
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute left-0 mt-2 w-48 rounded-md bg-mint-white/95 py-2 backdrop-blur-md"
      >
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 text-sm text-dark-text transition-colors hover:bg-forest-green hover:text-mint-white"
            onClick={() => setActiveDropdown(null)} // <-- Now this works!
          >
            {item.name}
          </Link>
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);



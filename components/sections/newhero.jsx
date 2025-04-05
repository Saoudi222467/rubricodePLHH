"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Image from "next/image";
import { ArrowRight, Coins, Globe2 } from "lucide-react";
import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { WalletDialog } from "@/components/sections/wallet-dialog";
import { useWallet } from "@/lib/wallet-providers";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [isWalletDialogOpen, setIsWalletDialogOpen] = useState(false);
  const router = useRouter();

  // Initialize wallet context and connection status
  const wallet = useWallet();
  const [walletState, setWalletState] = useState({
    connected: wallet ? wallet.connected : false,
  });
  const walletContextAvailable = !!wallet;

  useEffect(() => {
    if (wallet) {
      setWalletState({
        connected: wallet.connected,
      });
    }
  }, [wallet]);

  const openWalletDialog = () => {
    setIsWalletDialogOpen(true);
  };

  const handleMainButtonClick = () => {
    router.push("/dashboard");
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url(/bghero2.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#f0fff4] bg-opacity-40"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-screen items-center justify-center sm:justify-start">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left column - Text content */}
            <div className="order-2 md:order-1">
              {/* Stats */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap text-center sm:text-left gap-4 mt-4 sm:mt-6 md:mt-8 mb-4 stats_justify_center "
              >
                {[
                  { label: "Market Cap", value: "$1M+", icon: Coins },
                  { label: "Holders", value: "5,000+", icon: Globe2 },
                  { label: "Lands", value: "150+", icon: Globe2 },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 rounded-full border border-warm-gold/20 bg-mint-white/40 px-4 py-2 backdrop-blur-sm"
                  >
                    <stat.icon className="h-4 w-4 text-forest-green" />
                    <span className="text-sm font-medium text-dark-text">
                      {stat.value}
                    </span>
                    <span className="text-xs text-dark-text/70">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Text content */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4 text-center sm:text-left"
              >
                <h1 className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text font-montserrat text-5xl font-bold tracking-tight text-transparent text-center sm:text-left text-white">
                Peace, Love & Harmony for more Humanity
                </h1>
                <p className="max-w-xl text-lg text-dark-text md:text-xl text-white">
                  Revolutionizing the future through
                  blockchain technology and community-driven harmony
                </p>
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Button
                  size="lg"
                  className="group relative overflow-hidden bg-gradient-to-r from-warm-gold to-earthy-copper text-dark-text transition-all hover:scale-105 hover:from-warm-gold hover:to-earthy-copper/90 font-semibold shadow-lg"
                  onClick={handleMainButtonClick}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.5,
                    }}
                  />
                  <Link href="/dashboard">
                    <span className="relative z-10 flex items-center gap-2 cursor-pointer">
                      Join the Movement
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-forest-green/20 text-forest-green transition-all hover:scale-105 hover:bg-forest-green/20 hover:text-black font-medium shadow-lg"
                >
                  Whitepaper
                </Button>
              </motion.div>
            </div>

            {/* Right column - Logo/Image */}
            <div className="order-1 md:order-2 flex justify-center">
              <motion.div
                style={{ y, opacity }}
                className="relative flex items-center justify-center"
              >
                {/* Main logo */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="relative z-20 w-64 md:w-80"
                >
                  <Image
                    src="/logo-main.png"
                    alt="PLHH Coin"
                    width={500}
                    height={500}
                    className="h-auto w-full drop-shadow-[0_0_35px_rgba(212,175,55,0.3)]"
                    priority
                  />
                </motion.div>

                {/* Rotating background logo */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{
                    scale: [0.9, 1.1, 0.9],
                    opacity: [0, 0.15, 0],
                    rotateZ: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="absolute z-10 w-72 md:w-96 blur-sm"
                >
                  <Image
                    src="/background-logo.png"
                    alt="PLHH Coin Background"
                    width={100}
                    height={100}
                    className="h-auto w-full opacity-45"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="h-6 w-px bg-gradient-to-b from-forest-green/50 to-transparent" />
            <span className="text-xs text-dark-text">Scroll to explore</span>
          </div>
        </motion.div>
      </Container>

      {/* Wallet Connection Dialog */}
      <WalletDialog
        isOpen={isWalletDialogOpen}
        onClose={() => setIsWalletDialogOpen(false)}
      />
    </section>
  );
}

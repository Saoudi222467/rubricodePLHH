'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import Image from 'next/image'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { ArrowRight, Coins, Globe2 } from 'lucide-react'

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-neutral-900/50 to-black">
      
      
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,215,0,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,215,0,0.1),transparent_50%)]" />
      </div>

      <Container className="relative z-10">
        <div className="flex min-h-screen flex-col items-center justify-center">
          {/* Floating stats */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="top-32 flex w-full flex-wrap justify-center gap-4 px-4 mb-10"
          >
            {[
              { label: 'Market Cap', value: '$1M+', icon: Coins },
              { label: 'Holders', value: '5,000+', icon: Globe2 },
              { label: 'Lands', value: '150+', icon: Globe2 }
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-full border border-yellow-500/20 bg-black/40 px-4 py-2 backdrop-blur-sm"
              >
                <stat.icon className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">{stat.value}</span>
                <span className="text-xs text-neutral-400">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Main logo section */}
          <motion.div style={{ y, opacity }} className="relative mb-8 flex w-full items-center justify-center">
            {/* Main logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative z-20 w-64 md:w-80"
            >
              <Image
                src="logo-main.png"
                alt="PLHH Coin"
                width={500}
                height={500}
                className="h-auto w-full drop-shadow-[0_0_35px_rgba(255,215,0,0.3)]"
                priority
              />
            </motion.div>
            
            {/* Rotating background logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: [0.9, 1.1, 0.9],
                opacity: [0, 0.15, 0],
                rotateZ: [0, 360]
              }}
              transition={{ 
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute z-10 w-72 md:w-96 blur-sm"
            >
              <Image
                src="background-logo.png"
                alt="PLHH Coin Background"
                width={100}
                height={100}
                className="h-auto w-full opacity-45"
              />
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative space-y-4 text-center"
          >
            <h1 className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text px-4 font-montserrat text-5xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
              Peace Love & Harmony
            </h1>
            <p className="mx-auto max-w-2xl px-4 text-lg text-neutral-300 md:text-xl">
              For more Humanity - Revolutionizing the future through blockchain technology and community-driven harmony
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
              className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 text-black transition-all hover:scale-105 hover:from-amber-600 hover:to-yellow-600"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Join the Movement
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-500/20 text-yellow-500 transition-all hover:scale-105 hover:bg-yellow-500/10"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8  -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-px bg-gradient-to-b from-yellow-500/50 to-transparent" />
              <span className="text-xs text-neutral-500">Scroll to explore</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}


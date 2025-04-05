"use client"

import { useState, useEffect, useRef } from "react"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion, useInView, useAnimation } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Counter component for animating numbers
function Counter({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
}: { value: number; duration?: number; decimals?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (inView) {
      let startTime: number | undefined
      let animationFrame: number | null = null

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * value)

        setCount(currentCount)

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        } else {
          setCount(value)
        }
      }

      animationFrame = requestAnimationFrame(animate)

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame)
        }
      }
    }
  }, [inView, value, duration])

  return (
    <div ref={ref} className="font-montserrat text-4xl md:text-5xl font-bold">
      <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
        {prefix}
        {count.toLocaleString(undefined, { maximumFractionDigits: decimals })}
        {suffix}
      </span>
    </div>
  )
}

// Falling Petal Component
function FallingPetal({ delay = 0 }) {
  const petalTypes = [
    "/petal1.svg", // Replace with actual petal SVG paths
    "/petal2.svg",
    "/flower1.svg",
    "/leaf1.svg",
  ]

  const randomPetal = petalTypes[Math.floor(Math.random() * petalTypes.length)]
  const startPositionX = `${Math.random() * 100}%`
  const endPositionX = `${Math.random() * 100}%`
  const size = 10 + Math.random() * 20 // Random size between 10px and 30px
  const duration = 8 + Math.random() * 7 // Random duration between 8s and 15s
  const rotation = Math.random() * 360 // Random initial rotation

  return (
    <motion.div
      className="absolute top-0 z-0 opacity-60"
      style={{
        left: startPositionX,
        width: size,
        height: size,
      }}
      initial={{ y: -100, rotate: rotation, opacity: 0.8 }}
      animate={{
        y: "110vh",
        x: [startPositionX, endPositionX],
        rotate: rotation + 360,
        opacity: [0.8, 0.6, 0.4, 0.2, 0],
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 2,
      }}
    >
      {/* Actual petal/leaf/flower SVG - using placeholder until SVGs are created */}
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {randomPetal === "/petal1.svg" ? (
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#F28E8E"
            fillOpacity="0.6"
          />
        ) : randomPetal === "/petal2.svg" ? (
          <path
            d="M20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z"
            fill="#5FB9C3"
            fillOpacity="0.6"
          />
        ) : randomPetal === "/flower1.svg" ? (
          <path
            d="M12 2L14.5 9.5H22L16 14L18.5 22L12 17.5L5.5 22L8 14L2 9.5H9.5L12 2Z"
            fill="#BFE4D0"
            fillOpacity="0.7"
          />
        ) : (
          <path d="M6 3C10 10 18 10 21 3C21 16 6 22 3 15C3 8 12 8 6 3Z" fill="#487D58" fillOpacity="0.6" />
        )}
      </svg>
    </motion.div>
  )
}

export function MetaverseMapSection() {
  const [petals, setPetals] = useState<number[]>([])

  useEffect(() => {
    // Create array for multiple petals with different delays
    setPetals(Array.from({ length: 20 }, (_, i) => i))
  }, [])

  const metaverseStats = [
    {
      title: "Total Land Area",
      value: 10000,
      suffix: " sq km",
      description: "Virtual land spanning across multiple regions",
    },
    {
      title: "Available Lands",
      value: 5000,
      suffix: "+",
      description: "Unique plots available after launch",
    },
    {
      title: "Starting Price",
      value: 100,
      prefix: "$",
      description: "Per square foot of virtual land",
    },
    {
      title: "Holder Rewards",
      value: 15,
      suffix: "%",
      description: "Annual yield for landholders",
    },
  ]

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Animated gradient backgrounds */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(95,185,195,0.15),transparent_100%)]" />
      </div>

      {/* Falling Petals Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {petals.map((_, index) => (
          <FallingPetal key={index} delay={index * 0.5} />
        ))}
      </div>

      {/* Butterfly GIF Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <img src="/butterfly.gif" alt="Flying Butterfly" className="absolute top-8 left-[30%] w-20 h-20" />
      </div>

      <Container className="relative z-10">
        <Reveal width="100%" className="w-full">
          <h2 className="mb-3 text-center font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
              PLHH Metaverse World
            </span>
          </h2>
          <p className="text-center text-dark-text text-xl mb-4">Where Vision Becomes Experience.</p>
        </Reveal>

        <Reveal width="100%">
          <div className="max-w-3xl mx-auto text-left mb-12">
            <p className="text-dark-text text-lg mb-4">
              Enter a new kind of digital world – one built on peace, love, and harmony. The PLHH Metaverse is not just
              a space. It's a living, breathing ecosystem of community, creativity, and conscious commerce.
            </p>

            <ul className="text-dark-text text-lg space-y-2 max-w-2xl text-left list-none">
              <li className="flex items-start">
                <span className="mr-2">🌱</span>
                <span>Own virtual land with real-world impact.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🫂</span>
                <span>Connect with like-minded souls across the globe.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🎨</span>
                <span>
                  Create, exchange, and grow in a decentralized world that mirrors the values of the new earth.
                </span>
              </li>
            </ul>

            <p className="text-dark-text text-lg mt-4">
              Built on blockchain. Powered by love.
              <br />
              This is more than technology.
              <br />
              It's the next dimension of freedom, unity, and shared evolution.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12 hover:border-aqua-blue">
          {metaverseStats.map((stat, index) => (
            <Reveal key={index} width="100%">
              <motion.div className="group relative rounded-2xl border-2 border-[#a67c00] bg-mint-white/80 backdrop-blur-lg shadow-lg transition-all duration-300 group-hover:border-aqua-blue group-hover:shadow-xl group-hover:shadow-forest-green/30">
                <Card className="bg-transparent shadow-none">
                  <CardContent className="p-6 text-center">
                    <Counter value={stat.value} prefix={stat.prefix || ""} suffix={stat.suffix || ""} />
                    <h3 className="text-forest-green font-semibold text-xl mt-2 mb-3">{stat.title}</h3>
                    <p className="text-dark-text">{stat.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal width="100%">
          <div className="flex justify-center">
            <Link href="/metaverse">
              <Button
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-warm-gold to-earthy-copper text-dark-text transition-all hover:scale-105 hover:from-warm-gold hover:to-earthy-copper/90"
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

                <span className="relative z-10 flex items-center gap-2">
                  Explore Metaverse
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}


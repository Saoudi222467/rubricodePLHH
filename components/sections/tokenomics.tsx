"use client"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useState } from "react"

// Define the type for tokenomics data
interface TokenomicsData {
  category: string
  percentage: number
  description: string
  color: string
}

const tokenomics: TokenomicsData[] = [
  {
    category: "Presale & Staking Rewards",
    percentage: 44,
    description: "440M PLHH",
    color: "#D4AF37", // Warm Gold
  },
  {
    category: "Ecosystem Development",
    percentage: 22,
    description: "220M PLHH",
    color: "#5fb9c3", // Soft Aqua Blue
  },
  {
    category: "Liquidity Pool",
    percentage: 11,
    description: "110M PLHH",
    color: "#6A994E", // Muted Sage Green
  },
  {
    category: "Community Projects",
    percentage: 11,
    description: "110M PLHH",
    color: "#f77366", // Peach Coral
  },
  {
    category: "Team Advisors",
    percentage: 11,
    description: "110M PLHH",
    color: "#87CEEB", // Calm Sky Blue
  },
  {
    category: "Gifts",
    percentage: 1,
    description: "10M PLHH",
    color: "#B87333", // Earthy Copper
  },
]

export function TokenomicsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean
    payload?: any[]
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-mint-white/80 border-2 border-[#a67c00] rounded-lg p-3 shadow-lg pointer-events-none backdrop-blur-lg">
          <p className="font-semibold text-forest-green">{payload[0].name}</p>
          <p className="text-dark-text">{`${payload[0].value}%`}</p>
          <p className="text-sm text-dark-text">
            {tokenomics.find((item) => item.category === payload[0].name)?.description}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <section className="relative py-20 overflow-hidden" id="tokenomics">
      {/* Overlay for content visibility */}
      <div className="absolute inset-0 bg-mint-white backdrop-blur-sm"></div>
      {/* Water Ripple Effect */}
      <div className="absolute inset-0 water-ripple pointer-events-none"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,rgba(95,185,195,0.15),transparent_100%)]"></div>
      </div>

      <Container className="relative z-10 flex flex-col justify-center items-center">
        <Reveal>
          <h2 className="mb-12 text-center font-montserrat text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
              Token Distribution
            </span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Pie Chart Section */}
          <Reveal className="w-full">
            <motion.div className="group">
              <Card className="w-full rounded-2xl border-2 border-[#a67c00] bg-mint-white/80 backdrop-blur-lg shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-center font-montserrat text-xl font-semibold text-forest-green mb-4">
                    Distribution Overview
                  </h3>
                  <div className="w-full" style={{ minHeight: "300px" }}>
                    <ResponsiveContainer width="100%" height={400}>
                      <PieChart>
                        <Pie
                          data={tokenomics}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="percentage"
                          nameKey="category"
                          onMouseEnter={onPieEnter}
                          labelLine={false}
                        >
                          {tokenomics.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.color}
                              stroke="rgba(0,0,0,0.3)"
                              style={{
                                filter: `drop-shadow(0px 0px 8px ${entry.color}80)`,
                                transform: index === activeIndex ? "scale(1.05)" : "scale(1)",
                                transition: "transform 0.3s ease-out",
                              }}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          wrapperStyle={{ paddingTop: "10px" }}
                          formatter={(value) => <span className="text-sm text-dark-text font-medium">{value}</span>}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </Reveal>

          {/* Bar Chart Section */}
          <div className="mx-auto max-w-4xl w-full">
            <motion.div className="group">
              <Card className="w-full rounded-2xl border-2 border-[#a67c00] bg-mint-white/80 backdrop-blur-lg shadow-lg transition-all duration-300">
                <CardContent className="w-full p-6">
                  <h3 className="text-center font-montserrat text-xl font-semibold text-forest-green mb-4">
                    Allocation Breakdown
                  </h3>
                  <div className="w-full space-y-6">
                    {tokenomics.map((item, index) => (
                      <Reveal key={index} width="100%" className="w-full">
                        <motion.div
                          whileHover={{
                            scale: 1.03,
                            borderColor: "var(--aqua-blue)",
                            boxShadow:
                              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                          }}
                          className="w-full rounded-lg border-2 border-[#a67c00]/70 bg-mint-white/50 p-4 shadow-md transition-all duration-300"
                        >
                          <div className="mb-2 flex flex-wrap items-center justify-between">
                            <h3 className="font-montserrat text-lg font-semibold text-forest-green">
                              {item.category}
                            </h3>
                            <span className="font-mono text-2xl font-bold text-dark-text">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="mb-2 h-3 overflow-hidden rounded-full bg-warm-gold/10">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${item.percentage}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                              className="h-full"
                              style={{
                                background: `linear-gradient(90deg, ${item.color}90, ${item.color})`,
                                boxShadow: `0 0 10px ${item.color}80`,
                              }}
                            />
                          </div>
                          <p className="text-sm font-medium text-dark-text">{item.description}</p>
                        </motion.div>
                      </Reveal>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </Container>
      <style jsx>{`
        .water-ripple {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.79) 20%, transparent 20%);
          animation: rippleAnimation 8s infinite;
        }
        @keyframes rippleAnimation {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: scale(0.9);
            opacity: 0.8;
          }
        }
      `}</style>
    </section>
  )
}

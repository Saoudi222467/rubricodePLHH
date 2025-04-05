"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, LayoutDashboard, Users, TrendingUp, Vote, Clock, ArrowUpRight, ChevronRight } from "lucide-react"
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

// Sample data for the chart
const chartData = [
  { name: "Jan", value: 1000 },
  { name: "Feb", value: 1200 },
  { name: "Mar", value: 900 },
  { name: "Apr", value: 1500 },
  { name: "May", value: 1700 },
  { name: "Jun", value: 1400 },
  { name: "Jul", value: 2000 },
]

export function DashboardHero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-mint-white via-sage-green/10 to-mint-white pt-24"
      id="dashboard"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
      </div>

      <Container className="p-4"></Container>

      <Container className="relative z-10 ">
        {/* Welcome Section */}
        <div className="mb-8 mt-12">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-bold text-dark-text"
          >
            Welcome back, <span className="text-forest-green">User</span>
          </motion.h1>
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-dark-text"
          >
            Your PLHH dashboard overview
          </motion.p>
        </div>

        {/* Chart Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-forest-green">Token Price History</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-dark-text">Last 7 months</span>
                <TrendingUp className="h-4 w-4 text-sage-green" />
              </div>
            </CardHeader>
            <CardContent>
              <div style={{ height: 200, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart width={400} height={200} data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#539241" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#539241" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#1A1A1A" tick={{ fill: "#1A1A1A" }} />
                    <YAxis stroke="#1A1A1A" tick={{ fill: "#1A1A1A" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(230, 251, 244, 0.8)",
                        border: "1px solid rgba(212, 175, 55, 0.2)",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#539241" }}
                      itemStyle={{ color: "#539241" }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#539241" fill="url(#colorValue)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Token Holdings Card */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-forest-green">Token Holdings</CardTitle>
                <Coins className="h-4 w-4 text-forest-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-dark-text">1,234.56 PLHH</div>
                <div className="flex items-center text-xs text-sage-green">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +12.5% from last week
                </div>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-warm-gold/10 p-2">
                  <span className="text-xs text-dark-text">Current Value</span>
                  <span className="text-sm font-medium text-forest-green">$5,678.90</span>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-lg bg-warm-gold/10 p-2">
                  <span className="text-xs text-dark-text">Prev 24 Hrs</span>
                  <span className="text-sm font-medium text-forest-green">$5,638.20</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Staking Options Card */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-forest-green">Staking Overview</CardTitle>
                <LayoutDashboard className="h-4 w-4 text-forest-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-dark-text">567.89 PLHH</div>
                <div className="flex items-center text-xs text-forest-green">
                  <Clock className="mr-1 h-3 w-3" />
                  Locked for 90 days
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-lg bg-warm-gold/10 p-2">
                    <span className="text-xs text-dark-text">APY</span>
                    <span className="text-sm font-medium text-forest-green">12.5%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-warm-gold/10 p-2">
                    <span className="text-xs text-dark-text">Rewards Earned</span>
                    <span className="text-sm font-medium text-forest-green">45.67 PLHH</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Governance Card */}
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
            <Card className="border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-forest-green">Governance</CardTitle>
                <Users className="h-4 w-4 text-forest-green" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-dark-text">3 Active</div>
                <div className="flex items-center text-xs text-forest-green">
                  <Vote className="mr-1 h-3 w-3" />
                  Proposals to Vote
                </div>
                <div className="mt-4 space-y-2">
                  {[
                    { title: "Treasury Allocation", deadline: "2 days left" },
                    { title: "Protocol Update", deadline: "5 days left" },
                    { title: "Community Fund", deadline: "1 week left" },
                  ].map((proposal, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-between text-left text-xs hover:bg-warm-gold/10 hover:text-forest-green"
                    >
                      <span>{proposal.title}</span>
                      <div className="flex items-center text-dark-text">
                        <span>{proposal.deadline}</span>
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6"
        >
          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="border-warm-gold/20 text-forest-green hover:bg-warm-gold/10">
              <Coins className="mr-2 h-4 w-4" />
              Stake Tokens
            </Button>
            <Button variant="outline" className="border-warm-gold/20 text-forest-green hover:bg-warm-gold/10">
              <Vote className="mr-2 h-4 w-4" />
              Cast Vote
            </Button>
            <Button variant="outline" className="border-warm-gold/20 text-forest-green hover:bg-warm-gold/10">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}


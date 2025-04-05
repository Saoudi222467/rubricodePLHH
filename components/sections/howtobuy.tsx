"use client"

import { motion } from "framer-motion"
import { Wallet, CreditCard, LinkIcon, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
}

export function HowToBuySection() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        backgroundImage: "url('/htb.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          custom={0}
        >
          <motion.span className="text-forest-green text-sm font-medium mb-2 block" variants={fadeIn} custom={0}>
            Simple Steps to Join Our Movement
          </motion.span>
          <motion.h2
            className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-4xl md:text-5xl font-bold text-transparent pb-2"
            variants={fadeIn}
            custom={1}
          >
            How to Buy PLHH_Coin in Just a Few Clicks
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Wallet,
              title: "Step 1 – Connect Your Wallet",
              description: (
                <>
                  Choose your preferred SUI-compatible wallet (e.g. Suiet, Martian, Ethos).
                  <br />
                  <br />
                  Switch to the SUI network and press the Connect button.
                  <br />
                  <br />
                  Don't have a wallet yet? We'll guide you step by step.
                  
                </>
              ),
            },
            {
              icon: CreditCard,
              title: "Step 2 – Buy with SUI, USDT or Fiat",
              description: (
                <>
                  Once connected, choose your payment method:
                  <ul className="text-left list-none mt-2 mb-2 space-y-1">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>💎 SUI</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>💶 USDT</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      <span>💳 Fiat (credit card / direct payment)</span>
                    </li>
                  </ul>
                  Enter the amount you want to invest and confirm your transaction.
                </>
              ),
            },
            {
              icon: LinkIcon,
              title: "Step 3 – Claim Your PLHH Tokens",
              description: (
                <>
                  Once the presale ends, the Claim Button will be activated.
                  <br />
                  <br />
                  Click to receive your $PLHH coins directly to your wallet.
                  <br />
                  <br />
                  No lock-up. No waiting. Just peace, love, and harmony – delivered.
                </>
              ),
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="relative group flex items-center justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              custom={index + 1}
              whileHover={{ y: -5 }}
            >
              <div className="p-6 rounded-2xl border border-warm-gold/20 bg-mint-white/40 backdrop-blur-sm transition-all group-hover:border-warm-gold/40 group-hover:shadow-lg group-hover:shadow-warm-gold/10 relative flex flex-col items-center text-center h-full">
                <div className="absolute inset-0 bg-mint-white/50 rounded-2xl border-2 border-[#ffffff] backdrop-blur-lg shadow-lg"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-forest-green to-aqua-blue flex items-center justify-center mb-4 shadow-lg shadow-forest-green/20">
                    <step.icon className="w-6 h-6 text-mint-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent my-3">
                    {step.title}
                  </h3>
                  <div className="text-dark-text text-left">{step.description}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


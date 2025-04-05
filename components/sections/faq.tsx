"use client"

import { useState } from "react"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HelpCircle,
  MessageCircle,
  Coins,
  ShoppingCart,
  Trophy,
  Globe2,
  Heart,
  Leaf,
  Shield,
  Building,
  Gift,
  LockKeyhole,
} from "lucide-react"

export function FAQSection() {
  const [activeTab, setActiveTab] = useState("core")

  const faqCategories = [
    {
      id: "core",
      label: "Core Knowledge",
      icon: <HelpCircle className="h-5 w-5" />,
      faqs: [
        {
          question: "What is PLHH Coin?",
          answer:
            "PLHH Coin is the heart of a global ecosystem built on the values of Peace. Love. Harmony. for more Humanity. It is both a Governance DAO Token and a Real World Asset. That means it's not just used as a digital currency, but also as a tool to fund real-world regenerative projects – such as permaculture farms, water systems, healing spaces, and educational centers. PLHH Coin is more than a cryptocurrency – it's a bridge between finance, community, and planetary healing.",
          icon: <Coins className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How does the PLHH ecosystem work?",
          answer: (
            <>
              <p>
                The PLHH ecosystem is a living cycle that connects people, energy, technology, and real-world impact.
              </p>
              <p className="mt-2">PLHH Coin is used to:</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>Fund real-life projects (Garden Edens, education, nature regeneration)</li>
                <li>Purchase land in the PLHH Metaverse</li>
                <li>Participate in DAO governance and voting</li>
                <li>Support or launch community-led initiatives</li>
              </ul>
              <p className="mt-2">It includes:</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>A burning mechanism to increase long-term value by reducing supply</li>
                <li>A staking system to reward loyal holders</li>
                <li>A growing network of real and digital spaces powered by love, purpose, and action</li>
              </ul>
              <p className="mt-2">The ecosystem turns capital into contribution – and money into meaning.</p>
            </>
          ),
          icon: <MessageCircle className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How can I join the PLHH Community?",
          answer: (
            <>
              <p>Becoming part of PLHH is simple – and powerful:</p>
              <ol className="list-decimal pl-5 mt-2 mb-2">
                <li>Buy PLHH Coins (using SUI, USDT or fiat through our official website)</li>
                <li>Connect your wallet and participate in DAO governance</li>
                <li>Purchase Metaverse land and create your own spaces</li>
                <li>Join global community initiatives or start your own</li>
                <li>Live the frequency – embody peace, love and harmony in your daily life</li>
              </ol>
              <p className="mt-2">Everyone is welcome. Every action matters.</p>
            </>
          ),
          icon: <Heart className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "What makes PLHH different from other tokens?",
          answer: (
            <>
              <p>PLHH Coin is not about hype – it's about healing, building and belonging.</p>
              <p className="mt-2">Here's what makes PLHH truly different:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>✅ Impact over promises → real-world funded projects</li>
                <li>✅ Community over control → full DAO governance</li>
                <li>✅ Energy over ego → love, peace, and harmony as core values</li>
                <li>✅ Soulful tokenomics → with burning, staking, and long-term flow</li>
                <li>✅ Bridging digital and real → metaverse land tied to physical revenue</li>
              </ul>
              <p className="mt-2">PLHH redefines value – not in numbers alone, but in purpose.</p>
            </>
          ),
          icon: <HelpCircle className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "What are the benefits of holding PLHH Coins?",
          answer: (
            <>
              <p>As a PLHH Coin holder, you gain access to a wide range of benefits:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>• Voting rights within the DAO</li>
                <li>• Exclusive access to metaverse land + real-life revenue share</li>
                <li>• Participation in global community & impact projects</li>
                <li>• Staking rewards to earn more PLHH</li>
                <li>• Burning mechanism to reduce supply and increase long-term value</li>
                <li>• Value growth as the ecosystem and community expand</li>
              </ul>
              <p className="mt-2">
                But beyond all of this: You're holding a piece of a new world – one rooted in values, vision, and
                collective transformation.
              </p>
            </>
          ),
          icon: <Gift className="h-5 w-5 text-forest-green" />,
        },
      ],
    },
    {
      id: "impact",
      label: "Real World Impact",
      icon: <Leaf className="h-5 w-5" />,
      faqs: [
        {
          question: "What is the Garden Eden Project?",
          answer: (
            <>
              <p>
                The Garden Eden Project is not a metaphor. It's a living vision – a physical space where humans, nature,
                energy and consciousness exist in harmony. A place of healing, reconnection, regeneration – and a new
                way of living.
              </p>
              <p className="mt-2">
                Each Garden Eden is a real-world regenerative zone, built with purpose, precision and love. It can
                include:
              </p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>Permaculture landscapes and food forests</li>
                <li>Water systems and healing springs</li>
                <li>Retreat centers, eco-lodges and healing sanctuaries</li>
                <li>Sustainable housing, forest management, renewable energy</li>
                <li>Community hubs, schools and nature-based architecture</li>
              </ul>
              <p className="mt-2">Garden Eden is a movement made visible – and it's growing, worldwide.</p>
            </>
          ),
          icon: <Leaf className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "What real-life projects are funded by PLHH Coin?",
          answer: (
            <>
              <p>PLHH Coin is used to fund real, tangible, high-impact projects, including:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>• Reforestation and ecological restoration</li>
                <li>• Access to clean water and holistic water systems</li>
                <li>• Permaculture, food sovereignty and regenerative farming</li>
                <li>• Healing spaces, retreats and sacred spaces for rest and transformation</li>
                <li>• Education hubs and knowledge-sharing platforms</li>
                <li>• Decentralized energy projects (solar, hydro, biogas)</li>
                <li>• Frequency spaces, sound healing and natural medicine labs</li>
              </ul>
              <p className="mt-2">All projects are blockchain-documented and 100% transparent.</p>
            </>
          ),
          icon: <Building className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How does money from the Metaverse flow into real-world impact?",
          answer: (
            <>
              <p>The PLHH system bridges the virtual and the physical.</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>You purchase land in the PLHH Metaverse</li>
                <li>That virtual plot is tokenized and connected to a real Garden Eden location</li>
                <li>
                  When that real project generates income (from retreats, products, education, etc.), you receive a
                  share of the revenue as the landholder
                </li>
                <li>Another share is reinvested into ecosystem growth and community development</li>
              </ul>
              <p className="mt-2">Digital ownership becomes real-world regeneration.</p>
            </>
          ),
          icon: <Globe2 className="h-5 w-5 text-forest-green" />,
        },
      ],
    },
    {
      id: "metaverse",
      label: "PLHH Metaverse",
      icon: <Globe2 className="h-5 w-5" />,
      faqs: [
        {
          question: "What is the PLHH Metaverse?",
          answer: (
            <>
              <p>
                The PLHH Metaverse is not just a digital space. It is a sacred, co-created realm for consciousness,
                creativity, and real-world impact.
              </p>
              <p className="mt-2">It's where you can:</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>Own land</li>
                <li>Build meaningful spaces</li>
                <li>Connect with others</li>
                <li>Experience live events</li>
                <li>And activate change in both digital and physical dimensions</li>
              </ul>
              <p className="mt-2">
                It is the digital extension of the Garden Eden movement – rooted in love, driven by frequency, and open
                to visionaries from all over the world.
              </p>
            </>
          ),
          icon: <Globe2 className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How can I buy land in the PLHH Metaverse?",
          answer: (
            <>
              <p>
                You can purchase land directly through the official PLHH platform, during limited land drops or via
                DAO-approved community sales.
              </p>
              <p className="mt-2">You can pay with:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>• PLHH Coins</li>
                <li>• USDT</li>
                <li>• Fiat (credit card)</li>
              </ul>
              <p className="mt-2">
                Once your wallet is connected, you select your Eden land – and receive it as a tokenized NFT directly
                into your wallet.
              </p>
            </>
          ),
          icon: <ShoppingCart className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How is my digital land connected to the real world?",
          answer: (
            <>
              <p>Each plot in the PLHH Metaverse can be linked to a real Garden Eden project.</p>
              <p className="mt-2">This means:</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>You don't just own it virtually</li>
                <li>
                  You receive real-world profit shares when the associated Eden site generates income (retreats, events,
                  harvests, etc.)
                </li>
              </ul>
              <p className="mt-2">Your virtual land becomes a living asset with real-world impact.</p>
            </>
          ),
          icon: <Building className="h-5 w-5 text-forest-green" />,
        },
      ],
    },
    {
      id: "governance",
      label: "Governance",
      icon: <Shield className="h-5 w-5" />,
      faqs: [
        {
          question: "What is a DAO – and how does it work at PLHH?",
          answer: (
            <>
              <p>
                DAO stands for Decentralized Autonomous Organization – a structure that's not governed top-down, but
                co-created by its community.
              </p>
              <p className="mt-2">
                At PLHH, this means that all major decisions – such as project funding, partnerships, or ecosystem
                development – are made through community voting.
              </p>
              <p className="mt-2">If you hold PLHH Coins, you are part of it.</p>
            </>
          ),
          icon: <Shield className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "Who decides what happens in the PLHH ecosystem?",
          answer: (
            <>
              <p>The answer is simple: We all do.</p>
              <p className="mt-2">
                Everyone who holds PLHH Coins has a voice in the DAO. Your voting power depends on your level of
                participation – not on your status.
              </p>
              <p className="mt-2">You can:</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>Vote on proposals</li>
                <li>Submit your own ideas</li>
                <li>Help shape the movement through transparent, on-chain decisions</li>
              </ul>
              <p className="mt-2">No central control – just collective wisdom in motion.</p>
            </>
          ),
          icon: <MessageCircle className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How is voting power calculated? (Is it 1 coin = 1 vote?)",
          answer: (
            <>
              <p>At its core: 1 Coin = 1 Vote</p>
              <p className="mt-2">However, a hybrid model is in development, where voting power may also consider:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>• Time commitment (staking)</li>
                <li>• Community engagement</li>
                <li>• Contribution and participation history</li>
              </ul>
              <p className="mt-2">This creates balance between investment and true commitment.</p>
            </>
          ),
          icon: <Trophy className="h-5 w-5 text-forest-green" />,
        },
      ],
    },
    {
      id: "security",
      label: "Trust & Security",
      icon: <LockKeyhole className="h-5 w-5" />,
      faqs: [
        {
          question: "How secure is my investment in PLHH?",
          answer: (
            <>
              <p>PLHH is built on the SUI Blockchain – a modern, fast and highly secure Layer-1 infrastructure.</p>
              <p className="mt-2">
                All transactions, wallets and votes are fully decentralized and transparently recorded on-chain.
              </p>
              <p className="mt-2">PLHH protects your investment through:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>• Secure smart contracts for staking and DAO functions</li>
                <li>• Burning mechanism to stabilize and increase value</li>
                <li>• DAO-based decision making with no central authority</li>
              </ul>
              <p className="mt-2">No one controls your money – except you.</p>
            </>
          ),
          icon: <LockKeyhole className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "Who is behind PLHH Coin?",
          answer: (
            <>
              <p>
                PLHH is a community-led movement, initiated by a diverse group of visionaries, builders, healers,
                developers and land stewards.
              </p>
              <p className="mt-2">The project is backed by:</p>
              <ul className="list-disc pl-5 mt-1 mb-2">
                <li>100% transparency</li>
                <li>DAO-first structure</li>
                <li>A neutral foundation (in progress) to protect core assets & principles</li>
                <li>A complete separation between power and capital</li>
              </ul>
              <p className="mt-2">No hidden owners. No shadow investors. Just real people with a real mission.</p>
            </>
          ),
          icon: <Shield className="h-5 w-5 text-forest-green" />,
        },
        {
          question: "How do I protect my wallet and PLHH Coins?",
          answer: (
            <>
              <p>You are your own bank – and that's powerful.</p>
              <p className="mt-2">We recommend:</p>
              <ul className="list-none pl-2 mt-1 mb-2 space-y-1">
                <li>• Use trusted wallets like Suiet, Martian, or Ethos</li>
                <li>• Store your seed phrase offline, never as a screenshot</li>
                <li>• Use a hardware wallet for larger amounts</li>
                <li>• Never click on unknown links or "free airdrops"</li>
              </ul>
              <p className="mt-2">Web3 empowers you – and we help you become sovereign.</p>
            </>
          ),
          icon: <HelpCircle className="h-5 w-5 text-forest-green" />,
        },
      ],
    },
  ]

  return (
    <section
      className="py-20"
      style={{
        backgroundImage: `url(/faq.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container>
        <Reveal width="100%" className="w-full">
          <div className="mb-8 text-center space-y-4">
            <h2 className="font-montserrat text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-white">Frequently Asked Questions</span>
            </h2>
            <p className="text-dark-text max-w-2xl mx-auto text-white">
              Everything you need to know about PLHH Coin and its ecosystem
            </p>
          </div>
        </Reveal>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="core" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6 bg-mint-white/20 backdrop-blur-md p-1 rounded-lg">
              {faqCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-1 text-white data-[state=active]:bg-mint-white data-[state=active]:text-forest-green"
                >
                  {category.icon}
                  <span className="hidden md:inline">{category.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {faqCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <Card className="border-2 border-[#a67c00] backdrop-blur-xl shadow-xl bg-mint-white/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-center text-forest-green flex flex-col items-center">
                      {category.icon}
                      <span className="mt-2">{category.label}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <Reveal key={index} width="100%" className="w-full">
                          <AccordionItem
                            value={`item-${index}`}
                            className="border-warm-gold/10 transition-colors duration-200 hover:bg-warm-gold/5"
                          >
                            <AccordionTrigger className="text-left text-black font-montserrat hover:text-forest-green">
                              <div className="flex items-center gap-3">
                                {faq.icon}
                                <span>{faq.question}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-dark-text">
                              <div className="pl-8">{faq.answer}</div>
                            </AccordionContent>
                          </AccordionItem>
                        </Reveal>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </Container>
    </section>
  )
}


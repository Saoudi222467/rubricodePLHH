"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useRef } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.5 },
  }),
}

const butterflyVariants = {
  initial: { 
    x: -100, 
    y: -100,
    rotate: 0,
    opacity: 0 
  },
  animate: (custom: number) => ({
    x: [
      -100, 
      window.innerWidth * 0.7,
      window.innerWidth * 0.3,
      window.innerWidth + 100
    ],
    y: [
      -100,
      window.innerHeight * 0.2,
      window.innerHeight * 0.5,
      window.innerHeight + 100
    ],
    rotate: [0, 20, -20, 0],
    opacity: [0, 1, 1, 0],
    transition: {
      duration: 15 + custom * 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: custom * 3,
      ease: "easeInOut"
    }
  })
}

const petalVariants = {
  initial: { 
    x: (custom: number) => Math.random() * window.innerWidth, 
    y: -50,
    rotate: Math.random() * 360,
    opacity: 0
  },
  animate: (custom: number) => ({
    x: (custom: number) => [
      Math.random() * window.innerWidth, 
      Math.random() * window.innerWidth, 
      Math.random() * window.innerWidth
    ],
    y: window.innerHeight + 100,
    rotate: [
      Math.random() * 360, 
      Math.random() * 360, 
      Math.random() * 360
    ],
    opacity: [0, 1, 0],
    transition: {
      duration: 10 + custom * 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatDelay: custom * 2,
      ease: "easeInOut"
    }
  })
}

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white"
    stroke="#a67c00"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
)

export function AboutSection() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null)
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([])

  const handlePlayVideo = (index: number) => {
    setActiveVideo(index)
  }

  const handleCloseVideo = () => {
    setActiveVideo(null)
  }

  const coreValues = [
    {
      number: "01",
      title: "Peace",
      description: [
        "We create financial freedom rooted in trust and decentralization – uniting people across borders, cultures, and beliefs.",
        "",
        "Peace begins when control ends.",
        "PLHH stands for a world where money no longer divides – it connects.",
      ],
      videoUrl: "https://www.youtube-nocookie.com/embed/Vz29CiCADrw",
      thumbnailUrl: "https://i.ytimg.com/vi/Vz29CiCADrw/maxresdefault.jpg",
      bgImage: "/try5.jpg",
    },
    {
      number: "02",
      title: "Love",
      description: [
        "Every system we build is centered on one truth: People come before profit.",
        "We empower individuals and communities with care, dignity, and compassion.",
        "Because love is not an idea – it's a decision.",
      ],
      videoUrl: "https://www.youtube-nocookie.com/embed/ZI8JG3uB9h0",
      thumbnailUrl: "https://img.youtube.com/vi/ZI8JG3uB9h0/maxresdefault.jpg",
      bgImage: "/try5.jpg",
    },
    {
      number: "03",
      title: "Eternity",
      description: [
        "We don't build for the next hype – we build for the next hundred years.",
        "PLHH stands for timeless values:",
        "Peace, cooperation, and stability that last.",
        "A coin that grows with humanity – not at its expense.",
      ],
      videoUrl: "https://www.youtube-nocookie.com/embed/ZAISWU-7Rzk",
      thumbnailUrl: "https://img.youtube.com/vi/ZAISWU-7Rzk/maxresdefault.jpg",
      bgImage: "/try5.jpg",
    },
    {
      number: "04",
      title: "Harmony",
      description: [
        "Nature is not separate from us – she is us.",
        "",
        "We fund ecological projects, regenerative agriculture, and real-world sanctuaries like the Garden Eden.",
        "Because true wealth is balance – not excess.",
      ],
      videoUrl: "https://www.youtube-nocookie.com/embed/rOO7y5HaZk0",
      thumbnailUrl: "https://img.youtube.com/vi/rOO7y5HaZk0/maxresdefault.jpg",
      bgImage: "/try5.jpg",
    },
    {
      number: "05",
      title: "Infinity",
      description: [
        "We believe in limitless connection.",
        "In a global `we` that includes all life.",
        "PLHH opens doors – not gates.",
        "Love knows no end.",
        "And the potential to grow is infinite – when we grow together.",
      ],
      videoUrl: "https://www.youtube-nocookie.com/embed/UJez70mQb5s",
      thumbnailUrl: "https://img.youtube.com/vi/UJez70mQb5s/maxresdefault.jpg",
      bgImage: "/try5.jpg",
    },
  ]

  return (
    <>
      {/* About Us Section */}
      <section id="about" className="py-20 md:py-28 bg-mint-white ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              custom={1}
            >
              <div className="max-w-xl custom-scrollbar h-[600px] overflow-y-auto">
                <div className="max-w-xl">
                  <div className="mb-6">
                    <motion.span
                      className="text-forest-green text-sm font-medium mb-2 block text-center sm:text-left"
                      variants={fadeIn}
                      custom={0}
                    >
                      Peace, Love & Harmony for more Humanity
                    </motion.span>
                    <motion.h2
                      className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-4xl md:text-5xl font-bold text-transparent text-center sm:text-left"
                      variants={fadeIn}
                      custom={1}
                    >
                      <span className="text-black dark:text-white">🌍</span> About Us
                    </motion.h2>
                  </div>

                  <motion.div variants={fadeIn} custom={2}>
                    <p className="text-dark-text mb-4">
                      PLHH Coin is not just another cryptocurrency. It's a global peace project. A living system for a
                      new humanity.
                    </p>
                    <p className="text-dark-text mb-6">
                      In a world shaped by control, division, and insecurity, we choose the opposite:{" "}
                      <b>🕊️ Peace, Love & Harmony</b> – in every transaction, every decision, every human being who
                      becomes part of this movement.
                    </p>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={3}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">💡 Why PLHH is Different</h3>
                    <p className="text-dark-text mb-2">
                      PLHH Coin is a Governance DAO Token and at the same time a Real World Asset. That means:
                    </p>
                    <ul className="list-disc pl-5 text-dark-text space-y-1 mb-2">
                      <li>🗳️ True community governance – every voice counts</li>
                      <li>🌱 Real value with real-world impact</li>
                      <li>🔐 More transparency, more safety, more stability – for everyone</li>
                      <li>🤝 Power to the many – not control by the few</li>
                      <li>🌍 A genuine connection between the digital world and the natural world</li>
                    </ul>
                    <p className="text-dark-text">
                      This is not just a token. It's a voice. An intention. A home. It's energy in service of life.
                    </p>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={4}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">🌱 What We Make Happen</h3>
                    <p className="text-dark-text mb-2">Every transaction supports real, tangible transformation:</p>
                    <ul className="list-disc pl-5 text-dark-text space-y-1 mb-2">
                      <li>🌳 Reforestation & natural restoration</li>
                      <li>💧 Clean water, nutrient-rich food & regenerative agriculture</li>
                      <li>🏞️ Development of the Garden Eden – a living space of peace, freedom & healing</li>
                      <li>🎓 Education & empowerment in underserved communities</li>
                      <li>🧬 Innovation in harmony with the Earth</li>
                      <li>🕊️ Peace-building projects & healing sanctuaries for people and nature</li>
                    </ul>
                    <p className="text-dark-text">
                      PLHH Coin creates real places where love grows roots. The Garden Eden is not a dream. It's already
                      becoming reality – and you are part of it.
                    </p>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={5}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">
                      <span className="text-white dark:text-white">❤︎</span> Our Path
                    </h3>
                    <ul className="list-disc pl-5 text-dark-text space-y-1 mb-2">
                      <li>Decentralized.</li>
                      <li>Community-driven.</li>
                      <li>Purposeful.</li>
                      <li>Built with love – for the humanity of tomorrow.</li>
                    </ul>
                    <p className="text-dark-text">Blockchain is our foundation. You are the heart.</p>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={6}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">🫂 Who Is PLHH For?</h3>
                    <p className="text-dark-text mb-2">
                      For everyone who knows the old system no longer serves. For visionaries, changemakers,
                      nature-lovers, freedom-seekers. For every soul that feels:
                    </p>
                    <p className="text-dark-text font-medium">
                      True change begins within – and becomes real through action.
                    </p>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={7}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">🔮 Our Vision</h3>
                    <p className="text-dark-text mb-2">A world where:</p>
                    <ul className="list-disc pl-5 text-dark-text space-y-1 mb-2">
                      <li>Technology serves the Earth</li>
                      <li>Finance is rooted in compassion</li>
                      <li>Communities shape their own future</li>
                      <li>Your investment plants trees, gives water, and builds peace</li>
                    </ul>
                    <p className="text-dark-text">
                      This is PLHH. A bridge between today and the tomorrow we all long for.
                    </p>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={8}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">🧭 The Foundation of PLHH Coin</h3>
                    <ul className="list-none pl-5 text-dark-text space-y-1 mb-2">
                      <li>✔ Governance DAO Token – full participation, real democracy</li>
                      <li>✔ Real World Asset – connected to tangible, sustainable value</li>
                      <li>✔ Transparency & Trust – open and honest by design</li>
                      <li>✔ Stability & Security – grounded in nature, community, and truth</li>
                    </ul>
                  </motion.div>

                  <motion.div className="mb-6" variants={fadeIn} custom={9}>
                    <h3 className="text-forest-green font-semibold text-lg mb-2">✨ Be Part of the Change</h3>
                    <p className="text-dark-text mb-4">
                      Join the movement. Vote with your values. Co-create with your heart. For you. For us. For all.
                    </p>
                    <p className="text-dark-text font-medium">
                      PLHH Coin – because the future can't wait. And you are part of it.
                    </p>
                  </motion.div>

                  <motion.div className="grid grid-cols-2 gap-4 mt-8" variants={fadeIn} custom={10}>
                    <Button
                      size="lg"
                      className="group relative overflow-hidden bg-gradient-to-r from-warm-gold to-earthy-copper text-dark-text transition-all hover:scale-105 hover:from-warm-gold hover:to-earthy-copper/90 shadow-lg"
                      onClick={() => document.getElementById("wallet-connect")?.click()}
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
                      <span className="relative z-10">Connect Wallet</span>
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-forest-green/20 text-forest-green transition-all hover:scale-105 hover:bg-forest-green/20 hover:text-black font-medium shadow-lg"
                    >
                      Read the Whitepaper
                    </Button>

                    <Button
                      size="lg"
                      className="bg-aqua-blue text-dark-text transition-all hover:scale-105 hover:bg-aqua-blue/90 shadow-lg"
                    >
                      Join Our Community
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="border-forest-green/20 text-forest-green transition-all hover:scale-105 hover:bg-forest-green/20 hover:text-black font-medium shadow-lg"
                    >
                      Explore Our Projects
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-aqua-blue/20 to-forest-green/20 blur-xl" />
                <Image src="/about_img.png" alt="About PLHH Coin" width={500} height={500} className="relative z-10" />
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx global>{`
          .custom-scrollbar {
            direction: rtl; /* This moves the scrollbar to the left */
            padding-left: 20px;
          }

          .custom-scrollbar > div {
            direction: ltr; /* Reset the text direction */
          }

          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #2f4f4f; /* Forest green color */
            border-radius: 20px;
          }
        `}</style>
      </section>

      {/* Mission Statement Section */}
      <section className="py-16 bg-sage-green/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={1}
          >
            <motion.span className="text-forest-green text-sm font-medium mb-2 block" variants={fadeIn} custom={0}>
              A Call Back to Humanity
            </motion.span>
            <motion.h2
              className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-4xl md:text-5xl font-bold text-transparent mb-6"
              variants={fadeIn}
              custom={1}
            >
              Mission Statement
            </motion.h2>

            <motion.div className="text-dark-text space-y-2 text-white" variants={fadeIn} custom={2}>
              <p className="text-xl font-medium">🔥 PLHH Coin – Not a Token. A Turning Point.</p>
              <p>We don't build systems.</p>
              <p>
                We build <b>foundations.</b>
              </p>
              <p>We don't follow hype.</p>
              <p>
                We follow <b>heart.</b>
              </p>
              <p className="pt-2">
                PLHH Coin is a <b>call back to humanity</b> –<br />a decentralized, transparent, and soul-driven
                movement
                <br />
                that turns money into meaning
                <br />
                and transactions into transformation.
              </p>
              <p className="pt-2">Every action is a choice:</p>
              <p>🕊️ For peace.</p>
              <p>💛 For love.</p>
              <p>🌱 For harmony.</p>
              <p className="pt-2 font-semibold">
                Not tomorrow.
                <br />
                <b>Now.</b>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section
        className="py-16 flex flex-col items-center relative"
        style={{
          backgroundImage: "url('/background-image.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Overlay to ensure content visibility */}
        <div className="absolute inset-0 bg-mint-white/90 backdrop-blur-sm"></div>
        <div className="absolute inset-0 pointer-events-none z-0">
          <img src="/butterfly.gif" alt="Flying Butterfly" className="absolute top-8 right-[36%] w-20 h-20" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            custom={0}
          >
            <motion.span className="text-forest-green text-sm font-medium mb-2 block" variants={fadeIn} custom={0}>
              Empowering Humanity, Restoring Nature
            </motion.span>
            <motion.h2
              className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-4xl md:text-5xl font-bold text-transparent"
              variants={fadeIn}
              custom={1}
            >
              Our Core Values
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                custom={index + 1}
                whileHover={{ y: -5 }}
              >
                <div
                  className="h-auto rounded-2xl border-2 border-[#a67c00] bg-mint-white/80 backdrop-blur-lg shadow-lg transition-all duration-300 group-hover:border-aqua-blue group-hover:shadow-xl group-hover:shadow-forest-green/30 relative overflow-hidden"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url(${value.bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Content */}
                  <div className="p-6 flex flex-col h-full">
                    <div className="mb-3">
                      <span className="inline-block text-3xl font-bold bg-gradient-to-r from-forest-green to-aqua-blue bg-clip-text text-transparent">
                        {value.number}
                      </span>
                      <h3 className="text-2xl font-bold text-dark-text mt-1">{value.title}</h3>
                    </div>

                    <div className="text-dark-text text-sm md:text-base mb-4">
                      {value.description
                        .join(" ")
                        .split("\n\n")
                        .map((paragraph, i) => (
                          <p key={i} className="mb-3 leading-relaxed text-left">
                            {paragraph}
                          </p>
                        ))}
                    </div>

                    {/* Play button */}
                    <div className="mt-auto">
                      <button
                        onClick={() => handlePlayVideo(index)}
                        className="flex items-center justify-center w-12 h-12 bg-[#a67c00] hover:bg-white rounded-full transition-all duration-300 mx-auto"
                      >
                        <PlayIcon className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Video Modal */}
          {activeVideo !== null && activeVideo >= 0 && activeVideo < coreValues.length && (
            <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={handleCloseVideo}>
              <div className="relative w-full max-w-4xl p-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={handleCloseVideo}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 bg-[#a67c00] hover:bg-white px-4 py-2 rounded-lg transition-all duration-300"
                >
                  Close Video
                </button>
                <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-2xl border-2 border-[#a67c00]">
                  <iframe
                    src={coreValues[activeVideo].videoUrl}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}


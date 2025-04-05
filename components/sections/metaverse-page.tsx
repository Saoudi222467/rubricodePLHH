"use client"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function MetaversePage() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-sage-green to-mint-white">
      {/* Video background with blur overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark-text/30 backdrop-blur-sm z-10"></div>
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          src="/metaverse_vid.mp4" // Replace with your video link
        >
          Your browser does not support the video tag.
        </video>
      </div>

      <Container className="relative z-20">
        <Reveal>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto border-warm-gold/30 bg-mint-white/90 backdrop-blur-md p-8 shadow-lg">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                    "0 0 40px rgba(212, 175, 55, 0.5)",
                    "0 0 20px rgba(212, 175, 55, 0.3)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gradient-to-r from-forest-green to-aqua-blue"
              >
                <span className="text-mint-white font-bold text-3xl">PLHH</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-dark-text">
                <span className="bg-gradient-to-r from-warm-gold via-earthy-copper to-warm-gold bg-clip-text text-transparent">
                  Coming Soon
                </span>
              </h1>

              <p className="text-dark-text mb-6 text-lg">
                Our immersive metaverse experience is under development. Be among the first to explore the PLHH digital
                world.
              </p>

              <p className="text-forest-green font-semibold mb-8">Launch Expected Q3 2024</p>

              <Button className="w-full bg-warm-gold hover:bg-warm-gold/90 text-dark-text font-semibold">
                Join Waitlist
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Card>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  )
}


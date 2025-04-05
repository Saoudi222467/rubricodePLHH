"use client"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Input } from "@/components/ui/input" // Ensure Input is imported
import { Button } from "@/components/ui/button" // Ensure Button is imported
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from "lucide-react"

export function CtaSection() {
  const [email, setEmail] = useState("")

  return (
    <>
      {/* CTA Section */}
      <section
        className="relative py-20 overflow-hidden bg-black"
        id="community"
        style={{
          backgroundImage: `url(/join.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="py-20">
          <Container>
            <div className="rounded-2xl border-2 border-[#a67c00] bg-mint-white/80 p-8 backdrop-blur-lg shadow-lg transition-all duration-300 hover:border-aqua-blue hover:shadow-xl hover:shadow-forest-green/20">
              <Reveal>
                <h2 className="mb-4 text-center font-montserrat text-3xl font-bold tracking-tight sm:text-4xl">
                  <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-transparent">
                    Stay Connected
                  </span>
                </h2>
              </Reveal>
              <Reveal>
                <p className="mb-8 text-center text-dark-text">
                  Join our newsletter to receive updates about our journey towards a more harmonious world.
                </p>
              </Reveal>
              <Reveal>
                <form className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
                  <div className="relative flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border-2 border-[#a67c00] bg-mint-white/50 p-3 text-dark-text placeholder:text-dark-text/50 outline-none ring-2 ring-aqua-blue/20 transition-all duration-300 focus:border-[#F28E8E]/70"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-forest-green to-aqua-blue text-mint-white hover:from-forest-green hover:to-aqua-blue/90 hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg">
                    Subscribe
                  </Button>
                </form>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* Animated gradient backgrounds */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
        </div>

        <Container className="relative z-10 text-center">
          <Reveal>
            <h2 className="font-montserrat text-5xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-forest-green via-aqua-blue to-forest-green bg-clip-text text-white">
                Join our community for
                <br />
                First Access
              </span>
            </h2>
          </Reveal>

          <Reveal>
            <p className="text-white max-w-3xl mx-auto mb-10 text-xl font-bold">
              There are many variations of passages of Lorem Ipsum available, but the <br className="hidden md:block" />
              majority have suffered alteration in some form.
            </p>
          </Reveal>

          <Reveal>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center gap-4"
              >
                {[
                  { icon: Facebook, href: "/" },
                  { icon: Twitter, href: "/" },
                  { icon: Instagram, href: "/" },
                  { icon: Youtube, href: "/" },
                  { icon: MessageCircle, href: "/" },
                ].map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-mint-white text-forest-green hover:bg-warm-gold hover:text-dark-text transition-all duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </Link>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

"use client"

import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  return (
    <section className="py-20 bg-mint-white">
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
  )
}


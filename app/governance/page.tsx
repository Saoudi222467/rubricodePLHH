// app/GovernancePage.tsx (or wherever your page lives)

"use client";

import Header from "@/components/CryptoHeader";
import Ticker from "@/components/sections/ticker";
import { Footer } from "@/components/sections/footer";
import { GovernanceHero } from "@/components/Governance/Hero";
import { GovernanceProposals } from "@/components/Governance/Proposals";
import { GovernanceProcess } from "@/components/Governance/Process";
import { GovernanceCTA } from "@/components/Governance/CTA";
import { Container } from "@/components/ui/container";

export default function GovernancePage() {
  return (
    <>
      <div className="sticky top-0 z-30 flex flex-col">
        <Ticker />
      </div>
      <Header />

      <main className="flex min-h-screen flex-col bg-black text-white overflow-x-hidden w-full">
        {/* Governance Sections */}
        <section className="relative py-20 overflow-hidden bg-black">
          {/* Background accents */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_80%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
          </div>

          {/* Centered content
          <Container className="relative z-10 space-y-16"></Container> */}

          {/* full-width CTA */}
          <div className="relative z-10 w-full">
            <GovernanceHero />
            {/* <GovernanceProposals /> */}
            <GovernanceProcess />
            <GovernanceCTA />
          </div>
        </section>

        {/* <Footer /> */}
      </main>
    </>
  );
}

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
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white overflow-x-hidden">
      <Ticker />
      <Header />

      {/* Governance Sections */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-mint-white to-mint-white text-black">
        {/* Backgrounds */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_80%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
        </div>

        <Container className="relative z-10">
          <GovernanceHero />
          <GovernanceProposals />
          <GovernanceProcess />
          <GovernanceCTA />
        </Container>
      </section>

      {/* <Footer /> */}
    </main>
  );
}

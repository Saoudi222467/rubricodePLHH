// app/DaoPage.tsx
"use client";

import Header from "@/components/CryptoHeader";
import Ticker from "@/components/sections/ticker";

import { DaoHero } from "@/components/DAO/Hero";
import { DaoPhilosophy } from "@/components/DAO/Philosophy";
import { DaoDefinition } from "@/components/DAO/Definition";
import { DaoProposals } from "@/components/DAO/Proposals";
import { DaoProcess } from "@/components/DAO/Process";
import { DaoRationale } from "@/components/DAO/Rationale";
import { DaoParticipation } from "@/components/DAO/Participation";
import { DaoCTA } from "@/components/DAO/CTA";
import { Container } from "@/components/ui/container";

export default function DaoPage() {
  return (
    <>
      <div className="sticky top-0 z-30 flex flex-col">
        <Ticker />
      </div>
      <Header />

      <main className="flex min-h-screen flex-col bg-black text-white overflow-x-hidden w-full">
        <section className="relative py-20 overflow-hidden bg-black">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(95,185,195,0.15),transparent_80%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(83,146,65,0.1),transparent_50%)]" />
          </div>

          <Container className="relative z-10 space-y-16">
            <DaoHero />
            <DaoPhilosophy />
            <DaoDefinition />
          </Container>

          <DaoProposals />
          <DaoProcess />
          <DaoRationale />
          <DaoParticipation />
          <DaoCTA />
        </section>
      </main>
    </>
  );
}

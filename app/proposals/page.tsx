import { Header } from '@/components/sections/header'
import {ProposalSection} from '@/components/sections/ProposalSection'
import { Footer } from '@/components/sections/footer'
import Ticker from "@/components/sections/ticker";

export default function MetaPage() { // Updated function name
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white">
        <Ticker />
        <Header />
        <ProposalSection/>
        <Footer />
      </main>
    );
}


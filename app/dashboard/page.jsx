import { Header } from '@/components/sections/header'

import { MetaverseMapSection } from '@/components/sections/metaverse-map'
import { FeaturesSection } from '@/components/sections/features'
import { TokenomicsSection } from '@/components/sections/tokenomics'
import { RoadmapSection } from '@/components/sections/roadmap'
import { FAQSection } from '@/components/sections/faq'
import { NewsletterSection } from '@/components/sections/newsletter'
import { Footer } from '@/components/sections/footer'
import {BuyPLHHSection} from '@/components/sections/buyplhh'
import { StakingSection } from '@/components/sections/staking'
import Ticker from "@/components/sections/ticker";
export default function UserPage() { // Updated function name
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white">
        <Ticker/>
        <Header />
      

        <BuyPLHHSection />
        <StakingSection/>
        
        <FAQSection />
        <NewsletterSection />
        <Footer />
      </main>
    );
}


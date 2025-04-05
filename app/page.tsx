import Header from "@/components/CryptoHeader";
import { Footer } from "@/components/sections/footer";
import LandingSection from "@/components/LandingSection";
import Ticker from "@/components/sections/ticker";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      <Ticker />
      <Header />
      <LandingSection />
      {/* Sections here */}
      {/* <Footer /> */}
    </main>
  );
}

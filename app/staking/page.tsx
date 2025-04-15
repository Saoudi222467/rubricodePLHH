import StakingHero from "@/components/StakingSections/StakingHero"
import StakingInterface from "@/components/StakingSections/StakingInterface"
import CryptoHeader from "@/components/CryptoHeader"

export default function StakingPage() {
  return (
    <div className="bg-black text-white">
      <CryptoHeader />
      <StakingHero />
      <StakingInterface />
    </div>
  )
}

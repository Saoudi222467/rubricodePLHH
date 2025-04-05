import CryptoHeader from "../crypto-header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 to-black">
      <CryptoHeader />
      <main className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 mb-6">
          The Future of Decentralized Finance
        </h1>
        <p className="text-amber-200/80 max-w-3xl mx-auto text-lg md:text-xl">
          Experience the next generation of cryptocurrency with PLHH Coin - where Peace, Love & Harmony meet
          cutting-edge blockchain technology.
        </p>
      </main>
    </div>
  )
}


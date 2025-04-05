import { Header } from '@/components/sections/header'
import MetaversePage from '@/components/sections/metaverse-page'
import { Footer } from '@/components/sections/footer'


export default function MetaPage() { // Updated function name
    return (
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-black via-neutral-900 to-black text-white">
        <Header />
        <MetaversePage/>
        <Footer />
      </main>
    );
}


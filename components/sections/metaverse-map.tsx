'use client'

import { useState, useRef } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Vector3, TextureLoader } from 'three'
import { Container } from '@/components/ui/container'
import { Reveal } from '@/components/ui/reveal'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface Region {
  id: number
  name: string
  price: string
  available: boolean
  position: [number, number, number]
}

function Globe() {
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null)
  
  // Load Earth texture
  const earthTexture = useLoader(TextureLoader, '1_earth_16k.jpg') 
  
  const regions: Region[] = [
    { id: 1, name: "Land 1", price: "1000 PLHH", available: true, position: [0.5, 0.5, 0.5] },
    { id: 2, name: "Land 2", price: "800 PLHH", available: true, position: [-0.5, 0, 0.5] },
    { id: 3, name: "Land 3", price: "1200 PLHH", available: false, position: [0, 0.8, 0] },
    { id: 4, name: "Land 4", price: "1500 PLHH", available: true, position: [0.8, 0.2, 0] },
    { id: 5, name: "Land 5", price: "700 PLHH", available: true, position: [0, -0.5, 0.8] },
    { id: 6, name: "Land 6", price: "900 PLHH", available: true, position: [0.8, -0.5, 0] },
  ]

  return (
    <group>
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      {regions.map((region) => (
        <mesh
          key={region.id}
          position={new Vector3(...region.position)}
          onPointerOver={() => setHoveredRegion(region)}
          onPointerOut={() => setHoveredRegion(null)}
        >
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial
            color={region.available ? "#FFD700" : "#4a4a4a"}
            emissive={hoveredRegion?.id === region.id ? "#FFD700" : "#000000"}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Rest of your MetaverseMapSection component remains the same...
export function MetaverseMapSection() {
  return (
    <section className="py-8 md:py-16 lg:py-20">
      <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal width="100%" className="w-full">
          <h2 className="mb-8 md:mb-12 text-center font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
              PLHH Metaverse World
            </span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          <Reveal width="100%" className="w-full">
            <Card className="h-full min-w-96 border-yellow-500/10 bg-black/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6">
                <div className="h-[300px] md:h-[400px] w-full">
                  <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <Globe />
                    <OrbitControls
                      enableZoom={true}
                      enablePan={false}
                      autoRotate
                      autoRotateSpeed={0.8}
                    />
                    <Environment preset="night" />
                  </Canvas>
                </div>
              </CardContent>
            </Card>
          </Reveal>
          <Reveal width="100%" className="w-full">
            <Card className="h-full min-w-96 border-yellow-500/10 bg-black/50 backdrop-blur-sm">
              <CardContent className="p-4 md:p-6 ">
                <h3 className="mb-4 font-montserrat text-lg md:text-xl font-semibold text-yellow-500">
                  Available Regions
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <TooltipProvider>
                    {[
                      { name: "Land 1", price: "1000 PLHH", available: true },
                      { name: "Land 2", price: "800 PLHH", available: true },
                      { name: "Land 3", price: "1200 PLHH", available: false },
                      { name: "Land 4", price: "1500 PLHH", available: true },
                      { name: "Land 5", price: "700 PLHH", available: true },
                      { name: "Land 6", price: "900 PLHH", available: true },
                    ].map((region, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <div
                            className={`cursor-pointer rounded-lg border ${
                              region.available
                                ? "border-yellow-500/20 bg-yellow-500/10 hover:bg-yellow-500/20"
                                : "border-gray-500/20 bg-gray-500/10"
                            } p-3 md:p-4 transition-colors`}
                          >
                            <div className="font-montserrat font-semibold">
                              {region.name}
                            </div>
                            <div className="text-sm text-neutral-400">
                              {region.price}
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{region.available ? "Available" : "Sold Out"}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
                <div className="mt-4 md:mt-6">
                  <Button
                    className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black hover:from-amber-600 hover:to-yellow-600"
                  >
                    Explore Lands
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const StakingHero = () => {
  const heroRef = useRef(null)
  const treeRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Wrap GSAP code in a context for easier cleanup
    const ctx = gsap.context(() => {
      // Create a timeline with ScrollTrigger to drive the glow effect
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          // Change the end value if needed to match your design
          end: "bottom top",
          pin: true,
          scrub: true,
        },
      })

      // Animate the tree's brightness from 0% to 100%
      tl.to(treeRef.current, {
        filter: "brightness(100%)",
        ease: "none",
        duration: 1, // This duration is scroll‐tied (scrubbed), so it plays over the pin period
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center bg-black"
    >
      {/* The tree image is loaded from the public folder */}
      <img
        ref={treeRef}
        src="/tree.png"
        alt="Tree"
        className="filter brightness-[0%]"
      />
    </section>
  )
}

export default StakingHero

"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const StakingHero = () => {
  const heroRef = useRef(null)
  const treeRef = useRef(null)
  const gradientRef = useRef(null)
  const overlayGlowRef = useRef(null)

  const imageTopLeftRef = useRef(null)
  const imageBottomRightRef = useRef(null)

  const topLeftRef = useRef(null)
  const topRightRef = useRef(null)
  const bottomRightRef = useRef(null)
  const bottomLeftRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=5000",
          pin: true,
          scrub: true,
        },
      })

      // Background gradient animation
      tl.to(gradientRef.current, {
        backgroundPosition: "center 10%",
        filter: "brightness(200%)",
        ease: "back.in",
        duration: 1,
      }, 0)

      // Tree fade-in on scroll (starts from 40% brightness)
      gsap.to(treeRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        filter: "brightness(100%)",
        ease: "none",
      })

      // Text entry animations
      tl.fromTo(imageTopLeftRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        0.1
      )
      tl.fromTo(imageBottomRightRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" },
        0.4
      )
      tl.to([imageTopLeftRef.current, imageBottomRightRef.current],
        { opacity: 0, duration: 0.8, ease: "power2.inOut" },
        1.2
      )

      tl.fromTo(topLeftRef.current,
        { opacity: 0, x: -50, y: -50 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" },
        2.0
      )
      tl.fromTo(topRightRef.current,
        { opacity: 0, x: 50, y: -50 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" },
        2.4
      )
      tl.fromTo(bottomRightRef.current,
        { opacity: 0, x: 50, y: 50 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" },
        2.8
      )
      tl.fromTo(bottomLeftRef.current,
        { opacity: 0, x: -50, y: 50 },
        { opacity: 1, x: 0, y: 0, duration: 1.2, ease: "power2.out" },
        3.2
      )

      tl.fromTo(overlayGlowRef.current,
        { scale: 0.2, opacity: 0.4, yPercent: 100 },
        {
          scale: 2.5,
          opacity: 0.8,
          yPercent: -100,
          duration: 3,
          ease: "power2.out"
        },
        4.0
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden text-white"
    >
      {/* Gradient Background */}
      <div
        ref={gradientRef}
        className="absolute inset-0 z-0 transition-all duration-700"
        style={{
          backgroundImage: "linear-gradient(to top, #1a1203, black)",
          backgroundSize: "100% 300%",
          backgroundPosition: "center 100%",
          filter: "brightness(100%)",
        }}
      />

      {/* Tree Image - now starting at 40% brightness */}
      <img
        ref={treeRef}
        src="/tree.png"
        alt="Tree Background"
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[40%] transition-all duration-500"
      />

      {/* Overlay Glow */}
      <div
        ref={overlayGlowRef}
        className="absolute left-1/2 bottom-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#f5e08e] to-transparent blur-3xl opacity-0 z-30 pointer-events-none transform -translate-x-1/2"
      />

      {/* Text Blocks */}
      <div className="absolute inset-0 flex flex-col justify-between z-20 px-6 md:px-16 py-28">
        <div
          ref={imageTopLeftRef}
          className="absolute top-28 left-6 md:left-16 max-w-[320px] h-[100px] flex flex-col justify-between text-lg md:text-xl font-semibold opacity-0"
        >
          <div className="text-left">
            <p>You don’t stake to <span className="text-[#c1983b] font-bold">earn.</span></p>
          </div>
          <div className="text-right">
            <p>You stake to <span className="text-[#c1983b] font-bold">anchor.</span></p>
          </div>
        </div>

        <div
          ref={imageBottomRightRef}
          className="absolute bottom-10 right-6 md:right-16 max-w-[300px] leading-snug text-right text-sm md:text-base font-medium opacity-0"
        >
          <p>You don’t lock your <span className="text-[#c1983b] font-semibold">tokens.</span></p>
          <p>You <span className="text-green-600 font-bold">plant</span> them.</p>
        </div>

        <div className="flex justify-between w-full gap-4 flex-col md:flex-row">
          <div ref={topLeftRef} className="max-w-[280px] md:max-w-[340px] text-left leading-snug opacity-0">
            <p className="text-lg md:text-xl font-semibold">
              Staking in this system isn’t<br />passive —
            </p>
            <p className="text-xl md:text-2xl italic font-semibold text-[#c1983b] mt-1">
              it’s <span className="italic">powerful.</span>
            </p>
          </div>

          <div ref={topRightRef} className="max-w-[300px] text-right leading-snug text-sm md:text-base opacity-0">
            <p>
              It’s a <span className="italic text-[#c1983b]">commitment</span>.<br />
              A <span className="italic text-[#c77d2d]">contribution</span>.<br />
              A <span className="italic text-[#c1983b]">conversation</span> between<br />
              <span className="text-[#ce6e37] font-semibold">time</span> and <span className="text-[#a3a79b] font-semibold">truth</span>.
            </p>
          </div>
        </div>

        <div className="flex justify-between w-full gap-4 flex-col md:flex-row mt-6">
          <div ref={bottomLeftRef} className="text-left max-w-[300px] text-sm md:text-base leading-snug opacity-0">
            <p>We don’t <span className="text-[#c1983b] font-semibold">freeze</span> your tokens.<br />
              We <span className="text-green-600 font-semibold">plant</span> them.</p>
          </div>

          <div ref={bottomRightRef} className="text-right max-w-[300px] text-sm md:text-base leading-snug opacity-0">
            <p>And what grows from your <span className="text-[#ce6e37] font-semibold">trust...</span><br />
              returns in <span className="text-[#c1983b] italic">frequency</span>.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StakingHero

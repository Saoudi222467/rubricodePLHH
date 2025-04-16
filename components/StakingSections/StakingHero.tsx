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

  const followUpSectionRef = useRef(null)
  const rowRefs = useRef([])

  const tableData = [
    ["1 year", "Initiation", "11%"],
    ["2 years", "Connection", "22%"],
    ["3 years", "Trust", "33%"],
    ["4 years", "Foundation", "44%"],
    ["5 years", "Expansion", "55%"],
    ["6 years", "Integration", "66%"],
    ["7 years", "Mastery", "77%"],
    ["8 years", "Infinity", "77%"],
  ]

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

      tl.to(gradientRef.current, {
        backgroundPosition: "center 10%",
        filter: "brightness(200%)",
        ease: "back.in",
        duration: 1,
      }, 0)

      tl.to(treeRef.current, {
        filter: "brightness(100%)",
        ease: "power1.inOut",
        duration: 10,
      }, 0)

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

      tl.to([
        topLeftRef.current,
        topRightRef.current,
        bottomLeftRef.current,
        bottomRightRef.current
      ], {
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, 4.8)

      tl.fromTo(followUpSectionRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" },
        5.8
      )

      rowRefs.current.forEach((ref, index) => {
        tl.fromTo(ref,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          6.2 + index * 0.2
        )
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden text-white"
    >
      {/* Gradient + Background Image */}
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
      <img
        ref={treeRef}
        src="/tree.png"
        alt="Tree Background"
        className="absolute inset-0 w-full h-full object-cover z-0 brightness-[10%]"
      />
      <div
        ref={overlayGlowRef}
        className="absolute left-1/2 bottom-0 w-96 h-96 rounded-full bg-gradient-to-br from-[#f5e08e] to-transparent blur-3xl opacity-0 z-30 pointer-events-none transform -translate-x-1/2"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-between z-20 px-6 md:px-16 py-28">
        {/* Initial Quotes */}
        <div ref={imageTopLeftRef} className="absolute top-28 left-6 md:left-16 max-w-[320px] h-[100px] text-4xl font-semibold opacity-0">
          <p className="text-left">You don’t stake to <span className="text-[#c1983b] font-bold">earn.</span></p>
          <p className="text-right">You stake to <span className="text-[#c1983b] font-bold">anchor.</span></p>
        </div>
        <div ref={imageBottomRightRef} className="absolute bottom-10 right-6 md:right-16 max-w-[300px] text-right text-4xl font-medium opacity-0">
          <p>You don’t lock your <span className="text-[#c1983b] font-semibold">tokens.</span></p>
          <p>You <span className="text-green-600 font-bold">plant</span> them.</p>
        </div>

        {/* Quadrant Text */}
        <div className="flex justify-between w-full gap-4 flex-col md:flex-row">
          <div ref={topLeftRef} className="max-w-[280px] text-left text-4xl opacity-0">
            <p>Staking in this system isn’t<br />passive —</p>
            <p className="italic font-semibold text-[#c1983b] mt-1">it’s <span className="italic">powerful.</span></p>
          </div>
          <div ref={topRightRef} className="max-w-[300px] text-right text-4xl opacity-0">
            <p>It’s a <span className="italic text-[#c1983b]">commitment</span>.<br />A <span className="italic text-[#c77d2d]">contribution</span>.<br />
              A <span className="italic text-[#c1983b]">conversation</span> between<br /><span className="text-[#ce6e37] font-semibold">time</span> and <span className="text-[#a3a79b] font-semibold">truth</span>.</p>
          </div>
        </div>
        <div className="flex justify-between w-full gap-4 flex-col md:flex-row ">
          <div ref={bottomLeftRef} className="max-w-[300px] text-4xl opacity-0">
            <p>We don’t <span className="text-[#c1983b] font-semibold">freeze</span> your tokens.<br />We <span className="text-green-600 font-semibold">plant</span> them.</p>
          </div>
          <div ref={bottomRightRef} className="max-w-[300px] text-right text-4xl opacity-0">
            <p>And what grows from your <span className="text-[#ce6e37] font-semibold">trust...</span><br />
              returns in <span className="text-[#c1983b] italic">frequency</span>.</p>
          </div>
        </div>

        {/* Final Quote + Animated Table */}
        <div ref={followUpSectionRef} className=" flex flex-col lg:flex-row justify-between items-start opacity-0 mt-[-350px] ">
          <div className="max-w-xl text-4xl font-semibold">
            <p>The deeper you root, the<br />more you receive —</p>
            <p className="text-[#c1983b] mt-3">not just in tokens, but in<br />influence, access, and<br />alignment.</p>
          </div>

          <div className="text-4xl font-medium w-full max-w-xl">
            <table className="w-full text-left border-collapse">
              <thead className="text-[#c1983b]">
                <tr>
                  <th className="py-4">Commitment</th>
                  <th className="py-4">Frequency</th>
                  <th className="py-4">APY</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                {tableData.map(([term, freq, apy], idx) => (
                  <tr
                    key={idx}
                    ref={el => rowRefs.current[idx] = el}
                    className="opacity-0"
                  >
                    <td className="py-4">{term}</td>
                    <td className="py-4">{freq}</td>
                    <td className="py-4">{apy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StakingHero

"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useScrollContext } from "./scroll-context"

interface ScrollSectionProps {
  id: string
  children: React.ReactNode
  className?: string
}

export const ScrollSection: React.FC<ScrollSectionProps> = ({ id, children, className = "" }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const { registerSection, getSectionVisibility, activeSectionId } = useScrollContext()

  useEffect(() => {
    if (sectionRef.current) {
      registerSection(id, sectionRef)
    }
  }, [id, registerSection])

  const { opacity, isActive, progress } = getSectionVisibility(id)
  const isActiveSection = id === activeSectionId

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen minting-section ${className}`}
      id={id}
      data-active={isActiveSection ? "true" : "false"}
    >
      <motion.div
        className="fixed inset-0 w-full h-full flex items-center justify-center pointer-events-none"
        style={{
          opacity,
          zIndex: isActive ? 10 : 0,
          pointerEvents: isActive ? "auto" : "none",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </section>
  )
}

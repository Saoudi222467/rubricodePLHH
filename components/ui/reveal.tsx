'use client'

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface RevealProps {
  children: React.ReactNode
  width?: "100%" | "100%"
  className?: string  // Add className prop
}

export function Reveal({ children, width = "100%", className }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div 
      ref={ref} 
      style={{ position: "relative", width, overflow: "hidden" }}
      className={className} // Apply className
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 }
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
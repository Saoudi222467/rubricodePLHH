"use client"

import type React from "react"
import { createContext, useContext, useRef, useState, useEffect } from "react"
import { useScroll, useSpring } from "framer-motion"

type ScrollContextType = {
  mainScrollProgress: any
  smoothScrollProgress: any
  registerSection: (id: string, ref: React.RefObject<HTMLElement>) => void
  getSectionVisibility: (id: string) => { opacity: number; isActive: boolean; progress: number }
  activeSectionId: string | null
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export const useScrollContext = () => {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider")
  }
  return context
}

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const [sections, setSections] = useState<Record<string, React.RefObject<HTMLElement>>>({})
  const [sectionVisibility, setSectionVisibility] = useState<
    Record<string, { opacity: number; isActive: boolean; progress: number }>
  >({})
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
  const [sectionOrder, setSectionOrder] = useState<string[]>([])

  // Track overall scroll progress
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  })

  // Smooth out the scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  // Register a section to be tracked and maintain order
  const registerSection = (id: string, ref: React.RefObject<HTMLElement>) => {
    setSections((prev) => ({ ...prev, [id]: ref }))
    setSectionOrder((prev) => {
      if (!prev.includes(id)) {
        return [...prev, id]
      }
      return prev
    })
  }

  // Get visibility state for a section
  const getSectionVisibility = (id: string) => {
    return sectionVisibility[id] || { opacity: 0, isActive: false, progress: 0 }
  }

  // Update section visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!mainRef.current) return

      const viewportHeight = window.innerHeight
      const scrollTop = window.scrollY

      const newVisibility: Record<string, { opacity: number; isActive: boolean; progress: number }> = {}
      let currentActiveSection: string | null = null
      let highestVisibilityRatio = 0

      // First pass: calculate visibility and find the most visible section
      Object.entries(sections).forEach(([id, sectionRef]) => {
        if (!sectionRef.current) return

        const rect = sectionRef.current.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionHeight = rect.height

        // Calculate visibility ratio (how much of the section is in the viewport)
        const visibleTop = Math.max(0, -sectionTop)
        const visibleBottom = Math.min(sectionHeight, viewportHeight - sectionTop)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)
        const visibilityRatio = visibleHeight / viewportHeight

        // Calculate progress through the section (0 at top, 1 at bottom)
        const sectionProgress = Math.max(0, Math.min(1, -sectionTop / (sectionHeight - viewportHeight)))

        // Track the most visible section
        if (visibilityRatio > highestVisibilityRatio) {
          highestVisibilityRatio = visibilityRatio
          currentActiveSection = id
        }

        newVisibility[id] = {
          opacity: 0, // Default to 0, will update in second pass
          isActive: false, // Default to false, will update in second pass
          progress: sectionProgress,
        }
      })

      // Set the active section
      setActiveSectionId(currentActiveSection)

      // Second pass: determine which sections should be visible based on order
      if (currentActiveSection && sectionOrder.length > 0) {
        const activeIndex = sectionOrder.indexOf(currentActiveSection)

        // Only the active section should be visible
        Object.keys(newVisibility).forEach((id) => {
          const idIndex = sectionOrder.indexOf(id)

          if (id === currentActiveSection) {
            // Active section is fully visible
            const progress = newVisibility[id].progress

            // Fade in during first 20% of section scroll
            let opacity = 0
            if (progress < 0.2) {
              opacity = progress / 0.2
            } else if (progress <= 0.9) {
              opacity = 1
            } else {
              // Fade out during last 10% of section scroll
              opacity = 1 - (progress - 0.9) / 0.1
            }

            newVisibility[id] = {
              opacity,
              isActive: true,
              progress,
            }
          } else if (idIndex === activeIndex + 1 && currentActiveSection && newVisibility[currentActiveSection].progress > 0.9) {
            // Next section starts to appear when current is 90% scrolled
            const fadeInAmount = (newVisibility[currentActiveSection].progress - 0.9) / 0.1
            newVisibility[id] = {
              opacity: fadeInAmount,
              isActive: fadeInAmount > 0.1,
              progress: 0,
            }
          } else if (idIndex === activeIndex - 1 && currentActiveSection && newVisibility[currentActiveSection].progress < 0.1) {
            // Previous section is still visible when current is less than 10% scrolled
            const fadeOutAmount = 1 - newVisibility[currentActiveSection].progress / 0.1
            newVisibility[id] = {
              opacity: fadeOutAmount,
              isActive: fadeOutAmount > 0.1,
              progress: 1,
            }
          } else {
            // Other sections are not visible
            newVisibility[id] = {
              opacity: 0,
              isActive: false,
              progress: newVisibility[id].progress,
            }
          }
        })
      }

      setSectionVisibility(newVisibility)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections, sectionOrder])

  return (
    <ScrollContext.Provider
      value={{
        mainScrollProgress: scrollYProgress,
        smoothScrollProgress,
        registerSection,
        getSectionVisibility,
        activeSectionId,
      }}
    >
      <div ref={mainRef} className="minting-scroll-container">
        {children}
      </div>
    </ScrollContext.Provider>
  )
}

"use client"

import { useEffect } from "react"

export default function EnsureBlackBackground() {
  useEffect(() => {
    // Add class to html element
    document.documentElement.classList.add("has-minting-page")

    // Store original background colors
    const originalHtmlBg = document.documentElement.style.backgroundColor
    const originalBodyBg = document.body.style.backgroundColor

    // Set background to black
    document.documentElement.style.backgroundColor = "black"
    document.body.style.backgroundColor = "black"

    // Cleanup function
    return () => {
      document.documentElement.classList.remove("has-minting-page")
      document.documentElement.style.backgroundColor = originalHtmlBg
      document.body.style.backgroundColor = originalBodyBg
    }
  }, [])

  return null
}

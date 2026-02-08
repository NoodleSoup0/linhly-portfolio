"use client"

import { useEffect, useRef, useState } from "react"

const PHRASES = [
  "from messy inputs to usable outputs.",
  "with real data and real constraints.",
  "to address real problems.",
  "to support analysis and decision-making.",
  "designed with usability in mind.",
  "by building, testing, and iterating.",
]

export function RotatingSubtitle() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisible(false)

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)

      timeoutRef.current = window.setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length)
        setVisible(true)
      }, 250)
    }, 6500)

    return () => {
      window.clearInterval(interval)
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <span
      className={`inline-block text-slate-400 transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      }`}
    >
      {PHRASES[index]}
    </span>
  )
}

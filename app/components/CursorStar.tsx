"use client"

import { useEffect, useRef, useState } from "react"
import clsx from "clsx"

type Bloom = {
  id: string
  x: number
  y: number
  size: number
  pink: number
  blue: number
  yellow: number
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// Smooth "noise" without dependencies.
// Combine a few sine waves with random phases for organic drift.
function makeWiggle() {
  const a1 = rand(0, Math.PI * 2)
  const a2 = rand(0, Math.PI * 2)
  const a3 = rand(0, Math.PI * 2)
  const f1 = rand(0.8, 1.4)
  const f2 = rand(1.6, 2.4)
  const f3 = rand(2.6, 3.6)
  return (t: number) =>
    Math.sin(t * f1 + a1) * 0.55 + Math.sin(t * f2 + a2) * 0.30 + Math.sin(t * f3 + a3) * 0.15
}

export function CursorStar() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [active, setActive] = useState(false)

  // CSS-driven click blooms (state updates only on click + cleanup)
  const [blooms, setBlooms] = useState<Bloom[]>([])

  // Cursor drift state
  const targetRef = useRef({ x: 0, y: 0 })
  const smoothRef = useRef({ x: 0, y: 0 })
  const tRef = useRef(0)
  const wiggleX = useRef(makeWiggle())
  const wiggleY = useRef(makeWiggle())
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
      setActive(true)
    }
    const onLeave = () => setActive(false)

    const onClick = (e: MouseEvent) => {
      // Spawn a few blooms around the click point
      const count = 4
      const now = Date.now()

      const next: Bloom[] = Array.from({ length: count }).map((_, i) => {
        const r = rand(0, 28)
        const a = rand(0, Math.PI * 2)
        return {
          id: `${now}-${Math.random()}-${i}`,
          x: e.clientX + Math.cos(a) * r,
          y: e.clientY + Math.sin(a) * r,
          size: rand(160, 280), // smaller than before for perf
          pink: rand(0.55, 0.95),
          blue: rand(0.10, 0.40),
          yellow: rand(0.08, 0.28),
        }
      })

      setBlooms((prev) => {
        const combined = [...prev, ...next]
        // keep last ~28 blooms max (each click adds 4)
        return combined.length > 28 ? combined.slice(combined.length - 28) : combined
      })

      // Cleanup after animation completes (CSS anim is 950ms)
      window.setTimeout(() => {
        setBlooms((prev) => prev.filter((b) => !next.some((n) => n.id === b.id)))
      }, 1000)
    }

    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("blur", onLeave)
    window.addEventListener("mouseleave", onLeave as any)
    window.addEventListener("click", onClick)

    return () => {
      window.removeEventListener("pointermove", onMove as any)
      window.removeEventListener("blur", onLeave as any)
      window.removeEventListener("mouseleave", onLeave as any)
      window.removeEventListener("click", onClick as any)
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      // Smooth cursor follow + orbit drift (cheap; only updates one small element)
      tRef.current += 1 / 60
      const tx = targetRef.current.x
      const ty = targetRef.current.y
      const s = smoothRef.current

      const lerp = 0.18
      s.x += (tx - s.x) * lerp
      s.y += (ty - s.y) * lerp

      const t = tRef.current
      const wobX = wiggleX.current(t) * 18
      const wobY = wiggleY.current(t) * 16
      const orbitX = Math.cos(t * 0.9) * 10
      const orbitY = Math.sin(t * 1.1) * 8

      setPos({ x: s.x + wobX + orbitX + 12, y: s.y + wobY + orbitY + 12 })
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Cursor buddy: circular blob of lights */}
      <div
        className={clsx(
          "pointer-events-none fixed left-0 top-0 z-50 transition-opacity duration-200",
          active ? "opacity-100" : "opacity-0"
        )}
        style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      >
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full blur-xl bg-primary/45 mix-blend-screen" />
          <div className="absolute inset-1 rounded-full blur-lg bg-accent/35 mix-blend-screen" />
          <div className="absolute inset-2 rounded-full blur-md bg-sunshine/45 mix-blend-screen" />
          <div className="absolute inset-[9px] rounded-full bg-white/60 border border-white/30" />
          <div className="absolute left-2 top-3 h-1.5 w-1.5 rounded-full bg-sunshine/90 blur-[0.5px]" />
          <div className="absolute right-3 top-2 h-1 w-1 rounded-full bg-primary/90 blur-[0.5px]" />
          <div className="absolute right-2 bottom-3 h-1.5 w-1.5 rounded-full bg-accent/90 blur-[0.5px]" />
        </div>
      </div>

      {/* Click blooms overlay (CSS animated, no per-frame React updates) */}
      <div className="pointer-events-none fixed inset-0 z-40">
        {blooms.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full animate-click-bloom"
            style={{
              left: b.x,
              top: b.y,
              width: b.size,
              height: b.size,
              // Avoid blend modes here for perf; gradient is bright enough.
              background:
                `radial-gradient(circle at 40% 40%, rgba(244,114,182,${0.45 * b.pink}), transparent 62%),` +
                `radial-gradient(circle at 65% 35%, rgba(96,165,250,${0.26 * b.blue}), transparent 70%),` +
                `radial-gradient(circle at 50% 75%, rgba(251,191,36,${0.18 * b.yellow}), transparent 72%)`,
            }}
          />
        ))}
      </div>
    </>
  )
}

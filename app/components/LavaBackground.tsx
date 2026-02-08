"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"

type Hue = "sunshine" | "primary" | "accent"
type Kind = "blob" | "light"

type Layer = {
  id: string
  x: number
  y: number
  size: number
  hue: Hue
  kind: Kind
  vy: number
  amp: number
  freq: number
  phase: number
  drift: number
  born: number
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}
function rnd(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

export function LavaBackground({ className }: { className?: string }) {
  const hues: Hue[] = ["sunshine", "primary", "accent"]

  const initialLayers = useMemo<Layer[]>(() => {
    const big = Array.from({ length: 5 }).map((_, i) => ({
      id: `blob-${i}`,
      x: rnd(0, 100),
      y: rnd(-20, 160),
      size: rnd(680, 1080),
      hue: pick(hues),
      kind: "blob" as const,
      vy: -rnd(2.4, 4.2),
      amp: rnd(4.0, 8.5),
      freq: rnd(0.45, 1.05),
      phase: rnd(0, Math.PI * 2),
      drift: rnd(-0.7, 0.7),
      born: 1,
    }))

    // MORE lights, slightly smaller
    const lights = Array.from({ length: 28 }).map((_, i) => ({
      id: `light-${i}`,
      x: rnd(0, 100),
      y: rnd(-20, 160),
      size: rnd(180, 320),
      hue: pick(hues),
      kind: "light" as const,
      vy: -rnd(4.8, 7.8),
      amp: rnd(6.0, 12.0),
      freq: rnd(0.85, 1.75),
      phase: rnd(0, Math.PI * 2),
      drift: rnd(-1.1, 1.1),
      born: 1,
    }))

    return [...big, ...lights]
  }, [])

  const layersRef = useRef<Layer[]>(initialLayers)
  const lastRef = useRef<number>(0)
  const [, setTick] = useState(0)

  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const cursorTarget = useRef({ x: 0, y: 0 })
  const cursorSmooth = useRef({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setHasMoved(true)
      cursorTarget.current = { x: e.clientX, y: e.clientY }
      const px = (e.clientX / window.innerWidth - 0.5) * 14
      const py = (e.clientY / window.innerHeight - 0.5) * 14
      setParallax({ x: px, y: py })
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove as any)
  }, [])

  useEffect(() => {
    let raf = 0
    const step = (t: number) => {
      if (!lastRef.current) lastRef.current = t
      const dt = Math.min(0.05, (t - lastRef.current) / 1000)
      lastRef.current = t

      const ct = cursorTarget.current
      const cs = cursorSmooth.current
      const lerp = 0.14
      cs.x += (ct.x - cs.x) * lerp
      cs.y += (ct.y - cs.y) * lerp
      setCursor({ x: cs.x, y: cs.y })

      const layers = layersRef.current
      for (const l of layers) {
        l.y += l.vy * dt
        const wob = Math.sin(t / 1000 * l.freq + l.phase) * l.amp
        l.x += l.drift * dt + wob * dt * 0.9

        const bornSeconds = l.kind === "light" ? 2.0 : 1.4
        l.born = Math.min(1, l.born + dt / bornSeconds)

        if (l.y < -40) {
          l.y = 160 + rnd(0, 40)
          l.x = (l.x + rnd(-16, 16) + 100) % 100
          l.phase = rnd(0, Math.PI * 2)
          l.drift = rnd(l.kind === "light" ? -1.2 : -0.9, l.kind === "light" ? 1.2 : 0.9)
          l.born = 0
        }

        if (l.x < -12) l.x += 124
        if (l.x > 112) l.x -= 124
      }

      setTick((v) => (v + 1) % 1000000)
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const layers = layersRef.current

  return (
    <div aria-hidden="true" className={clsx("fixed inset-0 -z-10 overflow-hidden", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(96,165,250,0.26),transparent_55%),radial-gradient(circle_at_100%_0%,rgba(244,114,182,0.24),transparent_55%),radial-gradient(circle_at_55%_85%,rgba(251,191,36,0.22),transparent_66%)]" />

      <div className="absolute inset-0">
        <div
          className={clsx(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl mix-blend-screen transition-opacity duration-300",
            hasMoved ? "opacity-100" : "opacity-0"
          )}
          style={{
            left: cursor.x,
            top: cursor.y,
            width: 680,
            height: 680,
            background:
              "radial-gradient(circle at 40% 40%, rgba(244,114,182,0.62), transparent 56%)," +
              "radial-gradient(circle at 60% 42%, rgba(244,114,182,0.44), transparent 62%)," +
              "radial-gradient(circle at 48% 72%, rgba(96,165,250,0.26), transparent 64%)," +
              "radial-gradient(circle at 52% 78%, rgba(251,191,36,0.22), transparent 66%)",
          }}
        />
        <div
          className={clsx(
            "absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl mix-blend-screen transition-opacity duration-300",
            hasMoved ? "opacity-95" : "opacity-0"
          )}
          style={{
            left: cursor.x,
            top: cursor.y,
            width: 320,
            height: 320,
            background: "radial-gradient(circle at center, rgba(255,255,255,0.22), transparent 60%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 transition-transform duration-500"
        style={{ transform: `translate(${parallax.x}px, ${parallax.y}px)` }}
      >
        {layers.map((b) => {
          const isLight = b.kind === "light"
          const fadeIn = smoothstep(150, 85, b.y)
          const fadeOut = 1 - smoothstep(10, -22, b.y)
          const edgeFade = clamp01(fadeIn * fadeOut) * b.born
          const baseOpacity = isLight ? 0.9 : 0.78

          return (
            <div
              key={b.id}
              className={clsx("absolute mix-blend-screen animate-blob", isLight ? "blur-2xl" : "blur-3xl")}
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                width: `${b.size}px`,
                height: `${b.size}px`,
                opacity: baseOpacity * edgeFade,
              }}
            >
              <div
                className={clsx(
                  "w-full h-full",
                  b.hue === "sunshine" && (isLight ? "bg-sunshine/78" : "bg-sunshine/68"),
                  b.hue === "primary" && (isLight ? "bg-primary/75" : "bg-primary/62"),
                  b.hue === "accent" && (isLight ? "bg-accent/80" : "bg-accent/60")
                )}
                style={{ borderRadius: "inherit" }}
              />
            </div>
          )
        })}
      </div>

      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:3px_3px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_58%,rgba(11,16,32,0.82))]" />
    </div>
  )
}

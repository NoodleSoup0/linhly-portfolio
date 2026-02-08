"use client"

import { useMemo, useState } from "react"
import clsx from "clsx"
import { CodeLine } from "./CodeLine"

type Mode = "idle" | "ds" | "cs" | "friends"

const messages: Record<Mode, { title: string; lines: string[] }> = {
  idle: {
    title: "hi — i’m your tiny guide ✨",
    lines: [
      "Recruiter? start with → experience",
      "Want proof? pick a path below",
      "I’ll keep it quick.",
    ],
  },
  ds: {
    title: "data brain activated",
    lines: [
      "models · analysis · dashboards",
      "pick DS artifacts →",
      "i like clean results.",
    ],
  },
  cs: {
    title: "systems brain activated",
    lines: [
      "apps · automation · testing",
      "pick CS artifacts →",
      "i like reliable code.",
    ],
  },
  friends: {
    title: "ok hi friends 🙂",
    lines: [
      "side quests + little delights",
      "the soft stuff lives here",
      "come say hi.",
    ],
  },
}

export function StarBuddy({
  mode,
  className,
}: {
  mode: Mode
  className?: string
}) {
  const [blink, setBlink] = useState(false)

  const msg = useMemo(() => messages[mode], [mode])

  return (
    <div className={clsx("relative", className)}>
      {/* Speech bubble */}
      <div className="rounded-2xl border border-black/10 bg-white/60 p-4 shadow-sm">
        <p className="text-sm font-medium">{msg.title}</p>
        <div className="mt-2 space-y-1">
          {msg.lines.map((l) => (
            <CodeLine key={l} className="text-text/80 hover:text-primary">
              // {l}
            </CodeLine>
          ))}
        </div>
      </div>

      {/* little pointer */}
      <div className="absolute -bottom-2 left-10 h-4 w-4 rotate-45 border border-black/10 bg-white/60" />

      {/* Star */}
      <button
        type="button"
        aria-label="star buddy"
        onMouseEnter={() => setBlink(true)}
        onMouseLeave={() => setBlink(false)}
        className="absolute -bottom-10 left-6 grid place-items-center rounded-full p-2 transition-transform hover:rotate-3 hover:scale-[1.02]"
      >
        <svg width="78" height="78" viewBox="0 0 120 120" className="drop-shadow-sm">
          <path
            d="M60 10 L74 44 L110 44 L80 66 L92 102 L60 80 L28 102 L40 66 L10 44 L46 44 Z"
            fill="#F472B6"
            opacity="0.12"
          />
          <path
            d="M60 14 L73 44 L106 44 L79 64 L90 98 L60 78 L30 98 L41 64 L14 44 L47 44 Z"
            fill="#34D399"
            opacity="0.28"
          />
          <path
            d="M60 18 L72 44 L102 44 L78 62 L88 94 L60 76 L32 94 L42 62 L18 44 L48 44 Z"
            fill="#FAF7F2"
            stroke="rgba(0,0,0,0.08)"
          />
          {/* face */}
          <circle cx="46" cy="58" r={blink ? 2 : 4} fill="rgba(55,65,81,0.9)" />
          <circle cx="74" cy="58" r={blink ? 2 : 4} fill="rgba(55,65,81,0.9)" />
          <path d="M52 72 Q60 78 68 72" stroke="rgba(55,65,81,0.9)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  )
}

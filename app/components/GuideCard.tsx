import { CodeLine } from "./CodeLine"

type Mode = "idle" | "ds" | "cs" | "friends"

const messages: Record<Mode, { title: string; lines: string[] }> = {
  idle: {
    title: "quick tour",
    lines: ["Recruiter? start with → experience", "Want proof? pick a path below", "Click anywhere for ✨"],
  },
  ds: {
    title: "data science",
    lines: ["modeling + analysis", "pipelines + validation", "viz + storytelling"],
  },
  cs: {
    title: "computer science",
    lines: ["full-stack + systems", "testing + automation", "shipping loops"],
  },
  friends: {
    title: "for friends",
    lines: ["tiny projects", "notes + favorites", "soft internet vibes"],
  },
}

export function GuideCard({ mode }: { mode: Mode }) {
  const m = messages[mode]
  return (
    <div className="rounded-2xl border border-black/10 bg-white/80 p-6 text-slate-900 shadow-sm">
      <div className="text-sm font-semibold">{m.title}</div>
      <div className="mt-3 space-y-1">
        {m.lines.map((l) => (
          <CodeLine key={l} className="text-slate-600">
            {"// "}{l}
          </CodeLine>
        ))}
      </div>
    </div>
  )
}

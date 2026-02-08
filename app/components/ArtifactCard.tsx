import Link from "next/link"
import clsx from "clsx"
import { ExternalLink as ExternalLinkIcon } from "lucide-react"
import { CodeLine } from "./CodeLine"
import { Pill } from "./Pill"

type ArtifactCardProps = {
  title: string
  note: string
  description: string
  stack: string[]
  track: "ds" | "cs" | "mix"
  linkUrl: string
  external?: boolean
}

function LinkBadge({ href, external }: { href: string; external?: boolean }) {
  const base =
    "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-sm hover:shadow transition-all hover:text-primary"

  const icon = (
    <ExternalLinkIcon
      className="h-3.5 w-3.5 opacity-70"
      aria-hidden
    />
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={base}
        aria-label="Open project link in new tab"
      >
        {icon}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={base}
      aria-label="Open project page"
    >
      {icon}
    </Link>
  )
}

export function ArtifactCard({
  title,
  note,
  description,
  stack,
  track,
  linkUrl,
  external,
}: ArtifactCardProps) {
  return (
    <div
      className={clsx(
        "group rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm",
        "hover:shadow-md hover:-translate-y-0.5 transition-all",
        "text-slate-900"
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">
            {title}
          </h3>

          <CodeLine className="text-slate-600 group-hover:text-accent">
            // {note}
          </CodeLine>
        </div>

        <div className="flex items-center gap-2">
          <Pill className="capitalize text-slate-800 border-slate-300">
            {track}
          </Pill>

          <LinkBadge href={linkUrl} external={external} />
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        {description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {stack.map((s) => (
          <Pill key={s} className="text-slate-800 border-slate-300">
            {s}
          </Pill>
        ))}
      </div>
    </div>
  )
}

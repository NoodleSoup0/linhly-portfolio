import Link from "next/link"
import clsx from "clsx"
import { CodeLine } from "../components/CodeLine"
import { SectionTitle } from "../components/SectionTitle"
import { experience } from "../lib/experience"

function LinkBadge({ href, external }: { href: string; external?: boolean }) {
  const base =
    "inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-sm hover:shadow transition-all hover:text-primary"
  const icon = <span aria-hidden>↗</span>

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={base}
        aria-label="Open link in new tab"
      >
        {icon}
      </a>
    )
  }

  return (
    <Link href={href} className={base} aria-label="Open link">
      {icon}
    </Link>
  )
}

export default function Experience() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <div className="space-y-2">
        <SectionTitle>experience</SectionTitle>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Selected experience from research and applied analytics.
        </p>
      </div>

      <div className="space-y-7">
        {experience.map((item) => (
          <div
            key={`${item.company}-${item.role}`}
            className={clsx(
              "rounded-2xl border border-black/10 bg-white/80 p-6 text-slate-900 shadow-sm"
            )}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="font-semibold">{item.role}</p>
                <p className="text-sm text-slate-700">
                  {item.company} • {item.location}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <p className="text-xs text-slate-600">{item.dates}</p>
                <LinkBadge href={item.linkUrl} external={item.external} />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              {item.bullets.map((b) => (
                <CodeLine key={b} className="text-slate-600">
                  {"// "}
                  {b}
                </CodeLine>
              ))}
            </div>
          </div>
        ))}
      <div className="space-y-4">
  <h3 className="text-lg font-semibold text-slate-200">
    CS highlights (selected builds)
  </h3>

  <div className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm space-y-3">
    <p className="text-sm text-slate-700 leading-relaxed">
      These projects showcase my computer science and systems work beyond formal roles.
    </p>

    <ul className="space-y-2 text-sm text-slate-800">
      <li>
        // Cloud PDF → NLP pipeline (AWS Lambda, S3, RDS)
      </li>
      <li>
        // Automated GUI testing suite (Selenium, Cucumber, JUnit)
      </li>
      <li>
        // Full-stack donation platform (React, Node.js, Firebase)
      </li>
    </ul>

    <a
      href="/personal-projects?track=cs"
      className="inline-block text-sm font-medium text-primary hover:underline"
    >
      View CS projects →
    </a>
  </div>
</div>

    </div>
    </main>
  )
}

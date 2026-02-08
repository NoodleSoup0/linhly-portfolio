import Link from "next/link"
import { SectionTitle } from "../../components/SectionTitle"
import { Pill } from "../../components/Pill"
import { CodeLine } from "../../components/CodeLine"

export default function ProjectPage() {
  const stack = ["Java", "JUnit", "Mockito", "JaCoCo", "GitHub Actions"]
  return (
    <main className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-2">
        <SectionTitle>Software Quality: Chess App (Agile + TDD)</SectionTitle>
        <p className="text-slate-300 leading-relaxed">A Java chess application built with strong OO design and test discipline (unit + integration), with CI running on every push.</p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-6 text-slate-900 shadow-sm space-y-3">
        <div className="flex flex-wrap gap-2">
          {stack.map((item) => (
            <Pill key={item} className="text-slate-800 border-slate-300">
              {item}
            </Pill>
          ))}
        </div>

        <CodeLine className="text-slate-600">
          // Add screenshots/GIFs + deeper notes here when you’re ready.
        </CodeLine>
        <CodeLine className="text-slate-600">
          // Keep it short: problem → approach → what you learned → link(s).
        </CodeLine>
      </div>

      <div>
        <Link
          href="/personal-projects"
          className="text-slate-300 hover:text-primary transition-colors"
        >
          ← back to personal projects
        </Link>
      </div>
    </main>
  )
}

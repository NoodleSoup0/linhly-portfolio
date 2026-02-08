import Link from "next/link"
import { CodeLine } from "../components/CodeLine"
import { SectionTitle } from "../components/SectionTitle"
import { Pill } from "../components/Pill"

export default function Friends() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-10 space-y-10">
      <div className="space-y-2">
        <SectionTitle>for friends</SectionTitle>
        <p className="text-sm text-slate-700 max-w-2xl leading-relaxed">
          The soft zone. Tiny projects, small wins, and what I’m learning lately.
        </p>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-6 space-y-4">
        <CodeLine className="text-slate-600">// currently learning</CodeLine>
        <div className="flex flex-wrap gap-2">
          <Pill>better UI rhythm</Pill>
          <Pill>testing that people trust</Pill>
          <Pill>tiny animation restraint</Pill>
        </div>
      </div>

      <div className="rounded-2xl border border-black/10 bg-white/80 p-6 space-y-4">
        <CodeLine className="text-slate-600">// tiny delights</CodeLine>
        <ul className="text-sm space-y-2">
          <li>• i like clean typography and small hover moments</li>
          <li>• i name variables like they’re telling the truth</li>
          <li>• i will absolutely overthink spacing</li>
        </ul>
      </div>

      <Link href="/" className="text-sm text-primary hover:text-accent transition-colors">
        → back to the star
      </Link>
    </main>
  )
}

import Link from "next/link"
import { artifacts, Track } from "../lib/artifacts"
import { ArtifactCard } from "../components/ArtifactCard"
import { SectionTitle } from "../components/SectionTitle"
import { Pill } from "../components/Pill"

export default function PersonalProjects({
  searchParams,
}: {
  searchParams?: { track?: string }
}) {
  const track = (searchParams?.track as Track | undefined) ?? "mix"
  const filtered = track === "mix" ? artifacts : artifacts.filter((a) => a.track === track)

  return (
    <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-2">
        <SectionTitle>personal projects</SectionTitle>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          A few artifacts. Filter by path, or browse everything.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link href="/personal-projects" className="hover:opacity-90">
          <Pill active={track === "mix"}>all</Pill>
        </Link>
        <Link href="/personal-projects?track=ds" className="hover:opacity-90">
          <Pill active={track === "ds"}>data science</Pill>
        </Link>
        <Link href="/personal-projects?track=cs" className="hover:opacity-90">
          <Pill active={track === "cs"}>computer science</Pill>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((a) => (
          <ArtifactCard
            key={a.title}
            title={a.title}
            note={a.note}
            description={a.description}
            stack={a.stack}
            track={a.track}
            linkUrl={a.linkUrl}
            external={a.external}
          />
        ))}
      </div>
    </main>
  )
}

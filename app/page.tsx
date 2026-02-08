"use client"

import Link from "next/link"
import { useState } from "react"
import { GuideCard } from "./components/GuideCard"
import { Pill } from "./components/Pill"
import { SectionTitle } from "./components/SectionTitle"
import { RotatingSubtitle } from "./components/RotatingSubtitle"

type Mode = "idle" | "ds" | "cs" | "friends"

export default function Home() {
  const [mode, setMode] = useState<Mode>("idle")

  return (
    <main className="max-w-5xl mx-auto px-6 pb-16">
      <section className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] items-start pt-10 md:pt-14">
        <div className="space-y-5">
          <p className="text-xs text-slate-700">
            
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-slate-200">
            I build software solutions and data pipelines{" "}
            <RotatingSubtitle />
          </h1>

          <p className="text-sm md:text-base text-text max-w-xl leading-relaxed">
            Quick tour: choose what you care about, and I’ll show the receipts.
            <span className="text-muted"> (ps: click anywhere.)</span>
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/experience"
              className="rounded-full bg-white/70 border border-black/10 px-4 py-2 text-sm text-slate-900 hover:text-primary transition-colors"
              onMouseEnter={() => setMode("idle")}
            >
              recruiter shortcut → experience
            </Link>

            <Link
              href="/personal-projects"
              className="rounded-full bg-white/70 border border-black/10 px-4 py-2 text-sm text-slate-900 hover:text-primary transition-colors"
              onMouseEnter={() => setMode("idle")}
            >
              see everything → personal projects
            </Link>
          </div>
        </div>

        <div className="md:justify-self-end">
          <GuideCard mode={mode} />
        </div>
      </section>

      <section className="mt-16 space-y-6">
        <SectionTitle>pick a path</SectionTitle>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/personal-projects?track=ds"
            onMouseEnter={() => setMode("ds")}
            onMouseLeave={() => setMode("idle")}
            className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-slate-900"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">data science</p>
              <Pill active>ds</Pill>
            </div>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              modeling, analysis, dashboards, experiments.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>python</Pill>
              <Pill>sql</Pill>
              <Pill>pandas</Pill>
              <Pill>viz</Pill>
            </div>
            <p className="mt-4 text-sm text-primary hover:text-accent transition-colors">
              → show ds artifacts
            </p>
          </Link>

          <Link
            href="/personal-projects?track=cs"
            onMouseEnter={() => setMode("cs")}
            onMouseLeave={() => setMode("idle")}
            className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-slate-900"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">computer science</p>
              <Pill active>cs</Pill>
            </div>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              apps, automation, testing, systems.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>typescript</Pill>
              <Pill>next.js</Pill>
              <Pill>testing</Pill>
              <Pill>tools</Pill>
            </div>
            <p className="mt-4 text-sm text-primary hover:text-accent transition-colors">
              → show cs artifacts
            </p>
          </Link>

          <Link
            href="/friends"
            onMouseEnter={() => setMode("friends")}
            onMouseLeave={() => setMode("idle")}
            className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-slate-900"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium">for friends</p>
              <Pill>:) </Pill>
            </div>
            <p className="mt-2 text-sm text-slate-700 leading-relaxed">
              side quests, small wins, and what i’m learning.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Pill>tiny projects</Pill>
              <Pill>notes</Pill>
              <Pill>favorites</Pill>
            </div>
            <p className="mt-4 text-sm text-primary hover:text-accent transition-colors">
              → enter the soft zone
            </p>
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 text-xs text-slate-700">
          <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
            based in chicago
          </span>
          <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
            TS/React · Python · SQL
          </span>
          <span className="rounded-full border border-black/10 bg-white/80 px-3 py-1">
            open to summer 2026 internships
          </span>
        </div>
      </section>
    </main>
  )
}

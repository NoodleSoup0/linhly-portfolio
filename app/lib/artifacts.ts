export type Track = "ds" | "cs" | "mix"

export type Artifact = {
  title: string
  note: string
  description: string
  stack: string[]
  track: Track

  /** Destination for the project. Can be a GitHub URL or an internal detail page. */
  linkUrl: string
  /** If true, open in a new tab. */
  external?: boolean
}

export const artifacts: Artifact[] = [
  {
    title: "Cloud PDF → NLP Processing Pipeline",
    note: "serverless text enrichment at scale",
    description:
      "Designed an end-to-end AWS pipeline for PDF uploads: extract text, run NLP keyword extraction, language detection, and on-demand translation. Modeled keyword↔PDF relationships for efficient querying and future extensions.",
    stack: ["AWS Lambda", "S3", "RDS", "Python", "NLP"],
    track: "cs",
    linkUrl: "https://github.com/NoodleSoup0/pdf-processing-lambda",
    external: true,
  },
  {
    title: "Automated GUI Testing Suite",
    note: "BDD tests that actually survive refactors",
    description:
      "Implemented Cucumber BDD tests with step definitions backed by Selenium WebDriver + JUnit 5. Refactored using the Page Object Model and executed reliably via Gradle while debugging flaky browser interactions.",
    stack: ["Java", "Selenium", "Cucumber", "JUnit 5", "Gradle"],
    track: "cs",
    linkUrl: "https://github.com/NoodleSoup0/gui-testing-selenium",
    external: true,
  },
  {
    title: "Software Quality: Chess App (Agile + TDD)",
    note: "100% coverage for core logic",
    description:
      "Built a Java chess application using OO design in an Agile team. Wrote unit/integration tests with JUnit, Mockito, and JaCoCo, integrated CI via GitHub Actions, and used reviews + black/white-box testing to improve maintainability.",
    stack: ["Java", "JUnit", "Mockito", "JaCoCo", "GitHub Actions"],
    track: "cs",
    linkUrl: "/personal-projects/chess-quality",
  },
  {
    title: "Micro:bit Interactive System",
    note: "sensors → logic → delightful pixels",
    description:
      "Built an embedded interactive system on Micro:bit v2 using infrared and gesture inputs, driving an SPI TFT display. Integrated I²C sensors and implemented game-like logic where falling letters react to hand contact.",
    stack: ["Micro:bit", "C/C++", "I²C", "SPI Display", "Embedded"],
    track: "cs",
    linkUrl: "https://github.com/NoodleSoup0/Microcontroller-Project-Color-Drop",
    external: true,
  },
  {
    title: "500HatsForRefugees (Full-stack)",
    note: "stakeholders, requirements, shipping",
    description:
      "Partnered with non-technical stakeholders to translate workflow pain into testable requirements. Built and deployed a full-stack web app to streamline donation tracking and distribution, reducing manual tracking errors.",
    stack: ["React", "Node.js", "Firebase", "Agile SDLC"],
    track: "cs",
    linkUrl: "https://github.com/NoodleSoup0/500-Hats-For-Refugees",
    external: true,
  },
  {
    title: "DTR Lab: UX + Data Pipeline Build",
    note: "research → interface → reliable data flow",
    description:
      "Led user research with expert mentors and translated findings into redesigned interface features to improve usability and diagnostic efficiency. Implemented full data pipelines connecting UI components with REST APIs and MongoDB.",
    stack: ["User Research", "Figma", "REST APIs", "MongoDB", "Full-stack"],
    track: "cs",
    linkUrl: "https://drive.google.com/file/d/1kDVAncU8lh0yIobT_DEyzBmwFGteOKCd/view?usp=sharing",
    external: true,
  },
]

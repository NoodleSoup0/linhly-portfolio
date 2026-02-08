export type ExperienceItem = {
  company: string
  location: string
  role: string
  dates: string
  bullets: string[]

  /** Link to a write-up / artifact (Drive, PDF, etc.) */
  linkUrl: string
  external?: boolean
}

export const experience: ExperienceItem[] = [
  {
    company: "SONIC Lab: Project TeamStar (Northwestern University)",
    location: "Evanston, Illinois",
    role: "Data Science Intern",
    dates: "October 2023 – June 2024",
    bullets: [
      "Optimized predictive models through feature engineering and parameter tuning on qualitative social network data.",
      "Developed a Python-based pipeline to automatically extract, validate, clean, and transform Qualtrics data, replacing manual Excel workflow to improve processing efficiency.",
      "Created data visualizations in Python to support analysis and communicate results in presentations and reports.",
    ],
    linkUrl: "https://drive.google.com/file/d/1wl_laFwBzVOHchP2INIgzpo2SMAuarPd/view?usp=sharing",
    external: true,
  },
  {
    company: "UTMB Summer Institute in Biostatistics and Data Science",
    location: "Galveston, Texas",
    role: "Research Intern",
    dates: "June 2024 – July 2024",
    bullets: [
      "Conducted an applied research project on vaccination and immunization strategies effectiveness under faculty mentorship, presenting findings at the program symposium.",
      "Performed data cleaning, transformation, and statistical analysis in R, generating visualizations to communicate results effectively.",
    ],
    linkUrl: "https://drive.google.com/file/d/1mSspXAOZFg-zELIVY1d-xVIlmV7WKZf7/view?usp=sharing",
    external: true,
  },
]

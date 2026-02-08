import type { Config } from "tailwindcss"

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Background is driven by the lava layer (deep navy)
        background: "#0B1020",
        // Softer than white: readable on dark without being "blinding"
        text: "#C6CBD6",
        muted: "#8B93A6",
        primary: "#60A5FA",   // blue
        accent: "#F472B6",    // pink
        sunshine: "#FBBF24",  // yellow
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
}

export default config

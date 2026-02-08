import "./globals.css"
import Link from "next/link"
import { JetBrains_Mono } from "next/font/google"
import { CursorStar } from "./components/CursorStar"
import { LavaBackground } from "./components/LavaBackground"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
})

export const metadata = {
  title: "Linh — portfolio",
  description: "A playful, recruiter-friendly portfolio with a star cursor buddy.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.variable}>
        <LavaBackground />
        <CursorStar />
        <header className="max-w-5xl mx-auto px-6 pt-8 pb-4">
          <nav className="flex items-center justify-between text-sm">
            <Link href="/" className="font-medium hover:text-primary transition-colors">
              linh.ly
            </Link>
            <div className="flex gap-6">
              <Link href="/personal-projects" className="hover:text-primary transition-colors">
                personal projects
              </Link>
              <Link href="/experience" className="hover:text-primary transition-colors">
                experience
              </Link>
              <Link href="/friends" className="hover:text-primary transition-colors">
                for friends
              </Link>
            </div>
          </nav>
        </header>
        {children}
        <footer className="max-w-5xl mx-auto px-6 py-10 text-xs text-muted">
          built with next.js · tailwind · click to bloom lights ✨
        </footer>
      </body>
    </html>
  )
}

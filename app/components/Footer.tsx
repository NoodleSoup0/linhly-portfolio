export function Footer() {
  return (
    <footer className="mt-24 pb-10 text-sm text-slate-400">
      <div className="mx-auto max-w-5xl px-6 grid gap-4 md:grid-cols-3 md:items-center">
        {/* Left */}
        <p className="text-slate-400 md:text-left text-center">
          © 2026 Linh Ly
        </p>

        {/* Center */}
        <p className="text-slate-500 text-center">
          Made with <span aria-label="love">♥</span> using Next.js & Tailwind
        </p>

        {/* Right */}
        <div className="flex gap-4 md:justify-end justify-center">
          <a
            href="https://github.com/NoodleSoup0"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            GitHub ↗
          </a>

          <a
            href="https://www.linkedin.com/in/linh-ly-74a43218a/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-200 transition-colors"
          >
            LinkedIn ↗
          </a>

          <a
            href="mailto:msslinhly@gmail.com"
            className="hover:text-slate-200 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}

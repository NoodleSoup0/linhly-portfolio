import { ExternalLink as ExternalLinkIcon } from "lucide-react"

type ExternalLinkProps = {
  href: string
  children: React.ReactNode
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 hover:text-slate-200 transition-colors"
    >
      {children}
      <ExternalLinkIcon className="h-3.5 w-3.5 opacity-70" />
    </a>
  )
}

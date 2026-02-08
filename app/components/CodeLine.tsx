import clsx from "clsx"

type CodeLineProps = {
  children: React.ReactNode
  className?: string
}

export function CodeLine({ children, className }: CodeLineProps) {
  return (
    <p
      className={clsx(
        "font-mono text-sm leading-relaxed text-slate-300 transition-colors hover:text-primary",
        className
      )}
    >
      {children}
    </p>
  )
}

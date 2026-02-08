import clsx from "clsx"

export function Pill({
  children,
  active,
  className,
}: {
  children: React.ReactNode
  active?: boolean
  className?: string
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white/70 text-slate-800 border-slate-300",
        className
      )}
    >
      {children}
    </span>
  )
}

import clsx from "clsx"

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={clsx("text-lg font-medium", className)}>
      {children}
    </h2>
  )
}

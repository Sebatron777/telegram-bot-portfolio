import { ReactNode } from 'react'

interface StackBadgeProps {
  children: ReactNode
}

export function StackBadge({ children }: StackBadgeProps) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 text-xs rounded-md"
      style={{
        fontFamily: 'var(--font-jetbrains)',
        background: 'rgba(6,182,212,0.08)',
        border: '1px solid rgba(6,182,212,0.25)',
        color: '#06b6d4',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </span>
  )
}

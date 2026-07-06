import { ReactNode } from 'react'

interface StackBadgeProps {
  children: ReactNode
  className?: string
}

export function StackBadge({ children, className = '' }: StackBadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-1 text-xs rounded-md font-mono tracking-wider transition-all duration-300"
  const defaultClasses = "bg-cyan-500/8 border border-cyan-500/25 text-cyan-400"
  
  return (
    <span
      className={`${baseClasses} ${className || defaultClasses}`}
      style={{
        fontFamily: 'var(--font-jetbrains)',
      }}
    >
      {children}
    </span>
  )
}

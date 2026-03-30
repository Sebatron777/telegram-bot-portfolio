'use client'

import React, { useRef, ReactNode } from 'react'

interface GlowCardProps {
  children?: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'
  size?: 'sm' | 'md' | 'lg'
  customSize?: boolean
  width?: string | number
  height?: string | number
}

const glowColorMap: Record<string, string> = {
  blue:   '#3b82f6',
  purple: '#8b5cf6',
  green:  '#00ff88',
  red:    '#ef4444',
  orange: '#f97316',
  cyan:   '#06b6d4',
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  customSize = false,
}) => {
  const outerRef = useRef<HTMLDivElement>(null)
  const color = glowColorMap[glowColor]
  const dim = 'rgba(255,255,255,0.08)'

  // Outer wrapper gets sizing classes (w-*, h-*)
  // Inner card gets content classes (p-*, flex, etc.)
  const parts = className.split(' ')
  const outerCls = parts.filter(c => /^[wh]-/.test(c)).join(' ')
  const innerCls = parts.filter(c => !/^[wh]-/.test(c)).join(' ')

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerRef.current) return
    const rect = outerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    outerRef.current.style.background =
      `radial-gradient(320px circle at ${x}px ${y}px, ${color}, ${dim} 65%)`
  }

  const onMouseLeave = () => {
    if (!outerRef.current) return
    outerRef.current.style.background = dim
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-2xl ${outerCls}`}
      style={{ background: dim, padding: '1px' }}
    >
      <div
        className={`rounded-[15px] h-full overflow-hidden ${innerCls}`}
        style={{ background: '#0c0c0f' }}
      >
        {children}
      </div>
    </div>
  )
}

export { GlowCard }

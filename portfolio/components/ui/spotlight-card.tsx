'use client'

import React, { useEffect, useRef, ReactNode } from 'react'

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

const dim = 'rgba(255,255,255,0.08)'

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  customSize = false,
}) => {
  const outerRef = useRef<HTMLDivElement>(null)
  const color = glowColorMap[glowColor]

  // Global pointermove — all cards react simultaneously,
  // but each calculates mouse position relative to itself → no bleed between cards
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      outerRef.current.style.background =
        `radial-gradient(320px circle at ${x}px ${y}px, ${color}, ${dim} 65%)`
    }

    document.addEventListener('pointermove', handlePointerMove)
    return () => document.removeEventListener('pointermove', handlePointerMove)
  }, [color])

  const parts = className.split(' ')
  const outerCls = parts.filter(c => /^[wh]-/.test(c)).join(' ')
  const innerCls = parts.filter(c => !/^[wh]-/.test(c)).join(' ')

  return (
    <div
      ref={outerRef}
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

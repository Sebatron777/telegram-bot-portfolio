'use client'

import React, { useRef, ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'
  customSize?: boolean
}

const glowColorMap: Record<string, { bright: string; dim: string }> = {
  blue:   { bright: 'rgba(59,130,246,1)',  dim: 'rgba(255,255,255,0.08)' },
  purple: { bright: 'rgba(139,92,246,1)',  dim: 'rgba(255,255,255,0.08)' },
  green:  { bright: 'rgba(0,255,136,1)',   dim: 'rgba(255,255,255,0.08)' },
  red:    { bright: 'rgba(239,68,68,1)',   dim: 'rgba(255,255,255,0.08)' },
  orange: { bright: 'rgba(249,115,22,1)',  dim: 'rgba(255,255,255,0.08)' },
  cyan:   { bright: 'rgba(6,182,212,1)',   dim: 'rgba(255,255,255,0.08)' },
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
}) => {
  const outerRef = useRef<HTMLDivElement>(null)
  const { bright, dim } = glowColorMap[glowColor]

  // Split sizing classes (w-*, h-*) to outer wrapper; content classes to inner div
  const classes = className.split(' ')
  const sizeClasses = classes.filter(c => /^[wh]-/.test(c)).join(' ')
  const contentClasses = classes.filter(c => !/^[wh]-/.test(c)).join(' ')

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerRef.current) return
    const rect = outerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    outerRef.current.style.background =
      `radial-gradient(280px circle at ${x}px ${y}px, ${bright}, ${dim} 60%)`
  }

  const handleMouseLeave = () => {
    if (!outerRef.current) return
    outerRef.current.style.background = dim
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl p-[1px] ${sizeClasses}`}
      style={{ background: dim }}
    >
      <div
        className={`rounded-[15px] h-full overflow-hidden ${contentClasses}`}
        style={{ background: '#0c0c0f' }}
      >
        {children}
      </div>
    </div>
  )
}

export { GlowCard }

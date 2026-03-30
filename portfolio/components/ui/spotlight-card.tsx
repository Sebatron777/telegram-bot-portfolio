'use client'

import React, { useRef, ReactNode } from 'react'

interface GlowCardProps {
  children: ReactNode
  className?: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'
  customSize?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const glowColorMap: Record<string, { spotlight: string; border: string; shadow: string }> = {
  blue:   { spotlight: 'rgba(59,130,246,0.22)',  border: 'rgba(59,130,246,0.55)',  shadow: '0 0 40px rgba(59,130,246,0.25), 0 0 80px rgba(59,130,246,0.10)' },
  purple: { spotlight: 'rgba(124,58,237,0.22)',  border: 'rgba(124,58,237,0.55)',  shadow: '0 0 40px rgba(124,58,237,0.25), 0 0 80px rgba(124,58,237,0.10)' },
  green:  { spotlight: 'rgba(0,255,136,0.18)',   border: 'rgba(0,255,136,0.55)',   shadow: '0 0 40px rgba(0,255,136,0.22), 0 0 80px rgba(0,255,136,0.08)' },
  red:    { spotlight: 'rgba(239,68,68,0.22)',   border: 'rgba(239,68,68,0.55)',   shadow: '0 0 40px rgba(239,68,68,0.25), 0 0 80px rgba(239,68,68,0.10)' },
  orange: { spotlight: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.55)',  shadow: '0 0 40px rgba(249,115,22,0.25), 0 0 80px rgba(249,115,22,0.10)' },
  cyan:   { spotlight: 'rgba(6,182,212,0.22)',   border: 'rgba(6,182,212,0.55)',   shadow: '0 0 40px rgba(6,182,212,0.25), 0 0 80px rgba(6,182,212,0.10)' },
}

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
  customSize = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const { spotlight, border, shadow } = glowColorMap[glowColor]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !overlayRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    overlayRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, ${spotlight}, transparent 65%)`
  }

  const handleMouseEnter = () => {
    if (!cardRef.current || !overlayRef.current) return
    cardRef.current.style.borderColor = border
    cardRef.current.style.boxShadow = shadow
    overlayRef.current.style.opacity = '1'
  }

  const handleMouseLeave = () => {
    if (!cardRef.current || !overlayRef.current) return
    cardRef.current.style.borderColor = 'rgba(255,255,255,0.08)'
    cardRef.current.style.boxShadow = 'none'
    overlayRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
      />
      {children}
    </div>
  )
}

export { GlowCard }

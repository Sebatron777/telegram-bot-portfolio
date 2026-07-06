'use client'

import React from 'react'
import { GlowCard } from './spotlight-card'

interface VideoCardProps {
  src: string
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange' | 'cyan'
  className?: string
}

export function VideoCard({ src, glowColor = 'cyan', className = '' }: VideoCardProps) {
  return (
    <GlowCard glowColor={glowColor} className={`overflow-hidden ${className}`}>
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover"
        style={{ borderRadius: 'inherit' }}
      />
    </GlowCard>
  )
}

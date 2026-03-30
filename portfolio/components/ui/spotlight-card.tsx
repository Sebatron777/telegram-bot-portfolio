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

// Base hue per color — hue shifts as mouse moves horizontally (like original)
const glowColorMap = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
  cyan:   { base: 190, spread: 180 },
}

// Injected once — CSS custom props updated by JS pointermove
const borderGlowStyle = `
  .glow-border {
    --x: -9999;
    --y: -9999;
    --xp: 0;
    --hue: calc(var(--base, 190) + (var(--xp, 0) * var(--spread, 180)));
    background-image: radial-gradient(
      600px 600px at calc(var(--x) * 1px) calc(var(--y) * 1px),
      hsl(var(--hue) 100% 70% / 0.9) 0%,
      hsl(var(--hue) 100% 55% / 0.7) 25%,
      hsl(var(--hue) 80% 40% / 0.3) 50%,
      rgba(255,255,255,0.10) 70%,
      rgba(255,255,255,0.10)
    );
    background-attachment: fixed;
    padding: 1px;
  }
`

let styleInjected = false

const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className = '',
  glowColor = 'cyan',
}) => {
  const outerRef = useRef<HTMLDivElement>(null)
  const { base, spread } = glowColorMap[glowColor]

  // Inject shared CSS once
  useEffect(() => {
    if (styleInjected) return
    const tag = document.createElement('style')
    tag.textContent = borderGlowStyle
    document.head.appendChild(tag)
    styleInjected = true
  }, [])

  // Single global listener — all cards update simultaneously
  useEffect(() => {
    const sync = (e: PointerEvent) => {
      if (!outerRef.current) return
      outerRef.current.style.setProperty('--x', e.clientX.toFixed(1))
      outerRef.current.style.setProperty('--y', e.clientY.toFixed(1))
      outerRef.current.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(3))
    }
    document.addEventListener('pointermove', sync)
    return () => document.removeEventListener('pointermove', sync)
  }, [])

  const parts = className.split(' ')
  const outerCls = parts.filter(c => /^[wh]-/.test(c)).join(' ')
  const innerCls = parts.filter(c => !/^[wh]-/.test(c)).join(' ')

  return (
    <div
      ref={outerRef}
      className={`glow-border relative rounded-2xl ${outerCls}`}
      style={
        {
          '--base': base,
          '--spread': spread,
        } as React.CSSProperties
      }
    >
      <div
        className={`rounded-[15px] h-full overflow-hidden ${innerCls}`}
        style={{ background: '#13131a' }}
      >
        {children}
      </div>
    </div>
  )
}

export { GlowCard }

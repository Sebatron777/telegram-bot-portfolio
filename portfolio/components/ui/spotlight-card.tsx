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
      450px 450px at calc(var(--x) * 1px) calc(var(--y) * 1px),
      hsl(var(--hue) 100% 70% / 0.9) 0%,
      hsl(var(--hue) 100% 60% / 0.5) 15%,
      hsl(var(--hue) 80% 45% / 0.15) 35%,
      rgba(255,255,255,0.05) 55%,
      rgba(255,255,255,0.03)
    );
    background-attachment: fixed;
    padding: 1px;
  }

  .glow-inner {
    position: relative;
  }

  .glow-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: radial-gradient(
      500px 500px at calc(var(--x) * 1px) calc(var(--y) * 1px),
      hsl(var(--hue) 100% 65% / 0.15) 0%,
      hsl(var(--hue) 90% 55% / 0.07) 20%,
      hsl(var(--hue) 80% 45% / 0.02) 40%,
      transparent 60%
    );
    background-attachment: fixed;
    pointer-events: none;
    z-index: 1;
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
        className={`glow-inner rounded-[15px] h-full overflow-hidden ${innerCls}`}
        style={{ background: '#13131a' }}
      >
        {children}
      </div>
    </div>
  )
}

export { GlowCard }

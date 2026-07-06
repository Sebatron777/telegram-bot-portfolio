'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { StackBadge } from './stack-badge'
import { GlowCard } from './spotlight-card'
import type { ReactNode } from 'react'

interface CaseCardProps {
  title: string
  category: 'telegram-bot' | 'automation' | 'ai-tool'
  stack: string[]
  descriptionEN: string
  descriptionRU: string
  highlights: string[]
  icon?: ReactNode
  onClick?: () => void
}

const categoryColors: Record<string, string> = {
  'telegram-bot': '#06b6d4',
  'automation':   '#f97316',
  'ai-tool':      '#7c3aed',
}

const categoryGlow: Record<string, 'cyan' | 'orange' | 'purple'> = {
  'telegram-bot': 'cyan',
  'automation':   'orange',
  'ai-tool':      'purple',
}

const categoryLabels: Record<string, { en: string; ru: string }> = {
  'telegram-bot': { en: 'Telegram Bot', ru: 'Telegram Бот' },
  'automation':   { en: 'Automation',   ru: 'Автоматизация' },
  'ai-tool':      { en: 'AI Tool',      ru: 'AI инструмент' },
}

export function CaseCard({ title, category, stack, descriptionEN, descriptionRU, highlights, icon, onClick }: CaseCardProps) {
  const { lang } = useLang()
  const color = categoryColors[category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="cursor-pointer group h-full flex flex-col items-stretch"
    >
      <GlowCard
        customSize
        glowColor={categoryGlow[category]}
        className="w-full h-full flex flex-col"
      >
        {/* Compact Visual Header Area */}
        <div
          className="w-full h-16 relative flex-shrink-0 flex items-center justify-between px-4 border-b border-white/5"
          style={{ background: 'rgba(255,255,255,0.015)' }}
        >
          {/* Category badge */}
          <span
            className="text-[0.7rem] px-2.5 py-1 rounded-full font-medium"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              background: `${color}18`,
              border: `1px solid ${color}45`,
              color,
            }}
          >
            {categoryLabels[category][lang]}
          </span>

          {/* Compact Corner Icon Box */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}35`,
              color,
            }}
          >
            <div className="scale-[0.62] flex items-center justify-center">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title row with hover arrow button on the right */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h3
              className="text-lg font-bold leading-snug"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {title}
            </h3>
            <span
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
              style={{
                background: `${color}18`,
                border: `1px solid ${color}45`,
                color,
              }}
            >
              →
            </span>
          </div>

          <p
            className="text-sm leading-relaxed mb-6 flex-1"
            style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-dm-sans)' }}
          >
            {lang === 'en' ? descriptionEN : descriptionRU}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-5 mt-2">
            {highlights.map(h => (
              <span
                key={h}
                className="text-[0.7rem] px-2 py-0.5 rounded"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  background: 'rgba(255,255,255,0.04)',
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/5">
            {stack.map(s => (
              <StackBadge 
                key={s}
                className="bg-white/3 border border-white/8 text-white/40 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400"
              >
                {s}
              </StackBadge>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

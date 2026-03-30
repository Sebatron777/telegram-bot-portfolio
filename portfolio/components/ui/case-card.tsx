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
  screenshots?: string[]
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="cursor-pointer group h-full"
      
    >
      <GlowCard
        customSize
        glowColor={categoryGlow[category]}
        className="w-full h-full flex flex-col"
      >
        {/* Visual area */}
        <div
          className="w-full h-44 relative flex-shrink-0 flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
            style={{
              background: `${color}15`,
              border: `1px solid ${color}35`,
              color,
            }}
          >
            {icon}
          </div>

          {/* Category badge */}
          <span
            className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              background: `${color}18`,
              border: `1px solid ${color}45`,
              color,
            }}
          >
            {categoryLabels[category][lang]}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          {/* Title row with hover arrow button on the right */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3
              className="text-lg font-bold leading-snug"
              style={{ fontFamily: 'var(--font-syne)' }}
            >
              {title}
            </h3>
            <span
              className="shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0"
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
            className="text-sm leading-relaxed mb-4 flex-1"
            style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)' }}
          >
            {lang === 'en' ? descriptionEN : descriptionRU}
          </p>

          {/* Highlights */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {highlights.map(h => (
              <span
                key={h}
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  background: 'rgba(255,255,255,0.06)',
                  color: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {stack.map(s => (
              <StackBadge key={s}>{s}</StackBadge>
            ))}
          </div>
        </div>
      </GlowCard>
    </motion.div>
  )
}

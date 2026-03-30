'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { StackBadge } from './stack-badge'
import { GlowCard } from './spotlight-card'
import { Bot, Cog, Brain } from 'lucide-react'

interface CaseCardProps {
  title: string
  category: 'telegram-bot' | 'automation' | 'ai-tool'
  stack: string[]
  descriptionEN: string
  descriptionRU: string
  highlights: string[]
  screenshots?: string[]
  onClick?: () => void
}

const categoryColors: Record<string, string> = {
  'telegram-bot': '#06b6d4',
  'automation': '#f97316',
  'ai-tool': '#7c3aed',
}

const categoryGlow: Record<string, 'cyan' | 'orange' | 'purple'> = {
  'telegram-bot': 'cyan',
  'automation': 'orange',
  'ai-tool': 'purple',
}

const categoryLabels: Record<string, { en: string; ru: string }> = {
  'telegram-bot': { en: 'Telegram Bot', ru: 'Telegram Бот' },
  'automation': { en: 'Automation', ru: 'Автоматизация' },
  'ai-tool': { en: 'AI Tool', ru: 'AI инструмент' },
}

export function CaseCard({ title, category, stack, descriptionEN, descriptionRU, highlights, screenshots, onClick }: CaseCardProps) {
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
      className="cursor-pointer group"
      style={{ clipPath: 'inset(0 round 16px)' }}
    >
      <GlowCard
        customSize
        glowColor={categoryGlow[category]}
        className="w-full flex flex-col"
      >
        {/* Visual area */}
        <div
          className="w-full h-44 relative overflow-hidden rounded-t-2xl rounded-b-xl"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${color}20`, border: `1px solid ${color}40`, color }}
            >
              {category === 'telegram-bot' ? <Bot size={28} /> : category === 'automation' ? <Cog size={28} /> : <Brain size={28} />}
            </div>
          </div>

          {/* Category badge */}
          <span
            className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              background: `${color}20`,
              border: `1px solid ${color}50`,
              color: color,
            }}
          >
            {categoryLabels[category][lang]}
          </span>

          {/* Hover overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end justify-center pb-4"
            style={{ background: `linear-gradient(to top, ${color}18 0%, transparent 60%)` }}
          >
            <span
              className="px-4 py-1.5 rounded-full text-sm font-medium"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                background: `${color}22`,
                border: `1px solid ${color}55`,
                color: color,
                backdropFilter: 'blur(8px)',
              }}
            >
              {lang === 'en' ? 'View Details →' : 'Подробнее →'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3
            className="text-lg font-bold mb-2"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-4"
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

'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { StackBadge } from './stack-badge'
import { GlowCard } from './spotlight-card'

import { Server, Database, Cloud, Brain, Monitor, Wrench } from 'lucide-react'
import { type ReactNode } from 'react'

const categories: { titleEN: string; titleRU: string; icon: ReactNode; tags: string[]; glow: 'cyan' | 'blue' | 'orange' | 'purple' | 'green' | 'red'; color: string }[] = [
  {
    titleEN: 'Backend',
    titleRU: 'Бэкенд',
    icon: <Server size={20} />,
    tags: ['Python 3.11+', 'FastAPI', 'aiogram 3.x', 'Pyrogram', 'Telethon'],
    glow: 'cyan',
    color: '#06b6d4',
  },
  {
    titleEN: 'Database',
    titleRU: 'Базы данных',
    icon: <Database size={20} />,
    tags: ['Supabase', 'SQLite WAL', 'Redis'],
    glow: 'blue',
    color: '#3b82f6',
  },
  {
    titleEN: 'Infrastructure',
    titleRU: 'Инфраструктура',
    icon: <Cloud size={20} />,
    tags: ['Systemd', 'VPS', 'Vercel', 'Docker'],
    glow: 'orange',
    color: '#f97316',
  },
  {
    titleEN: 'AI',
    titleRU: 'AI',
    icon: <Brain size={20} />,
    tags: ['OpenAI GPT-4o', 'Claude API', 'fal.ai', 'HeyGen'],
    glow: 'purple',
    color: '#7c3aed',
  },
  {
    titleEN: 'Frontend',
    titleRU: 'Фронтенд',
    icon: <Monitor size={20} />,
    tags: ['React Native', 'Expo v52', 'TMA', 'Next.js', 'TypeScript'],
    glow: 'green',
    color: '#00ff88',
  },
  {
    titleEN: 'Tools',
    titleRU: 'Инструменты',
    icon: <Wrench size={20} />,
    tags: ['Claude Code', 'Cursor', 'Git'],
    glow: 'red',
    color: '#ef4444',
  },
]

export function TechStack() {
  const { lang } = useLang()

  return (
    <section id="stack" className="relative py-24 px-6 overflow-hidden" style={{ background: 'rgba(5,5,6,0.12)' }}>
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {lang === 'en' ? 'Tech Stack' : 'Технологии'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: 'var(--font-dm-sans)' }}>
            {lang === 'en' ? 'Tools I use to build production systems' : 'Инструменты для продакшен-систем'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.titleEN}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="h-full flex flex-col items-stretch group"
            >
              <GlowCard customSize glowColor={cat.glow} className="w-full h-full p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}30`, color: cat.color }}
                  >
                    {cat.icon}
                  </div>
                  <h3
                    className="font-bold"
                    style={{ fontFamily: 'var(--font-syne)' }}
                  >
                    {lang === 'en' ? cat.titleEN : cat.titleRU}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.tags.map(tag => (
                    <StackBadge 
                      key={tag}
                      className="bg-white/3 border border-white/8 text-white/40 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 group-hover:text-cyan-400"
                    >
                      {tag}
                    </StackBadge>
                  ))}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

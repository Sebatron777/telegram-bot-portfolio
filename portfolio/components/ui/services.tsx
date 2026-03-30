'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { StackBadge } from './stack-badge'
import { GlowCard } from './spotlight-card'
import { Bot, Cog, Brain, Smartphone, Globe } from 'lucide-react'
import { type ReactNode } from 'react'

const services: { titleEN: string; titleRU: string; descEN: string; descRU: string; tags: string[]; icon: ReactNode; glow: 'cyan' | 'orange' | 'purple' | 'green' | 'blue' }[] = [
  {
    titleEN: 'Telegram Bots',
    titleRU: 'Telegram-боты',
    descEN: 'Custom bots on aiogram 3.x — from simple auto-replies to complex multi-account systems with Supabase backend and admin panels.',
    descRU: 'Боты на aiogram 3.x — от авто-ответов до мультиаккаунт-систем с Supabase и admin-панелями.',
    tags: ['aiogram', 'Supabase', 'Python'],
    icon: <Bot size={28} />,
    glow: 'cyan',
  },
  {
    titleEN: 'Automation Systems',
    titleRU: 'Системы автоматизации',
    descEN: 'Multi-account Pyrogram automation for Telegram growth, content distribution and engagement — anti-ban protection built in.',
    descRU: 'Мультиаккаунт-автоматизация на Pyrogram для роста, рассылок и вовлечённости — со встроенной антибан-защитой.',
    tags: ['Pyrogram', 'MTProto', 'Anti-ban'],
    icon: <Cog size={28} />,
    glow: 'orange',
  },
  {
    titleEN: 'AI Integrations',
    titleRU: 'AI интеграции',
    descEN: 'OpenAI GPT-4o, Claude API, fal.ai — real intelligence inside your automation. Comment generation, content creation, AI avatars.',
    descRU: 'OpenAI GPT-4o, Claude API, fal.ai — реальный интеллект в автоматизацию. Генерация контента, AI-аватары.',
    tags: ['OpenAI', 'Claude', 'fal.ai'],
    icon: <Brain size={28} />,
    glow: 'purple',
  },
  {
    titleEN: 'Telegram Mini Apps',
    titleRU: 'Telegram Mini Apps',
    descEN: 'Full-stack products: TMA frontend (Vanilla JS / React) + FastAPI backend. Not just scripts — real applications.',
    descRU: 'Полноценные продукты: TMA + FastAPI бэкенд. Не просто скрипты — приложения с красивым UI.',
    tags: ['FastAPI', 'TMA', 'Full-stack'],
    icon: <Smartphone size={28} />,
    glow: 'green',
  },
  {
    titleEN: 'Websites & Landing Pages',
    titleRU: 'Сайты и лендинги',
    descEN: 'Landing pages, portfolio sites and informational websites. Modern stack — Next.js, TypeScript, Tailwind CSS, Framer Motion. SEO-optimized, responsive, fast.',
    descRU: 'Лендинги, портфолио и информационные сайты. Современный стек — Next.js, TypeScript, Tailwind CSS, Framer Motion. SEO, адаптивность, скорость.',
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
    icon: <Globe size={28} />,
    glow: 'blue',
  },
]

const glowColors: Record<string, string> = {
  cyan: '#06b6d4',
  orange: '#f97316',
  purple: '#7c3aed',
  green: '#00ff88',
  blue: '#3b82f6',
}

export function Services() {
  const { lang } = useLang()

  return (
    <section id="services" className="py-24 px-6" style={{ background: '#0a0a0c' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {lang === 'en' ? 'What I Build' : 'Что я делаю'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-dm-sans)' }}>
            {lang === 'en' ? 'End-to-end Telegram automation & AI systems' : 'Полный цикл — от идеи до деплоя'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {services.map((service, i) => (
            <motion.div
              key={service.titleEN}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="h-full"
              style={{ clipPath: 'inset(0 round 16px)' }}
            >
              <GlowCard customSize glowColor={service.glow} className="w-full h-full p-8 flex flex-col">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${glowColors[service.glow]}15`, border: `1px solid ${glowColors[service.glow]}30`, color: glowColors[service.glow] }}
                >
                  {service.icon}
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: 'var(--font-syne)' }}
                >
                  {lang === 'en' ? service.titleEN : service.titleRU}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-5 flex-1"
                  style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)' }}
                >
                  {lang === 'en' ? service.descEN : service.descRU}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.tags.map(tag => (
                    <StackBadge key={tag}>{tag}</StackBadge>
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

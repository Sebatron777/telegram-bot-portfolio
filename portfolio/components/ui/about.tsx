'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { GlowCard } from './spotlight-card'
import { MapPin, Rocket, Shield, Terminal } from 'lucide-react'

const timeline = [
  {
    year: '2021–2023',
    en: 'Web3 Community Management',
    ru: 'Web3 Community Management',
    color: '#7c3aed',
  },
  {
    year: '2023–2024',
    en: 'First Telegram bots & automation',
    ru: 'Первые боты и автоматизация',
    color: '#06b6d4',
  },
  {
    year: '2024–2025',
    en: 'Multi-account systems & AI tools',
    ru: 'Мультиаккаунт-системы и AI',
    color: '#f97316',
  },
  {
    year: '2025+',
    en: 'Full-stack products & Mini Apps',
    ru: 'Продукты и Mini Apps',
    color: '#00ff88',
  },
]

const principles = [
  {
    icon: <Terminal size={20} />,
    en: 'Systems, not scripts',
    ru: 'Системы, не скрипты',
    descEn: 'Every project has admin panel, monitoring, and proper architecture.',
    descRu: 'Каждый проект — с admin-панелью, мониторингом и архитектурой.',
    color: '#06b6d4',
  },
  {
    icon: <Shield size={20} />,
    en: '24/7 uptime',
    ru: '24/7 аптайм',
    descEn: 'Systemd, auto-recovery, anti-flood — built to run without babysitting.',
    descRu: 'Systemd, авто-восстановление, антифлуд — работает без присмотра.',
    color: '#00ff88',
  },
  {
    icon: <Rocket size={20} />,
    en: 'Ship fast, iterate',
    ru: 'Быстрый запуск',
    descEn: 'From idea to working MVP in days. Then polish based on real usage.',
    descRu: 'От идеи до рабочего MVP за дни. Потом доработка на реальных данных.',
    color: '#f97316',
  },
]

export function About() {
  const { lang } = useLang()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {lang === 'en' ? 'About' : 'Обо мне'}
          </h2>
          <p
            className="text-lg max-w-2xl"
            style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, color: 'rgba(255,255,255,0.6)' }}
          >
            {lang === 'en'
              ? 'Self-taught developer who turned community management into building real automation products.'
              : 'Самоучка, который перешёл из комьюнити-менеджмента в разработку реальных продуктов автоматизации.'}
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Left: Bio card */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <GlowCard className="p-8 flex flex-col" glowColor="cyan">
              <div className="flex items-center gap-2 mb-5">
                <MapPin size={16} style={{ color: '#06b6d4' }} />
                <span
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(255,255,255,0.5)' }}
                >
                  Da Nang, Vietnam
                </span>
              </div>
              <div
                className="space-y-4 flex-1"
                style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, lineHeight: 1.8, fontSize: '0.95rem' }}
              >
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {lang === 'en'
                    ? 'Started in Web3 community management — coordinating teams, growing audiences, running campaigns across Telegram and Discord.'
                    : 'Начинал в Web3 community management — координация команд, рост аудитории, кампании в Telegram и Discord.'}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {lang === 'en' ? (
                    <>Then I realized: <span className="text-white font-medium">the best way to scale is to automate.</span> So I started building the tools myself — bots, multi-account systems, AI integrations.</>
                  ) : (
                    <>Потом понял: <span className="text-white font-medium">лучший способ масштабироваться — автоматизировать.</span> Начал строить инструменты сам — боты, мультиаккаунт-системы, AI-интеграции.</>
                  )}
                </p>
              </div>
            </GlowCard>
          </motion.div>

          {/* Right: Timeline */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard className="p-8 flex flex-col" glowColor="purple">
              <h3
                className="text-sm font-medium mb-6 uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-jetbrains-mono)', color: 'rgba(255,255,255,0.4)' }}
              >
                {lang === 'en' ? 'Journey' : 'Путь'}
              </h3>
              <div className="space-y-5 flex-1">
                {timeline.map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    {/* Dot + line */}
                    <div className="flex flex-col items-center pt-1.5">
                      <div
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: item.color, boxShadow: `0 0 8px ${item.color}60` }}
                      />
                      {i < timeline.length - 1 && (
                        <div className="w-px h-6 mt-1" style={{ background: 'rgba(255,255,255,0.08)' }} />
                      )}
                    </div>
                    {/* Text */}
                    <div>
                      <span
                        className="text-xs font-medium"
                        style={{ fontFamily: 'var(--font-jetbrains-mono)', color: item.color }}
                      >
                        {item.year}
                      </span>
                      <p
                        className="text-sm mt-0.5"
                        style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(255,255,255,0.7)' }}
                      >
                        {lang === 'en' ? item.en : item.ru}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </GlowCard>
          </motion.div>
        </div>

        {/* Principles — 3 cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <GlowCard className="p-6 flex flex-col" glowColor="cyan">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color }}
                >
                  {p.icon}
                </div>
                <h4
                  className="text-sm font-bold mb-1.5"
                  style={{ fontFamily: 'var(--font-syne)', color: 'white' }}
                >
                  {lang === 'en' ? p.en : p.ru}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, color: 'rgba(255,255,255,0.5)' }}
                >
                  {lang === 'en' ? p.descEn : p.descRu}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

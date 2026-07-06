'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { TgChatDemo } from './tg-chat-demo'


export function Hero() {
  const { lang } = useLang()

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-end pt-28 pb-16 overflow-hidden">
      {/* Background Linear Gradient Backplate: dark on the left for text contrast, transparent on the right for graphics */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          background: 'linear-gradient(to right, rgba(5, 5, 6, 0.85) 0%, rgba(5, 5, 6, 0.60) 45%, rgba(5, 5, 6, 0.08) 80%, transparent 100%)' 
        }} 
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">

          {/* LEFT — text */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8 inline-flex"
            >
              <span
                className="px-4 py-2 rounded-full text-sm inline-flex items-center gap-2"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.8rem',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ background: '#00ff88' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: '#00ff88' }}
                  />
                </span>
                {lang === 'en'
                  ? 'Open to projects · Reply within 24h'
                  : 'Открыт к проектам · Ответ за 24ч'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="leading-tight" style={{ fontFamily: 'var(--font-syne)', lineHeight: lang === 'ru' ? 1.20 : 1.10 }}>
                <span className="block text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-2">
                  {lang === 'en' ? 'I Build' : 'Разработка'}
                </span>
                <span 
                  className="block text-4xl md:text-6xl lg:text-7xl font-black text-white"
                  style={{ letterSpacing: lang === 'ru' ? '-0.02em' : 'normal' }}
                >
                  {lang === 'en' ? 'Telegram Bots' : 'TELEGRAM BOTS'}
                </span>
                <span
                  className="block text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight mt-3"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {lang === 'en' ? 'That Actually Work.' : 'Профессиональные решения.'}
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ 
                color: 'rgba(255,255,255,0.85)', 
                fontFamily: 'var(--font-dm-sans)', 
                fontWeight: 500,
                background: 'linear-gradient(90deg, rgba(5, 5, 6, 0.75) 0%, rgba(5, 5, 6, 0.25) 75%, transparent 100%)',
                padding: '12px 20px',
                borderRadius: '12px',
                borderLeft: '2px solid rgba(6, 182, 212, 0.35)',
                marginLeft: '-20px',
              }}
            >
              {lang === 'en'
                ? 'Multi-account automation systems, AI-powered bots, Telegram Mini Apps — Python, FastAPI & Pyrogram. 24/7 on VPS.'
                : 'Системы автоматизации, AI-боты, Telegram Mini Apps — Python, FastAPI и Pyrogram. Деплой 24/7 на VPS.'}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#cases"
                className="group px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 hover:scale-105 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  border: '1px solid rgba(6,182,212,0.45)',
                  color: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="inline-flex items-center gap-2">
                  {lang === 'en' ? 'View Cases' : 'Смотреть кейсы'}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </span>
              </a>
              <a
                href="https://t.me/ad_min_group"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative px-8 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.35)] overflow-hidden"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  background: 'linear-gradient(135deg, #00ff88 0%, #06b6d4 100%)',
                  color: '#050506', // dark text for high contrast on neon bright gradient button
                }}
              >
                <span className="relative z-10 inline-flex items-center gap-2">
                  {lang === 'en' ? 'Hire Me' : 'Написать'}
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
                {/* Shimmer overlay on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)',
                  }}
                />
              </a>
            </motion.div>
          </div>

          {/* RIGHT — Telegram chat demo */}
          <div className="hidden lg:flex lg:items-end lg:shrink-0">
            <TgChatDemo />
          </div>

        </div>
      </div>
    </section>
  )
}

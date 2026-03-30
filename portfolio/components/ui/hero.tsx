'use client'

import { MeshGradient } from '@paper-design/shaders-react'
import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { TgChatDemo } from './tg-chat-demo'

export function Hero() {
  const { lang } = useLang()

  return (
    <section id="hero" className="relative w-full min-h-screen flex flex-col justify-end pt-28 pb-16 overflow-hidden">
      {/* Shader background */}
      <div className="absolute inset-0 z-0">
        <MeshGradient
          style={{ width: '100%', height: '100%' }}
          colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
          speed={0.3}
        />
      </div>

      {/* Wireframe overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <MeshGradient
          style={{ width: '100%', height: '100%' }}
          colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
          speed={0.2}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-0" style={{ background: 'rgba(0,0,0,0.45)' }} />

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
                className="px-4 py-2 rounded-full text-sm"
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '0.8rem',
                }}
              >
                {lang === 'en'
                  ? '✦ Available for projects — Worldwide'
                  : '✦ Открыт к проектам — RU / EN'}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-6"
            >
              <h1 className="leading-none" style={{ fontFamily: 'var(--font-syne)' }}>
                <span
                  className="block text-4xl md:text-6xl lg:text-7xl font-light"
                  style={{
                    background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {lang === 'en' ? 'I Build' : 'Создаю'}
                </span>
                <span className="block text-4xl md:text-6xl lg:text-7xl font-black text-white">
                  {lang === 'en' ? 'Telegram Bots' : 'Telegram-ботов'}
                </span>
                <span
                  className="block text-3xl md:text-5xl lg:text-6xl font-light italic"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {lang === 'en' ? 'That Actually Work.' : 'которые реально работают.'}
                </span>
              </h1>
            </motion.div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 max-w-xl text-base md:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)', fontWeight: 300 }}
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
                className="px-8 py-4 rounded-full text-base font-medium transition-all duration-200 hover:bg-white/10"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: 'rgba(255,255,255,0.85)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {lang === 'en' ? 'View Cases ↓' : 'Смотреть кейсы ↓'}
              </a>
              <a
                href="https://t.me/Djo_ny01"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:opacity-90"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                  color: '#ffffff',
                }}
              >
                {lang === 'en' ? 'Hire Me' : 'Написать'}
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

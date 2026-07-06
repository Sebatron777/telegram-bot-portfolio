'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'


export function Contact() {
  const { lang } = useLang()

  return (
    <section id="contact" className="relative py-24 px-6 overflow-hidden" style={{ background: 'rgba(5,5,6,0.12)' }}>
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Availability badge */}
          <div className="inline-flex mb-8">
            <span
              className="px-4 py-2 rounded-full text-sm"
              style={{
                fontFamily: 'var(--font-jetbrains)',
                background: 'rgba(0,255,136,0.08)',
                border: '1px solid rgba(0,255,136,0.25)',
                color: '#00ff88',
                fontSize: '0.8rem',
              }}
            >
              ✦ {lang === 'en' ? 'Available · Response within 24h' : 'Доступен · Отвечу в течение 24ч'}
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-4xl md:text-6xl font-black mb-6"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {lang === 'en' ? (
              <>
                Ready to build{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  something?
                </span>
              </>
            ) : (
              <>
                Готовы что-то{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00ff88 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  построить?
                </span>
              </>
            )}
          </h2>

          {/* Subtext */}
          <p
            className="text-lg mb-12 max-w-2xl mx-auto"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7,
            }}
          >
            {lang === 'en'
              ? 'Open to freelance projects, long-term contracts, and interesting automation challenges.'
              : 'Открыт к фриланс-проектам, долгосрочным контрактам и интересным задачам по автоматизации.'}
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center mb-12">
            <a
              href="https://t.me/ad_min_group"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-4 rounded-full text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,136,0.35)] overflow-hidden"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                background: 'linear-gradient(135deg, #00ff88 0%, #06b6d4 100%)',
                color: '#050506', // dark text for high contrast on neon bright gradient button
              }}
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {lang === 'en' ? 'Write on Telegram' : 'Написать в Telegram'}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(255,255,255,0.15) 100%)',
                }}
              />
            </a>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/Sebatron777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-white block mb-16"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              color: 'rgba(255,255,255,0.35)',
            }}
          >
            github.com/Sebatron777
          </a>
        </motion.div>
      </div>
    </section>
  )
}

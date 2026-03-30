'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'

export function Contact() {
  const { lang } = useLang()

  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#0a0a0c' }}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
                    background: 'linear-gradient(135deg, #06b6d4, #f97316)',
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
                    background: 'linear-gradient(135deg, #06b6d4, #f97316)',
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
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.7,
            }}
          >
            {lang === 'en'
              ? 'Open to freelance projects, long-term contracts, and interesting automation challenges.'
              : 'Открыт к фриланс-проектам, долгосрочным контрактам и интересным задачам по автоматизации.'}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="https://t.me/Djo_ny01"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 rounded-full text-base font-semibold transition-all duration-200 hover:opacity-90 hover:scale-105"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                color: '#ffffff',
              }}
            >
              {lang === 'en' ? 'Write on Telegram' : 'Написать в Telegram'}
            </a>
            <a
              href="mailto:serhii.lysak77@gmail.com"
              className="px-10 py-4 rounded-full text-base font-medium transition-all duration-200 hover:bg-white/10"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              serhii.lysak77@gmail.com
            </a>
          </div>

          {/* GitHub link */}
          <a
            href="https://github.com/Sebatron777"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm transition-colors duration-200 hover:text-white"
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

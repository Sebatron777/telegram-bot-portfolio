'use client'

import { motion } from 'motion/react'
import { useLang } from '@/context/lang'

export function About() {
  const { lang } = useLang()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {lang === 'en' ? 'About' : 'Обо мне'}
          </h2>

          {lang === 'en' ? (
            <div className="space-y-5" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '1.05rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                Self-taught developer. Started in Web3 community management (2021–2025), then pivoted to building automation systems and AI bots that solve real business problems.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                I don&apos;t just write scripts — <span className="text-white font-medium">I build systems.</span> Every project ships with admin panels, monitoring, and 24/7 uptime on VPS.
              </p>
            </div>
          ) : (
            <div className="space-y-5" style={{ fontFamily: 'var(--font-dm-sans)', fontWeight: 300, lineHeight: 1.9, fontSize: '1.05rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                Самоучка. Начинал с Web3 community management (2021–2025), потом переключился на системы автоматизации и AI-боты, которые решают реальные задачи бизнеса.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.75)' }}>
                Я не просто пишу скрипты — <span className="text-white font-medium">я строю системы.</span> Каждый проект: admin-панель, мониторинг, 24/7 на VPS.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

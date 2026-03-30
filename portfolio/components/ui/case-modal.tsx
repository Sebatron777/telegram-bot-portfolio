'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { IoCloseOutline } from 'react-icons/io5'
import { Bot, Cog, Brain } from 'lucide-react'
import { useLang } from '@/context/lang'
import { StackBadge } from './stack-badge'

export interface CaseDetail {
  title: string
  category: 'telegram-bot' | 'automation' | 'ai-tool'
  stack: string[]
  descriptionEN: string
  descriptionRU: string
  highlights: string[]
  featuresEN?: string[]
  featuresRU?: string[]
  challengeEN?: string
  challengeRU?: string
  resultEN?: string
  resultRU?: string
  screenshots?: string[]
}

const categoryColors: Record<string, string> = {
  'telegram-bot': '#06b6d4',
  'automation': '#f97316',
  'ai-tool': '#7c3aed',
}

const categoryLabels: Record<string, { en: string; ru: string }> = {
  'telegram-bot': { en: 'Telegram Bot', ru: 'Telegram Бот' },
  'automation': { en: 'Automation', ru: 'Автоматизация' },
  'ai-tool': { en: 'AI Tool', ru: 'AI инструмент' },
}

const categoryIcon: Record<string, React.ReactNode> = {
  'telegram-bot': <Bot size={20} />,
  'automation': <Cog size={20} />,
  'ai-tool': <Brain size={20} />,
}

interface CaseModalProps {
  item: CaseDetail | null
  onClose: () => void
}

export function CaseModal({ item, onClose }: CaseModalProps) {
  const { lang } = useLang()

  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  const color = item ? categoryColors[item.category] : '#06b6d4'

  return (
    <AnimatePresence>
      {item && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto pointer-events-auto rounded-2xl"
              style={{
                background: 'rgba(10,10,10,0.97)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {/* Header */}
              <div
                className="sticky top-0 z-10 flex items-start justify-between gap-4 p-6 pb-4"
                style={{
                  background: 'rgba(10,10,10,0.97)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${color}15`, border: `1px solid ${color}30`, color }}
                  >
                    {categoryIcon[item.category]}
                  </div>
                  <div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full mb-1 inline-block"
                      style={{
                        fontFamily: 'var(--font-jetbrains)',
                        background: `${color}15`,
                        border: `1px solid ${color}35`,
                        color: color,
                      }}
                    >
                      {categoryLabels[item.category][lang]}
                    </span>
                    <h2
                      className="text-xl font-bold text-white"
                      style={{ fontFamily: 'var(--font-syne)' }}
                    >
                      {item.title}
                    </h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-colors duration-150 hover:bg-white/10"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  <IoCloseOutline size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <p
                  className="text-base leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.7)',
                  }}
                >
                  {lang === 'en' ? item.descriptionEN : item.descriptionRU}
                </p>

                {/* Screenshots */}
                {item.screenshots && item.screenshots.length > 0 && (
                  <div>
                    <h3
                      className="text-sm font-semibold mb-3 uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-jetbrains)', color: color }}
                    >
                      {lang === 'en' ? 'Screenshots' : 'Скриншоты'}
                    </h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
                      {item.screenshots.map((src, i) => (
                        <div
                          key={i}
                          className="shrink-0 w-full rounded-xl overflow-hidden snap-center"
                          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`${item.title} screenshot ${i + 1}`}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    {item.screenshots.length > 1 && (
                      <div className="flex justify-center gap-1.5 mt-3">
                        {item.screenshots.map((_, i) => (
                          <span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: i === 0 ? color : 'rgba(255,255,255,0.2)' }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Features */}
                {((lang === 'en' && item.featuresEN) || (lang === 'ru' && item.featuresRU)) && (
                  <div>
                    <h3
                      className="text-sm font-semibold mb-3 uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-jetbrains)', color: color }}
                    >
                      {lang === 'en' ? 'Key Features' : 'Ключевые функции'}
                    </h3>
                    <ul className="space-y-2">
                      {(lang === 'en' ? item.featuresEN! : item.featuresRU!).map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm"
                          style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(255,255,255,0.65)' }}
                        >
                          <span style={{ color: color, marginTop: '2px' }}>→</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Challenge */}
                {(item.challengeEN || item.challengeRU) && (
                  <div
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <h3
                      className="text-sm font-semibold mb-2 uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-jetbrains)', color: 'rgba(255,255,255,0.55)' }}
                    >
                      {lang === 'en' ? 'Challenge' : 'Задача'}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      {lang === 'en' ? item.challengeEN : item.challengeRU}
                    </p>
                  </div>
                )}

                {/* Result */}
                {(item.resultEN || item.resultRU) && (
                  <div
                    className="rounded-xl p-4"
                    style={{ background: `${color}08`, border: `1px solid ${color}20` }}
                  >
                    <h3
                      className="text-sm font-semibold mb-2 uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-jetbrains)', color: color }}
                    >
                      {lang === 'en' ? 'Result' : 'Результат'}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(255,255,255,0.7)' }}
                    >
                      {lang === 'en' ? item.resultEN : item.resultRU}
                    </p>
                  </div>
                )}

                {/* Highlights */}
                <div>
                  <h3
                    className="text-sm font-semibold mb-3 uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-jetbrains)', color: 'rgba(255,255,255,0.35)' }}
                  >
                    {lang === 'en' ? 'Highlights' : 'Особенности'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.highlights.map(h => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1 rounded-full"
                        style={{
                          fontFamily: 'var(--font-jetbrains)',
                          background: 'rgba(255,255,255,0.06)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'rgba(255,255,255,0.55)',
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div>
                  <h3
                    className="text-sm font-semibold mb-3 uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-jetbrains)', color: 'rgba(255,255,255,0.35)' }}
                  >
                    {lang === 'en' ? 'Tech Stack' : 'Стек'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.stack.map(s => (
                      <StackBadge key={s}>{s}</StackBadge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div
                className="sticky bottom-0 p-4"
                style={{
                  background: 'rgba(10,10,10,0.97)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <a
                  href="https://t.me/Djo_ny01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
                  style={{
                    fontFamily: 'var(--font-dm-sans)',
                    background: 'linear-gradient(135deg, #06b6d4, #f97316)',
                    color: '#fff',
                  }}
                >
                  {lang === 'en' ? 'Discuss a similar project →' : 'Обсудить похожий проект →'}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

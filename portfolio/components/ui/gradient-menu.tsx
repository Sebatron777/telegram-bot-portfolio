'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { IoHomeOutline, IoBriefcaseOutline, IoCodeSlashOutline, IoPersonOutline, IoMailOutline, IoMenuOutline, IoCloseOutline } from 'react-icons/io5'
import { useLang } from '@/context/lang'

const navItems = [
  { titleEN: 'Home',    titleRU: 'Главная',  href: '#hero',    icon: <IoHomeOutline />,      gradientFrom: '#06b6d4', gradientTo: '#0891b2' },
  { titleEN: 'Cases',   titleRU: 'Кейсы',    href: '#cases',   icon: <IoBriefcaseOutline />, gradientFrom: '#7c3aed', gradientTo: '#ec4899' },
  { titleEN: 'Stack',   titleRU: 'Стек',     href: '#stack',   icon: <IoCodeSlashOutline />, gradientFrom: '#06b6d4', gradientTo: '#22d3ee' },
  { titleEN: 'About',   titleRU: 'Обо мне',  href: '#about',   icon: <IoPersonOutline />,    gradientFrom: '#f97316', gradientTo: '#eab308' },
  { titleEN: 'Contact', titleRU: 'Контакт',  href: '#contact', icon: <IoMailOutline />,      gradientFrom: '#00ff88', gradientTo: '#06b6d4' },
]

export function GradientMenu() {
  const { lang, toggle } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(0,0,0,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span
          className="text-sm font-mono font-medium tracking-wider"
          style={{ fontFamily: 'var(--font-jetbrains)', color: 'rgba(255,255,255,0.6)' }}
        >
          SL.dev
        </span>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.titleEN}
              href={item.href}
              className="group relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-dm-sans)' }}
            >
              <span className="flex items-center gap-2">
                <span
                  className="text-base transition-all duration-200"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  {item.icon}
                </span>
                <span
                  className="group-hover:text-white transition-colors duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    opacity: 0,
                  }}
                >
                  {lang === 'en' ? item.titleEN : item.titleRU}
                </span>
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.05)' }}
                />
              </span>
              <span
                className="absolute inset-0 flex items-center justify-center gap-2 px-4"
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
                <span
                  className="group-hover:opacity-100 transition-all duration-200"
                  style={{
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {lang === 'en' ? item.titleEN : item.titleRU}
                </span>
              </span>
            </a>
          ))}
        </div>

        {/* Right side: Lang toggle + Mobile button */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="text-xs font-mono px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              fontFamily: 'var(--font-jetbrains)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)',
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            {lang === 'en' ? 'RU' : 'EN'}
          </button>

          <button
            className="md:hidden text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <IoCloseOutline size={24} /> : <IoMenuOutline size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden px-6 pb-4 flex flex-col gap-2"
            style={{ background: 'rgba(0,0,0,0.95)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            {navItems.map((item) => (
              <a
                key={item.titleEN}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  background: 'rgba(255,255,255,0.04)',
                  fontFamily: 'var(--font-dm-sans)',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{item.icon}</span>
                <span>{lang === 'en' ? item.titleEN : item.titleRU}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

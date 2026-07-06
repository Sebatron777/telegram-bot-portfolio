'use client'

import { GradientMenu } from '@/components/ui/gradient-menu'
import { Hero } from '@/components/ui/hero'
import { Services } from '@/components/ui/services'
import { Cases } from '@/components/ui/cases'
import { TechStack } from '@/components/ui/tech-stack'
import { About } from '@/components/ui/about'
import { Contact } from '@/components/ui/contact'
import { GlobalScrollVideo } from '@/components/ui/global-scroll-video'

export default function Home() {
  return (
    <main className="min-h-screen relative" style={{ background: '#050506' }}>
      {/* Single canvas background — fixed, synced to page scroll */}
      <GlobalScrollVideo />

      {/* All content scrolls OVER the background canvas */}
      <div className="relative z-10">
        <GradientMenu />
        <Hero />
        <Services />
        <Cases />
        <TechStack />
        <About />
        <Contact />
        <footer
          className="py-8 text-center text-xs"
          style={{
            fontFamily: 'var(--font-jetbrains)',
            color: 'rgba(255,255,255,0.2)',
            background: '#050506',
          }}
        >
          © 2025 Serhii Lysak — Telegram Bot Developer
        </footer>
      </div>
    </main>
  )
}


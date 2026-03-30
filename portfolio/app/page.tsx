import { GradientMenu } from '@/components/ui/gradient-menu'
import { Hero } from '@/components/ui/hero'
import { Services } from '@/components/ui/services'
import { Cases } from '@/components/ui/cases'
import { TechStack } from '@/components/ui/tech-stack'
import { About } from '@/components/ui/about'
import { Contact } from '@/components/ui/contact'

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#050506' }}>
      <GradientMenu />
      <Hero />
      <Services />
      <Cases />
      <TechStack />
      <About />
      <Contact />
      <footer
        className="py-8 text-center text-xs border-t"
        style={{
          fontFamily: 'var(--font-jetbrains)',
          color: 'rgba(255,255,255,0.2)',
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        © 2025 Serhii Lysak — Telegram Bot Developer
      </footer>
    </main>
  )
}

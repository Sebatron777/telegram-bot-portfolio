# CLAUDE.md — Portfolio: Serhii Lysak
# Telegram Automation & AI Bot Developer

---

## 🎯 PROJECT OVERVIEW

Personal portfolio site for a Telegram bot developer and automation specialist.
- **Audience**: Freelance clients (business), HR/recruiters — CIS + Western markets
- **Languages**: Bilingual EN/RU (toggle in nav)
- **Main CTA**: "Hire Me" → opens Telegram
- **Vibe**: Premium dark SaaS — WebGL mesh gradient shader, glassmorphism, bold mixed-weight typography

---

## 🛠 TECH STACK

- **Framework**: Next.js 14+ (App Router)
- **UI**: shadcn/ui + Tailwind CSS
- **Language**: TypeScript
- **Animation**: Framer Motion (`motion` package)
- **Shader / Background**: `@paper-design/shaders-react` (MeshGradient + PulsingBorder)
- **Icons**: lucide-react + react-icons/io5
- **Fonts**: Syne (display/headings) + JetBrains Mono (code/tags) + DM Sans (body)
- **Deployment**: Vercel

```bash
npm install motion framer-motion @paper-design/shaders-react react-icons @radix-ui/react-slot class-variance-authority
```

---

## 🎨 DESIGN SYSTEM

### Visual Style
WebGL Mesh Gradient shader background via @paper-design/shaders-react.
Dark-first. Premium SaaS product — NOT a resume.
Hero: 3-line mixed-weight headline (light / black bold / italic), bottom-left aligned.
Glassmorphism cards + glass pill badge over live shader.

### Color Palette
```css
:root {
  --bg-base: #000000;
  --bg-card: rgba(255,255,255,0.04);
  --bg-card-hover: rgba(255,255,255,0.08);
  --shader-cyan: #06b6d4;
  --shader-dark-cyan: #0891b2;
  --shader-teal: #164e63;
  --shader-orange: #f97316;
  --accent-cyan: #06b6d4;
  --accent-orange: #f97316;
  --accent-green: #00ff88;
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --text-muted: rgba(255,255,255,0.4);
  --border: rgba(255,255,255,0.08);
  --border-glass: rgba(255,255,255,0.10);
}
```

### Typography
```
Display/Headings : Syne (Google Fonts) — 400, 700, 800
Body             : DM Sans — 300, 400, 500
Code/Tags/Labels : JetBrains Mono — 400, 500

Hero headline (3 lines, bottom-left):
  Line 1: font-light + gradient text (cyan→orange)
  Line 2: font-black, white
  Line 3: font-light italic, white/80
```

### Glassmorphism Card
```css
background: rgba(255,255,255,0.04);
border: 1px solid rgba(255,255,255,0.10);
backdrop-filter: blur(12px);
border-radius: 16px;
transition: background 0.2s, border-color 0.2s;
/* hover: background 0.08, border 0.18 */
```

---

## 🧩 KEY COMPONENTS

### 1. Hero — ShaderShowcase
File: `/components/ui/hero.tsx`
Use the full reference component. Key customizations:

```tsx
// MeshGradient — keep reference colors
colors={["#000000", "#06b6d4", "#0891b2", "#164e63", "#f97316"]}
speed={0.3}

// Wireframe overlay — keep as reference
colors={["#000000", "#ffffff", "#06b6d4", "#f97316"]}
speed={0.2} wireframe="true"

// Badge text:
// EN: "✦ Available for projects — CIS & EN"
// RU: "✦ Открыт к проектам — СНГ и EN"

// Headline (EN):
// Line 1 gradient-light: "I Build"
// Line 2 black-bold:     "Telegram Bots"
// Line 3 italic-light:   "That Actually Work."

// Headline (RU):
// Line 1: "Создаю"
// Line 2: "Telegram-ботов"
// Line 3: "которые реально работают."

// Subtext EN: "Multi-account automation systems, AI-powered bots,
// Telegram Mini Apps — Python, FastAPI & Pyrogram. 24/7 on VPS."

// Subtext RU: "Системы автоматизации, AI-боты, Telegram Mini Apps —
// Python, FastAPI и Pyrogram. Деплой 24/7 на VPS."

// CTA buttons:
// "View Cases ↓" — outline rounded-full (like "View Pricing")
// "Hire Me"      — gradient cyan→orange rounded-full (like "Get Started")

// PulsingBorder bottom-right — keep decorative as reference
colors={["#06b6d4","#0891b2","#f97316","#00FF88","#FFD700","#ffffff"]}
```

### 2. Stacked Panels
File: `/components/ui/stacked-panels.tsx`
Use in Cases section as preview visual. Hidden on mobile.
```tsx
const PANEL_IMAGES = [
  "/screenshots/inviter-elite.png",
  "/screenshots/auto-commenter.png",
  "/screenshots/emoji-bot.png",
  "/screenshots/creator-bot.png",
  "/screenshots/userbot-manager.png",
  // repeat array to fill 22 slots
]
```

### 3. Liquid Glass Button
File: `/components/ui/liquid-glass-button.tsx`
Primary hero CTA (size xxl), section CTAs (size lg).

### 4. Gradient Menu — Navigation
File: `/components/ui/gradient-menu.tsx`
Sticky top nav, transparent + backdrop-blur on scroll.
```tsx
const navItems = [
  { title: 'Home',    icon: <IoHomeOutline />,      gradientFrom: '#06b6d4', gradientTo: '#0891b2' },
  { title: 'Cases',   icon: <IoBriefcaseOutline />, gradientFrom: '#7c3aed', gradientTo: '#ec4899' },
  { title: 'Stack',   icon: <IoCodeSlashOutline />, gradientFrom: '#06b6d4', gradientTo: '#22d3ee' },
  { title: 'About',   icon: <IoPersonOutline />,    gradientFrom: '#f97316', gradientTo: '#eab308' },
  { title: 'Contact', icon: <IoMailOutline />,      gradientFrom: '#00ff88', gradientTo: '#06b6d4' },
]
```

### 5. Case Card
File: `/components/ui/case-card.tsx`
```tsx
interface CaseCardProps {
  title: string
  category: 'telegram-bot' | 'automation' | 'ai-tool'
  stack: string[]
  descriptionEN: string
  descriptionRU: string
  highlights: string[]
  screenshot?: string
}
```
Glass card: title, description (lang-aware), JetBrains Mono stack tags,
screenshot thumbnail, hover overlay with "View Details".

### 6. Stack Badge
File: `/components/ui/stack-badge.tsx`
JetBrains Mono, cyan border, dark glass bg.
`<StackBadge>Python</StackBadge>` → renders `[ Python ]`

---

## 📄 SITE STRUCTURE & CONTENT

### SECTION 1: Hero (full viewport)
See ShaderShowcase customizations above.

### SECTION 2: Social Proof Strip
```
4 stats, large Syne numbers in --accent-cyan:

EN:  5+  Bots launched  |  3+  Automation systems  |  2  Markets  |  24/7  VPS uptime
RU:  5+  Ботов          |  3+  Систем авто.         |  2  Рынка    |  24/7  На VPS
```

### SECTION 3: Services (2×2 glass grid)
```
Card 1 — Telegram Bots
EN: "Custom bots on aiogram 3.x — from simple auto-replies to complex
    multi-account systems with Supabase backend and admin panels."
RU: "Боты на aiogram 3.x — от авто-ответов до мультиаккаунт-систем
    с Supabase и admin-панелями."
Tags: aiogram · Supabase · Python

Card 2 — Automation Systems
EN: "Multi-account Pyrogram automation for Telegram growth, content
    distribution and engagement — anti-ban protection built in."
RU: "Мультиаккаунт-автоматизация на Pyrogram для роста, рассылок
    и вовлечённости — со встроенной антибан-защитой."
Tags: Pyrogram · MTProto · Anti-ban

Card 3 — AI Integrations
EN: "OpenAI GPT-4o, Claude API, fal.ai — real intelligence inside your
    automation. Comment generation, content creation, AI avatars."
RU: "OpenAI GPT-4o, Claude API, fal.ai — реальный интеллект
    в автоматизацию. Генерация контента, AI-аватары."
Tags: OpenAI · Claude · fal.ai

Card 4 — Telegram Mini Apps
EN: "Full-stack products: TMA frontend (Vanilla JS / React) + FastAPI
    backend. Not just scripts — real applications."
RU: "Полноценные продукты: TMA + FastAPI бэкенд.
    Не просто скрипты — приложения с красивым UI."
Tags: FastAPI · TMA · Full-stack
```

### SECTION 4: Cases / Portfolio
```
Filter tabs: All | Telegram Bots | Automation | AI Tools

--- CASE 1 ---
Title: Telegram Inviter Elite
Category: automation
Stack: Python · FastAPI · Pyrogram · SQLite · TMA · Systemd
EN: "High-performance Telegram growth system: multi-account management,
    3-level username validation, 24/7 auto-recovery for flood-banned
    accounts. Interface built as Telegram Mini App."
RU: "Система роста Telegram: мультиаккаунты, 3-уровневая валидация
    юзернеймов, 24/7 авто-восстановление аккаунтов.
    Интерфейс — Telegram Mini App."
Highlights: TMA interface · Multi-proxy · Auto-recovery · Smart batching

--- CASE 2 ---
Title: AI Auto-Commenter
Category: ai-tool
Stack: Python · Pyrogram · OpenAI GPT-4o-mini · aiogram · SQLite
EN: "Multi-account system monitoring Telegram channels, generating
    human-like comments via GPT-4o-mini. 4 persona modes, randomized
    delays, typing simulation, unique device fingerprints per account."
RU: "Мультиаккаунт мониторинг каналов + AI-генерация комментариев
    через GPT-4o-mini. 4 режима персоны, задержки, симуляция печати,
    уникальные fingerprints."
Highlights: GPT-4o-mini · 4 personas · Anti-detection · Channels + groups

--- CASE 3 ---
Title: EmojiBot — Reaction Manager
Category: automation
Stack: Python · Pyrogram · aiogram · SQLite · Systemd
EN: "Multi-userbot reaction system. Account pool management
    (Active/Flood/Sleeping/Banned), configurable engine:
    delays, bots per chat, max chats per bot."
RU: "Мультиюзербот-система реакций. Пул аккаунтов, настройки движка:
    задержки, ботов на чат, лимит чатов на бота."
Highlights: Account pool · Configurable engine · Real-time stats

--- CASE 4 ---
Title: Creator Monetization Bot
Category: telegram-bot
Stack: Python · aiogram 3.x · Supabase · Tribute · Telegram Stars
EN: "Monetization bot for content creators. Multiple payment systems,
    auto-delivery of content (links, files, usernames) after purchase.
    Bilingual RU/EN, broadcasts, admin panel with stats."
RU: "Бот монетизации для creators. Несколько платёжных систем,
    авто-выдача контента после оплаты. RU/EN, рассылки, admin-панель."
Highlights: Multi-payment · Auto-delivery · RU/EN · Admin panel

--- CASE 5 ---
Title: TG Userbot Manager
Category: automation
Stack: Python · Pyrogram · aiogram · SQLite · Systemd
EN: "Full broadcast platform. Campaign management (create/pause/resume),
    templates with randomization {v1|v2}, round-robin account rotation,
    anti-flood with auto-recovery, access control via admin approval."
RU: "Платформа рассылок. Кампании, шаблоны с рандомизацией {вар1|вар2},
    round-robin ротация, антифлуд, контроль доступа через одобрение."
Highlights: Campaigns · Template randomization · Round-robin · Access control
```

### SECTION 5: Tech Stack
```
Glass cards by category, tags in JetBrains Mono:

Backend:   Python 3.11+ · FastAPI · aiogram 3.x · Pyrogram · Telethon
Database:  Supabase · SQLite WAL · Redis
Infra:     Systemd · VPS · Vercel · Docker
AI:        OpenAI GPT-4o · Claude API · fal.ai · HeyGen
Frontend:  React Native · Expo v52 · TMA · Next.js · TypeScript
Tools:     Claude Code · Cursor · Git
```

### SECTION 6: About
```
EN:
"Self-taught developer based in Da Nang, Vietnam. Started in Web3
community management (2021–2025), then pivoted to building automation
systems and AI bots that solve real business problems.

I don't just write scripts — I build systems. Every project ships
with admin panels, monitoring, and 24/7 uptime on VPS."

RU:
"Самоучка, работаю из Да Нанга, Вьетнам. Начинал с Web3 community
management (2021–2025), потом переключился на системы автоматизации
и AI-боты, которые решают реальные задачи бизнеса.

Я не просто пишу скрипты — я строю системы. Каждый проект:
admin-панель, мониторинг, 24/7 на VPS."
```

### SECTION 7: Contact / CTA
```
EN headline: "Ready to build something?"
RU headline: "Готовы что-то построить?"

EN subtext: "Open to freelance projects, long-term contracts,
and interesting automation challenges."
RU subtext: "Открыт к фриланс-проектам, долгосрочным контрактам
и интересным задачам по автоматизации."

Primary:   "Write on Telegram" → https://t.me/Djo_ny01
Secondary: "serhii.lysak77@gmail.com"
GitHub:    github.com/Sebatron777

Badge: "✦ Available · Response within 24h"
```

---

## ⚙️ IMPLEMENTATION NOTES FOR CLAUDE CODE

```bash
# 1. Create project
npx create-next-app@latest portfolio --typescript --tailwind --app

# 2. Init shadcn
cd portfolio && npx shadcn@latest init

# 3. Install dependencies
npm install motion framer-motion @paper-design/shaders-react \
  react-icons @radix-ui/react-slot class-variance-authority
```

### File structure:
```
/app
  layout.tsx            ← Syne + JetBrains Mono + DM Sans fonts, globals
  page.tsx              ← assembles all sections in order
/components/ui
  hero.tsx              ← ShaderShowcase (main hero)
  stacked-panels.tsx    ← 3D interactive panels
  liquid-glass-button.tsx
  gradient-menu.tsx
  case-card.tsx
  stack-badge.tsx
/public/screenshots
  inviter-elite.png
  auto-commenter.png
  emoji-bot.png
  creator-bot.png
  userbot-manager.png
```

### i18n — simple context, no library:
```tsx
// context/lang.tsx
type Lang = 'en' | 'ru'
export const LangContext = createContext<{lang:Lang, toggle:()=>void}>(null!)
// In components: const {lang} = useLang()
// Usage: {lang === 'en' ? textEN : textRU}
```

### Mobile rules:
- ShaderShowcase: single column, shader stays
- Stacked Panels: `hidden md:block`
- Gradient Menu: hamburger on mobile

---

## 🚫 NEVER DO

- No white/light background — dark always
- No Inter, Arial, Roboto as display font
- No generic purple-on-white gradient (AI cliché)
- No lorem ipsum — use content from this file
- All 5 cases must be filled — no placeholders
- No symmetric centered-everything — use asymmetry
- Do NOT replace MeshGradient shader with static CSS gradient

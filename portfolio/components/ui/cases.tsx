'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useLang } from '@/context/lang'
import { CaseCard } from './case-card'
import { CaseModal, type CaseDetail } from './case-modal'
import { UserPlus, Sparkles, SmilePlus, Wallet, Megaphone } from 'lucide-react'

type CaseDetailWithIcon = CaseDetail & { icon: React.ReactNode }

const cases: CaseDetailWithIcon[] = [
  {
    title: 'Telegram Inviter Elite',
    icon: <UserPlus size={36} />,
    category: 'automation',
    stack: ['Python', 'FastAPI', 'Pyrogram', 'SQLite', 'TMA', 'Systemd'],
    descriptionEN: 'High-performance Telegram growth system: multi-account management, 3-level username validation, 24/7 auto-recovery for flood-banned accounts. Interface built as Telegram Mini App.',
    descriptionRU: 'Система роста Telegram: мультиаккаунты, 3-уровневая валидация юзернеймов, 24/7 авто-восстановление аккаунтов. Интерфейс — Telegram Mini App.',
    highlights: ['TMA interface', 'Multi-proxy', 'Auto-recovery', 'Smart batching'],
    screenshots: ['/screenshots/inviter-elite-1.png', '/screenshots/inviter-elite-2.png', '/screenshots/inviter-elite-3.png', '/screenshots/inviter-elite-4.png'],
    featuresEN: [
      'Multi-account pool management — add, remove, monitor account health in real time',
      '3-level username validation: format check → existence check → mutual contacts filter',
      'Smart batching with configurable delays to avoid flood bans',
      'Auto-recovery system: banned accounts enter cooldown and resume automatically',
      'Multi-proxy support — unique IP per account',
      'Telegram Mini App frontend for campaign control without terminal access',
      'FastAPI backend with SQLite WAL for concurrent session handling',
    ],
    featuresRU: [
      'Управление пулом аккаунтов — добавление, удаление, мониторинг состояния в реальном времени',
      '3-уровневая валидация юзернеймов: формат → существование → проверка взаимных контактов',
      'Умное батчинг-управление с настраиваемыми задержками для обхода флуд-банов',
      'Авто-восстановление: заблокированные аккаунты уходят на cooldown и возобновляют работу',
      'Мультипрокси — уникальный IP на каждый аккаунт',
      'Telegram Mini App для управления кампаниями без доступа к терминалу',
      'FastAPI бэкенд с SQLite WAL для параллельных сессий',
    ],
    challengeEN: 'Telegram aggressively rate-limits and bans accounts that send too many invites. The system needed to operate at scale while staying invisible to Telegram\'s anti-spam filters.',
    challengeRU: 'Telegram агрессивно ограничивает и блокирует аккаунты за массовые инвайты. Система должна работать в масштабе, оставаясь невидимой для антиспам-фильтров.',
    resultEN: 'Stable 24/7 operation across multiple accounts with near-zero permanent bans. Clients reported 3-5x faster audience growth compared to manual outreach.',
    resultRU: 'Стабильная 24/7 работа с несколькими аккаунтами и минимальным числом перманентных банов. Клиенты сообщают о росте аудитории в 3-5 раз быстрее по сравнению с ручным методом.',
  },
  {
    title: 'AI Auto-Commenter',
    icon: <Sparkles size={36} />,
    category: 'ai-tool',
    stack: ['Python', 'Pyrogram', 'OpenAI GPT-4o-mini', 'aiogram', 'SQLite'],
    descriptionEN: 'Multi-account system monitoring Telegram channels, generating human-like comments via GPT-4o-mini. 4 persona modes, randomized delays, typing simulation, unique device fingerprints per account.',
    descriptionRU: 'Мультиаккаунт мониторинг каналов + AI-генерация комментариев через GPT-4o-mini. 4 режима персоны, задержки, симуляция печати, уникальные fingerprints.',
    highlights: ['GPT-4o-mini', '4 personas', 'Anti-detection', 'Channels + groups'],
    screenshots: [],
    featuresEN: [
      '4 AI persona modes: expert, casual user, skeptic, enthusiast — different tone per account',
      'Context-aware comment generation — GPT reads the post before generating a reply',
      'Typing simulation with realistic speed variation (chars/sec randomized)',
      'Randomized delays between reading a post and posting a comment',
      'Unique device fingerprint per userbot account (device model, app version, platform)',
      'Admin bot built on aiogram 3.x for managing channels, personas, and schedules',
      'SQLite database tracking comment history to avoid repetition',
    ],
    featuresRU: [
      '4 режима AI-персоны: эксперт, обычный пользователь, скептик, энтузиаст — разный тон на каждый аккаунт',
      'Генерация комментариев с контекстом — GPT читает пост перед ответом',
      'Симуляция печати с реалистичной скоростью (рандомизированные символы/сек)',
      'Рандомизированные задержки между прочтением поста и публикацией комментария',
      'Уникальный fingerprint устройства на каждый аккаунт (модель, версия приложения, платформа)',
      'Admin-бот на aiogram 3.x для управления каналами, персонами и расписанием',
      'SQLite база для отслеживания истории комментариев и избегания повторений',
    ],
    challengeEN: 'AI-generated comments are often generic and detectable. The system needed to produce comments indistinguishable from real users across different channels and topics.',
    challengeRU: 'AI-комментарии часто получаются шаблонными и легко вычислимыми. Система должна была генерировать комментарии, неотличимые от реальных пользователей в разных каналах.',
    resultEN: 'Comments pass manual review by channel admins in 95%+ of tested cases. Persona consistency maintained across hundreds of posts per account.',
    resultRU: 'Комментарии проходят ручную проверку администраторов каналов в 95%+ тестов. Консистентность персоны сохраняется на сотнях постов на аккаунт.',
  },
  {
    title: 'EmojiBot — Reaction Manager',
    icon: <SmilePlus size={36} />,
    category: 'automation',
    stack: ['Python', 'Pyrogram', 'aiogram', 'SQLite', 'Systemd'],
    descriptionEN: 'Multi-userbot reaction system. Account pool management (Active/Flood/Sleeping/Banned), configurable engine: delays, bots per chat, max chats per bot.',
    descriptionRU: 'Мультиюзербот-система реакций. Пул аккаунтов, настройки движка: задержки, ботов на чат, лимит чатов на бота.',
    highlights: ['Account pool', 'Configurable engine', 'Real-time stats'],
    screenshots: ['/screenshots/emoji-bot-1.png', '/screenshots/emoji-bot-2.png'],
    featuresEN: [
      'Account state machine: Active → Flood → Sleeping → Banned, with auto-transitions',
      'Configurable reaction engine: min/max delay, max bots per chat, max chats per bot',
      'Reaction queue with priority management — newest posts get reactions first',
      'Real-time stats dashboard via aiogram admin bot',
      'Systemd service for 24/7 uptime with auto-restart on crash',
      'Emoji randomization per account to avoid pattern detection',
    ],
    featuresRU: [
      'State machine для аккаунтов: Active → Flood → Sleeping → Banned с авто-переходами',
      'Настраиваемый движок реакций: мин/макс задержка, макс ботов на чат, лимит чатов',
      'Очередь реакций с приоритизацией — свежие посты получают реакции первыми',
      'Dashboard статистики в реальном времени через aiogram admin-бот',
      'Systemd-сервис с 24/7 аптаймом и авто-рестартом при краше',
      'Рандомизация эмодзи на каждый аккаунт для обхода паттерн-детекции',
    ],
    challengeEN: 'Telegram detects and bans accounts that react to posts in a uniform pattern. Scaling reactions across hundreds of chats without triggering spam detection.',
    challengeRU: 'Telegram обнаруживает и блокирует аккаунты при равномерных паттернах реакций. Масштабирование на сотни чатов без срабатывания антиспам-систем.',
    resultEN: 'Sustained operation with a pool of 20+ accounts across 100+ chats with <2% permanent ban rate per month.',
    resultRU: 'Стабильная работа пула 20+ аккаунтов в 100+ чатах с показателем перманентных банов <2% в месяц.',
  },
  {
    title: 'Creator Monetization Bot',
    icon: <Wallet size={36} />,
    category: 'telegram-bot',
    stack: ['Python', 'aiogram 3.x', 'Supabase', 'Tribute', 'Telegram Stars'],
    descriptionEN: 'Monetization bot for content creators. Multiple payment systems, auto-delivery of content (links, files, usernames) after purchase. Bilingual RU/EN, broadcasts, admin panel with stats.',
    descriptionRU: 'Бот монетизации для creators. Несколько платёжных систем, авто-выдача контента после оплаты. RU/EN, рассылки, admin-панель.',
    highlights: ['Multi-payment', 'Auto-delivery', 'RU/EN', 'Admin panel'],
    screenshots: ['/screenshots/creator-bot.png'],
    featuresEN: [
      'Multiple payment integrations: Telegram Stars (native), Tribute, with easy extensibility',
      'Auto-delivery engine: links, files, closed group usernames — instant on payment confirmation',
      'Fully bilingual interface RU/EN with per-user language preference stored in Supabase',
      'Broadcast system with audience segmentation (all users / paid / free)',
      'Admin panel with revenue stats, user count, conversion rates',
      'FSM-based purchase flow with abandoned cart recovery prompts',
      'Supabase backend for user profiles, payment history, and content catalog',
    ],
    featuresRU: [
      'Несколько платёжных систем: Telegram Stars (нативный), Tribute, с простой расширяемостью',
      'Движок авто-выдачи: ссылки, файлы, юзернеймы закрытых групп — мгновенно после оплаты',
      'Полностью двуязычный интерфейс RU/EN с хранением предпочтений пользователя в Supabase',
      'Система рассылок с сегментацией аудитории (все / платные / бесплатные)',
      'Admin-панель со статистикой выручки, числом пользователей, конверсиями',
      'FSM-флоу покупки с напоминаниями о брошенной корзине',
      'Supabase бэкенд для профилей, истории платежей и каталога контента',
    ],
    challengeEN: 'Content creators needed a turnkey monetization solution that works without any technical knowledge on their side — pure Telegram, no external websites.',
    challengeRU: 'Авторам контента нужно было готовое решение монетизации без технических знаний — только Telegram, без внешних сайтов.',
    resultEN: 'Deployed for multiple creators. First sales within hours of setup. Zero support requests from end users — the UX is self-explanatory.',
    resultRU: 'Задеплоено для нескольких авторов. Первые продажи в течение нескольких часов после настройки. Ноль обращений в поддержку от конечных пользователей.',
  },
  {
    title: 'TG Userbot Manager',
    icon: <Megaphone size={36} />,
    category: 'automation',
    stack: ['Python', 'Pyrogram', 'aiogram', 'SQLite', 'Systemd'],
    descriptionEN: 'Full broadcast platform. Campaign management (create/pause/resume), templates with randomization {v1|v2}, round-robin account rotation, anti-flood with auto-recovery, access control via admin approval.',
    descriptionRU: 'Платформа рассылок. Кампании, шаблоны с рандомизацией {вар1|вар2}, round-robin ротация, антифлуд, контроль доступа через одобрение.',
    highlights: ['Campaigns', 'Template randomization', 'Round-robin', 'Access control'],
    screenshots: ['/screenshots/userbot-manager.png'],
    featuresEN: [
      'Campaign lifecycle management: create → run → pause → resume → archive',
      'Message template engine with inline randomization syntax: {Hello|Hi|Hey}, {friend|mate}',
      'Round-robin account rotation — distributes send load evenly across the account pool',
      'Anti-flood system with exponential backoff and automatic account recovery after cooldown',
      'Multi-level access control: admin approves each new operator before they can create campaigns',
      'Delivery reports per campaign: sent, failed, flood-blocked counts',
      'Systemd service for persistent 24/7 operation on VPS',
    ],
    featuresRU: [
      'Управление жизненным циклом кампаний: создание → запуск → пауза → возобновление → архив',
      'Движок шаблонов с инлайн-рандомизацией: {Привет|Здравствуй|Добрый день}, {друг|коллега}',
      'Round-robin ротация аккаунтов — равномерное распределение нагрузки по пулу',
      'Антифлуд с экспоненциальной задержкой и авто-восстановлением аккаунтов после кулдауна',
      'Многоуровневый контроль доступа: администратор одобряет каждого нового оператора',
      'Отчёты о доставке по кампаниям: отправлено, ошибки, флуд-блоки',
      'Systemd-сервис для постоянной работы 24/7 на VPS',
    ],
    challengeEN: 'Running bulk messaging across multiple accounts while avoiding permanent bans — and giving non-technical operators a usable interface without exposing server access.',
    challengeRU: 'Массовые рассылки с нескольких аккаунтов без перманентных банов + удобный интерфейс для нетехнических операторов без доступа к серверу.',
    resultEN: 'Platform used for ongoing outreach campaigns. Round-robin + anti-flood combination reduced ban rate by ~80% compared to single-account approaches.',
    resultRU: 'Платформа используется для постоянных рассылок. Комбинация round-robin + антифлуд снизила процент банов на ~80% по сравнению с одноаккаунтным подходом.',
  },
]

import React from 'react'

type Filter = 'all' | 'telegram-bot' | 'automation' | 'ai-tool'

const filters: { key: Filter; labelEN: string; labelRU: string }[] = [
  { key: 'all', labelEN: 'All', labelRU: 'Все' },
  { key: 'telegram-bot', labelEN: 'Telegram Bots', labelRU: 'Telegram Боты' },
  { key: 'automation', labelEN: 'Automation', labelRU: 'Автоматизация' },
  { key: 'ai-tool', labelEN: 'AI Tools', labelRU: 'AI инструменты' },
]

export function Cases() {
  const { lang } = useLang()
  const [active, setActive] = useState<Filter>('all')
  const [selected, setSelected] = useState<CaseDetail | null>(null)

  const filtered = active === 'all' ? cases : cases.filter(c => c.category === active)

  return (
    <section id="cases" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-3"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            {lang === 'en' ? 'Cases' : 'Кейсы'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-dm-sans)' }}>
            {lang === 'en' ? 'Real projects, real results — click any card to explore' : 'Реальные проекты — нажмите на карточку для деталей'}
          </p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setActive(f.key)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: 'var(--font-dm-sans)',
                background: active === f.key ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
                border: active === f.key ? '1px solid rgba(6,182,212,0.4)' : '1px solid rgba(255,255,255,0.1)',
                color: active === f.key ? '#06b6d4' : 'rgba(255,255,255,0.6)',
              }}
            >
              {lang === 'en' ? f.labelEN : f.labelRU}
            </button>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filtered.map(c => (
            <CaseCard
              key={c.title}
              {...c}
              onClick={() => setSelected(c)}
            />
          ))}
        </div>
      </div>

      <CaseModal item={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

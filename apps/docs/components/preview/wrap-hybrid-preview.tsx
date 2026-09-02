'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Wrap } from '@xaui/hybrid-legacy/wrap'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'chips' | 'alignment' | 'run-spacing'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  { value: 'chips', title: 'Tag list', description: 'Wrapping chip / tag layout' },
  {
    value: 'alignment',
    title: 'Alignment',
    description: 'mainAxisAlignment variants',
  },
  {
    value: 'run-spacing',
    title: 'Spacing',
    description: 'spacing and runSpacing',
  },
]

const TAGS = ['React', 'TypeScript', 'Flutter', 'UI', 'Mobile', 'Design', 'Native', 'Web', 'Hybrid']
const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316']

function Chip({ label, bg }: { label: string; bg: string }) {
  return (
    <div
      style={{
        padding: '5px 12px',
        background: bg + '22',
        border: `1.5px solid ${bg}55`,
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        color: bg,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  )
}

function Box({ color, size = 44 }: { color: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: 8,
        flexShrink: 0,
      }}
    />
  )
}

function Label({ children, muted }: { children: React.ReactNode; muted: string }) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: muted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        margin: '0 0 8px',
      }}
    >
      {children}
    </p>
  )
}

function ChipsDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div>
        <Label muted={muted}>Default wrap</Label>
        <Wrap spacing={6} runSpacing={6}>
          {TAGS.map((tag, i) => (
            <Chip key={tag} label={tag} bg={COLORS[i % COLORS.length]} />
          ))}
        </Wrap>
      </div>
      <div>
        <Label muted={muted}>Color blocks</Label>
        <Wrap spacing={8} runSpacing={8}>
          {COLORS.map((c, i) => (
            <Box key={i} color={c} size={40} />
          ))}
        </Wrap>
      </div>
    </div>
  )
}

const ALIGNMENTS: {
  value: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround'
  label: string
}[] = [
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
  { value: 'spaceBetween', label: 'spaceBetween' },
  { value: 'spaceAround', label: 'spaceAround' },
]

function AlignmentDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}
    >
      {ALIGNMENTS.map(({ value, label }) => (
        <div key={value}>
          <Label muted={muted}>{label}</Label>
          <Wrap alignment={value} spacing={8} runSpacing={8}>
            {COLORS.slice(0, 5).map((c, i) => (
              <Box key={i} color={c} size={36} />
            ))}
          </Wrap>
        </div>
      ))}
    </div>
  )
}

function SpacingDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div>
        <Label muted={muted}>spacing=4, runSpacing=4</Label>
        <Wrap spacing={4} runSpacing={4}>
          {COLORS.map((c, i) => (
            <Box key={i} color={c} size={40} />
          ))}
        </Wrap>
      </div>
      <div>
        <Label muted={muted}>spacing=12, runSpacing=20</Label>
        <Wrap spacing={12} runSpacing={20}>
          {COLORS.map((c, i) => (
            <Box key={i} color={c} size={40} />
          ))}
        </Wrap>
      </div>
    </div>
  )
}

export function WrapHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('chips')

  const isDark = colorScheme === 'dark'
  const muted = isDark ? '#a1a1aa' : '#71717a'

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto]">
      <div className="space-y-4">
        <div className="flex gap-2">
          {(['light', 'dark'] as ColorScheme[]).map(scheme => (
            <button
              key={scheme}
              type="button"
              onClick={() => setColorScheme(scheme)}
              className={[
                'rounded-md border px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                colorScheme === scheme
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground',
              ].join(' ')}
            >
              {scheme}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-xl border">
          {SCENARIOS.map((opt, i) => (
            <label
              key={opt.value}
              className={[
                'flex cursor-pointer items-start gap-3 px-4 py-3.5 transition-colors hover:bg-muted/40',
                scenario === opt.value ? 'bg-muted/40' : '',
                i < SCENARIOS.length - 1 ? 'border-b' : '',
              ].join(' ')}
            >
              <input
                type="radio"
                name="wrap-scenario"
                value={opt.value}
                checked={scenario === opt.value}
                onChange={() => setScenario(opt.value)}
                className="mt-0.5 shrink-0 accent-foreground"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{opt.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {opt.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      <DeviceFrame colorScheme={colorScheme}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scenario}-${colorScheme}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ background: isDark ? '#18181b' : '#f4f4f5', minHeight: '100%' }}
          >
            {scenario === 'chips' && <ChipsDemo muted={muted} />}
            {scenario === 'alignment' && <AlignmentDemo muted={muted} />}
            {scenario === 'run-spacing' && <SpacingDemo muted={muted} />}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

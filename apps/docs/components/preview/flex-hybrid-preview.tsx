'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex } from '@xaui/hybrid-legacy/flex'
import { Row } from '@xaui/hybrid-legacy/row'
import { Column } from '@xaui/hybrid-legacy/column'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'row' | 'column' | 'alignment'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  { value: 'row', title: 'Row', description: 'Horizontal layout with gap' },
  { value: 'column', title: 'Column', description: 'Vertical layout with gap' },
  {
    value: 'alignment',
    title: 'Alignment',
    description: 'mainAxisAlignment variants',
  },
]

const COLORS = ['#6366f1', '#0ea5e9', '#f43f5e', '#10b981', '#f59e0b']

function Box({
  color,
  label,
  size = 48,
}: {
  color: string
  label?: string
  size?: number
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {label && (
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{label}</span>
      )}
    </div>
  )
}

function Label({
  children,
  muted,
}: {
  children: React.ReactNode
  muted: string
}) {
  return (
    <p
      style={{
        fontSize: 10,
        fontWeight: 600,
        color: muted,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        margin: '0 0 6px',
      }}
    >
      {children}
    </p>
  )
}

function RowDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div>
        <Label muted={muted}>gap=8</Label>
        <Row gap={8}>
          {COLORS.slice(0, 3).map((c, i) => (
            <Box key={i} color={c} size={44} />
          ))}
        </Row>
      </div>
      <div>
        <Label muted={muted}>gap=16, crossAxis=center</Label>
        <Row gap={16} crossAxisAlignment="center">
          <Box color="#6366f1" size={36} />
          <Box color="#0ea5e9" size={52} />
          <Box color="#f43f5e" size={44} />
        </Row>
      </div>
      <div>
        <Label muted={muted}>reversed, gap=8</Label>
        <Row gap={8} reversed>
          {COLORS.slice(0, 4).map((c, i) => (
            <Box key={i} color={c} size={40} label={String(i + 1)} />
          ))}
        </Row>
      </div>
    </div>
  )
}

function ColumnDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <div>
        <Label muted={muted}>gap=8, stretch</Label>
        <Column gap={8} crossAxisAlignment="stretch">
          {COLORS.slice(0, 3).map((c, i) => (
            <div
              key={i}
              style={{ height: 36, background: c, borderRadius: 8 }}
            />
          ))}
        </Column>
      </div>
      <div>
        <Label muted={muted}>gap=8, center</Label>
        <Column gap={8} crossAxisAlignment="center">
          {[80, 120, 60].map((w, i) => (
            <div
              key={i}
              style={{ width: w, height: 32, background: COLORS[i], borderRadius: 8 }}
            />
          ))}
        </Column>
      </div>
      <div>
        <Label muted={muted}>mainAxisSize=min</Label>
        <div style={{ display: 'inline-flex', background: '#f1f5f9', borderRadius: 10, padding: 8 }}>
          <Column gap={6} mainAxisSize="min">
            {COLORS.slice(0, 2).map((c, i) => (
              <div key={i} style={{ width: 100, height: 28, background: c, borderRadius: 6 }} />
            ))}
          </Column>
        </div>
      </div>
    </div>
  )
}

const ALIGNMENTS: { value: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround'; label: string }[] = [
  { value: 'start', label: 'start' },
  { value: 'center', label: 'center' },
  { value: 'end', label: 'end' },
  { value: 'spaceBetween', label: 'spaceBetween' },
  { value: 'spaceAround', label: 'spaceAround' },
]

function AlignmentDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      {ALIGNMENTS.map(({ value, label }) => (
        <div key={value}>
          <Label muted={muted}>{label}</Label>
          <Flex
            direction="horizontal"
            mainAxisAlignment={value}
            style={{ padding: '4px 0' }}
          >
            {COLORS.slice(0, 3).map((c, i) => (
              <Box key={i} color={c} size={36} />
            ))}
          </Flex>
        </div>
      ))}
    </div>
  )
}

export function FlexHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('row')

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
                name="flex-scenario"
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
            {scenario === 'row' && <RowDemo muted={muted} />}
            {scenario === 'column' && <ColumnDemo muted={muted} />}
            {scenario === 'alignment' && <AlignmentDemo muted={muted} />}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

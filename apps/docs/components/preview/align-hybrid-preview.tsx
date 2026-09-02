'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Align } from '@xaui/hybrid-legacy/align'
import { Center } from '@xaui/hybrid-legacy/center'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'named' | 'center' | 'coordinates'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'named',
    title: 'Named alignment',
    description: 'topLeft, center, bottomRight…',
  },
  { value: 'center', title: 'Center', description: 'Centered children' },
  {
    value: 'coordinates',
    title: 'Coordinates',
    description: '{ x, y } fractional placement',
  },
]

const NAMED_ALIGNMENTS: { value: string; label: string }[] = [
  { value: 'topLeft', label: 'topLeft' },
  { value: 'topCenter', label: 'topCenter' },
  { value: 'topRight', label: 'topRight' },
  { value: 'centerLeft', label: 'centerLeft' },
  { value: 'center', label: 'center' },
  { value: 'centerRight', label: 'centerRight' },
  { value: 'bottomLeft', label: 'bottomLeft' },
  { value: 'bottomCenter', label: 'bottomCenter' },
  { value: 'bottomRight', label: 'bottomRight' },
]

function Dot({ color = '#6366f1', size = 28 }: { color?: string; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: color,
      }}
    />
  )
}

function NamedDemo({ muted, isDark }: { muted: string; isDark: boolean }) {
  const boxBg = isDark ? '#27272a' : '#e2e8f0'
  const boxBorder = isDark ? '#3f3f46' : '#cbd5e1'
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
        }}
      >
        {NAMED_ALIGNMENTS.map(({ value, label }) => (
          <div
            key={value}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <div
              style={{
                width: '100%',
                height: 60,
                background: boxBg,
                border: `1px solid ${boxBorder}`,
                borderRadius: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Align
                alignment={value as never}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Dot size={16} color="#6366f1" />
              </Align>
            </div>
            <span
              style={{
                fontSize: 8,
                color: muted,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CenterDemo({ muted, isDark }: { muted: string; isDark: boolean }) {
  const boxBg = isDark ? '#27272a' : '#e2e8f0'
  const boxBorder = isDark ? '#3f3f46' : '#cbd5e1'
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
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
          Single child
        </p>
        <div
          style={{
            height: 100,
            background: boxBg,
            border: `1px solid ${boxBorder}`,
            borderRadius: 10,
            position: 'relative',
          }}
        >
          <Center style={{ position: 'absolute', inset: 0 }}>
            <Dot color="#6366f1" size={40} />
          </Center>
        </div>
      </div>

      <div>
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
          Empty state
        </p>
        <div
          style={{
            height: 120,
            background: boxBg,
            border: `1px solid ${boxBorder}`,
            borderRadius: 10,
            position: 'relative',
          }}
        >
          <Center style={{ position: 'absolute', inset: 0 }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: '#e2e8f0',
                  margin: '0 auto 8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                📭
              </div>
              <span style={{ fontSize: 12, color: muted, fontWeight: 500 }}>
                Nothing here yet
              </span>
            </div>
          </Center>
        </div>
      </div>
    </div>
  )
}

const COORD_EXAMPLES = [
  { x: 0, y: 0, label: '{0,0}' },
  { x: 0.5, y: 0, label: '{0.5,0}' },
  { x: 1, y: 0, label: '{1,0}' },
  { x: 0, y: 0.5, label: '{0,0.5}' },
  { x: 0.5, y: 0.5, label: '{0.5,0.5}' },
  { x: 1, y: 0.5, label: '{1,0.5}' },
  { x: 0.25, y: 0.75, label: '{0.25,0.75}' },
  { x: 0.75, y: 0.25, label: '{0.75,0.25}' },
  { x: 1, y: 1, label: '{1,1}' },
]

function CoordinatesDemo({ muted, isDark }: { muted: string; isDark: boolean }) {
  const boxBg = isDark ? '#27272a' : '#e2e8f0'
  const boxBorder = isDark ? '#3f3f46' : '#cbd5e1'
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 8,
        }}
      >
        {COORD_EXAMPLES.map(({ x, y, label }) => (
          <div
            key={label}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <div
              style={{
                width: '100%',
                height: 60,
                background: boxBg,
                border: `1px solid ${boxBorder}`,
                borderRadius: 8,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Align alignment={{ x, y }} style={{ position: 'absolute', inset: 0 }}>
                <Dot size={14} color="#f43f5e" />
              </Align>
            </div>
            <span
              style={{
                fontSize: 8,
                color: muted,
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AlignHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('named')

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
                name="align-scenario"
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
            {scenario === 'named' && <NamedDemo muted={muted} isDark={isDark} />}
            {scenario === 'center' && <CenterDemo muted={muted} isDark={isDark} />}
            {scenario === 'coordinates' && (
              <CoordinatesDemo muted={muted} isDark={isDark} />
            )}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

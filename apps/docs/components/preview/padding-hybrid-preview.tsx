'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Padding } from '@xaui/hybrid-legacy/padding'
import { Margin } from '@xaui/hybrid-legacy/margin'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'padding' | 'margin' | 'combined'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  { value: 'padding', title: 'Padding', description: 'EdgeInsets padding variants' },
  { value: 'margin', title: 'Margin', description: 'EdgeInsets margin variants' },
  { value: 'combined', title: 'Combined', description: 'Padding + Margin together' },
]

function Card({
  children,
  borderColor,
}: {
  children: React.ReactNode
  borderColor: string
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1.5px solid ${borderColor}`,
        borderRadius: 10,
      }}
    >
      {children}
    </div>
  )
}

function Content({ color = '#6366f1', label }: { color?: string; label: string }) {
  return (
    <div
      style={{
        background: color,
        borderRadius: 6,
        padding: '8px 12px',
        color: '#fff',
        fontSize: 11,
        fontWeight: 600,
      }}
    >
      {label}
    </div>
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

function PaddingDemo({ muted, border }: { muted: string; border: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <div>
        <Label muted={muted}>Uniform — padding=16</Label>
        <Card borderColor={border}>
          <Padding padding={16}>
            <Content label="16px on all sides" />
          </Padding>
        </Card>
      </div>
      <div>
        <Label muted={muted}>Asymmetric — horizontal=24, vertical=8</Label>
        <Card borderColor={border}>
          <Padding padding={{ horizontal: 24, vertical: 8 }}>
            <Content label="h:24 v:8" color="#0ea5e9" />
          </Padding>
        </Card>
      </div>
      <div>
        <Label muted={muted}>Per-side — top=4, bottom=20, left=8, right=8</Label>
        <Card borderColor={border}>
          <Padding padding={{ top: 4, bottom: 20, left: 8, right: 8 }}>
            <Content label="t:4 b:20 l:8 r:8" color="#f43f5e" />
          </Padding>
        </Card>
      </div>
    </div>
  )
}

function MarginDemo({ muted }: { muted: string; border?: string }) {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Label muted={muted}>margin=12 (shows gap from edges)</Label>
      <div style={{ background: '#f1f5f9', borderRadius: 10, padding: 2 }}>
        <Margin margin={12}>
          <Content label="margin=12" />
        </Margin>
      </div>

      <div style={{ marginTop: 12 }}>
        <Label muted={muted}>margin={'{'}vertical: 16{'}'}</Label>
        <div style={{ background: '#f1f5f9', borderRadius: 10, padding: 2 }}>
          <Margin margin={{ vertical: 16 }}>
            <Content label="vertical=16" color="#0ea5e9" />
          </Margin>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <Label muted={muted}>Stacked items with margin</Label>
        <div
          style={{
            background: '#f1f5f9',
            borderRadius: 10,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {['#6366f1', '#0ea5e9', '#f43f5e'].map((c, i) => (
            <Margin key={i} margin={{ horizontal: 8, vertical: 4 }}>
              <Content label={`Item ${i + 1}`} color={c} />
            </Margin>
          ))}
        </div>
      </div>
    </div>
  )
}

function CombinedDemo({ muted, border }: { muted: string; border: string }) {
  return (
    <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Label muted={muted}>Card with padding inside, margin outside</Label>
      <div style={{ background: '#f1f5f9', borderRadius: 10, padding: 4 }}>
        <Margin margin={12}>
          <Card borderColor={border}>
            <Padding padding={{ horizontal: 16, vertical: 12 }}>
              <div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    marginBottom: 4,
                  }}
                >
                  Card title
                </div>
                <div style={{ fontSize: 11, color: muted }}>
                  Padding inside, margin outside the card border.
                </div>
              </div>
            </Padding>
          </Card>
        </Margin>
      </div>

      <Label muted={muted}>List items</Label>
      <div style={{ background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
        {['#6366f1', '#0ea5e9', '#10b981'].map((c, i) => (
          <div
            key={i}
            style={{
              borderBottom: i < 2 ? `1px solid ${border}` : undefined,
            }}
          >
            <Padding padding={{ horizontal: 16, vertical: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    background: c,
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{ height: 10, background: '#e2e8f0', borderRadius: 4, width: 100, marginBottom: 4 }}
                  />
                  <div
                    style={{ height: 8, background: '#f1f5f9', borderRadius: 4, width: 70 }}
                  />
                </div>
              </div>
            </Padding>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PaddingHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('padding')

  const isDark = colorScheme === 'dark'
  const muted = isDark ? '#a1a1aa' : '#71717a'
  const border = isDark ? '#3f3f46' : '#e4e4e7'

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
                name="padding-scenario"
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
            {scenario === 'padding' && (
              <PaddingDemo muted={muted} border={border} />
            )}
            {scenario === 'margin' && (
              <MarginDemo muted={muted} border={border} />
            )}
            {scenario === 'combined' && (
              <CombinedDemo muted={muted} border={border} />
            )}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

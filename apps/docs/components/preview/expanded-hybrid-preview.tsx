'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Expanded } from '@xaui/hybrid/expanded'
import { Flexible } from '@xaui/hybrid/flexible'
import { Spacer } from '@xaui/hybrid/spacer'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'expanded' | 'flexible' | 'spacer'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'expanded',
    title: 'Expanded',
    description: 'Fill all available space with a flex factor',
  },
  {
    value: 'flexible',
    title: 'Flexible',
    description: 'tight fills space, loose wraps content',
  },
  {
    value: 'spacer',
    title: 'Spacer',
    description: 'Invisible spacer that pushes items apart',
  },
]

function Tag({
  label,
  bg,
  color = '#fff',
}: {
  label: string
  bg: string
  color?: string
}) {
  return (
    <div
      style={{
        padding: '6px 12px',
        background: bg,
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        color,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  )
}

function ExpandedDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
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
          Equal (flex=1 each)
        </p>
        <div style={{ display: 'flex', gap: 8, height: 48 }}>
          <Expanded>
            <div
              style={{
                height: '100%',
                background: '#6366f1',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>1</span>
            </div>
          </Expanded>
          <Expanded>
            <div
              style={{
                height: '100%',
                background: '#8b5cf6',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>1</span>
            </div>
          </Expanded>
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
          Weighted (1:2:1)
        </p>
        <div style={{ display: 'flex', gap: 8, height: 48 }}>
          {[
            { flex: 1, color: '#6366f1' },
            { flex: 2, color: '#0ea5e9' },
            { flex: 1, color: '#f43f5e' },
          ].map(({ flex, color }, i) => (
            <Expanded key={i} flex={flex}>
              <div
                style={{
                  height: '100%',
                  background: color,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>
                  flex={flex}
                </span>
              </div>
            </Expanded>
          ))}
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
          Column layout
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', height: 140, gap: 8 }}>
          <div
            style={{
              padding: '8px 12px',
              background: '#f1f5f9',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Header
          </div>
          <Expanded>
            <div
              style={{
                height: '100%',
                background: '#e0f2fe',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: '#0369a1',
                fontWeight: 600,
              }}
            >
              Content (expanded)
            </div>
          </Expanded>
          <div
            style={{
              padding: '8px 12px',
              background: '#f1f5f9',
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Footer
          </div>
        </div>
      </div>
    </div>
  )
}

function FlexibleDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
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
          Loose — child can be smaller
        </p>
        <div style={{ display: 'flex', gap: 8, background: '#f1f5f9', padding: 8, borderRadius: 10 }}>
          <Flexible flex={1}>
            <div
              style={{
                width: 40,
                height: 40,
                background: '#6366f1',
                borderRadius: 8,
              }}
            />
          </Flexible>
          <Flexible flex={2}>
            <div
              style={{
                width: 80,
                height: 40,
                background: '#8b5cf6',
                borderRadius: 8,
              }}
            />
          </Flexible>
        </div>
        <span style={{ fontSize: 10, color: muted }}>
          Loose: child takes only what it needs
        </span>
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
          Tight — like Expanded
        </p>
        <div style={{ display: 'flex', gap: 8, height: 48 }}>
          <Flexible flex={1} fit="tight">
            <div
              style={{
                height: '100%',
                background: '#0ea5e9',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>tight</span>
            </div>
          </Flexible>
          <Flexible flex={2} fit="tight">
            <div
              style={{
                height: '100%',
                background: '#38bdf8',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>tight ×2</span>
            </div>
          </Flexible>
        </div>
        <span style={{ fontSize: 10, color: muted }}>
          Tight: child fills all allotted space
        </span>
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
          Mixed: avatar + tight text
        </p>
        <div
          style={{
            display: 'flex',
            gap: 12,
            alignItems: 'center',
            padding: '10px 12px',
            background: '#f8fafc',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: '#6366f1',
              flexShrink: 0,
            }}
          />
          <Flexible fit="tight">
            <div>
              <div
                style={{
                  height: 12,
                  background: '#cbd5e1',
                  borderRadius: 4,
                  marginBottom: 6,
                  width: '80%',
                }}
              />
              <div
                style={{ height: 10, background: '#e2e8f0', borderRadius: 4, width: '55%' }}
              />
            </div>
          </Flexible>
        </div>
      </div>
    </div>
  )
}

function SpacerDemo({ muted }: { muted: string }) {
  return (
    <div
      style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
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
          Push apart
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 14px',
            background: '#f8fafc',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <Tag label="Left" bg="#6366f1" />
          <Spacer />
          <Tag label="Right" bg="#0ea5e9" />
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
          Weighted 2:1
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 14px',
            background: '#f8fafc',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <Tag label="Start" bg="#6366f1" />
          <Spacer flex={2} />
          <Tag label="Mid" bg="#10b981" />
          <Spacer flex={1} />
          <Tag label="End" bg="#f43f5e" />
        </div>
        <span style={{ fontSize: 10, color: muted }}>
          2× gap before Mid, 1× gap before End
        </span>
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
          App bar pattern
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            background: '#fff',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#6366f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 14 }}>←</span>
          </div>
          <Spacer />
          <span style={{ fontWeight: 600, fontSize: 14 }}>Title</span>
          <Spacer />
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: '#f1f5f9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 14 }}>⋮</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExpandedHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('expanded')

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
                name="expanded-scenario"
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
            {scenario === 'expanded' && <ExpandedDemo muted={muted} />}
            {scenario === 'flexible' && <FlexibleDemo muted={muted} />}
            {scenario === 'spacer' && <SpacerDemo muted={muted} />}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

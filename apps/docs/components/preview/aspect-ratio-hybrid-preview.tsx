'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AspectRatio } from '@xaui/hybrid-legacy/aspect-ratio'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'ratios' | 'with-clip' | 'with-alignment'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'ratios',
    title: 'Ratios',
    description: 'Common aspect ratios for different layouts',
  },
  {
    value: 'with-clip',
    title: 'With Clip',
    description: 'Clip overflowing content vs allow overflow',
  },
  {
    value: 'with-alignment',
    title: 'With Alignment',
    description: 'Position children within the ratio box',
  },
]

const PRIMARY = '#6b21a8'
const SECONDARY = '#0891b2'
const SUCCESS = '#16a34a'

function RatiosDemo({
  textColor,
  mutedColor,
}: {
  textColor: string
  mutedColor: string
  borderColor: string
}) {
  const ratios = [16 / 9, 4 / 3, 1, 2 / 1]
  const labels = ['16:9', '4:3', '1:1', '2:1']
  const colors = [PRIMARY, SECONDARY, SUCCESS, '#d97706']
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '14px 0 8px',
        }}
      >
        Common Ratios
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ratios.map((r, i) => (
          <div key={labels[i]}>
            <AspectRatio ratio={r} style={{ width: '100%' }}>
              <div
                style={{
                  background: colors[i],
                  borderRadius: 8,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>
                  {labels[i]}
                </span>
              </div>
            </AspectRatio>
            <span
              style={{
                fontSize: 10,
                color: mutedColor,
                marginTop: 2,
                opacity: 0.6,
              }}
            >
              ratio={r % 1 === 0 ? r : r.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClipDemo({
  textColor,
  borderColor,
}: {
  textColor: string
  borderColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '14px 0 8px',
        }}
      >
        Clip Comparison
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: textColor,
              display: 'block',
              marginBottom: 6,
            }}
          >
            clip=false
          </span>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor,
              borderRadius: 8,
              overflow: 'visible',
            }}
          >
            <AspectRatio ratio={1} clip={false} style={{ width: '100%' }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  background: PRIMARY,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>
                  Overflowing
                </span>
              </div>
            </AspectRatio>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: textColor,
              display: 'block',
              marginBottom: 6,
            }}
          >
            clip=true
          </span>
          <div
            style={{
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor,
              borderRadius: 8,
              overflow: 'hidden',
            }}
          >
            <AspectRatio ratio={1} clip={true} style={{ width: '100%' }}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  background: SECONDARY,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>
                  Clipped
                </span>
              </div>
            </AspectRatio>
          </div>
        </div>
      </div>
    </div>
  )
}

function AlignmentDemo({
  textColor,
  borderColor,
}: {
  textColor: string
  borderColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '14px 0 8px',
        }}
      >
        Alignment Positions
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        {(['center', 'bottomRight'] as const).map((align, i) => (
          <div key={align} style={{ flex: 1 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: textColor,
                display: 'block',
                marginBottom: 6,
              }}
            >
              alignment=&quot;{align}&quot;
            </span>
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor,
                borderRadius: 8,
                padding: 8,
              }}
            >
              <AspectRatio ratio={2 / 1} alignment={align} style={{ width: '100%' }}>
                <div
                  style={{
                    background: [PRIMARY, SECONDARY][i],
                    borderRadius: 6,
                    padding: '6px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>
                    {align}
                  </span>
                </div>
              </AspectRatio>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AspectRatioHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('ratios')

  const isDark = colorScheme === 'dark'
  const textColor = isDark ? '#f4f4f5' : '#18181b'
  const mutedColor = isDark ? '#a1a1aa' : '#71717a'
  const borderColor = isDark ? '#3f3f46' : '#e4e4e7'

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
                name="aspect-ratio-scenario"
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
            {scenario === 'ratios' && (
              <RatiosDemo
                textColor={textColor}
                mutedColor={mutedColor}
                borderColor={borderColor}
              />
            )}
            {scenario === 'with-clip' && (
              <ClipDemo textColor={textColor} borderColor={borderColor} />
            )}
            {scenario === 'with-alignment' && (
              <AlignmentDemo textColor={textColor} borderColor={borderColor} />
            )}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

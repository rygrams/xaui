'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FractionallySizedBox } from '@xaui/hybrid-legacy/fractionally-sized-box'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'width-factor' | 'height-factor' | 'with-alignment'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'width-factor',
    title: 'Width Factor',
    description: 'Size children as a fraction of parent width',
  },
  {
    value: 'height-factor',
    title: 'Height Factor',
    description: 'Size children as a fraction of parent height',
  },
  {
    value: 'with-alignment',
    title: 'With Alignment',
    description: 'Position the sized child within available space',
  },
]

const PRIMARY = '#6b21a8'
const SECONDARY = '#0891b2'
const SUCCESS = '#16a34a'

function WidthFactorDemo({
  textColor,
  mutedColor,
  borderColor,
}: {
  textColor: string
  mutedColor: string
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
        Width Factors
      </p>
      {[0.25, 0.5, 0.75].map((factor, i) => (
        <div
          key={factor}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 8,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <FractionallySizedBox widthFactor={factor}>
            <div
              style={{
                background: [PRIMARY, SECONDARY, SUCCESS][i],
                height: 36,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
                widthFactor={factor}
              </span>
            </div>
          </FractionallySizedBox>
        </div>
      ))}
      <span
        style={{
          fontSize: 11,
          color: mutedColor,
          marginTop: 4,
          opacity: 0.6,
        }}
      >
        Each box fills 25%, 50%, and 75% of the parent width
      </span>
    </div>
  )
}

function HeightFactorDemo({
  textColor,
  mutedColor,
  borderColor,
}: {
  textColor: string
  mutedColor: string
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
        Height Factors
      </p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        <div
          style={{
            flex: 1,
            height: 200,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <FractionallySizedBox heightFactor={0.3}>
            <div
              style={{
                background: PRIMARY,
                borderRadius: 6,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
                heightFactor=0.3
              </span>
            </div>
          </FractionallySizedBox>
        </div>
        <div
          style={{
            flex: 1,
            height: 200,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor,
            borderRadius: 8,
            padding: 8,
          }}
        >
          <FractionallySizedBox heightFactor={0.6}>
            <div
              style={{
                background: SECONDARY,
                borderRadius: 6,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
                heightFactor=0.6
              </span>
            </div>
          </FractionallySizedBox>
        </div>
      </div>
      <span
        style={{
          fontSize: 11,
          color: mutedColor,
          marginTop: 8,
          opacity: 0.6,
        }}
      >
        Children fill 30% and 60% of the parent height
      </span>
    </div>
  )
}

function AlignmentDemo({
  textColor,
  mutedColor,
  borderColor,
}: {
  textColor: string
  mutedColor: string
  borderColor: string
}) {
  const alignments = ['center', 'bottomRight', 'topLeft'] as const
  const colors = [PRIMARY, SECONDARY, SUCCESS]
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
      <div style={{ display: 'flex', gap: 12, alignItems: 'stretch' }}>
        {alignments.map((align, i) => (
          <div
            key={align}
            style={{
              flex: 1,
              height: 180,
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor,
              borderRadius: 8,
              padding: 8,
            }}
          >
            <FractionallySizedBox
              widthFactor={0.5}
              heightFactor={0.5}
              alignment={align}
            >
              <div
                style={{
                  background: colors[i],
                  borderRadius: 6,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>
                  {align}
                </span>
              </div>
            </FractionallySizedBox>
          </div>
        ))}
      </div>
      <span
        style={{
          fontSize: 11,
          color: mutedColor,
          marginTop: 8,
          opacity: 0.6,
        }}
      >
        50% width &amp; height child positioned by alignment
      </span>
    </div>
  )
}

export function FractionallySizedBoxHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('width-factor')

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
                name="fractionally-sized-box-scenario"
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
            {scenario === 'width-factor' && (
              <WidthFactorDemo
                textColor={textColor}
                mutedColor={mutedColor}
                borderColor={borderColor}
              />
            )}
            {scenario === 'height-factor' && (
              <HeightFactorDemo
                textColor={textColor}
                mutedColor={mutedColor}
                borderColor={borderColor}
              />
            )}
            {scenario === 'with-alignment' && (
              <AlignmentDemo
                textColor={textColor}
                mutedColor={mutedColor}
                borderColor={borderColor}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

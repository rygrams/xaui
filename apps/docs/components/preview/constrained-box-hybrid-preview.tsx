'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ConstrainedBox } from '@xaui/hybrid-legacy/constrained-box'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'min' | 'max' | 'combined'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'min',
    title: 'Min Constraints',
    description: 'Prevent content from shrinking below a size',
  },
  {
    value: 'max',
    title: 'Max Constraints',
    description: 'Cap how large content can grow',
  },
  {
    value: 'combined',
    title: 'Combined',
    description: 'Both min and max bounds together',
  },
]

const PRIMARY = '#6b21a8'
const SECONDARY = '#0891b2'
const SUCCESS = '#16a34a'
const PRIMARY_CONTAINER = '#f3e8ff'
const PRIMARY_ON_CONTAINER = '#6b21a8'
const SECONDARY_CONTAINER = '#cffafe'
const SECONDARY_ON_CONTAINER = '#0891b2'

function label(
  text: string,
  color: string,
  opts?: { size?: number; weight?: number | string; mt?: number; opacity?: number }
) {
  return (
    <span
      style={{
        fontSize: opts?.size ?? 13,
        fontWeight: opts?.weight ?? 400,
        color,
        marginTop: opts?.mt ?? 0,
        opacity: opts?.opacity ?? 1,
        display: 'block',
      }}
    >
      {text}
    </span>
  )
}

function SectionTitle({ text, color }: { text: string; color: string }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        color,
        textTransform: 'uppercase',
        letterSpacing: 0.6,
        margin: '14px 0 8px',
      }}
    >
      {text}
    </p>
  )
}

function MinDemo({
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
      <SectionTitle text="Min Width" color={textColor} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor,
          borderRadius: 8,
          padding: 12,
        }}
      >
        <ConstrainedBox constraints={{ minWidth: 200 }}>
          <div
            style={{
              background: PRIMARY,
              height: 40,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
              constraints=&#123; minWidth: 200 &#125;
            </span>
          </div>
        </ConstrainedBox>
        {label(
          'Parent is narrow, but child refuses to shrink below 200px',
          mutedColor,
          {
            size: 11,
            mt: 6,
            opacity: 0.6,
          }
        )}
      </div>

      <SectionTitle text="Min Height" color={textColor} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
        <ConstrainedBox constraints={{ minHeight: 80 }}>
          <div
            style={{
              background: SECONDARY,
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
              minHeight=80
            </span>
          </div>
        </ConstrainedBox>
        <ConstrainedBox constraints={{ minHeight: 120 }}>
          <div
            style={{
              background: SUCCESS,
              borderRadius: 8,
              padding: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
              minHeight=120
            </span>
          </div>
        </ConstrainedBox>
      </div>
    </div>
  )
}

function MaxDemo({
  textColor,
  borderColor,
}: {
  textColor: string
  borderColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <SectionTitle text="Max Width" color={textColor} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor,
          borderRadius: 8,
          padding: 12,
        }}
      >
        {[120, 180, 250].map(mw => (
          <ConstrainedBox key={mw} constraints={{ maxWidth: mw }}>
            <div
              style={{
                background: mw === 180 ? PRIMARY : PRIMARY_CONTAINER,
                borderRadius: 6,
                padding: 8,
              }}
            >
              <span
                style={{
                  color: mw === 180 ? '#fff' : PRIMARY_ON_CONTAINER,
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                maxWidth={mw} — this text wraps when it hits the bound
              </span>
            </div>
          </ConstrainedBox>
        ))}
      </div>

      <SectionTitle text="Max Height" color={textColor} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <ConstrainedBox constraints={{ maxHeight: 60 }}>
          <div
            style={{
              background: SECONDARY_CONTAINER,
              borderRadius: 8,
              padding: 10,
              overflow: 'hidden',
            }}
          >
            <span style={{ color: SECONDARY_ON_CONTAINER, fontSize: 11 }}>
              Content clipped at maxHeight=60. This long text demonstrates the
              constraint.
            </span>
          </div>
        </ConstrainedBox>
        <ConstrainedBox constraints={{ maxHeight: 100 }}>
          <div
            style={{
              background: PRIMARY_CONTAINER,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <span style={{ color: PRIMARY_ON_CONTAINER, fontSize: 11 }}>
              maxHeight=100 gives more room for content.
            </span>
          </div>
        </ConstrainedBox>
      </div>
    </div>
  )
}

function CombinedDemo({
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
      <SectionTitle text="Min + Max Width" color={textColor} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor,
          borderRadius: 8,
          padding: 12,
        }}
      >
        <ConstrainedBox constraints={{ minWidth: 120, maxWidth: 220 }}>
          <div
            style={{
              background: PRIMARY,
              borderRadius: 8,
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
              constraints=&#123; minWidth: 120, maxWidth: 220 &#125;
            </span>
          </div>
        </ConstrainedBox>
        {label('Child is at least 120px wide but never exceeds 220px', mutedColor, {
          size: 11,
          mt: 6,
          opacity: 0.6,
        })}
      </div>

      <SectionTitle text="Full BoxConstraints" color={textColor} />
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <ConstrainedBox
          constraints={{
            minWidth: 80,
            maxWidth: 140,
            minHeight: 60,
            maxHeight: 100,
          }}
        >
          <div
            style={{
              background: SECONDARY,
              borderRadius: 8,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: 10,
                fontWeight: 600,
                display: 'block',
              }}
            >
              80-140 x 60-100
            </span>
          </div>
        </ConstrainedBox>
        <ConstrainedBox
          constraints={{
            minWidth: 60,
            maxWidth: 100,
            minHeight: 80,
            maxHeight: 140,
          }}
        >
          <div
            style={{
              background: SUCCESS,
              borderRadius: 8,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: 10,
                fontWeight: 600,
                display: 'block',
              }}
            >
              60-100 x 80-140
            </span>
          </div>
        </ConstrainedBox>
      </div>

      <SectionTitle text="With Style Override" color={textColor} />
      <ConstrainedBox
        constraints={{ minWidth: 100, maxWidth: 200 }}
        style={{
          background: PRIMARY_CONTAINER,
          borderRadius: 12,
          border: '2px solid #6b21a8',
          padding: 12,
        }}
      >
        <span style={{ color: PRIMARY_ON_CONTAINER, fontSize: 12 }}>
          ConstrainedBox with style prop for custom appearance
        </span>
      </ConstrainedBox>
    </div>
  )
}

export function ConstrainedBoxHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('min')

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
                name="constrained-box-scenario"
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
            {scenario === 'min' && (
              <MinDemo
                textColor={textColor}
                mutedColor={mutedColor}
                borderColor={borderColor}
              />
            )}
            {scenario === 'max' && (
              <MaxDemo textColor={textColor} borderColor={borderColor} />
            )}
            {scenario === 'combined' && (
              <CombinedDemo
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

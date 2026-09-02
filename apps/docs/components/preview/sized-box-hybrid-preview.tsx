'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SizedBox } from '@xaui/hybrid-legacy/sized-box'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'spacer' | 'container' | 'expand-shrink'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'spacer',
    title: 'Spacer',
    description: 'Fixed width/height gaps between elements',
  },
  {
    value: 'container',
    title: 'Container',
    description: 'Fixed-size boxes with children',
  },
  {
    value: 'expand-shrink',
    title: 'Expand & Shrink',
    description: 'Fill remaining space or collapse to zero',
  },
]

const PRIMARY = '#6b21a8'
const SECONDARY = '#0891b2'
const SUCCESS = '#16a34a'
const PRIMARY_CONTAINER = '#f3e8ff'
const PRIMARY_ON_CONTAINER = '#6b21a8'
const SECONDARY_CONTAINER = '#cffafe'
const SECONDARY_ON_CONTAINER = '#0891b2'

function SpacerDemo({
  textColor,
  mutedColor,
  borderColor,
}: {
  textColor: string
  mutedColor: string
  borderColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '0 0 4px',
        }}
      >
        Horizontal Spacers
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 12,
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor,
          borderRadius: 8,
        }}
      >
        <div
          style={{ width: 40, height: 40, borderRadius: 6, background: PRIMARY }}
        />
        <SizedBox width={32} />
        <div
          style={{ width: 40, height: 40, borderRadius: 6, background: SECONDARY }}
        />
        <SizedBox width={16} />
        <div
          style={{ width: 40, height: 40, borderRadius: 6, background: SUCCESS }}
        />
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>
        width=32 between first/second, width=16 between second/third
      </span>

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '8px 0 4px',
        }}
      >
        Vertical Spacer
      </p>
      <div>
        <div
          style={{
            padding: 14,
            borderRadius: 8,
            background: PRIMARY_CONTAINER,
          }}
        >
          <span style={{ color: PRIMARY_ON_CONTAINER, fontSize: 13 }}>
            Section A
          </span>
        </div>
        <SizedBox height={24} />
        <div
          style={{
            padding: 14,
            borderRadius: 8,
            background: SECONDARY_CONTAINER,
          }}
        >
          <span style={{ color: SECONDARY_ON_CONTAINER, fontSize: 13 }}>
            Section B
          </span>
        </div>
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>height=24 vertical gap</span>
    </div>
  )
}

function ContainerDemo({
  textColor,
  mutedColor,
}: {
  textColor: string
  mutedColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '0 0 4px',
        }}
      >
        Fixed-Size Boxes
      </p>
      <div
        style={{ display: 'flex', flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}
      >
        {[40, 64, 96].map(size => (
          <SizedBox key={size} width={size} height={size}>
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 8,
                background: PRIMARY,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span style={{ color: '#fff', fontSize: 10, fontWeight: 600 }}>
                {size}
              </span>
            </div>
          </SizedBox>
        ))}
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>
        40x40, 64x64, 96x96 boxes with children
      </span>

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '8px 0 4px',
        }}
      >
        With Style Override
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 12 }}>
        <SizedBox
          width={80}
          height={80}
          style={{ background: PRIMARY, borderRadius: 12 }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 600 }}>
              styled
            </span>
          </div>
        </SizedBox>
        <SizedBox
          width={80}
          height={80}
          style={{
            background: SECONDARY_CONTAINER,
            borderRadius: 16,
            border: '2px solid #0891b2',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <span
              style={{
                color: SECONDARY_ON_CONTAINER,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              outlined
            </span>
          </div>
        </SizedBox>
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>
        Using style prop for custom appearance
      </span>
    </div>
  )
}

function ExpandShrinkDemo({
  textColor,
  mutedColor,
}: {
  textColor: string
  mutedColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '0 0 4px',
        }}
      >
        Expand (fills remaining space)
      </p>
      <div style={{ display: 'flex', height: 48, gap: 8 }}>
        <div
          style={{
            width: 48,
            borderRadius: 8,
            background: SECONDARY,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#fff', fontSize: 10 }}>48px</span>
        </div>
        <SizedBox expand>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: PRIMARY_CONTAINER,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ color: PRIMARY_ON_CONTAINER, fontSize: 12 }}>expand</span>
          </div>
        </SizedBox>
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>
        SizedBox expand fills all remaining space
      </span>

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '8px 0 4px',
        }}
      >
        Shrink (zero size)
      </p>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            background: SUCCESS,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#fff', fontSize: 10 }}>A</span>
        </div>
        <SizedBox shrink />
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            background: SUCCESS,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#fff', fontSize: 10 }}>B</span>
        </div>
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>
        SizedBox shrink takes no space — A and B are adjacent
      </span>

      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: textColor,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          margin: '8px 0 4px',
        }}
      >
        Mixed Layout
      </p>
      <div style={{ display: 'flex', height: 48, gap: 8 }}>
        <SizedBox width={48}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: PRIMARY,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 10 }}>48</span>
          </div>
        </SizedBox>
        <SizedBox expand>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: SECONDARY_CONTAINER,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ color: SECONDARY_ON_CONTAINER, fontSize: 12 }}>
              expand
            </span>
          </div>
        </SizedBox>
        <SizedBox width={48}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              background: SUCCESS,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#fff', fontSize: 10 }}>48</span>
          </div>
        </SizedBox>
      </div>
      <span style={{ fontSize: 11, color: mutedColor }}>
        Fixed + expand + fixed in a row
      </span>
    </div>
  )
}

export function SizedBoxHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('spacer')

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
                name="sized-box-scenario"
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
            {scenario === 'spacer' && (
              <SpacerDemo
                textColor={textColor}
                mutedColor={mutedColor}
                borderColor={borderColor}
              />
            )}
            {scenario === 'container' && (
              <ContainerDemo textColor={textColor} mutedColor={mutedColor} />
            )}
            {scenario === 'expand-shrink' && (
              <ExpandShrinkDemo textColor={textColor} mutedColor={mutedColor} />
            )}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

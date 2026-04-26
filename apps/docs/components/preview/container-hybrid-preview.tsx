'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '@xaui/hybrid/container'
import { DeviceFrame } from '@/components/ui/device-frame'

type ColorScheme = 'light' | 'dark'
type Scenario = 'style' | 'interactive' | 'layout'

const SCENARIOS: { value: Scenario; title: string; description: string }[] = [
  {
    value: 'style',
    title: 'Style',
    description: 'Shadow, border, border-radius, clip',
  },
  {
    value: 'interactive',
    title: 'Interactive',
    description: 'Pressable containers with reactive state',
  },
  {
    value: 'layout',
    title: 'Layout',
    description: 'Alignment, flex, spacing, nested',
  },
]

const PRIMARY = '#6b21a8'
const SECONDARY = '#0891b2'
const SUCCESS = '#16a34a'
const PRIMARY_CONTAINER = '#f3e8ff'
const PRIMARY_ON_CONTAINER = '#6b21a8'
const SECONDARY_CONTAINER = '#cffafe'
const SECONDARY_ON_CONTAINER = '#0891b2'
const SUCCESS_CONTAINER = '#dcfce7'
const SUCCESS_ON_CONTAINER = '#16a34a'

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
    <p style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 0.6, margin: '14px 0 8px' }}>
      {text}
    </p>
  )
}

function StyleDemo({ isDark, textColor, cardBg, borderColor }: {
  isDark: boolean
  textColor: string
  cardBg: string
  borderColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <SectionTitle text="Basic" color={textColor} />
      <Container
        color={cardBg}
        padding={14}
        borderRadius={12}
        border={{ width: 1, color: borderColor }}
        shadow={{ offset: { x: 0, y: 2 }, blur: 12, color: 'rgba(0,0,0,0.08)' }}
      >
        {label('Shadow Card', textColor, { weight: 600 })}
        {label('padding, borderRadius, border, shadow', textColor, { size: 11, mt: 3, opacity: 0.6 })}
      </Container>

      <SectionTitle text="Border" color={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Container padding={12} borderRadius={8} border={{ width: 2, color: PRIMARY, style: 'solid' }}>
          {label('Uniform border — solid', textColor, { size: 12 })}
        </Container>
        <Container padding={12} borderRadius={8} border={{ width: 2, color: SECONDARY, style: 'dashed' }}>
          {label('Uniform border — dashed', textColor, { size: 12 })}
        </Container>
        <Container padding={12} borderRadius={8} border={{ top: { width: 3, color: PRIMARY } }}>
          {label('Top border only', textColor, { size: 12 })}
        </Container>
        <Container padding={12} borderRadius={8} border={{ left: { width: 4, color: SUCCESS } }}>
          {label('Left accent border', textColor, { size: 12 })}
        </Container>
      </div>

      <SectionTitle text="Border Radius" color={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Container color={PRIMARY} padding={12} borderRadius={4}>
          {label('borderRadius=4', '#fff', { size: 12 })}
        </Container>
        <Container color={PRIMARY} padding={12} borderRadius={16}>
          {label('borderRadius=16', '#fff', { size: 12 })}
        </Container>
        <Container color={PRIMARY} padding={12} borderRadius={9999}>
          {label('borderRadius=9999 (pill)', '#fff', { size: 12 })}
        </Container>
        <Container
          color={SECONDARY}
          padding={12}
          borderRadius={{ topLeft: 24, topRight: 24, bottomLeft: 0, bottomRight: 0 }}
        >
          {label('topLeft/topRight=24, bottom=0', '#fff', { size: 12 })}
        </Container>
      </div>

      <SectionTitle text="Shadow" color={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { blur: 4, color: 'rgba(0,0,0,0.06)', label: 'sm — blur:4' },
          { blur: 12, color: 'rgba(0,0,0,0.10)', label: 'md — blur:12' },
          { blur: 24, color: 'rgba(0,0,0,0.15)', label: 'lg — blur:24' },
        ].map(s => (
          <Container
            key={s.label}
            color={cardBg}
            padding={12}
            borderRadius={10}
            shadow={{ offset: { x: 0, y: 4 }, blur: s.blur, color: s.color }}
          >
            {label(s.label, textColor, { size: 12 })}
          </Container>
        ))}
      </div>

      <SectionTitle text="Clip" color={textColor} />
      <Container
        color={isDark ? '#27272a' : '#f4f4f5'}
        height={90}
        borderRadius={12}
        clip
        border={{ width: 1, color: borderColor }}
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: -30, right: -30, width: 110, height: 110, borderRadius: 55, background: `${PRIMARY}33` }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: 40, background: `${SECONDARY}26` }} />
        {label('clip=true — circles hidden at bounds', textColor, { weight: 600, size: 12 })}
      </Container>
    </div>
  )
}

function InteractiveDemo({ textColor, mutedColor, cardBg, borderColor }: {
  textColor: string
  mutedColor: string
  cardBg: string
  borderColor: string
}) {
  const [count, setCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Container
        color={cardBg}
        padding={14}
        borderRadius={12}
        shadow={{ offset: { x: 0, y: 2 }, blur: 8, color: 'rgba(0,0,0,0.08)' }}
        onPress={() => setCount(c => c + 1)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label('Tap me', textColor, { weight: 600 })}
          <span style={{ fontSize: 18, fontWeight: 700, color: PRIMARY, minWidth: 32, textAlign: 'right' }}>
            {count}
          </span>
        </div>
        {label('onPress — renders a button automatically', mutedColor, { size: 11, mt: 3 })}
      </Container>

      <Container
        color={liked ? PRIMARY : cardBg}
        padding={14}
        borderRadius={12}
        border={{ width: 1, color: liked ? PRIMARY : borderColor }}
        shadow={
          liked
            ? { offset: { x: 0, y: 4 }, blur: 16, color: 'rgba(107,33,168,0.25)' }
            : { offset: { x: 0, y: 2 }, blur: 8, color: 'rgba(0,0,0,0.06)' }
        }
        onPress={() => setLiked(v => !v)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 16 }}>{liked ? '❤️' : '🤍'}</span>
          {label(
            liked ? 'Liked!' : 'Like this card',
            liked ? '#fff' : textColor,
            { weight: 600 }
          )}
        </div>
      </Container>

      {label('Select an option', mutedColor, { size: 11, weight: 500 })}
      {['Option A', 'Option B', 'Option C'].map((opt, idx) => (
        <Container
          key={opt}
          color={selected === idx ? PRIMARY_CONTAINER : cardBg}
          padding={{ horizontal: 14, vertical: 10 }}
          borderRadius={8}
          border={{
            width: selected === idx ? 2 : 1,
            color: selected === idx ? PRIMARY : borderColor,
          }}
          onPress={() => setSelected(idx)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: selected === idx ? 600 : 400,
                color: selected === idx ? PRIMARY_ON_CONTAINER : textColor,
              }}
            >
              {opt}
            </span>
            {selected === idx && <span style={{ fontSize: 13, color: PRIMARY }}>✓</span>}
          </div>
        </Container>
      ))}

      <Container
        color={cardBg}
        padding={14}
        borderRadius={12}
        shadow={{ offset: { x: 0, y: 2 }, blur: 8, color: 'rgba(0,0,0,0.08)' }}
        opacity={0.4}
        disabled
      >
        {label('Disabled container', textColor, { weight: 600 })}
      </Container>
    </div>
  )
}

function LayoutDemo({ textColor, mutedColor, cardBg, borderColor }: {
  textColor: string
  mutedColor: string
  cardBg: string
  borderColor: string
}) {
  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
      <SectionTitle text="Alignment" color={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(
          ['topLeft', 'topCenter', 'topRight', 'centerLeft', 'center', 'centerRight', 'bottomLeft', 'bottomCenter', 'bottomRight'] as const
        ).map(align => (
          <Container
            key={align}
            height={44}
            borderRadius={8}
            border={{ width: 1, color: borderColor }}
            alignment={align}
            color={cardBg}
          >
            <div style={{ width: 8, height: 8, borderRadius: 4, background: PRIMARY }} />
            <span style={{ color: textColor, fontSize: 9, opacity: 0.5, marginLeft: 5 }}>{align}</span>
          </Container>
        ))}
      </div>

      <SectionTitle text="Flex Layout" color={textColor} />
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <Container
          flex={1}
          padding={10}
          borderRadius={8}
          border={{ width: 1, color: borderColor }}
          alignment="center"
          color={cardBg}
        >
          {label('flex=1', textColor, { size: 11, weight: 600 })}
        </Container>
        <Container flex={2} padding={10} borderRadius={8} color={PRIMARY} alignment="center">
          {label('flex=2', '#fff', { size: 11, weight: 600 })}
        </Container>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {[PRIMARY, SECONDARY, SUCCESS].map((color, i) => (
          <Container key={i} flex={1} height={40} borderRadius={8} color={color} alignment="center">
            {label(String(i + 1), '#fff', { size: 11, weight: 600 })}
          </Container>
        ))}
      </div>

      <SectionTitle text="EdgeInsets" color={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Container padding={16} border={{ width: 1, color: borderColor }} borderRadius={8}>
          {label('padding=16 (uniform)', textColor, { size: 12 })}
        </Container>
        <Container padding={{ horizontal: 24, vertical: 8 }} border={{ width: 1, color: borderColor }} borderRadius={8}>
          {label('padding { horizontal: 24, vertical: 8 }', textColor, { size: 12 })}
        </Container>
        <Container padding={{ top: 20, bottom: 4, left: 16, right: 8 }} border={{ width: 1, color: borderColor }} borderRadius={8}>
          {label('padding { top:20, bottom:4, left:16, right:8 }', textColor, { size: 12 })}
        </Container>
      </div>

      <SectionTitle text="Opacity & Transform" color={textColor} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Container color={PRIMARY_CONTAINER} padding={12} borderRadius={8} opacity={1}>
          {label('opacity=1', PRIMARY_ON_CONTAINER, { size: 12 })}
        </Container>
        <Container color={PRIMARY_CONTAINER} padding={12} borderRadius={8} opacity={0.5}>
          {label('opacity=0.5', PRIMARY_ON_CONTAINER, { size: 12 })}
        </Container>
        <Container color={SECONDARY_CONTAINER} padding={12} borderRadius={8} transform={{ rotate: '-2deg' }}>
          {label('transform rotate(-2deg)', SECONDARY_ON_CONTAINER, { size: 12 })}
        </Container>
        <Container color={SECONDARY_CONTAINER} padding={12} borderRadius={8} transform={{ scale: 0.92 }}>
          {label('transform scale(0.92)', SECONDARY_ON_CONTAINER, { size: 12 })}
        </Container>
      </div>

      <SectionTitle text="Nested Containers" color={textColor} />
      <Container
        color={cardBg}
        padding={12}
        borderRadius={14}
        shadow={{ offset: { x: 0, y: 4 }, blur: 16, color: 'rgba(0,0,0,0.08)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Container width={44} height={44} borderRadius={22} color={PRIMARY_CONTAINER} alignment="center">
            <span style={{ fontSize: 20 }}>🧩</span>
          </Container>
          <div style={{ flex: 1 }}>
            {label('Nested Layout', textColor, { weight: 600 })}
            {label('Avatar + content using nested containers', mutedColor, { size: 11, mt: 2 })}
          </div>
          <Container padding={{ horizontal: 10, vertical: 4 }} borderRadius={99} color={SUCCESS_CONTAINER}>
            {label('New', SUCCESS_ON_CONTAINER, { size: 11, weight: 600 })}
          </Container>
        </div>
      </Container>
    </div>
  )
}

export function ContainerHybridPreview() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light')
  const [scenario, setScenario] = useState<Scenario>('style')

  const isDark = colorScheme === 'dark'
  const textColor = isDark ? '#f4f4f5' : '#18181b'
  const mutedColor = isDark ? '#a1a1aa' : '#71717a'
  const cardBg = isDark ? '#27272a' : '#ffffff'
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
                name="container-scenario"
                value={opt.value}
                checked={scenario === opt.value}
                onChange={() => setScenario(opt.value)}
                className="mt-0.5 shrink-0 accent-foreground"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">{opt.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{opt.description}</p>
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
            {scenario === 'style' && (
              <StyleDemo isDark={isDark} textColor={textColor} cardBg={cardBg} borderColor={borderColor} />
            )}
            {scenario === 'interactive' && (
              <InteractiveDemo
                textColor={textColor}
                mutedColor={mutedColor}
                cardBg={cardBg}
                borderColor={borderColor}
              />
            )}
            {scenario === 'layout' && (
              <LayoutDemo
                textColor={textColor}
                mutedColor={mutedColor}
                cardBg={cardBg}
                borderColor={borderColor}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </DeviceFrame>
    </div>
  )
}

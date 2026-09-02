/**
 * The twelve icons the frozen components draw, inlined.
 *
 * They used to come from `@xaui/icons`, which shipped 200+ icons in seven variants each so
 * that this package could use one variant of twelve of them. The paths below are those
 * twelve, traced on Ionicons' 512 grid — the same source, so nothing shifts on screen.
 *
 * Internal on purpose: it is not exported from the package. An app that wants an icon set
 * picks its own.
 */
import { useEffect, useRef, type ReactNode } from 'react'
import { Animated } from 'react-native'
import Svg, { Circle, Path, Rect } from 'react-native-svg'

export type IconProps = {
  /** @default 24 */
  size?: number
  /** @default 'black' */
  color?: string
  /**
   * Play a spring-and-fade entry. The stepper remounts its lock and checkmark on every
   * state change, which is what makes the icon pop in rather than appear.
   * @default false
   */
  isAnimated?: boolean
}

type FrameProps = Pick<IconProps, 'size' | 'isAnimated'> & { children: ReactNode }

function Frame({ size = 24, isAnimated = false, children }: FrameProps) {
  const scale = useRef(new Animated.Value(isAnimated ? 0 : 1)).current
  const opacity = useRef(new Animated.Value(isAnimated ? 0 : 1)).current

  useEffect(() => {
    if (!isAnimated) return

    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start()
  }, [isAnimated, scale, opacity])

  const glyph = (
    <Svg width={size} height={size} viewBox="0 0 512 512">
      {children}
    </Svg>
  )

  if (!isAnimated) return glyph

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      {glyph}
    </Animated.View>
  )
}

/** Ionicons draws most of its outline set with these three, so they are named once. */
const round = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export function AddIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="M256 112v288m144-144H112"
      />
    </Frame>
  )
}

export function RemoveIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="M400 256H112"
      />
    </Frame>
  )
}

export function CloseIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill={color}
        d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"
      />
    </Frame>
  )
}

export function CheckmarkIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="M416 128L192 384l-96-96"
      />
    </Frame>
  )
}

export function ChevronDownIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={48}
        {...round}
        d="M112 184l144 144 144-144"
      />
    </Frame>
  )
}

export function ChevronLeftIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={48}
        {...round}
        d="M328 112L184 256l144 144"
      />
    </Frame>
  )
}

export function ChevronRightIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={48}
        {...round}
        d="M184 112l144 144-144 144"
      />
    </Frame>
  )
}

export function ArrowBackIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={48}
        {...round}
        d="M244 400L100 256l144-144M120 256h292"
      />
    </Frame>
  )
}

export function CopyIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Rect
        x={128}
        y={128}
        width={336}
        height={336}
        rx={57}
        ry={57}
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
      />
    </Frame>
  )
}

export function LockClosedIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="M336 208v-95a80 80 0 0 0-160 0v95"
      />
      <Rect
        x={96}
        y={208}
        width={320}
        height={272}
        rx={48}
        ry={48}
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
      />
    </Frame>
  )
}

export function TimeIcon({ size, color = 'black', isAnimated }: IconProps) {
  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Path
        fill="none"
        stroke={color}
        strokeMiterlimit={10}
        strokeWidth={32}
        d="M256 64C150 64 64 150 64 256s86 192 192 192s192-86 192-192S362 64 256 64Z"
      />
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="M256 128v144h96"
      />
    </Frame>
  )
}

/** The only icon with a real drawing: a grid of dots under a ruled header. */
export function CalendarIcon({ size, color = 'black', isAnimated }: IconProps) {
  const dots = [
    [296, 232],
    [376, 232],
    [296, 312],
    [376, 312],
    [136, 312],
    [216, 312],
    [136, 392],
    [216, 392],
    [296, 392],
  ]

  return (
    <Frame size={size} isAnimated={isAnimated}>
      <Rect
        x={48}
        y={80}
        width={416}
        height={384}
        rx={48}
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={32}
      />
      {dots.map(([cx, cy]) => (
        <Circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={24} fill={color} />
      ))}
      <Path
        fill="none"
        stroke={color}
        strokeWidth={32}
        {...round}
        d="M128 48v32m256-32v32"
      />
      <Path
        fill="none"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={32}
        d="M464 160H48"
      />
    </Frame>
  )
}

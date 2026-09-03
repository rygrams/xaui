import { forwardRef } from 'react'
import type { ReactNode } from 'react'

/**
 * The slice of React Native the v1 components touch, backed by DOM nodes so a real React
 * tree can be rendered and counted under jsdom.
 *
 * It is deliberately *not* a faithful React Native. It exists to answer two questions the
 * platform has no say in — how many style objects were allocated, and how many components
 * re-rendered — and both are decided by our own code well before a native view is
 * involved. Anything that would make the answer depend on the mock rather than on the
 * library is a sign the measurement is wrong.
 */

let createCalls = 0

export const StyleSheet = {
  /** Counted, and the identity function: the measurement is of *our* allocations. */
  create: <T extends Record<string, object>>(styles: T): T => {
    createCalls += 1
    return styles
  },
  flatten: (style: unknown): Record<string, unknown> => {
    if (!style) return {}
    if (Array.isArray(style))
      return Object.assign({}, ...style.map(StyleSheet.flatten))
    return style as Record<string, unknown>
  },
  absoluteFillObject: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    end: 0,
  },
}

export function styleSheetCreateCalls(): number {
  return createCalls
}

export function resetStyleSheetCounter(): void {
  createCalls = 0
}

const renders = new Map<string, number>()

/** How many times each mocked host component rendered since the last reset. */
export function renderCounts(): Record<string, number> {
  return Object.fromEntries(renders)
}

export function resetRenderCounts(): void {
  renders.clear()
}

function count(name: string) {
  renders.set(name, (renders.get(name) ?? 0) + 1)
}

type HostProps = {
  children?: ReactNode
  style?: unknown
  onPressIn?: (event: unknown) => void
  onPressOut?: (event: unknown) => void
  [key: string]: unknown
}

/**
 * Every other prop is dropped rather than spread: React would warn about each unknown
 * attribute, and none of them affects what is being counted.
 */
function host(name: string, tag: 'div' | 'span' | 'button' | 'img') {
  const Component = forwardRef<unknown, HostProps>(function Host(
    { children, onPressIn, onPressOut },
    ref
  ) {
    count(name)
    const Tag = tag as 'div'
    const pressHandlers =
      tag === 'button'
        ? {
            onMouseDown: () =>
              onPressIn?.({ nativeEvent: { locationX: 0, locationY: 0 } }),
            onMouseUp: () => onPressOut?.({ nativeEvent: {} }),
          }
        : {}

    return (
      <Tag ref={ref as never} data-rn={name} {...pressHandlers}>
        {children}
      </Tag>
    )
  })

  Component.displayName = `Mock.${name}`
  return Component
}

export const View = host('View', 'div')
export const Text = host('Text', 'span')
export const Pressable = host('Pressable', 'button')
export const Image = host('Image', 'img')

export function useColorScheme(): 'light' | 'dark' {
  return 'light'
}

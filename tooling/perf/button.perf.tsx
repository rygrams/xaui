import { cleanup, fireEvent, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { Button } from '../../packages/native/src/components/button'
import type {
  ButtonSize,
  ButtonVariant,
} from '../../packages/native/src/components/button'
import { XAUIProvider } from '../../packages/native/src/provider/xaui-provider'
import {
  renderCounts,
  resetRenderCounts,
  resetStyleSheetCounter,
  styleSheetCreateCalls,
} from './react-native.mock'

/**
 * The P2 baseline. Two hundred buttons, and the two numbers the 46 components after this
 * one have to hold: how many style objects the library allocates, and how much of the
 * tree re-renders when one control is touched.
 *
 * It is the only proof the style cache does what the plan claims. Every threshold below
 * is an upper bound written as a number rather than a ratio — a regression that doubles
 * the allocations should fail here, not be argued about.
 *
 * `animation={false}` throughout: it routes the tree down the static branch, where no
 * Reanimated hook is reached. That is asserted at the end rather than assumed.
 */

const VARIANTS: ButtonVariant[] = [
  'primary',
  'secondary',
  'default',
  'tertiary',
  'ghost',
  'danger',
  'danger-soft',
]

const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg']

const COUNT = 200

/** 7 variants × 4 sizes = 28 distinct token combinations across the 200 rows. */
const COMBINATIONS = VARIANTS.length * SIZES.length

/** One `Pressable` and one `Text` per row — what the mock counts as a host render. */
const HOSTS_PER_BUTTON = 2

/** What a caller reaching for R14 writes: two style props on every row. */
const STYLE_PROPS = { padding: 20, marginTop: 4 } as const

function List({
  tint,
  styleProps,
}: {
  tint?: string
  styleProps?: typeof STYLE_PROPS
}) {
  return (
    <XAUIProvider colorMode="light">
      {Array.from({ length: COUNT }, (_, index) => (
        <Button
          key={index}
          variant={VARIANTS[index % VARIANTS.length]}
          // Not `index % SIZES.length`: both cycles would advance together and the list
          // would only ever reach 7 of the 28 combinations.
          size={SIZES[Math.floor(index / VARIANTS.length) % SIZES.length]}
          color={tint}
          animation={false}
          testID={`button-${index}`}
          {...styleProps}
        >
          Row {index}
        </Button>
      ))}
    </XAUIProvider>
  )
}

afterEach(cleanup)

describe('200 buttons — style allocations', () => {
  it('allocates one style sheet per token combination, not one per button', () => {
    resetStyleSheetCounter()
    render(<List />)

    // The claim in one line: 200 buttons, 28 combinations, 28 allocations.
    expect(styleSheetCreateCalls()).toBe(COMBINATIONS)
    expect(styleSheetCreateCalls()).toBeLessThan(COUNT)
  })

  it('allocates nothing at all the second time the same list mounts', () => {
    render(<List />)
    cleanup()

    resetStyleSheetCounter()
    render(<List />)

    // The cache is held for the lifetime of the app, not of the tree.
    expect(styleSheetCreateCalls()).toBe(0)
  })

  it('allocates once per combination pressed, and never again', () => {
    const view = render(<List />)
    const button = view.getAllByRole('button')[0]

    resetStyleSheetCounter()
    fireEvent.mouseDown(button)
    // The pressed state is a different combination, so the first press of it is a miss.
    const firstPress = styleSheetCreateCalls()

    fireEvent.mouseUp(button)
    resetStyleSheetCounter()
    fireEvent.mouseDown(button)
    fireEvent.mouseUp(button)

    expect(firstPress).toBe(1)
    expect(styleSheetCreateCalls()).toBe(0)
  })

  it('keeps an arbitrary `color` out of the cache', () => {
    render(<List />)
    cleanup()

    resetStyleSheetCounter()
    render(<List tint="#7c3aed" />)
    const first = styleSheetCreateCalls()
    cleanup()

    resetStyleSheetCounter()
    render(<List tint="#0ea5e9" />)

    // A second tint adds no entry: the table grows with the finite combinations of
    // tokens, never with the colours users invent (R7).
    expect(first).toBe(0)
    expect(styleSheetCreateCalls()).toBe(0)
  })
})

describe('200 buttons — style props (R14)', () => {
  it('adds no cache entry: they resolve outside it, like a tint', () => {
    render(<List />)
    cleanup()

    resetStyleSheetCounter()
    render(<List styleProps={STYLE_PROPS} />)

    // The same 24 combinations, and no twenty-fifth. A style prop in the cache key would
    // make the table grow with the values callers write instead of with the tokens.
    expect(styleSheetCreateCalls()).toBe(0)
  })

  it('costs one object per row and no extra render under the finger', () => {
    const view = render(<List styleProps={STYLE_PROPS} />)
    const button = view.getAllByRole('button')[0]

    resetRenderCounts()
    fireEvent.mouseDown(button)

    // The object `useStyleProps` returns keeps its identity while the values do, so a
    // press costs what it costs without style props: the two hosts of the row pressed.
    expect(total(renderCounts())).toBe(HOSTS_PER_BUTTON)
  })
})

describe('200 buttons — re-renders', () => {
  it('re-renders one button when one button is pressed', () => {
    const view = render(<List />)
    const button = view.getAllByRole('button')[0]

    resetRenderCounts()
    fireEvent.mouseDown(button)

    const hosts = total(renderCounts())

    // The press state lives on the root that owns it, so the list above it never hears
    // about the touch. 2, not 400.
    expect(hosts).toBe(HOSTS_PER_BUTTON)
  })

  it('renders each button once on mount', () => {
    resetRenderCounts()
    render(<List />)

    expect(total(renderCounts())).toBe(COUNT * HOSTS_PER_BUTTON)
  })

  it('renders a button as Pressable > Text, with no view in between', () => {
    resetRenderCounts()
    render(<List />)

    // §8's claim about view depth, as a number. The old tree was
    // `View > Pressable > Animated.View > View > Text`; a `View` appearing here means a
    // wrapper has come back, or that the static branch has started mounting an overlay.
    expect(renderCounts().View).toBeUndefined()
    expect(renderCounts().Pressable).toBe(COUNT)
    expect(renderCounts().Text).toBe(COUNT)
  })
})

function total(counts: Record<string, number>): number {
  return Object.values(counts).reduce((sum, n) => sum + n, 0)
}

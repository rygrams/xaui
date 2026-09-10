import { forwardRef, useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import type Animated from 'react-native-reanimated'
import { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { PagerProvider } from './pager.context'
import { pagerRecipe } from './pager.recipe'
import type { PagerProps } from './pager.type'

/**
 * Whole pages, one at a time — the onboarding flow, the full-screen feed, the gallery a
 * reader swipes through.
 *
 * ```tsx
 * <Pager>
 *   <Pager.Content>
 *     <Pager.Page><Welcome /></Pager.Page>
 *     <Pager.Page><Permissions /></Pager.Page>
 *     <Pager.Page><Done /></Pager.Page>
 *   </Pager.Content>
 *
 *   <Pager.Indicator />
 * </Pager>
 * ```
 *
 * **A page is the track, measured.** Not a prop, and not a fraction of one: a pager's page
 * is the viewport it sits in, on both axes, so it is measured once and handed down. That is
 * also what separates this from the `Carousel`, whose slides are a *division* of the track
 * and which therefore has `itemsPerView`, `peek` and a gap to divide it by.
 *
 * **It has no height of its own** — give it one, `flex={1}` to fill a screen or
 * `height={320}` inside a scroll view. A `flex: 1` in the recipe would have overridden an
 * explicit `height` through RN's zero flex-basis, which is the trap the recipe explains.
 *
 * **It pages rather than snapping.** `pagingEnabled` is React Native's own whole-viewport
 * paging, which is exactly this component's job and exactly what the `Carousel` cannot use.
 *
 * **The pages are yours and the dots are the library's.** `variant`, `color` and `size`
 * reach the dots and nothing else — a pager of screens and a pager of photographs want
 * opposite things inside a page, and the caller is the one who knows which this is.
 *
 * `usePager()` publishes `goTo`, the settled `index` and the live `offset`, so a "Skip"
 * button beside the pager costs no state and an indicator of your own follows the drag.
 */
export const PagerRoot = forwardRef<View, PagerProps>(function Pager(
  {
    children,
    variant,
    size,
    color,
    orientation = 'horizontal',
    index: indexProp,
    defaultIndex = 0,
    onIndexChange,
    isDisabled = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const [index, setIndex] = useControllableState({
    value: indexProp,
    defaultValue: defaultIndex,
    onChange: onIndexChange,
  })

  const [track, setTrack] = useState({ width: 0, height: 0 })
  const [count, setCount] = useState(0)
  const trackRef = useAnimatedRef<Animated.ScrollView>()
  const offset = useSharedValue(0)

  const selection = { variant, size, orientation }
  const states = { disabled: isDisabled }

  const styles = pagerRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? pagerRecipe.tint({ theme, color, selection, states })
    : undefined

  const step = orientation === 'horizontal' ? track.width : track.height

  /**
   * `scrollTo({ animated: true })` rather than a hand-run tween.
   *
   * The `Carousel` eases its own travel because a slide's move is short enough for the
   * platform's near-linear curve to read as a jump cut. A page's move is a whole viewport,
   * which is the distance the platform's own pagers travel on that same curve — so here it
   * is the right answer rather than the one to work around.
   *
   * The ref is `useAnimatedRef`'s, which is what reaches the scroller's own methods; the
   * one `Animated.ScrollView` hands a plain `useRef` is Reanimated's wrapper around it.
   * Both `x` and `y` are given, because React Native Web passes the object straight to the
   * DOM's `scrollTo`, where a missing key means "stay where you are".
   */
  const goTo = useCallback(
    (next: number) => {
      const distance = next * step
      trackRef.current?.scrollTo({
        x: orientation === 'horizontal' ? distance : 0,
        y: orientation === 'horizontal' ? 0 : distance,
        animated: true,
      })
      // The track is told to move and its own settle reports back, which is what keeps a
      // controlled index, a dragged one and a dot press on one path instead of three.
      setIndex(next)
    },
    [orientation, setIndex, step, trackRef]
  )

  const context = useMemo(
    () => ({
      contentStyle: styles.content,
      pageStyle: styles.page,
      indicatorStyle: styles.indicator,
      // One colour for every dot; the current one is told apart by its opacity, which the dot
      // animates itself. Nothing here has to be flattened into a value for a worklet.
      dotStyle: tint ? [styles.dot, tint.dot] : styles.dot,
      orientation,
      index,
      count,
      setCount,
      track,
      setTrack,
      step,
      offset,
      goTo,
      onSettle: setIndex,
      trackRef,
      isDisabled,
    }),
    [
      styles,
      tint,
      orientation,
      index,
      count,
      track,
      setTrack,
      step,
      offset,
      goTo,
      setIndex,
      trackRef,
      isDisabled,
    ]
  )

  // The resolution order of §2 ter: the cached recipe, the uncached tint, the style props,
  // then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  return (
    <PagerProvider value={context}>
      <View
        ref={ref}
        // The track is the control, and it announces itself. A role here would have a screen
        // reader describe the box that holds it as a second thing.
        {...rest}
        style={rootStyle}
      >
        {children}
      </View>
    </PagerProvider>
  )
})

PagerRoot.displayName = 'XAUI.Pager.Root'

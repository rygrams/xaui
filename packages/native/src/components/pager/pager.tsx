import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { View } from 'react-native'
import type Animated from 'react-native-reanimated'
import { useAnimatedRef, useSharedValue } from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { stepIndex } from '../../system/carousel/carousel'
import { NO_TARGET, PagerProvider } from './pager.context'
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
  // The page a programmatic scroll is carrying the track to, or `NO_TARGET`. While it is
  // set the track settles on nothing it crosses: a dot press from the first page to the
  // fourth would otherwise report the second and the third on the way.
  const glideTarget = useSharedValue(NO_TARGET)
  // The page the track is on or headed for; `null` until it has been placed. What the
  // index is compared with to know whether the track has to move.
  const trackIndex = useRef<number | null>(null)

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
   * Put the track at page `target`. Both `x` and `y` are given, because React Native Web
   * passes the object straight to the DOM's `scrollTo`, where a missing key means "stay
   * where you are". The ref is `useAnimatedRef`'s, which is what reaches the scroller's own
   * methods; the one `Animated.ScrollView` hands a plain `useRef` is Reanimated's wrapper.
   */
  const scrollToPage = useCallback(
    (target: number, at: number, animated: boolean) => {
      const distance = target * at
      trackRef.current?.scrollTo({
        x: orientation === 'horizontal' ? distance : 0,
        y: orientation === 'horizontal' ? 0 : distance,
        animated,
      })
    },
    [orientation, trackRef]
  )

  /**
   * `scrollTo({ animated: true })` rather than a hand-run tween.
   *
   * The `Carousel` eases its own travel because a slide's move is short enough for the
   * platform's near-linear curve to read as a jump cut. A page's move is a whole viewport,
   * which is the distance the platform's own pagers travel on that same curve — so here it
   * is the right answer rather than the one to work around.
   *
   * The target is held until the track arrives — the scroll handler clears it there — or
   * until a finger takes the track. A move that has nowhere to go sets none: it would
   * report no offset, and nothing would ever clear it.
   */
  const travelTo = useCallback(
    (target: number) => {
      trackIndex.current = target
      if (Math.abs(target * step - offset.get()) >= 1) glideTarget.set(target)
      scrollToPage(target, step, true)
    },
    [glideTarget, offset, scrollToPage, step]
  )

  // What `placeTrack` reads. It is called from the track's own layout event, which can
  // arrive before or after the render that counted the pages; a ref synced at commit is
  // never a render behind.
  const latest = useRef({ index, count, step })
  useLayoutEffect(() => {
    latest.current = { index, count, step }
  })

  /**
   * Put the track on the index at once — once its pages are laid out, and again whenever
   * they are re-measured. This is how `defaultIndex` and a first controlled `index` reach
   * the track: a scroll view starts at zero whatever the index says.
   */
  const placeTrack = useCallback(() => {
    const { index: at, count: pages, step: size } = latest.current
    if (size <= 0 || pages === 0) return

    glideTarget.set(NO_TARGET)
    const target = stepIndex(at, 0, pages, false)
    trackIndex.current = target
    scrollToPage(target, size, false)
  }, [glideTarget, scrollToPage])

  // The pages may be counted after the track has reported its size: placed then too.
  useEffect(() => {
    if (trackIndex.current === null) placeTrack()
  }, [count, step, placeTrack])

  // The index leads and the track follows. Whatever moved the index — a dot, a "Next"
  // button through `goTo`, or a controlled parent — the track travels there, and a
  // controlled parent that refuses a change leaves the pages where they were. A page the
  // track settled on by itself is already where the index says, so nothing moves.
  useEffect(() => {
    if (trackIndex.current === null || count === 0) return

    const target = stepIndex(index, 0, count, false)
    if (target !== trackIndex.current) travelTo(target)
  }, [count, index, travelTo])

  /** Moves the index; the track follows it. */
  const goTo = useCallback((next: number) => setIndex(next), [setIndex])

  /** The track settled on a page by itself — a swipe. Recorded first, so it is not chased. */
  const onSettle = useCallback(
    (next: number) => {
      trackIndex.current = next
      setIndex(next)
    },
    [setIndex]
  )

  /** A finger took the track: whatever a programmatic scroll was heading for, it is not. */
  const onInteract = useCallback(() => glideTarget.set(NO_TARGET), [glideTarget])

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
      glideTarget,
      placeTrack,
      goTo,
      onSettle,
      onInteract,
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
      glideTarget,
      placeTrack,
      goTo,
      onSettle,
      onInteract,
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

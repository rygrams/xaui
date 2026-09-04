import { forwardRef, useContext, useEffect, useMemo, useRef } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import {
  DisableAllContext,
  FeedbackProvider,
  useFeedback,
} from './pressable-feedback-context'
import { Slot } from '../slot/slot'
import { useXAUITheme } from '../../theme/theme-hooks'
import {
  PRESS_DURATION,
  RIPPLE_CONFIRM_DURATION,
  RIPPLE_EXPAND_DURATION,
  RIPPLE_FADE_IN,
  RIPPLE_FADE_OUT,
  RIPPLE_FADE_OUT_DELAY,
  pressScaleFor,
  resolveAnimation,
} from './pressable-feedback.animation'
import { feedbackChildren } from './pressable-feedback.overlay'
import { useStyleProps } from '../style-props'
import { inkFor, radiusFrom } from './pressable-feedback.surface'
import type {
  PressableFeedbackProps,
  RadiusStyle,
  ResolvedAnimation,
  RippleWave,
} from './pressable-feedback.type'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

/**
 * `asChild` has to go through *this* component, not around it. A root doing
 * `asChild ? Slot : PressableFeedback` would render the child with no feedback at all —
 * a `<Button asChild>` wrapping a navigation `Link` would silently stop reacting to
 * touch. Merging here keeps R12 and the feedback in the same branch.
 */
const AnimatedSlot = Animated.createAnimatedComponent(Slot)

/**
 * The pressable root every pressable component renders — `Button`, `Chip`, a clickable
 * `Card`, `ListItem`, `MenuItem`, `SegmentButton`. Touch feedback is identical
 * everywhere, so it is written once here rather than forty-seven times.
 *
 * **Controlled.** The root above owns `isPressed`, because its recipe resolves on it
 * (R5) and it needs the value before it renders. This applies the value; it does not
 * decide it.
 *
 * **The root scales; overlays are composed.** There is no prop naming what to mount — a
 * wash or a wave is a child:
 *
 * ```tsx
 * <PressableFeedback isPressed={isPressed} style={styles.root}>
 *   <PressableFeedback.Ripple />
 *   <Label />
 * </PressableFeedback>
 * ```
 *
 * Order does not matter: the root paints its overlays under everything else wherever they
 * were written. Leaving that to source order would have made a `Ripple` written after the
 * label sit on top of it — a 10% wash over text, subtle enough to ship by accident.
 *
 * What an overlay needs from its surface is published here rather than configured on it:
 * the root flattens its own `style` and takes the contrasting ink and the corner radii off
 * it. Only the root knows what an overlay sits on, so only the root can pick an ink that
 * is visible on it and a shape that matches it.
 */
export const PressableFeedback = forwardRef<View, PressableFeedbackProps>(
  function PressableFeedback({ animation, style, ...props }, ref) {
    const inheritedDisableAll = useContext(DisableAllContext)
    const resolved = resolveAnimation(animation, inheritedDisableAll)
    // R14, resolved here rather than in each branch: merged into `style` before either of
    // them sees it, so the ink and the corners an overlay reads off the surface include a
    // `backgroundColor` or a `borderRadius` written as a prop.
    const [styleProps, rest] = useStyleProps(props)

    // Two components, not one with a branch inside: hooks cannot be conditional, and
    // "animation={false} mounts no worklet" is only true if the Reanimated hooks are
    // never reached at all.
    const Feedback = resolved.none ? StaticFeedback : AnimatedFeedback

    const body = (
      <Feedback
        ref={ref}
        animation={resolved}
        style={[styleProps, style]}
        {...rest}
      />
    )

    return resolved.disableAll ? (
      <DisableAllContext.Provider value={true}>{body}</DisableAllContext.Provider>
    ) : (
      body
    )
  }
)

type BranchProps = Omit<PressableFeedbackProps, 'animation'> & {
  animation: ResolvedAnimation
}

const StaticFeedback = forwardRef<View, BranchProps>(function StaticFeedback(
  {
    isPressed = false,
    isDisabled,
    asChild = false,
    animation,
    children,
    style,
    ...rest
  },
  ref
) {
  const surface = useSurface(style)
  const context = useMemo(
    () => ({ isPressed, animation, ...surface }),
    [isPressed, animation, surface]
  )
  const Root = asChild ? Slot : Pressable

  return (
    <FeedbackProvider value={context}>
      <Root ref={ref} style={style} disabled={isDisabled} {...rest}>
        {feedbackChildren(children, asChild)}
      </Root>
    </FeedbackProvider>
  )
})

const AnimatedFeedback = forwardRef<View, BranchProps>(function AnimatedFeedback(
  {
    isPressed = false,
    isDisabled,
    asChild = false,
    animation,
    children,
    style,
    onLayout,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    ...rest
  },
  ref
) {
  const progress = useSharedValue(0)
  const size = useSharedValue({ width: 0, height: 0 })
  const waves = [useWave(), useWave()] as const
  const nextWave = useRef(0)

  // One curve in both directions, eased out: a press that decelerates reads as the
  // control settling, where a linear ramp reads as it snapping.
  useEffect(() => {
    progress.value = withTiming(isPressed ? 1 : 0, {
      duration: PRESS_DURATION,
      easing: Easing.out(Easing.ease),
    })
  }, [isPressed, progress])

  /**
   * The scale, adjusted for how wide the control is. A flat ratio moves a full-width row
   * four times as far as a chip, and the eye reads the displacement rather than the
   * ratio — which is what made the old flat `0.975` lurch.
   */
  const pressedScale = useDerivedValue(() => pressScaleFor(size.value.width))

  /**
   * Every animated hook in this package carries an explicit `'worklet'` directive **and**
   * an explicit dependency array. Both exist because this code is consumed as a built
   * `dist` rather than as source.
   *
   * The directive is the load-bearing one: our CJS output calls the hook as
   * `_reactNativeReanimated.useAnimatedStyle(...)`, and the Babel plugin recognises the
   * bare identifier, not the namespace member — so without it the function reaches the UI
   * runtime unserialized and Reanimated aborts the process. The build runs the plugin over
   * `dist` (`tooling/workletize/`), and the directive is what it keys off there.
   */
  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    if (!animation.scale) return {}
    return { transform: [{ scale: 1 - (1 - pressedScale.value) * progress.value }] }
  }, [animation.scale, progress, pressedScale])

  const surface = useSurface(style)
  const context = useMemo(
    () => ({ isPressed, animation, progress, size, waves, ...surface }),
    [isPressed, animation, progress, size, waves, surface]
  )

  /**
   * The ripple starts here, on the **root**, because the root is the touch surface.
   *
   * The overlay cannot own this. It is an absolute-fill sibling of the component's own
   * children, not their parent, so a touch on a button's label never reaches it — pressing
   * the text would do nothing while pressing the padding worked. Touches bubble to the
   * `Pressable`, so that is where they are heard.
   */
  const handleTouchStart = (event: GestureResponderEvent) => {
    const wave = waves[nextWave.current]
    nextWave.current = nextWave.current === 0 ? 1 : 0

    const { locationX, locationY } = event.nativeEvent
    wave.origin.value = { x: locationX, y: locationY }
    wave.expand.value = 0
    wave.expand.value = withTiming(1, {
      duration: RIPPLE_EXPAND_DURATION,
      easing: Easing.ease,
    })
    wave.alpha.value = withTiming(1, { duration: RIPPLE_FADE_IN })
    onTouchStart?.(event)
  }

  // The wave catches up rather than being cut: the expansion finishes fast, and the ink
  // only starts leaving once it has arrived.
  const releaseWave = () => {
    const wave = waves[nextWave.current === 0 ? 1 : 0]
    wave.expand.value = withTiming(1, {
      duration: RIPPLE_CONFIRM_DURATION,
      easing: Easing.ease,
    })
    wave.alpha.value = withDelay(
      RIPPLE_FADE_OUT_DELAY,
      withTiming(0, { duration: RIPPLE_FADE_OUT })
    )
  }

  const handleTouchEnd = (event: GestureResponderEvent) => {
    releaseWave()
    onTouchEnd?.(event)
  }

  /**
   * A cancel releases the wave exactly like a lift, and it has to: a touch that turns into
   * a scroll never fires `onTouchEnd`, so sharing the lift's handler and letting `rest`
   * overwrite it — which it did, since `onTouchCancel` was the one touch prop not
   * destructured — left the ink sitting on the control until the next press.
   */
  const handleTouchCancel = (event: GestureResponderEvent) => {
    releaseWave()
    onTouchCancel?.(event)
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    size.value = { width, height }
    onLayout?.(event)
  }

  const Root = asChild ? AnimatedSlot : AnimatedPressable

  return (
    <FeedbackProvider value={context}>
      <Root
        // `createAnimatedComponent` types its ref as the wrapper rather than as the host
        // node it forwards to, so the two do not meet. The value is a `View` at runtime,
        // which is what this component promises its callers.
        ref={ref as never}
        style={[style, animatedStyle]}
        disabled={isDisabled}
        onLayout={handleLayout}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        {...rest}
      >
        {feedbackChildren(children, asChild)}
      </Root>
    </FeedbackProvider>
  )
})

PressableFeedback.displayName = 'XAUI.PressableFeedback'

export { useFeedback }

function useWave(): RippleWave {
  return {
    expand: useSharedValue(0),
    alpha: useSharedValue(0),
    origin: useSharedValue({ x: 0, y: 0 }),
  }
}

/**
 * What the overlays need from the surface they sit on, read off the root's own `style` in
 * one flatten: the ink that will be visible on it, and the corners to match.
 *
 * Both are **resolved rather than configured**, and for the same reason — only the root
 * knows what it looks like. An overlay is mounted by a caller who would otherwise have to
 * re-derive the contrast and re-declare the radius its parent already set.
 */
function useSurface(style: StyleProp<ViewStyle>): {
  ink: string
  corners: RadiusStyle
} {
  const theme = useXAUITheme()

  return useMemo(() => {
    const flat = StyleSheet.flatten(style)
    return {
      ink: inkFor(flat?.backgroundColor, theme.colors),
      corners: radiusFrom(flat),
    }
  }, [style, theme])
}

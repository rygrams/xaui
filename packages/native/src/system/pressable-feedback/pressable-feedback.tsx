import { forwardRef, useContext, useEffect, useMemo, useRef } from 'react'
import type { ReactNode } from 'react'
import { Pressable, View } from 'react-native'
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
import { PressableFeedbackHighlight } from './pressable-feedback-highlight'
import { PressableFeedbackRipple } from './pressable-feedback-ripple'
import { Slot } from '../slot/slot'
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
import type {
  FeedbackVariant,
  PressableFeedbackProps,
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
 * The overlay comes from `feedbackVariant`. A component that wants to style its overlay
 * picks `"scale"` and renders `<PressableFeedback.Highlight style={…}>` itself — no prop
 * here reaches into another component's insides (R1).
 */
export const PressableFeedback = forwardRef<View, PressableFeedbackProps>(
  function PressableFeedback(
    { animation, feedbackVariant = 'scale-highlight', ...rest },
    ref
  ) {
    const inheritedDisableAll = useContext(DisableAllContext)
    const resolved = resolveAnimation(animation, inheritedDisableAll)

    // Two components, not one with a branch inside: hooks cannot be conditional, and
    // "animation={false} mounts no worklet" is only true if the Reanimated hooks are
    // never reached at all.
    const Feedback =
      resolved.none || feedbackVariant === 'none' ? StaticFeedback : AnimatedFeedback

    const body = (
      <Feedback
        ref={ref}
        animation={resolved}
        feedbackVariant={feedbackVariant}
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
  feedbackVariant: FeedbackVariant
}

const StaticFeedback = forwardRef<View, BranchProps>(function StaticFeedback(
  {
    isPressed = false,
    isDisabled,
    asChild = false,
    animation,
    feedbackVariant,
    children,
    style,
    ...rest
  },
  ref
) {
  const context = useMemo(() => ({ isPressed, animation }), [isPressed, animation])
  const Root = asChild ? Slot : Pressable

  return (
    <FeedbackProvider value={context}>
      <Root
        ref={ref}
        style={[clipFor(feedbackVariant, asChild), style]}
        disabled={isDisabled}
        {...rest}
      >
        {body(asChild, feedbackVariant, children)}
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
    feedbackVariant,
    children,
    style,
    onLayout,
    onTouchStart,
    onTouchEnd,
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

  const context = useMemo(
    () => ({ isPressed, animation, progress, size, waves }),
    [isPressed, animation, progress, size, waves]
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
  const handleTouchEnd = (event: GestureResponderEvent) => {
    const wave = waves[nextWave.current === 0 ? 1 : 0]
    wave.expand.value = withTiming(1, {
      duration: RIPPLE_CONFIRM_DURATION,
      easing: Easing.ease,
    })
    wave.alpha.value = withDelay(
      RIPPLE_FADE_OUT_DELAY,
      withTiming(0, { duration: RIPPLE_FADE_OUT })
    )
    onTouchEnd?.(event)
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
        style={[clipFor(feedbackVariant, asChild), style, animatedStyle]}
        disabled={isDisabled}
        onLayout={handleLayout}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        {...rest}
      >
        {body(asChild, feedbackVariant, children)}
      </Root>
    </FeedbackProvider>
  )
})

/**
 * What goes inside the root — and the reason `FeedbackProvider` sits *above* it rather
 * than around these children.
 *
 * Under `asChild` the root is a `Slot`, and a `Slot` merges its props into its single
 * child. A provider nested inside would be that child, so every pressable prop — the
 * ref, the style, the handlers — would land on a context provider, which ignores all of
 * them: the caller's element would stop reacting to touch entirely, silently.
 *
 * The default overlay goes with it. The caller's element *is* the pressable under
 * `asChild`, and there is nowhere to inject a sibling inside it. The context is still
 * published, so a caller that wants the wash renders `<PressableFeedback.Highlight />`
 * among its own children.
 */
function body(
  asChild: boolean,
  variant: FeedbackVariant,
  children: ReactNode
): ReactNode {
  if (asChild) return children

  return (
    <>
      <DefaultOverlay variant={variant} />
      {children}
    </>
  )
}

const OVERLAY_CLIP: ViewStyle = { overflow: 'hidden' }

/**
 * An overlay is an absolute fill with square corners, and every control in this library is
 * rounded — so without a clip both the wash and the ripple paint outside the surface at
 * each corner. That is a defect rather than a style choice, so it goes on *before* the
 * caller's style, which can still override it.
 *
 * Only when a default overlay is actually mounted. Clipping a root that has none would
 * silently cut off a child that legitimately overflows — a badge on a button's corner —
 * and a component that renders its own overlay picked `scale` precisely to decide this
 * for itself.
 */
function clipFor(variant: FeedbackVariant, asChild: boolean): StyleProp<ViewStyle> {
  if (asChild) return null
  const mountsOverlay = variant === 'scale-highlight' || variant === 'scale-ripple'
  return mountsOverlay ? OVERLAY_CLIP : null
}

function DefaultOverlay({ variant }: { variant: FeedbackVariant }): ReactNode {
  if (variant === 'scale-highlight') return <PressableFeedbackHighlight />
  if (variant === 'scale-ripple') return <PressableFeedbackRipple />
  return null
}

export { useFeedback }

function useWave(): RippleWave {
  return {
    expand: useSharedValue(0),
    alpha: useSharedValue(0),
    origin: useSharedValue({ x: 0, y: 0 }),
  }
}

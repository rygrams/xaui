import { forwardRef, useContext, useEffect, useMemo } from 'react'
import type { ReactNode } from 'react'
import { Pressable, View } from 'react-native'
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
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
  PRESS_SCALE,
  RELEASE_DURATION,
  resolveAnimation,
} from './pressable-feedback.animation'
import type {
  FeedbackVariant,
  PressableFeedbackProps,
  ResolvedAnimation,
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
    <Root ref={ref} style={style} disabled={isDisabled} {...rest}>
      <FeedbackProvider value={context}>
        <DefaultOverlay variant={feedbackVariant} />
        {children}
      </FeedbackProvider>
    </Root>
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
    onPressIn,
    onLayout,
    ...rest
  },
  ref
) {
  const progress = useSharedValue(0)
  const pressCount = useSharedValue(0)
  const origin = useSharedValue({ x: 0, y: 0 })
  const size = useSharedValue({ width: 0, height: 0 })

  useEffect(() => {
    progress.value = withTiming(isPressed ? 1 : 0, {
      duration: isPressed ? PRESS_DURATION : RELEASE_DURATION,
    })
  }, [isPressed, progress])

  const animatedStyle = useAnimatedStyle(() =>
    animation.scale
      ? { transform: [{ scale: 1 - (1 - PRESS_SCALE) * progress.value }] }
      : {}
  )

  const context = useMemo(
    () => ({ isPressed, animation, progress, pressCount, origin, size }),
    [isPressed, animation, progress, pressCount, origin, size]
  )

  // Composed, never replaced: the caller's handlers are why it passed them.
  const handlePressIn = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent
    origin.value = { x: locationX, y: locationY }
    pressCount.value += 1
    onPressIn?.(event)
  }

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    size.value = { width, height }
    onLayout?.(event)
  }

  // A ripple painting outside its control is a defect, not a style choice, so the clip
  // goes on before the caller's style — which can still override it.
  const clip: StyleProp<ViewStyle> =
    feedbackVariant === 'scale-ripple' ? { overflow: 'hidden' } : null

  const Root = asChild ? AnimatedSlot : AnimatedPressable

  return (
    <Root
      ref={ref}
      style={[clip, style, animatedStyle]}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onLayout={handleLayout}
      {...rest}
    >
      <FeedbackProvider value={context}>
        <DefaultOverlay variant={feedbackVariant} />
        {children}
      </FeedbackProvider>
    </Root>
  )
})

function DefaultOverlay({ variant }: { variant: FeedbackVariant }): ReactNode {
  if (variant === 'scale-highlight') return <PressableFeedbackHighlight />
  if (variant === 'scale-ripple') return <PressableFeedbackRipple />
  return null
}

export { useFeedback }

import { forwardRef, useCallback, useEffect, useMemo } from 'react'
import { View } from 'react-native'
import { useSharedValue, withSpring } from 'react-native-reanimated'
import { useControllableState } from '../../hooks/use-controllable-state'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { FLIP_SPRING } from './flip-card.animation'
import { FlipCardProvider } from './flip-card.context'
import { flipCardSheet } from './flip-card.style'
import type { FlipCardProps } from './flip-card.type'

/**
 * A card with two faces, and a turn between them.
 *
 * ```tsx
 * <FlipCard>
 *   <FlipCard.Front>
 *     <Card>
 *       <Card.Body><Typography>Recto</Typography></Card.Body>
 *     </Card>
 *   </FlipCard.Front>
 *
 *   <FlipCard.Back>
 *     <Card variant="secondary">
 *       <Card.Body><Typography>Verso</Typography></Card.Body>
 *     </Card>
 *   </FlipCard.Back>
 * </FlipCard>
 * ```
 *
 * **It paints nothing, and it has no recipe.** What turns is two faces the caller supplied,
 * and each of those is usually a `Card` with its own variant, its own radius and its own
 * shadow. A recipe here would be a second table saying the same things, and the day one of
 * them gained a border the other would not have it.
 *
 * **The front decides how big the card is.** The back is out of flow and fills it, because a
 * back in the flow would stack under the front and double the height. Two faces of different
 * heights is therefore the front's height, which is the only answer that does not make the
 * card resize halfway through its own turn.
 *
 * **The two faces are a half turn apart at every moment** and the away-facing one is not
 * drawn, which is what leaves exactly one of them on screen at any angle. `faceAngle` is
 * that relationship, and it is tested — a back on a spring of its own shows both faces
 * through the middle of the turn.
 *
 * `isPressable={false}` leaves it a display and the flip to a control of yours: a button on
 * one face is `useFlipCard().flip`, and it costs no state.
 */
export const FlipCardRoot = forwardRef<View, FlipCardProps>(function FlipCard(
  {
    children,
    direction = 'horizontal',
    rotation = 'normal',
    isFlipped: controlledFlipped,
    defaultFlipped = false,
    onFlipChange,
    isPressable = true,
    animation = true,
    isDisabled = false,
    asChild = false,
    accessibilityRole = 'button',
    accessibilityState,
    style,
    onPressIn,
    onPressOut,
    onPress,
    ...props
  },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const [isPressed, press] = usePressState({ onPressIn, onPressOut })

  const [isFlipped, setFlipped] = useControllableState({
    value: controlledFlipped,
    defaultValue: defaultFlipped,
    onChange: onFlipChange,
  })

  const progress = useSharedValue(isFlipped ? 1 : 0)

  useEffect(() => {
    const target = isFlipped ? 1 : 0

    if (animation === false) {
      progress.set(target)
      return
    }

    const tuned = animation === true ? FLIP_SPRING : { ...FLIP_SPRING, ...animation }

    // The three named one by one rather than spread: Reanimated's spring config is a union
    // — a physics spring or a duration one — and a spread of a partial matches neither arm.
    progress.set(
      withSpring(target, {
        stiffness: tuned.stiffness,
        damping: tuned.damping,
        mass: tuned.mass,
      })
    )
  }, [animation, isFlipped, progress])

  const flip = useCallback(() => {
    if (isDisabled) return
    setFlipped(current => !current)
  }, [isDisabled, setFlipped])

  const context = useMemo(
    () => ({ progress, direction, rotation, isFlipped, flip, isDisabled }),
    [progress, direction, rotation, isFlipped, flip, isDisabled]
  )

  return (
    <FlipCardProvider value={context}>
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        asChild={asChild}
        // `image` and not `button` when it does not respond: an element a screen reader
        // announces as pressable and which does nothing when pressed is worse than one it
        // announces as a picture.
        accessibilityRole={isPressable ? accessibilityRole : 'image'}
        accessibilityState={{
          expanded: isFlipped,
          disabled: isDisabled,
          ...accessibilityState,
        }}
        isDisabled={isDisabled || !isPressable}
        // No feedback of its own: the turn *is* the feedback, and a card that also dims
        // under the finger reads as two things happening to it at once.
        animation={false}
        {...rest}
        style={[
          flipCardSheet.root,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={event => {
          onPress?.(event)
          if (isPressable) flip()
        }}
        // After `rest`, and composed rather than replacing.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children}
      </PressableFeedback>
    </FlipCardProvider>
  )
})

FlipCardRoot.displayName = 'XAUI.FlipCard.Root'

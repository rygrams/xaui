import { forwardRef } from 'react'
import { View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { warnDev } from '../../utils/warn-dev'
import { carouselSheet } from './carousel.style'
import { useCarousel } from './carousel.context'
import type { CarouselControlProps } from './carousel.type'

type Direction = {
  /** Which way it steps. */
  delta: 1 | -1
  displayName: string
  /** Which edge it sits on. R13 — never `left` or `right`. */
  edge: 'start' | 'end'
  turn: 'chevronBack' | 'chevronForward'
}

/**
 * The two arrows, which differ only in which way they step and which edge they sit on.
 *
 * They are **over** the slides rather than beside them: an arrow in the flow would move the
 * track it belongs to, and then the two would disagree about where the middle is. Centred on
 * the track's own measured height, so a carousel with dots under it does not have its arrows
 * sitting low.
 *
 * At the end of a series that does not loop the arrow **stays in place and goes quiet** —
 * disabled, not removed. A control that disappears at the last slide takes its width with it
 * and shifts everything beside it.
 *
 * Written once and named twice rather than copied: the difference between them is four
 * values, and two copies of forty lines is two places for the press composition to drift.
 */
function control({ delta, displayName, edge, turn }: Direction) {
  const Component = forwardRef<View, CarouselControlProps>(function CarouselControl(
    { children, asChild = false, style, onPressIn, onPressOut, ...props },
    ref
  ) {
    const {
      controlStyle,
      controlInactiveStyle,
      chevronStyle,
      controlBox,
      trackHeight,
      index,
      count,
      hasLoop,
      isDisabled,
      moveBy,
      onInteract,
    } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    // A chevron says "next" to someone who can see it and nothing at all to someone who
    // cannot, and unlike a labelled button there is no text beside it to fall back on. No
    // default string either: which language it would be in is not the library's to decide.
    //
    // Not under `asChild`, where the caller's own element carries its own label.
    if (!asChild && !rest.accessibilityLabel && !rest['aria-label']) {
      warnDev(
        `${displayName}: a carousel arrow needs an \`accessibilityLabel\` — a chevron is ` +
          'not text, and there is nothing beside it that names the action.'
      )
    }

    const atEnd = delta > 0 ? index >= count - 1 : index <= 0
    const isInactive = isDisabled || (!hasLoop && atEnd)

    const place = {
      // Half a button above the track's middle. Zero until the track has been measured,
      // which puts the arrow at the top for one frame and nowhere wrong after it.
      top: Math.max(0, (trackHeight - controlBox.size) / 2),
      [edge]: controlBox.inset,
    }

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        asChild={asChild}
        accessibilityRole="button"
        accessibilityState={{ disabled: isInactive }}
        isDisabled={isInactive}
        {...rest}
        // R9 — the caller's `style` may be `Pressable`'s function form. This control owns
        // its own press state, so it resolves the function here rather than forwarding it.
        style={[
          controlStyle,
          isInactive ? controlInactiveStyle : null,
          place,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        onPress={() => {
          onInteract()
          moveBy(delta)
        }}
        // After `rest`, and composed rather than replacing: a caller's `onPressIn` runs,
        // and the pressed state still happens.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children ?? <View style={[chevronStyle, carouselSheet[turn]]} />}
      </PressableFeedback>
    )
  })

  Component.displayName = displayName
  return Component
}

/** Back one slide. */
export const CarouselPrevious = control({
  delta: -1,
  displayName: 'XAUI.Carousel.Previous',
  edge: 'start',
  turn: 'chevronBack',
})

/** On one slide. */
export const CarouselNext = control({
  delta: 1,
  displayName: 'XAUI.Carousel.Next',
  edge: 'end',
  turn: 'chevronForward',
})

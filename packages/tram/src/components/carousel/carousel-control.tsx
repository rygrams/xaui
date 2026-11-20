import { forwardRef, useEffect } from 'react'
import { View } from 'react-native'
import { usePressState } from '@xaui/native'
import { PressableFeedback, useStyleProps, warnDev } from '@xaui/native/system'
import { scale } from '../../motion/motion-tokens'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useCarousel } from './carousel.context'
import { carouselSheet } from './carousel.style'
import { arrowTop } from './carousel.utils'
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
 * The two arrows: a square of the page's ground, the size of a key, with a fine chevron
 * in its ink — over the slides, 8 from the track's edge, centred on the track's measured
 * height.
 *
 * At the end of a series that does not loop the arrow **stays in place**, disabled, its
 * chevron in the faint grey: a control that disappears takes its width with it. A press
 * leans it toward the finger and changes no colour. Drawn 32 or 40 across, it is pressed
 * like one of 48.
 */
function control({ delta, displayName, edge, turn }: Direction) {
  const Component = forwardRef<View, CarouselControlProps>(function CarouselControl(
    {
      children,
      asChild = false,
      accessibilityState,
      hitSlop,
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      controlStyle,
      controlInactiveStyle,
      chevronStyle,
      chevronInactiveStyle,
      controlBox,
      trackHeight,
      index,
      stops,
      hasLoop,
      isDisabled,
      isStill,
      moveBy,
      onInteract,
    } = useCarousel()
    const [styleProps, rest] = useStyleProps(props)
    const haptic = useTramHaptic()
    const [isPressed, press] = usePressState({
      onPressIn: event => {
        haptic('press')
        onPressIn?.(event)
      },
      onPressOut,
    })

    // A chevron is not text, and there is nothing beside it to name the action — nor a
    // default, since which language it would be in is not the library's to decide. Once
    // per arrow, not once per render: autoplay re-renders it at every tick.
    const hasLabel = Boolean(rest.accessibilityLabel || rest['aria-label'])
    useEffect(() => {
      if (asChild || hasLabel) return
      warnDev(
        `${displayName}: a carousel arrow needs an \`accessibilityLabel\` — a chevron is ` +
          'not text, and there is nothing beside it that names the action.'
      )
    }, [asChild, hasLabel])

    const atEnd = delta > 0 ? index >= stops - 1 : index <= 0
    const isInactive = isDisabled || (!hasLoop && atEnd)

    const place = {
      top: arrowTop(trackHeight, controlBox.size),
      [edge]: controlBox.inset,
    }

    // Under an ancestor's `disable-all` the arrow does not lean either.
    const Root = isStill ? PressableFeedback : PressTilt
    const lean = isStill ? undefined : { depth: scale.row }

    return (
      <Root
        ref={ref}
        isPressed={isPressed}
        asChild={asChild}
        // Native's scale, highlight and ripple stay off: the press is the tilt alone.
        animation={isStill ? 'disable-all' : false}
        accessibilityRole="button"
        // Merged, not spread over: a caller naming another state must not drop this one.
        accessibilityState={{ disabled: isInactive, ...accessibilityState }}
        isDisabled={isInactive}
        hitSlop={hitSlop ?? touchReach(controlBox.size)}
        {...lean}
        {...rest}
        // R9 — the caller's `style` may be `Pressable`'s function form; this control owns
        // its press state, so it resolves the function here.
        style={[
          isInactive ? controlInactiveStyle : controlStyle,
          place,
          styleProps,
          typeof style === 'function' ? style({ pressed: isPressed }) : style,
        ]}
        // Composed: the caller's runs, and the arrow still steps.
        onPress={event => {
          onPress?.(event)
          onInteract()
          moveBy(delta)
        }}
        // After `rest`, and composed: the caller's handlers run inside these.
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children ?? (
          <View
            style={[
              isInactive ? chevronInactiveStyle : chevronStyle,
              carouselSheet[turn],
            ]}
          />
        )}
      </Root>
    )
  })

  Component.displayName = displayName
  return Component
}

/** Back one slide. */
export const CarouselPrevious = control({
  delta: -1,
  displayName: 'XAUI.Tram.Carousel.Previous',
  edge: 'start',
  turn: 'chevronBack',
})

/** On one slide. */
export const CarouselNext = control({
  delta: 1,
  displayName: 'XAUI.Tram.Carousel.Next',
  edge: 'end',
  turn: 'chevronForward',
})

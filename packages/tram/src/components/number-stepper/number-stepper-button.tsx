import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePressState } from '@xaui/native'
import {
  PressableFeedback,
  resolveAnimation,
  useAnimationDisabled,
  useStyleProps,
  warnDev,
} from '@xaui/native/system'
import { PressTilt } from '../../system/press-tilt'
import { touchReach } from '../../system/touch-reach'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperButtonProps } from './number-stepper.type'

/** The upright of the plus. The bar under it is the minus, drawn by both keys. */
const sheet = StyleSheet.create({ upright: { transform: [{ rotate: '90deg' }] } })

type StepperButtonProps = NumberStepperButtonProps & {
  /** The name the warning carries. */
  name: string
  /** A plus is a minus with a second bar across it, so this is the whole difference. */
  hasUpright: boolean
  onStep: () => void
  isLive: boolean
}

/**
 * One key, everything the decrement and the increment share: the `Button`'s square box,
 * its tilt toward the finger, and the mark drawn out of the `NumberField`'s bars.
 *
 * Each key owns its own press state, so pressing one does not lean the other. With nowhere
 * left to go it is drawn as a disabled key and stops taking presses. A caller's own
 * `onPress` **replaces** the step, as on Native: a bin at the floor removes the row, it does
 * not also decrement it.
 *
 * Internal: `NumberStepper.Decrement` and `.Increment` are this with a direction.
 */
export const StepperButton = forwardRef<View, StepperButtonProps>(
  function StepperButton(
    {
      name,
      hasUpright,
      onStep,
      isLive,
      accessibilityLabel,
      children,
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
      side,
      buttonStyle,
      buttonSpentStyle,
      glyphStyle,
      glyphSpentStyle,
      isDisabled,
    } = useNumberStepper()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    // Native's scale, highlight and ripple stay off: the press is the Tram tilt alone.
    const motion = resolveAnimation(undefined, useAnimationDisabled())
    const Press = motion.scale ? PressTilt : PressableFeedback

    if (!accessibilityLabel) {
      warnDev(
        `Tram ${name}: the key needs an \`accessibilityLabel\` — a plus is not text, and ` +
          'the words beside a stepper name the quantity rather than what pressing it does.'
      )
    }

    const isOff = isDisabled || !isLive
    const bar = [glyphStyle, isLive ? undefined : glyphSpentStyle]

    return (
      <Press
        ref={ref}
        isPressed={isPressed}
        isDisabled={isOff}
        animation={motion.disableAll ? 'disable-all' : false}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isOff }}
        // Under 48 at `sm` and `md`: the touch reaches past the key.
        hitSlop={hitSlop ?? touchReach(side)}
        {...rest}
        style={[
          buttonStyle,
          isLive ? undefined : buttonSpentStyle,
          styleProps,
          style,
        ]}
        onPress={onPress ?? onStep}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
      >
        {children ?? (
          <>
            <View style={bar} />
            {hasUpright ? <View style={[bar, sheet.upright]} /> : null}
          </>
        )}
      </Press>
    )
  }
)

StepperButton.displayName = 'XAUI.Tram.NumberStepper.Button'

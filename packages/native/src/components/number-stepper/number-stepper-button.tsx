import { forwardRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePressState } from '../../hooks/use-press-state'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { warnDev } from '../../utils/warn-dev'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperButtonProps } from './number-stepper.type'

/** The upright of the plus. The bar under it is the minus, drawn by both buttons. */
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
 * The pressable half of the pair, which is everything the two buttons share.
 *
 * It is **internal**: what `NumberStepper.Increment` and `NumberStepper.Decrement` add on
 * top of it is the sign of the step and the mark they draw, and neither is something a
 * caller should have to supply. Sharing it here is what keeps the two the same weight, the
 * same target and the same dimming.
 *
 * **It owns its own press state**, unlike most of the library, where the root owns it
 * because its recipe resolves on it. Two buttons on one control are two targets: pressing
 * the plus must not light the minus. That is also why the recipe has no `bgPressed` — the
 * press is the shared `PressableFeedback` treatment, exactly as the `CloseButton`'s is.
 *
 * With no children it draws its own mark out of one bar, or two a quarter turn apart — the
 * close button's construction, so a stepper works in a project that has installed no icon
 * set.
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
      style,
      onPress,
      onPressIn,
      onPressOut,
      ...props
    },
    ref
  ) {
    const {
      buttonStyle,
      buttonContentStyle,
      buttonGlyphStyle,
      buttonExhaustedStyle,
      isDisabled,
    } = useNumberStepper()
    const [styleProps, rest] = useStyleProps(props)
    const [isPressed, press] = usePressState({ onPressIn, onPressOut })

    // A plus says "one more" to someone who can see it and nothing at all to someone who
    // cannot — and the text beside a stepper names the quantity, not the action, so there
    // is nothing to fall back on.
    if (!accessibilityLabel) {
      warnDev(
        `${name}: the button needs an \`accessibilityLabel\` — a plus is not text, and ` +
          'the words beside a stepper name the quantity rather than what pressing it does.'
      )
    }

    const isOff = isDisabled || !isLive

    return (
      <PressableFeedback
        ref={ref}
        isPressed={isPressed}
        isDisabled={isOff}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityState={{ disabled: isOff }}
        // Caller props first, so `accessibilityRole` and the rest stay overridable (R9)…
        {...rest}
        // …and the handlers after. A caller's own `onPress` **replaces** the step rather
        // than running beside it: a bin at the floor removes the row, it does not also
        // decrement it. `onPressIn` and `onPressOut` are composed, so the pressed state
        // still happens whatever the caller does with them.
        onPress={onPress ?? onStep}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={[buttonStyle, styleProps, style]}
      >
        {/* The mark is what fades when the button is spent, not the box. Dimming the box
            makes it translucent, and a translucent button stops hiding the pill it is
            raised off — the ground reads straight through the circle. This layer is also
            what makes a caller's own icon fade exactly as the drawn bars do. */}
        <View
          style={[buttonContentStyle, isLive ? undefined : buttonExhaustedStyle]}
        >
          {children ?? (
            <>
              <View style={buttonGlyphStyle} />
              {hasUpright ? (
                <View style={[buttonGlyphStyle, sheet.upright]} />
              ) : null}
            </>
          )}
        </View>
        <PressableFeedback.Highlight />
      </PressableFeedback>
    )
  }
)

StepperButton.displayName = 'XAUI.NumberStepper.Button'
